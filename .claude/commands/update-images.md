# Update Page Images

Download and replace images for a specific page, removing any expiring Figma asset URLs.

## Steps
1. Scan the target HTML file for any remaining `figma.com/api/mcp/asset` URLs
2. For each URL, determine a meaningful local filename based on its context (alt text, surrounding HTML)
3. Download each asset to the correct `images/[page]/` folder
4. Replace Figma URLs in the HTML with local relative paths (`./images/[page]/filename.ext`)
5. Verify no Figma URLs remain

## Image folder structure
- `images/shared/` — logos and assets used across all pages
- `images/index/` — homepage assets
- `images/salon/` — salon page assets
- `images/team/` — team page assets
- `images/services/` — services page assets
- `images/resources/` — resources page assets
- `images/careers/` — careers page assets

## Usage
Specify which page to update, or say "all pages" to scan every HTML file.
