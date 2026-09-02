import { useEffect, useRef, useState } from 'react'
import { useInView, motion } from 'framer-motion'
import { STATS, IMG } from '../../data/products'
import { Reveal, EASE } from '../ui/Reveal'

function Counter({ value, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const dur = 1800
    let raf
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur)
      const eased = 1 - Math.pow(1 - p, 4)
      setN(Math.round(eased * value))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])

  return (
    <span ref={ref} className="tabular-nums">
      {n}
      <span className="text-coral">{suffix}</span>
    </span>
  )
}

export default function Stats() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* Background image with parallax-ish fixed feel */}
      <div className="absolute inset-0">
        <img src={IMG.boatMist} alt="" className="h-full w-full object-cover opacity-30" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-abyss via-abyss/70 to-abyss" />
      </div>

      <div className="container-x relative">
        <Reveal className="eyebrow mb-10 justify-center">By the numbers</Reveal>
        <div className="grid grid-cols-2 gap-y-14 md:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: EASE }}
              className="relative text-center md:border-l md:border-white/10 md:first:border-l-0"
            >
              <p className="font-serif text-[clamp(3.5rem,7vw,6.5rem)] leading-none text-foam">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-3 font-sans text-xs uppercase tracking-[0.25em] text-mist">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
