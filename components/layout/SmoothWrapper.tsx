'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother)

export function SmoothWrapper({ children }: { children: React.ReactNode }) {
  const wrapper = useRef<HTMLDivElement>(null)
  const content = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const smooth = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1.5
    ScrollSmoother.create({
      wrapper: wrapper.current!,
      content: content.current!,
      smooth,
      smoothTouch: 0.1,
      effects: true,
    })
  }, { scope: wrapper })

  return (
    <div ref={wrapper} id="smooth-wrapper">
      <div ref={content} id="smooth-content">
        {children}
      </div>
    </div>
  )
}
