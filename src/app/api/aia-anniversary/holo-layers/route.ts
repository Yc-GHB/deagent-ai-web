import { NextRequest, NextResponse } from 'next/server'
import { generateHoloLayers } from '@/services/gemini-holo-card-service'
import { aiaHoloGenerationQuota } from '@/utils/aia-holo-generation-quota'

export const runtime = 'nodejs'
export const maxDuration = 300

const MAX_FILE_BYTES = 12 * 1024 * 1024
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp'])
const LIMIT_MESSAGE = `You can generate at most ${aiaHoloGenerationQuota.limit} cards.`

function readErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) {
    return error.message
  }
  return '拆层失败'
}

function createQuotaPayload(quota: ReturnType<typeof aiaHoloGenerationQuota.read>) {
  return {
    usedCount: quota.usedCount,
    remainingCount: quota.remainingCount,
    limit: aiaHoloGenerationQuota.limit,
  }
}

/**
 * 查询当前客户端剩余生成次数。
 */
export async function GET(request: NextRequest) {
  const quota = aiaHoloGenerationQuota.read(request)
  return aiaHoloGenerationQuota.attach(
    NextResponse.json({ success: true, ...createQuotaPayload(quota) }),
    quota
  )
}

/**
 * 上传原图，返回 holo-card 四层 PNG data URL。
 */
export async function POST(request: NextRequest) {
  try {
    const currentQuota = aiaHoloGenerationQuota.read(request)
    if (currentQuota.hasReachedLimit) {
      return aiaHoloGenerationQuota.attach(
        NextResponse.json(
          { success: false, error: LIMIT_MESSAGE, ...createQuotaPayload(currentQuota) },
          { status: 429 }
        ),
        currentQuota
      )
    }
    const form = await request.formData()
    const file = form.get('file')
    if (!(file instanceof File)) {
      return NextResponse.json({ success: false, error: '请上传图片' }, { status: 400 })
    }
    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json({ success: false, error: '仅支持 JPG、PNG 或 WEBP' }, { status: 400 })
    }
    if (file.size > MAX_FILE_BYTES) {
      return NextResponse.json({ success: false, error: '图片超过 12MB' }, { status: 400 })
    }
    const consumed = aiaHoloGenerationQuota.consume(request)
    if (!consumed.allowed) {
      return aiaHoloGenerationQuota.attach(
        NextResponse.json(
          { success: false, error: LIMIT_MESSAGE, ...createQuotaPayload(consumed.quota) },
          { status: 429 }
        ),
        consumed.quota
      )
    }
    const buffer = Buffer.from(await file.arrayBuffer())
    const data = await generateHoloLayers({
      mimeType: file.type,
      imageBase64: buffer.toString('base64'),
    })
    return aiaHoloGenerationQuota.attach(
      NextResponse.json({ success: true, data, ...createQuotaPayload(consumed.quota) }),
      consumed.quota
    )
  } catch (error) {
    const quota = aiaHoloGenerationQuota.read(request)
    return aiaHoloGenerationQuota.attach(
      NextResponse.json(
        { success: false, error: readErrorMessage(error), ...createQuotaPayload(quota) },
        { status: 502 }
      ),
      quota
    )
  }
}
