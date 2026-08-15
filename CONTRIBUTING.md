# DeAgent AI 项目规范

## 代码风格规范

### TypeScript 规范

- 使用 TypeScript 严格模式 (`strict: true`)
- 明确声明所有类型，避免使用 `any`
- 使用 interface 定义对象类型，type 定义联合类型或工具类型
- 使用 PascalCase 命名类型和接口
- 使用 camelCase 命名变量和函数

### React/Next.js 规范

- 使用函数组件和 Hooks
- 组件文件使用 PascalCase 命名
- 每个文件只导出一个组件
- Props 类型使用 interface 定义，并以组件名 + Props 命名
- 使用 JSDoc 注释描述组件功能

```typescript
interface ButtonProps {
  /** 按钮文字 */
  children: React.ReactNode
  /** 点击事件处理函数 */
  onClick?: () => void
  /** 是否禁用 */
  disabled?: boolean
}

/** 自定义按钮组件 */
export function Button({ children, onClick, disabled }: ButtonProps) {
  // ...
}
```

### 样式规范

- 使用 Tailwind CSS 工具类
- 遵循移动优先的响应式设计
- 自定义类名使用 kebab-case
- 组件级别的样式写在组件同名的 .module.css 文件中

### 文件组织

```
src/
  ├── components/          # 组件目录
  │   ├── common/         # 通用组件
  │   ├── layout/         # 布局组件
  │   └── sections/       # 页面区块组件
  ├── hooks/              # 自定义 Hooks
  ├── types/              # TypeScript 类型定义
  ├── utils/              # 工具函数
  └── config/             # 配置文件
```

## Git 工作流规范

### 分支管理

- main: 主分支，用于生产环境
- develop: 开发分支，用于开发环境
- feature/*: 功能分支
- bugfix/*: 修复分支
- release/*: 发布分支

### 提交规范

使用 Angular 提交规范：

- feat: 新功能
- fix: 修复 bug
- docs: 文档更新
- style: 代码格式调整
- refactor: 重构代码
- test: 测试相关
- chore: 构建过程或辅助工具的变动

提交信息格式：
```
<type>(<scope>): <subject>

<body>

<footer>
```

示例：
```
feat(auth): 添加钱包登录功能

- 集成 Web3Modal
- 添加钱包连接状态管理
- 实现自动重连功能

Closes #123
```

### 代码审查

- 所有代码变更必须通过 Pull Request 提交
- 至少需要一个审查者批准
- 确保所有自动化测试通过
- 遵循代码审查清单：
  - 代码风格是否符合规范
  - 是否有适当的测试覆盖
  - 是否有必要的文档更新
  - 性能影响是否可接受

## 开发流程

1. 从 develop 分支创建新的功能分支
2. 在本地开发并测试
3. 提交代码，遵循提交规范
4. 创建 Pull Request
5. 代码审查和修改
6. 合并到 develop 分支
7. 定期将 develop 合并到 main 分支发布

## 发布流程

1. 从 develop 分支创建 release 分支
2. 在 release 分支上进行最后的测试和修复
3. 更新版本号和更新日志
4. 合并到 main 分支并打标签
5. 将改动同步回 develop 分支

## 性能优化准则

- 使用适当的缓存策略
- 优化图片和静态资源
- 实现代码分割和懒加载
- 避免不必要的重渲染
- 使用性能监控工具

## 安全准则

- 所有的 API 密钥和敏感信息使用环境变量
- 实现适当的输入验证和清理
- 使用 HTTPS
- 定期更新依赖包
- 遵循安全最佳实践

## CI/CD

使用 GitHub Actions 进行：
- 代码质量检查
- 自动化测试
- 自动化部署
- 依赖更新 