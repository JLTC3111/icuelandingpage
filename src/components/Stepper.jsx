/* Reading adaptation of the React Bits Stepper / Step interface.
 * https://reactbits.dev/components/stepper
 * Copyright and permission notice: ../../licenses/react-bits.md
 * ICUE: vertical accordion, semantic headings, keyboard navigation, theme tokens.
 */
import { Children, cloneElement, isValidElement, useEffect, useId, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, ChevronDown } from 'lucide-react'
import './Stepper.css'

export function Step({ children, isActive = false }) {
  return <div className="stepper-content">{typeof children === 'function' ? children({ isActive }) : children}</div>
}

export default function Stepper({
  children, initialStep = 1, onStepChange, onFinalStepCompleted,
  backButtonText = 'Back', nextButtonText = 'Continue',
  completeButtonText = 'Finish reading', completedButtonText = 'Completed',
  stepCounterText = 'Section {current} of {total}', headingLevel = 3,
  className = '', ...rest
}) {
  const steps = Children.toArray(children).filter(isValidElement)
  const total = steps.length
  const [current, setCurrent] = useState(() => Math.min(Math.max(initialStep, 1), total))
  const [expanded, setExpanded] = useState(true)
  const [completed, setCompleted] = useState(false)
  const [visited, setVisited] = useState(() => new Set([current]))
  const triggerRefs = useRef([])
  const navigateFromFooter = useRef(false)
  const id = useId()
  const Heading = `h${headingLevel}`
  const counter = stepCounterText.replace('{current}', current).replace('{total}', total)

  useEffect(() => {
    if (!navigateFromFooter.current) return
    navigateFromFooter.current = false
    const trigger = triggerRefs.current[current - 1]
    trigger?.focus({ preventScroll: true })
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timer = window.setTimeout(() => trigger?.scrollIntoView({ block: 'start', behavior: reduced ? 'auto' : 'smooth' }), reduced ? 0 : 380)
    return () => window.clearTimeout(timer)
  }, [current])

  const select = (number, fromFooter = false) => {
    if (number === current) { setExpanded(value => !value); return }
    navigateFromFooter.current = fromFooter
    setCurrent(number)
    setExpanded(true)
    setVisited(value => new Set([...value, number]))
    setCompleted(false)
    onStepChange?.(number)
  }
  const next = () => {
    if (current < total) select(current + 1, true)
    else { setCompleted(true); onFinalStepCompleted?.() }
  }
  const navigateHeadings = (event, index) => {
    let target
    if (event.key === 'ArrowDown') target = (index + 1) % total
    if (event.key === 'ArrowUp') target = (index - 1 + total) % total
    if (event.key === 'Home') target = 0
    if (event.key === 'End') target = total - 1
    if (target !== undefined) { event.preventDefault(); triggerRefs.current[target]?.focus() }
  }

  return <div className={`stepper ${className}`} {...rest}>
    <p className="sr-only" role="status" aria-live="polite">{counter}</p>
    <ol className="stepper-list">{steps.map((child, index) => {
      const number = index + 1
      const isActive = current === number && expanded
      const seen = visited.has(number) && current !== number
      return <li className={`stepper-item${isActive ? ' is-active' : ''}${seen ? ' is-visited' : ''}`} key={child.key ?? index}>
        <Heading className="stepper-heading">
          <button ref={element => { triggerRefs.current[index] = element }} type="button" className="stepper-trigger" id={`${id}-trigger-${number}`} aria-expanded={isActive} aria-controls={`${id}-panel-${number}`} aria-current={current === number ? 'step' : undefined} onClick={() => select(number)} onKeyDown={event => navigateHeadings(event, index)}>
            <span className="stepper-number" aria-hidden="true">{seen ? <Check size={15} strokeWidth={1.6} /> : String(number).padStart(2, '0')}</span>
            <span className="stepper-title">{child.props.title}{child.props.description && <span className="stepper-description">{child.props.description}</span>}</span>
            <ChevronDown className="stepper-chevron" size={18} strokeWidth={1.4} aria-hidden="true" />
          </button>
        </Heading>
        <div className="stepper-panel" id={`${id}-panel-${number}`} role="region" aria-labelledby={`${id}-trigger-${number}`} aria-hidden={!isActive} inert={!isActive}>
          <div className="stepper-panel-clip"><div className="stepper-panel-body">
            {cloneElement(child, { isActive })}
            {isActive && <div className="stepper-footer">
              <button type="button" className="stepper-back" disabled={current === 1} onClick={() => select(current - 1, true)}><ArrowLeft size={15} aria-hidden="true" />{backButtonText}</button>
              <span className="stepper-counter" aria-hidden="true">{counter}</span>
              <button type="button" className="stepper-next" disabled={completed} onClick={next}>{completed ? completedButtonText : current === total ? completeButtonText : nextButtonText}{completed ? <Check size={15} aria-hidden="true" /> : <ArrowRight size={15} aria-hidden="true" />}</button>
            </div>}
          </div></div>
        </div>
      </li>
    })}</ol>
  </div>
}
