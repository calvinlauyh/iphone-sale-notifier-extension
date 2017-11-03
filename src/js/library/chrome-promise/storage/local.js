const get = (keys) => new Promise((resolve, reject) => {
  chrome.storage.local.get(keys, (items) => {
    if (chrome.runtime.lastError) {
      reject(chrome.runtime.lastError);
    }
    resolve(items);
  });
});

const set = (items) => new Promise((resolve, reject) => {
  chrome.storage.local.set(items, () => {
    if (chrome.runtime.lastError) {
      reject(chrome.runtime.lastError);
    }
    resolve();
  });
});

export default {
  get,
  set,
}