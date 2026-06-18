'use client'

import { Plus, Minus } from 'lucide-react'
import { useQuote } from '@/contexts/QuoteContext'

interface AddToQuoteButtonProps {
  id: string
  name: string
  price: number
  quantity?: string
  fullWidth?: boolean
}

export default function AddToQuoteButton({ id, name, price, quantity, fullWidth }: AddToQuoteButtonProps) {
  const { items, addItem, incrementItem, decrementItem } = useQuote()
  const count = items.find((q) => q.id === id)?.count ?? 0

  if (count === 0) {
    return (
      <button
        onClick={() => addItem({ id, name, price, quantity })}
        className={`btn-primary text-xs inline-flex items-center justify-center gap-1.5 ${fullWidth ? 'w-full' : ''}`}
      >
        <Plus className="w-3.5 h-3.5" strokeWidth={2} /> Add to Quote
      </button>
    )
  }

  return (
    <div className={`flex items-center border border-fitzroy-sage ${fullWidth ? 'w-full' : 'inline-flex'}`}>
      <button
        onClick={() => decrementItem(id)}
        aria-label={`Decrease ${name}`}
        className="w-9 h-9 flex items-center justify-center text-fitzroy-sage hover:bg-fitzroy-sage/10 transition-colors shrink-0"
      >
        <Minus className="w-3.5 h-3.5" strokeWidth={2} />
      </button>
      <span className="flex-1 text-center font-inter text-xs text-fitzroy-charcoal whitespace-nowrap px-2">
        {count} in quote
      </span>
      <button
        onClick={() => incrementItem(id)}
        aria-label={`Increase ${name}`}
        className="w-9 h-9 flex items-center justify-center text-fitzroy-sage hover:bg-fitzroy-sage/10 transition-colors shrink-0"
      >
        <Plus className="w-3.5 h-3.5" strokeWidth={2} />
      </button>
    </div>
  )
}
