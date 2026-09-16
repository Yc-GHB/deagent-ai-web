import type { Metadata } from 'next'
import W3LabsPage from '@/components/w3labs/W3LabsPage'

export const metadata: Metadata = {
  title: 'W3Labs | DeAgentAI',
  description: 'Offline community brand incubated by the DeAgentAI Ecosystem Fund.',
}

/**
 * W3Labs 落地页路由。
 */
export default function W3LabsRoutePage() {
  return <W3LabsPage />
}
