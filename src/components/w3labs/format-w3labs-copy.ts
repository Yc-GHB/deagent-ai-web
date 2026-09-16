/**
 * 替换 W3Labs 文案中的 {name} 占位符。
 */
export function formatW3LabsCopy(
  template: string,
  values: Readonly<Record<string, string | number>>
): string {
  return template.replace(/\{(\w+)\}/g, (_match: string, key: string): string => {
    const value = values[key]
    return value === undefined ? `{${key}}` : String(value)
  })
}
