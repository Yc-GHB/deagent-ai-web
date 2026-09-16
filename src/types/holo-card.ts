/** 光栅卡四层素材。 */
export interface HoloCardLayers {
  readonly background: string
  readonly character: string
  readonly ui: string
  readonly structure: string
}

/** 需要拆出的图层种类。 */
export type HoloLayerKind = keyof HoloCardLayers

/** 服务端拆层入参。 */
export interface GenerateHoloLayersInput {
  readonly mimeType: string
  readonly imageBase64: string
}
