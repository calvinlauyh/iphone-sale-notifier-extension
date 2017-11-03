import i18n from 'i18next';
import constant from 'constant';
// import Backend from 'i18next-xhr-backend';
import { reactI18nextModule } from 'react-i18next';
const en = require('../../locales/en.json');
const zh_tw = require('../../locales/zh_tw.json');

let language = localStorage.getItem('language');
if (language === null) {
  language = (chrome.i18n.getUILanguage().match(/^zh/) === null? constant.LANGUAGE.EN: constant.LANGUAGE.ZH_TW);
  console.error("Missing `language` in localStorage");
} else {
  language = JSON.parse(language);
}

i18n
  // .use(Backend)
  .use(reactI18nextModule)
  .init({
    fallbackLng: language,

    debug: (process.env.NODE_ENV !== 'production' || process.env.NODE_ENV === 'devbuild'),

    interpolation: {
      escapeValue: false,
    },

    resources: {
      en: {
        translation: en
      },
      zh_tw: {
        translation: zh_tw
      }
    },
    // backend: {
    //   loadPath: '/locales/{{lng}}/messages.json',
    //   crossDomain: false
    // },

    react: {
      wait: true
    }
  });

export default i18n;
