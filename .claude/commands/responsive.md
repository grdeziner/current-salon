# Fix Responsive Layout

Diagnose and fix layout issues at specific breakpoints.

## Breakpoint system
| Breakpoint | Max-width | Container behavior |
|---|---|---|
| Desktop | > 1024px | `.container` max-width: 1360px, padding: 0 96px |
| Tablet | ≤ 1024px | `.container` max-width: 960px, padding: 0 48px |
| Mobile | ≤ 768px | `.container` width: 92.5%, max-width: 100%, padding: 0 |
| Small mobile | ≤ 480px | Additional overrides as needed |

## Layout rules
- Section backgrounds (`<section>`) are always 100% width — no max-width on sections
- Content is constrained by `.container` inside the section
- Never put `max-width` directly on a `<section>`
- Flex/grid layouts should use `flex-wrap: wrap` and `min-width` guards for responsive stacking

## Common fixes
- Text overflow: reduce font size at mobile, allow wrapping
- Image clusters (intro photo): switch to single image or reduced size at ≤ 768px
- Grid columns: 3-col → 2-col → 1-col as viewport shrinks
- Nav: hamburger menu activates at ≤ 768px via `.is-open` class toggle

## Usage
Describe the layout problem and which page/section/breakpoint it occurs at.
