/* Adapted from ICUE-mainsite-vn/news-app/src/components/motion-primitives/ImageComparison.jsx.
 * Landing-page additions: keyboard slider controls, image attributes and localized accessibility.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react'
import './ImageComparison.css'

const ImageComparisonContext = createContext(undefined)

const DEFAULT_SPRING_OPTIONS = {
  bounce: 0,
  duration: 0,
}

function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function ImageComparison({
  children,
  className,
  enableHover = false,
  hoverOnly = false,
  springOptions,
}) {
  const containerRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isLocked, setIsLocked] = useState(false)
  const [useDirectMotion, setUseDirectMotion] = useState(false)
  const isLockedRef = useRef(false)
  const isDraggingRef = useRef(false)
  const isTouchPointerRef = useRef(false)
  const motionValue = useMotionValue(50)
  const springPosition = useSpring(motionValue, springOptions ?? DEFAULT_SPRING_OPTIONS)
  const motionSliderPosition = (enableHover || hoverOnly || useDirectMotion)
    ? motionValue
    : springPosition
  const boundsRef = useRef(null)
  const pointerFrameRef = useRef(0)
  const pendingPointerRef = useRef(null)
  const dragMovedRef = useRef(false)
  const pointerActiveRef = useRef(false)
  const suppressClickRef = useRef(false)

  const setLocked = useCallback((locked) => {
    isLockedRef.current = locked
    setIsLocked(locked)
  }, [])

  const setPosition = useCallback((value) => {
    const percentage = Math.min(Math.max(value, 0), 100)
    motionValue.jump(percentage)
  }, [motionValue])

  const flushPointer = useCallback(() => {
    pointerFrameRef.current = 0
    const container = containerRef.current
    const clientX = pendingPointerRef.current
    pendingPointerRef.current = null
    if (!container || clientX === null) return
    const containerRect = boundsRef.current ?? container.getBoundingClientRect()
    boundsRef.current = containerRect
    const x = clientX - containerRect.left
    const width = Math.max(containerRect.width, 1)
    setPosition((x / width) * 100)
  }, [setPosition])

  const updatePosition = (event, immediate = false) => {
    pendingPointerRef.current = event.clientX
    if (immediate) {
      cancelAnimationFrame(pointerFrameRef.current)
      flushPointer()
    } else if (!pointerFrameRef.current) {
      pointerFrameRef.current = requestAnimationFrame(flushPointer)
    }
  }

  useEffect(() => {
    const invalidateBounds = () => { boundsRef.current = null }
    const observer = new ResizeObserver(invalidateBounds)
    observer.observe(containerRef.current)
    window.addEventListener('resize', invalidateBounds)
    window.addEventListener('scroll', invalidateBounds, { passive: true, capture: true })
    return () => {
      cancelAnimationFrame(pointerFrameRef.current)
      observer.disconnect()
      window.removeEventListener('resize', invalidateBounds)
      window.removeEventListener('scroll', invalidateBounds, true)
    }
  }, [])

  const finishPointer = (event, { lockAfterDrag = false } = {}) => {
    cancelAnimationFrame(pointerFrameRef.current)
    flushPointer()
    isDraggingRef.current = false
    setIsDragging(false)
    setUseDirectMotion(false)
    pointerActiveRef.current = false

    if (event?.currentTarget?.releasePointerCapture && event.pointerId != null) {
      try {
        event.currentTarget.releasePointerCapture(event.pointerId)
      } catch {
        // ignore if capture was already released
      }
    }

    if (isTouchPointerRef.current) {
      dragMovedRef.current = false
      isTouchPointerRef.current = false
      return
    }

    if (lockAfterDrag && dragMovedRef.current) {
      lockInteraction()
      suppressClickRef.current = true
    }
    dragMovedRef.current = false
  }

  const handlePointerMove = (event) => {
    if (isLockedRef.current && !hoverOnly && !isTouchPointerRef.current) return

    if (hoverOnly) {
      if (enableHover || pointerActiveRef.current) {
        if (pointerActiveRef.current) dragMovedRef.current = true
        updatePosition(event)
      }
      return
    }

    if (!pointerActiveRef.current && !enableHover) return
    if (!isDraggingRef.current && !enableHover) return

    dragMovedRef.current = true
    if (isTouchPointerRef.current) {
      event.preventDefault()
    }
    updatePosition(event)
  }

  const lockInteraction = useCallback(() => {
    cancelAnimationFrame(pointerFrameRef.current)
    flushPointer()
    setLocked(true)
    isDraggingRef.current = false
    setIsDragging(false)
    setUseDirectMotion(false)
    pointerActiveRef.current = false
    dragMovedRef.current = false
  }, [flushPointer, setLocked])

  const unlockInteraction = () => {
    setLocked(false)
    pointerActiveRef.current = false
    dragMovedRef.current = false
    suppressClickRef.current = false
  }

  const handlePointerDown = (event) => {
    if (event.button > 0) return
    if (isLockedRef.current && !hoverOnly && event.pointerType === 'mouse') return
    boundsRef.current = containerRef.current?.getBoundingClientRect() ?? null

    isTouchPointerRef.current = event.pointerType === 'touch'
    pointerActiveRef.current = true
    isDraggingRef.current = true
    setIsDragging(true)
    setUseDirectMotion(true)
    dragMovedRef.current = false

    if (hoverOnly && !enableHover) {
      updatePosition(event, true)
    } else if (!enableHover || event.pointerType === 'touch') {
      event.currentTarget.setPointerCapture?.(event.pointerId)
      updatePosition(event, true)
    }
  }

  const handlePointerUp = (event) => {
    if (hoverOnly) {
      if (dragMovedRef.current) suppressClickRef.current = true
      finishPointer(event)
      return
    }

    if (isLockedRef.current && !isTouchPointerRef.current) return
    finishPointer(event, { lockAfterDrag: !isTouchPointerRef.current && !enableHover })
  }

  const handleMouseEnter = (event) => {
    boundsRef.current = containerRef.current?.getBoundingClientRect() ?? null
    if (hoverOnly) {
      unlockInteraction()
      if (enableHover) updatePosition(event, true)
      return
    }

    if (isLockedRef.current) unlockInteraction()
    if (enableHover) updatePosition(event, true)
  }

  const handleMouseLeave = () => {
    if (hoverOnly) {
      cancelAnimationFrame(pointerFrameRef.current)
      pointerFrameRef.current = 0
      pendingPointerRef.current = null
      setPosition(50)
      pointerActiveRef.current = false
      isDraggingRef.current = false
      setIsDragging(false)
      setUseDirectMotion(false)
      dragMovedRef.current = false
      return
    }

    if (!enableHover && pointerActiveRef.current) {
      finishPointer(null)
    }
  }

  const handleClick = () => {
    if (hoverOnly) return

    if (suppressClickRef.current) {
      suppressClickRef.current = false
      return
    }
    if (isLockedRef.current) {
      unlockInteraction()
      return
    }
    if (enableHover) {
      lockInteraction()
    }
  }

  const context = useMemo(() => ({
    position: motionValue, setPosition, motionSliderPosition, isLocked, lockInteraction,
  }), [motionValue, setPosition, motionSliderPosition, isLocked, lockInteraction])

  return (
    <ImageComparisonContext.Provider
      value={context}
    >
      <div
        ref={containerRef}
        className={cn(
          'image-comparison',
          (enableHover || hoverOnly) && !isLocked && 'image-comparison--hover',
          hoverOnly && 'image-comparison--hover-only',
          isLocked && 'image-comparison--locked',
          isDragging && 'image-comparison--dragging',
          className,
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onClick={handleClick}
      >
        {children}
      </div>
    </ImageComparisonContext.Provider>
  )
}

export function ImageComparisonImage({ className, alt, src, position, ...imageProps }) {
  const ctx = useContext(ImageComparisonContext)
  if (!ctx) throw new Error('ImageComparisonImage must be used within ImageComparison')

  const { motionSliderPosition } = ctx
  const leftClipPath = useTransform(
    motionSliderPosition,
    (value) => `inset(0 0 0 ${value}%)`,
  )
  const rightClipPath = useTransform(
    motionSliderPosition,
    (value) => `inset(0 ${100 - value}% 0 0)`,
  )

  return (
    <motion.img
      {...imageProps}
      src={src}
      alt={alt}
      className={cn('image-comparison__image', className)}
      draggable={false}
      style={{
        clipPath: position === 'left' ? rightClipPath : leftClipPath,
      }}
    />
  )
}

export function ImageComparisonSlider({ className, children, label, valueText, describedBy }) {
  const ctx = useContext(ImageComparisonContext)
  if (!ctx) throw new Error('ImageComparisonSlider must be used within ImageComparison')

  const { motionSliderPosition, position, setPosition, lockInteraction } = ctx
  // Only the accessible control needs React state. Images and labels continue
  // to follow MotionValues without rerendering for every pointer coordinate.
  const [sliderPosition, setSliderPosition] = useState(() => Math.round(position.get()))
  useEffect(() => position.on('change', value => setSliderPosition(Math.round(value))), [position])
  const left = useTransform(motionSliderPosition, (value) => `${value}%`)

  const handleKeyDown = (event) => {
    const current = position.get()
    const amount = event.shiftKey ? 10 : 1
    const positions = {
      ArrowLeft: current - amount,
      ArrowDown: current - amount,
      ArrowRight: current + amount,
      ArrowUp: current + amount,
      PageDown: current - 10,
      PageUp: current + 10,
      Home: 0,
      End: 100,
    }
    if (!(event.key in positions)) return
    event.preventDefault()
    event.stopPropagation()
    lockInteraction()
    setPosition(positions[event.key])
  }

  return (
    <motion.div
      className={cn('image-comparison__slider', className)}
      style={{ left, x: '-50%' }}
      role="slider"
      tabIndex={0}
      aria-label={label}
      aria-describedby={describedBy}
      aria-orientation="horizontal"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(sliderPosition)}
      aria-valuetext={valueText?.(sliderPosition)}
      onKeyDown={handleKeyDown}
    >
      {children ?? <span className="image-comparison__handle" />}
    </motion.div>
  )
}

export function ImageComparisonLabel({ children, className, position }) {
  const ctx = useContext(ImageComparisonContext)
  if (!ctx) throw new Error('ImageComparisonLabel must be used within ImageComparison')
  const opacity = useTransform(ctx.motionSliderPosition, (value) => {
    const available = position === 'left' ? value - 8 : 92 - value
    return Math.min(Math.max(available / 12, 0), 1)
  })
  return <motion.span className={className} style={{ opacity }} aria-hidden="true">{children}</motion.span>
}
