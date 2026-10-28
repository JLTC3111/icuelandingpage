import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { useLocale } from '../i18n/LocaleProvider.jsx'

export default function RailScrollCue({ visible }) {
  const { copy } = useLocale()
  const cueRef = useRef(null)
  const [atEnd, setAtEnd] = useState(false)

  useEffect(() => {
    if (!visible) return undefined
    let frame = 0
    const sync = () => {
      frame = 0
      const distance = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
      const progress = Math.min(Math.max(window.scrollY / distance, 0), 1)
      cueRef.current?.style.setProperty('--rail-reading-offset', `${100 - progress * 100}`)
      setAtEnd(progress > .8 && distance - window.scrollY <= window.innerHeight * .5)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(sync)
    }
    sync()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [visible])

  const label = atEnd ? copy.ui.backTop : copy.hero.scroll
  const Icon = atEnd ? ArrowUp : ArrowDown

  return <a ref={cueRef} className={`rail-scroll-cue${visible ? ' is-visible' : ''}`} href={atEnd ? '#home' : '#about'} aria-label={label} aria-hidden={!visible} inert={!visible}>
    <span className="rail-scroll-cue-icon" aria-hidden="true">
      <svg viewBox="0 0 40 40" className="rail-scroll-ring"><circle className="rail-scroll-track" cx="20" cy="20" r="17" /><circle className="rail-scroll-progress" cx="20" cy="20" r="17" pathLength="100" /></svg>
      <Icon size={16} strokeWidth={1.4} />
    </span>
    <span className="rail-scroll-cue-text">{label}</span>
  </a>
}
