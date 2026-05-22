'use client'

import { Plus, Check } from 'lucide-react'
import { MenuItem } from '@/lib/types'
import { useQuote } from '@/contexts/QuoteContext'

interface MenuSectionProps {
  title: string
  items: MenuItem[]
  note?: string
}

const DIETARY_LABELS: Record<string, string> = {
  V: 'V',
  GF: 'GF',
  DF: 'DF',
  VG: 'VG',
}

export default function MenuSection({ title, items, note }: MenuSectionProps) {
  const { addItem, removeItem, isInQuote } = useQuote()

  if (items.length === 0) return null

  return (
    <div className="mb-12">
      <div className="flex items-center gap-4 mb-6">
        <h2 className="font-playfair text-2xl lg:text-3xl text-fitzroy-charcoal whitespace-nowrap">{title}</h2>
        <div className="flex-1 h-px bg-fitzroy-sand" />
        {note && <p className="font-inter text-xs text-fitzroy-stone whitespace-nowrap">{note}</p>}
      </div>
      <div className="divide-y divide-fitzroy-sand">
        {items.map((item) => {
          const inQuote = isInQuote(item._id)
          return (
            <div key={item._id} className="py-4 flex items-start justify-between gap-4">
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
              <div className="flex items-center gap-3 shrink-0">
                <span className="font-playfair text-fitzroy-charcoal text-lg">${item.price}</span>
                <button
                  onClick={() =>
                    inQuote
                      ? removeItem(item._id)
                      : addItem({
                          id: item._id,
                          name: item.name,
                          price: item.price,
                          quantity: item.quantity,
                        })
                  }
                  aria-label={inQuote ? `Remove ${item.name} from quote` : `Add ${item.name} to quote`}
                  className={`w-7 h-7 flex items-center justify-center border transition-colors duration-150 ${
                    inQuote
                      ? 'bg-fitzroy-sage border-fitzroy-sage text-white'
                      : 'border-fitzroy-sand text-fitzroy-stone hover:border-fitzroy-sage hover:text-fitzroy-sage'
                  }`}
                >
                  {inQuote ? (
                    <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                  ) : (
                    <Plus className="w-3.5 h-3.5" strokeWidth={2} />
                  )}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
