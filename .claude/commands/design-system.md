# Update Design System

Modify or extend the design tokens in `design-system.css`.

## File location
`/design-system.css` — all CSS custom properties live here

## Token categories
- **Colors**: `--color-gold`, `--color-sand-*`, `--color-text-*`, semantic aliases
- **Typography**: `--font-display` (IvyBodoni), `--font-body` (Lato), `--fs-*` sizes, `--fw-*` weights, `--lh-*` line heights, `--ls-*` letter spacing
- **Spacing**: `--space-1` (4px) through `--space-19` (180px)
- **Border radius**: `--radius-sm` through `--radius-full`
- **Shadows**: `--shadow-card`, `--shadow-photo`
- **Layout**: `--max-width`, `--gutter-desktop`, `--gutter-wide`

## Rules
- Always use existing tokens in `styles.css` and `pages.css` — never hardcode hex values or pixel values that already have a token
- Add new tokens to the appropriate section with a comment
- Do not remove existing tokens without checking all usages first

## Font stacks
- Display: `"ivybodoni", sans-serif` — loaded via Adobe Fonts kit `https://use.typekit.net/xbw8jyb.css`
- Body: `'Lato', sans-serif` — loaded via Google Fonts (all weights 100–900)

## Usage
Describe what token you want to add, change, or document.
