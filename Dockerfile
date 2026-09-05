# ========== 阶段 1：安装依赖 ==========
FROM node:20.12.0-alpine AS deps

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9.12.2 --activate

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

# ========== 阶段 2：构建 ==========
FROM node:20.12.0-alpine AS builder

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9.12.2 --activate

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV NEXT_PUBLIC_APP_NAME="DeAgent AI"
ENV NEXT_PUBLIC_APP_URL="https://deagent.ai"
ENV NEXT_PUBLIC_APP_LOGO="/favicon/favicon.ico"
ENV NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID="9f482f36a7f7da856de7c72de66d3129"

RUN pnpm build && rm -rf .next/cache

# ========== 阶段 3：运行（仅保留 standalone 产物） ==========
FROM node:20.12.0-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_APP_NAME="DeAgent AI"
ENV NEXT_PUBLIC_APP_URL="https://deagent.ai"
ENV NEXT_PUBLIC_APP_LOGO="/favicon/favicon.ico"
ENV NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID="9f482f36a7f7da856de7c72de66d3129"

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
