'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { label: 'Startseite', href: '/' },
  { label: 'Leistungen', href: '/leistungen' },
  { label: 'Projekte', href: '/projekte' },
  { label: 'Team', href: '/team' },
  { label: 'Kontakt', href: '/kontakt' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 20)
      // Hide when scrolling down (past a small threshold), show when scrolling up.
      if (y > lastY && y > 80) {
        setHidden(true)
      } else if (y < lastY) {
        setHidden(false)
      }
      lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        hidden && !menuOpen ? '-translate-y-full' : 'translate-y-0'
      } ${
        scrolled
          ? 'backdrop-blur-md bg-sand/80 border-b border-leinen'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2 shrink-0">
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            aria-hidden="true"
            className="transition-transform duration-500 ease-out group-hover:rotate-180"
          >
            <circle cx="11" cy="11" r="9.5" stroke="#2E7D4F" strokeWidth="2.2" />
            <circle cx="11" cy="11" r="3.5" fill="#2E7D4F" />
          </svg>
          <span className="font-display font-bold text-h4 text-wald leading-none">
            insyte<span className="text-gruen">.</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center gap-8"
          aria-label="Hauptnavigation"
        >
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`group relative text-sm font-medium transition-colors duration-200 ${
                  active ? 'text-wald' : 'text-erde hover:text-gruen'
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gruen transition-all duration-300 ${
                    active ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            )
          })}
        </nav>

        {/* Desktop CTA */}
        <Link href="/kontakt" className="hidden md:inline-block btn-primary">
          Projekt starten
        </Link>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-wald p-1"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Menü schliessen' : 'Menü öffnen'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <line x1="4" y1="8" x2="20" y2="8" />
              <line x1="4" y1="16" x2="20" y2="16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile slide-down menu */}
      {menuOpen && (
        <nav
          className="md:hidden bg-sand/95 backdrop-blur-sm border-t border-leinen px-6 py-5 flex flex-col gap-4"
          aria-label="Mobile Navigation"
        >
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`w-fit py-1 text-sm font-medium transition-colors ${
                  active
                    ? 'text-wald underline decoration-gruen decoration-2 underline-offset-4'
                    : 'text-erde hover:text-gruen'
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            )
          })}
          <Link
            href="/kontakt"
            className="btn-primary text-center mt-2"
            onClick={() => setMenuOpen(false)}
          >
            Projekt starten
          </Link>
        </nav>
      )}
    </header>
  )
}
