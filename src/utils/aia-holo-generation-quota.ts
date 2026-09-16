import { NextRequest, NextResponse } from 'next/server'

const COOKIE_NAME = 'aia-holo-gen-count' as const
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365
const GENERATION_LIMIT = 5
const ipUsedCountMap = new Map<string, number>()

type QuotaSnapshot = {
  readonly usedCount: number
  readonly remainingCount: number
  readonly hasReachedLimit: boolean
}

type ConsumeResult = {
  readonly allowed: boolean
  readonly quota: QuotaSnapshot
}

function readClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0]?.trim() || 'unknown'
  }
  return request.headers.get('x-real-ip') || 'unknown'
}

function parseUsedCount(raw: string | undefined): number {
  const parsed = Number.parseInt(raw || '0', 10)
  if (!Number.isFinite(parsed) || parsed < 0) {
    return 0
  }
  return Math.min(GENERATION_LIMIT, parsed)
}

function createQuota(usedCount: number): QuotaSnapshot {
  return {
    usedCount,
    remainingCount: GENERATION_LIMIT - usedCount,
    hasReachedLimit: usedCount >= GENERATION_LIMIT,
  }
}

function readUsedCount(request: NextRequest): number {
  const ip = readClientIp(request)
  const cookieCount = parseUsedCount(request.cookies.get(COOKIE_NAME)?.value)
  const ipCount = ipUsedCountMap.get(ip) || 0
  return Math.max(cookieCount, ipCount)
}

function persistUsedCount(request: NextRequest, usedCount: number): void {
  ipUsedCountMap.set(readClientIp(request), usedCount)
}

function applyQuotaCookie(response: NextResponse, usedCount: number): NextResponse {
  response.cookies.set({
    name: COOKIE_NAME,
    value: String(usedCount),
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: COOKIE_MAX_AGE_SECONDS,
  })
  return response
}

/**
 * AIA 全息卡生成次数配额：每客户端最多 5 次。
 */
export const aiaHoloGenerationQuota = {
  limit: GENERATION_LIMIT,
  read(request: NextRequest): QuotaSnapshot {
    return createQuota(readUsedCount(request))
  },
  consume(request: NextRequest): ConsumeResult {
    const usedCount = readUsedCount(request)
    if (usedCount >= GENERATION_LIMIT) {
      persistUsedCount(request, usedCount)
      return { allowed: false, quota: createQuota(usedCount) }
    }
    const nextUsedCount = usedCount + 1
    persistUsedCount(request, nextUsedCount)
    return { allowed: true, quota: createQuota(nextUsedCount) }
  },
  attach(response: NextResponse, quota: QuotaSnapshot): NextResponse {
    return applyQuotaCookie(response, quota.usedCount)
  },
}
