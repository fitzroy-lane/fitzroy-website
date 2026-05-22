'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface QuoteItem {
  id: string
  name: string
  price: number
  quantity?: string
}

interface QuoteContextType {
  items: QuoteItem[]
  addItem: (item: QuoteItem) => void
  removeItem: (id: string) => void
  clearQuote: () => void
  isInQuote: (id: string) => boolean
}

const QuoteContext = createContext<QuoteContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clearQuote: () => {},
  isInQuote: () => false,
})

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<QuoteItem[]>([])

  useEffect(() => {
    try {
      const saved = localStorage.getItem('fitzroy-quote')
      if (saved) setItems(JSON.parse(saved))
    } catch {}
  }, [])

  const persist = (next: QuoteItem[]) => {
    setItems(next)
    localStorage.setItem('fitzroy-quote', JSON.stringify(next))
  }

  const addItem = (item: QuoteItem) =>
    setItems((prev) => {
      if (prev.find((i) => i.id === item.id)) return prev
      const next = [...prev, item]
      localStorage.setItem('fitzroy-quote', JSON.stringify(next))
      return next
    })

  const removeItem = (id: string) =>
    persist(items.filter((i) => i.id !== id))

  const clearQuote = () => {
    setItems([])
    localStorage.removeItem('fitzroy-quote')
  }

  const isInQuote = (id: string) => items.some((i) => i.id === id)

  return (
    <QuoteContext.Provider value={{ items, addItem, removeItem, clearQuote, isInQuote }}>
      {children}
    </QuoteContext.Provider>
  )
}

export const useQuote = () => useContext(QuoteContext)
