import { useCallback, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { CartProvider } from './context/CartContext'
import SmoothScroll from './components/ui/SmoothScroll'
import Cursor from './components/ui/Cursor'
import Toast from './components/ui/Toast'
import Preloader from './components/layout/Preloader'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CartDrawer from './components/shop/CartDrawer'
import ProductModal from './components/shop/ProductModal'
import Home from './pages/Home'
import Shop from './pages/Shop'
import About from './pages/About'
import Contact from './pages/Contact'

const pageVariants = {
  initial: { opacity: 0, y: 24 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } },
}

function Page({ children }) {
  return (
    <motion.main variants={pageVariants} initial="initial" animate="enter" exit="exit">
      {children}
    </motion.main>
  )
}

export default function App() {
  const [ready, setReady] = useState(false)
  const [product, setProduct] = useState(null)
  const location = useLocation()

  const onDone = useCallback(() => setReady(true), [])
  const closeProduct = useCallback(() => setProduct(null), [])

  return (
    <CartProvider>
      <SmoothScroll>
        <div className="grain">
          <Preloader onDone={onDone} />
          <Cursor />
          <Navbar />

          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <Page>
                    <Home ready={ready} onOpenProduct={setProduct} />
                  </Page>
                }
              />
              <Route
                path="/shop"
                element={
                  <Page>
                    <Shop onOpenProduct={setProduct} />
                  </Page>
                }
              />
              <Route
                path="/about"
                element={
                  <Page>
                    <About />
                  </Page>
                }
              />
              <Route
                path="/contact"
                element={
                  <Page>
                    <Contact />
                  </Page>
                }
              />
            </Routes>
          </AnimatePresence>

          <Footer />
          <CartDrawer />
          <ProductModal product={product} onClose={closeProduct} />
          <Toast />
        </div>
      </SmoothScroll>
    </CartProvider>
  )
}
