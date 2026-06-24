# Changelog

## [3.0.1] - 2026-06-25

### 设计系统升级

#### 跨平台兼容 (Cross-platform)
- 引入 CSS 自定义属性（`--typo-*`），集中管理 30+ 设计令牌
- 响应式字体：`h1`-`h4` 使用 `clamp()` 实现流畅缩放（现在 h5-h6 也支持）
- 跨平台系统字体栈：macOS/Windows/Linux/iOS/Android 全覆盖
- 现代浏览器优先：移除 IE hack，使用 CSS Logical Properties
- `select`/`button`/`radio`/`checkbox` 全局 `appearance:none` 重置
- `--typo-font-heading` 独立于 `--typo-font-sans`（用户可切换 heading 字体）

#### 主题系统 (Theming)
- 亮色（默认）/ 暗色（`prefers-color-scheme: dark` 自动）/ 护眼 / 高对比度 / 大字体，5 种主题
- sepia 护眼主题支持 `prefers-color-scheme: light` 自动激活
- `data-typo-theme` 属性 + `theme-switcher.js` 前端切换器
- 暗色模式阴影使用 `rgb(255,255,255)` 而非黑色，深色背景可见

#### 模块化架构 (Modular)
- 原单文件拆分为 10 个独立模块：reset / base / typography / code / table / utilities / rtl / forced-colors / reduced-data / print
- 每个模块可独立引入，按需加载
- npm `exports` 16 个子路径 + `sideEffects: false` 树摇优化

### 工程质量升级

#### 稳定性 (Robustness)
- stylelint v17 静态检查，0 errors
- Browserslist 定义目标范围（含 QQ/UC 浏览器移动端）
- PostCSS autoprefixer + cssnano → 16KB min + source map，0 warnings
- OIDC trusted publishing workflow
- `package-lock.json` 锁定依赖

#### 可维护性 (Maintainability)
- 分层架构 + CSS 变量语义化命名
- reset.css 按 TEXT/BLOCK/FORM/TABLE/MEDIA 分组
- 11 个排版微调变量（`--typo-code-padding` 等）
- `u`/`cite`/`dfn`/`mark` 限定 `.typo` 作用域

#### 开发者体验 (DX)
- 完整 README（CDN/npm/模块列表/主题叠加/迁移指南）
- `theme-switcher.js` 前端主题切换器
- `typo.css.d.ts` TypeScript 类型声明
- `ROADMAP.md` 浏览器支持数据驱动的未来路线图
- `CONTRIBUTING.md` + `docs/PRE_COMMIT.md`

#### 测试覆盖 (Testing)
- 96 项自动化测试：构建产物 / CSS 变量 / 选择器 / 主题 / 无障碍 / WCAG 对比度 / 环境适配
- JUnit XML 输出（CI 兼容）
- Playwright 4 模式视觉截图测试
- 内嵌 WCAG 2.1 对比度计算器（零依赖）

#### 安全保障 (Security)
- SRI sha384 完整性哈希
- CSP `style-src 'self'` 兼容（无 inline 样式）
- `print.css` 仅打印 `#anchor` 引用，外链 URL 不暴露
- 系统字体栈零外部加载
- `abbr.no-print-title` 打印隐私保护类

#### 多场景适配 (Environmental)
- RTL 完整支持（7 元素 + 标题 + 代码 LTR 保护）
- `prefers-color-scheme` / `prefers-contrast` / `prefers-reduced-motion` / `forced-colors: active` / `prefers-reduced-data`
- 移动端 ≤640px 断点：标题/clamp + 列表缩进 + 代码/表格优化
- `@page` 打印优化 + `large.css` 大字体缩放
- accent color `#0c7b66` WCAG AA 合规（5.2:1 on white）

## [2.1.2] - 原版

- 初始版本：单文件 CSS，提供中文排版基础样式
- 支持 IE6+ 浏览器
- `.typo` class 排版容器
