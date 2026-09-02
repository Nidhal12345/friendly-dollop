import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../data/products'
import { EASE } from '../ui/Reveal'

export default function CartDrawer() {
  const { items, isOpen, close, setQty, remove, subtotal, count } = useCart()

  useEffect(() => {
    document.documentElement.classList.toggle('lenis-stopped', isOpen)
    const onKey = (e) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, close])

  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 18
  const freeLeft = Math.max(0, 150 - subtotal)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[950] bg-abyss/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={close}
          />
          <motion.aside
            key="drawer"
            data-lenis-prevent
            className="fixed inset-y-0 right-0 z-[960] flex w-full max-w-[480px] flex-col bg-deep shadow-2xl ring-1 ring-white/10"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            role="dialog"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-7 py-6">
              <div>
                <h2 className="font-serif text-3xl text-foam">Your catch</h2>
                <p className="mt-0.5 font-sans text-[11px] uppercase tracking-[0.25em] text-slate">
                  {count} {count === 1 ? 'item' : 'items'}
                </p>
              </div>
              <button
                onClick={close}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-foam transition-colors hover:border-coral hover:text-coral"
                aria-label="Close cart"
              >
                <X size={18} />
              </button>
            </div>

            {/* Free shipping progress */}
            {items.length > 0 && (
              <div className="border-b border-white/10 px-7 py-4">
                <p className="mb-2 font-sans text-xs text-mist">
                  {freeLeft > 0 ? (
                    <>Add <span className="text-foam">{formatPrice(freeLeft)}</span> for free overnight shipping</>
                  ) : (
                    <span className="text-coral">You've unlocked free overnight shipping</span>
                  )}
                </p>
                <div className="h-1 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full bg-coral"
                    animate={{ width: `${Math.min(100, (subtotal / 150) * 100)}%` }}
                    transition={{ duration: 0.8, ease: EASE }}
                  />
                </div>
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-7 py-4 no-scrollbar">
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex h-full flex-col items-center justify-center text-center"
                >
                  <span className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-white/10 text-slate">
                    <ShoppingBag size={28} strokeWidth={1.2} />
                  </span>
                  <p className="font-serif text-3xl text-foam">The net is empty.</p>
                  <p className="mt-2 max-w-[26ch] text-sm text-mist">Fresh catch is waiting. Add something from the shop.</p>
                  <Link
                    to="/shop"
                    onClick={close}
                    className="mt-8 rounded-full bg-foam px-6 py-3 font-sans text-[12px] font-semibold uppercase tracking-[0.18em] text-abyss transition-colors hover:bg-coral"
                  >
                    Browse the shop
                  </Link>
                </motion.div>
              ) : (
                <ul className="divide-y divide-white/8">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.li
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 40, height: 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="flex gap-4 py-5"
                      >
                        <div className="h-24 w-20 shrink-0 overflow-hidden rounded-xl ring-1 ring-white/10">
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="font-serif text-xl leading-tight text-foam">{item.name}</p>
                              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-slate">{item.origin}</p>
                            </div>
                            <p className="font-sans text-sm font-semibold text-foam">{formatPrice(item.price * item.qty)}</p>
                          </div>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center rounded-full border border-white/10">
                              <button
                                onClick={() => setQty(item.id, item.qty - 1)}
                                className="flex h-9 w-9 items-center justify-center text-mist hover:text-foam"
                                aria-label="Decrease"
                              >
                                <Minus size={13} />
                              </button>
                              <span className="w-8 text-center font-sans text-sm tabular-nums text-foam">{item.qty}</span>
                              <button
                                onClick={() => setQty(item.id, item.qty + 1)}
                                className="flex h-9 w-9 items-center justify-center text-mist hover:text-foam"
                                aria-label="Increase"
                              >
                                <Plus size={13} />
                              </button>
                            </div>
                            <button
                              onClick={() => remove(item.id)}
                              className="flex h-9 w-9 items-center justify-center rounded-full text-slate transition-colors hover:text-coral"
                              aria-label="Remove"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-white/10 px-7 py-6">
                <div className="space-y-2 font-sans text-sm">
                  <div className="flex justify-between text-mist">
                    <span>Subtotal</span>
                    <span className="text-foam">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-mist">
                    <span>Overnight shipping</span>
                    <span className="text-foam">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-3 text-base">
                    <span className="text-foam">Total</span>
                    <span className="font-semibold text-foam">{formatPrice(subtotal + shipping)}</span>
                  </div>
                </div>
                <button className="btn-magnetic mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-coral py-5 font-sans text-[13px] font-semibold uppercase tracking-[0.18em] text-abyss">
                  <span className="inline-flex items-center gap-3">Checkout <ArrowRight size={16} /></span>
                </button>
                <p className="mt-3 text-center font-sans text-[10px] uppercase tracking-[0.2em] text-slate">
                  Ships tomorrow · Packed at 0–2 °C
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
