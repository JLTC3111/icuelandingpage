import { useEffect, useId, useState } from 'react'
import { useLocale } from '../i18n/LocaleProvider.jsx'
import { ImageComparison, ImageComparisonImage, ImageComparisonLabel, ImageComparisonSlider } from './ImageComparison.jsx'
import './HeroImageComparison.css'

export default function HeroImageComparison() {
  const { copy } = useLocale()
  const labels = copy.hero.comparison
  const instructionsId = useId()
  const [hover, setHover] = useState(false)

  useEffect(() => {
    const pointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setHover(pointer.matches && !motion.matches)
    sync()
    pointer.addEventListener('change', sync)
    motion.addEventListener('change', sync)
    return () => {
      pointer.removeEventListener('change', sync)
      motion.removeEventListener('change', sync)
    }
  }, [])

  return <ImageComparison className="hero-comparison" enableHover={hover}>
    <ImageComparisonImage src="/media/pp_8-960.webp" alt={labels.planAlt} position="left" className="hero-comparison-plan" width="960" height="1032" loading="eager" decoding="async" />
    <ImageComparisonImage src="/media/pp_6b-960.webp" alt={labels.renderAlt} position="right" width="960" height="686" fetchPriority="high" decoding="async" />
    <ImageComparisonLabel className="hero-comparison-label hero-comparison-label-plan" position="left">{labels.plan}</ImageComparisonLabel>
    <ImageComparisonLabel className="hero-comparison-label hero-comparison-label-render" position="right">{labels.render}</ImageComparisonLabel>
    <ImageComparisonSlider label={labels.label} describedBy={instructionsId} valueText={(value) => `${Math.round(value)}% ${labels.plan}`}>
      <span className="image-comparison__handle" />
      <span className="hero-comparison-hint" aria-hidden="true">{labels.hint}</span>
    </ImageComparisonSlider>
    <p id={instructionsId} className="sr-only">{labels.instructions}</p>
  </ImageComparison>
}
