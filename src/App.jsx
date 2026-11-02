import { Fragment, Suspense, useEffect, useRef, useState } from 'react'
import {
  ArrowDown, ArrowRight, ArrowUp, ArrowUpRight, ChevronLeft, ChevronRight,
  Compass, FlaskConical, Leaf, Network, Plus, Users, X,
} from 'lucide-react'
import { LocaleProvider, useLocale } from './i18n/LocaleProvider.jsx'
import HeroImageComparison from './components/HeroImageComparison.jsx'
import PlatformVideo from './components/PlatformVideo.jsx'
import InstitutionLeadership, { LeadershipProfileNote, presentPerson } from './components/InstitutionLeadership.jsx'

import NavigationRail from './components/NavigationRail.jsx'
import LocaleControls from './components/LocaleControls.jsx'
import { DeferredBoundary, useDeferredImport, useNearViewport } from './components/DeferredContent.jsx'
import DeferredFounder from './components/DeferredFounder.jsx'
import './components/ValueGallery.css'
import './components/DeferredContent.css'
// Keep the small section styles available even when a deferred module request
// needs a retry; only the interaction implementations load on demand.
import './components/AccordionGallery.css'
import './components/StaggeredMenu.css'
import './components/Stepper.css'

const loadValueGallery = () => import('./components/ValueGallery.jsx')
const valueIcons = [FlaskConical, Users, Network, Leaf]
const platformMedia = ['/media/park-city.jpg', '/media/office.webp', '/media/service-2.webp']
const format = (text, key, value) => text.replace(`{${key}}`, value)
const personRole = (person, copy) => person.id === 'nguyen-hong-hanh' ? copy.people.directorRole : [person.honorific, person.title].filter(Boolean).join(' · ')

function Lines({ lines }) {
  return lines.map((line, i) => <Fragment key={i}>{i > 0 && <br />}{line}</Fragment>)
}

function Eyebrow({ children, number, light = false }) {
  return <div className={`eyebrow${light ? ' eyebrow-light' : ''}`}><span className="eyebrow-dot" />{children}{number && <span className="section-number">/ {number}</span>}</div>
}

function RoundArrow({ direction = 'up' }) {
  const Icon = direction === 'down' ? ArrowDown : direction === 'right' ? ArrowRight : ArrowUpRight
  return <span className="round-arrow"><Icon size={23} strokeWidth={1.5} aria-hidden="true" /></span>
}

function OrbitStamp() {
  const { copy, site } = useLocale()
  return <a className="orbit-stamp" href={site('/our-work')} aria-label={copy.services.eyebrow}>
    <svg viewBox="0 0 140 140" className="orbit-type" aria-hidden="true"><defs><path id="orbit-path" d="M70,70 m-52,0 a52,52 0 1,1 104,0 a52,52 0 1,1 -104,0" /></defs><text><textPath href="#orbit-path" textLength="326">{copy.hero.orbit}</textPath></text></svg>
    <span><ArrowDown size={28} strokeWidth={1.5} /></span>
  </a>
}

function ArchitecturalLines() {
  return <svg className="architectural-lines" viewBox="0 0 700 900" fill="none" aria-hidden="true"><g transform="translate(160 530)">{Array.from({ length: 30 }, (_, i) => <rect key={i} x={-280 + i * 3} y={-280 + i * 3} width={560 - i * 6} height={560 - i * 6} rx="2" transform={`rotate(${i * 3.5})`} />)}</g></svg>
}

function Services() {
  const { copy, content, site } = useLocale()
  const [active, setActive] = useState(0)
  return <section id="services" className="services section-shell">
    <div className="section-heading"><div><Eyebrow number="02">{copy.services.eyebrow}</Eyebrow><h2><Lines lines={copy.services.title} /></h2></div><p className="section-lead">{copy.services.lead}</p></div>
    <div className="service-list">{content.services.map((service, i) => {
      const open = active === i
      return <article className={`service${open ? ' is-open' : ''}`} key={service.code}>
        <h3><button className="service-trigger" aria-expanded={open} aria-controls={`service-panel-${i}`} onClick={() => setActive(open ? -1 : i)}><span className="row-number">{service.num}</span><span className="service-name">{copy.services.labels[i]}</span><span className="service-subtitle">{copy.services.subtitles[i]}</span><span className="accordion-toggle"><Plus size={23} strokeWidth={1.2} /></span></button></h3>
        <div id={`service-panel-${i}`} className="accordion-panel" aria-hidden={!open} inert={!open}><div className="accordion-panel-inner"><div className="service-body"><div className="service-description"><h4>{service.title}</h4><p>{service.desc}</p></div><ul>{service.items.map((item) => <li key={item}>{item}</li>)}</ul><img src={service.img} alt={service.title} loading="lazy" width="420" height="280" /></div></div></div>
      </article>
    })}</div>
    <a className="text-link section-bottom-link" href={site('/our-work')}>{copy.services.link}<ArrowUpRight size={18} /></a>
  </section>
}

