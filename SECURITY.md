# Security & Compliance

## Subresource Integrity (SRI)

Use the `integrity` attribute when loading typo.css from a CDN:

```html
<link rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/typo.css@3/dist/typo.min.css"
      integrity="sha384-UniLu7s1kXQFR22Zsx/OKOtOJq2Fn82/z42x8/mAEgc5kvC0V6lXKTZN9uJY1hbN"
      crossorigin="anonymous">
```

**Generate fresh hash:**
```bash
openssl dgst -sha384 -binary dist/typo.min.css | openssl base64 -A
```

## Content Security Policy (CSP)

typo.css is fully compatible with strict CSP. No exceptions needed:

```nginx
# Nginx
add_header Content-Security-Policy "style-src 'self' https://cdn.jsdelivr.net;";
```

- ✅ No inline styles — all styles in external `.css` files
- ✅ No `eval()` / `expression()` / `javascript:` URLs
- ✅ No external font files — uses system font stacks only
- ✅ No `@import` in distributed files — all modules concatenated at build time

## WCAG 2.2 Conformance

typo.css helps satisfy these WCAG 2.2 Level AA success criteria:

| Criterion | How typo.css helps |
|-----------|-------------------|
| **1.4.3 Contrast (Minimum)** | `contrast.css` theme provides ≥7:1 ratio (AAA). Dark/light themes provide ≥4.5:1 |
| **1.4.4 Resize Text** | All font sizes use `rem`/`clamp()`. User zoom to 200% works without loss |
| **1.4.10 Reflow** | Responsive `clamp()` fonts + `overflow-wrap: break-word` prevent horizontal scroll at 320px |
| **1.4.12 Text Spacing** | CSS custom properties allow overriding `line-height`/`letter-spacing`/`word-spacing` |
| **2.4.7 Focus Visible** | `.typo-input:focus-visible` provides 2px high-contrast outline |
| **1.4.8 Visual Presentation** (AAA) | `large.css` offers user-selectable font size increase |

**Limitations:** typo.css is a CSS-only library. Full WCAG 2.2 conformance requires:
- Semantic HTML structure (headings, landmarks)
- Keyboard navigation
- Screen reader text alternatives
- ARIA attributes where needed

These are the responsibility of the HTML author, not the CSS library.
