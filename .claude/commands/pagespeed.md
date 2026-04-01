# PageSpeed Audit & Fix

Run Google Lighthouse audits on every page, read the results, and apply fixes until all pages score ≥ 90 in Performance, Accessibility, Best Practices, and SEO — on both mobile and desktop viewports.

## Tools
- `lighthouse` — Google's CLI tool (installed globally via npm, powers PageSpeed Insights)
- Local dev server must be running on http://localhost:3000 (start with `python3 -m http.server 3000` from project root if not running)

## Pages to audit
| Page | URL |
|---|---|
| Homepage | http://localhost:3000/index.html |
| Salon | http://localhost:3000/salon.html |
| Team | http://localhost:3000/team.html |
| Services | http://localhost:3000/services.html |
| Resources | http://localhost:3000/resources.html |
| Careers | http://localhost:3000/careers.html |

## Running audits

### Single page, both viewports
```bash
# Mobile (default)
lighthouse http://localhost:3000/index.html \
  --output=json \
  --output-path=/tmp/lh-index-mobile.json \
  --chrome-flags="--headless" \
  --quiet

# Desktop
lighthouse http://localhost:3000/index.html \
  --output=json \
  --output-path=/tmp/lh-index-desktop.json \
  --preset=desktop \
  --chrome-flags="--headless" \
  --quiet
```

### Extract scores from JSON output
```bash
node -e "
const r = require('/tmp/lh-index-mobile.json').categories;
console.log('Performance:', Math.round(r.performance.score * 100));
console.log('Accessibility:', Math.round(r.accessibility.score * 100));
console.log('Best Practices:', Math.round(r['best-practices'].score * 100));
console.log('SEO:', Math.round(r.seo.score * 100));
"
```

### Batch audit all pages (mobile + desktop)
```bash
for page in index salon team services resources careers; do
  echo "=== $page (mobile) ==="
  lighthouse http://localhost:3000/$page.html \
    --output=json --output-path=/tmp/lh-$page-mobile.json \
    --chrome-flags="--headless" --quiet
  node -e "
    const r = require('/tmp/lh-$page-mobile.json').categories;
    console.log('Perf:', Math.round(r.performance.score*100),
      '| A11y:', Math.round(r.accessibility.score*100),
      '| BP:', Math.round(r['best-practices'].score*100),
      '| SEO:', Math.round(r.seo.score*100));
  "
  echo "=== $page (desktop) ==="
  lighthouse http://localhost:3000/$page.html \
    --output=json --output-path=/tmp/lh-$page-desktop.json \
    --preset=desktop --chrome-flags="--headless" --quiet
  node -e "
    const r = require('/tmp/lh-$page-desktop.json').categories;
    console.log('Perf:', Math.round(r.performance.score*100),
      '| A11y:', Math.round(r.accessibility.score*100),
      '| BP:', Math.round(r['best-practices'].score*100),
      '| SEO:', Math.round(r.seo.score*100));
  "
done
```

### Read specific audit failures from a result file
```bash
node -e "
const audits = require('/tmp/lh-index-mobile.json').audits;
Object.values(audits)
  .filter(a => a.score !== null && a.score < 1)
  .sort((a,b) => a.score - b.score)
  .forEach(a => console.log(a.score?.toFixed(2), a.id, '-', a.title));
"
```

## Common fixes and how to apply them

