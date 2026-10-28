import { Fragment, useEffect, useRef, useState } from 'react'
import {
  ArrowDown, ArrowRight, ArrowUp, ArrowUpRight, ChevronLeft, ChevronRight,
  Compass, FlaskConical, Languages, Leaf, Mail, Moon, Network, Phone, Plus, Sun, Users, X,
} from 'lucide-react'
import { LANGUAGES, LocaleProvider, useLocale } from './i18n/LocaleProvider.jsx'
import StaggeredMenu from './components/StaggeredMenu.jsx'
import MenuToggleIcon from './components/MenuToggleIcon.jsx'

const navigationTargets = ['/', '#services', '#projects', '#people', '/newsroom']
const valueMedia = [
  { icon: FlaskConical, image: '/media/office.webp' },
  { icon: Users, image: '/media/community.webp' },
  { icon: Network, image: '/media/collaboration.webp' },
  { icon: Leaf, image: '/media/survey.webp' },
]
const platformMedia = ['/media/park-city.jpg', '/media/office.webp', '/media/service-2.webp']
const platformBrands = ['Mainsite', 'HR', 'Contract']
const format = (text, key, value) => text.replace(`{${key}}`, value)

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

function LocaleControls({ className = '' }) {
  const { copy, locale, setLocale, theme, toggleTheme } = useLocale()
  const ThemeIcon = theme === 'dark' ? Sun : Moon
  return <div className={`locale-controls ${className}`}>
    <label className="language-control"><Languages size={16} aria-hidden="true" /><span className="sr-only">{copy.ui.language}</span><select value={locale} onChange={(e) => setLocale(e.target.value)} aria-label={copy.ui.language}>{LANGUAGES.map((l) => <option key={l.code} value={l.code} lang={l.code}>{l.label}</option>)}</select></label>
    <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label={theme === 'dark' ? copy.ui.lightTheme : copy.ui.darkTheme}><ThemeIcon size={17} strokeWidth={1.5} /></button>
  </div>
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
      <a href={site(`/past-projects/${selected.id}`)} className={`project-image-link${selected.id === '3' ? ' project-map' : ''}`} aria-label={format(copy.projects.open, 'title', selected.title)}><img key={selected.id} src={selected.image} alt={selected.imageAlt} loading="lazy" width="900" height="750" /><span className="project-year">{selected.year}<ArrowUpRight size={17} /></span></a>
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
  const people = content.people.filter((person) => person.group === group)
  return <section id="people" className="people-section"><div className="people-intro"><ArchitecturalLines /><Eyebrow number="04" light>{copy.people.eyebrow}</Eyebrow><h2>{copy.people.title[0]}<br />{copy.people.title[1]}<br /><span>{copy.people.title[2]}</span></h2><p>{copy.people.lead}</p><a className="text-link" href={site(group === 'experts' ? '/people/experts' : '/people/core-team')}>{copy.people.all}<ArrowUpRight size={19} /></a><span className="people-signature">{copy.people.signature}</span></div>
    <div className="people-directory"><div className="people-directory-head"><h3>{copy.people.directory}</h3><div className="people-filters" aria-label={copy.people.groupsLabel}><button aria-pressed={group === 'experts'} onClick={() => setGroup('experts')}>{copy.people.experts}</button><button aria-pressed={group === 'core'} onClick={() => setGroup('core')}>{copy.people.staff}</button></div></div><div className="people-grid">{people.map((person) => <button className="person-card" key={person.id} onClick={() => onSelect(person.id)} aria-label={format(copy.ui.viewProfile, 'name', person.name)}><span className="person-photo"><img src={person.photo} alt={person.name} loading="lazy" width="400" height="440" /><span className="person-photo-cta"><ArrowUpRight size={22} /></span></span><span className="person-name">{person.name}</span><span className="person-role">{person.id === 'nguyen-hong-hanh' ? copy.people.directorRole : `${person.honorific ? person.honorific + ' · ' : ''}${person.title}`}</span></button>)}</div><p className="directory-hint"><span />{copy.people.hint}</p></div>
  </section>
}

