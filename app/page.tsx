import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import HeroSection from '@/components/ui/HeroSection'
import { CorporatePackageCard } from '@/components/ui/PackageCard'
import { sanityFetch, urlFor } from '@/lib/sanity'
import {
  SITE_SETTINGS_QUERY,
  FEATURED_CORPORATE_PACKAGES_QUERY,
  FEATURED_GALLERY_QUERY,
} from '@/lib/queries'
import { SiteSettings, CorporatePackage, GalleryImage } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Fitzroy Catering — Restaurant-Quality Catering for Western Sydney',
  description: 'Professional, reliable catering for corporate, community, and private events across Western Sydney. Based in Seven Hills.',
}

export default async function HomePage() {
  const [settings, featuredPackages, gallery] = await Promise.all([
    sanityFetch<SiteSettings>({ query: SITE_SETTINGS_QUERY, revalidate: 300 }).catch(() => null),
    sanityFetch<CorporatePackage[]>({ query: FEATURED_CORPORATE_PACKAGES_QUERY, revalidate: 300 }).catch(() => []),
    sanityFetch<GalleryImage[]>({ query: FEATURED_GALLERY_QUERY, revalidate: 300 }).catch(() => []),
  ])

  const galleryImages = gallery.slice(0, 6)

  return (
    <>
      <HeroSection settings={settings} />

      {/* Service pillars */}
      <section className="bg-fitzroy-charcoal">
        <div className="container-site py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-fitzroy-stone/20">
            {[
              {
                icon: '🏢',
                title: 'Corporate Catering',
                desc: 'Office lunches, meetings, staff events, and workplace birthday celebrations. Recurring packages available.',
                href: '/corporate',
              },
              {
                icon: '🎉',
                title: 'Private Events',
                desc: 'Birthdays, family gatherings, engagements, and celebrations. Flexible packages with optional setup and styling.',
                href: '/packages',
              },
              {
                icon: '🤝',
                title: 'Community & Sports',
                desc: 'Sporting clubs, community organisations, school events, and not-for-profit functions. Large-volume solutions.',
                href: '/contact',
              },
            ].map((pillar) => (
              <Link key={pillar.title} href={pillar.href}
                className="bg-fitzroy-charcoal p-8 lg:p-10 group hover:bg-fitzroy-charcoal/80 transition-colors">
                <div className="text-3xl mb-4">{pillar.icon}</div>
                <h3 className="font-playfair text-xl text-fitzroy-cream mb-3">{pillar.title}</h3>
                <p className="font-inter text-sm text-fitzroy-stone leading-relaxed">{pillar.desc}</p>
                <p className="font-inter text-xs text-fitzroy-bronze mt-4 group-hover:text-fitzroy-sand transition-colors tracking-wide">
                  Learn more →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured packages */}
      {featuredPackages.length > 0 && (
        <section className="bg-fitzroy-cream py-20">
          <div className="container-site">
            <div className="text-center mb-12">
              <p className="section-label mb-2">Popular Packages</p>
              <h2 className="font-playfair text-3xl lg:text-4xl text-fitzroy-charcoal">
                Corporate Catering Packages
              </h2>
              <p className="font-inter text-fitzroy-taupe mt-3 max-w-xl mx-auto text-sm leading-relaxed">
                Pre-planned packages designed to make organising food for your team simple. Delivered to your door.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPackages.map((pkg) => (
                <CorporatePackageCard key={pkg._id} pkg={pkg} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/corporate" className="btn-outline">
                View All Corporate Packages
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* About strip */}
      <section className="bg-fitzroy-sand/30 py-20">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="section-label mb-3">About Fitzroy Catering</p>
              <h2 className="font-playfair text-3xl lg:text-4xl text-fitzroy-charcoal mb-5">
                Restaurant-backed quality.<br />Operational precision.
              </h2>
              <div className="space-y-4 font-inter text-fitzroy-taupe text-sm leading-relaxed">
                <p>
                  Fitzroy Catering is the catering division of Fitzroy Lane, an established Seven Hills restaurant founded in 2022. We bring the same kitchen standards and hospitality to your event — whether it&apos;s a boardroom lunch or a 90-person birthday celebration.
                </p>
                <p>
                  Our team is led by a director with over 12 years in operations and logistics, and an executive chef with 20+ years of hospitality experience across menu development and multi-cuisine catering.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-fitzroy-sand">
                {[
                  { value: '20+', label: "Chef's years exp." },
                  { value: '12+', label: 'Years in operations' },
                  { value: '25+', label: 'Suburbs serviced' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="font-playfair text-fitzroy-charcoal text-2xl">{stat.value}</p>
                    <p className="font-inter text-fitzroy-stone text-xs mt-1 leading-snug">{stat.label}</p>
                  </div>
                ))}
              </div>
              <Link href="/about" className="btn-outline mt-8 inline-block">
                Our Story
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {['/images/10.png', '/images/15.png', '/images/25.png', '/images/20.png'].map((src, i) => (
                <div key={src} className={`relative overflow-hidden ${i === 0 ? 'row-span-2' : ''}`}
                  style={{ height: i === 0 ? '340px' : '160px' }}>
                  <Image
                    src={src}
                    alt="Fitzroy Catering food presentation"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Photo gallery */}
      {galleryImages.length > 0 && (
        <section className="py-20 bg-fitzroy-cream">
          <div className="container-site">
            <div className="text-center mb-10">
              <p className="section-label mb-2">Our Food</p>
              <h2 className="font-playfair text-3xl lg:text-4xl text-fitzroy-charcoal">
                Restaurant quality, delivered
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {galleryImages.map((img) => {
                const imgUrl = urlFor(img.image).width(600).height(450).url()
                return (
                  <div key={img._id} className="relative overflow-hidden aspect-[4/3]">
                    <Image
                      src={imgUrl}
                      alt={img.alt || 'Fitzroy Catering'}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Service area */}
      <section className="bg-fitzroy-charcoal py-16">
        <div className="container-site text-center">
          <p className="section-label text-fitzroy-stone mb-3">Delivery Area</p>
          <h2 className="font-playfair text-3xl text-fitzroy-cream mb-4">Servicing Western Sydney</h2>
          <p className="font-inter text-fitzroy-stone text-sm max-w-2xl mx-auto leading-relaxed mb-3">
            {settings?.serviceAreaText || 'Based in Seven Hills, we service a 20km+ radius including Blacktown, Parramatta, Bella Vista, Castle Hill, Norwest, Baulkham Hills, and surrounding suburbs.'}
          </p>
          <p className="font-inter text-fitzroy-stone/60 text-xs">
            Not sure if we cover your area? Get in touch and we&apos;ll let you know.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-fitzroy-sand py-20">
        <div className="container-site text-center">
          <p className="section-label mb-3">Ready to get started?</p>
          <h2 className="font-playfair text-3xl lg:text-4xl text-fitzroy-charcoal mb-4">
            Let&apos;s plan your event
          </h2>
          <p className="font-inter text-fitzroy-taupe text-sm max-w-md mx-auto mb-8 leading-relaxed">
            Fill in your event details and we&apos;ll respond with a personalised quote within 24 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn-primary">
              Get a Quote
            </Link>
            <Link href="/menu" className="btn-outline">
              View Menu
            </Link>
          </div>
          <p className="font-inter text-xs text-fitzroy-taupe/70 mt-6">
            Minimum order $350 · 48 hours notice required · Delivery included in most packages
          </p>
        </div>
      </section>
    </>
  )
}
