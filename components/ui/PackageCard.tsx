import Link from 'next/link'
import Image from 'next/image'
import { CorporatePackage, PartyPackage } from '@/lib/types'
import { urlFor } from '@/lib/sanity'

interface CorporatePackageCardProps {
  pkg: CorporatePackage
  variant?: 'default' | 'compact'
}

export function CorporatePackageCard({ pkg, variant = 'default' }: CorporatePackageCardProps) {
  const imageUrl = pkg.image ? urlFor(pkg.image).width(600).height(400).url() : null
  const minPrice = pkg.pricingTiers?.reduce((min, t) => Math.min(min, t.price), Infinity)

  return (
    <div className="bg-white border border-fitzroy-sand flex flex-col">
      {imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <Image src={imageUrl} alt={pkg.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
        </div>
      )}
      <div className="p-6 flex flex-col flex-1">
        {pkg.promotion && (
          <div className="bg-fitzroy-sand/50 text-fitzroy-taupe text-xs font-inter px-3 py-1.5 mb-4 -mx-6 -mt-6 border-b border-fitzroy-sand">
            ★ {pkg.promotion}
          </div>
        )}
        <p className="section-label mb-1">{pkg.tagline || ''}</p>
        <h3 className="font-playfair text-xl text-fitzroy-charcoal mb-3">{pkg.title}</h3>
        {variant === 'default' && pkg.inclusions && pkg.inclusions.length > 0 && (
          <ul className="space-y-1.5 mb-4 flex-1">
            {pkg.inclusions.map((item, i) => (
              <li key={i} className="font-inter text-sm text-fitzroy-taupe flex gap-2">
                <span className="text-fitzroy-bronze shrink-0">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
        {minPrice !== Infinity && (
          <p className="font-inter text-sm text-fitzroy-stone mt-auto pt-3 border-t border-fitzroy-sand">
            From <span className="font-playfair text-fitzroy-charcoal text-lg">${minPrice}</span>
          </p>
        )}
        <Link href="/contact" className="btn-primary text-center mt-4 text-xs">
          Enquire Now
        </Link>
      </div>
    </div>
  )
}

interface PartyPackageCardProps {
  pkg: PartyPackage
}

export function PartyPackageCard({ pkg }: PartyPackageCardProps) {
  const imageUrl = pkg.image ? urlFor(pkg.image).width(600).height(400).url() : null

  return (
    <div className="bg-white border border-fitzroy-sand flex flex-col">
      {imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <Image src={imageUrl} alt={pkg.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
        </div>
      )}
      <div className="p-6 flex flex-col flex-1">
        {pkg.tagline && <p className="section-label mb-1">{pkg.tagline}</p>}
        <h3 className="font-playfair text-xl text-fitzroy-charcoal mb-1">{pkg.title}</h3>
        {pkg.serveNote && <p className="font-inter text-xs text-fitzroy-stone mb-2">{pkg.serveNote}</p>}
        {pkg.description && (
          <p className="font-inter text-sm text-fitzroy-taupe leading-relaxed mb-3">{pkg.description}</p>
        )}
        {pkg.inclusions && pkg.inclusions.length > 0 && (
          <ul className="space-y-1.5 mb-4 flex-1">
            {pkg.inclusions.map((item, i) => (
              <li key={i} className="font-inter text-sm text-fitzroy-taupe flex gap-2">
                <span className="text-fitzroy-bronze shrink-0">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto pt-3 border-t border-fitzroy-sand flex items-center justify-between">
          <span className="font-playfair text-fitzroy-charcoal text-2xl">${pkg.price.toLocaleString()}</span>
          <Link href="/contact" className="btn-primary text-xs py-2 px-4">
            Enquire
          </Link>
        </div>
      </div>
    </div>
  )
}
