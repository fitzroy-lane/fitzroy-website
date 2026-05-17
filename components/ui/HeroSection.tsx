import Image from 'next/image'
import Link from 'next/link'
import { SiteSettings } from '@/lib/types'
import { urlFor } from '@/lib/sanity'

interface HeroSectionProps {
  settings: SiteSettings | null
}

export default function HeroSection({ settings }: HeroSectionProps) {
  const title = settings?.heroTitle || 'Restaurant-Quality Catering for Western Sydney'
  const subtitle = settings?.heroSubtitle || 'Professional, reliable catering for corporate, community, and private events. Backed by an established restaurant since 2022.'
  const heroImageUrl = settings?.heroImage
    ? urlFor(settings.heroImage).width(1920).height(1080).url()
    : '/images/hero.jpg'

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={heroImageUrl}
          alt="Fitzroy Catering — beautifully presented catering spread"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 bg-gradient-to-t from-fitzroy-charcoal/60 via-transparent to-transparent lg:hidden" />
      </div>

      {/* Content */}
      <div className="relative container-site w-full pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="max-w-xl">
          <p className="section-label text-fitzroy-sand mb-4">Western Sydney Catering</p>
          <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl text-fitzroy-cream leading-tight mb-6 [text-shadow:0_2px_16px_rgba(0,0,0,0.5)]">
            {title}
          </h1>
          <p className="font-inter text-fitzroy-cream/80 text-base lg:text-lg leading-relaxed mb-8 max-w-md [text-shadow:0_1px_8px_rgba(0,0,0,0.4)]">
            {subtitle}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary">
              Get a Quote
            </Link>
            <Link href="/corporate" className="btn-outline-light">
              View Packages
            </Link>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap gap-6 mt-12 pt-8 border-t border-fitzroy-stone/30">
            {[
              { label: 'Restaurant-Backed', sub: 'Est. 2022' },
              { label: 'Western Sydney', sub: '20km+ radius' },
              { label: 'Corporate & Private', sub: 'Events' },
            ].map((item) => (
              <div key={item.label}>
                <p className="font-playfair text-fitzroy-cream text-sm [text-shadow:0_1px_6px_rgba(0,0,0,0.5)]">{item.label}</p>
                <p className="font-inter text-fitzroy-stone text-xs mt-0.5">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
