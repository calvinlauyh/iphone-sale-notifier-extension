const create = (notificationId, options) => new Promise((resolve, reject) => {
  chrome.notifications.create(notificationId, options, (notificationId) => {
    if (chrome.runtime.lastError) {
      reject(chrome.runtime.lastError)
    }
    resolve(notificationId);
  });
});

export default {
  create,
};
