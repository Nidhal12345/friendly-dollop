const ITEMS = [
  'Wild-caught',
  'Tide to table in 36h',
  'Hand-graded',
  'Fully traceable',
  'MSC certified',
  'Overnight delivery',
  'Sashimi grade',
]

export default function Marquee({ items = ITEMS, duration = 40, className = '' }) {
  const doubled = [...items, ...items]
  return (
    <div className={`relative overflow-hidden border-y border-white/8 py-5 ${className}`}>
      <div
        className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap will-change-transform"
        style={{ '--marquee-duration': `${duration}s` }}
      >
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-10">
            <span className="font-serif text-2xl italic text-mist md:text-3xl">{item}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-coral" />
          </div>
        ))}
      </div>
    </div>
  )
}
