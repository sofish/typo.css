# Typo.css v3.0.1

> 一致化浏览器排版效果，构建最适合中文阅读的网页排版。
> 模块化 · 多主题 · RTL · 无障碍 · 响应式

[![npm version](https://img.shields.io/npm/v/typo.css)](https://www.npmjs.com/package/typo.css)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 快速开始

### CDN

```html
<link rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/typo.css@3/dist/typo.min.css"
      integrity="sha384-UniLu7s1kXQFR22Zsx/OKOtOJq2Fn82/z42x8/mAEgc5kvC0V6lXKTZN9uJY1hbN"
      crossorigin="anonymous">
```

### npm

```bash
npm install typo.css
```

```js
import "typo.css";                    // 完整版 (16KB)
import "typo.css/typography";         // 仅排版
import "typo.css/theme-dark";         // 暗色主题
import "typo.css/theme-sepia";        // 护眼主题
import "typo.css/theme-contrast";     // 高对比度
import "typo.css/theme-large";        // 大字体
import "typo.css/rtl";                // RTL 支持
```

### 使用

```html
<article class="typo">
  <h1>文章标题</h1>
  <p>正文内容...</p>
</article>
```

### 主题

```html
<!-- 暗色模式 -->
<article class="typo typo-dark">...</article>

<!-- 护眼模式 -->
<article class="typo typo-sepia">...</article>

<!-- RTL 排版 -->
<article class="typo typo-rtl" dir="rtl">...</article>

<!-- 跟随系统 -->
<article class="typo">
  <!-- 系统亮色→默认；系统暗色→自动切换暗色 -->
</article>

<!-- 强制指定 -->
<article class="typo" data-typo-theme="light">...</article>
<article class="typo" data-typo-theme="dark">...</article>
```

### 主题叠加

颜色主题与尺寸主题相互独立，可自由组合：

```html
<!-- 暗色 + 大字体 -->
<article class="typo typo-dark typo-large">...</article>

<!-- 护眼 + 大字体 -->
<article class="typo typo-sepia typo-large">...</article>

<!-- 高对比度 + 大字体（AAA 级无障碍） -->
<article class="typo typo-contrast typo-large">...</article>
```

### JavaScript 主题切换

```html
<script src="node_modules/typo.css/theme-switcher.js"></script>
<button onclick="TypoTheme.set('dark')">暗色</button>
<button onclick="TypoTheme.set('sepia')">护眼</button>
<button onclick="TypoTheme.set('large')">大字</button>
<button onclick="TypoTheme.reset()">跟随系统</button>
```

API: `TypoTheme.set('dark'|'sepia'|'contrast'|'large'|'auto')` · `TypoTheme.get()` · `TypoTheme.reset()`

### 模块列表

| 模块 | 路径 | 用途 |
|------|------|------|
| Reset | `typo.css/reset` | 浏览器默认样式重置（按类别分组） |
| Base | `typo.css/base` | CSS 变量 + 全局基础样式 |
| Typography | `typo.css/typography` | `.typo` 容器排版 |
| Code | `typo.css/code` | 代码块排版 |
| Table | `typo.css/table` | 表格排版（含斑马纹+响应式） |
| Utilities | `typo.css/utilities` | 辅助 class（含 `.sr-only`） |
| RTL | `typo.css/rtl` | 从右向左排版支持 |
| Forced Colors | `typo.css/forced-colors` | Windows 高对比度模式 |
| Reduced Data | `typo.css/reduced-data` | 省流量模式 |
| Print | `typo.css/print` | 打印优化 |
| Dark Theme | `typo.css/theme-dark` | 暗色主题（auto+手动） |
| Sepia Theme | `typo.css/theme-sepia` | 护眼主题 |
| Contrast Theme | `typo.css/theme-contrast` | 高对比度（WCAG AAA） |
| Large Theme | `typo.css/theme-large` | 大字体可访问变体 |

## 浏览器支持

Chrome 90+, Firefox 90+, Safari 15+, Edge 90+, iOS Safari 15+, Android Chrome 90+, QQ浏览器 10+, UC浏览器 12+

### 架构说明

typo.css v3 采用拼合式构建，10 个源模块按固定顺序连接：`reset → base → typography → code → table → utilities → rtl → forced-colors → reduced-data → print`。此顺序即 CSS cascade 优先级——后声明的模块优先级更高。`src/index.css` 中的 `@layer` 声明为开发时参考，构建后不保留。

## 从 v2 迁移

### 最小迁移（保持兼容）

```html
<!-- v2 -->
<link rel="stylesheet" href="typo.css">

<!-- v3（向后兼容） -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/typo.css@3/dist/typo.min.css">
```

### 按需引入

```html
<link rel="stylesheet" href="typo.css@3/dist/reset.css">
<link rel="stylesheet" href="typo.css@3/dist/base.css">
<link rel="stylesheet" href="typo.css@3/dist/typography.css">
```

### v2 → v3 注意点

- `.typo` / `.typo-p` / `.typo-h1` 等所有 class **完全向后兼容**
- v2 的 `.borderbox` class 不再需要（v3 默认 `box-sizing: border-box`）
- v3 新增 10 个模块（代码/表格/forced-colors/reduced-data 等）
- 主题文件需单独引入（v2 无主题功能）

详见 [CHANGELOG.md](CHANGELOG.md) · [SECURITY.md](SECURITY.md) · [ROADMAP.md](ROADMAP.md) · [CONTRIBUTING.md](CONTRIBUTING.md)

## License

MIT © [Sofish Lin](http://sofi.sh/) & [Contributors](CONTRIBUTING.md)
