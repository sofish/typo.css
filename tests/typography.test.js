const assert = require("assert");
const fs = require("fs");

const css = fs.readFileSync("typo.css", "utf8");
const readme = fs.readFileSync("README.md", "utf8");
const docs = fs.readFileSync("docs/modern-chinese-typography.md", "utf8");
const planDocs = fs.readFileSync("docs/library-evolution-plan.md", "utf8");
const html = fs.readFileSync("typo.html", "utf8");

function block(selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = css.match(new RegExp(`${escaped}\\s*\\{([\\s\\S]*?)\\n\\}`));
  assert(match, `Missing CSS block for ${selector}`);
  return match[1];
}

function assertIncludes(value, expected, message) {
  assert(value.includes(expected), message || `Expected to find ${expected}`);
}

const bodyFont = block("body, button, input, select, textarea");
assertIncludes(bodyFont, 'font: 400 1em/1.75 "PingFang SC"', "Body font should use the modern Chinese stack at readable line-height");
assertIncludes(bodyFont, "font-family: var(--typo-font-sans);", "Body font should use the shared sans token after its fallback");
assertIncludes(bodyFont, '"Noto Sans CJK SC"', "Body font stack should include Noto Sans CJK SC");
assertIncludes(bodyFont, '"Microsoft YaHei UI"', "Body font stack should include modern Windows Chinese UI font");
assertIncludes(bodyFont, "font-kerning: normal;", "Body text should enable normal kerning");

const root = block(":root");
[
  "--typo-font-sans-hans:",
  "--typo-font-sans-hant:",
  "--typo-font-sans: var(--typo-font-sans-hans);",
  "--typo-font-serif-hans:",
  "--typo-font-serif-hant:",
  "--typo-font-serif: var(--typo-font-serif-hans);",
  "--typo-font-mono:",
  "--typo-font-kai:",
  "--typo-font-fangsong:",
  "--typo-color-text: #24292f;"
].forEach((token) => assertIncludes(root, token, `:root should expose ${token}`));

assertIncludes(css, "@supports (font-family: generic(kai))", "Kai generic font should be a progressive enhancement");
assertIncludes(css, "@supports (font-family: generic(fangsong))", "Fangsong generic font should be a progressive enhancement");
assertIncludes(css, "body:lang(zh-Hant)", "Traditional Chinese body font override should be language-aware");
assertIncludes(css, "--typo-font-sans: var(--typo-font-sans-hant);", "Traditional Chinese override should use the Hant sans token");
assertIncludes(css, "--typo-font-serif: var(--typo-font-serif-hant);", "Traditional Chinese override should use the Hant serif token");

const typo = block(".typo");
[
  "color: var(--typo-color-text);",
  "font-family: var(--typo-font-sans);",
  "line-height: 1.75;",
  "line-break: strict;",
  "word-break: normal;",
  "overflow-wrap: break-word;",
  "hanging-punctuation: allow-end;",
  "text-autospace: ideograph-alpha ideograph-numeric;",
  "text-spacing-trim: normal;",
  "text-emphasis-position: under right;"
].forEach((rule) => assertIncludes(typo, rule, `.typo should include ${rule}`));

assertIncludes(block(".typo-readable"), "max-width: 48em;", "Readable helper should cap Chinese line length");
assertIncludes(block(".typo-readable-center"), "margin-left: auto;", "Readable centering helper should center with margins");
assertIncludes(block(".typo-readable-center"), "margin-right: auto;", "Readable centering helper should center with margins");
assertIncludes(block(".typo-justify"), "text-align: justify;", "Justification helper should be opt-in");
assertIncludes(block(".typo-justify"), "text-justify: inter-character;", "Justification helper should use inter-character justification");
assertIncludes(block(".typo-vertical"), "writing-mode: vertical-rl;", "Vertical helper should enable Chinese vertical writing");
assertIncludes(block(".typo-vertical"), "text-orientation: mixed;", "Vertical helper should keep mixed Latin/CJK orientation sane");
assertIncludes(block(".typo-vertical.typo-readable"), "max-height: 40em;", "Readable helper should support vertical measure");
assertIncludes(block(".typo ruby"), "ruby-position: over;", "Ruby should default to over-position annotation");
assertIncludes(block(".typo rt"), "font-size: 0.5em;", "Ruby annotation should use compact text");
assertIncludes(css, ".typo ruby.typo-zhuyin", "Zhuyin ruby helper should be present");
assertIncludes(css, "ruby-position: inter-character;", "Zhuyin ruby should opt into inter-character positioning");

