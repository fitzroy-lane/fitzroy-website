'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/corporate', label: 'Corporate Catering' },
  { href: '/packages', label: 'Party Packages' },
  { href: '/menu', label: 'Catering Menu' },
  { href: '/about', label: 'About' },
]

interface NavbarProps {
  promoBannerText?: string
}

export default function Navbar({ promoBannerText }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (pathname?.startsWith('/studio')) return null

  const transparent = isHome && !scrolled && !menuOpen

  return (
    <>
      {promoBannerText && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-fitzroy-bronze text-fitzroy-cream text-center font-inter text-xs py-2 px-4 tracking-wide">
          {promoBannerText}
        </div>
      )}
    <header
      className={`fixed left-0 right-0 z-40 transition-all duration-300 ${
        promoBannerText ? 'top-8' : 'top-0'
      } ${transparent ? 'bg-transparent' : 'bg-fitzroy-charcoal shadow-md'}`}
    >
      <div className="container-site">
        <div className="flex items-center justify-between h-24 lg:h-28">
          {/* Logo */}
          <Link href="/" onClick={() => setMenuOpen(false)}>
            <Image
              src="/logos/logo-white.png"
              alt="Fitzroy Catering"
              width={140}
              height={56}
              className="h-16 w-auto lg:h-20"
              priority
            />
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
    </>
  )
}
