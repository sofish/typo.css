# Typo.css Library Evolution Plan

Typo.css should be a modern Chinese typography library, not only a reset file. The library direction is to keep the old `typo.css` selector surface stable while progressively adding Chinese-first reading quality for current browsers.

## Research

### Standards

- W3C CLReq is the baseline for Chinese layout decisions: line length, line gap, punctuation, Han-Western spacing, ruby, emphasis marks, and horizontal/vertical writing all need to be considered together.
- CSS Text Level 4 maps several CLReq needs to native CSS: `line-break`, `text-autospace`, `text-spacing-trim`, `hanging-punctuation`, `text-wrap: pretty`, and `text-wrap: balance`.
- CSS Text Decoration Level 3 and W3C i18n tests confirm that Chinese emphasis marks belong below horizontal Chinese text and to the right in vertical text. `text-emphasis-position: under right` is therefore the modern default.
- CSS Fonts Level 4 defines script-specific generics such as `generic(kai)` and `generic(fangsong)`, but they are progressive enhancements rather than safe baseline declarations.
- CSS Ruby and CSS Writing Modes show that ruby and vertical text are real platform features. They should be supported as helpers, because forcing them globally would surprise existing sites.
- WCAG text-spacing guidance means the library should avoid fixed text heights and should keep line height, paragraph spacing, word spacing, and letter spacing override-friendly.

### Comparable Libraries

- Han.css treats Han typography as semantic normalization plus advanced rendering. Its important lesson is scope: Chinese typography involves ruby, emphasis marks, text decoration gaps, four Chinese type styles, Han-Western spacing, punctuation correction, jiya, and hanging punctuation. Its risk is dependency and runtime complexity, so Typo.css should adopt CSS-native parts first and avoid requiring JavaScript.
- Kanji Typesetting modernizes Han.css with npm distribution, precompiled CSS, SSR support, and a configurable rendering routine. Its lesson is that advanced corrections should be layered and configurable. Typo.css should stay CSS-only, but document which features are defaults and which are opt-in helpers.
- Tailwind CSS Typography succeeds by using a prose container and modifier classes for content the author does not fully control. Typo.css already has the same shape with `.typo`; new features should preserve that model and add helpers such as `.typo-readable`, `.typo-justify`, `.typo-vertical`, and language-aware font overrides.
- Typography.js treats typography as a system of ratios, rhythm, themes, and plugins. Typo.css should express its decisions as CSS custom properties and relative units rather than one-off pixel values.
- Normalize.css, sanitize.css, and modern-normalize show the reset-layer tradeoff: preserve useful defaults, explain unusual rules, and keep the baseline small. Typo.css should keep reset compatibility but move modern Chinese reading behavior into `.typo` and explicit helpers.

## Plan

### Default `.typo`

- Keep `.typo` as the primary article container.
- Use local CJK system fonts by default; do not ship heavyweight CJK webfonts.
- Keep `line-height: 1.75`, `line-break: strict`, `word-break: normal`, `overflow-wrap: break-word`, `hanging-punctuation: allow-end`, `text-autospace`, and `text-spacing-trim` as progressive native CSS enhancements.
- Use `text-wrap: pretty` for paragraphs and list text only under `@supports`, because the spec notes that higher-quality wrapping can be more expensive.
- Keep native `text-emphasis` under `@supports` and retain the historical pseudo-element fallback.

### Language and Font Strategy

- Expose CSS variables for Simplified and Traditional Chinese sans and serif stacks.
- Default to Simplified Chinese stacks for historical compatibility.
- Switch `.typo` and `body` to Traditional stacks when the element or page language is `zh-Hant`, `zh-HK`, `zh-MO`, or `zh-TW`.
- Add `.typo-serif`, `.typo-kai`, and `.typo-fangsong` helpers. Use `generic(kai)` and `generic(fangsong)` only inside `@supports` so older browsers keep a valid font stack.

### Optional Advanced Helpers

- `.typo-readable`: cap horizontal Chinese body measure at `48em`.
- `.typo-readable-center`: center the readable container without forcing layout on every `.typo` block.
- `.typo-justify`: opt into inter-character justification only where the project wants print-like full justification.
- `.typo-vertical`: opt into `vertical-rl` writing mode without changing default horizontal reading.
- Ruby defaults: center ruby annotations above base text; allow `.typo-zhuyin` or `zh-TW` ruby to opt into `inter-character` positioning.

### Non-goals for This Upgrade

- Do not add a JavaScript renderer for punctuation correction, Han-Western spacing, or hanging punctuation. Native CSS now covers part of this surface, and adding runtime DOM rewriting would change the library's deployment model.
- Do not bundle webfonts. Chinese font files are large, and site owners need to choose performance and licensing tradeoffs themselves.
- Do not remove the old selector API or historical fallbacks.

## Shipping Checklist

- Update `docs/` when adding new public CSS behavior.
- Keep README examples in sync with live URL `https://typo.built4.fun`.
- Cover every public CSS contract with `npm test`.
- Before deploy, check image compression needs, run simplify, tests, `git diff --check`, commit, push, deploy, and live-verify the custom domain.

## Sources

- W3C, Requirements for Chinese Text Layout: https://www.w3.org/TR/clreq/
- W3C, Chinese Layout Gap Analysis: https://www.w3.org/TR/clreq-gap/
- W3C, CSS Text Module Level 4: https://www.w3.org/TR/css-text-4/
- W3C, CSS Text Decoration Module Level 3: https://www.w3.org/TR/css-text-decor-3/
- W3C, CSS Fonts Module Level 4: https://www.w3.org/TR/css-fonts-4/
- W3C, CSS Ruby Annotation Layout Module Level 1: https://www.w3.org/TR/css-ruby-1/
- W3C, CSS Writing Modes Level 4: https://www.w3.org/TR/css-writing-modes-4/
- W3C, Ruby Styling: https://www.w3.org/International/articles/ruby/styling.en.html
- W3C WAI, Understanding WCAG 2.2 Success Criterion 1.4.12 Text Spacing: https://www.w3.org/WAI/WCAG22/Understanding/text-spacing
- Han.css: https://hanzi.pro/
- Kanji Typesetting: https://github.com/syhily/kanji-typesetting
- Tailwind CSS Typography: https://github.com/tailwindlabs/tailwindcss-typography
- Typography.js: https://kyleamathews.github.io/typography.js/
- Normalize.css: https://github.com/necolas/normalize.css/
- sanitize.css: https://github.com/csstools/sanitize.css/
- modern-normalize: https://github.com/sindresorhus/modern-normalize