function Projects() {
  const { copy, content, site, locale } = useLocale()
  const [active, setActive] = useState(0)
  const selected = content.projects[active]
  const nextProject = (amount) => setActive((value) => (value + amount + content.projects.length) % content.projects.length)
  const summary = (text) => typeof Intl.Segmenter === 'function' ? [...new Intl.Segmenter(locale, { granularity: 'sentence' }).segment(text)][0].segment.trim() : text
  return <section id="projects" className="projects section-shell">
    <div className="section-heading"><div><Eyebrow number="03">{copy.projects.eyebrow}</Eyebrow><h2><Lines lines={copy.projects.title} /></h2></div><a href={site('/past-projects')} className="text-link">{copy.projects.all}<ArrowUpRight size={20} /></a></div>
    <div className="project-showcase"><div className="project-media">
      <a href={site(`/past-projects/${selected.id}`)} className={`project-image-link${selected.id === '5' ? ' project-board' : ''}`} aria-label={format(copy.projects.open, 'title', selected.title)}><img key={selected.id} src={selected.image} alt={selected.imageAlt} loading="lazy" width="900" height="750" /><span className="project-year">{selected.year}<ArrowUpRight size={17} /></span></a>
      <div className="project-media-caption" aria-live="polite"><span>{selected.location}</span><div className="project-controls"><button onClick={() => nextProject(-1)} aria-label={copy.projects.previous}><ChevronLeft size={19} /></button><span>0{active + 1}<i>/ 03</i></span><button onClick={() => nextProject(1)} aria-label={copy.projects.next}><ChevronRight size={19} /></button></div></div>
    </div><div className="project-options" aria-label={copy.projects.choose}>{content.projects.map((project, i) => <div className={`project-option${i === active ? ' is-active' : ''}`} key={project.id}>
      <h3><button onClick={() => setActive(i)} aria-expanded={i === active} aria-controls={`project-description-${project.id}`}><span className="row-number">0{i + 1}</span><span>{project.title}</span><ArrowUpRight size={23} strokeWidth={1.4} /></button></h3>
      <div className="project-description" id={`project-description-${project.id}`} hidden={i !== active}><span className="project-scale">{project.scale}</span><p>{summary(project.body)}</p><a className="text-link" href={site(`/past-projects/${project.id}`)}>{copy.projects.view}<ArrowRight size={17} /></a></div>
    </div>)}<p className="project-footnote">{copy.projects.footnote[0]}<br /><span>{copy.projects.footnote[1]}</span></p></div></div>
  </section>
}

function People({ onSelect }) {
  const { copy, content, site } = useLocale()
  const [group, setGroup] = useState('experts')
  const people = content.people.filter((person) => person.group === group).sort((a, b) => Number(a.id === 'tran-quoc-toan') - Number(b.id === 'tran-quoc-toan'))
  return <section id="people" className="people-section"><div className="people-intro"><ArchitecturalLines /><Eyebrow number="04" light>{copy.people.eyebrow}</Eyebrow><h2>{copy.people.title[0]}<br />{copy.people.title[1]}<br /><span>{copy.people.title[2]}</span></h2><p>{copy.people.lead}</p><InstitutionLeadership onSelect={onSelect} /><a className="text-link" href={site(group === 'experts' ? '/people/experts' : '/people/core-team')}>{copy.people.all}<ArrowUpRight size={19} /></a><span className="people-signature">{copy.people.signature}</span></div>
    <div className="people-directory"><div className="people-directory-head"><h3>{copy.people.directory}</h3><div className="people-filters" aria-label={copy.people.groupsLabel}><button aria-pressed={group === 'experts'} onClick={() => setGroup('experts')}>{copy.people.experts}</button><button aria-pressed={group === 'core'} onClick={() => setGroup('core')}>{copy.people.staff}</button></div></div><div className="people-grid">{people.map((person) => <button className="person-card" key={person.id} onClick={() => onSelect(person.id)} aria-label={format(copy.ui.viewProfile, 'name', person.name)}><span className="person-photo"><img src={person.photo} alt={person.name} loading="lazy" width="400" height="440" /><span className="person-photo-cta"><ArrowUpRight size={22} /></span></span><span className="person-name">{person.name}</span><span className="person-role">{personRole(person, copy)}</span></button>)}</div><p className="directory-hint"><span />{copy.people.hint}</p></div>
  </section>
}

