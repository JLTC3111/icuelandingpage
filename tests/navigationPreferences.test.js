import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { runInNewContext } from 'node:vm'
import { withNavigationPreferences, normalizeTheme } from '../src/lib/navigationPreferences.js'

test('all six locales and both themes survive cross-origin navigation', () => {
  for (const locale of ['vi', 'en', 'de', 'fr', 'ko', 'ja']) for (const theme of ['light', 'dark']) {
    for (const host of ['icue.vn', 'www.icue.vn', 'en.icue.vn', 'vi.icue.vn']) {
      const url = new URL(withNavigationPreferences(`https://${host}/newsroom/?category=research#latest`, { locale, theme }))
      assert.equal(url.origin, 'https://vi.icue.vn')
      assert.equal(url.pathname, '/newsroom/')
      assert.equal(url.searchParams.get('lang'), locale)
      assert.equal(url.searchParams.get('theme'), theme)
      assert.equal(url.searchParams.get('category'), 'research')
      assert.equal(url.hash, '#latest')
    }
  }
})

test('portal links keep their hosts and receive the selected theme', () => {
  for (const host of ['hr.icue.vn', 'contract.icue.vn']) {
    const url = new URL(withNavigationPreferences(`https://${host}/?next=dashboard`, { locale: 'fr', theme: 'light' }))
    assert.equal(url.hostname, host)
    assert.equal(url.searchParams.get('theme'), 'light')
    assert.equal(url.searchParams.get('next'), 'dashboard')
  }
})

test('anchors, external links, actions, and document downloads remain usable', () => {
  for (const href of ['#people', 'mailto:info@icue.vn', 'tel:+842437728485', 'https://facebook.com/icue', 'https://icue.vn.evil.example/']) assert.equal(withNavigationPreferences(href, { theme: 'dark' }), href)
  const download = new URL(withNavigationPreferences('https://icue.vn/docs/capability_statement.pdf', { theme: 'dark' }))
  assert.equal(download.origin, 'https://vi.icue.vn')
  assert.equal(download.searchParams.has('theme'), false)
  assert.equal(normalizeTheme('auto'), null)
})

test('all redirect destinations and saved main-site links use the new origin', async () => {
  const redirects = await readFile(new URL('../public/_redirects', import.meta.url), 'utf8')
  let checked = 0
  for (const line of redirects.split('\n')) {
    if (!line.trim() || line.trim().startsWith('#')) continue
    const [, target, status] = line.trim().split(/\s+/)
    assert.equal(new URL(target).origin, 'https://vi.icue.vn', line)
    assert.equal(status, '301!', line)
    checked++
  }
  assert(checked >= 34)
  const data = JSON.parse(await readFile(new URL('../src/data/siteContent.json', import.meta.url), 'utf8'))
  for (const [locale, content] of Object.entries(data.locales)) {
    const main = content.platforms.apps.find(app => app.id === 'website')
    const url = new URL(main.href)
    assert.equal(url.origin, 'https://vi.icue.vn')
    assert.equal(url.searchParams.get('lang'), locale)
  }
})

test('the legacy forwarder preserves language, theme, and legacy route details', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8')
  const script = html.match(/<script>([\s\S]*?)<\/script>/)[1]
  for (const selected of ['light', 'dark']) {
    let destination
    runInNewContext(script, { URL, location: { search: '?lang=fr&campaign=legacy', hash: '#/News?article=42', replace: (href) => { destination = new URL(href) } }, localStorage: { getItem: () => selected } })
    assert.equal(destination.origin, 'https://vi.icue.vn')
    assert.equal(destination.searchParams.get('theme'), selected)
    assert.equal(destination.searchParams.get('lang'), 'fr')
    assert.equal(destination.searchParams.get('campaign'), 'legacy')
    assert.equal(destination.hash, '#/News?article=42')
  }
  for (const hash of ['#home', '#about', '#people', '#/Home', '#/Home/']) {
    runInNewContext(script, { URL, location: { search: '', hash, replace: () => assert.fail('Landing anchors must remain on the landing page') } })
  }
})

test('the pre-paint script prefers an explicit incoming theme over saved preference', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8')
  const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(match => match[1])
  for (const selected of ['light', 'dark']) {
    const root = { dataset: {}, style: {} }
    runInNewContext(scripts[1], { URLSearchParams, location: { search: `?theme=${selected}` }, document: { documentElement: root }, localStorage: { getItem: () => selected === 'light' ? 'dark' : 'light' }, matchMedia: () => ({ matches: selected !== 'dark' }) })
    assert.equal(root.dataset.theme, selected)
    assert.equal(root.style.colorScheme, selected)
  }
})
