# Upload notes - Aug 20, 2026 (Semrush fixes + AI visibility)

Copy every file here into the repo root, keeping the `src/` subfolder.

## MUST DO: delete one file from the repo
- `tweaks-panel.jsx`  <- DELETE. Uploading files will not remove it.
  It was a leftover design-editor panel pulling 2.3 MB of React dev builds
  from unpkg onto the live /about page.

## New files
- `llms.txt`       - concise AI crawler summary of the business
- `llms-full.txt`  - full text of all 14 pages for AI ingestion (11,400 words)
- `src/`           - readable originals of the JS/CSS

## Changed
all 14 .html, robots.txt, sitemap.xml, vercel.json,
styles.css, script.js, subpage.js, tracking.js, roof-video.js (minified)

## Re-minify after editing src/
npx terser src/script.js -c -m --comments false -o script.js
npx clean-css-cli -O2 -o styles.css src/styles.css

## After deploy
1. Semrush -> Site Audit -> Rerun campaign
2. Google Search Console -> resubmit sitemap.xml
