'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function WorkAnimations() {
  useGSAP(() => {
    const section = document.getElementById('work')!

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(section.querySelectorAll('.work-heading, .work-row, .elsewhere-item'), { opacity: 1, x: 0, y: 0 })
      return
    }

    const heading = section.querySelector('.work-heading')
    if (heading) {
      gsap.to(heading, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'expo.out',
        // ponytail: triggers on the element itself, not the section —
        // fires when the heading is actually entering the viewport
        scrollTrigger: { trigger: heading, start: 'top 88%' },
      })
    }

    // ponytail: per-element ScrollTrigger — each row reveals as it enters,
    // not all at once when the section top crosses an arbitrary threshold
    section.querySelectorAll<Element>('.work-row').forEach((row) => {
      gsap.to(row, {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'expo.out',
        scrollTrigger: { trigger: row, start: 'top 92%' },
      })
    })

    section.querySelectorAll<Element>('.elsewhere-item').forEach((item) => {
      gsap.to(item, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: item, start: 'top 92%' },
      })
    })
  })

  return null
}