function Values() {
  const { copy, site } = useLocale()
  const [active, setActive] = useState(0)
  return <section className="values section-shell" id="approach"><div className="section-heading"><div><Eyebrow number="05">{copy.values.eyebrow}</Eyebrow><h2><Lines lines={copy.values.title} /></h2></div><p className="section-lead">{copy.values.lead}</p></div><div className="values-layout"><div className="values-list">{copy.values.items.map((value, i) => {
    const Icon = valueMedia[i].icon
    const open = active === i
    return <article className={`value${open ? ' is-open' : ''}`} key={i}><h3><button aria-expanded={open} aria-controls={`value-${i}`} onClick={() => setActive(i)}><Icon size={30} strokeWidth={1.4} /><span>{value.title}</span><Plus size={17} strokeWidth={1.5} className="value-plus" /></button></h3><div className="accordion-panel" id={`value-${i}`} aria-hidden={!open} inert={!open}><div className="accordion-panel-inner"><p>{value.text}</p></div></div></article>
  })}<a className="text-link values-careers" href={site('/structure/')}>{copy.links.structure}<ArrowUpRight size={18} /></a></div><figure className="value-image"><img key={active} src={valueMedia[active].image} alt={copy.values.items[active].alt} loading="lazy" width="700" height="800" /><figcaption><span>{copy.values.caption}</span><span>0{active + 1} / 04</span></figcaption></figure></div></section>
}

function Faq() {
  const { copy, content, site } = useLocale()
  const [active, setActive] = useState(-1)
  return <section className="faq section-shell" id="faq"><div><Eyebrow number="06">{copy.faq.eyebrow}</Eyebrow><h2><Lines lines={copy.faq.title} /></h2><a className="text-link" href={site('/faqs')}>{copy.faq.all}<ArrowUpRight size={18} /></a></div><div className="faq-list">{content.faq.map((item, i) => <article className={`faq-item${i === active ? ' is-open' : ''}`} key={i}><h3><button aria-expanded={i === active} aria-controls={`faq-answer-${i}`} onClick={() => setActive(i === active ? -1 : i)}>{item.q}<Plus size={19} strokeWidth={1.4} /></button></h3><div className="accordion-panel" id={`faq-answer-${i}`} aria-hidden={i !== active} inert={i !== active}><div className="accordion-panel-inner"><p>{item.a}</p></div></div></article>)}</div></section>
}

function Platforms() {
  const { copy, content, site } = useLocale()
  const apps = content.platforms.apps.map((app) => app.id === 'website' ? { ...app, href: site('/') } : app)
  return <section id="platforms" className="platforms-section"><div className="section-heading"><div><Eyebrow number="07">{copy.platforms.eyebrow}</Eyebrow><h2><Lines lines={copy.platforms.title} /></h2></div><div className="platform-section-links"><p className="section-lead">{copy.platforms.lead}</p><a className="text-link" href={site('/newsroom')}>{copy.nav[4]}<ArrowUpRight size={18} /></a></div></div><div className="platform-grid">{apps.map((app, i) => <a className={`platform-card platform-card-${app.id}`} key={app.id} href={app.href} target="_blank" rel="noopener noreferrer" aria-label={`${app.label} · ${content.platforms.newTab}`}>
    <img src={platformMedia[i]} alt="" loading="lazy" width="700" height="800" /><div className="platform-overlay" /><span className="platform-index">ICUE / 0{i + 1}<ArrowUpRight size={19} /></span><div className="platform-copy"><span className="platform-label">{app.label}</span><h3>{platformBrands[i]}</h3><p>{app.description}</p><span className="platform-button">{copy.platforms.open}<ArrowUpRight size={16} /></span></div><span className="platform-domain">{new URL(app.href).hostname}</span>
  </a>)}</div></section>
}

