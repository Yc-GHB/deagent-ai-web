/**
 * 产品功能开关。下次上线 AI Token Smart Router 时改为 true 即可恢复入口与路由。
 */
export const SHOW_TOKEN_HUB = true;

export const TOKEN_HUB_HREF = "/token-hub" as const;

/**
 * 判断链接是否指向 AI Token Smart Router 产品页。
 */
export function isTokenHubHref(href: string): boolean {
  return href === TOKEN_HUB_HREF || href.startsWith(`${TOKEN_HUB_HREF}/`);
}