### Performance
| Audit | Fix |
|---|---|
| Largest Contentful Paint (LCP) slow | Add `fetchpriority="high"` to the hero `<img>` on each page. Remove `loading="lazy"` from hero images (already done). |
| Render-blocking resources | Move non-critical CSS to load async; ensure GSAP loads with `defer` (already done). |
| Image sizing | Confirm `sips -Z` resize ran. Add explicit `width` and `height` attributes to `<img>` tags to prevent layout shift. |
| Unused JavaScript | GSAP is loaded globally — if a page has no animations, consider not loading it (or use GSAP's modular imports). |
| Font display swap | Add `&display=swap` to Google Fonts URL if missing. Add `font-display: swap` to any `@font-face` in `design-system.css`. |

### Accessibility
| Audit | Fix |
|---|---|
| Missing alt text | Every `<img>` that conveys content needs a descriptive `alt`. Decorative images use `alt=""` — that's correct. |
| Color contrast | Text must meet 4.5:1 ratio. Check `--color-text-muted: #616161` on light backgrounds — may need darkening. |
| Links missing discernible text | Icon-only links (social icons in footer) already have `aria-label` — verify they're present. |
| Heading order skipped | Pages must not skip heading levels (h1 → h3 without h2). Check each page's heading structure. |
| Buttons without names | `.nav-toggle` burger button already has `aria-label="Toggle navigation"` — verify. |
| Form labels | No forms currently — N/A. |

### Best Practices
| Audit | Fix |
|---|---|
| Images with incorrect aspect ratio | Add explicit `width` and `height` attributes to `<img>` tags matching the intrinsic dimensions. |
| Console errors | Check browser console for 404s on missing assets or JS errors. |
| `<picture>` without width/height | Add `width` and `height` to the `<img>` inside each `<picture>` element. |

### SEO
| Audit | Fix |
|---|---|
| Missing meta description | Add `<meta name="description" content="...">` to each page's `<head>`. |
| Links not crawlable | Ensure nav links are real `<a href="">` tags (not `href="#"` placeholders). |
| `robots.txt` missing | Create a basic `robots.txt` at project root. |
| `<title>` not descriptive | Each page already has a unique `<title>` tag — verify length is 50–60 chars. |
| Tap targets too small | Interactive elements should be ≥ 48×48px on mobile. Check nav links and buttons. |

## Meta descriptions to add (per page)
Add inside `<head>` of each file:

```html
<!-- index.html -->
<meta name="description" content="Current Salon & Color Bar — Ashburn, VA's first and only MOB Certified Diamond Salon. Expert hair color, cuts, extensions, and more at One Loudoun." />

<!-- salon.html -->
<meta name="description" content="Discover Current Salon in Ashburn, VA — an award-winning, MOB Certified Diamond Salon offering expert hair care in a modern One Loudoun location." />

<!-- team.html -->
<meta name="description" content="Meet the Current Salon team — led by award-winning stylist Nese Altas, our stylists bring passion, precision, and artistry to every appointment." />

<!-- services.html -->
<meta name="description" content="Explore Current Salon's full menu of services — cuts, color, highlights, extensions, texture treatments, waxing, threading, and more in Ashburn, VA." />

<!-- resources.html -->
<meta name="description" content="Hair tips, style inspiration, and expert advice from the team at Current Salon & Color Bar in Ashburn, VA." />

<!-- careers.html -->
<meta name="description" content="Join the Current Salon team in Ashburn, VA. We're hiring experienced stylists, coordinators, and assistants. Grow your career in a Diamond-certified salon." />
```

## robots.txt to create at project root
```
User-agent: *
Allow: /
```

## fetchpriority for LCP images
Add `fetchpriority="high"` to the hero image `<img>` on each page (the one inside `.hero-bg` or `.page-hero-bg`):
```html
<img
  src="./images/index/hero-bg.jpg"
  alt=""
  fetchpriority="high"
/>
```

## Width/height attributes
To prevent Cumulative Layout Shift (CLS), add `width` and `height` to every `<img>` inside a `<picture>`. Use the intrinsic pixel dimensions of the image file:
```bash
# Get dimensions of a file
sips -g pixelWidth -g pixelHeight images/index/hero-bg.jpg
```

## Workflow
1. Start local server: `python3 -m http.server 3000` from project root
2. Run batch audit (see above) — note every score below 90
3. Group failures by category (Performance / Accessibility / Best Practices / SEO)
4. Apply fixes in order: SEO and Accessibility first (easiest, highest impact), then Performance
5. Re-run audit on fixed pages to confirm scores
6. Repeat until all pages ≥ 90 on both viewports
7. Run `/push-github` to commit improvements

## Target
All 6 pages must score **≥ 90** in all four categories on **both mobile and desktop** before considering this complete.
