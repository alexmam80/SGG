import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import ro from './ro.json'
import ru from './ru.json'

const saved = localStorage.getItem('lang')
const browser = (navigator.language || 'ro').slice(0,2)
const startLng = saved || (['ro','ru'].includes(browser) ? browser : 'ro')

i18n.use(initReactI18next).init({
  resources: { ro:{translation: ro}, ru:{translation: ru} },
  lng: startLng,
  fallbackLng: 'ro',
  interpolation: { escapeValue: false }
})

document.documentElement.lang = startLng
i18n.on('languageChanged', (lng)=> document.documentElement.lang = lng)

export default i18n
