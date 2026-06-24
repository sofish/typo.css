#!/usr/bin/env node
/**
 * Typo.css v3.0.1 — Test Runner
 * 测试覆盖：构建产物 / CSS变量 / 选择器 / 主题 / 无障碍 / 多场景适配 / WCAG对比度
 */

const fs = require("fs");
const path = require("path");

let passed = 0;
let failed = 0;

function assert(condition, msg) {
  if (condition) { console.log(`  ✅ ${msg}`); passed++; }
  else { console.error(`  ❌ ${msg}`); failed++; }
}

// ── WCAG 2.1 对比度计算器（内嵌，零依赖） ──
function hexToRgb(hex) {
  hex = hex.replace("#", "");
  if (hex.length === 3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
  const n = parseInt(hex, 16);
  return { r: (n>>16)&255, g: (n>>8)&255, b: n&255 };
}
function luminance({r,g,b}) {
  const c = [r,g,b].map(v => { v/=255; return v<=0.03928 ? v/12.92 : ((v+0.055)/1.055)**2.4; });
  return 0.2126*c[0] + 0.7152*c[1] + 0.0722*c[2];
}
function contrastRatio(fg, bg) {
  const l1 = luminance(hexToRgb(fg)), l2 = luminance(hexToRgb(bg));
  return (Math.max(l1,l2)+0.05) / (Math.min(l1,l2)+0.05);
}

// ── 1. Build artifacts ──
console.log("\n📦 Build artifacts");
const distFiles = [
  "dist/typo.css","dist/reset.css","dist/base.css","dist/typography.css",
  "dist/code.css","dist/table.css","dist/utilities.css","dist/rtl.css",
  "dist/forced-colors.css","dist/reduced-data.css","dist/print.css",
  "dist/themes/dark.css","dist/themes/sepia.css",
  "dist/themes/contrast.css","dist/themes/large.css",
];
for (const f of distFiles) {
  const fp = path.join(__dirname, "..", f);
  assert(fs.existsSync(fp), `${f} exists`);
  if (fs.existsSync(fp)) assert(fs.statSync(fp).size > 0, `${f} not empty`);
}

// ── 2. CSS Custom Properties ──
console.log("\n🎨 CSS Custom Properties");
const typoCSS = fs.readFileSync(path.join(__dirname, "..", "dist/typo.css"), "utf-8");
const vars = [
  "--typo-color-text","--typo-color-text-strong","--typo-color-text-muted",
  "--typo-color-bg","--typo-color-bg-code","--typo-color-accent",
  "--typo-font-sans","--typo-font-serif","--typo-font-mono",
  "--typo-font-size-h1","--typo-line-height-base","--typo-space-lg",
  "--typo-blockquote-border-width","--typo-mark-padding",
  "--typo-font-size-code","--typo-code-padding",
  "--typo-code-block-padding","--typo-table-cell-padding",
];
for (const v of vars) assert(typoCSS.includes(v), `CSS variable ${v}`);

// ── 3. Key selectors ──
console.log("\n🔍 Key Selectors");
[
  [".typo","Container"], [".typo-rtl","RTL"], [".typo-em","Emphasis"],
  [".typo-u","Proper name"], [".clearfix","Clearfix"],
  [".sr-only","SR-only"], ['[dir="rtl"]',"RTL dir"],
  ["@media print","Print"], ["prefers-reduced-motion","Motion"],
 ["prefers-reduced-data","Reduced data"],
 ["@media (max-width: 640px)","Mobile BPs"],
 ["forced-colors","Forced colors"], ["focus-visible","Focus-visible"],
  ["overflow-wrap","Overflow-wrap"], ["color-scheme","Color scheme"],
].forEach(([s,d]) => assert(typoCSS.includes(s), `${s} (${d})`));

// ── 4. Themes ──
console.log("\n🌓 Themes");
const darkCSS = fs.readFileSync(path.join(__dirname, "..", "dist/themes/dark.css"), "utf-8");
const sepiaCSS = fs.readFileSync(path.join(__dirname, "..", "dist/themes/sepia.css"), "utf-8");
const contrastCSS = fs.readFileSync(path.join(__dirname, "..", "dist/themes/contrast.css"), "utf-8");
const largeCSS = fs.readFileSync(path.join(__dirname, "..", "dist/themes/large.css"), "utf-8");

assert(darkCSS.includes(".typo-dark"), ".typo-dark present");
assert(darkCSS.includes("prefers-color-scheme"), "dark auto-detect");
assert(sepiaCSS.includes(".typo-sepia"), ".typo-sepia present");
assert(sepiaCSS.includes("prefers-color-scheme"), "Sepia auto-detect");
assert(contrastCSS.includes(".typo-contrast"), ".typo-contrast present");
assert(contrastCSS.includes("prefers-contrast"), "prefers-contrast auto");
assert(largeCSS.includes(".typo-large"), ".typo-large present");
assert(largeCSS.includes("--typo-font-size-base"), "Large font-size override");
assert(largeCSS.includes("--typo-shadow-sm"), "Large shadow override");
assert(largeCSS.includes("--typo-border-radius"), "Large border-radius override");

assert(darkCSS.includes("--typo-color-bg") && darkCSS.includes("#1a1a2e"), "Dark bg override");
assert(darkCSS.includes("--typo-color-accent") && darkCSS.includes("#4ecca3"), "Dark accent");
assert(darkCSS.includes("rgb(255 255 255") || darkCSS.includes("rgb(255,255,255"), "Dark shadow uses white");
assert(sepiaCSS.includes("--typo-color-bg") && sepiaCSS.includes("#f4ecd8"), "Sepia bg");
assert(sepiaCSS.includes("--typo-color-accent") && sepiaCSS.includes("#8b4513"), "Sepia accent");

// ── 5. Accessibility ──
console.log("\n♿ Accessibility");
assert(darkCSS.includes("--typo-color-text") && darkCSS.includes("#e0e0e0"), "Dark text readable");
assert(typoCSS.includes(".sr-only"), "Screen reader utility");
assert(typoCSS.includes("text-size-adjust"), "Text size adjust");
assert(!typoCSS.includes("a[href]::after"), "Print URL privacy");
assert(typoCSS.includes('a[href^="#"]'), "Print anchor refs preserved");

// ── WCAG 2.1 对比度数值验证 ──
console.log("\n🎯 WCAG Contrast Ratios (AA ≥ 4.5, AAA ≥ 7.0)");
const checks = [
  ["Light text/bg",  "#333",   "#fff",    4.5],
  ["Light accent/bg","#0c7b66","#fff",    4.5],
  ["Dark text/bg",   "#e0e0e0","#1a1a2e", 4.5],
  ["Dark accent/bg", "#4ecca3","#1a1a2e", 4.5],
  ["Sepia text/bg",  "#5b4636","#f4ecd8", 4.5],
  ["Contrast text",  "#000",   "#fff",     7.0],
  ["Contrast link",  "#0055cc","#fff",     4.5],
];
for (const [label, fg, bg, min] of checks) {
  const ratio = contrastRatio(fg, bg);
  assert(ratio >= min, `${label}: ${ratio.toFixed(1)}:1 ≥ ${min}:1`);
}

// ── 6. Environmental ──
console.log("\n🌍 Environmental");
assert(typoCSS.includes("clamp("), "Responsive clamp");
assert(typoCSS.includes("inset-inline-start") || typoCSS.includes("margin-inline"), "Logical props");
assert(typoCSS.includes("forced-color-adjust"), "Forced colors adjust");
assert(typoCSS.includes('appearance: none'), "Form element reset");
assert(typoCSS.includes('--typo-font-heading') && !typoCSS.includes('--typo-font-heading: var(--typo-font-sans)'), "Heading font independent");

// ── 7. cite/dfn scoped ──
assert(typoCSS.includes(".typo cite"), "cite scoped to .typo");

console.log(`\n${"=".repeat(40)}`);
console.log(`Results: ${passed} passed, ${failed} failed`);
console.log(`${"=".repeat(40)}`);

// ── JUnit XML 输出（CI 兼容） ──
if (process.argv.includes("--junit")) {
  const xmlFile = process.argv[process.argv.indexOf("--junit") + 1] || "test-results.xml";
  const total = passed + failed;
  const time = (process.uptime() / 60).toFixed(3);
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    `<testsuite name="typo.css" tests="${total}" failures="${failed}" errors="0" time="${time}">`,
    `  <testcase name="total" classname="typo" time="${time}">`,
    failed > 0 ? `    <failure message="${failed} of ${total} tests failed"/>` : "",
    `  </testcase>`,
    `</testsuite>`,
  ].filter(Boolean).join("\n");
  fs.writeFileSync(path.join(__dirname, "..", xmlFile), xml);
  console.log(`JUnit XML written to ${xmlFile}`);
}

process.exit(failed > 0 ? 1 : 0);
