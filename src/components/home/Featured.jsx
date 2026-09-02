import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PRODUCTS } from '../../data/products'
import ProductCard from '../shop/ProductCard'
import { Reveal, SplitText } from '../ui/Reveal'
import MagneticButton from '../ui/MagneticButton'

export default function Featured({ onOpen }) {
  const featured = PRODUCTS.filter((p) => p.badge).slice(0, 4)

  return (
    <section className="container-x py-24 md:py-36">
      <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <Reveal className="eyebrow mb-6">This week's catch</Reveal>
          <h2 className="display-md text-foam">
            <SplitText text="Chosen by the tide," />
            <br />
            <SplitText text="graded by hand." className="italic font-light text-mist" delay={0.15} />
          </h2>
        </div>
        <Reveal delay={0.3}>
          <MagneticButton as={Link} to="/shop" variant="outline">
            View all products <ArrowRight size={15} />
          </MagneticButton>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} onOpen={onOpen} />
        ))}
      </div>
    </section>
  )
}
