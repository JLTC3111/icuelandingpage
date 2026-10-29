import { createContext, useContext, useEffect, useState } from 'react'
import siteContent from '../data/siteContent.json'
import messages from './messages.js'
import { MAIN_SITE_ORIGIN, normalizeTheme, withNavigationPreferences } from '../lib/navigationPreferences.js'

export const LANGUAGES = [
  { code: 'vi', label: 'Tiếng Việt' }, { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' }, { code: 'fr', label: 'Français' },
  { code: 'ko', label: '한국어' }, { code: 'ja', label: '日本語' },
]
export const LANGUAGE_KEY = 'icue_news_lang'
export const THEME_KEY = 'icue-landing-theme'
export { MAIN_SITE_ORIGIN } from '../lib/navigationPreferences.js'
const LocaleContext = createContext(null)
const aliases = { vn: 'vi', gb: 'en', uk: 'en', kr: 'ko', jp: 'ja' }

export function normalizeLocale(value) {
  const base = String(value || '').trim().toLowerCase().replaceAll('_', '-').split('-')[0]
  const code = aliases[base] || base
  return LANGUAGES.some((l) => l.code === code) ? code : null
}

function readStorage(key) {
  try { return window.localStorage.getItem(key) } catch { return null }
}

export function detectLocale() {
  if (typeof window === 'undefined') return 'vi'
  const params = new URLSearchParams(window.location.search)
  return normalizeLocale(params.get('lang') || params.get('site')) || normalizeLocale(readStorage(LANGUAGE_KEY)) || 'vi'
}

function detectTheme() {
  if (typeof window === 'undefined') return 'light'
  const incoming = normalizeTheme(new URLSearchParams(window.location.search).get('theme'))
  if (incoming) return incoming
  const saved = readStorage(THEME_KEY)
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function LocaleProvider({ children, initialLocale, initialTheme }) {
  const [locale, updateLocale] = useState(() => normalizeLocale(initialLocale) || detectLocale())
  const [theme, updateTheme] = useState(() => normalizeTheme(initialTheme) || detectTheme())
  const copy = messages[locale]

  useEffect(() => {
    document.documentElement.lang = locale
    document.title = copy.metaTitle
    document.querySelector('meta[name="description"]')?.setAttribute('content', copy.metaDescription)
    try { window.localStorage.setItem(LANGUAGE_KEY, locale) } catch { /* Storage is optional. */ }
  }, [locale, copy])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#171b18' : '#f7f7f2')
    try { window.localStorage.setItem(THEME_KEY, theme) } catch { /* Storage is optional. */ }
  }, [theme])

  useEffect(() => {
    const restore = () => { updateLocale(detectLocale()); updateTheme(detectTheme()) }
    const syncStorage = (event) => {
      if (event.key === THEME_KEY && normalizeTheme(event.newValue)) updateTheme(event.newValue)
    }
    window.addEventListener('popstate', restore)
    window.addEventListener('storage', syncStorage)
    return () => { window.removeEventListener('popstate', restore); window.removeEventListener('storage', syncStorage) }
  }, [])

  const setLocale = (value) => {
    const next = normalizeLocale(value)
    if (!next) return
    updateLocale(next)
    const url = new URL(window.location.href)
    url.searchParams.delete('site')
    url.searchParams.set('lang', next)
    window.history.replaceState(window.history.state, '', url)
  }
  const navigationHref = (href) => withNavigationPreferences(href, { locale, theme })
  const site = (path) => navigationHref(new URL(path, MAIN_SITE_ORIGIN).href)
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    updateTheme(next)
    const url = new URL(window.location.href)
    if (url.searchParams.has('theme')) {
      url.searchParams.set('theme', next)
      window.history.replaceState(window.history.state, '', url)
    }
  }

  return <LocaleContext.Provider value={{ locale, setLocale, theme, toggleTheme, copy, content: siteContent.locales[locale], contact: siteContent.contact, site, navigationHref }}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  return useContext(LocaleContext)
}
