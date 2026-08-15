# 更改日志

## 2024-03-13

### 添加视频加载占位图功能

- 修改了 `src/components/mobile/sections/Hero.tsx` 和 `src/components/sections/Hero.tsx` 文件
- 添加了视频加载状态检测逻辑
- 在视频加载完成前显示 `video-loading.png` 占位图片
- 使用 `useRef` 和 `onCanPlay` 事件监听视频加载状态
- 通过 CSS 类控制视频和占位图的显示/隐藏

### 修改文件列表
- `src/components/mobile/sections/Hero.tsx`
- `src/components/sections/Hero.tsx`

## 2024-03-11

### 修复页面加载脚本错误

- 修复了 `src/app/layout.tsx` 文件中的脚本错误
- 解决了 `Uncaught TypeError: Cannot read properties of null (reading 'classList')` 错误
- 使用更安全的方式处理页面加载过渡效果
- 简化了页面加载逻辑，直接使用CSS过渡

### 修改文件列表
- `src/app/layout.tsx`

### 修复页面加载闪烁问题

- 修改了 `src/app/layout.tsx` 文件，添加全局过渡效果
- 修改了 `src/components/pages/NewHome/page.tsx` 文件，优化动画过渡
- 修改了 `src/components/sections/Hero.tsx` 文件，使用requestAnimationFrame和条件渲染
- 修改了 `src/components/mobile/sections/Hero.tsx` 文件，优化动画过渡
- 减少了动画持续时间，使过渡更加平滑
- 使用opacity控制可见性，而不是条件渲染

### 修改文件列表
- `src/app/layout.tsx`
- `src/components/pages/NewHome/page.tsx`
- `src/components/sections/Hero.tsx`
- `src/components/mobile/sections/Hero.tsx`

### 移除"正在连接Web3..."提示信息

- 修改了 `src/components/providers/Web3Provider.tsx` 文件
- 移除了未挂载状态下显示的"正在连接 Web3..."提示信息
- 提高了页面加载速度和用户体验

### 修改文件列表
- `src/components/providers/Web3Provider.tsx`

### 移除页面加载时的loading效果

- 修改了 `src/components/layouts/ClientLayout.tsx` 文件
- 移除了 `isLoading` 状态和2秒的定时器
- 移除了对 `LoadingWeb3` 组件的引用和导入
- 直接返回 `Web3Provider` 包裹的内容，提高页面加载速度

### 修改文件列表
- `src/components/layouts/ClientLayout.tsx`
