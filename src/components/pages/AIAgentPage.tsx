'use client'

import dynamic from 'next/dynamic'
import { withMobileDetection } from '@/utils/device'

// Desktop components
import { AIAgentPage as DesktopAIAgentPage } from '@/components/sections/AIAgentPage'

// Mobile components
const MobileAIAgentPage = dynamic(() => import('@/components/mobile/sections/AIAgentPage').then(mod => mod.AIAgentPage))

// Combined components with mobile detection
const AIAgentPageComponent = withMobileDetection(DesktopAIAgentPage, MobileAIAgentPage)

export function AIAgentPage() {
  return <AIAgentPageComponent />
}
