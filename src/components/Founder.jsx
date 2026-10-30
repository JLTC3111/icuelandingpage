import { useId, useState } from 'react'
import { ArrowUpRight, Plus } from 'lucide-react'
import { useLocale } from '../i18n/LocaleProvider.jsx'
import founderContent from '../data/founderContent.js'
import founderBiography from '../data/founderBiography.js'
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

function FounderChapter({ chapter, isActive, founder, reader }) {
  return <div className="founder-chapter">
    <h5>{chapter.heading}</h5>
    {chapter.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
    {isActive && chapter.photoEvents.map(year => <FounderPhotoEvent key={year} year={year} founder={founder} reader={reader} />)}
  </div>
}

export default function Founder() {
  const { locale } = useLocale()
  const founder = founderContent[locale]
  const reader = founderBiography[locale]

  return <section id="founder" className="founder section-shell" aria-labelledby="founder-heading">
    <div className="founder-heading">
      <div className="eyebrow"><span className="eyebrow-dot" />{founder.eyebrow}<span className="section-number">/ 08</span></div>
      <span className="founder-lifespan">{founder.lifespan}</span>
    </div>
    <p className="founder-kicker">{founder.heading}</p>
    <h2 id="founder-heading">{founder.name}</h2>
    <p className="founder-role">{founder.honorific} · {founder.role}</p>
    <div className="founder-story">
      <p className="founder-lead">{founder.lead}</p>
      <p>{reader.introduction}</p>
    </div>
    <div className="founder-reader">
      <div className="founder-reader-intro">
        <h3>{reader.heading}</h3>
        <p>{reader.readerHint}</p>
        <a className="text-link founder-source" href={reader.sourceHref} target="_blank" rel="noopener noreferrer">{reader.source}<ArrowUpRight size={15} aria-hidden="true" /></a>
      </div>
      <Stepper initialStep={1} backButtonText={reader.back} nextButtonText={reader.next} completeButtonText={reader.complete} completedButtonText={reader.completed} stepCounterText={reader.counter} headingLevel={4} aria-label={reader.heading}>
        {reader.chapters.map(chapter => <Step key={chapter.id} title={chapter.title} description={chapter.period}>
          {({ isActive }) => <FounderChapter chapter={chapter} isActive={isActive} founder={founder} reader={reader} />}
        </Step>)}
      </Stepper>
    </div>
  </section>
}
