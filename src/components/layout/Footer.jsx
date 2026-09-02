import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

const SOCIALS = [
  {
    label: 'Instagram',
    path: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </>
    ),
  },
  {
    label: 'X',
    path: <path d="M4 4l16 16M20 4L4 20" />,
  },
  {
    label: 'Facebook',
    path: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  },
]
import { lenisInstance } from '../ui/SmoothScroll'
import { Line, EASE } from '../ui/Reveal'

const COLS = [
  {
    title: 'Shop',
    links: [
      ['All products', '/shop'],
      ['Fish', '/shop?cat=fish'],
      ['Shellfish', '/shop?cat=shellfish'],
      ['Crustaceans', '/shop?cat=crustacean'],
      ['Delicacies', '/shop?cat=delicacy'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['Our story', '/about'],
      ['Sustainability', '/about'],
      ['Our boats', '/about'],
      ['Journal', '/about'],
      ['Contact', '/contact'],
    ],
  },
  {
    title: 'Help',
    links: [
      ['Delivery & packaging', '/contact'],
      ['Storage guide', '/contact'],
      ['Returns', '/contact'],
      ['FAQ', '/contact'],
    ],
  },
]

export default function Footer() {
  const toTop = () => {
    if (lenisInstance) lenisInstance.scrollTo(0)
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative mt-12 overflow-hidden bg-deep">
      <div className="container-x pt-20 md:pt-28">
        {/* Big CTA */}
        <div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-6">Ready when you are</p>
            <h2 className="display-lg text-foam">
              Dinner is
              <br />
              <span className="italic font-light text-mist">already at sea.</span>
            </h2>
          </div>
          <Link
            to="/shop"
            className="btn-magnetic inline-flex items-center gap-4 rounded-full bg-coral px-8 py-5 font-sans text-[13px] font-semibold uppercase tracking-[0.18em] text-abyss"
          >
            <span>Shop the catch</span>
          </Link>
        </div>

        <Line />

        {/* Columns */}
        <div className="grid grid-cols-2 gap-10 py-16 md:grid-cols-12">
          <div className="col-span-2 md:col-span-5">
            <Link to="/" className="font-serif text-5xl text-foam">TAFC</Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-mist">
              The Atlantic Fish Company. Premium wild-caught seafood, hand-graded and delivered within
              36 hours of the tide. Working directly with 140 small boats across the North Atlantic
              and Pacific.
            </p>
            <div className="mt-8 flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-mist transition-all hover:border-coral hover:text-coral"
                  aria-label={s.label}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {s.path}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {COLS.map((c) => (
            <div key={c.title} className="md:col-span-2">
              <p className="mb-5 font-sans text-[10px] uppercase tracking-[0.3em] text-slate">{c.title}</p>
              <ul className="space-y-3">
                {c.links.map(([label, to]) => (
                  <li key={label}>
                    <Link to={to} className="link-underline font-sans text-sm text-mist transition-colors hover:text-foam">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 md:col-span-1 md:justify-self-end">
            <button
              onClick={toTop}
              className="group flex h-14 w-14 items-center justify-center rounded-full border border-white/10 text-foam transition-colors hover:border-coral hover:bg-coral hover:text-abyss"
              aria-label="Back to top"
            >
              <ArrowUp size={18} className="transition-transform group-hover:-translate-y-1" />
            </button>
          </div>
        </div>

        <Line />

        <div className="flex flex-col items-start justify-between gap-4 py-8 font-sans text-[11px] uppercase tracking-[0.2em] text-slate md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} TAFC — The Atlantic Fish Company</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foam">Privacy</a>
            <a href="#" className="hover:text-foam">Terms</a>
            <a href="#" className="hover:text-foam">Cookies</a>
          </div>
        </div>
      </div>

      {/* Giant watermark */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: EASE }}
        className="pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <p className="-mb-[0.22em] text-center font-serif text-[clamp(7rem,26vw,26rem)] font-semibold leading-none tracking-tight text-white/[0.035]">
          TAFC
        </p>
      </motion.div>
    </footer>
  )
}
