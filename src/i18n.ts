import en from './assets/locales/en.json'
import fr from './assets/locales/fr.json'
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources: { fr, en },
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    returnNull: false,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  })

document.documentElement.lang = i18n.language

export default i18n
