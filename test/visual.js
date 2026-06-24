#!/usr/bin/env node
/**
 * Typo.css v3.0.1 — Playwright Visual Regression Test
 *
 * 渲染 demo.html，在 3 种模式下截图对比：
 *   1. 默认亮色模式
 *   2. 暗色模式 (.typo-dark)
 *   3. 护眼模式 (.typo-sepia)
 *
 * 用法:
 *   node test/visual.js              # 截图并对比
 *   node test/visual.js --update     # 更新基准截图
 *
 * 首次运行需安装 Playwright:
 *   npm install --save-dev @playwright/test
 *   npx playwright install chromium
 */

const { chromium } = require("@playwright/test");
const fs = require("fs");
const path = require("path");
const http = require("http");

const PORT = 9876;
const BASELINE_DIR = path.join(__dirname, "..", "test", "baseline");
const UPDATE = process.argv.includes("--update");

if (UPDATE) fs.mkdirSync(BASELINE_DIR, { recursive: true });

// 简单静态服务器
const server = http.createServer((req, res) => {
  const url = req.url === "/" ? "/test/demo.html" : req.url;
  const filePath = path.join(__dirname, "..", url);
  if (!fs.existsSync(filePath)) { res.writeHead(404); return res.end("404"); }
  const ext = path.extname(filePath);
  const mime = { ".html":"text/html",".css":"text/css",".js":"text/javascript" };
  res.writeHead(200, { "Content-Type": mime[ext] || "text/plain" });
  res.end(fs.readFileSync(filePath));
});

async function main() {
  await new Promise(r => server.listen(PORT, r));
  console.log(`Server: http://localhost:${PORT}`);

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 800, height: 2000 } });

  const modes = [
    { name: "light",  url: "/",           class: "" },
    { name: "dark",   url: "/",           class: "typo-dark" },
    { name: "sepia",  url: "/",           class: "typo-sepia" },
    { name: "rtl",    url: "/?rtl=true",  class: "typo-rtl" },
  ];

  let passed = 0, failed = 0;

  for (const mode of modes) {
    await page.goto(`http://localhost:${PORT}${mode.url}`, { waitUntil: "networkidle" });

    // 应用主题 class
    if (mode.class) {
      await page.evaluate((cls) => {
        document.body.classList.add(cls);
      }, mode.class);
    }

    // RTL 模式
    if (mode.name === "rtl") {
      await page.evaluate(() => { document.body.setAttribute("dir", "rtl"); });
    }

    await page.waitForTimeout(300); // 等待渲染

    const screenshot = await page.screenshot({ fullPage: true });
    const baselinePath = path.join(BASELINE_DIR, `${mode.name}.png`);

    if (UPDATE) {
      fs.writeFileSync(baselinePath, screenshot);
      console.log(`  📸 ${mode.name}: baseline saved`);
      passed++;
    } else {
      if (!fs.existsSync(baselinePath)) {
        console.log(`  ⚠️  ${mode.name}: no baseline (run --update first)`);
        failed++;
      } else {
        const baseline = fs.readFileSync(baselinePath);
        if (screenshot.length === baseline.length) {
          console.log(`  ✅ ${mode.name}: visual match`);
          passed++;
        } else {
          console.log(`  ❌ ${mode.name}: MISMATCH (${screenshot.length} vs ${baseline.length} bytes)`);
          failed++;
        }
      }
    }
  }

  await browser.close();
  server.close();

  console.log(`\n${"=".repeat(40)}`);
  console.log(`Results: ${passed} passed, ${failed} failed`);
  console.log(`${"=".repeat(40)}`);
  process.exit(failed > 0 ? 1 : 0);
}

main().catch(e => { console.error(e); process.exit(1); });
