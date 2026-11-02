import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { detectLocale } from './i18n/LocaleProvider.jsx'
import { loadLocaleData } from './i18n/localeData.js'
import './cjk-fonts.css'
import './styles.css'
import './theme.css'

const root = createRoot(document.getElementById('root'))
const locale = detectLocale()
const render = initialData => root.render(<React.StrictMode><App initialLocale={locale} initialData={initialData} /></React.StrictMode>)
loadLocaleData(locale).then(render).catch(() => render())
