export const MAIN_SITE_ORIGIN = 'https://vi.icue.vn'
const MAIN_SITE_HOSTS = new Set(['icue.vn', 'www.icue.vn', 'en.icue.vn', 'vn.icue.vn', 'vi.icue.vn'])
const PORTAL_HOSTS = new Set(['hr.icue.vn', 'contract.icue.vn'])

export function normalizeTheme(value) {
  return value === 'light' || value === 'dark' ? value : null
}

/** Decorate ICUE navigation without changing anchors, downloads or third-party links. */
export function withNavigationPreferences(href, { locale, theme } = {}) {
  if (!href || href.startsWith('#') || !/^https?:\/\//i.test(href)) return href
  let url
  try { url = new URL(href) } catch { return href }
  const mainSite = MAIN_SITE_HOSTS.has(url.hostname)
  if (!mainSite && !PORTAL_HOSTS.has(url.hostname)) return href
  if (mainSite) {
    url.protocol = 'https:'
    url.host = new URL(MAIN_SITE_ORIGIN).host
    if (locale) url.searchParams.set('lang', locale)
  }
  if (normalizeTheme(theme) && !/\.(?:pdf|zip|docx?|xlsx?|png|jpe?g|webp|mp4)$/i.test(url.pathname)) url.searchParams.set('theme', theme)
  return url.href
}