function DeferredGallery({ index }) {
  const { content, copy } = useLocale()
  const [ref, ready] = useNearViewport()
  const [ValueGallery, retry, version] = useDeferredImport(loadValueGallery)
  const compactHeight = 260 + (Math.min(content.valuesGallery.groups[index].length, 4) - 1) * 92
  const placeholder = <div className="deferred-placeholder" aria-hidden="true" />
  return <div ref={ref} className="value-gallery deferred-gallery" style={{ '--value-gallery-compact-height': `${compactHeight}px` }}>
    {ready ? <DeferredBoundary key={version} fallback={placeholder} retryLabel={copy.ui.retry} onRetry={retry}><Suspense fallback={placeholder}><ValueGallery key={index} index={index} /></Suspense></DeferredBoundary> : placeholder}
  </div>
}

function Values() {
  const { copy, site } = useLocale()
  const [active, setActive] = useState(0)
  return <section className="values section-shell" id="approach"><div className="section-heading"><div><Eyebrow number="05">{copy.values.eyebrow}</Eyebrow><h2><Lines lines={copy.values.title} /></h2></div><p className="section-lead">{copy.values.lead}</p></div><div className="values-layout"><div className="values-list">{copy.values.items.map((value, i) => {
    const Icon = valueIcons[i]
    const open = active === i
    return <article className={`value${open ? ' is-open' : ''}`} key={i}><h3><button aria-expanded={open} aria-controls={`value-${i}`} onClick={() => setActive(i)}><Icon size={30} strokeWidth={1.4} /><span>{value.title}</span><Plus size={17} strokeWidth={1.5} className="value-plus" /></button></h3><div className="accordion-panel" id={`value-${i}`} aria-hidden={!open} inert={!open}><div className="accordion-panel-inner"><p>{value.text}</p></div></div></article>
  })}<a className="text-link values-careers" href={site('/structure/')}>{copy.links.structure}<ArrowUpRight size={18} /></a></div><DeferredGallery index={active} /></div></section>
}

function Faq() {
  const { copy, content, site } = useLocale()
  const [active, setActive] = useState(-1)
  return <section className="faq section-shell" id="faq"><div><Eyebrow number="06">{copy.faq.eyebrow}</Eyebrow><h2><Lines lines={copy.faq.title} /></h2><a className="text-link" href={site('/faqs')}>{copy.faq.all}<ArrowUpRight size={18} /></a></div><div className="faq-list">{content.faq.map((item, i) => <article className={`faq-item${i === active ? ' is-open' : ''}`} key={i}><h3><button aria-expanded={i === active} aria-controls={`faq-answer-${i}`} onClick={() => setActive(i === active ? -1 : i)}>{item.q}<Plus size={19} strokeWidth={1.4} /></button></h3><div className="accordion-panel" id={`faq-answer-${i}`} aria-hidden={i !== active} inert={i !== active}><div className="accordion-panel-inner"><p>{item.a}</p></div></div></article>)}</div></section>
}

