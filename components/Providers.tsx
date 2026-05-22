'use client'

import { ReactNode } from 'react'
import { QuoteProvider } from '@/contexts/QuoteContext'

export default function Providers({ children }: { children: ReactNode }) {
  return <QuoteProvider>{children}</QuoteProvider>
}
