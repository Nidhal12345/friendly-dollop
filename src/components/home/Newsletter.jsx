import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { IMG } from '../../data/products'
import { Reveal, SplitText, EASE } from '../ui/Reveal'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email)) return
    setDone(true)
  }

  return (
    <section className="container-x py-12 md:py-20">
      <div className="relative overflow-hidden rounded-[2rem] ring-1 ring-white/10">
        <img src={IMG.boatSunset} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-r from-abyss via-abyss/85 to-abyss/40" />
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-coral/30 blur-[100px]" />

        <div className="relative grid grid-cols-1 gap-10 px-8 py-16 md:grid-cols-2 md:px-16 md:py-24">
          <div>
            <Reveal className="eyebrow mb-6">The tide report</Reveal>
            <h2 className="display-md text-foam">
              <SplitText text="Know what's landing" />
              <br />
              <SplitText text="before it lands." className="italic font-light text-coral-light" delay={0.15} />
            </h2>
            <Reveal delay={0.3} className="mt-6 max-w-md text-mist">
              A short weekly note on what our boats are catching, seasonal drops and first access to
              limited runs. No noise, unsubscribe anytime.
            </Reveal>
          </div>

          <div className="flex items-end">
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="flex w-full items-center gap-4 rounded-full border border-coral/40 bg-coral/10 px-6 py-5"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-coral text-abyss">
                    <Check size={18} />
                  </span>
                  <div>
                    <p className="font-serif text-xl text-foam">You're on the list.</p>
                    <p className="text-xs uppercase tracking-[0.2em] text-mist">First report lands Friday</p>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={submit}
                  exit={{ opacity: 0, y: -20 }}
                  className="w-full"
                >
                  <Reveal delay={0.2}>
                    <label htmlFor="nl-email" className="mb-3 block font-sans text-[10px] uppercase tracking-[0.3em] text-slate">
                      Email address
                    </label>
                    <div className="group relative flex items-center border-b border-white/20 transition-colors focus-within:border-coral">
                      <input
                        id="nl-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@kitchen.com"
                        className="w-full bg-transparent py-4 font-serif text-2xl text-foam placeholder:text-slate/60 focus:outline-none md:text-3xl"
                      />
                      <motion.button
                        type="submit"
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-foam text-abyss transition-colors hover:bg-coral"
                        aria-label="Subscribe"
                      >
                        <ArrowRight size={18} />
                      </motion.button>
                    </div>
                    <p className="mt-4 font-sans text-[11px] text-slate">
                      By subscribing you agree to our privacy policy.
                    </p>
                  </Reveal>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
