# Contributing to Typo.css

## 开发

```bash
# 安装依赖
npm install

# 构建
npm run build

# Lint
npm run lint

# 压缩
npm run minify

# 测试
npm test
```

## 架构

```
src/
├── reset.css       → CSS Reset（浏览器默认样式归零）
├── base.css        → CSS 变量 + 全局基础样式
├── typography.css  → .typo 容器排版
├── utilities.css   → 辅助 class
├── rtl.css         → RTL 排版
├── print.css       → 打印样式
└── themes/
    ├── dark.css    → 暗色主题
    └── sepia.css   → 护眼主题
```

## 命名规范

- CSS 变量：`--typo-{category}-{name}`，如 `--typo-color-accent`
- Class：小写 + 连字符，如 `.typo-em`、`.typo-h1`
- 模块层：BEM 风格，Block = `.typo`，Element = `typo-*`

## 提交流程

1. Fork → 分支
2. 修改源码文件（`src/`）
3. `npm run lint` 通过
4. `npm run build` 生成 `dist/`
5. 提交 PR，注明变更理由
