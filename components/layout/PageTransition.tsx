'use client'

import {
  createContext,
  useContext,
  useRef,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react'
import Link from 'next/link'
import type { ComponentProps } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import gsap from 'gsap'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

gsap.registerPlugin(ScrollSmoother)

// ─── Context ──────────────────────────────────────────────────────────────────

type TransitionCtx = { navigateTo: (href: string) => void }
const TransitionContext = createContext<TransitionCtx | null>(null)

// ─── Provider + Overlay ───────────────────────────────────────────────────────

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const loaderBarRef = useRef<HTMLDivElement>(null)
  const isTransitioning = useRef(false)
  const isFirst = useRef(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    gsap.set(overlayRef.current, { yPercent: 100 })
  }, [])

  const navigateTo = useCallback(
    (href: string) => {
      if (isTransitioning.current) return

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        router.push(href)
        return
      }

      isTransitioning.current = true
      document.body.style.overflow = 'hidden'
      gsap.killTweensOf('#smooth-content')
      gsap.set(overlayRef.current, { pointerEvents: 'auto' })
      gsap.set(loaderBarRef.current, { opacity: 1 })
      gsap.to(overlayRef.current, {
        yPercent: 0,
        duration: 0.45,
        ease: 'power3.inOut',
        onComplete: () => {
          router.push(href)
        },
      })
    },
    [router],
  )

  // Slide overlay out when the new route renders
  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false
      return
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const id = setTimeout(() => {
      document.body.style.overflow = ''
      gsap.set('#smooth-content', { y: 0 })
      ScrollSmoother.get()?.scrollTop(0)
      gsap.to(overlayRef.current, {
        yPercent: -100,
        duration: 0.55,
        ease: 'power3.inOut',
        onComplete: () => {
          gsap.set(overlayRef.current, { yPercent: 100, pointerEvents: 'none' })
          gsap.set(loaderBarRef.current, { opacity: 0 })
          isTransitioning.current = false
        },
      })
    }, 80)
    return () => clearTimeout(id)
  }, [pathname])

  return (
    <TransitionContext.Provider value={{ navigateTo }}>
      {children}
      <div
        ref={overlayRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          backgroundColor: '#1f1f1f',
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      >
        <div
          ref={loaderBarRef}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '40%',
            height: '2px',
            opacity: 0,
            backgroundColor: '#fb3706',
            animation: 'loader-sweep 1.2s ease-in-out infinite',
          }}
        />
      </div>
    </TransitionContext.Provider>
  )
}

// ─── TransitionLink ───────────────────────────────────────────────────────────

export function TransitionLink({ href, children, onClick, ...props }: ComponentProps<typeof Link>) {
  const ctx = useContext(TransitionContext)
  const pathname = usePathname()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    if (e.defaultPrevented) return
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    const hrefStr = href.toString()
    if (hrefStr.startsWith('http') || hrefStr.startsWith('//')) return // external
    const hrefPath = hrefStr.split('#')[0] || '/'
    if (hrefPath === pathname) return // same route — let native scroll
    e.preventDefault()
    ctx?.navigateTo(hrefStr)
  }

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  )
}
