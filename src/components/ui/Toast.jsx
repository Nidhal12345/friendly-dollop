import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { EASE } from './Reveal'

export default function Toast() {
  const { toast, dismissToast, open } = useCart()

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(dismissToast, 2800)
    return () => clearTimeout(t)
  }, [toast, dismissToast])

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[940] flex justify-center px-4">
      <AnimatePresence>
        {toast && (
          <motion.button
            key={toast.id}
            onClick={() => {
              dismissToast()
              open()
            }}
            initial={{ y: 40, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="glass pointer-events-auto flex items-center gap-4 rounded-full py-3 pl-3 pr-6 shadow-2xl"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-coral text-abyss">
              <Check size={16} strokeWidth={2.5} />
            </span>
            <span className="font-sans text-sm text-foam">
              <span className="font-semibold">{toast.name}</span> added ·{' '}
              <span className="text-coral underline-offset-4 hover:underline">View cart</span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
