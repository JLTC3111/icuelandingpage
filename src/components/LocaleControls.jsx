import { Languages, Moon, Sun } from 'lucide-react'
import { LANGUAGES, useLocale } from '../i18n/LocaleProvider.jsx'

export default function LocaleControls({ className = '' }) {
  const { copy, locale, pendingLocale, setLocale, theme, toggleTheme } = useLocale()
  const ThemeIcon = theme === 'dark' ? Sun : Moon
  return <div className={`locale-controls ${className}`}>
    <label className="language-control"><Languages size={16} aria-hidden="true" /><span className="sr-only">{copy.ui.language}</span><select value={pendingLocale || locale} aria-busy={Boolean(pendingLocale)} onChange={(event) => setLocale(event.target.value)} aria-label={copy.ui.language}>{LANGUAGES.map(language => <option key={language.code} value={language.code} lang={language.code}>{language.label}</option>)}</select></label>
    <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label={theme === 'dark' ? copy.ui.lightTheme : copy.ui.darkTheme}><ThemeIcon size={17} strokeWidth={1.5} /></button>
  </div>
}
