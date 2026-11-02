import assert from 'node:assert/strict'
import { mkdtemp, readFile, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { chromium } from 'playwright'
import { preview } from 'vite'

const artifacts = await mkdtemp(path.join(os.tmpdir(), 'icue-performance-'))
const content = JSON.parse(await readFile(new URL('../src/data/siteContent.json', import.meta.url), 'utf8'))
const server = await preview({ preview: { host: '127.0.0.1', port: 5192, strictPort: true } })
const origin = server.resolvedUrls.local[0]
const results = []
let browser
try {
  browser = await chromium.launch({ headless: true,
    ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : { channel: process.env.PLAYWRIGHT_CHANNEL || 'chrome' }),
  })
  for (const locale of ['vi', 'en', 'de', 'fr', 'ja', 'ko']) {
    for (const theme of ['light', 'dark']) {
      const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
      const page = await context.newPage()
      const requests = []
      const errors = []
      page.on('request', request => requests.push(request.url()))
      page.on('pageerror', error => errors.push(error.message))
      page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`) })
      await page.addInitScript(() => {
        window.__strokes = 0
        const stroke = CanvasRenderingContext2D.prototype.stroke
        CanvasRenderingContext2D.prototype.stroke = function (...args) { window.__strokes++; return stroke.apply(this, args) }
      })
      await page.goto(`${origin}?lang=${locale}&theme=${theme}`, { waitUntil: 'load' })
      await page.locator('#hero-title').waitFor()
      await page.waitForTimeout(700)
      assert.equal(await page.locator('html').getAttribute('lang'), locale)
      assert.equal(await page.locator('html').getAttribute('data-theme'), theme)
      assert.equal(requests.filter(url => url.endsWith('.mp4')).length, 0, 'Offscreen videos must not download')
      assert.equal(await page.locator('video[src], video[poster]').count(), 0, 'Offscreen video sources and posters stay absent')
      assert.equal(await page.locator('.avatar img').count(), 5)
      assert(await page.locator('.avatar img').evaluateAll(images => images.every(image => image.complete && image.naturalWidth <= 144)), 'Hero avatars use decoded thumbnails')
      const resources = await page.evaluate(() => performance.getEntriesByType('resource').map(entry => ({ url: entry.name, bytes: entry.encodedBodySize, initiator: entry.initiatorType })))
      const initialBytes = resources.reduce((sum, resource) => sum + resource.bytes, 0)
      assert(initialBytes < 1_000_000, `${locale}: startup payload exceeded 1 MB (${initialBytes})`)
      const loadedLocales = [...new Set(resources.flatMap(resource => resource.url.match(/\/assets\/(vi|en|de|fr|ja|ko)-[^/]+\.js$/)?.[1] || []))]
      assert.deepEqual(loadedLocales, [locale], 'Only the selected translation downloads initially')
      results.push({ locale, theme, initialBytes, resources })

      const slider = page.locator('.image-comparison__slider')
      await slider.focus()
      await page.keyboard.press('End')
      await page.waitForFunction(() => document.querySelector('.image-comparison__slider').getAttribute('aria-valuenow') === '100')
      await page.keyboard.press('Home')
      await page.keyboard.press('Shift+ArrowRight')
      await page.waitForFunction(() => document.querySelector('.image-comparison__slider').getAttribute('aria-valuenow') === '10')

      if (locale === 'vi' && theme === 'light') {
        await page.mouse.move(0, 0)
        await page.evaluate(() => { window.__strokes = 0; window.__sampleStart = performance.now() })
        await page.waitForTimeout(2000)
        const idle = await page.evaluate(() => ({ strokes: window.__strokes, milliseconds: performance.now() - window.__sampleStart }))
        results.at(-1).idle = idle
        assert(idle.strokes / idle.milliseconds * 1000 < 7000, `Idle decoration exceeds stroke budget: ${JSON.stringify(idle)}`)
        await page.screenshot({ path: path.join(artifacts, 'hero-desktop.png') })

        // Loading a menu on demand must still give immediate keyboard access.
        await page.locator('.menu-button').click()
        await page.locator('.staggered-menu-dialog[open]').waitFor()
        await page.keyboard.press('Escape')
        await page.locator('.staggered-menu-dialog[open]').waitFor({ state: 'hidden' })
        assert.equal(await page.locator('.menu-button').getAttribute('aria-expanded'), 'false')

        await page.locator('#approach').scrollIntoViewIfNeeded()
        await page.locator('.ag-panel').first().waitFor()
        for (let group = 0; group < 4; group++) {
          await page.locator('.value h3 button').nth(group).click()
          const panels = page.locator('.ag-panel')
          await panels.first().waitFor()
          await panels.first().focus()
          await page.keyboard.press('ArrowRight')
          await page.keyboard.press('Enter')
          const viewer = page.locator('.ag-lightbox[open]')
          await viewer.waitFor()
          assert.equal(await viewer.locator('img').getAttribute('src'), content.locales.vi.valuesGallery.groups[group][1].fullImage, 'Viewer retains original photos')
          await page.keyboard.press('Escape')
          await viewer.waitFor({ state: 'hidden' })
        }
        await page.waitForFunction(() => {
          const image = document.querySelector('.ag-panel--active .ag-panel__img')
          return image?.complete && image.naturalWidth > 0 && Number(getComputedStyle(image).opacity) > .99
        })
        await page.waitForTimeout(700)
        await page.screenshot({ path: path.join(artifacts, 'gallery-desktop.png') })

        await page.locator('#platforms').scrollIntoViewIfNeeded()
        await page.waitForFunction(() => [...document.querySelectorAll('video')].some(video => !video.paused))
        assert(requests.some(url => url.endsWith('.preview.mp4')), 'Cards load optimized video copies')
        const firstVideo = page.locator('video').first()
        await page.locator('.platform-video-control').first().click({ force: true })
        assert(await firstVideo.evaluate(video => video.paused), 'Explicit pause works')
        await page.locator('#about').scrollIntoViewIfNeeded()
        await page.locator('#platforms').scrollIntoViewIfNeeded()
        await page.waitForTimeout(300)
        assert(await firstVideo.evaluate(video => video.paused), 'Explicit pause survives leaving and returning')
        await page.locator('.platform-video-control').first().click({ force: true })
        await page.waitForFunction(() => !document.querySelector('video').paused)
        await page.screenshot({ path: path.join(artifacts, 'platforms-desktop.png') })

        await page.locator('#founder').scrollIntoViewIfNeeded()
        await page.locator('.stepper-trigger').first().waitFor()
        assert.equal(await page.locator('.stepper-content').count(), 1, 'Unopened biography chapters defer their bodies')
        await page.locator('.stepper-trigger').nth(4).click()
        await page.locator('.stepper-item.is-active .founder-event-trigger').first().click()
        await page.locator('.stepper-item.is-active .founder-event-photo img').waitFor()
        await page.locator('.stepper-trigger').nth(5).click()
        await page.locator('.stepper-trigger').nth(4).click()
        await page.waitForFunction(() => document.querySelectorAll('.stepper-trigger')[4].getAttribute('aria-expanded') === 'true')
        assert.equal(await page.locator('.stepper-item.is-active .founder-event-photo img').count(), 0, 'Chapter changes close photos')
        await page.waitForTimeout(450)
        await page.screenshot({ path: path.join(artifacts, 'founder-desktop.png') })
      }
      if (locale === 'ja' && theme === 'light') await page.screenshot({ path: path.join(artifacts, 'hero-japanese.png') })
      assert.deepEqual(errors, [], `${locale}/${theme} page errors`)
      await context.close()
    }
  }

  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })
  const page = await mobile.newPage()
  await page.goto(`${origin}?lang=vi`, { waitUntil: 'load' })
  await page.locator('#hero-title').waitFor()
  await page.locator('.hero-comparison').scrollIntoViewIfNeeded()
  const rect = await page.locator('.hero-comparison').boundingBox()
  const touch = await mobile.newCDPSession(page)
  await touch.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: rect.x + rect.width * .2, y: rect.y + rect.height / 2 }] })
  await touch.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: rect.x + rect.width * .8, y: rect.y + rect.height / 2 }] })
  await touch.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
  await page.waitForFunction(() => Number(document.querySelector('.image-comparison__slider').getAttribute('aria-valuenow')) > 70)
  assert.equal(await page.locator('video[src]').count(), 0)
  await page.screenshot({ path: path.join(artifacts, 'hero-mobile.png'), fullPage: false })
  await mobile.close()

  const reduced = await browser.newContext({ reducedMotion: 'reduce' })
  const reducedPage = await reduced.newPage()
  await reducedPage.goto(`${origin}?lang=ja#founder`, { waitUntil: 'load' })
  await reducedPage.locator('.stepper-trigger').first().waitFor()
  await reducedPage.waitForFunction(() => { const top = document.querySelector('#founder').getBoundingClientRect().top; return top >= -100 && top < innerHeight })
  await reduced.close()

  // Slow responses must not restore an earlier language after a newer choice.
  const switching = await browser.newContext()
  const switchingPage = await switching.newPage()
  await switchingPage.route(/\/assets\/ja-[^/]+\.js$/, async route => {
    await new Promise(resolve => setTimeout(resolve, 350))
    await route.continue()
  })
  await switchingPage.goto(`${origin}?lang=vi&theme=dark`)
  await switchingPage.locator('#hero-title').waitFor()
  const language = switchingPage.locator('.header-controls select')
  await language.selectOption('ja')
  await language.selectOption('de')
  await switchingPage.waitForFunction(() => document.documentElement.lang === 'de')
  await switchingPage.waitForTimeout(500)
  assert.equal(await switchingPage.locator('html').getAttribute('lang'), 'de')
  assert.equal(await switchingPage.locator('html').getAttribute('data-theme'), 'dark')
  assert.equal(new URL(switchingPage.url()).searchParams.get('lang'), 'de')
  await switching.close()
  console.log(`Passed performance and interaction checks. Screenshots and measurements: ${artifacts}`)
} finally {
  await writeFile(path.join(artifacts, 'results.json'), JSON.stringify(results, null, 2))
  console.log(`Browser artifacts: ${artifacts}`)
  await browser?.close()
  await new Promise(resolve => server.httpServer.close(resolve))
}
