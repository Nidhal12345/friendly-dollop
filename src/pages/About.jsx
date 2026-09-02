import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Anchor, Leaf, ThermometerSnowflake, ScanLine } from 'lucide-react'
import { IMG } from '../data/products'
import { Reveal, SplitText, RevealImage, Line } from '../components/ui/Reveal'
import MagneticButton from '../components/ui/MagneticButton'
import Marquee from '../components/home/Marquee'
import Stats from '../components/home/Stats'

const VALUES = [
  { icon: Anchor, title: 'Small boats only', text: 'We buy from day-boats under 15 m. Shorter trips mean fresher fish and a fleet that can adapt to the sea, not fight it.' },
  { icon: Leaf, title: 'Fish the season', text: 'Nothing is available year-round. When a species is spawning or a fishery is stressed, it comes off the list. Full stop.' },
  { icon: ThermometerSnowflake, title: 'Cold, never frozen', text: 'Unless flash-frozen on the vessel within minutes, everything travels fresh at 0–2 °C in recyclable insulation.' },
  { icon: ScanLine, title: 'Radical traceability', text: 'Every box carries a tag. Scan it to see the boat, skipper, landing time and grading notes for exactly what you are eating.' },
]

const TEAM = [
  { name: 'Tomas Aalto', role: 'Founder & Head Buyer', image: IMG.lobsterBoats },
  { name: 'Ingrid Sæther', role: 'Master Grader', image: IMG.fishMarket },
  { name: 'Callum Reid', role: 'Fleet Relations', image: IMG.lobsterTraps },
]

export default function About() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative h-[85svh] min-h-[560px] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y, scale }}>
          <img src={IMG.fisherman} alt="Fisherman at dawn" className="h-full w-full object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-abyss/50 via-abyss/30 to-abyss" />
        <div className="container-x relative flex h-full flex-col justify-end pb-16">
          <Reveal className="eyebrow mb-6">Our story</Reveal>
          <h1 className="display-xl text-foam">
            <SplitText text="Born on a" stagger={0.06} />
            <br />
            <SplitText text="dock in Skye." className="italic font-light text-coral-light" delay={0.3} stagger={0.06} />
          </h1>
        </div>
      </section>

      <Marquee items={['Est. 2018', 'Isle of Skye', '140 partner boats', 'North Atlantic & Pacific', 'B-Corp certified']} duration={35} />

      {/* Story */}
      <section className="container-x py-24 md:py-36">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <RevealImage src={IMG.lobsterBoats} alt="Lobster boats" className="aspect-[4/5] rounded-3xl" />
          </div>
          <div className="flex flex-col justify-center md:col-span-6 md:col-start-7">
            <Reveal className="eyebrow mb-6">2018 — today</Reveal>
            <h2 className="display-md text-foam">
              <SplitText text="It started with one boat and a very cold van." />
            </h2>
            <Reveal delay={0.3} className="mt-8 space-y-5 text-lg leading-relaxed text-mist">
              <p>
                Tomas spent a decade buying fish for restaurants and grew tired of the gap between
                what the boats landed and what arrived at the kitchen door — days later, tired and
                anonymous.
              </p>
              <p>
                So he bought a refrigerated van, shook hands with a creel fisherman named Callum on
                the Isle of Skye, and started driving langoustines to London overnight. Chefs
                noticed. Then their customers asked where they could buy the same thing.
              </p>
              <p>
                Today TAFC works with 140 small boats, but the promise is unchanged: the fish you get
                is the fish they landed, and it has never been more than 36 hours from the sea.
              </p>
            </Reveal>
            <Reveal delay={0.4} className="mt-10">
              <p className="font-serif text-3xl italic text-foam">— Tomas Aalto, Founder</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-deep py-24 md:py-32">
        <div className="container-x">
          <Reveal className="eyebrow mb-6">What we stand for</Reveal>
          <Reveal delay={0.1}>
            <h2 className="display-md max-w-3xl text-foam">Four rules we have never broken.</h2>
          </Reveal>
          <Line className="mt-14" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group border-b border-white/8 p-8 transition-colors duration-500 hover:bg-white/[0.02] lg:border-b-0 lg:border-r lg:last:border-r-0"
              >
                <span className="mb-8 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 text-coral transition-all duration-500 group-hover:border-coral group-hover:bg-coral group-hover:text-abyss">
                  <v.icon size={22} strokeWidth={1.4} />
                </span>
                <span className="font-sans text-xs tracking-[0.3em] text-slate">0{i + 1}</span>
                <h3 className="mt-3 font-serif text-3xl text-foam">{v.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-mist">{v.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Stats />

      {/* Team */}
      <section className="container-x py-24 md:py-32">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal className="eyebrow mb-6">The people</Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-md text-foam">Salt in the blood.</h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <MagneticButton as={Link} to="/contact" variant="outline">
              Work with us <ArrowRight size={15} />
            </MagneticButton>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {TEAM.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <div className="group relative aspect-[3/4] overflow-hidden rounded-3xl ring-1 ring-white/10">
                <img
                  src={t.image}
                  alt={t.name}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale transition-all duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="font-serif text-3xl text-foam">{t.name}</p>
                  <p className="mt-1 font-sans text-[11px] uppercase tracking-[0.25em] text-coral">{t.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
