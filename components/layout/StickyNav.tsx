'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { TransitionLink } from '@/components/layout/PageTransition'
import { Menu, MessageCircleDashed, X } from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { cn } from '@/lib/utils'

gsap.registerPlugin(useGSAP)

const links = [
  { href: '/#work', label: 'Work', section: 'work' },
  { href: '/#about', label: 'About', section: 'about' },
]

export function StickyNav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const pathname = usePathname()
  const isHome = pathname === '/'
  const ulRef = useRef<HTMLUListElement>(null)
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const hasAnimated = useRef(false)
  const mobilePillRef = useRef<HTMLElement>(null)
  const mobileAccordionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    if (!isHome) { setScrolled(true); return }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  useEffect(() => {
    if (!isHome) return
    const intersecting = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) intersecting.add(e.target.id)
          else intersecting.delete(e.target.id)
        })
        const active = links.find(l => intersecting.has(l.section))
        setActiveSection(active?.section ?? null)
      },
      { rootMargin: '-35% 0px -50% 0px', threshold: 0 }
    )
    links.forEach(({ section }) => {
      const el = document.getElementById(section)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [isHome])

  // Desktop indicator animation
  useGSAP(() => {
    const ul = ulRef.current
    if (!ul) return

    if (!activeSection) {
      gsap.to(ul, { '--indicator-opacity': 0, duration: 0.15, overwrite: true })
      hasAnimated.current = false
      return
    }

    const idx = links.findIndex(l => l.section === activeSection)
    const link = linkRefs.current[idx]
    if (!link) return

    const ulRect = ul.getBoundingClientRect()
    const linkRect = link.getBoundingClientRect()
    const x = linkRect.left - ulRect.left
    const w = linkRect.width

    if (!hasAnimated.current) {
      gsap.set(ul, { '--indicator-x': `${x}px`, '--indicator-w': `${w}px` })
      gsap.to(ul, { '--indicator-opacity': 1, duration: 0.2 })
      hasAnimated.current = true
    } else {
      gsap.to(ul, {
        '--indicator-x': `${x}px`,
        '--indicator-w': `${w}px`,
        duration: 0.4,
        ease: 'power3.out',
        overwrite: true,
      })
    }
  }, { dependencies: [activeSection] })

  // Mobile accordion — set initial state
  useGSAP(() => {
    gsap.set(mobileAccordionRef.current, { height: 0 })
    gsap.set(mobilePillRef.current, { borderRadius: 24 })
  }, { dependencies: [] })

  // Mobile accordion — animate on toggle
  useGSAP(() => {
    const accordion = mobileAccordionRef.current
    const pill = mobilePillRef.current
    if (!accordion || !pill) return

    if (menuOpen) {
      gsap.to(accordion, {
        height: 'auto',
        duration: 0.35,
        ease: 'power3.out',
        overwrite: true,
      })
    } else {
      gsap.to(accordion, {
        height: 0,
        duration: 0.25,
        ease: 'power3.in',
        overwrite: true,
      })
    }
  }, { dependencies: [menuOpen] })

  const pillBg = scrolled
    ? 'bg-black/90 border-white/[0.08]'
    : 'bg-white/[0.08] border-white/[0.12]'

  return (
    <header
      data-sticky-nav
      className="fixed top-0 inset-x-0 z-50 h-20"
    >
      {/* Desktop — centered floating dark pill */}
      <div className="hidden sm:flex items-center justify-center h-full">
        <nav
          className={cn(
            'flex items-center gap-8 rounded-full border backdrop-blur-md px-3 py-2 transition-all duration-300',
            pillBg
          )}
          aria-label="Main navigation"
        >
          {/* Avatar + Logo group */}
          <div className="flex items-center gap-3">
            <Image
              src="/images/about/avatar.jpg"
              alt="Maxime Luet"
              width={32}
              height={32}
              className="size-8 rounded-full object-cover shrink-0"
            />
            <TransitionLink
              href="/"
              className="text-lg font-normal text-white transition-opacity duration-200 hover:opacity-70"
            >
              Maxime Luet
            </TransitionLink>
          </div>

          {/* Nav links */}
          <ul
            ref={ulRef}
            className="relative flex items-center justify-center gap-1 before:absolute before:inset-y-0 before:left-0 before:rounded-full before:pointer-events-none before:bg-white/10 before:border before:border-white/10 before:w-[var(--indicator-w,0px)] before:translate-x-[var(--indicator-x,0px)] before:opacity-[var(--indicator-opacity,0)]"
            role="list"
          >
            {links.map(({ href, label, section }, i) => {
              const isActive = isHome && activeSection === section
              return (
                <li key={href}>
                  <Link
                    href={href}
                    ref={(el) => { linkRefs.current[i] = el as HTMLAnchorElement }}
                    className={cn(
                      'relative z-10 block text-sm font-medium px-3 py-1 rounded-full transition-colors duration-200',
                      isActive ? 'text-white' : 'text-white/55 hover:text-white/90'
                    )}
                  >
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Badge + LinkedIn */}
          <div className="flex items-center gap-3 ml-auto">
            <div className="flex items-center gap-2 text-sm">
              <span
                className="size-2 rounded-full bg-emerald-400 shrink-0"
                aria-hidden="true"
                style={{ boxShadow: '0 0 6px 2px rgba(52,211,153,0.55)' }}
              />
              <span className="font-normal text-white/70">Available for work</span>
            </div>
            <a
              href="https://www.linkedin.com/in/maxime-luet/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-white/40 hover:text-white/80 transition-colors duration-200"
            >
              <MessageCircleDashed className="size-4" aria-hidden="true" />
            </a>
          </div>
        </nav>
      </div>

      {/* Mobile — pill with integrated accordion */}
      <div className="sm:hidden flex justify-center items-start pt-4 px-4">
        {/* ponytail: backdrop dismiss */}
        {menuOpen && (
          <div
            className="fixed inset-0 top-0 z-[-1]"
            aria-hidden="true"
            onClick={() => setMenuOpen(false)}
          />
        )}
        <nav
          ref={mobilePillRef}
          className={cn(
            'w-full border backdrop-blur-md overflow-hidden transition-colors duration-300',
            pillBg
          )}
          aria-label="Main navigation"
        >
          {/* Header row — always visible */}
          <div className="flex items-center gap-3 px-3 py-2">
            <Image
              src="/images/about/avatar.jpg"
              alt="Maxime Luet"
              width={28}
              height={28}
              className="size-7 rounded-full object-cover shrink-0"
            />
            <TransitionLink
              href="/"
              className="text-base font-normal text-white transition-opacity duration-200 hover:opacity-70"
            >
              Maxime Luet
            </TransitionLink>
            <button
              className="ml-auto text-white/60 hover:text-white transition-colors duration-200"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            </button>
          </div>

          {/* Accordion body — GSAP-controlled height */}
          <div ref={mobileAccordionRef} className="overflow-hidden">
            <ul className="flex flex-col px-4 pt-1 pb-3 gap-0.5" role="list">
              {links.map(({ href, label, section }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      'block py-2 text-base font-medium transition-colors duration-200',
                      isHome && activeSection === section
                        ? 'text-white'
                        : 'text-white/55 hover:text-white/90'
                    )}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Divider */}
            <div className="border-t border-white/[0.08] mx-4" />

            {/* Footer — badge + LinkedIn */}
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2 text-sm">
                <span
                  className="size-1.5 rounded-full bg-emerald-400 shrink-0"
                  aria-hidden="true"
                  style={{ boxShadow: '0 0 6px 2px rgba(52,211,153,0.55)' }}
                />
                <span className="font-normal text-white/70">Available for work</span>
              </div>
              <a
                href="https://www.linkedin.com/in/maxime-luet/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-white/40 hover:text-white/80 transition-colors duration-200"
              >
                <MessageCircleDashed className="size-6" aria-hidden="true" />
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
