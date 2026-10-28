import { createContext, useContext, useEffect, useState } from 'react'
import siteContent from '../data/siteContent.json'
import messages from './messages.js'

export const LANGUAGES = [
  { code: 'vi', label: 'Tiếng Việt' }, { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' }, { code: 'fr', label: 'Français' },
  { code: 'ko', label: '한국어' }, { code: 'ja', label: '日本語' },
]
export const LANGUAGE_KEY = 'icue_news_lang'
export const THEME_KEY = 'icue-landing-theme'
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
  const saved = readStorage(THEME_KEY)
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function LocaleProvider({ children, initialLocale, initialTheme }) {
  const [locale, updateLocale] = useState(() => normalizeLocale(initialLocale) || detectLocale())
  const [theme, updateTheme] = useState(() => initialTheme || detectTheme())
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
    const restore = () => updateLocale(detectLocale())
    window.addEventListener('popstate', restore)
    return () => window.removeEventListener('popstate', restore)
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
  const site = (path) => {
    const url = new URL(path, 'https://icue.vn')
    url.searchParams.set('lang', locale)
    return url.href
  }

  return <LocaleContext.Provider value={{ locale, setLocale, theme, toggleTheme: () => updateTheme((t) => t === 'dark' ? 'light' : 'dark'), copy, content: siteContent.locales[locale], contact: siteContent.contact, site }}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  return useContext(LocaleContext)
}
