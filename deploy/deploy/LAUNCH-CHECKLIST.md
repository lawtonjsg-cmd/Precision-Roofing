# Precision Roofing Alabama — Launch Checklist

Everything needed to take this site live on Vercel at
**www.precisionroofingalabama.com** (currently on Wix).

---

## 1. Deploy to Vercel
1. Create a free account at https://vercel.com
2. Add a **New Project** → upload this folder (or push it to a GitHub repo and import it).
3. No build settings needed — it's a static site with serverless functions in `/api`.
   `vercel.json` already configures clean URLs (e.g. `/roof-repairs`) and caching.
4. Vercel gives you a temporary `*.vercel.app` URL — test everything there first.

## 2. Connect the domain (do this LAST, and don't cancel Wix until it works)
1. In Vercel: **Project → Settings → Domains → Add** `precisionroofingalabama.com`
   and `www.precisionroofingalabama.com`.
2. Vercel shows DNS records (an A record and/or CNAME).
3. Go to wherever the domain's DNS is managed (Wix or your registrar) and update the
   records to point to Vercel.
4. Wait for it to propagate (minutes to a few hours). Once the Vercel URL loads on your
   domain, the new site is live. **Then** you can retire the Wix site.

## 3. Email (contact form) — Resend
The form posts to `/api/lead`, which emails you the lead **and** auto-replies to the customer.
1. Create a free account at https://resend.com
2. Get an **API Key** (starts with `re_`).
3. (Recommended) Verify the domain `precisionroofingalabama.com` in Resend so emails send
   from your own address. Until then you can use `onboarding@resend.dev` as the sender.
4. In Vercel: **Settings → Environment Variables**, add:
   | Name | Value |
   |------|-------|
   | `RESEND_API_KEY` | your `re_...` key |
   | `LEAD_TO_EMAIL`  | `Contact.precsionral@gmail.com` (where leads arrive) |
   | `FROM_EMAIL`     | `Precision Roofing Alabama <leads@precisionroofingalabama.com>` (or `onboarding@resend.dev` to start) |
5. Redeploy. Submit a test on the live site and confirm you receive the email.

## 4. Conversion tracking (Google Ads / GA4 / Meta)
Open `tracking.js` and replace the placeholder IDs in the `CONFIG` block:
- `GA4_ID` — GA4 Measurement ID (`G-XXXX`)
- `GOOGLE_ADS_ID` — Google Ads Conversion ID (`AW-XXXX`)
- `ADS_LEAD_LABEL` — conversion label for **form submits**
- `ADS_CALL_LABEL` — conversion label for **phone-call clicks**
- `META_PIXEL_ID` — (optional) Meta Pixel
Conversions fire automatically: form submission → Lead, any phone-link tap → Call.

## 5. SEO / local
- `sitemap.xml` and `robots.txt` are included.
- After launch, submit the site in **Google Search Console** and add the sitemap:
  `https://www.precisionroofingalabama.com/sitemap.xml`
- Biggest local-ranking lever: a verified **Google Business Profile** with the exact same
  name, phone `(334) 303-6398`, and Alabama service area as the site.
- Want me to add your specific service cities into the structured data? Just send the list.

## 6. Photos to drop in (drag onto the placeholders in the editor)
- Home: 3 service card photos, gallery photos
- Roof Replacements / Roof Repairs / Insurance Claim Help: one project photo each
- A branded share image for link previews (currently uses `assets/hero.jpg`)

---

### Page map
| Page | File | Live URL |
|------|------|----------|
| Home | `index.html` | `/` |
| About | `about.html` | `/about` |
| Financing | `financing.html` | `/financing` |
| Roof Replacements | `roof-replacements.html` | `/roof-replacements` |
| Roof Repairs | `roof-repairs.html` | `/roof-repairs` |
| Insurance Claim Help | `insurance-claims.html` | `/insurance-claims` |
