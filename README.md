# DeAgent AI Homepage

DeAgent AI 的官方网站项目，基于 Next.js 14 构建。

## 技术栈

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- Web3 集成

## 开发环境设置

确保你的系统已安装：
- Node.js (推荐 v18+)
- pnpm (推荐的包管理器)

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

### 构建生产版本

```bash
pnpm build
```

### 启动生产版本

```bash
pnpm start
```

## 项目结构

```
src/
  ├── app/              # Next.js 应用入口
  ├── components/       # React 组件
  │   ├── sections/    # 页面区块组件
  │   ├── ui/          # UI 通用组件
  │   └── providers/   # 上下文提供者
  ├── config/          # 配置文件
  └── styles/          # 样式文件
public/               # 静态资源
  ├── images/         # 图片资源
  └── icons/          # 图标资源
```

## 主要功能

- 响应式设计
- Web3 钱包集成
- 动画效果
- 多链支持

## 部署

项目可以部署到任何支持 Node.js 的平台，推荐使用：
- Vercel
- Netlify
- AWS 