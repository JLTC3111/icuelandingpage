import { Suspense } from 'react'
import { useLocale } from '../i18n/LocaleProvider.jsx'
import { DeferredBoundary, useDeferredImport, useNearViewport } from './DeferredContent.jsx'
import FounderIntro from './FounderIntro.jsx'
import './Founder.css'

const loadFounder = () => import('./Founder.jsx')

export default function DeferredFounder() {
  const { founder, copy } = useLocale()
  const [ref, ready] = useNearViewport({ rootMargin: '1000px 0px', anchor: 'founder' })
  const [Founder, retry, version] = useDeferredImport(loadFounder)
  const placeholder = <><FounderIntro founder={founder} /><div className="founder-reader-placeholder" aria-hidden="true" /></>
  return <section ref={ref} id="founder" className="founder section-shell" aria-labelledby="founder-heading">
    {ready ? <DeferredBoundary key={version} fallback={placeholder} retryLabel={copy.ui.retry} onRetry={retry}><Suspense fallback={placeholder}><Founder /></Suspense></DeferredBoundary> : placeholder}
  </section>
}
