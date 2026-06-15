'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const links = [
  { href: '/#work', label: 'Work' },
  { href: '/#method', label: 'Method' },
  { href: '/#about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
]

export function StickyNav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    // On non-home pages, always show scrolled state
    if (!isHome) { setScrolled(true); return }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  const dark = isHome && !scrolled

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-colors duration-300',
        scrolled ? 'bg-background/95 backdrop-blur-sm border-b border-border' : 'bg-transparent'
      )}
    >
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className={cn(
            'text-sm font-semibold tracking-tight transition-colors duration-300',
            dark ? 'text-white/90' : 'text-primary'
          )}
        >
          Maxime Luet
        </Link>
        <ul className="hidden sm:flex items-center gap-6" role="list">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  'text-sm font-medium transition-colors duration-300 hover:opacity-100',
                  dark
                    ? 'text-white/50 hover:text-white/90'
                    : 'text-text-secondary hover:text-primary'
                )}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className={cn(
            'sm:hidden transition-colors duration-300',
            dark ? 'text-white/70 hover:text-white/90' : 'text-text-secondary hover:text-primary'
          )}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        </button>
      </nav>

      {menuOpen && (
        <div
          className={cn(
            'sm:hidden border-t',
            scrolled
              ? 'bg-background/95 backdrop-blur-sm border-border'
              : 'border-white/10 bg-black/30 backdrop-blur-sm'
          )}
        >
          <ul className="flex flex-col px-6 py-3 gap-0.5" role="list">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    'block py-2 text-sm font-medium transition-colors duration-200',
                    dark
                      ? 'text-white/70 hover:text-white/90'
                      : 'text-text-secondary hover:text-primary'
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
