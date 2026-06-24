'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { cn } from '@/lib/utils'

gsap.registerPlugin(useGSAP)

const links = [
  { href: '/#work', label: 'Work', section: 'work' },
  { href: '/#method', label: 'Method', section: 'method' },
  { href: '/#about', label: 'About', section: 'about' },
  { href: '/#contact', label: 'Contact', section: 'contact' },
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

  return (
    <header
      data-sticky-nav
      className={cn(
        'fixed top-0 inset-x-0 z-50 h-20',
        // Mobile only: white bg when scrolled (desktop pill handles its own bg)
        scrolled ? 'bg-background/95 backdrop-blur-sm border-b border-border sm:bg-transparent sm:backdrop-blur-none sm:border-0' : 'bg-transparent'
      )}
    >
      {/* Desktop — centered floating dark pill */}
      <div className="hidden sm:flex items-center justify-center h-full">
        <div className="flex items-center gap-2">
        <nav
          className={cn(
            'grid grid-cols-[1fr_auto_1fr] items-center w-180 rounded-full border backdrop-blur-md px-3 py-2 transition-all duration-300',
            scrolled
              ? 'bg-black/90 border-white/[0.08]'
              : 'bg-white/[0.08] border-white/[0.12]'
          )}
          aria-label="Main navigation"
        >
          {/* Avatar + Logo group */}
          <div className="flex items-center gap-2">
            <Image
              src="/images/about/avatar.jpg"
              alt="Maxime Luet"
              width={32}
              height={32}
              className="size-8 rounded-full object-cover shrink-0"
            />
            <Link
              href="/"
              className="text-xl font-normal text-white transition-opacity duration-200 hover:opacity-70"
            >
              Maxime Luet
            </Link>
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

          {/* Badge */}
          <div className="flex items-center justify-end gap-3">
            <div className="flex items-center gap-2 text-sm">
              <span
                className="size-2 rounded-full bg-emerald-400 shrink-0"
                aria-hidden="true"
                style={{ boxShadow: '0 0 6px 2px rgba(52,211,153,0.55)' }}
              />
              <span className="font-normal text-white/70">Available for work</span>
            </div>
            {/* ponytail: placeholder href, wire up repo URL when ready */}
            <a
              href="#"
              aria-label="GitHub"
              className="text-white/40 hover:text-white/80 transition-colors duration-200"
            >
              <svg viewBox="0 0 24 24" className="size-6 fill-current" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
          </div>
        </nav>
        </div>
      </div>

      {/* Mobile — simple flex row */}
      <nav className="sm:hidden flex items-center px-6 h-full" aria-label="Main navigation">
        <Link
          href="/"
          className={cn('text-xl font-normal mr-auto transition-colors duration-300', scrolled ? 'text-primary' : 'text-white')}
        >
          Maxime Luet
        </Link>

        <button
          className={cn(
            'transition-colors duration-300',
            scrolled ? 'text-text-secondary hover:text-primary' : 'text-white/60 hover:text-white'
          )}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        </button>
      </nav>

      {menuOpen && (
        <>
          {/* ponytail: backdrop dismiss */}
          <div
            className="sm:hidden fixed inset-0 top-20 z-[-1]"
            aria-hidden="true"
            onClick={() => setMenuOpen(false)}
          />
          <div className={cn('sm:hidden border-t', scrolled ? 'bg-background/95 backdrop-blur-sm border-border' : 'border-foreground/[8%] bg-white/80 backdrop-blur-sm')}>
            <ul className="flex flex-col px-6 py-3 gap-0.5" role="list">
              {links.map(({ href, label, section }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      'block py-2 text-sm font-medium transition-colors duration-200',
                      isHome && activeSection === section
                        ? 'text-foreground'
                        : 'text-text-secondary hover:text-primary'
                    )}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </header>
  )
}
