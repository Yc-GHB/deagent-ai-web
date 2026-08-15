import type { Metadata } from 'next'
import BuybackPage from '@/components/site-redesign/pages/BuybackPage'

export const metadata: Metadata = {
  title: 'AIA Buyback & Burn Tracker | DeAgent AI',
  description: 'Transparent buybacks, verifiable burns, and sustainable token economics in real time.',
}

export default function Page() {
  return <BuybackPage />
}
