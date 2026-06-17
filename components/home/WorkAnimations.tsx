'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function WorkAnimations() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.registerPlugin(ScrollTrigger)

    const section = document.getElementById('work')!

    gsap.from(section.querySelectorAll('.work-row'), {
      opacity: 0,
      y: 12,
      duration: 0.5,
      stagger: 0.08,
      ease: 'power2.out',
      scrollTrigger: { trigger: '#work', start: 'top 78%' },
    })

    gsap.from(section.querySelectorAll('.elsewhere-item'), {
      opacity: 0,
      y: 8,
      duration: 0.4,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.elsewhere-section', start: 'top 85%' },
    })

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  return null
}
