import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { PRODUCTS, CATEGORIES, IMG } from '../data/products'
import ProductCard from '../components/shop/ProductCard'
import { Reveal, SplitText, EASE } from '../components/ui/Reveal'

const SORTS = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'rating', label: 'Top Rated' },
]

export default function Shop({ onOpenProduct }) {
  const [params, setParams] = useSearchParams()
  const cat = params.get('cat') || 'all'
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('featured')
  const [sortOpen, setSortOpen] = useState(false)

  const setCat = (id) => {
    const next = new URLSearchParams(params)
    if (id === 'all') next.delete('cat')
    else next.set('cat', id)
    setParams(next, { replace: true })
  }

  useEffect(() => {
    const close = () => setSortOpen(false)
    if (sortOpen) window.addEventListener('click', close)
    return () => window.removeEventListener('click', close)
  }, [sortOpen])

  const list = useMemo(() => {
    let l = PRODUCTS.filter((p) => cat === 'all' || p.category === cat)
    if (query.trim()) {
      const q = query.toLowerCase()
      l = l.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.origin.toLowerCase().includes(q) ||
          p.latin.toLowerCase().includes(q)
      )
    }
    switch (sort) {
      case 'price-asc':
        l = [...l].sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        l = [...l].sort((a, b) => b.price - a.price)
        break
      case 'rating':
        l = [...l].sort((a, b) => b.rating - a.rating)
        break
      default:
        l = [...l].sort((a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0))
    }
    return l
  }, [cat, query, sort])

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden pt-36 pb-16 md:pt-44 md:pb-20">
        <div className="absolute inset-0">
          <img src={IMG.seafoodIce} alt="" className="h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-abyss/60 via-abyss/80 to-abyss" />
        </div>
        <div className="container-x relative">
          <Reveal className="eyebrow mb-6">The shop</Reveal>
          <h1 className="display-lg text-foam">
            <SplitText text="Today's catch." />
          </h1>
          <Reveal delay={0.3} className="mt-6 max-w-lg text-mist">
            Every product below was landed within the last 36 hours or flash-frozen on the vessel.
            Prices update daily with the market.
          </Reveal>
        </div>
      </section>

      {/* Toolbar */}
      <section className="container-x sticky top-[68px] z-[800] md:top-[76px]">
        <div className="glass flex flex-col gap-3 rounded-2xl px-3 py-3 md:flex-row md:items-center md:justify-between">
          {/* Categories */}
          <LayoutGroup id="cats">
            <div className="flex gap-1 overflow-x-auto no-scrollbar">
              {CATEGORIES.map((c) => {
                const active = cat === c.id
                return (
                  <button
                    key={c.id}
                    onClick={() => setCat(c.id)}
                    className={`relative shrink-0 rounded-full px-4 py-2 font-sans text-[12px] font-medium uppercase tracking-[0.15em] transition-colors ${
                      active ? 'text-abyss' : 'text-mist hover:text-foam'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="cat-pill"
                        className="absolute inset-0 rounded-full bg-foam"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{c.label}</span>
                  </button>
                )
              })}
            </div>
          </LayoutGroup>

          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="flex flex-1 items-center gap-2 rounded-full border border-white/10 px-4 py-2 transition-colors focus-within:border-coral md:w-60 md:flex-none">
              <Search size={14} className="shrink-0 text-slate" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search fish, origin…"
                className="w-full bg-transparent font-sans text-sm text-foam placeholder:text-slate focus:outline-none"
              />
              {query && (
                <button onClick={() => setQuery('')} className="text-slate hover:text-foam" aria-label="Clear">
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Sort */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setSortOpen((o) => !o)
                }}
                className="flex h-10 items-center gap-2 rounded-full border border-white/10 px-4 font-sans text-[12px] uppercase tracking-[0.15em] text-mist transition-colors hover:text-foam"
              >
                <SlidersHorizontal size={13} />
                <span className="hidden sm:inline">{SORTS.find((s) => s.id === sort)?.label}</span>
              </button>
              <AnimatePresence>
                {sortOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className="glass absolute right-0 top-12 z-10 min-w-[200px] overflow-hidden rounded-xl py-1"
                  >
                    {SORTS.map((s) => (
                      <li key={s.id}>
                        <button
                          onClick={() => setSort(s.id)}
                          className={`w-full px-4 py-2.5 text-left font-sans text-sm transition-colors hover:bg-white/5 ${
                            sort === s.id ? 'text-coral' : 'text-mist'
                          }`}
                        >
                          {s.label}
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="container-x pb-28 pt-10 md:pb-36">
        <p className="mb-6 font-sans text-xs uppercase tracking-[0.25em] text-slate">
          {list.length} {list.length === 1 ? 'product' : 'products'}
        </p>
        <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <ProductCard product={p} index={i} onOpen={onOpenProduct} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {list.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-24 text-center"
          >
            <p className="font-serif text-4xl text-foam">Nothing in the net.</p>
            <p className="mt-2 text-mist">Try a different search or category.</p>
          </motion.div>
        )}
      </section>
    </>
  )
}
