import en from 'locales/en';
import ru from 'locales/ru';

const translations = {
  en,
  ru,
};

export const languages = Object.keys(translations);

export default (key, language) => {
  if (!translations[language]) {
    throw new Error(`No ${language} locale found`);
  }
  return translations[language][key] || '???';
};
