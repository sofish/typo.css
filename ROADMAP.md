# P5 Roadmap — Future Directions (2027+)

typo.css v3.0.1 已达当前技术栈天花板。以下功能需等待浏览器支持 ≥95%。

## When to Upgrade

| Feature | Current Support | Target | ETA |
|---------|:--------------:|:------:|:---:|
| `color-mix()` | 91.5% | ≥95% | 2027 Q1 |
| `light-dark()` | 91% | ≥95% | 2027 Q1 |
| `oklch()` | 89% | ≥95% | 2027 Q2 |
| CSS Nesting | 92% | ≥95% | 2027 Q1 |
| APCA (WCAG 3) | Draft | Final | 2027+ |

## P5-1: `color-mix()` Dynamic Palettes

```css
/* Current: 14 manual variables per theme (56 lines × 2) */
--typo-color-bg: #1a1a2e;

/* Future: derive from a single brand color */
--typo-color-bg: color-mix(in srgb, var(--brand), black 80%);
```

**Impact**: Reduces dark.css + contrast.css from ~100 lines to ~30.

## P5-2: `light-dark()` Two-Value Theme

```css
/* Current: separate dark.css file with @media + .class */
/* Future: single declaration with automatic switch */
body {
  background: light-dark(#fff, #1a1a2e);
  color: light-dark(#333, #e0e0e0);
}
```

**Impact**: Eliminates dark.css entirely, ~50 lines → 0.

## P5-3: `oklch()` Perceptually Uniform Colors

```css
/* Current: hex colors with uneven perceptual steps */
--typo-color-accent: #0c7b66;

/* Future: uniform lightness, chroma, hue */
--typo-color-accent: oklch(0.45 0.12 180);
```

**Impact**: Easier theme creation, better accessibility by design.

## P5-4: APCA Contrast Algorithm

WCAG 3.0 introduces APCA (Advanced Perceptual Contrast Algorithm) as replacement for WCAG 2.x ratio-based contrast. typo.css will adopt APCA when WCAG 3.0 reaches Candidate Recommendation.

## P5-5: CSS Native Nesting

```css
/* Current: flat selectors */
.typo blockquote { /* ... */ }
.typo blockquote a { /* ... */ }

/* Future: nested */
.typo {
  blockquote {
    /* ... */
    a { /* ... */ }
  }
}
```

**Impact**: Better readability, but requires dropping Chrome 90-119 and Safari 15-17.1 support.

## Non-P5: Already Implemented

These progressive enhancements were evaluated and found unnecessary for our browserslist:

- `@supports (font-size: clamp(...))`: `clamp()` supported in Chrome 79+ / Firefox 75+ / Safari 13.1+. All in scope.
- `@supports selector(:focus-visible)`: Added in v3.0.1 with `:focus:not(:focus-visible)` fallback.
