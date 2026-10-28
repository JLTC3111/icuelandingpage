/* Adapted from React Bits Staggered Menu by David Haz.
 * https://reactbits.dev/components/staggered-menu
 * Copyright and permission notice: ../../licenses/react-bits.md
 * ICUE changes: controlled rail trigger, native dialog focus handling,
 * localization, theme support, navigation dismissal, and reduced motion.
 */
import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowUpRight, X } from 'lucide-react'
import './StaggeredMenu.css'

export default function StaggeredMenu({ open, onClose, triggerRef, labels, items, socialItems, controls, theme }) {
  const dialogRef = useRef(null)
  const panelRef = useRef(null)
  const layersRef = useRef(null)
  const closeButtonRef = useRef(null)
  const animationRef = useRef(null)

  useLayoutEffect(() => {
    const dialog = dialogRef.current
    const panel = panelRef.current
    const layers = [...layersRef.current.children]
    const itemEls = [...panel.querySelectorAll('.sm-panel-itemLabel')]
    const numberEls = [...panel.querySelectorAll('.sm-panel-item')]
    const socialEls = [...panel.querySelectorAll('.sm-socials-title, .sm-socials-link')]
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    animationRef.current?.kill()

    if (open) {
      if (!dialog.open) {
        dialog.showModal()
        gsap.set([panel, ...layers], { x: 0, xPercent: -100 })
      }
      closeButtonRef.current.focus({ preventScroll: true })
      if (reduced) {
        gsap.set([panel, ...layers], { xPercent: 0 })
        gsap.set(itemEls, { yPercent: 0, rotate: 0 })
        gsap.set(numberEls, { '--sm-num-opacity': 1 })
        gsap.set(socialEls, { y: 0, opacity: 1 })
      } else {
        gsap.set(itemEls, { yPercent: 140, rotate: 10 })
        gsap.set(numberEls, { '--sm-num-opacity': 0 })
        gsap.set(socialEls, { y: 25, opacity: 0 })
        const tl = gsap.timeline()
        layers.forEach((layer, i) => tl.to(layer, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07))
        const panelInsertTime = (layers.length - 1) * 0.07 + 0.08
        tl.to(panel, { xPercent: 0, duration: 0.65, ease: 'power4.out' }, panelInsertTime)
        const itemsStart = panelInsertTime + 0.65 * 0.15
        tl.to(itemEls, { yPercent: 0, rotate: 0, duration: 1, ease: 'power4.out', stagger: { each: 0.1, from: 'start' } }, itemsStart)
        tl.to(numberEls, { '--sm-num-opacity': 1, duration: 0.6, ease: 'power2.out', stagger: 0.08 }, itemsStart + 0.1)
        tl.to(socialEls, { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out', stagger: 0.08 }, panelInsertTime + 0.3)
        animationRef.current = tl
      }
    } else if (dialog.open) {
      const finish = () => { dialog.close(); triggerRef.current?.focus({ preventScroll: true }) }
      if (reduced) { gsap.set([panel, ...layers], { xPercent: -100 }); finish() }
      else animationRef.current = gsap.to([...layers, panel], { xPercent: -100, duration: 0.32, ease: 'power3.in', overwrite: 'auto', onComplete: finish })
    }
    return () => animationRef.current?.kill()
  }, [open, triggerRef])

  return <dialog ref={dialogRef} className="staggered-menu-dialog" aria-labelledby="staggered-menu-title" data-open={open || undefined} onCancel={(e) => { e.preventDefault(); onClose() }} onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
    <div ref={layersRef} className="sm-prelayers" aria-hidden="true"><div className="sm-prelayer sm-prelayer-one" /><div className="sm-prelayer sm-prelayer-two" /></div>
    <div ref={panelRef} id="staggered-menu-panel" className="staggered-menu-panel">
      <div className="sm-panel-inner"><div className="sm-panel-header"><a href="#home" className="wordmark" onClick={onClose} aria-label="ICUE"><img src={theme === 'dark' ? '/media/icue-mark-light.svg' : '/media/icue-mark.svg'} alt="" width="39" height="39" />ICUE<span className="accent">.</span></a><button ref={closeButtonRef} className="dialog-close sm-close" aria-label={labels.close} onClick={onClose} autoFocus><X size={25} strokeWidth={1.3} /></button></div>
        <div className="sm-intro"><h2 id="staggered-menu-title" className="sm-panel-title">{labels.eyebrow}</h2><p>{labels.lead}</p></div>
        <nav aria-label={labels.title}><ul className="sm-panel-list" data-numbering>{items.map((item, i) => <li className="sm-panel-itemWrap" key={item.link}><a className="sm-panel-item" href={item.link} onClick={onClose} data-index={i + 1}><span className="sm-panel-itemLabel">{item.label}</span><ArrowUpRight size={24} strokeWidth={1.2} aria-hidden="true" /></a></li>)}</ul></nav>
        <div className="sm-socials"><span className="sm-socials-title">{labels.socials}</span><ul className="sm-socials-list">{socialItems.map((item) => <li key={item.link}><a href={item.link} className="sm-socials-link" target={item.link.startsWith('http') ? '_blank' : undefined} rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}>{item.label}<ArrowUpRight size={14} /></a></li>)}</ul></div>
        <div className="sm-panel-bottom">{controls}<span>{labels.place}</span></div>
      </div>
    </div>
  </dialog>
}
