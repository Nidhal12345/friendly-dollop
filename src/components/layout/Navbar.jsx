import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { ShoppingBag, ArrowUpRight } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { EASE } from '../ui/Reveal'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'Our Story' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const { count, open } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const location = useLocation()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 40)
    setHidden(y > prev && y > 320 && !menuOpen)
  })

  useEffect(() => setMenuOpen(false), [location.pathname])
  useEffect(() => {
    document.documentElement.classList.toggle('lenis-stopped', menuOpen)
  }, [menuOpen])

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[900]"
        animate={{ y: hidden ? '-100%' : '0%' }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <motion.div
          className={`transition-all duration-700 ${
            scrolled && !menuOpen ? 'glass py-3 md:py-4' : 'py-5 md:py-7'
          }`}
          style={{ borderBottom: scrolled && !menuOpen ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent' }}
        >
          <div className="container-x flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="group relative flex items-baseline gap-2" aria-label="TAFC home">
              <span className="font-serif text-3xl font-semibold tracking-tight text-foam md:text-[2rem]">
                TAFC
              </span>
              <span className="hidden font-sans text-[10px] uppercase tracking-[0.3em] text-slate transition-colors group-hover:text-coral sm:inline">
                Seafood
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-10 md:flex">
              {LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    `link-underline font-sans text-[12px] font-medium uppercase tracking-[0.2em] transition-colors ${
                      isActive ? 'text-foam' : 'text-mist hover:text-foam'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3 md:gap-5">
              <button
                onClick={open}
                className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-foam transition-colors hover:border-coral hover:text-coral"
                aria-label="Open cart"
              >
                <ShoppingBag size={17} strokeWidth={1.6} />
                <AnimatePresence>
                  {count > 0 && (
                    <motion.span
                      key={count}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                      className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-coral px-1 font-sans text-[10px] font-bold text-abyss"
                    >
                      {count}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <button
                onClick={() => setMenuOpen((o) => !o)}
                className="group flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full border border-white/10 md:hidden"
                aria-label="Toggle menu"
              >
                <motion.span
                  animate={menuOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
                  className="block h-px w-4 bg-foam"
                />
                <motion.span
                  animate={menuOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
                  className="block h-px w-4 bg-foam"
                />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="menu"
            className="fixed inset-0 z-[850] flex flex-col bg-deep px-6 pt-28 pb-10"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className="flex flex-col gap-2">
              {LINKS.map((l, i) => (
                <div key={l.to} className="overflow-hidden">
                  <motion.div
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '110%' }}
                    transition={{ duration: 0.8, delay: 0.1 + i * 0.07, ease: EASE }}
                  >
                    <NavLink
                      to={l.to}
                      className="flex items-center justify-between border-b border-white/10 py-4 font-serif text-5xl text-foam"
                    >
                      {l.label}
                      <ArrowUpRight className="text-coral" />
                    </NavLink>
                  </motion.div>
                </div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-auto flex items-end justify-between text-xs uppercase tracking-[0.25em] text-slate"
            >
              <span>hello@tafc.sea</span>
              <span>© {new Date().getFullYear()}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
