import { SiteSettings } from '@/lib/types'

const SERVICE_AREAS = [
  'Seven Hills', 'Blacktown', 'Parramatta', 'Baulkham Hills', 'Bella Vista',
  'Norwest', 'Castle Hill', 'Kellyville', 'Quakers Hill', 'Toongabbie',
  'Winston Hills', 'Wentworthville', 'Glenwood', 'Rouse Hill', 'Westmead',
]

export default function StructuredData({ settings }: { settings: SiteSettings | null }) {
  const baseUrl = 'https://fitzroycatering.com.au'

  const data = {
    '@context': 'https://schema.org',
    '@type': ['Caterer', 'FoodEstablishment', 'LocalBusiness'],
    '@id': `${baseUrl}/#business`,
    name: 'Fitzroy Catering',
    description:
      'Professional, reliable, restaurant-quality catering for corporate, community, and private events across Western Sydney. Based in Seven Hills.',
    url: baseUrl,
    image: `${baseUrl}/opengraph-image.png`,
    logo: `${baseUrl}/logos/logo-sage.png`,
    ...(settings?.phone ? { telephone: settings.phone } : {}),
    email: settings?.email || 'catering@fitzroylane.com',
    priceRange: '$$',
    servesCuisine: ['Catering', 'Australian', 'Mediterranean', 'Asian'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Seven Hills',
      addressRegion: 'NSW',
      postalCode: '2147',
      addressCountry: 'AU',
    },
    areaServed: SERVICE_AREAS.map((name) => ({
      '@type': 'City',
      name,
    })),
    parentOrganization: {
      '@type': 'Restaurant',
      name: 'Fitzroy Lane',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Seven Hills',
        addressRegion: 'NSW',
        addressCountry: 'AU',
      },
    },
    sameAs: [settings?.instagram, settings?.facebook].filter(Boolean),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
