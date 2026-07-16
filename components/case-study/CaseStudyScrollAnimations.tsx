'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother)

// ScrollSmoother intercepts scroll; all triggers must use its wrapper element.
const SCROLLER = '#smooth-wrapper'

export function CaseStudyScrollAnimations() {
  useGSAP(() => {
    const register = () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(
          '.prose h2, .prose h3, .prose p, .prose img, .prose figure, .prose ul, .prose ol, .prose blockquote, .cs-footer',
          { opacity: 1, y: 0 }
        )
        return
      }

      const st = (trigger: Element, start = 'top 88%'): ScrollTrigger.Vars => ({
        trigger,
        start,
        scroller: SCROLLER,
      })

      document.querySelectorAll<HTMLElement>('.prose h2, .prose h3').forEach((el) => {
        gsap.to(el, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', scrollTrigger: st(el, 'top 87%') })
      })

      document.querySelectorAll<HTMLElement>('.prose p').forEach((el) => {
        gsap.to(el, { opacity: 1, duration: 0.45, ease: 'power1.out', scrollTrigger: st(el, 'top 93%') })
      })

      document.querySelectorAll<HTMLElement>('.prose img, .prose figure').forEach((el) => {
        gsap.to(el, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', scrollTrigger: st(el, 'top 90%') })
      })

      document.querySelectorAll<HTMLElement>('.prose ul, .prose ol, .prose blockquote').forEach((el) => {
        gsap.to(el, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', scrollTrigger: st(el, 'top 90%') })
      })

      const footer = document.querySelector<HTMLElement>('.cs-footer')
      if (footer) {
        gsap.to(footer, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', scrollTrigger: st(footer, 'top 90%') })
      }
    }

    // Child effects run before parent (SmoothWrapper) in React. Defer registration
    // one macrotask so ScrollSmoother.create() has already run when we register.
    if (ScrollSmoother.get()) {
      register()
    } else {
      setTimeout(register, 0)
    }
  })

  return null
}
