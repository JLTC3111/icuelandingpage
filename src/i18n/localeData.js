const loaders = {
  vi: () => import('../data/locales/vi.js'),
  en: () => import('../data/locales/en.js'),
  de: () => import('../data/locales/de.js'),
  fr: () => import('../data/locales/fr.js'),
  ko: () => import('../data/locales/ko.js'),
  ja: () => import('../data/locales/ja.js'),
}
const founderLoaders = {
  vi: () => import('../data/locales/vi-founder.js'),
  en: () => import('../data/locales/en-founder.js'),
  de: () => import('../data/locales/de-founder.js'),
  fr: () => import('../data/locales/fr-founder.js'),
  ko: () => import('../data/locales/ko-founder.js'),
  ja: () => import('../data/locales/ja-founder.js'),
}
const loaded = new Map()
const pending = new Map()

export function getLocaleData(locale) { return loaded.get(locale) }

export function loadLocaleData(locale) {
  if (loaded.has(locale)) return Promise.resolve(loaded.get(locale))
  if (!pending.has(locale)) {
    const promise = loaders[locale]().then(({ default: data }) => {
      loaded.set(locale, data)
      pending.delete(locale)
      return data
    }).catch(error => { pending.delete(locale); throw error })
    pending.set(locale, promise)
  }
  return pending.get(locale)
}

export function loadFounderData(locale) { return founderLoaders[locale]().then(module => module.default) }
