import { redirect } from 'next/navigation'
import TokenHubPage from '@/components/site-redesign/pages/TokenHubPage'
import { SHOW_TOKEN_HUB } from '@/config/feature-flags'

export default function TokenHubRoutePage() {
  if (!SHOW_TOKEN_HUB) redirect('/')
  return <TokenHubPage />
}
