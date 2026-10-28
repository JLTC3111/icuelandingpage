import { cp, mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { VALUE_GALLERY_PHOTOS, VALUE_GALLERY_CAPTIONS } from './value-gallery-content.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const source = path.resolve(process.argv[2] || path.join(root, '../ICUE-mainsite-vn'))
const readJson = async (file) => JSON.parse(await readFile(path.join(source, file), 'utf8'))
const people = await readJson('people-app/src/data/people.json')
const { getOurWorkContent } = await import(pathToFileURL(path.join(source, 'ourwork-app/src/data/ourWorkScopes.js')))
const { PAST_PROJECTS } = await import(pathToFileURL(path.join(source, 'home-app/src/data/pastProjectsContent.js')))
const { getAppNavigation } = await import(pathToFileURL(path.join(source, 'shared/app-switcher/appLinks.js')))
const { GALLERY_PLACEHOLDERS } = await import(pathToFileURL(path.join(source, 'home-app/src/data/galleryPlaceholders.js')))
const contactSource = await readFile(path.join(source, 'contact-app/src/data/contactChannels.js'), 'utf8')
const contactValue = (name) => contactSource.match(new RegExp(`(?:export )?const ${name} = '([^']+)'`))?.[1]

const selectedPeople = people.filter((p) => p.group === 'core').slice(0, 4)
selectedPeople.unshift(...people.filter((p) => p.group === 'experts').slice(0, 5))
const landingPhoto = (person) => person.id === 'do-bao-long' ? 'longdoorgstructure_prev.png' : path.basename(person.photo)

const galleryControls = {
  vi: { viewer: 'Trình xem ảnh', close: 'Đóng ảnh', previous: 'Ảnh trước', next: 'Ảnh tiếp theo', fullSize: 'Xem kích thước đầy đủ' },
  en: { viewer: 'Photo viewer', close: 'Close photo viewer', previous: 'Previous photo', next: 'Next photo', fullSize: 'View full size' },
  de: { viewer: 'Fotoansicht', close: 'Fotoansicht schließen', previous: 'Vorheriges Foto', next: 'Nächstes Foto', fullSize: 'In voller Größe ansehen' },
  fr: { viewer: 'Visionneuse de photos', close: 'Fermer la photo', previous: 'Photo précédente', next: 'Photo suivante', fullSize: 'Voir en grand' },
  ko: { viewer: '사진 뷰어', close: '사진 닫기', previous: '이전 사진', next: '다음 사진', fullSize: '원본 크기로 보기' },
  ja: { viewer: '写真ビューアー', close: '写真を閉じる', previous: '前の写真', next: '次の写真', fullSize: '大きく表示' },
}

const work = getOurWorkContent('vi')
const output = {
  locales: {},
  contact: {
    email: contactValue('GENERAL_EMAIL'),
    phone: contactValue('PHONE_DISPLAY'),
    tel: contactValue('PHONE_TEL'),
    address: contactValue('OFFICE_ADDRESS'),
    facebook: 'https://www.facebook.com/profile.php?id=100075982245583',
  },
}

for (const code of ['vi', 'en', 'de', 'fr', 'ko', 'ja']) {
  const locale = await readJson(`home-app/src/locales/${code}.json`)
  const { default: faq } = await import(pathToFileURL(path.join(source, `shared/faq-content/content/${code}.js`)))
  const localizedWork = getOurWorkContent(code)
  output.locales[code] = {
    institute: locale.home.hero.title,
    tagline: locale.home.hero.subtitle,
    services: localizedWork.scopes.map((s, i) => ({ ...s, img: `/media/service-${i + 1}.webp` })),
    projects: ['1', '5', '9'].map((id) => {
      const p = PAST_PROJECTS.find((item) => item.id === id)
      return { id, year: p.year, image: id === '9' ? '/media/park-city.jpg' : `/media/project-${id}.jpg`, ...locale.projects.items[p.key] }
    }),
    people: selectedPeople.map((p) => ({ id: p.id, group: p.group, photo: `/media/${landingPhoto(p)}`, ...p.i18n[code] })),
    valuesGallery: {
      labels: galleryControls[code],
      groups: VALUE_GALLERY_PHOTOS.map((photos) => photos.map(({ key, file, name = path.basename(file), width, height }) => ({
        image: `/media/${name}`, width, height,
        blur: GALLERY_PLACEHOLDERS[`/aboutUs/${file}`],
        ...(locale.about.gallery[key] || VALUE_GALLERY_CAPTIONS[code][key]),
      }))),
    },
    faq: [faq.entries.services[0], faq.entries.process[0], faq.entries.technology[0], faq.entries.costs[0]],
    platforms: getAppNavigation(code),
  }
}

await mkdir(path.join(root, 'src/data'), { recursive: true })
await writeFile(path.join(root, 'src/data/siteContent.json'), JSON.stringify(output, null, 2) + '\n')

const files = [
  ['pastProjects/project_9/pp_9d.jpg', 'park-city.jpg'],
  ['pastProjects/project_9/pp_9a.jpg', 'park-city-plan.jpg'],
  ['pastProjects/pp_1.jpg', 'project-1.jpg'],
  ['pastProjects/pp_5.jpg', 'project-5.jpg'],
  ['recruitment-app/public/media/office.webp', 'office.webp'],
  ['recruitment-app/public/media/survey.webp', 'survey.webp'],
  ['aboutUs/UN-Habitat-HealthBridge.webp', 'collaboration.webp'],
  ['aboutUs/kids2.webp', 'community.webp'],
  ['logoIcons/original_logo.png', 'original-logo.png'],
  ['logoIcons/favicon.png', 'favicon.png'],
  ...VALUE_GALLERY_PHOTOS.flat().map(({ file, name = path.basename(file) }) => [`public/aboutUs/${file}`, name]),
  ...work.scopes.map((s, i) => [s.img.slice(1), `service-${i + 1}.webp`]),
  ...selectedPeople.map((p) => [p.id === 'do-bao-long' ? 'public/profilePhotos/longdoorgstructure_prev.png' : `public/${p.photo}`, landingPhoto(p)]),
]
await mkdir(path.join(root, 'public/media'), { recursive: true })
for (const [from, to] of files) await cp(path.join(source, from), path.join(root, 'public/media', to))
await mkdir(path.join(root, 'public/fonts'), { recursive: true })
for (const weight of ['regular', 'medium', 'semibold', 'bold']) {
  await cp(path.join(source, `fonts/archivo-${weight}.woff2`), path.join(root, `public/fonts/archivo-${weight}.woff2`))
}
// Retain the existing unicode ranges so CJK glyphs load only the required subsets.
const fontCss = await readFile(path.join(source, 'shared/fonts/fonts.css'), 'utf8')
const cjkFaces = [...fontCss.matchAll(/@font-face\s*\{[^}]+\}/g)]
  .map((m) => m[0]).filter((rule) => /noto-sans-(jp|kr)/.test(rule))
for (const rule of cjkFaces) {
  const filename = rule.match(/\/fonts\/([^"')]+)/)?.[1]
  if (filename) await cp(path.join(source, 'fonts', filename), path.join(root, 'public/fonts', filename))
}
await writeFile(path.join(root, 'src/cjk-fonts.css'), cjkFaces.join('\n\n') + '\n')
console.log(`Synced six locales, ${output.locales.vi.projects.length} projects, ${output.locales.vi.services.length} services, ${output.locales.vi.people.length} people and ${files.length} assets from ICUE-mainsite-vn.`)
