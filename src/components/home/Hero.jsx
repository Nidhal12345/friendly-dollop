import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { IMG } from '../../data/products'
import { SplitChars, EASE } from '../ui/Reveal'
import MagneticButton from '../ui/MagneticButton'

export default function Hero({ ready }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -160])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const cardY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -260]), { stiffness: 80, damping: 20 })
  const card2Y = useSpring(useTransform(scrollYProgress, [0, 1], [0, -120]), { stiffness: 80, damping: 20 })
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.35, 0.85])

  const delay = ready ? 0.1 : 3

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      {/* Background */}
      <motion.div className="absolute inset-0" style={{ y: bgY, scale: bgScale }}>
        <motion.img
          src={IMG.boatDawn}
          alt="Fishing boat at dawn"
          className="h-full w-full object-cover"
          initial={{ scale: 1.3, filter: 'blur(14px) brightness(0.4)' }}
          animate={ready ? { scale: 1, filter: 'blur(0px) brightness(0.7)' } : {}}
          transition={{ duration: 2.2, ease: EASE, delay: delay }}
        />
      </motion.div>
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-abyss/60 via-abyss/20 to-abyss"
        style={{ opacity: overlayOpacity }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,11,20,0.65)_100%)]" />

      {/* Content */}
      <div className="container-x relative flex h-full flex-col justify-end pb-24 pt-32 md:pb-28">
        <motion.div style={{ y: titleY, opacity: titleOpacity }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={ready ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: delay + 0.2, ease: EASE }}
            className="eyebrow mb-6"
          >
            Est. 2018 — Ocean to Table
          </motion.div>

          <h1 className="display-xl text-foam">
            {ready && (
              <>
                <span className="block">
                  <SplitChars text="Harvested" delay={delay + 0.3} />
                </span>
                <span className="block italic font-light text-coral-light">
                  <SplitChars text="at dawn." delay={delay + 0.7} />
                </span>
              </>
            )}
          </h1>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: delay + 1.1, ease: EASE }}
              className="max-w-md text-balance text-base leading-relaxed text-mist md:col-span-5 md:text-lg"
            >
              Wild-caught fish, hand-graded shellfish and rare ocean delicacies — bled, iced and at
              your door within 36 hours of the tide.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: delay + 1.25, ease: EASE }}
              className="flex flex-wrap items-center gap-4 md:col-span-7 md:justify-end"
            >
              <MagneticButton as={Link} to="/shop" variant="primary">
                Shop the catch <ArrowRight size={16} />
              </MagneticButton>
              <MagneticButton as={Link} to="/about" variant="outline">
                Our story
              </MagneticButton>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Floating cards */}
      <motion.div
        style={{ y: cardY }}
        initial={{ opacity: 0, y: 80, rotate: -6 }}
        animate={ready ? { opacity: 1, rotate: -4 } : {}}
        transition={{ duration: 1.4, delay: delay + 1.3, ease: EASE }}
        className="absolute right-[6%] top-[18%] hidden w-[220px] lg:block xl:w-[260px]"
      >
        <div className="animate-float overflow-hidden rounded-2xl shadow-2xl shadow-black/50 ring-1 ring-white/10">
          <img src={IMG.oystersIce} alt="Oysters on ice" className="aspect-[4/5] w-full object-cover" />
          <div className="glass absolute inset-x-0 bottom-0 flex items-center justify-between px-4 py-3">
            <div>
              <p className="font-serif text-lg text-foam">Kumamoto</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-mist">Humboldt Bay</p>
            </div>
            <span className="font-sans text-sm font-semibold text-coral">$42</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        style={{ y: card2Y }}
        initial={{ opacity: 0, y: 80, rotate: 8 }}
        animate={ready ? { opacity: 1, rotate: 5 } : {}}
        transition={{ duration: 1.4, delay: delay + 1.5, ease: EASE }}
        className="absolute right-[22%] top-[40%] hidden w-[170px] lg:block xl:w-[200px]"
      >
        <div className="animate-float overflow-hidden rounded-2xl shadow-2xl shadow-black/50 ring-1 ring-white/10" style={{ animationDelay: '-3s' }}>
          <img src={IMG.salmon} alt="King salmon" className="aspect-[4/5] w-full object-cover" />
          <div className="glass absolute inset-x-0 bottom-0 flex items-center justify-between px-3 py-2.5">
            <p className="font-serif text-base text-foam">King Salmon</p>
            <span className="font-sans text-xs font-semibold text-coral">$48</span>
          </div>
        </div>
      </motion.div>

      {/* Side meta */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: delay + 1.6 }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-3 md:flex"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-foam"
        >
          <ArrowDown size={13} />
        </motion.div>
        <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-slate">Scroll to explore</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: delay + 1.8 }}
        className="absolute left-[clamp(1.25rem,4vw,4rem)] top-1/2 hidden -translate-y-1/2 -rotate-90 lg:block"
      >
        <span className="whitespace-nowrap font-sans text-[10px] uppercase tracking-[0.35em] text-slate">
          56.4°N 3.2°W — North Atlantic
        </span>
      </motion.div>
    </section>
  )
}
