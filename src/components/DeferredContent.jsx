import { Component, lazy, useEffect, useRef, useState } from 'react'

export function useDeferredImport(loader) {
  const [attempt, setAttempt] = useState(() => ({ Component: lazy(loader), version: 0 }))
  const retry = () => setAttempt(current => ({ Component: lazy(loader), version: current.version + 1 }))
  return [attempt.Component, retry, attempt.version]
}

export class DeferredBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() {
    if (!this.state.failed) return this.props.children
    return <div className="deferred-error">{this.props.fallback}<button type="button" onClick={this.props.onRetry}>{this.props.retryLabel}</button></div>
  }
}

// Mount a single time before entering the viewport. The shell and its anchor
// remain in the document so section observation and direct links stay stable.
export function useNearViewport({ rootMargin = '700px 0px', anchor } = {}) {
  const ref = useRef(null)
  const [ready, setReady] = useState(() => Boolean(anchor && typeof window !== 'undefined' && window.location.hash === `#${anchor}`))
  useEffect(() => {
    if (ready) return undefined
    const reveal = () => setReady(true)
    const onHash = () => { if (window.location.hash === `#${anchor}`) reveal() }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { reveal(); observer.disconnect() }
    }, { rootMargin })
    if (ref.current) observer.observe(ref.current)
    if (anchor) window.addEventListener('hashchange', onHash)
    return () => { observer.disconnect(); window.removeEventListener('hashchange', onHash) }
  }, [ready, rootMargin, anchor])
  return [ref, ready]
}
