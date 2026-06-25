# Modern Chinese Typography

This project now treats `.typo` as a Chinese-first article surface with progressive enhancement for modern browsers. The baseline stays dependency-free and keeps the historical selector API intact.

The full research and library-level implementation plan live in [`library-evolution-plan.md`](library-evolution-plan.md). That plan includes both standards research and comparable library research, including Han.css, Kanji Typesetting, Tailwind CSS Typography, Typography.js, Normalize.css, sanitize.css, and modern-normalize.

## Research Basis

- W3C CLReq defines body text line length as context-dependent, with most books using 17-40 characters and horizontal body copy not exceeding 48 characters. `.typo-readable` therefore caps content at `48em` without forcing layout on existing `.typo` containers.
- CLReq describes common line gap as 50%-100% of the character frame. `.typo` uses `line-height: 1.75`, which gives a 75% line gap at the default font size.
- CLReq calls for measurable spacing between Han and Western text. CSS Text Level 4 exposes that as `text-autospace`; `.typo` enables `ideograph-alpha` and `ideograph-numeric` where supported.
- CSS Text Level 4 exposes CJK punctuation trimming with `text-spacing-trim`. `.typo` opts into `normal`, and code/preformatted text opts out with `space-all` plus disabled autospace.
- CSS Text Level 4 defines `line-break` strictness for CJK line wrapping. `.typo` uses `line-break: strict` to reduce bad punctuation breaks while leaving emergency wrapping to `overflow-wrap: break-word`.
- CSS Text Decoration Level 3 supports native emphasis marks and says Chinese horizontal emphasis prefers `under right`. `.typo-em` now uses native `text-emphasis` where available and keeps the previous pseudo-element dot fallback elsewhere.
- CSS Fonts Level 4 defines script-specific generics such as `generic(kai)` and `generic(fangsong)`. Typo.css uses them only inside `@supports`, while keeping explicit Kai and Fangsong font stacks as the baseline.
- CSS Ruby and CSS Writing Modes support East Asian annotation and vertical layout. Typo.css exposes them through `.typo ruby`, `.typo-zhuyin`, and `.typo-vertical` helpers instead of changing the default horizontal article flow.
- WCAG 2.2 SC 1.4.12 requires text layouts to survive user overrides such as line-height, paragraph spacing, letter spacing, and word spacing. The CSS avoids fixed block heights for article text and uses margins/line-height instead.

## Font Strategy

The sans stack prioritizes locally installed CJK UI fonts. The default Simplified Chinese stack is:

```css
"PingFang SC", "Noto Sans CJK SC", "Noto Sans SC", "Source Han Sans SC",
"Microsoft YaHei UI", "Microsoft YaHei", "Hiragino Sans GB",
"WenQuanYi Micro Hei", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
```

This avoids shipping heavy CJK webfonts by default, keeps Chinese punctuation and glyph shape in the user's platform conventions, and still gives Latin fallback fonts for mixed text.

Traditional Chinese pages and containers can use `lang="zh-Hant"`, `zh-TW`, `zh-HK`, or `zh-MO` to switch to Traditional Chinese sans and serif stacks.

The same stacks are exposed as CSS variables for projects that want to override them without replacing selector rules:

- `--typo-font-sans-hans`
- `--typo-font-sans-hant`
- `--typo-font-sans`
- `--typo-font-serif-hans`
- `--typo-font-serif-hant`
- `--typo-font-serif`
- `--typo-font-mono`
- `--typo-font-kai`
- `--typo-font-fangsong`
- `--typo-color-text`

The serif helper now uses Song-style CJK families first and generic `ui-serif`/`serif` last. Code uses modern system monospace families before the older Courier fallback.

`.typo-serif`, `.typo-kai`, and `.typo-fangsong` provide explicit helpers for the four common Chinese type styles without making the body font unpredictable.

## Vertical Layout Guidance

`.typo-vertical` is a low-level writing-mode helper, not a complete poem-card layout. A polished vertical Chinese composition still needs page-level spacing: a fixed or responsive column width, enough padding before and after each column, visible or implied column boundaries, and horizontal scrolling when the available viewport is too narrow.

The demo page follows the same direction as the PageZero poem card: a right-to-left flex grid, one vertical text column per poetic phrase, generous top/bottom padding, and a separate title column. This keeps vertical text from collapsing into a cramped single strip while preserving the CSS-only nature of Typo.css.

## Comparable Library Lessons

- Han.css and Kanji Typesetting confirm that full Han typography needs semantic normalization, Han-Western spacing, punctuation compression, hanging punctuation, ruby, emphasis marks, and four Chinese type styles. Typo.css adopts CSS-native pieces and avoids a mandatory JavaScript rendering pipeline.
- Tailwind CSS Typography confirms that a prose container plus modifier helpers is a durable API for content the author does not fully control. Typo.css keeps `.typo` as the prose container and adds helpers only where authors opt in.
- Typography.js confirms that typography should be treated as a system of relative scale, rhythm, themes, and plugins. Typo.css uses custom properties and relative units rather than isolated pixel tweaks.
- Normalize.css, sanitize.css, and modern-normalize confirm that reset layers should preserve useful defaults, explain opinionated rules, and stay small. Typo.css keeps reset behavior stable while putting modern Chinese reading behavior in `.typo`.

## SEO and GEO Notes

The demo page is a public-facing documentation page, so it now declares `lang="zh-Hans"`, uses a viewport that supports mobile indexing, includes a canonical URL, and adds JSON-LD software metadata. This gives search engines and generative engines a clearer summary of what Typo.css is, what problem it solves, and where the canonical project lives.

## Sources

- W3C, Requirements for Chinese Text Layout: https://www.w3.org/TR/clreq/
- W3C, Chinese Layout Gap Analysis: https://www.w3.org/TR/clreq-gap/
- W3C, CSS Text Module Level 4: https://www.w3.org/TR/css-text-4/
- W3C, CSS Text Decoration Module Level 3: https://www.w3.org/TR/css-text-decor-3/
- W3C WAI, Understanding WCAG 2.2 Success Criterion 1.4.12 Text Spacing: https://www.w3.org/WAI/WCAG22/Understanding/text-spacing