assertIncludes(css, '@supports (text-emphasis: filled dot) or (-webkit-text-emphasis: filled dot)', "Native emphasis enhancement should be guarded by @supports");
assertIncludes(css, "text-emphasis: filled dot;", "Native emphasis marks should be enabled");
assertIncludes(css, "content: \"・・・・", "Legacy emphasis fallback should remain");

assertIncludes(css, ':lang(zh), :lang(zh-Hans)', "Simplified Chinese quote rules should be present");
assertIncludes(css, ':lang(zh-Hant), :lang(zh-HK), :lang(zh-MO), :lang(zh-TW)', "Traditional Chinese quote rules should be present");
assertIncludes(block(".typo q:before"), "content: open-quote;", ".typo q should restore semantic opening quotes");
assertIncludes(block(".typo q:after"), "content: close-quote;", ".typo q should restore semantic closing quotes");

assertIncludes(block(".serif, .typo-serif"), '"Noto Serif CJK SC"', "Serif helper should include modern CJK serif fonts");
assertIncludes(block(".serif, .typo-serif"), "font-family: var(--typo-font-serif);", "Serif helper should use the shared serif token");
assertIncludes(block(".kai, .typo-kai"), "font-family: var(--typo-font-kai);", "Kai helper should use the shared Kai token");
assertIncludes(block(".fangsong, .typo-fangsong"), "font-family: var(--typo-font-fangsong);", "Fangsong helper should use the shared Fangsong token");
assertIncludes(block("pre, code, pre tt"), "ui-monospace", "Code font stack should include modern monospace fonts");
assertIncludes(block("pre, code, pre tt"), "font-family: var(--typo-font-mono);", "Code font stack should use the shared mono token");
assertIncludes(block("pre, code, kbd, samp"), "text-autospace: no-autospace;", "Code should opt out of CJK autospace");

assertIncludes(readme, "docs/modern-chinese-typography.md", "README should reference the typography docs");
assertIncludes(readme, "docs/library-evolution-plan.md", "README should reference the library evolution plan");
assertIncludes(docs, "W3C, Requirements for Chinese Text Layout", "Docs should cite CLReq");
assertIncludes(docs, "WCAG 2.2 Success Criterion 1.4.12", "Docs should cite WCAG text spacing guidance");
assertIncludes(docs, "Comparable Library Lessons", "Docs should include comparable library research");
assertIncludes(planDocs, "Kanji Typesetting", "Evolution plan should research comparable Han typography libraries");
assertIncludes(planDocs, "Tailwind CSS Typography", "Evolution plan should research comparable prose libraries");

assertIncludes(html, '<html lang="zh-Hans">', "Demo page should declare Chinese language");
assertIncludes(html, '<meta name="viewport" content="width=device-width, initial-scale=1">', "Demo page should use an indexable mobile viewport");
assertIncludes(html, '<link rel="canonical" href="https://typo.built4.fun/">', "Demo page should declare canonical URL");
assertIncludes(html, '"@type": "SoftwareSourceCode"', "Demo page should include SoftwareSourceCode JSON-LD");
assertIncludes(html, 'class="typo typo-selection typo-readable typo-readable-center"', "Demo page should exercise readable measure helpers");
assertIncludes(html, 'class="typo-zhuyin" lang="zh-TW"', "Demo page should exercise Zhuyin ruby helper");
assertIncludes(html, 'class="vertical-poem-demo"', "Demo page should use a page-like vertical poem demo");
assertIncludes(html, 'class="vertical-poem-grid"', "Vertical demo should use separated right-to-left columns");
assertIncludes(html, "双调·沉醉东风·夏景", "Vertical demo should include the PageZero-inspired poem title");
assert(!html.includes("docs/library-evolution-plan.md"), "Demo page should not show maintenance research-link copy");
