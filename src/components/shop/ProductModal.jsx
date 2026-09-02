import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Minus, Plus, Star, MapPin, Check, ShoppingBag } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../data/products'
import { EASE } from '../ui/Reveal'

export default function ProductModal({ product, onClose }) {
  const { add } = useCart()
  const [qty, setQty] = useState(1)
  const [img, setImg] = useState(0)

  useEffect(() => {
    setQty(1)
    setImg(0)
  }, [product])

  useEffect(() => {
    document.documentElement.classList.toggle('lenis-stopped', !!product)
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [product, onClose])

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          key="modal-root"
          className="fixed inset-0 z-[970] flex items-end justify-center md:items-center md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="absolute inset-0 bg-abyss/80 backdrop-blur-md" onClick={onClose} />

          <motion.div
            data-lenis-prevent
            className="relative grid max-h-[92svh] w-full max-w-5xl grid-cols-1 overflow-y-auto rounded-t-[2rem] bg-deep ring-1 ring-white/10 no-scrollbar md:max-h-[86vh] md:grid-cols-2 md:overflow-hidden md:rounded-[2rem]"
            initial={{ y: 80, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 60, scale: 0.97, opacity: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            role="dialog"
            aria-modal
            aria-label={product.name}
          >
            {/* Gallery */}
            <div className="relative aspect-[4/5] md:aspect-auto md:h-full">
              <AnimatePresence mode="wait">
                <motion.img
                  key={img}
                  src={product.gallery[img]}
                  alt={product.name}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-deep/70 via-transparent to-transparent md:bg-gradient-to-r" />

              {product.badge && (
                <span className="absolute left-6 top-6 rounded-full bg-abyss/70 px-3 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-coral backdrop-blur-md ring-1 ring-white/10">
                  {product.badge}
                </span>
              )}

              {product.gallery.length > 1 && (
                <div className="absolute bottom-6 left-6 flex gap-2">
                  {product.gallery.map((g, i) => (
                    <button
                      key={i}
                      onClick={() => setImg(i)}
                      className={`h-14 w-12 overflow-hidden rounded-lg ring-2 transition-all ${
                        i === img ? 'ring-coral' : 'ring-white/20 opacity-60 hover:opacity-100'
                      }`}
                      aria-label={`Image ${i + 1}`}
                    >
                      <img src={g} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="relative flex flex-col p-7 md:overflow-y-auto md:p-12 no-scrollbar">
              <button
                onClick={onClose}
                className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-foam transition-colors hover:border-coral hover:text-coral"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              <motion.div
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }}
              >
                {[
                  <p key="o" className="flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.25em] text-slate">
                    <MapPin size={11} /> {product.origin}
                  </p>,
                  <h2 key="h" className="mt-3 font-serif text-4xl leading-none text-foam md:text-5xl">{product.name}</h2>,
                  <p key="l" className="mt-1 font-serif text-lg italic text-slate">{product.latin}</p>,
                  <div key="r" className="mt-5 flex items-center gap-4">
                    <span className="flex items-center gap-1 font-sans text-sm text-foam">
                      <Star size={13} className="fill-gold text-gold" /> {product.rating}
                    </span>
                    <span className="font-sans text-xs text-slate">{product.reviews} reviews</span>
                    <span className={`ml-auto rounded-full px-2.5 py-1 font-sans text-[10px] uppercase tracking-[0.15em] ${
                      product.stock === 'Limited' ? 'bg-gold/15 text-gold' : 'bg-sea/15 text-sea'
                    }`}>
                      {product.stock}
                    </span>
                  </div>,
                  <p key="d" className="mt-6 text-base leading-relaxed text-mist">{product.description}</p>,
                  <ul key="n" className="mt-6 space-y-2">
                    {product.notes.map((n) => (
                      <li key={n} className="flex items-center gap-3 font-sans text-sm text-foam">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-coral/15 text-coral">
                          <Check size={11} />
                        </span>
                        {n}
                      </li>
                    ))}
                  </ul>,
                  <div key="p" className="mt-6 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                    <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-slate">Pairs with</p>
                    <p className="mt-1 font-serif text-xl italic text-foam">{product.pairing}</p>
                  </div>,
                ].map((el, i) => (
                  <motion.div
                    key={i}
                    variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
                  >
                    {el}
                  </motion.div>
                ))}
              </motion.div>

              {/* Buy bar */}
              <div className="mt-auto flex flex-col gap-4 pt-8 sm:flex-row sm:items-center">
                <div>
                  <p className="font-sans text-3xl font-semibold text-foam">{formatPrice(product.price)}</p>
                  <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-slate">{product.unit}</p>
                </div>
                <div className="flex items-center rounded-full border border-white/15 sm:ml-auto">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex h-12 w-12 items-center justify-center text-mist hover:text-foam" aria-label="Decrease">
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center font-sans tabular-nums text-foam">{qty}</span>
                  <button onClick={() => setQty((q) => q + 1)} className="flex h-12 w-12 items-center justify-center text-mist hover:text-foam" aria-label="Increase">
                    <Plus size={14} />
                  </button>
                </div>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    add(product, qty)
                    onClose()
                  }}
                  className="btn-magnetic flex items-center justify-center gap-3 rounded-full bg-coral px-7 py-4 font-sans text-[12px] font-semibold uppercase tracking-[0.18em] text-abyss"
                >
                  <span className="inline-flex items-center gap-3">
                    <ShoppingBag size={15} /> Add · {formatPrice(product.price * qty)}
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
