import 'regenerator-runtime/runtime';
import chromep from '../library/chrome-promise';
import iPhoneDb from '../db/iPhoneDb';
import constant from '../constant';
import AppEnv from './AppEnv';
import i18n from './i18n';
const t = i18n.t.bind(i18n);

import { getWorkerPageURL, getAppleStoreURL, closeAllWorkerTabs } from './utils';
import { getPhoneName } from 'utils/phoneUtils';

import {
  MONITORLIST_SET,
  STATUS_SET,
  LANGUAGE_SET
} from 'actions/actionTypes';

/**
 * Start the worker tab to prepare and execute jobs
 * @async
 * @param  {Integer} tabId Id of the tab to start
 */
async function startWorkerTab(tabId) {
  await chromep.tabs.update(tabId, {
    url: getWorkerPageURL()
  });
}

/**
 * Create a worker tab in the browser
 * @async
 * @param  {AppEnv}  appEnv          AppEnv object
 * @param  {Boolean} [startJob=true] Whether the worker tab should start to
 *                                   work immediately after creation
 * @return {Tab}   The worker tab just being created
 * @throws {Error} If error occurs
 */
async function createWorkerTab(appEnv, startWork = true) {
  const tab = await chromep.tabs.create({
    index: 0,        // always put in the leftmost of the tablist
    pinned: true,    // pin it so that it will not be closed accidentally
    selected: false, // open silently
  });
  const tabId = tab.id;
  appEnv.set(`tabRuntime.workerTabDict.${tabId}`, {
    tabId,
    job: null
  });

  if (startWork) {
    await startWorkerTab(tabId);
  }

  return tab;
}

/**
 * Restart the specified worker tab
 * @param  {AppEnv}  appEnv          AppEnv object
 * @param  {Integer} targetTabId     The target tab id to close
 * @param  {Boolean} [startJob=true] Whether the worker tab should start to
 *                                   work immediately after creation
 */
async function restartWorkerTab(appEnv, targetTabId, startWork = true) {
  // Remove the tab from workerTabDict so that the close tab listener won't
  // fire the restart tab again
  let workerTabDict = appEnv.get('tabRuntime.workerTabDict');
  delete workerTabDict[targetTabId];
  appEnv.set('tabRuntime.workerTabDict', workerTabDict);
  // Try to make sure the tab is closed
  try {
    await chromep.tabs.remove(targetTabId);
  } catch(e) {/*ignore any error*/}
  await createWorkerTab(appEnv);
}

/**
 * Get the next tab job
 * @param  {AppEnv} appEnv AppEnv object
 * @return {Object}        Next available tab job
 */
function getNextTabJob(appEnv) {
  const jobList = appEnv.get('tabRuntime.jobList');
  const jobIdx = appEnv.get('tabRuntime.nextJobIdx');

  let nextJobIdx = jobIdx+1;
  if (nextJobIdx >= jobList.length) {
    nextJobIdx = 0;
  }
  appEnv.set('tabRuntime.nextJobIdx', nextJobIdx);

  return jobList[jobIdx];
}

/**
 * Update browser action icon according to phone availability status
 * @param  {AppEvn} appEnv AppEnv object
 */
function updateBrowserAction(appEnv) {
  const status = appEnv.get('status');
  if (status !== constant.STATUS.ENABLED) {
    chrome.browserAction.setIcon({
      path: {
        16: 'src/images/icons/disabled16.png',
        24: 'src/images/icons/disabled24.png',
        32: 'src/images/icons/disabled32.png',
        64: 'src/images/icons/disabled64.png'
      }
    });
    return;
  }

  const phoneStatus = appEnv.get('phoneStatus');
  for (let model in phoneStatus) {
    const {
      status
    } = phoneStatus[model];
    if (status === constant.PHONESTATUS.INSTOCK) {
      chrome.browserAction.setIcon({
        path: {
          16: 'src/images/icons/instock16.png',
          24: 'src/images/icons/instock24.png',
          32: 'src/images/icons/instock32.png',
          64: 'src/images/icons/instock64.png'
        }
      });
      return;
    }
  }

  chrome.browserAction.setIcon({
    path: {
      16: 'src/images/icons/default16.png',
      24: 'src/images/icons/default24.png',
      32: 'src/images/icons/default32.png',
      64: 'src/images/icons/default64.png',
    }
  });
}

