import { NextResponse } from 'next/server'
import { readTokenHubUsageKpis } from '@/services/platform-usage-service'

/**
 * Token Hub 用量：总量 + 近 15 日柱状图，不把上游路径暴露给浏览器。
 */
export async function GET() {
  try {
    const data = await readTokenHubUsageKpis()
    return NextResponse.json({ success: true, data })
  } catch (error) {
    const message = error instanceof Error ? error.message : '获取用量失败'
    return NextResponse.json({ success: false, error: message }, { status: 502 })
  }
}
