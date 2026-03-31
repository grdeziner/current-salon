# Create New Page

Scaffold a new inner page that matches the existing site structure.

## Steps
1. Copy the header/footer/nav pattern from `salon.html`
2. Link `styles.css`, `pages.css`, and GSAP CDN
3. Set the correct `aria-current="page"` on the matching nav link
4. Add the page hero section (`.page-hero`) with a background image placeholder
5. Build out page content sections using existing CSS classes where possible
6. Add the standard JS block at the bottom (mobile nav toggle, GSAP button/photo hovers)
7. Update all other pages' nav to include a link to the new page

## Design system reference
- Colors: `design-system.css` — use `var(--color-*)` tokens
- Typography: IvyBodoni (`--font-display`) for headings, Lato (`--font-body`) for body
- Spacing: `var(--space-*)` tokens (4px–180px scale)
- Container: `.container` class (max-width 1360px desktop / 960px tablet / 92.5% mobile)

## GSAP hover rules
- All photo elements: `scale: 1.1`, `duration: 0.6`, `ease: 'power2.inOut'`
- `.btn-outline`: background fill to `#2d2d2d`, color to white, `duration: 0.5`, `ease: 'sine.inOut'`
- `.nav-cta`: background to `#2d2d2d` from `#616161`, `duration: 0.5`, `ease: 'sine.inOut'`
- Never use CSS `transition` on interactive photo or button elements — GSAP only

## Usage
Provide the page name, Figma URL (optional), and a brief description of the content.
