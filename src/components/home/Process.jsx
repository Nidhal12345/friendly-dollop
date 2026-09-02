import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { PROCESS } from '../../data/products'
import { Reveal, EASE } from '../ui/Reveal'

/**
 * Sticky scroll storytelling: the image on the left stays pinned while
 * the steps on the right scroll past and swap the image.
 */
export default function Process() {
  const ref = useRef(null)
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.5', 'end 0.5'] })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(PROCESS.length - 1, Math.floor(v * PROCESS.length))
    if (idx !== active) setActive(idx)
  })

  return (
    <section className="relative bg-deep">
      <div className="container-x pt-24 md:pt-32">
        <Reveal className="eyebrow mb-6">How it works</Reveal>
        <Reveal delay={0.1}>
          <h2 className="display-md max-w-3xl text-balance text-foam">
            Four steps between the ocean and your plate.
          </h2>
        </Reveal>
      </div>

      <div ref={ref} className="container-x grid grid-cols-1 gap-12 pb-24 pt-16 md:grid-cols-2 md:gap-16 md:pb-32">
        {/* Sticky visual */}
        <div className="relative md:sticky md:top-[12vh] md:h-[76vh]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl ring-1 ring-white/10 md:aspect-auto md:h-full">
            <AnimatePresence mode="popLayout">
              <motion.img
                key={active}
                src={PROCESS[active].image}
                alt={PROCESS[active].title}
                initial={{ opacity: 0, scale: 1.12, clipPath: 'inset(100% 0 0 0)' }}
                animate={{ opacity: 1, scale: 1, clipPath: 'inset(0% 0 0 0)' }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 1.1, ease: EASE }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-abyss/80 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between md:bottom-8 md:left-8 md:right-8">
              <AnimatePresence mode="wait">
                <motion.span
                  key={active}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="font-serif text-[clamp(4rem,10vw,7rem)] leading-none text-foam"
                >
                  {PROCESS[active].step}
                </motion.span>
              </AnimatePresence>
              <div className="flex gap-1.5">
                {PROCESS.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      i === active ? 'w-8 bg-coral' : 'w-3 bg-white/25'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="flex flex-col">
          {PROCESS.map((p, i) => (
            <div
              key={p.step}
              className="flex min-h-[60vh] flex-col justify-center border-b border-white/8 py-12 last:border-b-0 md:min-h-[76vh]"
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: '-20% 0px -20% 0px' }}
                transition={{ duration: 0.9, ease: EASE }}
                animate={{ opacity: active === i ? 1 : 0.35 }}
              >
                <span className="font-sans text-xs uppercase tracking-[0.3em] text-coral">Step {p.step}</span>
                <h3 className="mt-4 font-serif text-4xl text-foam md:text-6xl">{p.title}</h3>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-mist">{p.text}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
