import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Reusable GSAP ScrollTrigger animation presets for Nareswari.
 */
export function useScrollAnimations() {
  /**
   * Fade elements up with stagger on scroll.
   */
  function fadeUp(elements, { delay = 0, stagger = 0.12, duration = 0.8, y = 40 } = {}) {
    gsap.fromTo(
      elements,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: elements[0] || elements,
          start: 'top 85%',
          once: true,
        },
      }
    )
  }

  /**
   * Scale-in from center on scroll.
   */
  function scaleIn(element, { delay = 0, duration = 0.7 } = {}) {
    gsap.fromTo(
      element,
      { opacity: 0, scale: 0.85 },
      {
        opacity: 1,
        scale: 1,
        duration,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 88%',
          once: true,
        },
      }
    )
  }

  /**
   * Subtle parallax on scroll (element moves slower than scroll).
   */
  function parallax(element, { speed = 30 } = {}) {
    gsap.to(element, {
      y: speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    })
  }

  /**
   * Slide in from a direction on scroll.
   */
  function slideIn(element, { direction = 'left', duration = 0.8, delay = 0 } = {}) {
    const x = direction === 'left' ? -60 : direction === 'right' ? 60 : 0
    const y = direction === 'up' ? 40 : direction === 'down' ? -40 : 0

    gsap.fromTo(
      element,
      { opacity: 0, x, y },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          once: true,
        },
      }
    )
  }

  return { fadeUp, scaleIn, parallax, slideIn, gsap, ScrollTrigger }
}
