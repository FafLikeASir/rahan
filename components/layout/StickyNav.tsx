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
        className="mx-auto flex max-w-[1440px] items-center px-6 py-5 lg:px-8"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-primary transition-colors duration-300 mr-auto"
        >
          Maxime Luet
        </Link>

        <ul className="hidden sm:flex items-center gap-6 mr-8" role="list">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="text-sm font-medium text-text-secondary hover:text-primary transition-colors duration-300"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* "Available for work" badge */}
        <div
          className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-foreground/10 px-3 py-1.5 text-sm backdrop-blur-md"
          style={{ background: 'var(--badge-ink-gradient)' }}
        >
          <span className="size-2 rounded-full bg-emerald-500" aria-hidden="true" />
          <span className="text-foreground font-normal">Available for work</span>
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
