export default {
  STATUS: {
    ENABLED: 0,
    DISABLED: 1,
    TABCLOSED: 2
  },

  PHONESTATUS: {
    UNAVAILABLE: 0,
    INSTOCK: 1,
    PENDING: 2,
  },

  LANGUAGE: {
    EN: 'en',
    ZH_TW: 'zh_tw',
    ZH_HK: 'zh_hk'
  },

  DEFAULT_CONFIG: {
    'storeRegion': 'hk'
  },
  STORE_REGION_LIST: ['hk'],

  ERR_APPENV_KEYCHAIN_INVALID: 'Invalid AppEnv key chain',
  ERR_LOCALSTORAGE_GETFAIL: 'Unable to get item from local storage',
  ERR_LOCALSTORAGE_SETFAIL: 'Unable to set items to local storage',
  ERR_LOCALSTORAGE_REPAIRFAIL: 'Unable to repair local storage',
  ERR_WORKERTAB_NOTFOUND: 'WORKERTAB_NOTFOUND',
};
