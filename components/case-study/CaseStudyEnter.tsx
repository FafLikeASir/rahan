'use client'

import { useEffect, useLayoutEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

gsap.registerPlugin(useGSAP)

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export function CaseStudyEnter() {
  useIsomorphicLayoutEffect(() => {
    gsap.set('.cs-gradient', { opacity: 0 })
    gsap.set('.cs-back', { opacity: 0, x: -10 })
    gsap.set('.cs-icon', { opacity: 0, scale: 0.85 })
    gsap.set('.cs-title', { opacity: 0, y: 24 })
    gsap.set('.cs-cover-image', { opacity: 0, y: 24 })
    gsap.set('.cs-row', { opacity: 0, y: 16 })

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set('.cs-gradient', { opacity: 0.45 })
      gsap.set('.cs-back, .cs-icon, .cs-title, .cs-cover-image', { opacity: 1, x: 0, y: 0, scale: 1 })
      gsap.set('.cs-row', { opacity: 1, y: 0 })
    }
  }, [])

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const tl = gsap.timeline()

    // Cover sequence
    tl.fromTo('.cs-back',
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' }
    ).fromTo('.cs-icon',
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' },
      '-=0.2'
    ).fromTo('.cs-title',
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' },
      '-=0.2'
    ).fromTo('.cs-cover-image',
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.3'
    )

    // Gradient: slow atmospheric bloom starting early, runs as background to the cover sequence
    tl.fromTo('.cs-gradient',
      { opacity: 0 },
      { opacity: 0.45, duration: 1.4, ease: 'power1.out' },
      0.2
    )

    // Header rows: cascade in after the cover lands
    tl.fromTo('.cs-row',
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.55, stagger: 0.12, ease: 'power2.out' },
      '>-0.1'
    )
  })

  return null
}
