'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function MethodAnimations() {
  useGSAP(() => {
    const section = document.getElementById('method')!

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(section.querySelectorAll('.method-header, .method-cell'), { opacity: 1, y: 0 })
      return
    }

    const header = section.querySelector('.method-header')
    if (header) {
      gsap.to(header, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'expo.out',
        scrollTrigger: { trigger: header, start: 'top 88%' },
      })
    }

    // ponytail: per-element trigger + (i % 3) delay for horizontal row stagger on desktop
    section.querySelectorAll<Element>('.method-cell').forEach((cell, i) => {
      gsap.to(cell, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'expo.out',
        delay: (i % 3) * 0.08,
        scrollTrigger: { trigger: cell, start: 'top 92%' },
      })
    })
  })

  return null
}
