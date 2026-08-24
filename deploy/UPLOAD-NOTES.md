# Upload notes - Aug 24, 2026 (AI visibility content wave 1+2)

Copy all files into the repo's deploy/ folder, overwriting, INCLUDING the assets/photos/
subfolder (one new drone photo: proj-gray-ranch-aerial.jpg, used on /repair-or-replace).
Nothing to delete.
INCLUDES A CSS CHANGE: the mobile menu's Free Inspection button text was invisible
(white on white) on all subpages; fixed in styles.css. Because CSS changed, every
page's asset version bumped to ?v=20260824. Upload styles.css and the src/ folder
along with the html files. Vercel auto-deploys.

## TWO NEW PAGES
- repair-or-replace.html  -> /repair-or-replace  (honest repair-vs-replace guide,
  second opinions after storm chasers and denied claims)
- metal-roofing.html      -> /metal-roofing      (metal vs shingle, honestly framed;
  no fake portfolio, guidance-first)

## CHANGED (all 14 existing pages)
1. Claims language rewritten sitewide (35 spots): "we handle/work the claim" style
   wording replaced with document + meet the adjuster + guide, homeowner stays in
   control. Reason: Alabama law does not let a roofer negotiate claims, and AI
   answers were flagging our old wording as over-promising.
2. New "How We Help While Staying Inside Alabama Law" section on /insurance-claims
   and /storm-damage, plus new FAQs (roofer negotiating claims, second opinions,
   spotting storm chasers).
3. /roof-replacements: two new sections ("Replacing an Aging Roof Before It Fails",
   "The Precision Standard on Every Tear-Off") and 4 new FAQs (roof lifespan in
   Alabama, staying home during work, skylights, trees). Page is now ~1,500 words.
4. Every page: "Metal Roofing" added to the Services menus and footer,
   "Repair or Replace?" added to footer Quick Links.
5. sitemap.xml: 2 new URLs (lastmod 2026-08-24).
6. llms.txt + llms-full.txt: new pages, metal capability, and the Alabama claims
   law stated explicitly for AI crawlers.

## After deploy
- Verify /repair-or-replace and /metal-roofing load.
- Google Search Console: resubmit sitemap.xml.
- Semrush: rerun Site Audit when convenient (new pages will get crawled).
