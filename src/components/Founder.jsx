import { useEffect, useId, useState } from 'react'
import { ArrowUpRight, Plus } from 'lucide-react'
import { useLocale } from '../i18n/LocaleProvider.jsx'
import { loadFounderData } from '../i18n/localeData.js'
import FounderIntro from './FounderIntro.jsx'
import Stepper, { Step } from './Stepper.jsx'
import './Founder.css'

function FounderPhotoEvent({ year, founder, reader }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  // Photo dates and contexts were supplied by the user: VTV1 in 2017,
  // and one of his final documented editorial meetings in 2018.
  const photo = {
    '2017': { src: '/media/pham-sy-liem-portrait.jpg', alt: founder.portraitAlt, caption: founder.portraitCaption, width: 900, height: 448 },
    '2018': { src: '/media/pham-sy-liem-meeting.jpg', alt: founder.archiveAlt, caption: founder.archiveCaption, width: 1000, height: 487 },
  }[year]

  return <div className="founder-photo-event">
    <button type="button" className="founder-event-trigger" aria-expanded={open} aria-controls={id} aria-label={`${year}. ${reader.photoEvents[year]}. ${open ? founder.hidePhoto : founder.viewPhoto}`} onClick={() => setOpen(value => !value)}>
      <span className="founder-event-year">{year}</span><span className="founder-event-text">{reader.photoEvents[year]}</span><span className="founder-photo-toggle"><Plus size={17} strokeWidth={1.4} aria-hidden="true" /></span>
    </button>
    <figure id={id} className="founder-event-photo" hidden={!open}>
      {open && <><img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} /><figcaption><span>{founder.archiveLabel}</span> · {photo.caption}</figcaption></>}
    </figure>
  </div>
}

function withInlineLinks(text, reader) {
  const inlineLinks = [
    ['Nghĩ về một người cống hiến năm 2019', reader.remembrance],
    ['Người Đô Thị', reader.nguoiDoThi],
    ['Nghĩ về một người cống hiến', reader.remembrance],
  ]
  let nodes = [text]
  inlineLinks.forEach(([label, href], linkIndex) => {
    nodes = nodes.flatMap(node => {
      if (typeof node !== 'string' || !node.includes(label)) return [node]
      return node.split(label).flatMap((part, index) => index === 0 ? [part] : [
        <a key={`${linkIndex}-${index}`} className="founder-inline-link" href={href} target="_blank" rel="noopener noreferrer">{label}<ArrowUpRight size={13} aria-hidden="true" /></a>,
        part,
      ])
    })
  })
  return nodes
}

function FounderChapter({ chapter, isActive, founder, reader }) {
  return <div className="founder-chapter">
    <h5>{chapter.heading}</h5>
    {chapter.paragraphs.map((paragraph, index) => <p key={index}>{withInlineLinks(paragraph, reader)}</p>)}
    {isActive && chapter.photoEvents.map(year => <FounderPhotoEvent key={year} year={year} founder={founder} reader={reader} />)}
  </div>
}

export default function Founder() {
  const { locale, founder, copy } = useLocale()
  const [loaded, setLoaded] = useState(null)
  const [readerFailed, setReaderFailed] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const [currentStep, setCurrentStep] = useState(1)
  useEffect(() => {
    let cancelled = false
    setReaderFailed(false)
    loadFounderData(locale).then(reader => { if (!cancelled) setLoaded({ locale, reader }) }).catch(() => { if (!cancelled) setReaderFailed(true) })
    return () => { cancelled = true }
  }, [locale, attempt])
  const reader = loaded?.locale === locale ? loaded.reader : null
  if (!reader) return <><FounderIntro founder={founder} />{readerFailed && <button type="button" className="text-link" onClick={() => setAttempt(value => value + 1)}>{copy.ui.retry}</button>}<div className="founder-reader-placeholder" aria-hidden="true" /></>

  return <>
    <FounderIntro founder={founder} introduction={reader.introduction} />
    <div className="founder-reader">
      <div className="founder-reader-intro">
        <h3>{reader.heading}</h3>
        <p>{reader.readerHint}</p>
        <a className="text-link founder-source" href={reader.sourceHref} target="_blank" rel="noopener noreferrer">{reader.source}<ArrowUpRight size={15} aria-hidden="true" /></a>
      </div>
      <Stepper key={locale} initialStep={currentStep} onStepChange={setCurrentStep} backButtonText={reader.back} nextButtonText={reader.next} completeButtonText={reader.complete} completedButtonText={reader.completed} stepCounterText={reader.counter} headingLevel={4} aria-label={reader.heading}>
        {reader.chapters.map(chapter => <Step key={chapter.id} title={chapter.title} description={chapter.period}>
          {({ isActive }) => <FounderChapter chapter={chapter} isActive={isActive} founder={founder} reader={reader} />}
        </Step>)}
      </Stepper>
    </div>
  </>
}
