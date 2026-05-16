import { MenuItem } from '@/lib/types'

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
  if (items.length === 0) return null

  return (
    <div className="mb-12">
      <div className="flex items-center gap-4 mb-6">
        <h2 className="font-playfair text-2xl lg:text-3xl text-fitzroy-charcoal whitespace-nowrap">{title}</h2>
        <div className="flex-1 h-px bg-fitzroy-sand" />
        {note && <p className="font-inter text-xs text-fitzroy-stone whitespace-nowrap">{note}</p>}
      </div>
      <div className="divide-y divide-fitzroy-sand">
        {items.map((item) => (
          <div key={item._id} className="py-4 flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-2 flex-wrap">
                <span className="font-inter font-medium text-fitzroy-charcoal text-sm leading-snug">{item.name}</span>
                {item.dietary?.map((d) => (
                  <span key={d} className="dietary-badge">{DIETARY_LABELS[d] ?? d}</span>
                ))}
              </div>
              {item.description && (
                <p className="font-inter text-xs text-fitzroy-stone mt-1 leading-relaxed">{item.description}</p>
              )}
              {item.quantity && (
                <p className="font-inter text-xs text-fitzroy-stone/70 mt-0.5">{item.quantity}</p>
              )}
            </div>
            <div className="text-right shrink-0">
              <span className="font-playfair text-fitzroy-charcoal text-lg">${item.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
