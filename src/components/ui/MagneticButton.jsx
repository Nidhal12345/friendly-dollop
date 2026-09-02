import { useMemo, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Button that subtly follows the cursor when hovered ("magnetic" effect),
 * with a fill-swipe hover animation.
 */
export default function MagneticButton({
  children,
  as: Tag = 'button',
  variant = 'primary',
  className = '',
  strength = 0.35,
  ...rest
}) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 })

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    x.set(dx * strength)
    y.set(dy * strength)
  }
  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  const base =
    'group relative inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 font-sans text-[13px] font-semibold uppercase tracking-[0.18em] transition-colors duration-500 select-none'
  const variants = {
    primary: 'bg-coral text-abyss btn-magnetic',
    outline: 'border border-white/20 text-foam hover:border-foam btn-magnetic',
    ghost: 'text-foam',
  }

  const MotionTag = useMemo(() => motion.create(Tag), [Tag])

  return (
    <MotionTag
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.97 }}
      className={`${base} ${variants[variant]} ${className}`}
      {...rest}
    >
      <span className="relative z-10 inline-flex items-center gap-3">{children}</span>
    </MotionTag>
  )
}
