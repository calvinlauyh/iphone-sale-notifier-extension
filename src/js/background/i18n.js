import i18n from 'i18next';
import constant from 'constant';
const en = require('../../locales/en.json');
const zh_tw = require('../../locales/zh_tw.json');

let language = localStorage.getItem('language');
if (language === null) {
  language = (chrome.i18n.getUILanguage().match(/^zh/) === null? constant.LANGUAGE.EN: constant.LANGUAGE.ZH_TW);;
  console.error("Missing `language` in localStorage");
} else {
  language = JSON.parse(language);
}

i18n
  .init({
    fallbackLng: language,
    resources: {
      en: {
        translation: en
      },
      zh_tw: {
        translation: zh_tw
      }
    },

    debug: (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'devbuild'),
  });

export default i18n;
