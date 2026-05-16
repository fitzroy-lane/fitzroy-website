import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import PageHeader from '@/components/ui/PageHeader'
import PortableTextRenderer from '@/components/ui/PortableTextRenderer'
import { sanityFetch } from '@/lib/sanity'
import { SITE_SETTINGS_QUERY } from '@/lib/queries'
import { SiteSettings } from '@/lib/types'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'About Fitzroy Catering — the catering division of Fitzroy Lane restaurant in Seven Hills, Western Sydney. Restaurant-quality food with operational precision.',
}

const SERVICE_AREAS_CORE = [
  'Seven Hills', 'Blacktown', 'Lalor Park', 'Kings Langley', 'Toongabbie', 'Old Toongabbie',
  'Pendle Hill', 'Girraween', 'Winston Hills', 'Prospect', 'Arndell Park', 'Huntingwood',
  'Glenwood', 'Parklea', 'Acacia Gardens', 'Bella Vista', 'Baulkham Hills', 'Constitution Hill',
  'Wentworthville', 'Northmead', 'Marayong', 'Quakers Hill', 'Rooty Hill', 'Doonside', 'Pemulwuy',
]

const SERVICE_AREAS_EXTENDED = [
  'Parramatta', 'Westmead', 'Merrylands', 'Greystanes', 'Kellyville', 'Kellyville Ridge',
  'Stanhope Gardens', 'Schofields', 'Rouse Hill', 'Castle Hill', 'Norwest', 'Mount Druitt',
  'Auburn', 'Carlingford',
]

export default async function AboutPage() {
  const settings = await sanityFetch<SiteSettings>({ query: SITE_SETTINGS_QUERY, revalidate: 300 }).catch(() => null)

  return (
    <>
      <PageHeader
        label="Our Story"
        title="About Fitzroy Catering"
        subtitle="Professional catering rooted in restaurant experience and operational precision."
      />

      {/* About section */}
      <section className="py-16 lg:py-20 bg-fitzroy-cream">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              {settings?.aboutTitle && (
                <h2 className="font-playfair text-3xl text-fitzroy-charcoal mb-5">{settings.aboutTitle}</h2>
              )}
              {settings?.aboutText ? (
                <PortableTextRenderer content={settings.aboutText} />
              ) : (
                <div className="space-y-4 font-inter text-fitzroy-taupe text-sm leading-relaxed">
                  <p>
                    Fitzroy Catering is the catering division of Fitzroy Lane, an established restaurant in Seven Hills founded in 2022. We combine restaurant-quality food with operational precision to deliver dependable catering experiences across Western Sydney.
                  </p>
                  <p>
                    Built as an extension of an existing restaurant operation, the business benefits from a commercial kitchen, experienced chefs, established supplier relationships, and operational systems already in place.
                  </p>
                  <p>
                    Our focus is on making professional catering accessible — with clear package structures, reliable delivery, and responsive communication. Whether you need morning tea for 30 staff or a full catering setup for a 90-person celebration, we have the capability and the systems to deliver.
                  </p>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {['/images/1.png', '/images/10.png', '/images/15.png', '/images/25.png'].map((src) => (
                <div key={src} className="relative overflow-hidden aspect-[4/3]">
                  <Image src={src} alt="Fitzroy Catering" fill className="object-cover" sizes="25vw" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team & values */}
      <section className="py-16 bg-fitzroy-sand/30">
        <div className="container-site">
          <div className="text-center mb-12">
            <p className="section-label mb-2">Our Team</p>
            <h2 className="font-playfair text-3xl text-fitzroy-charcoal">Leadership</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              {
                role: 'Director',
                highlight: '12+ years experience',
                desc: 'Hospital operations, logistics, compliance, and systems management. Responsible for operations, client relationships, and business systems.',
              },
              {
                role: 'Executive Chef',
                highlight: '20+ years experience',
                desc: 'Hospitality across menu development, food safety, and multi-cuisine catering. Responsible for kitchen operations, menu planning, and food quality.',
              },
            ].map((person) => (
              <div key={person.role} className="bg-white border border-fitzroy-sand p-6 lg:p-8">
                <p className="section-label mb-2">{person.role}</p>
                <p className="font-playfair text-fitzroy-charcoal text-lg mb-1">{person.highlight}</p>
                <p className="font-inter text-sm text-fitzroy-taupe leading-relaxed">{person.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-16 lg:py-20 bg-fitzroy-cream">
        <div className="container-site">
          <div className="text-center mb-12">
            <p className="section-label mb-2">Why Choose Us</p>
            <h2 className="font-playfair text-3xl text-fitzroy-charcoal">What sets us apart</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Restaurant-Backed Quality',
                desc: 'Our food is produced in a licensed commercial kitchen by experienced chefs — the same standards as our restaurant.',
              },
              {
                title: 'Reliable & On Time',
                desc: 'Operational systems and clear processes mean your catering arrives on schedule, every time.',
              },
              {
                title: 'Flexible Catering Solutions',
                desc: 'From platters and packages to fully customised menus — we work with your event, your budget, and your guests.',
              },
              {
                title: 'Clear Pricing',
                desc: 'No hidden fees. Package pricing is transparent so you know exactly what you\'re getting.',
              },
              {
                title: 'Fast Communication',
                desc: 'We respond to all enquiries within 24 hours and keep you informed throughout the process.',
              },
              {
                title: 'Multi-Cuisine Capability',
                desc: 'Hot platters, cold selections, grazing boards, pizza & pasta — our kitchen handles a full range of catering styles.',
              },
            ].map((item) => (
              <div key={item.title} className="border border-fitzroy-sand p-6 bg-white">
                <h4 className="font-playfair text-fitzroy-charcoal text-lg mb-2">{item.title}</h4>
                <p className="font-inter text-sm text-fitzroy-taupe leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service areas */}
      <section className="py-16 bg-fitzroy-charcoal">
        <div className="container-site">
          <div className="text-center mb-10">
            <p className="section-label text-fitzroy-stone mb-2">Delivery</p>
            <h2 className="font-playfair text-3xl text-fitzroy-cream">Service Areas</h2>
            <p className="font-inter text-fitzroy-stone text-sm mt-3 max-w-xl mx-auto">
              Based in Seven Hills, we service a ~20km radius across Western Sydney.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div>
              <h4 className="font-inter text-xs uppercase tracking-wider text-fitzroy-bronze mb-4">Core Service Area (~10–17 min)</h4>
              <div className="flex flex-wrap gap-2">
                {SERVICE_AREAS_CORE.map((suburb) => (
                  <span key={suburb} className="font-inter text-xs text-fitzroy-mushroom bg-fitzroy-stone/10 px-2.5 py-1">
                    {suburb}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-inter text-xs uppercase tracking-wider text-fitzroy-bronze mb-4">Extended Area (~18–25 min)</h4>
              <div className="flex flex-wrap gap-2">
                {SERVICE_AREAS_EXTENDED.map((suburb) => (
                  <span key={suburb} className="font-inter text-xs text-fitzroy-mushroom bg-fitzroy-stone/10 px-2.5 py-1">
                    {suburb}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-fitzroy-sand text-center">
        <div className="container-site">
          <h3 className="font-playfair text-3xl text-fitzroy-charcoal mb-3">Ready to talk catering?</h3>
          <p className="font-inter text-fitzroy-taupe text-sm mb-6">Fill in your event details and we&apos;ll come back with a quote within 24 hours.</p>
          <Link href="/contact" className="btn-primary">Get a Quote</Link>
        </div>
      </section>
    </>
  )
}
