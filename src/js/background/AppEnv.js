import chromep from '../library/chrome-promise';
import constant from '../constant';

// Dictonary of key and default value for local storage
const storageDefault = {
  status:       constant.STATUS.DISABLED,
  monitorList:  [],
  phoneStatus:  {},
  language:     (chrome.i18n.getUILanguage().match(/^zh/) === null? constant.LANGUAGE.EN: constant.LANGUAGE.ZH_TW),
  maxTab:       1,
}
// List of keys that have to be synchornized with local stroage
const storageKeys = Object.keys(storageDefault);

/**
 * Get the root key of a key chain
 * @param  {String} keyChain The key chain to get the root
 * @return {String}          Name of the root key
 */
function getRootKey(keyChain) {
  return keyChain.split('.')[0];
}
/**
 * Remove the root key from a key chain
 * @param  {String} keyChain The key chain to remove its root
 * @return {String}          New key with the root of key chain removed
 */
function removeRootKey(keyChain) {
  return keyChain.split('.').slice(1).join('.');
}
/**
 * Check if the object has all the key specified in the key chain
 * @param  {Object}  obj      The object to check against
 * @param  {String}  keyChain A key chain in the format a.b.c
 * @return {Boolean}          true if the key chain exists in the object,
 *                            false otherwise
 */
function objHasKeyChain(obj, keyChain) {
  const keyList = keyChain.split('.');
  let tmp = obj;
  for (let i=0,l=keyList.length; i<l; i++) {
    const key = keyList[i];
    if (typeof tmp[key] === 'undefined') {
      return false;
    }
    tmp = tmp[key];
  }
  return true;
}
/**
 * Get the value referenced by the key chain
 * @param  {Mixed} target    The target object retrieved from storage
 * @param  {String} keyChain A key chain in the format a.b.c
 * @return {Mixed}           Value referenced by the key chain
 * @throws {Error}           If the key chain does not exist in the target
 */
function getValueByKeyChain(target, keyChain) {
  if (keyChain === '') {
    return target;
  }
  const keyList = keyChain.split('.');
  return keyChain.split('.').reduce((tmp, key) => {
    if (typeof tmp[key] === 'undefined') {
      throw new Error(`Cannot read undefined item '${keyChain}'`);
    }
    return tmp[key];
  }, target);
}
/**
 * Update the key specified by the key chain of the target to the new value
 * @param {Object} target   The target object retrieved from storage
 * @param {String} keyChain A key chain in the format a.b.c
 * @param {Mixed} value     The updated target
 * @throws {Error}          If the key chain does not exist in the target
 */
function setValueByKeyChain(target, keyChain, value) {
  if (keyChain === '') {
    // boundary case, and should not happen
    return value;
  }
  const keyList = keyChain.split('.');
  let tmp = target;
  let i=0;
  for (let l=keyList.length-1; i<l; i++) {
    if (typeof tmp[keyList[i]] === 'undefined') {
      throw new Error(`Cannot set undefined item '${keyChain}'`);
    }
    tmp = tmp[keyList[i]];
  }
  tmp[keyList[i]] = value;
  return target;
}
/**
 * A class for updating and retrieving App environment variables with auto
 * synchronization between the enviornment and storage
 * @async
 * @return {Promise} Promise that resolves to the AppEnv instance or rejects
 *                   with an Error when error occurs
 * @throws {Error}   If there is error when getting config from storage
 */
export default () => {
  let _data = {};

  const repair = () => {
    // TODO: region support
    // Check for missing and incorrect config in local storage
    for(var key of storageKeys) {
      const defaultValue = storageDefault[key];
      const item = localStorage.getItem(key);
      if (item === null || typeof JSON.parse(item) !== typeof defaultValue) {
        // Try to repair local storage by setting the item to default value
        localStorage.setItem(key, JSON.stringify(defaultValue));
      }
    }
  }

  // Try to repair any abnormality in localStorage items
  repair();

  _data = {
    tabRuntime: {
      jobList: [],       // List of available jobs
      nextJobIdx: 0,     // Next job index
      workerTabDict: {}, // Dictionary of worker tabs
    },
    notification: {}     // Dictionary of on notification click handlers
  };

  let exportMethods = {
    get: (keyChain) => {
      const rootKey = getRootKey(keyChain);
      // Retrieve from storage if needed
      if (typeof storageDefault[rootKey] !== 'undefined') {
        const rawRootValue = localStorage.getItem(rootKey);
        if (rawRootValue === null) {
          // The root key is not found in local storage
          throw new Error(`Cannot read undefined item '${keyChain}' in local storage`);
        }
        const rootValue = JSON.parse(rawRootValue);
        return getValueByKeyChain(rootValue, removeRootKey(keyChain));
      }
      // Retreive it from the App enviornment variables
      if (!objHasKeyChain(_data, keyChain)) {
        throw new Error(`Cannot read undefined App envionrment variable '${keyChain}'`);
      }
      return getValueByKeyChain(_data, keyChain);
    },
    set: (keyChain, value) => {
      const rootKey = getRootKey(keyChain);
      // Synchronize with storage if needed
      if (typeof storageDefault[rootKey] !== 'undefined') {
        // Get the root value to update it through the key chain
        const rootValue = JSON.parse(localStorage.getItem(rootKey));
        const newValue = setValueByKeyChain(rootValue, removeRootKey(keyChain), value);
        localStorage.setItem(rootKey, JSON.stringify(newValue));
        return;
      }
      _data = setValueByKeyChain(_data, keyChain, value);
    },
    repair
  }
  // Export internal methods for testing if the Node envioronment is test
  if (process.env.NODE_ENV === 'test') {
    exportMethods['__setData'] = (data) => {
      _data = data;
    };
    exportMethods['__getData'] = () => _data;
  }

  return exportMethods;
}