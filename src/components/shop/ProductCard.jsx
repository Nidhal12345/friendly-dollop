import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Plus, Star } from 'lucide-react'
import { formatPrice } from '../../data/products'
import { useCart } from '../../context/CartContext'
import { EASE } from '../ui/Reveal'

export default function ProductCard({ product, onOpen, index = 0 }) {
  const { add } = useCart()
  const ref = useRef(null)

  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rx = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 200, damping: 20 })
  const ry = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 200, damping: 20 })
  const glareX = useTransform(mx, [0, 1], ['0%', '100%'])
  const glareY = useTransform(my, [0, 1], ['0%', '100%'])

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }
  const onLeave = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.9, delay: (index % 4) * 0.08, ease: EASE }}
      className="group relative"
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className="relative overflow-hidden rounded-2xl bg-deep ring-1 ring-white/8 transition-shadow duration-500 group-hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
      >
        {/* Image */}
        <button
          onClick={() => onOpen?.(product)}
          data-cursor="view"
          className="relative block aspect-[4/5] w-full overflow-hidden"
          aria-label={`View ${product.name}`}
        >
          <motion.img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/10 to-transparent opacity-80" />
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle at var(--gx) var(--gy), rgba(255,255,255,0.14), transparent 45%)`,
              '--gx': glareX,
              '--gy': glareY,
            }}
          />

          {product.badge && (
            <span className="absolute left-4 top-4 rounded-full bg-abyss/70 px-3 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-coral backdrop-blur-md ring-1 ring-white/10">
              {product.badge}
            </span>
          )}
          <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-abyss/70 px-2.5 py-1.5 font-sans text-[11px] font-semibold text-foam backdrop-blur-md ring-1 ring-white/10">
            <Star size={11} className="fill-gold text-gold" /> {product.rating}
          </span>
        </button>

        {/* Info */}
        <div className="relative px-5 pb-5 pt-1" style={{ transform: 'translateZ(30px)' }}>
          <p className="mb-1 font-sans text-[10px] uppercase tracking-[0.25em] text-slate">{product.origin}</p>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-serif text-2xl leading-tight text-foam">{product.name}</h3>
              <p className="mt-0.5 font-serif text-sm italic text-slate">{product.latin}</p>
            </div>
            <div className="text-right">
              <p className="font-sans text-lg font-semibold text-foam">{formatPrice(product.price)}</p>
              <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-slate">{product.unit}</p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
              {product.notes.slice(0, 2).map((n) => (
                <span key={n} className="rounded-full border border-white/10 px-2.5 py-1 font-sans text-[10px] tracking-wide text-mist">
                  {n}
                </span>
              ))}
            </div>
            <motion.button
              onClick={() => add(product)}
              whileTap={{ scale: 0.9 }}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-foam text-abyss transition-colors duration-300 hover:bg-coral"
              aria-label={`Add ${product.name} to cart`}
            >
              <Plus size={16} strokeWidth={2.2} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.article>
  )
}
