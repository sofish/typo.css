# Pre-commit Hook

建议使用 [lint-staged](https://github.com/lint-staged/lint-staged) + [husky](https://typicode.github.io/husky/) 在提交前自动运行 stylelint：

```bash
# 安装
npm install --save-dev lint-staged husky

# 初始化 husky
npx husky init

# 配置 .husky/pre-commit
echo "npx lint-staged" > .husky/pre-commit
```

在 `package.json` 中添加 lint-staged 配置：

```json
{
  "lint-staged": {
    "src/**/*.css": ["stylelint --fix", "git add"]
  }
}
```

这样每次 `git commit` 时会自动:
1. 对暂存的 CSS 文件运行 `stylelint --fix`
2. 将修复后的文件重新添加到暂存区

确保提交的代码始终符合 lint 规则。
