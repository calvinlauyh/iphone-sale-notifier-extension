import chromep from '../library/chrome-promise';
import constant from '../constant';
import i18n from './i18n';

export function getWorkerPageURL() {
  return `chrome-extension://${chrome.runtime.id}/worker.html`;
}

/**
 * Find all worker tabs which are opening the worker page
 * @return  {Promise}
 * @resolve {Tabs[]}  List of worker tabs opening the worker page
 * @reject  {Error}   if there is error reported from Chrome
 */
async function findWorkerTabsByWorkerPage() {
  return await chromep.tabs.query({
    url: `chrome-extension://${chrome.runtime.id}/worker.html`
  });
}

/**
 * Find all worker tabs which are opening Apple Store website
 * @return  {Promise}
 * @resolve {Tabs[]}  List of worker tabs opening Apple Store website
 * @reject  {Error}   if there is error reported from Chrome
 */
async function findWorkerTabsByAppleSite() {
  // Search for webpage that has loaded the apple website
  // TODO: change the hardcode apple url to function call
  const tabs = await chromep.tabs.query({
    url: 'https://www.apple.com/*'
  });
  if (tabs.length === 0) {
    return [];
  }
  let matchedTabs = [];
  for (let i=0,l=tabs.length; i<l; i++) {
    const tab = tabs[i];
    // TODO: Fix document.referrer is always empty
    // Check if the document.referrer is the worker page
    const referrer = await chromep.tabs.executeScript(tab.id, {code: 'document.referrer'});
    if (referrer === getWorkerPageURL()) {
      matchedTabs.push(tab);
    }
  }
  return matchedTabs;
}

/**
 * Find all the worker tabs
 * @return  {Promise}
 * @resolve {Tabs[]} List of worker tabs
 * @reject  {Error}  if there is error reported from Chrome
 */
async function findAllWorkerTabs() {
  return (await findWorkerTabsByWorkerPage()).concat(await findWorkerTabsByAppleSite());
}

/**
 * Close all worker tabs. Usually used to close all worker tabs from previous
 * session
 * @return  {Promise}
 * @resolve           if all the tabs are closed
 * @reject  {Error}   if there is error reported from Chrome
 */
export async function closeAllWorkerTabs() {
  const workerTabs = await findAllWorkerTabs();
  workerTabs.forEach(async (tab) => {
    await chromep.tabs.remove(tab.id);
  });
}

async function findWorkerTabByStorage() {
  let workerTabId;
  try {
    // First try to get the worker tab id from local stroage
    ({ workerTabId } = await chromep.storage.local.get('workerTabId'));
    // Return the tab if it presents
    if (!workerTabId) {
      // The workerTabId is missing in storage. Either first runing or storage
      // has been clear
      return Promise.reject(new Error('Missing workerTabId in local storage.'));
    }
    return await chromep.tabs.get(workerTabId);
  } catch(e) {/*Safely ignore the error*/}
  return null;
}

async function findWorkerTabByUrl() {
  // Search for tab from previous browser session
  // Search for webpage that has loaded the worker page
  const tabs = await chromep.tabs.query({
    url: `chrome-extension://${chrome.runtime.id}/worker.html*`
  });
  // Always return the first matched tab
  if (tabs.length === 0) {
    return null;
  }
  return tabs[0];
}

async function findWorkerTabByAppleSite() {
  // Search for webpage that has loaded the apple website
  // Check if the document.referrer is the worker page
  // TODO: change the hardcode apple url to function call
  const tabs = await chromep.tabs.query({
    url: 'https://www.apple.com/*'
  });
  if (tabs.length === 0) {
    return null;
  }
  for (let i=0,l=tabs.length; i<l; i++) {
    const tab = tabs[i];
    const referrer = await chromep.tabs.executeScript(tab.id, {code: 'document.referrer'});
    if (getWorkerPageURLRegExp().test(referrer)) {
      return tab;
    }
  }
  return null;
}

export async function findWorkerTab() {
  for (let fn of [findWorkerTabByStorage, findWorkerTabByUrl, findWorkerTabByAppleSite]) {
    try {
      const tab = await fn();
      if (tab !== null) {
        return tab;
      }
    } catch(e) {
      // early termination
      break;
    }
  }
  return Promise.reject(new Error(constant.ERR_WORKERTAB_NOTFOUND));
};

// Get Apple store URL base
export function getAppleStoreURL() {
  // TODO: support more region in the future
  return 'https://www.apple.com/hk/shop/buy-iphone/';
}

// Get Apple store JSON URL
export function getAppleStoreJsonURL() {
  // TODO: support more region in the future
  return 'https://www.apple.com/hk/shop/delivery-message?parts.0=';
}

export function logError(error) {
  chrome.notifications.create('error', {
    type: 'basic',
    // TODO: iconUrl: '',
    title: i18n.t('error.notification.title'),
    message: i18n.t('error.notificaiton.message')
  });
  console.error(error);
}