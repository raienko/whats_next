import i18next from 'i18next';
import en from 'locales/en';
import ru from 'locales/ru';

const options = {
  lng: 'en',
  debug: global.__DEV__,
  resources: {
    en: {
      translation: en,
    },
    ru: {
      translation: ru,
    },
  },
};

export default new (class Localization {
  init() {
    return i18next.init(options);
  }

  translate(key, params) {
    return i18next.t(key, params);
  }

  changeLanguage(language) {
    return i18next.changeLanguage(language);
  }

  getCurrentLanguage() {
    return i18next.language;
  }
})();
