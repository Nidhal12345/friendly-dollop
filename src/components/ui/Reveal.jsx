import { motion } from 'framer-motion'

export const EASE = [0.16, 1, 0.3, 1]

/**
 * Generic fade-up reveal on scroll.
 */
export function Reveal({ children, delay = 0, y = 40, once = true, className = '', ...rest }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-10% 0px -10% 0px' }}
      transition={{ duration: 1, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/**
 * Splits text into words and reveals them with a clipped upward slide.
 */
export function SplitText({
  text,
  as: Tag = 'span',
  className = '',
  delay = 0,
  stagger = 0.045,
  duration = 1,
  once = true,
  y = '110%',
}) {
  const words = String(text).split(' ')
  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom" style={{ paddingBottom: '0.08em', marginBottom: '-0.08em' }}>
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y, rotate: 2, opacity: 0 }}
            whileInView={{ y: '0%', rotate: 0, opacity: 1 }}
            viewport={{ once, margin: '-5% 0px' }}
            transition={{ duration, delay: delay + i * stagger, ease: EASE }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </Tag>
  )
}

/**
 * Character-level split, used for the hero display type.
 */
export function SplitChars({ text, className = '', delay = 0, stagger = 0.03, duration = 1.1, initialY = '120%' }) {
  const chars = Array.from(text)
  return (
    <span className={`inline-block ${className}`} aria-label={text}>
      {chars.map((c, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom" style={{ paddingBottom: '0.1em', marginBottom: '-0.1em' }}>
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: initialY, opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration, delay: delay + i * stagger, ease: EASE }}
          >
            {c === ' ' ? '\u00A0' : c}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

/**
 * Image that reveals via a clip-path wipe with a subtle scale.
 */
export function RevealImage({ src, alt, className = '', imgClassName = '', delay = 0, once = true }) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
      viewport={{ once, margin: '-10% 0px' }}
      transition={{ duration: 1.3, delay, ease: EASE }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        className={`h-full w-full object-cover ${imgClassName}`}
        initial={{ scale: 1.25 }}
        whileInView={{ scale: 1 }}
        viewport={{ once, margin: '-10% 0px' }}
        transition={{ duration: 1.6, delay, ease: EASE }}
      />
    </motion.div>
  )
}

/**
 * Animated horizontal rule.
 */
export function Line({ className = '', delay = 0 }) {
  return (
    <motion.div
      className={`h-px w-full origin-left bg-white/10 ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, delay, ease: EASE }}
    />
  )
}
