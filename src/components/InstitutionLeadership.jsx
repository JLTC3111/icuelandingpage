import { ArrowUpRight } from 'lucide-react'
import { useLocale } from '../i18n/LocaleProvider.jsx'
import leadershipContent, { leadershipSources } from '../data/leadershipContent.js'
import './InstitutionLeadership.css'

export function presentPerson(person, locale) {
  if (person?.id !== 'nguyen-thanh-tam') return person
  const copy = leadershipContent[locale] || leadershipContent.vi
  return { ...person, bio: copy.tamBio, highlights: copy.tamHighlights }
}

export function LeadershipSources({ includeInterview = false, appointment = 'institute' }) {
  const { locale } = useLocale()
  const copy = leadershipContent[locale]
  const tam = appointment === 'tam'
  return <div className="leadership-sources" aria-label={copy.sourcesLabel}>
    <a href={tam ? leadershipSources.tamAppointment : leadershipSources.appointment} target="_blank" rel="noopener noreferrer">{tam ? copy.tamAppointmentLabel : copy.appointmentLabel}<ArrowUpRight size={14} aria-hidden="true" /></a>
    {includeInterview && <a href={leadershipSources.interview} target="_blank" rel="noopener noreferrer">{copy.interviewLabel}<ArrowUpRight size={14} aria-hidden="true" /></a>}
  </div>
}

export function LeadershipProfileNote({ personId }) {
  const { locale } = useLocale()
  const copy = leadershipContent[locale]
  const director = personId === 'nguyen-hong-hanh'
  const tam = personId === 'nguyen-thanh-tam'
  if (!director && !tam && !['tran-quoc-toan', 'tran-thi-lan-anh'].includes(personId)) return null
  return <div className="leadership-profile-note">
    <p>{director ? copy.directorNote : tam ? copy.tamNote : copy.deputyNote}</p>
    {director && <p>{copy.researchNote}</p>}
    <LeadershipSources includeInterview={director} appointment={tam ? 'tam' : 'institute'} />
  </div>
}

export default function InstitutionLeadership({ onSelect }) {
  const { locale } = useLocale()
  const copy = leadershipContent[locale]
  return <aside className="leadership-summary" aria-labelledby="leadership-heading">
    <span className="leadership-eyebrow">{copy.heading}</span>
    <h3 id="leadership-heading">{copy.term}</h3>
    <p className="leadership-announcement">{copy.announced}</p>
    <dl>
      <div><dt>{copy.directorLabel}</dt><dd><button type="button" aria-haspopup="dialog" onClick={() => onSelect('nguyen-hong-hanh')}>{copy.directorName}<ArrowUpRight size={15} aria-hidden="true" /></button></dd></div>
      <div><dt>{copy.deputiesLabel}</dt><dd><ul>{copy.deputies.map((name) => <li key={name}>{name}</li>)}</ul></dd></div>
    </dl>
    <LeadershipSources includeInterview />
  </aside>
}
