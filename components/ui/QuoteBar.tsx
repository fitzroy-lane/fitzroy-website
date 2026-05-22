'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ShoppingBasket, X, Trash2 } from 'lucide-react'
import { useQuote } from '@/contexts/QuoteContext'

export default function QuoteBar() {
  const { items, removeItem, clearQuote } = useQuote()
  const [open, setOpen] = useState(false)
  const router = useRouter()

  if (items.length === 0) return null

  const total = items.reduce((sum, i) => sum + i.price, 0)

  const handleSendEnquiry = () => {
    setOpen(false)
    router.push('/contact')
  }

  return (
    <>
      {/* Sticky bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-fitzroy-charcoal border-t border-fitzroy-stone/20 shadow-2xl">
        <div className="container-site py-3 flex items-center justify-between gap-4">
          <button onClick={() => setOpen(true)} className="flex items-center gap-3 text-left min-w-0">
            <div className="relative shrink-0">
              <ShoppingBasket className="w-5 h-5 text-fitzroy-sand" strokeWidth={1.5} />
              <span className="absolute -top-1.5 -right-1.5 bg-fitzroy-sage text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {items.length}
              </span>
            </div>
            <div className="min-w-0">
              <p className="font-inter text-fitzroy-cream text-sm font-medium truncate">
                {items.length} item{items.length !== 1 ? 's' : ''} in your quote
              </p>
              <p className="font-inter text-fitzroy-stone text-xs">
                Estimated: ${total.toLocaleString()}
              </p>
            </div>
          </button>
          <button
            onClick={handleSendEnquiry}
            className="btn-primary text-xs py-2 px-5 shrink-0"
          >
            Send Enquiry
          </button>
        </div>
      </div>

      {/* Slide-up drawer */}
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />
          <div className="relative bg-fitzroy-cream max-h-[75vh] flex flex-col rounded-t-lg overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-fitzroy-sand">
              <h3 className="font-playfair text-xl text-fitzroy-charcoal">Your Quote</h3>
              <button onClick={() => setOpen(false)} aria-label="Close">
                <X className="w-5 h-5 text-fitzroy-taupe" strokeWidth={1.5} />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 px-6 divide-y divide-fitzroy-sand">
              {items.map((item) => (
                <div key={item.id} className="py-4 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-inter text-sm text-fitzroy-charcoal font-medium leading-snug">
                      {item.name}
                    </p>
                    {item.quantity && (
                      <p className="font-inter text-xs text-fitzroy-stone mt-0.5">{item.quantity}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="font-playfair text-lg text-fitzroy-charcoal">
                      ${item.price}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remove ${item.name}`}
                      className="text-fitzroy-stone hover:text-fitzroy-clay transition-colors"
                    >
                      <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-6 py-5 border-t border-fitzroy-sand bg-white">
              <div className="flex items-center justify-between mb-4">
                <span className="font-inter text-sm text-fitzroy-taupe">Estimated total</span>
                <span className="font-playfair text-2xl text-fitzroy-charcoal">
                  ${total.toLocaleString()}
                </span>
              </div>
              <p className="font-inter text-xs text-fitzroy-stone mb-4">
                Final price confirmed when we contact you — depends on guest count, delivery, and any customisations.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => { clearQuote(); setOpen(false) }}
                  className="btn-outline text-xs py-2.5 px-4"
                >
                  Clear All
                </button>
                <button
                  onClick={handleSendEnquiry}
                  className="btn-primary text-xs py-2.5 px-4 flex-1 text-center"
                >
                  Complete Enquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
