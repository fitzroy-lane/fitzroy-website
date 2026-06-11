import Link from 'next/link'
import { Metadata } from 'next'
import PageHeader from '@/components/ui/PageHeader'
import { PartyPackageCard } from '@/components/ui/PackageCard'
import ElevateSection from '@/components/ui/ElevateSection'
import { sanityFetch } from '@/lib/sanity'
import { PARTY_PACKAGES_QUERY } from '@/lib/queries'
import { PartyPackage } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Event Packages',
  description: 'Private event catering packages for Western Sydney — birthdays, celebrations, a Celebration of Life, and gatherings. Flexible options with optional setup, styling, and staffing.',
}

const STATIC_PACKAGES: PartyPackage[] = [
  {
    _id: 'party-1',
    title: 'Package 1',
    slug: { current: 'package-1' },
    price: 900,
    serveNote: 'Serves approx. 30–40 guests',
    tagline: 'The essentials',
    inclusions: [
      '1 × Antipasto Platter',
      '4 × Hot Food Platters',
      "Chef's Selection of Cakes & Slices",
      'Delivery Included',
    ],
    order: 1,
  },
  {
    _id: 'party-2',
    title: 'Package 2',
    slug: { current: 'package-2' },
    price: 1800,
    serveNote: 'Serves approx. 50–60 guests',
    tagline: 'The celebration',
    inclusions: [
      '1 × Antipasto Platter',
      '4 × Hot Food Platters',
      '1 × Pizza Pack',
      '1 × Pasta Pack',
      '1 × Petit Fours & Macarons',
      'Delivery Included',
    ],
    order: 2,
  },
  {
    _id: 'party-3',
    title: 'Package 3',
    slug: { current: 'package-3' },
    price: 2500,
    serveNote: 'Serves approx. 80–100 guests',
    tagline: 'The full spread',
    inclusions: [
      '1 × Antipasto Platter',
      '6 × Hot Food Platters',
      '2 × Cold Food Platters',
      '2 × Pizza Packs',
      '2 × Pasta Packs',
      '1 × Seasonal Fruit Platter',
      '1 × Premium Petit Fours & Macarons',
      'Delivery Included',
    ],
    order: 3,
  },
]

export default async function PackagesPage() {
  const packages = await sanityFetch<PartyPackage[]>({ query: PARTY_PACKAGES_QUERY, revalidate: 300 }).catch(() => [])
  const displayPackages = packages.length > 0 ? packages : STATIC_PACKAGES

  return (
    <>
      <PageHeader
        label="Private Events"
        title="Event Packages"
        subtitle="From birthdays and family celebrations to a Celebration of Life and private gatherings. Flexible catering solutions with optional setup and styling."
      />

      <section className="py-16 lg:py-20 bg-fitzroy-cream">
        <div className="container-site">

          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="font-inter text-fitzroy-taupe leading-relaxed text-sm">
              Whether you are planning an intimate gathering or a large celebration, our team can create a package tailored to your event size, style, and food preferences. Here are our pre-planned packages to get you started.
            </p>
          </div>

          {/* Package grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {displayPackages.map((pkg) => (
              <PartyPackageCard key={pkg._id} pkg={pkg} />
            ))}
          </div>

          {/* Custom CTA */}
          <div className="bg-fitzroy-charcoal p-8 lg:p-12 text-center">
            <p className="section-label text-fitzroy-stone mb-3">Custom Packages</p>
            <h3 className="font-playfair text-3xl text-fitzroy-cream mb-4">Planning something different?</h3>
            <p className="font-inter text-fitzroy-stone text-sm max-w-xl mx-auto mb-6 leading-relaxed">
              We offer customised event catering packages tailored to your size, style, and budget. Complete the enquiry form and a member of our team will be in touch within 24 hours.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="btn-primary">Get a Custom Quote</Link>
              <Link href="/menu" className="btn-outline-light">Browse the Menu</Link>
            </div>
          </div>
        </div>
      </section>

      <ElevateSection />
    </>
  )
}
