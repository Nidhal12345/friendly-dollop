import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { useLocation } from 'react-router-dom'

export let lenisInstance = null

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !isTouch,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4,
    })
    lenisRef.current = lenis
    lenisInstance = lenis

    let raf
    const loop = (time) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      lenisInstance = null
    }
  }, [])

  // Scroll to top on route change
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true })
  }, [location.pathname])

  return children
}
