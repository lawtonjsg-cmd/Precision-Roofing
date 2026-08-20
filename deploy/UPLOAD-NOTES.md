# Upload notes - Aug 20, 2026 (round 3: BBB seal)

Nothing to delete. Copy these into the repo root, keeping the src/ subfolder.

## Files
- 14 .html  - BBB seal added, plus the BBB profile added to schema sameAs
- styles.css      - minified, now includes the .bbb-seal rules
- src/styles.css  - readable source (edit here, then re-minify)

## Where the seal now appears
- Homepage, "Why Alabama Homeowners Choose Us" band, beside the CertainTeed logo
- About page, beside the CertainTeed logo
- Footer of all 14 pages

## Sizing
Body 38px desktop / 34px mobile. Footer 32px desktop / 30px mobile.
Floor is 30px, below that the seal's date and "Click for Profile" stop being
legible. Aspect ratio is locked at the native 4.76:1 everywhere.

## The seal is HOTLINKED on purpose
It is generated live by BBB and stamps its own "As of <date>" line. Saving a copy
would freeze that date and go stale, so it must load from seal-centralgeorgia.bbb.org.
width and height are set on the img so there is no layout shift while it loads.

## Re-minify after editing src/styles.css
npx clean-css-cli -O2 -o styles.css src/styles.css

