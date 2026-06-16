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
    if (!isHome) { setScrolled(true); return }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-colors duration-300',
        scrolled ? 'bg-background/95 backdrop-blur-sm border-b border-border' : 'bg-transparent'
      )}
    >
      <nav
        className="mx-auto flex max-w-[1440px] items-center px-6 py-6 lg:px-[calc(100%/7)]"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className={cn(
            'transition-colors duration-300 mr-auto',
            scrolled
              ? 'text-sm font-semibold tracking-tight text-primary'
              : 'text-xl font-normal text-white'
          )}
        >
          Maxime Luet
        </Link>

        <ul className="hidden sm:flex items-center gap-6 mr-8" role="list">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  'text-base font-medium transition-colors duration-300',
                  scrolled ? 'text-text-secondary hover:text-primary' : 'text-white/50 hover:text-white'
                )}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* "Available for work" badge */}
        <div
          className={cn(
            'hidden sm:inline-flex items-center gap-2 rounded-lg border p-2 text-sm transition-colors duration-300',
            scrolled
              ? 'border-foreground/10 text-foreground backdrop-blur-md'
              : 'border-white/10 text-white backdrop-blur-[50px]'
          )}
          style={{
            background: scrolled
              ? 'var(--badge-ink-gradient)'
              : 'linear-gradient(99deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.20) 100%)',
          }}
        >
          <span
            className="size-2 rounded-full bg-emerald-400"
            aria-hidden="true"
            style={{ boxShadow: scrolled ? undefined : '0 0 6px 2px rgba(52,211,153,0.55)' }}
          />
          <span className="font-normal">Available for work</span>
        </div>

        <button
          className="sm:hidden text-text-secondary hover:text-primary transition-colors duration-300"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        </button>
      </nav>

      {menuOpen && (
        <div className={cn('sm:hidden border-t', scrolled ? 'bg-background/95 backdrop-blur-sm border-border' : 'border-foreground/[8%] bg-white/80 backdrop-blur-sm')}>
          <ul className="flex flex-col px-6 py-3 gap-0.5" role="list">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 text-sm font-medium text-text-secondary hover:text-primary transition-colors duration-200"
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