function LandingPage() {
  const { copy, content, contact, site } = useLocale()
  const personDialog = useRef(null)
  const menuTrigger = useRef(null)
  const [personId, setPersonId] = useState(null)
  const [currentSection, setCurrentSection] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const person = content.people.find((p) => p.id === personId)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => { for (const entry of entries) if (entry.isIntersecting) setCurrentSection(entry.target.id) }, { rootMargin: '-15% 0px -60% 0px', threshold: 0 })
    document.querySelectorAll('section[id], footer[id]').forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])
  useEffect(() => { if (personId && !personDialog.current.open) personDialog.current.showModal() }, [personId])
  const sectionIndex = { home: '00', about: '01', services: '02', projects: '03', people: '04', approach: '05', faq: '06', platforms: '07', contact: '08' }[currentSection] || '00'
  const mark = '/media/original-logo.png'

  return <>
    <a className="skip-link" href="#main-content">{copy.ui.skip}</a>
    <aside className="side-rail" aria-label={copy.ui.quickNav}>
      <button ref={menuTrigger} className="menu-button" aria-label={menuOpen ? copy.ui.closeMenu : copy.ui.openMenu} aria-haspopup="dialog" aria-expanded={menuOpen} aria-controls="staggered-menu-panel" onClick={() => setMenuOpen((value) => !value)}><MenuToggleIcon open={menuOpen} /></button>
      <a className="rail-brand" href={site('/')} aria-label={copy.ui.home}><img src={mark} alt="" width="38" height="38" /><span>ICUE VIETNAM</span></a>
      <LocaleControls className="rail-controls" />
      <div className="rail-links"><a href={contact.facebook} aria-label={copy.ui.facebook}><span className="facebook-glyph" aria-hidden="true">f</span></a><a href={`mailto:${contact.email}`} aria-label={copy.ui.email}><Mail size={18} strokeWidth={1.5} /></a><a href={`tel:${contact.tel}`} aria-label={copy.ui.call}><Phone size={17} strokeWidth={1.5} /></a><span className="rail-section">{sectionIndex}</span></div>
    </aside>
    <div className="page-wrap"><header className="site-header"><a href={site("/")} className="wordmark" aria-label={copy.ui.home}><img src={mark} alt="" width="43" height="43" /><span>ICUE</span></a><span className="header-institute">{content.institute}</span><nav className="header-nav" aria-label={copy.ui.primaryNav}><a href={site("/")}>{copy.nav[0]}</a><a href={site("/past-projects")}>{copy.header.projects}</a><a href={site("/contact")} className="header-contact"><span />{copy.header.contact}<ArrowUpRight size={17} /></a></nav><LocaleControls className="header-controls" /></header>
      <main id="main-content"><section id="home" className="hero" aria-labelledby="hero-title"><div className="hero-visual"><img src="/media/park-city.jpg" alt={copy.hero.imageAlt} width="2560" height="1440" fetchPriority="high" /><div className="hero-image-tag"><span />{copy.hero.tag}</div><OrbitStamp /><div className="hero-image-caption"><span>PARK CITY XUÂN AN</span><p><Lines lines={copy.hero.caption} /></p></div></div><div className="hero-copy"><p className="hero-kicker"><span />{copy.hero.kicker}</p><h1 id="hero-title"><Lines lines={copy.hero.title} /><span className="accent">.</span></h1><p className="hero-description">{copy.hero.description}</p><a className="hero-cta" href={site("/past-projects")}>{copy.hero.projectCta}<RoundArrow direction="right" /></a><a className="team-teaser" href={site("/people/experts")}><span className="avatar-stack">{content.people.slice(0, 4).map((p) => <img src={p.photo} key={p.id} alt="" width="48" height="48" />)}</span><span>{copy.hero.teamBefore}<br /><strong>{copy.hero.teamAfter}<ArrowUpRight size={15} /></strong></span></a></div></section>
        <div className="hero-bottom"><a href="#about"><ArrowDown size={14} />{copy.hero.scroll}</a><span>{copy.hero.fields.map((field, i) => <Fragment key={i}>{i > 0 && <i>/</i>}{field}</Fragment>)}</span><span>{copy.hero.location}</span></div>
        <section id="about" className="about section-shell"><Eyebrow number="01">{copy.about.eyebrow}</Eyebrow><div className="about-layout"><h2>{copy.about.title[0]}<br /><span>{copy.about.title[1]}</span></h2><div className="about-copy"><p>{copy.about.lead}</p><p>{copy.about.body}</p><a href={site('/about-us')} className="text-link">{copy.about.link}<ArrowUpRight size={18} /></a></div></div><div className="about-facts"><div><strong>2013<span>↗</span></strong><span>{copy.about.facts[0]}</span></div><div><strong>20<span>+</span></strong><span>{copy.about.facts[1]}</span></div><div><strong>04<span>↗</span></strong><span>{copy.about.facts[2]}</span></div><div className="about-compass"><Compass size={68} strokeWidth={0.8} /><span><Lines lines={copy.about.compass} /></span></div></div></section>
        <Services /><Projects /><People onSelect={setPersonId} /><Values /><Faq /><Platforms />
      </main>
      <footer id="contact" className="footer-wrap"><div className="footer-contact-grid"><a href={`mailto:${contact.email}`} className="footer-email"><span>{copy.footer.contactLabel}</span><strong>{contact.email}<ArrowUpRight size={23} /></strong></a><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`} target="_blank" rel="noreferrer"><span>{copy.footer.addressLabel}</span><p>{contact.address}</p></a><a href={`tel:${contact.tel}`}><span>{copy.footer.phoneLabel}</span><p>{contact.phone}</p></a></div><div className="site-footer"><a href="#home" className="footer-brand" aria-label={copy.ui.home}><img src={mark} alt="" width="29" height="29" />ICUE</a><span>© {new Date().getFullYear()} {copy.footer.rights}</span><nav aria-label={copy.ui.legalNav}><a href={site('/news-archive')}>{copy.links.archive}</a><a href={site('/legal/privacy')}>{copy.footer.privacy}</a><a href={site('/recruitment')}>{copy.footer.careers}<ArrowUpRight size={13} /></a><a href={site('/contact')}>{copy.footer.contactCta}<ArrowUpRight size={13} /></a></nav><a href="#home" className="back-to-top" aria-label={copy.ui.backTop}><ArrowUp size={18} /></a></div></footer>
    </div>
    <StaggeredMenu open={menuOpen} onClose={() => setMenuOpen(false)} triggerRef={menuTrigger} homeHref={site('/')} labels={{ title: copy.ui.menuTitle, close: copy.ui.closeMenu, eyebrow: copy.menu.eyebrow, lead: copy.menu.lead, socials: copy.menu.socials, place: copy.menu.place }} items={navigationTargets.map((target, i) => ({ label: copy.nav[i], link: target.startsWith('#') ? target : site(target) }))} socialItems={[{ label: contact.email, link: `mailto:${contact.email}` }, { label: 'Facebook', link: contact.facebook }]} controls={<LocaleControls />} />
    <dialog ref={personDialog} className="person-dialog" onClose={() => setPersonId(null)} onClick={(e) => { if (e.target === e.currentTarget) personDialog.current.close() }} aria-labelledby={person ? 'person-dialog-name' : undefined}>{person && <div className="person-dialog-content"><button className="dialog-close" aria-label={copy.ui.closeProfile} onClick={() => personDialog.current.close()} autoFocus><X size={24} strokeWidth={1.3} /></button><div className="person-dialog-image"><img src={person.photo} alt={person.name} width="400" height="500" /></div><div className="person-dialog-copy"><Eyebrow>{copy.people.eyebrow}</Eyebrow><span className="person-honorific">{person.honorific}</span><h2 id="person-dialog-name">{person.name}</h2><p className="person-dialog-role">{person.title}</p><p className="person-bio">{person.bio}</p><div className="person-tags">{person.highlights.map((h) => <span key={h}>{h}</span>)}</div><a className="text-link" href={site(person.group === 'experts' ? '/people/experts' : '/people/core-team')}>{copy.people.all}<ArrowUpRight size={17} /></a></div></div>}</dialog>
  </>
}

export default function App({ initialLocale, initialTheme }) {
  return <LocaleProvider initialLocale={initialLocale} initialTheme={initialTheme}><LandingPage /></LocaleProvider>
}
