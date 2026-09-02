import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check, Mail, MapPin, Phone, Clock } from 'lucide-react'
import { IMG } from '../data/products'
import { Reveal, SplitText, RevealImage, EASE } from '../components/ui/Reveal'

const FIELDS = [
  { id: 'name', label: 'Your name', type: 'text', placeholder: 'Jane Fisher' },
  { id: 'email', label: 'Email', type: 'email', placeholder: 'jane@kitchen.com' },
  { id: 'subject', label: 'Subject', type: 'text', placeholder: 'Wholesale enquiry, order question…' },
]

const FAQ = [
  ['How fresh is "fresh"?', 'Never more than 36 hours from the tide. Most orders are landed the morning before they ship.'],
  ['Do you ship nationwide?', 'Yes. Overnight to all 48 contiguous states, seven days a week. Free over $150.'],
  ['What if I\'m not home?', 'Our packaging holds 0–2 °C for 48 hours. Leave it on the porch — it will be colder than your fridge.'],
  ['Wholesale for restaurants?', 'Absolutely. Get in touch and our fleet relations team will build a weekly program for your kitchen.'],
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)

  const submit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <>
      <section className="container-x pt-36 pb-20 md:pt-44">
        <Reveal className="eyebrow mb-6">Get in touch</Reveal>
        <h1 className="display-lg text-foam">
          <SplitText text="Talk to a" />
          <br />
          <SplitText text="real fishmonger." className="italic font-light text-coral-light" delay={0.15} />
        </h1>
      </section>

      <section className="container-x pb-28 md:pb-36">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
          {/* Info */}
          <div className="md:col-span-5">
            <RevealImage src={IMG.crabPots} alt="Crab pots at the harbour" className="mb-10 aspect-[4/3] rounded-3xl" />
            <div className="space-y-6">
              {[
                [MapPin, 'Visit', '14 Harbour Road, Portree, Isle of Skye IV51 9DE'],
                [Mail, 'Email', 'hello@tafc.sea'],
                [Phone, 'Call', '+44 (0) 1478 612 000'],
                [Clock, 'Hours', 'Mon–Sat, 05:00 – 18:00 GMT'],
              ].map(([Icon, label, value], i) => (
                <Reveal key={label} delay={i * 0.08} className="flex items-start gap-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 text-coral">
                    <Icon size={16} strokeWidth={1.6} />
                  </span>
                  <div>
                    <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-slate">{label}</p>
                    <p className="mt-1 font-serif text-xl text-foam">{value}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-6 md:col-start-7">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="rounded-3xl border border-coral/30 bg-coral/5 p-10 text-center"
                >
                  <span className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-coral text-abyss">
                    <Check size={26} />
                  </span>
                  <p className="font-serif text-4xl text-foam">Message received.</p>
                  <p className="mt-3 text-mist">A real person will reply within one working day — usually faster, unless the tide is in.</p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={submit} exit={{ opacity: 0, y: -20 }} className="space-y-8">
                  {FIELDS.map((f, i) => (
                    <Reveal key={f.id} delay={i * 0.08}>
                      <label htmlFor={f.id} className="mb-2 block font-sans text-[10px] uppercase tracking-[0.3em] text-slate">
                        {f.label}
                      </label>
                      <input
                        id={f.id}
                        type={f.type}
                        required
                        placeholder={f.placeholder}
                        value={form[f.id]}
                        onChange={(e) => setForm({ ...form, [f.id]: e.target.value })}
                        className="w-full border-b border-white/15 bg-transparent py-3 font-serif text-2xl text-foam placeholder:text-slate/50 transition-colors focus:border-coral focus:outline-none"
                      />
                    </Reveal>
                  ))}
                  <Reveal delay={0.25}>
                    <label htmlFor="message" className="mb-2 block font-sans text-[10px] uppercase tracking-[0.3em] text-slate">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      placeholder="Tell us what you're cooking…"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full resize-none border-b border-white/15 bg-transparent py-3 font-serif text-2xl text-foam placeholder:text-slate/50 transition-colors focus:border-coral focus:outline-none"
                    />
                  </Reveal>
                  <Reveal delay={0.3}>
                    <motion.button
                      type="submit"
                      whileTap={{ scale: 0.97 }}
                      className="btn-magnetic inline-flex items-center gap-3 rounded-full bg-coral px-8 py-5 font-sans text-[13px] font-semibold uppercase tracking-[0.18em] text-abyss"
                    >
                      <span className="inline-flex items-center gap-3">Send message <ArrowRight size={16} /></span>
                    </motion.button>
                  </Reveal>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-deep py-24 md:py-32">
        <div className="container-x grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Reveal className="eyebrow mb-6">Questions</Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-md text-foam">Asked often, answered honestly.</h2>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            {FAQ.map(([q, a], i) => {
              const open = openFaq === i
              return (
                <Reveal key={q} delay={i * 0.06}>
                  <button
                    onClick={() => setOpenFaq(open ? -1 : i)}
                    className="flex w-full items-center justify-between gap-6 border-b border-white/10 py-6 text-left"
                    aria-expanded={open}
                  >
                    <span className="font-serif text-2xl text-foam md:text-3xl">{q}</span>
                    <motion.span
                      animate={{ rotate: open ? 45 : 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-coral"
                    >
                      <span className="text-xl leading-none">+</span>
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 pt-2 text-lg leading-relaxed text-mist">{a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
