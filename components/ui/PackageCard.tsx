import Image from 'next/image'
import { CorporatePackage, PartyPackage } from '@/lib/types'
import { urlFor } from '@/lib/sanity'
import AddToQuoteButton from '@/components/ui/AddToQuoteButton'

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
        {minPrice !== undefined && minPrice !== Infinity && (
          <p className="font-inter text-sm text-fitzroy-stone mt-auto pt-3 border-t border-fitzroy-sand">
            From <span className="font-playfair text-fitzroy-charcoal text-lg">${minPrice.toLocaleString()}</span>
          </p>
        )}
        <div className="mt-4">
          {minPrice !== undefined && minPrice !== Infinity ? (
            <AddToQuoteButton id={pkg._id} name={pkg.title} price={minPrice} quantity="Corporate package · from 15 staff" fullWidth />
          ) : null}
        </div>
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
        <div className="mt-auto pt-3 border-t border-fitzroy-sand">
          <div className="leading-none mb-3">
            <span className="font-inter text-xs text-fitzroy-stone block mb-0.5">From</span>
            <span className="font-playfair text-fitzroy-charcoal text-2xl">${pkg.price.toLocaleString()}</span>
          </div>
          <AddToQuoteButton id={pkg._id} name={pkg.title} price={pkg.price} quantity={pkg.serveNote} fullWidth />
        </div>
      </div>
    </div>
  )
}
