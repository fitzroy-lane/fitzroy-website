import Link from 'next/link'
import { SiteSettings } from '@/lib/types'

interface FooterProps {
  settings: SiteSettings | null
}

export default function Footer({ settings }: FooterProps) {
  const email = settings?.email || 'catering@fitzroylane.com'
  const phone = settings?.phone
  const address = settings?.address || 'Seven Hills, NSW'
  const instagram = settings?.instagram
  const facebook = settings?.facebook

  return (
    <footer className="bg-fitzroy-charcoal text-fitzroy-mushroom">
      <div className="container-site py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <span className="font-playfair text-fitzroy-cream text-2xl tracking-wide block">Fitzroy</span>
              <span className="font-inter text-fitzroy-stone text-[10px] uppercase tracking-[0.3em]">Catering</span>
            </div>
            <p className="font-inter text-sm leading-relaxed text-fitzroy-stone max-w-xs">
              Professional, reliable, restaurant-quality catering for corporate, community, and private events across Western Sydney.
            </p>
            {(instagram || facebook) && (
              <div className="flex gap-4 mt-5">
                {instagram && (
                  <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                    className="text-fitzroy-stone hover:text-fitzroy-cream transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                )}
                {facebook && (
                  <a href={facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                    className="text-fitzroy-stone hover:text-fitzroy-cream transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-playfair text-fitzroy-cream text-lg mb-4">Services</h4>
            <ul className="space-y-2">
              {[
                { href: '/corporate', label: 'Corporate Catering' },
                { href: '/packages', label: 'Party Packages' },
                { href: '/menu', label: 'Catering Menu' },
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Get a Quote' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="font-inter text-sm text-fitzroy-stone hover:text-fitzroy-cream transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-playfair text-fitzroy-cream text-lg mb-4">Contact</h4>
            <ul className="space-y-3 font-inter text-sm text-fitzroy-stone">
              <li>
                <a href={`mailto:${email}`} className="hover:text-fitzroy-cream transition-colors">
                  {email}
                </a>
              </li>
              {phone && (
                <li>
                  <a href={`tel:${phone}`} className="hover:text-fitzroy-cream transition-colors">
                    {phone}
                  </a>
                </li>
              )}
              <li>{address}</li>
              <li className="pt-2 text-fitzroy-stone/70 text-xs">
                Minimum order: {settings?.minimumOrder || '$350'}<br />
                {settings?.orderNotice || '48 hours'} notice required
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-fitzroy-stone/20 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-inter text-xs text-fitzroy-stone/60">
            © {new Date().getFullYear()} Fitzroy Catering. All rights reserved.
          </p>
          <p className="font-inter text-xs text-fitzroy-stone/60">
            Catering division of Fitzroy Lane Restaurant, Seven Hills NSW
          </p>
        </div>
      </div>
    </footer>
  )
}
