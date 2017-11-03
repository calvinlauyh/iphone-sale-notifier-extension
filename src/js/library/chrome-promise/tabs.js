const create = (createProperties) => new Promise((resolve, reject) => {
  chrome.tabs.create(createProperties, (tab) => {
    if (chrome.runtime.lastError) {
      reject(chrome.runtime.lastError);
    }
    resolve(tab);
  });
});

const executeScript = (tabId, details) => new Promise((resolve, reject) => {
  chrome.tabs.executeScript(tabId, details, (result) => {
    if (chrome.runtime.lastError) {
      reject(chrome.runtime.lastError)
    }
    resolve(result);
  });
});

const get = (tabId) => new Promise((resolve, reject) => {
  chrome.tabs.get(tabId, (tab) => {
    if (chrome.runtime.lastError) {
      reject(chrome.runtime.lastError);
    }
    resolve(tab);
  });
});

const query = (queryInfo) => new Promise((resolve, reject) => {
  chrome.tabs.query(queryInfo, (tab) => {
    if (chrome.runtime.lastError) {
      reject(chrome.runtime.lastError);
    }
    resolve(tab);
  });
});

const remove = (tabIds) => new Promise((resolve, reject) => {
  chrome.tabs.remove(tabIds, () => {
    if (chrome.runtime.lastError) {
      reject(chrome.runtime.lastError);
    }
    resolve();
  });
});

const update = (tabId, updateProperties) => new Promise((resolve, reject) => {
  chrome.tabs.update(tabId, updateProperties, (tab) => {
    if (chrome.runtime.lastError) {
      reject(chrome.runtime.lastError)
    }
    resolve(tab);
  });
});

export default {
  create,
  executeScript,
  get,
  query,
  remove,
  update,
}