/**
 * Handle when a worker tab has signalled ready for job execution
 * @param  {AppEnv} appEnv AppEnv object
 * @param  {Integer} tabId Id of the worker tab
 */
function handleWorkerTabReady(appEnv, tabId) {
  try {
    // Update the tab job
    const tabJob = getNextTabJob(appEnv);
    appEnv.set(`tabRuntime.workerTabDict.${tabId}.job`, tabJob);

    // Get the tab view and prepare for redirection
    const tab = chrome.extension.getViews({
      type: 'tab',
      tabId: tabId
    });
    // TODO: Support configurable timeout
    let timeout = 5000;
    setTimeout(() => {
      tab[0].location.href = tabJob.url;
    }, timeout);
  } catch(e) {
    // Whenever an error occurs, try to restart the worker tab
    restartWorkerTab(appEnv, tabId);
    console.error(e);
  }
}

/**
 * Handle a tab update related to a store job
 * @param  {Object}  appEnv AppEnv object
 * @param  {Integer} tabId  The tab id of the updated worker tab
 * @param  {Object}  job    The job the worker tab is running
 */
async function handleTabStoreJob(appEnv, tabId, job) {
  const phoneId = job['phoneId'];
  try {
    // Check if the iPhone in Apple Store is available
    const addToCartEl = await chromep.tabs.executeScript(tabId, {
      code: `document.querySelector('.add-to-cart')`
    });
    // Update the phone status
    let newPhoneStatus;
    if (addToCartEl[0] === null) {
      const url = appEnv.get(`phoneStatus.${phoneId}.url`);
      // Only update when the previous availability is from this method
      if (url === '' || url === job.url) {
        newPhoneStatus = {
          status: constant.PHONESTATUS.UNAVAILABLE,
          inStockSince: 0,
          url: ''
        };
        appEnv.set(`phoneStatus.${phoneId}`, newPhoneStatus);
      }
    } else {
      // The iPhone is in stock now
      const {
        inStockSince,
        url
      } = appEnv.get(`phoneStatus.${phoneId}`);

      newPhoneStatus = {
        status: constant.PHONESTATUS.INSTOCK,
        inStockSince: inStockSince === 0? Date.now(): inStockSince,
        url: job.url
      };
      appEnv.set(`phoneStatus.${phoneId}`, newPhoneStatus);
      // If the phone is not available before, send a browser notification
      if (inStockSince === 0 || url !== job.url) {
        const notificationId = await chromep.notifications.create(notificationId, {
          type: 'basic',
          iconUrl: 'src/images/icons/instock64.png',
          title: t('method.store.notification.title'),
          message: t('method.store.notification.message')
            .replace('${PHONE_NAME}', getPhoneName(t, iPhoneDb.findById(phoneId)))
        });
        // on notification click handler
        appEnv.set(`notification.${notificationId}`, {
          type: 'url',
          url: job.url
        });
      }
    }

    await startWorkerTab(tabId);
  } catch(e) {
    // Whenever an error occurs, try to restart the worker tab
    restartWorkerTab(appEnv, tabId);
    console.error(e);
  }
}

/**
 * Handle a tab update related to IR JSON job
 * @param  {AppEnv}  appEnv AppEnv object
 * @param  {Integer} tabId  The tab id of the updated worker tab
 * @param  {Object}  job    The job the worker tab is running
 */
