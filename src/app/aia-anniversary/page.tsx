import type { Metadata } from 'next'
import AiaAnniversaryApp from '@/components/aia-anniversary/AiaAnniversaryApp'
import '@/components/aia-anniversary/aia-anniversary.css'

export const metadata: Metadata = {
  title: 'AIA 1st Anniversary | Limited Encounter',
  description: 'Create a limited AIA 1st Anniversary holographic BaBa card.',
}

export default function AiaAnniversaryPage() {
  return <AiaAnniversaryApp />
}