function Platforms() {
  const { copy, content, site, locale, navigationHref } = useLocale()
  const apps = content.platforms.apps.map((app) => ({ ...app, href: app.id === 'website' ? site('/') : navigationHref(app.href) }))
  const videoLocale = locale === 'vi' ? 'vi' : 'en'
  const videoFiles = videoLocale === 'vi' ? ['icue-vn.preview.mp4', 'hr_vn.preview.mp4', 'contract_vi.preview.mp4'] : ['icue-en.preview.mp4', 'hr_en.preview.mp4', 'contract_en.preview.mp4']
  return <section id="platforms" className="platforms-section"><div className="section-heading"><div><Eyebrow number="07">{copy.platforms.eyebrow}</Eyebrow><h2><Lines lines={copy.platforms.title} /></h2></div><div className="platform-section-links"><p className="section-lead">{copy.platforms.lead}</p><a className="text-link" href={site('/newsroom')}>{copy.nav[4]}<ArrowUpRight size={18} /></a></div></div><div className="platform-grid">{apps.map((app, i) => <article className={`platform-card platform-card-${app.id}`} key={app.id}>
    <img src={platformMedia[i]} alt="" loading="lazy" width="700" height="800" /><PlatformVideo key={videoLocale} src={`/videos/${videoLocale}/${videoFiles[i]}`} poster={platformMedia[i]} label={app.label} labels={copy.platforms} /><div className="platform-overlay" /><span className="platform-index">ICUE / 0{i + 1}<ArrowUpRight size={19} /></span><div className="platform-copy"><span className="platform-label">{app.label}</span><h3>{copy.platforms.brands[i]}</h3><p>{app.description}</p><span className="platform-button">{copy.platforms.open}<ArrowUpRight size={16} /></span></div><span className="platform-domain">{new URL(app.href).hostname}</span><a className="platform-card-link" href={app.href} target="_blank" rel="noopener noreferrer" aria-label={`${app.label} · ${content.platforms.newTab}`} />
  </article>)}</div></section>
}

