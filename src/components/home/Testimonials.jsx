import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react'
import { TESTIMONIALS } from '../../data/products'
import { Reveal, EASE } from '../ui/Reveal'

export default function Testimonials() {
  const [i, setI] = useState(0)
  const [dir, setDir] = useState(1)
  const [paused, setPaused] = useState(false)

  const go = (d) => {
    setDir(d)
    setI((n) => (n + d + TESTIMONIALS.length) % TESTIMONIALS.length)
  }

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => go(1), 6000)
    return () => clearInterval(t)
  }, [paused])

  const t = TESTIMONIALS[i]

  return (
    <section
      className="container-x py-24 md:py-36"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <Reveal className="eyebrow mb-6">Kind words</Reveal>
          <Reveal delay={0.1}>
            <h2 className="display-md text-foam">Trusted by kitchens that can't afford a bad fish.</h2>
          </Reveal>
          <Reveal delay={0.2} className="mt-10 flex items-center gap-3">
            <button
              onClick={() => go(-1)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-foam transition-colors hover:border-coral hover:text-coral"
              aria-label="Previous testimonial"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={() => go(1)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-foam transition-colors hover:border-coral hover:text-coral"
              aria-label="Next testimonial"
            >
              <ArrowRight size={16} />
            </button>
            <span className="ml-4 font-sans text-xs tabular-nums tracking-[0.25em] text-slate">
              0{i + 1} / 0{TESTIMONIALS.length}
            </span>
          </Reveal>
        </div>

        <div className="relative md:col-span-8 md:pl-12">
          <Quote className="absolute -top-6 left-0 h-16 w-16 text-coral/20 md:left-12" strokeWidth={1} />
          <div className="relative min-h-[260px]">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.blockquote
                key={i}
                custom={dir}
                initial={{ opacity: 0, x: dir * 60, filter: 'blur(6px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: dir * -60, filter: 'blur(6px)' }}
                transition={{ duration: 0.7, ease: EASE }}
                className="relative"
              >
                <p className="font-serif text-3xl leading-[1.2] text-foam md:text-5xl">“{t.quote}”</p>
                <footer className="mt-8 flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-tide font-serif text-xl text-foam">
                    {t.name[0]}
                  </span>
                  <div>
                    <p className="font-sans text-sm font-semibold text-foam">{t.name}</p>
                    <p className="font-sans text-xs uppercase tracking-[0.2em] text-slate">{t.role}</p>
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Progress */}
          <div className="mt-10 flex gap-2">
            {TESTIMONIALS.map((_, k) => (
              <button
                key={k}
                onClick={() => {
                  setDir(k > i ? 1 : -1)
                  setI(k)
                }}
                className="relative h-px flex-1 overflow-hidden bg-white/10"
                aria-label={`Go to testimonial ${k + 1}`}
              >
                {k === i && (
                  <motion.span
                    key={`${k}-${paused}`}
                    className="absolute inset-y-0 left-0 bg-coral"
                    initial={{ width: 0 }}
                    animate={{ width: paused ? '100%' : '100%' }}
                    transition={{ duration: paused ? 0.3 : 6, ease: 'linear' }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
