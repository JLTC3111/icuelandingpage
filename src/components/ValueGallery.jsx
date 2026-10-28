import { useLocale } from '../i18n/LocaleProvider.jsx'
import AccordionGallery from './AccordionGallery.jsx'
import './ValueGallery.css'

export default function ValueGallery({ index }) {
  const { content, copy } = useLocale()
  const { groups, labels } = content.valuesGallery
  const items = groups[index]
  const compactHeight = 260 + (Math.min(items.length, 4) - 1) * 92

  return <div className="value-gallery" style={{ '--value-gallery-compact-height': `${compactHeight}px` }}>
    <AccordionGallery items={items} ariaLabel={copy.values.items[index].title} labels={labels} defaultIndex={0} height={420} expandRatio={.68} tilt={4} parallax={.3} duration={.65} gap={8} radius={14} />
  </div>
}
