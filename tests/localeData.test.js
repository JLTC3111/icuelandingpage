import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { getLocaleData, loadFounderData, loadLocaleData } from '../src/i18n/localeData.js'
import messages from '../src/i18n/messages.js'
import founderContent from '../src/data/founderContent.js'
import founderBiography from '../src/data/founderBiography.js'
import leadershipContent from '../src/data/leadershipContent.js'

test('independently loaded locale packs retain the canonical content and optimized assets', async () => {
  const source = JSON.parse(await readFile(new URL('../src/data/siteContent.json', import.meta.url), 'utf8'))
  for (const locale of ['vi', 'en', 'de', 'fr', 'ko', 'ja']) {
    const pending = loadLocaleData(locale)
    assert.equal(loadLocaleData(locale), pending, 'concurrent requests share the import')
    const data = await pending
    assert.equal(getLocaleData(locale), data)
    assert.equal(data.locale, locale)
    assert.deepEqual(data.copy, messages[locale])
    assert.deepEqual(data.content, source.locales[locale])
    assert.deepEqual(data.founder, founderContent[locale])
    assert.deepEqual(data.leadership, leadershipContent[locale])
    assert.equal(data.founderBiography, undefined, 'the reader stays out of the initial locale pack')
    const { nguoiDoThi, remembrance, ...reader } = await loadFounderData(locale)
    assert.deepEqual(reader, founderBiography[locale])
    assert.match(nguoiDoThi, /^https:/)
    assert.match(remembrance, /^https:/)
  }
})
