# 使用 Node.js 20.12.0 官方镜像
FROM node:20.12.0

# 设置工作目录
WORKDIR /app

# 安装与 packageManager 一致的 pnpm（兼容 Node 20）
RUN npm install -g pnpm@9.12.2

# 验证版本
RUN node -v && pnpm -v

# 复制 package.json 和 pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# 安装依赖
RUN pnpm install

# 复制其他文件
COPY . .

# 设置环境变量
ENV NODE_ENV=production
ENV NEXT_PUBLIC_APP_NAME="DeAgent AI"
ENV NEXT_PUBLIC_APP_URL="https://deagent.ai"
ENV NEXT_PUBLIC_APP_LOGO="/favicon/favicon.ico"
ENV NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID="9f482f36a7f7da856de7c72de66d3129"

# 构建应用
RUN pnpm build

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["pnpm", "start"]
