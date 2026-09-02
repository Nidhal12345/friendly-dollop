import Hero from '../components/home/Hero'
import Marquee from '../components/home/Marquee'
import Intro from '../components/home/Intro'
import Categories from '../components/home/Categories'
import Featured from '../components/home/Featured'
import Process from '../components/home/Process'
import Stats from '../components/home/Stats'
import Testimonials from '../components/home/Testimonials'
import Newsletter from '../components/home/Newsletter'

export default function Home({ ready, onOpenProduct }) {
  return (
    <>
      <Hero ready={ready} />
      <Marquee />
      <Intro />
      <Categories />
      <Featured onOpen={onOpenProduct} />
      <Process />
      <Stats />
      <Testimonials />
      <Newsletter />
    </>
  )
}
