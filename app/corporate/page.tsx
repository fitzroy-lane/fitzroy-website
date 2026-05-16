import Link from 'next/link'
import { Metadata } from 'next'
import PageHeader from '@/components/ui/PageHeader'
import { sanityFetch } from '@/lib/sanity'
import { CORPORATE_PACKAGES_QUERY, SITE_SETTINGS_QUERY } from '@/lib/queries'
import { CorporatePackage, SiteSettings } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Corporate Catering Packages',
  description: 'Professional corporate catering for offices, meetings, and workplace events across Western Sydney. Morning tea, staff lunches, and birthday packages.',
}

const PACKAGE_TYPE_ORDER = [
  'morning_tea',
  'staff_meeting',
  'friday_lunch',
  'birthday_monthly',
  'birthday_individual',
  'custom',
]

export default async function CorporatePage() {
  const [packages, settings] = await Promise.all([
    sanityFetch<CorporatePackage[]>({ query: CORPORATE_PACKAGES_QUERY, revalidate: 300 }).catch(() => []),
    sanityFetch<SiteSettings>({ query: SITE_SETTINGS_QUERY, revalidate: 300 }).catch(() => null),
  ])

  // Fallback static packages when CMS is empty
  const staticPackages: CorporatePackage[] = [
    {
      _id: 'morning-tea',
      title: 'Morning Tea Package',
      slug: { current: 'morning-tea' },
      packageType: 'morning_tea',
      tagline: 'Perfect for team catch-ups',
      description: '',
      inclusions: ['Mixed Danishes & Fresh Strawberries', 'Savoury Pastry Platter', 'Sandwich Platter'],
      pricingTiers: [
        { staffCount: 30, price: 420 },
        { staffCount: 60, price: 790 },
        { staffCount: 90, price: 1150 },
      ],
      order: 1,
    },
    {
      _id: 'staff-meeting',
      title: 'Staff Meeting Package',
      slug: { current: 'staff-meeting' },
      packageType: 'staff_meeting',
      tagline: 'Keep the team fuelled',
      description: '',
      inclusions: ['Seasonal Fresh Fruit Platter', 'Bocconcini Skewer Platter', 'Savoury Pastry Platter'],
      pricingTiers: [
        { staffCount: 30, price: 450 },
        { staffCount: 60, price: 850 },
        { staffCount: 90, price: 1250 },
      ],
      order: 2,
    },
    {
      _id: 'friday-lunch',
      title: 'Friday Lunch Package',
      slug: { current: 'friday-lunch' },
      packageType: 'friday_lunch',
      tagline: 'End the week right',
      description: '',
      inclusions: [
        'Selection of 4 × Hot Platters',
        'Sandwich Platter',
        'Vegetable Rice Paper Rolls',
        "Chef's Selection of Cakes & Slices",
      ],
      pricingTiers: [
        { staffCount: 30, price: 790 },
        { staffCount: 60, price: 1450 },
        { staffCount: 90, price: 2100 },
      ],
      order: 3,
    },
    {
      _id: 'birthday-monthly',
      title: 'Combined Monthly Birthday Lunch',
      slug: { current: 'monthly-birthday' },
      packageType: 'birthday_monthly',
      tagline: 'Celebrate the whole team',
      description: '',
      inclusions: [
        '6 Hot Mixed Platters',
        "Chef's Selection of Cakes & Slices with Birthday Candle",
        '2 × Balloon Columns with Happy Birthday Balloon',
        'Happy Birthday Banner',
        'Delivery Included',
      ],
      pricingTiers: [
        { staffCount: 30, price: 950 },
        { staffCount: 60, price: 1650 },
        { staffCount: 90, price: 2350 },
      ],
      promotion: '10% off when booked for the full year',
      order: 4,
    },
    {
      _id: 'birthday-individual',
      title: 'Individual Birthday Afternoon Tea',
      slug: { current: 'individual-birthday' },
      packageType: 'birthday_individual',
      tagline: 'Make every birthday special',
      description: '',
      inclusions: [
        '2 × Table Balloon Bunches',
        'Happy Birthday Banner',
        'Savoury Pastry Platter',
        'Sandwich Platter',
        'Scones with Jam & Cream',
        "Chef's Selection of Cakes & Slices with Birthday Candle",
        'Delivery Included',
      ],
      pricingTiers: [
        { staffCount: 30, price: 650 },
        { staffCount: 60, price: 1150 },
        { staffCount: 90, price: 1650 },
      ],
      promotion: '15% off annual birthday programs (min. 10 birthdays)',
      order: 5,
    },
  ]

  const displayPackages = packages.length > 0 ? packages : staticPackages
  const sortedPackages = [...displayPackages].sort(
    (a, b) => PACKAGE_TYPE_ORDER.indexOf(a.packageType) - PACKAGE_TYPE_ORDER.indexOf(b.packageType)
  )

  const regularPackages = sortedPackages.filter((p) => !p.packageType.startsWith('birthday'))
  const birthdayPackages = sortedPackages.filter((p) => p.packageType.startsWith('birthday'))

  return (
    <>
      <PageHeader
        label="Corporate Catering"
        title="Corporate Packages"
        subtitle="Professional, reliable catering designed for workplaces, meetings, team celebrations, and corporate events across Western Sydney."
      />

      <section className="py-16 lg:py-20 bg-fitzroy-cream">
        <div className="container-site">

          {/* Intro */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="font-inter text-fitzroy-taupe leading-relaxed">
              Whether you are hosting a morning tea, staff meeting, Friday lunch, or workplace celebration, Fitzroy Catering delivers restaurant-quality food with dependable service and easy ordering. Our packages are built to make organising food simple, with flexible options suitable for offices of all sizes.
            </p>
          </div>

          {/* Standard packages */}
          <div className="space-y-8 mb-20">
            {regularPackages.map((pkg) => (
              <PackageBlock key={pkg._id} pkg={pkg} />
            ))}
          </div>

          {/* Birthday section */}
          {birthdayPackages.length > 0 && (
            <div className="pt-12 border-t border-fitzroy-sand">
              <div className="text-center mb-10">
                <p className="section-label mb-2">Workplace Celebrations</p>
                <h2 className="font-playfair text-3xl text-fitzroy-charcoal">Corporate Birthday Packages</h2>
                <p className="font-inter text-fitzroy-taupe mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
                  Remove the planning stress, celebrate your team, and improve workplace morale. Two packages designed for offices of all sizes.
                </p>
              </div>
              <div className="space-y-8">
                {birthdayPackages.map((pkg) => (
                  <PackageBlock key={pkg._id} pkg={pkg} />
                ))}
              </div>
            </div>
          )}

          {/* Build your own */}
          <div className="mt-16 bg-fitzroy-charcoal p-8 lg:p-12 text-center">
            <p className="section-label text-fitzroy-stone mb-3">Custom Packages</p>
            <h3 className="font-playfair text-3xl text-fitzroy-cream mb-4">Build Your Own Corporate Package</h3>
            <p className="font-inter text-fitzroy-stone text-sm max-w-xl mx-auto mb-6 leading-relaxed">
              Not quite what you&apos;re looking for? Create a custom package that suits your team, event, and dietary requirements. Select from our full menu and we&apos;ll create a tailored quote.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="btn-primary">Get a Custom Quote</Link>
              <Link href="/menu" className="btn-outline-light">View Full Menu</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function PackageBlock({ pkg }: { pkg: CorporatePackage }) {
  return (
    <div className="bg-white border border-fitzroy-sand">
      {pkg.promotion && (
        <div className="bg-fitzroy-sand text-fitzroy-taupe text-xs font-inter px-4 py-2 border-b border-fitzroy-sand/80">
          ★ {pkg.promotion}
        </div>
      )}
      <div className="p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info */}
          <div className="lg:col-span-2">
            {pkg.tagline && <p className="section-label mb-1">{pkg.tagline}</p>}
            <h3 className="font-playfair text-2xl text-fitzroy-charcoal mb-4">{pkg.title}</h3>
            {pkg.inclusions && pkg.inclusions.length > 0 && (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6">
                {pkg.inclusions.map((item, i) => (
                  <li key={i} className="font-inter text-sm text-fitzroy-taupe flex gap-2">
                    <span className="text-fitzroy-bronze shrink-0 mt-0.5">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Pricing + CTA */}
          <div className="flex flex-col justify-between">
            {pkg.pricingTiers && pkg.pricingTiers.length > 0 && (
              <table className="w-full text-sm font-inter mb-4">
                <thead>
                  <tr className="border-b border-fitzroy-sand">
                    <th className="text-left text-xs uppercase tracking-wider text-fitzroy-stone pb-2 font-medium">Staff</th>
                    <th className="text-right text-xs uppercase tracking-wider text-fitzroy-stone pb-2 font-medium">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {pkg.pricingTiers.map((tier) => (
                    <tr key={tier.staffCount} className="border-b border-fitzroy-sand/50">
                      <td className="py-2 text-fitzroy-taupe">{tier.staffCount} staff</td>
                      <td className="py-2 text-right font-playfair text-fitzroy-charcoal text-lg">${tier.price.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <Link href="/contact" className="btn-primary text-center text-xs">
              Schedule Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
