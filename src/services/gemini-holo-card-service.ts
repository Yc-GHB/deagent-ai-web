import { readFile } from 'fs/promises'
import path from 'path'
import sharp from 'sharp'
import type { GenerateHoloLayersInput, HoloCardLayers } from '@/types/holo-card'
import {
  BACKGROUND_PROMPT,
  OVERLAY_MASK_PROMPT,
  SUBJECT_MASK_PROMPT,
} from '@/services/holo-layer-prompts'

const GEMINI_ENDPOINT =
  'https://generativelanguage.googleapis.com/v1beta/models'
const DEFAULT_IMAGE_MODEL = 'gemini-3-pro-image'
const FALLBACK_IMAGE_MODELS: readonly string[] = [
  'gemini-3.1-flash-image',
  'gemini-2.5-flash-image',
]
const CARD_WIDTH = 720
const CARD_HEIGHT = 1280
const CARD_STAGE = { r: 11, g: 18, b: 20, alpha: 1 } as const
const BUNDLED_HOLO_DIR = path.join(process.cwd(), 'public', 'aia-anniversary', 'assets', 'holo')

interface GeminiInlineData {
  readonly mimeType?: string;
  readonly mime_type?: string;
  readonly data?: string;
}

interface GeminiPart {
  readonly text?: string;
  readonly inlineData?: GeminiInlineData;
  readonly inline_data?: GeminiInlineData;
}

interface GeminiResponse {
  readonly error?: { readonly message?: string; readonly status?: string };
  readonly promptFeedback?: { readonly blockReason?: string };
  readonly candidates?: ReadonlyArray<{
    readonly content?: { readonly parts?: readonly GeminiPart[] };
    readonly finishReason?: string;
  }>;
}

function readApiKey(): string {
  const apiKey = process.env.GEMINI_API_KEY?.trim()
  if (!apiKey) {
    throw new Error('未配置 GEMINI_API_KEY')
  }
  return apiKey
}

function readPreferredModel(): string {
  return process.env.GEMINI_IMAGE_MODEL?.trim() || DEFAULT_IMAGE_MODEL
}

function listImageModels(): readonly string[] {
  const preferred = readPreferredModel()
  return [
    preferred,
    ...FALLBACK_IMAGE_MODELS.filter(model => model !== preferred),
  ]
}

function readInlineData(part: GeminiPart): GeminiInlineData | null {
  return part.inlineData ?? part.inline_data ?? null
}

function readBlockedReason(payload: GeminiResponse): string {
  return (
    payload.promptFeedback?.blockReason ||
    payload.candidates?.[0]?.finishReason ||
    payload.error?.message ||
    ''
  )
}

function describeGenerationError(reason: string): string {
  const normalized = reason.toUpperCase()
  if (
    normalized.includes('PROHIBITED_CONTENT') ||
    normalized.includes('SAFETY') ||
    normalized.includes('BLOCK')
  ) {
    return 'This image or prompt was blocked by the safety filter (PROHIBITED_CONTENT). Please try an original illustration or mascot. Do not use photos of real people, minors, or copyrighted characters.'
  }
  return reason || 'The model did not return an image.'
}

function extractImageDataUrl(payload: GeminiResponse): string {
  const parts = payload.candidates?.[0]?.content?.parts ?? []
  const inline = parts.map(readInlineData).find(item => item?.data)
  if (!inline?.data) {
    throw new Error(describeGenerationError(readBlockedReason(payload)))
  }
  const mimeType = inline.mimeType || inline.mime_type || 'image/png'
  return `data:${mimeType};base64,${inline.data}`
}

function parseDataUrl(dataUrl: string): GenerateHoloLayersInput {
  const matched = /^data:([^;]+);base64,(.+)$/.exec(dataUrl)
  if (!matched) {
    throw new Error('卡片数据无效')
  }
  return { mimeType: matched[1], imageBase64: matched[2] }
}

function toDataUrl(buffer: Buffer, mimeType: string): string {
  return `data:${mimeType};base64,${buffer.toString('base64')}`
}

async function normalizeSource(source: Buffer): Promise<Buffer> {
  return sharp(source)
    .rotate()
    .resize(CARD_WIDTH, CARD_HEIGHT, { fit: 'cover', position: 'centre' })
    .flatten({ background: CARD_STAGE })
    .png()
    .toBuffer()
}

async function normalizeGeneratedMask(dataUrl: string): Promise<Buffer> {
  const parsed = parseDataUrl(dataUrl)
  return sharp(Buffer.from(parsed.imageBase64, 'base64'))
    .rotate()
    .resize(CARD_WIDTH, CARD_HEIGHT, { fit: 'fill' })
    .flatten({ background: { r: 0, g: 0, b: 0 } })
    .grayscale()
    .threshold(128)
    .blur(0.45)
    .png()
    .toBuffer()
}

async function createColorLayer(source: Buffer, mask: Buffer): Promise<Buffer> {
  return sharp(source)
    .removeAlpha()
    .joinChannel(mask)
    .png()
    .toBuffer()
}

async function readBundledLayer(fileName: string): Promise<Buffer> {
  const filePath = path.join(BUNDLED_HOLO_DIR, fileName)
  return sharp(await readFile(filePath))
    .resize(CARD_WIDTH, CARD_HEIGHT, { fit: 'fill' })
    .png()
    .toBuffer()
}

async function createUiLayer(source: Buffer, mask: Buffer): Promise<string> {
  const artworkOverlay = await createColorLayer(source, mask)
  const anniversaryOverlay = await readBundledLayer('aia-ui.png')
  const buffer = await sharp(artworkOverlay)
    .composite([{ input: anniversaryOverlay, blend: 'over' }])
    .png()
    .toBuffer()
  return toDataUrl(buffer, 'image/png')
}

