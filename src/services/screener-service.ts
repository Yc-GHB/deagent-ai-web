import type {
  MarketsResponse,
  RunQuery,
  RunResponse,
  WaitlistRequest,
  WaitlistResponse,
} from '@/types/screener'
import { ScreenerApiError } from '@/types/screener'

const MARKETS_PATH = '/v1/screener/markets'
const RUN_PATH = '/v1/screener/run'
const WAITLIST_PATH = '/v1/waitlist'
const RUN_LIMIT = 30

function readRetryAfterSeconds(response: Response): number | undefined {
  const raw = response.headers.get('Retry-After')
  if (!raw) return undefined
  const seconds = Number(raw)
  return Number.isFinite(seconds) && seconds > 0 ? seconds : undefined
}

function readErrorMessage(payload: unknown): string {
  if (!payload || typeof payload !== 'object') return 'Request failed'
  const detail = (payload as { detail?: unknown }).detail
  if (typeof detail === 'string' && detail) return detail
  return 'Request failed'
}

async function parseJson(response: Response): Promise<unknown> {
  try {
    return await response.json()
  } catch {
    return null
  }
}

async function requestJson<T>(input: string, init: RequestInit): Promise<T> {
  const response = await fetch(input, {
    ...init,
    headers: {
      accept: 'application/json',
      ...(init.headers ?? {}),
    },
  })
  const requestId = response.headers.get('X-Request-Id') ?? undefined
  const retryAfterSeconds = readRetryAfterSeconds(response)
  if (!response.ok) {
    const payload = await parseJson(response)
    if (typeof console !== 'undefined' && requestId) {
      console.error('[screener]', { status: response.status, requestId })
    }
    throw new ScreenerApiError({
      status: response.status,
      message: readErrorMessage(payload),
      requestId,
      retryAfterSeconds,
    })
  }
  return (await parseJson(response)) as T
}

/**
 * 获取 Hyperliquid 全市场快照。
 */
export async function fetchScreenerMarkets(signal?: AbortSignal): Promise<MarketsResponse> {
  return requestJson<MarketsResponse>(MARKETS_PATH, { method: 'GET', signal })
}

/**
 * 在当前快照上执行一种筛选策略。
 */
export async function fetchScreenerRun(query: RunQuery, signal?: AbortSignal): Promise<RunResponse> {
  const params = new URLSearchParams({
    strategy: query.strategy,
    group: query.group,
    vol: String(query.vol),
    fund: String(query.fund),
    chg: String(query.chg),
    guard: String(query.guard),
    limit: String(query.limit),
    locale: query.locale,
  })
  return requestJson<RunResponse>(`${RUN_PATH}?${params.toString()}`, { method: 'GET', signal })
}

/**
 * 提交候补名单邮箱；同一邮箱幂等。
 */
export async function submitWaitlist(body: WaitlistRequest): Promise<WaitlistResponse> {
  return requestJson<WaitlistResponse>(WAITLIST_PATH, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

export { RUN_LIMIT }
