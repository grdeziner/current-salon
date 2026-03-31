# Pull Figma Design

Given a Figma URL, fetch the design context and update the corresponding page.

## Steps
1. Use `mcp__claude_ai_Figma__get_design_context` with the provided URL (fileKey: `chFexMPdspmth0UQOioM59`)
2. Identify which HTML file the node belongs to (index, salon, team, services, resources, careers)
3. Download all new image assets to the correct `images/[page]/` subfolder
4. Update the HTML file to reference the local image paths
5. Verify no `figma.com/api/mcp/asset` URLs remain in the file

## Rules
- Never use Tailwind or React — this is plain HTML/CSS
- All images must be saved locally before updating HTML
- Use meaningful filenames (e.g. `hero-bg.jpg`, `cut-style.jpg`)
- Shared assets (logos) go in `images/shared/`
- Page-specific assets go in `images/[page]/`

## Usage
Provide a Figma node URL and specify which page to update.
