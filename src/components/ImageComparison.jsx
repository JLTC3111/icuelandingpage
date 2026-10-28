/* Adapted from ICUE-mainsite-vn/news-app/src/components/motion-primitives/ImageComparison.jsx.
 * Landing-page additions: keyboard slider controls, image attributes and localized accessibility.
 */
import { createContext, useContext, useRef, useState } from 'react'
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
  const [sliderPosition, setSliderPosition] = useState(50)
  const dragMovedRef = useRef(false)
  const pointerActiveRef = useRef(false)
  const suppressClickRef = useRef(false)

  const setLocked = (locked) => {
    isLockedRef.current = locked
    setIsLocked(locked)
  }

  const setPosition = (value) => {
    const percentage = Math.min(Math.max(value, 0), 100)
    motionValue.jump(percentage)
    setSliderPosition(percentage)
  }

  const updatePosition = (event) => {
    const container = containerRef.current
    if (!container) return
    const containerRect = container.getBoundingClientRect()
    const x = event.clientX - containerRect.left
    const width = Math.max(containerRect.width, 1)
    const percentage = Math.min(Math.max((x / width) * 100, 0), 100)
    setPosition(percentage)
  }

  const finishPointer = (event, { lockAfterDrag = false } = {}) => {
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

  const lockInteraction = () => {
    setLocked(true)
    isDraggingRef.current = false
    setIsDragging(false)
    setUseDirectMotion(false)
    pointerActiveRef.current = false
    dragMovedRef.current = false
  }

  const unlockInteraction = () => {
    setLocked(false)
    pointerActiveRef.current = false
    dragMovedRef.current = false
    suppressClickRef.current = false
  }

  const handlePointerDown = (event) => {
    if (event.button > 0) return
    if (isLockedRef.current && !hoverOnly && event.pointerType === 'mouse') return

    isTouchPointerRef.current = event.pointerType === 'touch'
    pointerActiveRef.current = true
    isDraggingRef.current = true
    setIsDragging(true)
    setUseDirectMotion(true)
    dragMovedRef.current = false

    if (hoverOnly && !enableHover) {
      updatePosition(event)
    } else if (!enableHover || event.pointerType === 'touch') {
      event.currentTarget.setPointerCapture?.(event.pointerId)
      updatePosition(event)
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
    if (hoverOnly) {
      unlockInteraction()
      if (enableHover) updatePosition(event)
      return
    }

    if (isLockedRef.current) unlockInteraction()
    if (enableHover) updatePosition(event)
  }

  const handleMouseLeave = () => {
    if (hoverOnly) {
      motionValue.jump(50)
      setSliderPosition(50)
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

  return (
    <ImageComparisonContext.Provider
      value={{ sliderPosition, setPosition, motionSliderPosition, isLocked, lockInteraction }}
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

  const { motionSliderPosition, sliderPosition, setPosition, lockInteraction } = ctx
  const left = useTransform(motionSliderPosition, (value) => `${value}%`)

  const handleKeyDown = (event) => {
    const amount = event.shiftKey ? 10 : 1
    const positions = {
      ArrowLeft: sliderPosition - amount,
      ArrowDown: sliderPosition - amount,
      ArrowRight: sliderPosition + amount,
      ArrowUp: sliderPosition + amount,
      PageDown: sliderPosition - 10,
      PageUp: sliderPosition + 10,
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