async function handleTabIRJsonJob(appEnv, tabId, job) {
  const phoneId = job['phoneId'];
  try {
    // Check if the iPhone in Apple Store is available
    const jsonData = await chromep.tabs.executeScript(tabId, {
      code: `document.body.innerText`
    });

    // Update the phone status
    let newPhoneStatus;
    let available = false;
    // Parse the JSON response
    const jsonResponse = JSON.parse(jsonData);
    for (let storeName in jsonResponse.stores) {
      const store = jsonResponse.stores[storeName];
      if (store[job.model]['availability']['contract'] || store[job.model]['availability']['unlocked']) {
        available = true;
        break;
      }
    }

    if (available) {
      // The iPhone is available in IR now
      const {
        inStockSince,
        url
      } = appEnv.get(`phoneStatus.${phoneId}`);

      newPhoneStatus = {
        status: constant.PHONESTATUS.INSTOCK,
        inStockSince: inStockSince === 0? Date.now(): inStockSince,
        url: job.irurl
      };
      appEnv.set(`phoneStatus.${phoneId}`, newPhoneStatus);
      // If the phone is not available before or from different method,
      // send a browser notification
      if (inStockSince === 0 || url !== job.irurl) {
        const notificationId = await chromep.notifications.create(notificationId, {
          type: 'basic',
          iconUrl: 'src/images/icons/instock64.png',
          title: t('method.irjson.notification.title'),
          message: t('method.irjson.notification.message')
            .replace('${PHONE_NAME}', getPhoneName(t, iPhoneDb.findById(phoneId)))
        });
        // on notification click handler
        appEnv.set(`notification.${notificationId}`, {
          type: 'url',
          url: `${job.irurl}`
        });
      }
    } else {
      const url = appEnv.get(`phoneStatus.${phoneId}.url`);
      // Only update when the previous availability is from this method
      if (url === '' || url === job.irurl) {
        newPhoneStatus = {
          status: constant.PHONESTATUS.UNAVAILABLE,
          inStockSince: 0,
          url: ''
        };
        appEnv.set(`phoneStatus.${phoneId}`, newPhoneStatus);
      }
    }

    await startWorkerTab(tabId);
  } catch(e) {
    // Whenever an error occurs, try to restart the worker tab
    restartWorkerTab(appEnv, tabId);
    console.error(e);
  }
}

/**
 * An event listener for handling tabs update
 * @param  {Object} appEnv AppEnv object
 */
const handleTabsUpdate = (appEnv) => async (tabId, changeInfo, tab) => {
  if (changeInfo.status !== 'complete') {
    return;
  }
  // Update browser cation whever there is an update of worker tab
  updateBrowserAction(appEnv);

  const workerTabDict = appEnv.get('tabRuntime.workerTabDict');
  // Check if the tab is one of the worker tabs
  if (!workerTabDict[tabId]) {
    return;
  }
  if (tab.url === getWorkerPageURL()) {
    // The tab is opening the worker tab page
    handleWorkerTabReady(appEnv, tabId);
    return;
  }
  // Check if the tab is executing its job
  const currentJob = workerTabDict[tabId].job;
  if (currentJob && tab.url === currentJob.url) {
    if (currentJob.type === 'store') {
      handleTabStoreJob(appEnv, tabId, currentJob);
    } else if (currentJob.type === 'irjson') {
      handleTabIRJsonJob(appEnv, tabId, currentJob);
    }
    return;
  }

  // The tab is opening non-job URL
  console.error(`Worker tab is opening a non-job URL: ${tab.url}`);
  restartWorkerTab(appEnv, tabId);
};

/**
 * A listener for handling tabs removal
 * @param  {AppEnv} appEnv AppEnv object
 */
const handleTabsRemove = (appEnv) => async (tabId, removeInfo) => {
  try {
    if (appEnv.get(`tabRuntime.workerTabDict.${tabId}`)) {
      // the closed tab is one of the worker tabs
      restartWorkerTab(appEnv, tabId);
    }
  } catch(e) {/*Ignore other tab cloeses*/}
}

/**
 * A listener for handling runtime message from other pages
 * @param  {AppEnv} appEnv AppEnv object
 */
const handleRuntimeMessage = (appEnv) => (request, sender, sendResponse) => {
  // Chrome request the runtime message handler to return true if the response
  // is asynchronous. So we cannot use an async function directly here, but to
  // wrap it inside a normal function
  (async () => {
    switch(request.type) {
      case MONITORLIST_SET:
        const newPhoneStatus = request.monitorList.reduce((accuDict, id) => {
          accuDict[id] = {
            status: constant.PHONESTATUS.PENDING,
            inStockSince: 0,
            url: ''
          };
          return accuDict;
        }, {});
        try {
          appEnv.set('monitorList', request.monitorList);
          appEnv.set('phoneStatus', newPhoneStatus);
          // Re-initialize the background
          await init(appEnv);
          sendResponse(true);
        } catch(e) {
          sendResponse(false);
          console.error(e);
        }
        break;
      case STATUS_SET:
        try {
          appEnv.set('status', request.status);
          // Re-initialize the background
          await init(appEnv);
          sendResponse(true);
        } catch(e) {
          sendResponse(false);
          console.error(e);
        }
        break;
      case LANGUAGE_SET:
        try {
          appEnv.set('language', request.language);
          // Change language
          i18n.changeLanguage(request.language);
          sendResponse(true);
        } catch(e) {
          sendResponse(false);
          throw e;
        }
        break;
      default:
        console.error(`Unknown runtime message "${request.type}"`)
    }
  })();

  // Tell Chrome that I wish to send a response asynchronously
  return true;
};

