import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Mail, Phone, X } from 'lucide-react'
import { useLocale } from '../i18n/LocaleProvider.jsx'
import StarBorder from './StarBorder.jsx'
import RailScrollCue from './RailScrollCue.jsx'
import MenuToggleIcon from './MenuToggleIcon.jsx'
import LocaleControls from './LocaleControls.jsx'
import './NavigationRail.css'

const navigationTargets = ['/', '#services', '#projects', '#people', '/newsroom']
let menuPromise
function loadMenu() {
  if (!menuPromise) menuPromise = import('./StaggeredMenu.jsx').catch(error => { menuPromise = undefined; throw error })
  return menuPromise
}

// The links and close action work immediately, even on a slow or failed chunk
// request. The animated menu replaces this native dialog once its code arrives.
function PendingMenu({ open, onClose, triggerRef, labels, items, loading }) {
  const dialogRef = useRef(null)
  useLayoutEffect(() => {
    const dialog = dialogRef.current
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) { dialog.close(); triggerRef.current?.focus({ preventScroll: true }) }
  }, [open, triggerRef])
  return <dialog ref={dialogRef} className="menu-pending-dialog" aria-labelledby="pending-menu-title" onCancel={event => { event.preventDefault(); onClose() }} onClick={event => { if (event.target === event.currentTarget) onClose() }}>
    <header><h2 id="pending-menu-title">{labels.title}</h2><button type="button" onClick={onClose} aria-label={labels.close} autoFocus><X size={25} /></button></header>
    <nav id="staggered-menu-panel" aria-label={labels.title}>{items.map(item => <a key={item.link} href={item.link} onClick={onClose}>{item.label}</a>)}</nav>
    <LocaleControls />
    {loading && <span className="menu-pending-indicator" role="status" aria-label={labels.title} />}
  </dialog>
}

export default function NavigationRail() {
  const { copy, contact, site, theme, founder } = useLocale()
  const menuTrigger = useRef(null)
  const [currentSection, setCurrentSection] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuRequested, setMenuRequested] = useState(false)
  const [Menu, setMenu] = useState(null)
  const [menuLoading, setMenuLoading] = useState(false)
  const [brandHidden, setBrandHidden] = useState(true)
  const prepareMenu = () => {
    if (Menu) return
    setMenuLoading(true)
    loadMenu().then(module => { setMenu(() => module.default); setMenuLoading(false) }).catch(() => setMenuLoading(false))
  }

  useEffect(() => {
    const observer = new IntersectionObserver(entries => { for (const entry of entries) if (entry.isIntersecting) setCurrentSection(entry.target.id) }, { rootMargin: '-15% 0px -60% 0px', threshold: 0 })
    document.querySelectorAll('section[id], footer[id]').forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    const visibility = new Map()
    const logos = [...document.querySelectorAll('.site-header .wordmark img, .footer-brand img')]
    const sync = () => setBrandHidden(logos.some(logo => {
      const style = getComputedStyle(logo)
      return visibility.get(logo) && style.visibility !== 'hidden' && style.display !== 'none'
    }))
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) visibility.set(entry.target, entry.isIntersecting)
      sync()
    }, { threshold: 0 })
    logos.forEach(logo => observer.observe(logo))
    window.addEventListener('resize', sync)
    return () => { observer.disconnect(); window.removeEventListener('resize', sync) }
  }, [])
  const sectionIndex = { home: '00', about: '01', services: '02', projects: '03', people: '04', approach: '05', faq: '06', platforms: '07', founder: '08', contact: '09' }[currentSection] || '00'
  const menuItems = navigationTargets.map((target, index) => ({ label: copy.nav[index], link: target.startsWith('#') ? target : site(target) }))
  menuItems.push({ label: founder.navLabel, link: '#founder' })
  const labels = { title: copy.ui.menuTitle, close: copy.ui.closeMenu, eyebrow: copy.menu.eyebrow, lead: copy.menu.lead, socials: copy.menu.socials, place: copy.menu.place }
  const closeMenu = () => setMenuOpen(false)
  return <>
    <StarBorder as="aside" className="side-rail" aria-label={copy.ui.quickNav} radius={18} duration={9} thickness={1.3} stars={2} trailLength={.18} glow={.55} hover="brighten" clickPulse={false} theme="dark" color={theme === 'dark' ? '#99d8ce' : '#61d2c0'} trailColor="#2b9dce" backgroundColor="var(--rail-bg)" textColor="var(--rail-ink)" borderColor="var(--rail-border)">
      <button ref={menuTrigger} className="menu-button" aria-label={menuOpen ? copy.ui.closeMenu : copy.ui.openMenu} aria-haspopup="dialog" aria-expanded={menuOpen} aria-controls="staggered-menu-panel" onPointerEnter={prepareMenu} onFocus={prepareMenu} onTouchStart={prepareMenu} onClick={() => { setMenuRequested(true); setMenuOpen(value => !value); prepareMenu() }}><MenuToggleIcon open={menuOpen} /></button>
      <a className={`rail-brand${brandHidden ? ' is-suppressed' : ''}`} href={site('/')} aria-label={copy.ui.home} aria-hidden={brandHidden} inert={brandHidden}><img src="/media/original-logo.png" alt="" width="38" height="38" /><span>ICUE VIETNAM</span></a>
      <RailScrollCue visible={brandHidden} />
      <LocaleControls className="rail-controls" />
      <div className="rail-links"><a href={contact.facebook} aria-label={copy.ui.facebook}><span className="facebook-glyph" aria-hidden="true">f</span></a><a href={`mailto:${contact.email}`} aria-label={copy.ui.email}><Mail size={18} strokeWidth={1.5} /></a><a href={`tel:${contact.tel}`} aria-label={copy.ui.call}><Phone size={17} strokeWidth={1.5} /></a><span className="rail-section">{sectionIndex}</span></div>
    </StarBorder>
    {menuRequested && (Menu ? <Menu open={menuOpen} onClose={closeMenu} triggerRef={menuTrigger} homeHref={site('/')} labels={labels} items={menuItems} socialItems={[{ label: contact.email, link: `mailto:${contact.email}` }, { label: 'Facebook', link: contact.facebook }]} controls={<LocaleControls />} /> : <PendingMenu open={menuOpen} onClose={closeMenu} triggerRef={menuTrigger} labels={labels} items={menuItems} loading={menuLoading} />)}
  </>
}