async function createStructureFromCharacter(characterBuffer: Buffer): Promise<string> {
  const { data, info } = await sharp(characterBuffer)
    .ensureAlpha()
    .resize(CARD_WIDTH, CARD_HEIGHT, { fit: 'fill' })
    .raw()
    .toBuffer({ resolveWithObject: true })
  const width = info.width
  const height = info.height
  const channels = info.channels
  const outline = Buffer.alloc(width * height * 4)
  const readAlpha = (x: number, y: number): number => {
    if (x < 0 || y < 0 || x >= width || y >= height) {
      return 0
    }
    return data[(y * width + x) * channels + 3]
  }
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const magnitude = Math.min(
        255,
        Math.hypot(readAlpha(x + 1, y) - readAlpha(x - 1, y), readAlpha(x, y + 1) - readAlpha(x, y - 1)) * 1.6,
      )
      const index = (y * width + x) * 4
      outline[index] = 255
      outline[index + 1] = 255
      outline[index + 2] = 255
      outline[index + 3] = magnitude > 24 ? magnitude : 0
    }
  }
  const buffer = await sharp(outline, {
    raw: { width, height, channels: 4 },
  })
    .png()
    .toBuffer()
  return toDataUrl(buffer, 'image/png')
}

async function flattenOpaque(dataUrl: string): Promise<string> {
  const parsed = parseDataUrl(dataUrl)
  const buffer = await sharp(Buffer.from(parsed.imageBase64, 'base64'))
    .rotate()
    .resize(CARD_WIDTH, CARD_HEIGHT, { fit: 'cover' })
    .flatten({ background: CARD_STAGE })
    .png()
    .toBuffer()
  return toDataUrl(buffer, 'image/png')
}

function buildImageRequest(params: {
  readonly input: GenerateHoloLayersInput;
  readonly prompt: string;
  readonly model: string;
}): string {
  const imageConfig: { aspectRatio: string; imageSize?: string } = {
    aspectRatio: '9:16',
  }
  if (params.model.includes('pro-image') || params.model.includes('flash-image')) {
    imageConfig.imageSize = '1K'
  }
  return JSON.stringify({
    contents: [
      {
        parts: [
          { text: params.prompt },
          {
            inline_data: {
              mime_type: params.input.mimeType,
              data: params.input.imageBase64,
            },
          },
        ],
      },
    ],
    generationConfig: {
      responseModalities: ['TEXT', 'IMAGE'],
      imageConfig,
    },
  })
}

async function requestGeminiImage(params: {
  readonly apiKey: string;
  readonly model: string;
  readonly body: string;
}): Promise<GeminiResponse> {
  const response = await fetch(
    `${GEMINI_ENDPOINT}/${params.model}:generateContent`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': params.apiKey,
      },
      body: params.body,
      cache: 'no-store',
    },
  )
  const payload = (await response.json()) as GeminiResponse
  if (!response.ok || payload.error) {
    const error = new Error(
      payload.error?.message || `Gemini 请求失败 (${response.status})`,
    )
    Object.assign(error, {
      status: response.status,
      code: payload.error?.status,
    })
    throw error
  }
  return payload
}

function isModelMissing(error: unknown): boolean {
  if (!(error instanceof Error)) {
    return false
  }
  const status = (error as Error & { status?: number }).status
  const message = error.message.toLowerCase()
  return (
    status === 404 ||
    message.includes('not found') ||
    message.includes('is not found')
  )
}

async function generateNamedImage(
  input: GenerateHoloLayersInput,
  prompt: string,
): Promise<string> {
  const apiKey = readApiKey()
  let lastError: unknown = null
  for (const model of listImageModels()) {
    try {
      const payload = await requestGeminiImage({
        apiKey,
        model,
        body: buildImageRequest({ input, prompt, model }),
      })
      return extractImageDataUrl(payload)
    } catch (error) {
      lastError = error
      if (!isModelMissing(error)) {
        throw error
      }
    }
  }
  throw lastError instanceof Error ? lastError : new Error('生图失败')
}

/**
 * Gemini only restores the hidden background and predicts aligned binary masks.
 * The visible character and uploaded graphic overlays always come from the
 * normalized source pixels, preventing subject redraws and rectangular layers.
 */
export async function generateHoloLayers(
  input: GenerateHoloLayersInput,
): Promise<HoloCardLayers> {
  const source = Buffer.from(input.imageBase64, 'base64')
  const normalizedSource = await normalizeSource(source)
  const reference: GenerateHoloLayersInput = {
    mimeType: 'image/png',
    imageBase64: normalizedSource.toString('base64'),
  }

  const [backgroundImage, subjectMaskImage, overlayMaskImage] = await Promise.all([
    generateNamedImage(reference, BACKGROUND_PROMPT),
    generateNamedImage(reference, SUBJECT_MASK_PROMPT),
    generateNamedImage(reference, OVERLAY_MASK_PROMPT),
  ])

  const [background, subjectMask, overlayMask] = await Promise.all([
    flattenOpaque(backgroundImage),
    normalizeGeneratedMask(subjectMaskImage),
    normalizeGeneratedMask(overlayMaskImage),
  ])
  const characterBuffer = await createColorLayer(normalizedSource, subjectMask)
  const [ui, structure] = await Promise.all([
    createUiLayer(normalizedSource, overlayMask),
    createStructureFromCharacter(characterBuffer),
  ])
  const character = toDataUrl(characterBuffer, 'image/png')
  return { background, character, ui, structure }
}
