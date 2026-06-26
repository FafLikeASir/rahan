'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function WorkAnimations() {
  useEffect(() => {
    const section = document.getElementById('work')!

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // ponytail: CSS hides these; must reveal manually when animation is skipped
      gsap.set(section.querySelectorAll('.work-row, .elsewhere-item'), { opacity: 1, y: 0 })
      return
    }

    gsap.registerPlugin(ScrollTrigger)

    // ponytail: gsap.to() + CSS initial state — if ScrollTrigger start is already
    // past (back-navigation), GSAP immediately snaps to target instead of staying
    // at opacity:0 as gsap.from() would
    gsap.to(section.querySelectorAll('.work-row'), {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.08,
      ease: 'power2.out',
      scrollTrigger: { trigger: '#work', start: 'top 78%' },
    })

    gsap.to(section.querySelectorAll('.elsewhere-item'), {
      opacity: 1,
      y: 0,
      duration: 0.4,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.elsewhere-section', start: 'top 85%' },
    })

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  return null
}
