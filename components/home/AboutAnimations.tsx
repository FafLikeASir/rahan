'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother)

const SCROLLER = '#smooth-wrapper'

export function AboutAnimations() {
  useGSAP(() => {
    const register = () => {
      const section = document.getElementById('about')!
      const targets = section.querySelectorAll('.about-label, .about-lead, .about-bio, .about-photo, .about-identity')

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(targets, { opacity: 1, y: 0, scale: 1 })
        return
      }

      ;['.about-label', '.about-lead'].forEach((sel) => {
        const el = section.querySelector(sel)
        if (el) gsap.to(el, { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%', scroller: SCROLLER } })
      })

      // ponytail: stagger with delay so cols reveal left→right even though they all enter at once
      section.querySelectorAll<Element>('.about-bio, .about-photo, .about-identity').forEach((col, i) => {
        gsap.to(col, {
          opacity: 1, y: 0, scale: 1,
          duration: 0.9, ease: 'expo.out',
          delay: i * 0.12,
          scrollTrigger: { trigger: col, start: 'top 88%', scroller: SCROLLER },
        })
      })
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
