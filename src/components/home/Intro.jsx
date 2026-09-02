import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { IMG } from '../../data/products'
import { Reveal, SplitText, RevealImage } from '../ui/Reveal'

export default function Intro() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80])
  const y2 = useTransform(scrollYProgress, [0, 1], [-40, 60])

  return (
    <section ref={ref} className="container-x relative py-28 md:py-40">
      <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-7">
          <Reveal className="eyebrow mb-8">The TAFC standard</Reveal>
          <h2 className="display-lg text-balance text-foam">
            <SplitText text="We don't sell seafood." stagger={0.05} />
            <br />
            <SplitText
              text="We deliver the moment the net breaks the surface."
              className="italic font-light text-mist"
              delay={0.25}
              stagger={0.04}
            />
          </h2>
          <Reveal delay={0.4} className="mt-10 max-w-xl text-lg leading-relaxed text-mist">
            Most fish is a week old before it reaches a supermarket. Ours is never more than 36 hours
            from the tide. We work directly with 140 small boats, pay them fairly for fishing fewer
            hours, and put every catch through the toughest grading in the industry.
          </Reveal>

          <Reveal delay={0.5} className="mt-12 grid grid-cols-2 gap-8 border-t border-white/10 pt-10 sm:grid-cols-3">
            {[
              ['Bled & iced', 'within 8 minutes of landing'],
              ['0–2 °C', 'held from dock to door'],
              ['Scan the tag', 'meet your boat & skipper'],
            ].map(([a, b]) => (
              <div key={a}>
                <p className="font-serif text-2xl text-foam">{a}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate">{b}</p>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="relative md:col-span-5">
          <motion.div style={{ y: y1 }} className="relative z-10 ml-auto w-[78%]">
            <RevealImage
              src={IMG.fishIce}
              alt="Fresh fish on ice"
              className="aspect-[3/4] rounded-2xl"
            />
          </motion.div>
          <motion.div style={{ y: y2 }} className="absolute -left-4 bottom-0 z-20 w-[52%] md:-left-10">
            <RevealImage
              src={IMG.salmonTexture}
              alt="Salmon texture"
              className="aspect-square rounded-2xl ring-8 ring-abyss"
              delay={0.2}
            />
          </motion.div>
          <div className="absolute -right-10 -top-10 -z-0 h-64 w-64 rounded-full bg-coral/20 blur-[90px]" />
        </div>
      </div>
    </section>
  )
}
