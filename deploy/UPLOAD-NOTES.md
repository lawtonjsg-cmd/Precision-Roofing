# Upload notes - Aug 20, 2026 (round 2: address locality)

SMALL UPDATE. Nothing to delete this time, nothing else changed.

Copy these 16 files into the repo root, overwriting. Vercel redeploys automatically.

## What changed
- All 14 .html files: the PostalAddress in the schema now includes
  addressLocality "Opelika" and postalCode "36804", alongside the existing
  addressRegion AL and addressCountry US. streetAddress is intentionally left out,
  which is correct for a service-area business.
- llms.txt and llms-full.txt: state that the company is based in Opelika 36804 and
  serves the entire State of Alabama, so AI answers do not describe it as
  Opelika-only.

areaServed is untouched and still covers the whole state plus all six named
metros, so statewide reach is unaffected.

## After deploy
Semrush -> Site Audit -> Rerun campaign (the trial makes this work now).
