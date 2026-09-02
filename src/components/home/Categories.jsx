import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { IMG } from '../../data/products'
import { Reveal } from '../ui/Reveal'

const CATS = [
  { id: 'fish', title: 'Fish', sub: 'Salmon · Halibut · Cod · Branzino', image: IMG.codHalibut, count: 4 },
  { id: 'shellfish', title: 'Shellfish', sub: 'Oysters · Scallops · Mussels', image: IMG.oystersPlatter, count: 3 },
  { id: 'crustacean', title: 'Crustaceans', sub: 'King crab · Prawns · Lobster', image: IMG.kingCrabMarket, count: 3 },
  { id: 'delicacy', title: 'Delicacies', sub: 'Langoustine · Platters · Rare', image: IMG.langoustine, count: 2 },
]

export default function Categories() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], ['4%', '-14%'])

  return (
    <section ref={ref} className="relative overflow-hidden py-24 md:py-32">
      <div className="container-x mb-12 flex items-end justify-between">
        <div>
          <Reveal className="eyebrow mb-6">Browse by category</Reveal>
          <Reveal delay={0.1}>
            <h2 className="display-md text-foam">From the reef to the deep.</h2>
          </Reveal>
        </div>
        <Reveal delay={0.2} className="hidden md:block">
          <span className="font-sans text-xs uppercase tracking-[0.25em] text-slate">04 collections</span>
        </Reveal>
      </div>

      <motion.div style={{ x }} className="flex gap-5 px-[clamp(1.25rem,4vw,4rem)] will-change-transform">
        {CATS.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-[78vw] shrink-0 sm:w-[46vw] lg:w-[30vw] xl:w-[26vw]"
          >
            <Link
              to={`/shop?cat=${c.id}`}
              data-cursor="view"
              data-cursor-label="Explore"
              className="group relative block aspect-[3/4] overflow-hidden rounded-3xl ring-1 ring-white/10"
            >
              <img
                src={c.image}
                alt={c.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/30 to-transparent" />
              <div className="absolute inset-0 bg-coral/0 transition-colors duration-700 group-hover:bg-coral/15" />

              <div className="absolute inset-x-0 top-0 flex items-center justify-between p-6">
                <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-mist">0{i + 1}</span>
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-foam backdrop-blur-md transition-all duration-500 group-hover:rotate-45 group-hover:border-coral group-hover:bg-coral group-hover:text-abyss">
                  <ArrowUpRight size={16} />
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <p className="mb-2 font-sans text-[10px] uppercase tracking-[0.25em] text-coral">{c.count} products</p>
                <h3 className="font-serif text-4xl text-foam md:text-5xl">{c.title}</h3>
                <p className="mt-2 max-w-[24ch] translate-y-3 font-sans text-sm text-mist opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
                  {c.sub}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
