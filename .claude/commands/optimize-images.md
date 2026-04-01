# Optimize Images

Compress, resize, and convert all site images to WebP format, then update HTML to use WebP with JPEG fallbacks.

## Tools required (all installed)
- `sips` — macOS built-in, resizes JPEGs/PNGs
- `cwebp` — converts to WebP (installed via `brew install webp`)
- `pngquant` — lossless-to-lossy PNG compression (installed via `brew install pngquant`)

## Target dimensions by image role
| Role | Max width | Notes |
|---|---|---|
| Hero / full-bleed backgrounds | 1440px | Large but critical — no lazy load |
| Section backgrounds | 1440px | Can lazy load |
| Intro / team photos | 900px | Portrait orientation |
| Service cards | 900px | Landscape, 2-up grid |
| Feed / blog cards | 800px | Square-ish crops |
| Award logos / icons | 300px | PNGs, keep crisp |
| Logos (header/footer) | 460px | PNGs, no resize needed |

## WebP quality targets
- Hero / large backgrounds: quality 80
- Section backgrounds: quality 75
- Card / feed images: quality 80
- PNGs converted to WebP: quality 85

## Step-by-step process

### 1. Resize original JPEGs with sips
```bash
# Full-bleed / hero backgrounds
sips -Z 1440 images/index/hero-bg.jpg

# Card and content images
sips -Z 900 images/services/cut-style.jpg
```

### 2. Convert every JPG to WebP (primary delivery format)
All JPGs must be converted to WebP. The `.webp` file sits alongside the original `.jpg`.
```bash
cwebp -q 80 images/services/cut-style.jpg -o images/services/cut-style.webp
```

**Batch convert all JPGs at once:**
```bash
find images -name "*.jpg" | while read f; do
  cwebp -q 80 "$f" -o "${f%.jpg}.webp"
done
```

### 3. Compress PNGs with pngquant
```bash
pngquant --quality=65-85 --force --output images/salon/award-3.png images/salon/award-3.png
```

### 4. Update HTML — replace img tags with picture elements
Every `<img>` referencing a `.jpg` must become a `<picture>` element.
WebP is listed first so supporting browsers (97%+) use it automatically;
the `.jpg` is the fallback.

```html
<!-- Before -->
<img src="./images/services/cut-style.jpg" alt="Cut & Style" />

<!-- After -->
<picture>
  <source srcset="./images/services/cut-style.webp" type="image/webp" />
  <img src="./images/services/cut-style.jpg" alt="Cut & Style" loading="lazy" />
</picture>
```

### 5. Lazy loading rules
- **No `loading="lazy"`**: hero background images, header logo (above the fold, critical)
- **Add `loading="lazy"`**: all other images — section bgs, cards, feed photos, footer logo, team photos

## Full batch optimization script
Run from the project root:

```bash
# Step 1 — Resize JPEGs
find images -name "*.jpg" | while read f; do
  if [[ "$f" == *"hero-bg"* ]] || [[ "$f" == *"-bg."* ]] || [[ "$f" == *"artistry-bg"* ]] || [[ "$f" == *"awards-bg"* ]] || [[ "$f" == *"founders-bg"* ]]; then
    sips -Z 1440 "$f" --out "$f" > /dev/null
  elif [[ "$f" == *"/shared/"* ]]; then
    : # skip logos
  else
    sips -Z 900 "$f" --out "$f" > /dev/null
  fi
done

# Step 2 — Convert all JPEGs to WebP
find images -name "*.jpg" | while read f; do
  cwebp -q 80 "$f" -o "${f%.jpg}.webp" 2>/dev/null
done

# Step 3 — Compress PNGs (skip shared logos)
find images -name "*.png" ! -path "*/shared/*" | while read f; do
  pngquant --quality=65-85 --force --output "$f" "$f" 2>/dev/null
done
```

## HTML update rules
When updating img tags across all HTML files:
- Wrap every local `.jpg` img in a `<picture>` element (see pattern above)
- Keep all existing attributes on the `<img>` tag (class, alt, aria-hidden, style, etc.)
- Only add `loading="lazy"` — do not change any other attribute
- Do NOT wrap images already inside a `<picture>` tag
- Do NOT convert PNG img tags — leave them as plain `<img>` (PNGs are logos/icons)
- The `.webp` srcset path always matches the `.jpg` path with the extension swapped

## Rules
- Always keep the original `.jpg` alongside the `.webp` — the JPEG is the fallback
- Do not delete originals
- Do not resize logos in `images/shared/`
- Run the batch script from the project root directory
- Verify images look correct in the browser before committing

## Expected savings
- Raw Figma JPEGs (10–15MB) → resized JPEGs: ~1–2MB (80–90% reduction)
- Resized JPEGs → WebP: additional 70–90% reduction
- Final WebP files for this project: 40–200KB per image
- Total page weight target: under 2MB per page

## Usage
Say "optimize all images", "optimize [page] images", or "convert all JPGs to WebP".
After optimizing, use `/push-github` to commit the changes.
