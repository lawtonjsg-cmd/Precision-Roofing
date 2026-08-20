# Upload notes - Aug 20, 2026 (round 4: asset version query)

14 .html files only. No CSS/JS changed, nothing to delete.

## What changed
Every reference to the cached CSS/JS now carries ?v=20260820:

  styles.css?v=20260820     (14 refs)
  tracking.js?v=20260820    (14 refs)
  subpage.js?v=20260820     (13 refs)
  script.js?v=20260820       (1 ref)
  roof-video.js?v=20260820   (1 ref)

43 references total.

## Why
vercel.json caches those five files for 24 hours. Without a version in the URL,
a returning visitor gets NEW html with OLD css/js for up to a day. That is what
would have made the BBB seal render about 3x too tall in the footer for anyone
who had visited recently.

The bigger risk is tracking.js, which holds the Google Ads conversion labels and
the Meta Pixel id. A stale copy after a tracking change means lost conversion
data, which is much worse than a misaligned logo.

## THE ONE RULE
Whenever you change styles.css or any of the .js files, bump the number in all
14 html files. If you forget, returning visitors keep the old file for 24h.

Find and replace across the 14 files:
  v=20260820   ->   v=<today as YYYYMMDD>

## Verified before staging
- Cache-Control header still applies with the query string (checked live:
  /styles.css?v=... still returns public, max-age=86400). Vercel matches the
  source pattern on the path, not the query.
- All 43 versioned references resolve to real files, 0 broken.
- CSS confirmed applying on 5 pages, gtag and prTrackLead both still functions.