/**
 * An event listener for handling chrome notifications being clicked
 * @param  {AppEnv} appEnv AppEnv object
 */
const handleNotificationsClick = (appEnv) => async (notificationId) => {
  try {
    const action = appEnv.get(`notification.${notificationId}`);
    if (action.type === 'url') {
      await chromep.tabs.create({
        active: true,
        selected: true,
        url: action.url
      });
    }
  } catch(e) {/*No on click handler found*/}
}

/**
 * An event listener for handling chrome notifications being closed
 * @param  {AppEnv} appEnv AppEnv object
 */
const handleNotificationsClose = (appEnv) => (notificationId) => {
  try {
    // Remove the chrome notification on click handler
    let notification = appEnv.get('notification');
    if (notification[notificationId]) {
      delete notification[notificationId];
      appEnv.set('notification', notification);
    }
  } catch(e) {/*No on click handler found*/}
}

/**
 * Setup event handler
 * @param  {AppEnv} appEnv AppEnv object
 */
function setupEventHandler(appEnv) {
  chrome.browserAction.onClicked.addListener(() => { appEnv.repair(); });
  chrome.tabs.onUpdated.addListener(handleTabsUpdate(appEnv));
  chrome.tabs.onRemoved.addListener(handleTabsRemove(appEnv));
  chrome.runtime.onMessage.addListener(handleRuntimeMessage(appEnv));
  chrome.notifications.onClicked.addListener(handleNotificationsClick(appEnv));
  chrome.notifications.onClosed.addListener(handleNotificationsClose(appEnv));
}

/**
 * Find list of worker tabs from AppEnv
 * @param  {AppEnv} appEnv AppEnv object
 * @return {Integer[]      List of worker tab ids
 */
function findWorkerTabsFromAppEnv(appEnv) {
  return Object.keys(appEnv.get('tabRuntime.workerTabDict'))
    .map((idStr) => parseInt(idStr));
}

/**
 * Initialize the whole background. Support re-execute to re-initialize the
 * whole environment
 * @param  {AppEnv} appEnv AppEnv object
 */
async function init(appEnv) {
  // Only one instance can initialize the application
  if (appEnv.get('initializing')) {
    return Promise.reject('Only one instace can initialize the application at a time');
  }
  // Try to repair any abnormality in localStorage items
  appEnv.repair();

  updateBrowserAction(appEnv);

  // Close all worker tabs in AppEnv
  const workerTabs = findWorkerTabsFromAppEnv(appEnv);
  // Reset workerTabDict so that tab on close handler won't restart the
  // worker tabs for us
  appEnv.set('tabRuntime.workerTabDict', {});
  await chromep.tabs.remove(workerTabs);

  const status = appEnv.get('status');
  if (status !== constant.STATUS.ENABLED) {
    console.log('Extension is disabled');
    return;
  }

  const monitorList = appEnv.get('monitorList');
  // Construct tab job list
  let tabJobList = [];
  monitorList.forEach((id) => {
    const phone = iPhoneDb.findById(id);
    if (!phone) {
      // Unknown phone id in monitor list, maybe database updated?
      console.error(`Unknown iPhone id ${id}`);
      return; // continue
    }
    phone.methods.forEach((method) => {
      if (method.worker === 'tab') {
        let url = method.url;
        if (method.type === 'store') {
          url = `${getAppleStoreURL()}${method.url}`;
        }
        tabJobList.push(Object.assign({}, method, {
          phoneId: phone._id,
          url
        }));
      }
    });
  });
  // Update tab job list
  appEnv.set('tabRuntime.jobList', tabJobList);

  if (tabJobList.length === 0) {
    console.log('Tab scheduler is not started because there is no tab job to execute.');
    return;
  }
  await tabScheduler(appEnv);
}

/**
 * Reponsible for scheduling worker tabs
 * @param  {AppEnv} appEnv AppEnv object
 * @throws {Error}         If error occurs
 */
async function tabScheduler(appEnv) {
  // TODO: support configuable number of worker tabs
  await createWorkerTab(appEnv);
}

(async function main() {
  const appEnv = new AppEnv();
  // Close all worker tabs from previous session
  await closeAllWorkerTabs();
  setupEventHandler(appEnv);
  await init(appEnv);
})();