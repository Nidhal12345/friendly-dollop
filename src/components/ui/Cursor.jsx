import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Custom cursor: small dot + trailing ring.
 * Elements with [data-cursor="view"|"drag"|"link"] change its state.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [variant, setVariant] = useState('default')
  const [label, setLabel] = useState('')
  const [hidden, setHidden] = useState(true)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 280, damping: 28, mass: 0.6 })
  const ringY = useSpring(y, { stiffness: 280, damping: 28, mass: 0.6 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine) return
    setEnabled(true)

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setHidden(false)
    }
    const over = (e) => {
      const t = e.target.closest('[data-cursor]')
      if (t) {
        setVariant(t.dataset.cursor)
        setLabel(t.dataset.cursorLabel || '')
      } else if (e.target.closest('a, button, [role="button"], input, textarea, select, label')) {
        setVariant('link')
        setLabel('')
      } else {
        setVariant('default')
        setLabel('')
      }
    }
    const leave = () => setHidden(true)
    const enter = () => setHidden(false)

    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mouseover', over, { passive: true })
    document.documentElement.addEventListener('mouseleave', leave)
    document.documentElement.addEventListener('mouseenter', enter)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      document.documentElement.removeEventListener('mouseleave', leave)
      document.documentElement.removeEventListener('mouseenter', enter)
    }
  }, [x, y])

  if (!enabled) return null

  const ringSize = variant === 'view' || variant === 'drag' ? 88 : variant === 'link' ? 48 : 36
  const dotScale = variant === 'link' ? 0 : variant === 'view' || variant === 'drag' ? 0 : 1

  return (
    <>
      {/* Dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-[6px] w-[6px] rounded-full bg-foam mix-blend-difference"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: hidden ? 0 : dotScale, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.25 }}
      />
      {/* Ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] flex items-center justify-center rounded-full"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: hidden ? 0 : 1,
          backgroundColor:
            variant === 'view' || variant === 'drag' ? 'rgba(255,122,89,1)' : 'rgba(255,122,89,0)',
          borderColor:
            variant === 'link' ? 'rgba(255,122,89,0.9)' : 'rgba(238,244,248,0.35)',
          borderWidth: variant === 'view' || variant === 'drag' ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      >
        {(variant === 'view' || variant === 'drag') && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-abyss"
          >
            {label || (variant === 'drag' ? 'Drag' : 'View')}
          </motion.span>
        )}
      </motion.div>
    </>
  )
}
