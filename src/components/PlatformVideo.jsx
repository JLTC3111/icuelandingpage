import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import './PlatformVideo.css'

export default function PlatformVideo({ src, poster, label, labels }) {
  const videoRef = useRef(null)
  const inViewRef = useRef(false)
  const userPausedRef = useRef(false)
  const [playing, setPlaying] = useState(false)
  const [failed, setFailed] = useState(false)

  const resume = () => {
    const video = videoRef.current
    if (!video || userPausedRef.current || !inViewRef.current || document.hidden) return
    video.muted = true
    video.play()?.catch(() => setPlaying(false))
  }

  useEffect(() => {
    const video = videoRef.current
    const sync = () => {
      if (inViewRef.current && !document.hidden && !userPausedRef.current) resume()
      else video.pause()
    }
    const observer = new IntersectionObserver(([entry]) => {
      inViewRef.current = entry.isIntersecting
      sync()
    }, { rootMargin: '0px', threshold: .05 })
    observer.observe(video)
    document.addEventListener('visibilitychange', sync)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', sync)
      video.pause()
    }
  }, [])

  const toggle = () => {
    const video = videoRef.current
    if (video.paused) {
      userPausedRef.current = false
      resume()
    } else {
      userPausedRef.current = true
      video.pause()
    }
  }
  const action = (playing ? labels.pausePreview : labels.playPreview).replace('{platform}', label)
  const Icon = playing ? Pause : Play

  return <>
    <video ref={videoRef} className={`platform-preview-video${failed ? ' has-error' : ''}`} src={src} poster={poster} autoPlay muted loop playsInline preload="metadata" aria-label={labels.previewLabel.replace('{platform}', label)} onCanPlay={resume} onPlay={() => {
      if (!inViewRef.current || document.hidden || userPausedRef.current) videoRef.current.pause()
      else setPlaying(true)
    }} onPause={() => setPlaying(false)} onError={() => { setFailed(true); setPlaying(false) }} />
    <button type="button" className="platform-video-control" onClick={toggle} aria-label={action} title={action} disabled={failed}>
      <Icon size={18} fill="currentColor" strokeWidth={1.5} aria-hidden="true" />
    </button>
  </>
}
