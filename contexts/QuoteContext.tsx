'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface QuoteItem {
  id: string
  name: string
  price: number
  quantity?: string
  count: number
}

interface QuoteContextType {
  items: QuoteItem[]
  addItem: (item: Omit<QuoteItem, 'count'>) => void
  removeItem: (id: string) => void
  incrementItem: (id: string) => void
  decrementItem: (id: string) => void
  clearQuote: () => void
  isInQuote: (id: string) => boolean
  totalCount: number
}

const QuoteContext = createContext<QuoteContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  incrementItem: () => {},
  decrementItem: () => {},
  clearQuote: () => {},
  isInQuote: () => false,
  totalCount: 0,
})

const STORAGE_KEY = 'fitzroy-quote'

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<QuoteItem[]>([])

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        // Backfill count for any items saved before counts existed
        const parsed: QuoteItem[] = JSON.parse(saved).map((i: QuoteItem) => ({
          ...i,
          count: i.count && i.count > 0 ? i.count : 1,
        }))
        setItems(parsed)
      }
    } catch {}
  }, [])

  const persist = (next: QuoteItem[]) => {
    setItems(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }

  const addItem = (item: Omit<QuoteItem, 'count'>) =>
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      const next = existing
        ? prev.map((i) => (i.id === item.id ? { ...i, count: i.count + 1 } : i))
        : [...prev, { ...item, count: 1 }]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })

  const incrementItem = (id: string) =>
    setItems((prev) => {
      const next = prev.map((i) => (i.id === id ? { ...i, count: i.count + 1 } : i))
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })

  const decrementItem = (id: string) =>
    setItems((prev) => {
      const next = prev
        .map((i) => (i.id === id ? { ...i, count: i.count - 1 } : i))
        .filter((i) => i.count > 0)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })

  const removeItem = (id: string) =>
    persist(items.filter((i) => i.id !== id))

  const clearQuote = () => {
    setItems([])
    localStorage.removeItem(STORAGE_KEY)
  }

  const isInQuote = (id: string) => items.some((i) => i.id === id)
  const totalCount = items.reduce((sum, i) => sum + i.count, 0)

  return (
    <QuoteContext.Provider
      value={{ items, addItem, removeItem, incrementItem, decrementItem, clearQuote, isInQuote, totalCount }}
    >
      {children}
    </QuoteContext.Provider>
  )
}

export const useQuote = () => useContext(QuoteContext)