function LandingPage() {
  const { copy, content, contact, site, leadership } = useLocale()
  const personDialog = useRef(null)
  const [personId, setPersonId] = useState(null)
  const person = presentPerson(content.people.find((person) => person.id === personId), leadership)
  const heroPortraits = content.people.filter((expert) => expert.group === 'experts').slice(0, 5)
  useEffect(() => { if (personId && !personDialog.current.open) personDialog.current.showModal() }, [personId])
  useEffect(() => {
    // The locale chunk resolves after the browser's initial anchor lookup.
    // Scroll to the stable section shell once the initial page has mounted.
    const id = window.location.hash.slice(1)
    if (id && !id.startsWith('/')) document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' })
  }, [])
  const mark = '/media/original-logo.png'

  return <>
    <a className="skip-link" href="#main-content">{copy.ui.skip}</a>
    <NavigationRail />
    <div className="page-wrap"><header className="site-header"><a href={site("/")} className="wordmark" aria-label={copy.ui.home}><img src={mark} alt="" width="43" height="43" /><span>ICUE</span></a><span className="header-institute">{content.institute}</span><nav className="header-nav" aria-label={copy.ui.primaryNav}><a href={site("/past-projects")}>{copy.header.projects}</a><a href={site("/contact")} className="header-contact"><span />{copy.header.contact}<ArrowUpRight size={17} /></a></nav><LocaleControls className="header-controls" /></header>
      <main id="main-content"><section id="home" className="hero" aria-labelledby="hero-title"><div className="hero-visual"><HeroImageComparison /><div className="hero-image-tag"><span />{copy.hero.tag}</div><OrbitStamp /><div className="hero-image-caption"><span>{copy.hero.comparison.caption}</span><p><Lines lines={copy.hero.caption} /></p></div></div><div className="hero-copy"><p className="hero-kicker"><span />{copy.hero.kicker}</p><h1 id="hero-title"><Lines lines={copy.hero.title} /><span className="accent">.</span></h1><p className="hero-description">{copy.hero.description}</p><a className="hero-cta" href={site("/past-projects")}>{copy.hero.projectCta}<RoundArrow direction="right" /></a><a className="team-teaser" href={site("/people/experts")} aria-label={`${copy.hero.teamBefore} ${copy.hero.teamAfter}`}><span className="avatar-stack">{heroPortraits.map((person) => <span className="avatar" key={person.id}><img src={person.avatar || person.photo} srcSet={person.avatar2x ? `${person.avatar} 96w, ${person.avatar2x} 144w` : undefined} sizes="48px" alt="" width="48" height="48" decoding="async" /><span className="avatar-tooltip" aria-hidden="true"><strong>{person.name}</strong><span>{personRole(person, copy)}</span></span></span>)}</span><span>{copy.hero.teamBefore}<br /><strong>{copy.hero.teamAfter}<ArrowUpRight size={15} /></strong></span></a></div></section>
        <div className="hero-bottom"><a href="#about"><ArrowDown size={14} />{copy.hero.scroll}</a><span>{copy.hero.fields.map((field, i) => <Fragment key={i}>{i > 0 && <i>/</i>}{field}</Fragment>)}</span><span>{copy.hero.location}</span></div>
        <section id="about" className="about section-shell"><Eyebrow number="01">{copy.about.eyebrow}</Eyebrow><div className="about-layout"><h2>{copy.about.title[0]}<br /><span>{copy.about.title[1]}</span></h2><div className="about-copy"><p>{copy.about.lead}</p><p>{copy.about.body}</p><a href={site('/about-us')} className="text-link">{copy.about.link}<ArrowUpRight size={18} /></a></div></div><div className="about-facts"><div><strong>2013<span>↗</span></strong><span>{copy.about.facts[0]}</span></div><div><strong>20<span>+</span></strong><span>{copy.about.facts[1]}</span></div><div><strong>04<span>↗</span></strong><span>{copy.about.facts[2]}</span></div><div className="about-compass"><Compass size={68} strokeWidth={0.8} /><span><Lines lines={copy.about.compass} /></span></div></div></section>
        <Services /><Projects /><People onSelect={setPersonId} /><Values /><Faq /><Platforms /><DeferredFounder />
      </main>
      <footer id="contact" className="footer-wrap"><div className="footer-contact-grid"><a href={`mailto:${contact.email}`} className="footer-email"><span>{copy.footer.contactLabel}</span><strong>{contact.email}<ArrowUpRight size={23} /></strong></a><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`} target="_blank" rel="noreferrer"><span>{copy.footer.addressLabel}</span><p>{contact.address}</p></a><a href={`tel:${contact.tel}`}><span>{copy.footer.phoneLabel}</span><p>{contact.phone}</p></a></div><div className="site-footer"><a href="#home" className="footer-brand" aria-label={copy.ui.home}><img src={mark} alt="" width="29" height="29" />ICUE</a><span>© {new Date().getFullYear()} {copy.footer.rights}</span><nav aria-label={copy.ui.legalNav}><a href={site('/news-archive')}>{copy.links.archive}</a><a href={site('/legal/privacy')}>{copy.footer.privacy}</a><a href={site('/recruitment')}>{copy.footer.careers}<ArrowUpRight size={13} /></a><a href={site('/contact')}>{copy.footer.contactCta}<ArrowUpRight size={13} /></a></nav><a href="#home" className="back-to-top" aria-label={copy.ui.backTop}><ArrowUp size={18} /></a></div></footer>
    </div>
    <dialog ref={personDialog} className="person-dialog" onClose={() => setPersonId(null)} onClick={(e) => { if (e.target === e.currentTarget) personDialog.current.close() }} aria-labelledby={person ? 'person-dialog-name' : undefined}>{person && <div className="person-dialog-content"><button className="dialog-close" aria-label={copy.ui.closeProfile} onClick={() => personDialog.current.close()} autoFocus><X size={24} strokeWidth={1.3} /></button><div className="person-dialog-image"><img src={person.photo} alt={person.name} width="400" height="500" /></div><div className="person-dialog-copy"><Eyebrow>{copy.people.eyebrow}</Eyebrow><span className="person-honorific">{person.honorific}</span><h2 id="person-dialog-name">{person.name}</h2><p className="person-dialog-role">{person.title}</p><p className="person-bio">{person.bio}</p><LeadershipProfileNote personId={person.id} /><div className="person-tags">{person.highlights.map((h) => <span key={h}>{h}</span>)}</div><a className="text-link" href={site(person.group === 'experts' ? '/people/experts' : '/people/core-team')}>{copy.people.all}<ArrowUpRight size={17} /></a></div></div>}</dialog>
  </>
}

export default function App({ initialLocale, initialTheme, initialData }) {
  return <LocaleProvider initialLocale={initialLocale} initialTheme={initialTheme} initialData={initialData}><LandingPage /></LocaleProvider>
}
