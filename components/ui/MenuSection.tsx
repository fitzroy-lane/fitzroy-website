'use client'

import Image from 'next/image'
import { Plus, Minus } from 'lucide-react'
import { MenuItem, SanityImage } from '@/lib/types'
import { useQuote } from '@/contexts/QuoteContext'
import { urlFor } from '@/lib/sanity'

interface MenuSectionProps {
  title: string
  items: MenuItem[]
  note?: string
  categoryImage?: SanityImage
}

const DIETARY_LABELS: Record<string, string> = {
  V: 'V',
  GF: 'GF',
  DF: 'DF',
  VG: 'VG',
}

export default function MenuSection({ title, items, note, categoryImage }: MenuSectionProps) {
  const { items: quoteItems, addItem, incrementItem, decrementItem } = useQuote()

  if (items.length === 0) return null

  return (
    <div className="mb-14">
      {/* Category header image */}
      {categoryImage && (
        <div className="relative w-full h-48 lg:h-60 overflow-hidden mb-6">
          <Image
            src={urlFor(categoryImage).width(1200).height(480).url()}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1200px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-fitzroy-charcoal/70 via-fitzroy-charcoal/30 to-transparent" />
          <div className="absolute inset-0 flex items-end p-6">
            <h2 className="font-playfair text-2xl lg:text-3xl text-fitzroy-cream [text-shadow:0_2px_8px_rgba(0,0,0,0.4)]">
              {title}
            </h2>
          </div>
        </div>
      )}

      {/* Section title (shown when no category image) */}
      {!categoryImage && (
        <div className="flex items-center gap-4 mb-6">
          <h2 className="font-playfair text-2xl lg:text-3xl text-fitzroy-charcoal whitespace-nowrap">
            {title}
          </h2>
          <div className="flex-1 h-px bg-fitzroy-sand" />
          {note && <p className="font-inter text-xs text-fitzroy-stone whitespace-nowrap">{note}</p>}
        </div>
      )}

      {/* Note shown below image header */}
      {categoryImage && note && (
        <p className="font-inter text-xs text-fitzroy-stone mb-4 -mt-2">{note}</p>
      )}

      <div className="divide-y divide-fitzroy-sand">
        {items.map((item) => {
          const count = quoteItems.find((q) => q.id === item._id)?.count ?? 0
          const thumbUrl = item.image
            ? urlFor(item.image).width(160).height(160).url()
            : null

          return (
            <div key={item._id} className="py-4 flex items-start gap-4">
              {/* Per-item thumbnail */}
              {thumbUrl && (
                <div className="relative w-24 h-24 lg:w-28 lg:h-28 shrink-0 overflow-hidden bg-fitzroy-sand/30">
                  <Image
                    src={thumbUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="112px"
                  />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2 flex-wrap">
                  <span className="font-inter font-medium text-fitzroy-charcoal text-sm leading-snug">
                    {item.name}
                  </span>
                  {item.dietary?.map((d) => (
                    <span key={d} className="dietary-badge">{DIETARY_LABELS[d] ?? d}</span>
                  ))}
                </div>
                {item.description && (
                  <p className="font-inter text-xs text-fitzroy-stone mt-1 leading-relaxed">
                    {item.description}
                  </p>
                )}
                {item.quantity && (
                  <p className="font-inter text-xs text-fitzroy-stone/70 mt-0.5">{item.quantity}</p>
                )}
              </div>

              <div className="flex flex-col items-end gap-2 shrink-0">
                <span className="font-playfair text-fitzroy-charcoal text-lg">${item.price}</span>
                {count === 0 ? (
                  <button
                    onClick={() =>
                      addItem({
                        id: item._id,
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                      })
                    }
                    aria-label={`Add ${item.name} to quote`}
                    className="flex items-center gap-1.5 border border-fitzroy-sand text-fitzroy-stone hover:border-fitzroy-sage hover:text-fitzroy-sage px-3 py-1.5 transition-colors duration-150 font-inter text-xs whitespace-nowrap"
                  >
                    <Plus className="w-3 h-3" strokeWidth={2} /> Add to Quote
                  </button>
                ) : (
                  <div className="flex items-center border border-fitzroy-sage">
                    <button
                      onClick={() => decrementItem(item._id)}
                      aria-label={`Decrease ${item.name}`}
                      className="w-8 h-8 flex items-center justify-center text-fitzroy-sage hover:bg-fitzroy-sage/10 transition-colors"
                    >
                      <Minus className="w-3 h-3" strokeWidth={2} />
                    </button>
                    <span className="w-8 text-center font-inter text-sm text-fitzroy-charcoal">{count}</span>
                    <button
                      onClick={() => incrementItem(item._id)}
                      aria-label={`Increase ${item.name}`}
                      className="w-8 h-8 flex items-center justify-center text-fitzroy-sage hover:bg-fitzroy-sage/10 transition-colors"
                    >
                      <Plus className="w-3 h-3" strokeWidth={2} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
