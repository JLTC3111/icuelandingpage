import { cp, mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const source = path.resolve(process.argv[2] || path.join(root, '../ICUE-mainsite-vn'))
const readJson = async (file) => JSON.parse(await readFile(path.join(source, file), 'utf8'))
const locale = await readJson('home-app/src/locales/vi.json')
const people = await readJson('people-app/src/data/people.json')
const { getOurWorkContent } = await import(pathToFileURL(path.join(source, 'ourwork-app/src/data/ourWorkScopes.js')))
const { PAST_PROJECTS } = await import(pathToFileURL(path.join(source, 'home-app/src/data/pastProjectsContent.js')))
const { default: faq } = await import(pathToFileURL(path.join(source, 'shared/faq-content/content/vi.js')))
const contactSource = await readFile(path.join(source, 'contact-app/src/data/contactChannels.js'), 'utf8')
const contactValue = (name) => contactSource.match(new RegExp(`(?:export )?const ${name} = '([^']+)'`))?.[1]

const selectedProjects = ['1', '3', '9'].map((id) => {
  const p = PAST_PROJECTS.find((item) => item.id === id)
  return {
    id: p.id,
    year: p.year,
    image: id === '9' ? '/media/park-city.jpg' : `/media/project-${id}.jpg`,
    ...locale.projects.items[p.key],
  }
})
const selectedPeople = people.filter((p) => p.group === 'core').slice(0, 4)
selectedPeople.unshift(...people.filter((p) => p.group === 'experts').slice(0, 4))

const work = getOurWorkContent('vi')
const output = {
  institute: locale.home.hero.title,
  tagline: locale.home.hero.subtitle,
  about: locale.about.slides.map((s) => s.replace(/<[^>]*>/g, '').trim()),
  services: work.scopes.map((s, i) => ({ ...s, img: `/media/service-${i + 1}.webp` })),
  process: work.process,
  projects: selectedProjects,
  people: selectedPeople.map((p) => ({ id: p.id, group: p.group, photo: `/media/${path.basename(p.photo)}`, ...p.i18n.vi })),
  news: Object.values(locale.home.sections.news.cards).map((n, i) => ({ ...n, id: String(i + 1), image: `/media/news-${i + 1}${i === 2 ? '.jpg' : '.webp'}` })),
  faq: [faq.entries.services[0], faq.entries.process[0], faq.entries.technology[0], faq.entries.costs[0]],
  contact: {
    email: contactValue('GENERAL_EMAIL'),
    phone: contactValue('PHONE_DISPLAY'),
    tel: contactValue('PHONE_TEL'),
    address: contactValue('OFFICE_ADDRESS'),
    facebook: 'https://www.facebook.com/profile.php?id=100075982245583',
  },
}

await mkdir(path.join(root, 'src/data'), { recursive: true })
await writeFile(path.join(root, 'src/data/siteContent.json'), JSON.stringify(output, null, 2) + '\n')

const files = [
  ['pastProjects/project_9/pp_9d.jpg', 'park-city.jpg'],
  ['pastProjects/pp_1.jpg', 'project-1.jpg'],
  ['pastProjects/project_3/pp_3d.jpg', 'project-3.jpg'],
  ['recruitment-app/public/media/office.webp', 'office.webp'],
  ['recruitment-app/public/media/survey.webp', 'survey.webp'],
  ['aboutUs/UN-Habitat-HealthBridge.webp', 'collaboration.webp'],
  ['aboutUs/kids2.webp', 'community.webp'],
  ['news/articles/Card_1.webp', 'news-1.webp'],
  ['news/articles/Card_2.webp', 'news-2.webp'],
  ['news/articles/Card_3.jpg', 'news-3.jpg'],
  ['logoIcons/ICUE_Simplified_Geometry_v2.svg', 'icue-mark.svg'],
  ['logoIcons/ICUE_Simplified_Geometry_v2_Near_White_Spokes.svg', 'icue-mark-light.svg'],
  ['logoIcons/favicon.png', 'favicon.png'],
  ...work.scopes.map((s, i) => [s.img.slice(1), `service-${i + 1}.webp`]),
  ...selectedPeople.map((p) => [`public/${p.photo}`, path.basename(p.photo)]),
]
await mkdir(path.join(root, 'public/media'), { recursive: true })
for (const [from, to] of files) await cp(path.join(source, from), path.join(root, 'public/media', to))
await mkdir(path.join(root, 'public/fonts'), { recursive: true })
for (const weight of ['regular', 'medium', 'semibold', 'bold']) {
  await cp(path.join(source, `fonts/archivo-${weight}.woff2`), path.join(root, `public/fonts/archivo-${weight}.woff2`))
}
console.log(`Synced ${output.projects.length} projects, ${output.services.length} services, ${output.people.length} people and ${files.length} assets from ICUE-mainsite-vn.`)
