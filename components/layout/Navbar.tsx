'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/corporate', label: 'Corporate Catering' },
  { href: '/packages', label: 'Party Packages' },
  { href: '/menu', label: 'Catering Menu' },
  { href: '/about', label: 'About' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const transparent = isHome && !scrolled && !menuOpen

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        transparent ? 'bg-transparent' : 'bg-fitzroy-charcoal shadow-md'
      }`}
    >
      <div className="container-site">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none" onClick={() => setMenuOpen(false)}>
            <span className="font-playfair text-fitzroy-cream text-xl lg:text-2xl tracking-wide">
              Fitzroy
            </span>
            <span className="font-inter text-fitzroy-stone text-[10px] uppercase tracking-[0.3em]">
              Catering
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-inter text-sm tracking-wide transition-colors duration-200 ${
                  pathname === link.href
                    ? 'text-fitzroy-sand'
                    : 'text-fitzroy-mushroom hover:text-fitzroy-cream'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Link href="/contact" className="btn-primary text-xs py-2.5 px-5">
              Get a Quote
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-fitzroy-cream p-2"
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className={`block h-px bg-current transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-px bg-current transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-px bg-current transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-fitzroy-charcoal border-t border-fitzroy-stone/20">
          <nav className="container-site py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`font-inter text-base py-1 transition-colors ${
                  pathname === link.href ? 'text-fitzroy-sand' : 'text-fitzroy-mushroom'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="btn-primary text-center mt-2"
            >
              Get a Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
