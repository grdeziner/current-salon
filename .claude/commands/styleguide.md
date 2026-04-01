# Generate Styleguide

Read `design-system.css` and generate `styleguide.html` — a self-contained living styleguide that visually documents every design token: colors, typography (families, weights, sizes), and spacing/radius/shadow tokens.

## Source of truth
All tokens live in `design-system.css`. Read it fresh before generating so the styleguide always reflects the current values.

## Output file
`styleguide.html` in the project root. Overwrite on every run — it is always auto-generated, never hand-edited.

## Page structure

### Head
- Load the same fonts as the rest of the site: Adobe Fonts kit, Google Fonts (Lato), Font Awesome 6.5
- Link `design-system.css` so all CSS custom properties are available
- Add a minimal inline `<style>` block for the styleguide chrome (grid layouts, section titles, cards) — keep it clean and consistent with the brand aesthetic

### Sections (in order)

1. **Colors**
   - Group into three rows: Brand, Neutrals, Semantic
   - Each swatch: a 120×80px filled rectangle, the token name below it, and the resolved hex value
   - Show the gradient (sand-warm → sand-dark) as a full-width strip

2. **Typography — Families & Weights**
   - IvyBodoni row: show "The quick brown fox" in Light, Regular, Bold at 32px
   - Lato row: show "The quick brown fox" in Light (300), Regular (400), Medium (500), Bold (700) at 22px
   - Label each with family name + weight name + numeric weight

3. **Typography — Type Scale**
   - Render a specimen for every `--fs-*` token: `--fs-xs` through `--fs-5xl`
   - Show the token name, pixel value, and a live sample sentence ("Current Salon & Color Bar") at that size
   - Alternate between IvyBodoni (display) and Lato (body) to show both faces across the scale

4. **Typography — Headings & Body**
   - H1–H4 using IvyBodoni at the sizes used on the site (h1: --fs-4xl, h2: --fs-3xl, h3: --fs-2xl, h4: --fs-xl)
   - Body paragraph using Lato Regular at --fs-base with --lh-loose
   - Small/caption text using Lato at --fs-sm and --fs-xs
   - Navigation label using Lato at --fs-sm, uppercase, --ls-wide
   - Photo card label using Lato at --fs-sm, uppercase, --ls-widest

5. **Spacing**
   - Visual bar chart: for each `--space-*` token, show a horizontal bar whose width equals the token value, with the token name and px value labeled

6. **Border Radius**
   - A row of square swatches (64×64px, gold fill) showing each `--radius-*` value applied

7. **Shadows**
   - Two white cards side-by-side: one with `--shadow-card`, one with `--shadow-photo`

## Styleguide chrome styles
- Page background: `var(--color-sand-medium)`
- Section headings: Lato Bold, uppercase, `--ls-wide`, `--color-text-secondary`, bottom border in `--color-gold`
- Token labels: Lato, `--fs-xs`, `--color-text-muted`
- Max width: `var(--max-width)`, centered, `96px` horizontal padding
- Consistent `48px` vertical gap between sections

## Rules
- The generated HTML must be fully self-contained — opening it in a browser without a local server should still render fonts (they load from CDN)
- Do not link `styles.css` or `pages.css` — this page only needs `design-system.css` tokens
- Token names and hex values must exactly match what's in `design-system.css`
- After generating, confirm the file was written and mention the URL: http://localhost:3000/styleguide.html
