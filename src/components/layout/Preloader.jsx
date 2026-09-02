import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { EASE } from '../ui/Reveal'

const WORDS = ['Caught at dawn', 'Graded by hand', 'Delivered cold']

export default function Preloader({ onDone }) {
  const [index, setIndex] = useState(0)
  const [done, setDone] = useState(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const t1 = setInterval(() => setIndex((i) => (i + 1 < WORDS.length ? i + 1 : i)), 620)
    const start = performance.now()
    const dur = 1900
    let raf
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur)
      setCount(Math.round(p * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    const t2 = setTimeout(() => setDone(true), 2100)
    const t3 = setTimeout(() => onDone?.(), 2900)
    return () => {
      clearInterval(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      cancelAnimationFrame(raf)
    }
  }, [onDone])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-abyss"
          exit={{ y: '-100%' }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Curtain accent */}
          <motion.div
            className="absolute inset-x-0 bottom-0 h-[30vh] bg-coral"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 0 }}
            exit={{ scaleY: [0, 1, 0], originY: [1, 1, 0] }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          />

          <div className="relative flex flex-col items-center">
            <motion.div
              className="font-serif text-[clamp(4rem,12vw,10rem)] leading-none tracking-tight text-foam"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE }}
            >
              TAFC
            </motion.div>

            <div className="mt-6 h-6 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={index}
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -24, opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="font-sans text-xs uppercase tracking-[0.3em] text-mist"
                >
                  {WORDS[index]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <div className="absolute bottom-10 left-0 right-0 flex items-end justify-between px-8 md:px-16">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-slate">
              Premium Seafood
            </span>
            <span className="font-serif text-5xl tabular-nums text-foam/80">{count}</span>
          </div>

          <motion.div
            className="absolute bottom-0 left-0 h-px bg-coral"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.9, ease: 'linear' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
