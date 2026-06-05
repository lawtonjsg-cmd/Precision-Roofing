// ============================================================
// Vercel Serverless Function — /api/lead
// Sends a lead email to the business + an auto-reply to the
// customer, using Resend (https://resend.com).
//
// Set these Environment Variables in Vercel
// (Project > Settings > Environment Variables):
//   RESEND_API_KEY  -> your Resend API key (starts with "re_")
//   LEAD_TO_EMAIL   -> where leads should be delivered
//                      e.g. Contact.precsionral@gmail.com
//   FROM_EMAIL      -> a VERIFIED Resend sender. Until your domain
//                      is verified you can use: onboarding@resend.dev
//                      After verifying precisionroofingalabama.com:
//                      "Precision Roofing Alabama <leads@precisionroofingalabama.com>"
// ============================================================

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const name = (body.name || '').trim();
    const email = (body.email || '').trim();
    const phone = (body.phone || '').trim();
    const service = (body.service || '').trim();
    const message = (body.message || '').trim();

    if (!name || !email) {
      res.status(400).json({ error: 'Missing name or email' });
      return;
    }

    const KEY = process.env.RESEND_API_KEY;
    const TO = process.env.LEAD_TO_EMAIL;
    const FROM = process.env.FROM_EMAIL;
    if (!KEY || !TO || !FROM) {
      res.status(500).json({ error: 'Email service not configured' });
      return;
    }

    const esc = (s) => String(s || '').replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]));
    const row = (label, val) => val
      ? `<tr><td style="padding:6px 14px 6px 0;color:#43586A;font:600 14px Arial,sans-serif">${label}</td><td style="padding:6px 0;color:#16242E;font:400 14px Arial,sans-serif">${esc(val)}</td></tr>`
      : '';

    // 1) Lead notification to the business
    const leadHtml = `
      <div style="background:#0F364F;padding:20px 24px;border-radius:8px 8px 0 0">
        <h2 style="margin:0;color:#fff;font:800 20px Arial,sans-serif">New Quote Request</h2>
      </div>
      <div style="border:1px solid #e6e0d3;border-top:0;border-radius:0 0 8px 8px;padding:22px 24px">
        <table style="border-collapse:collapse">
          ${row('Name', name)}
          ${row('Email', email)}
          ${row('Phone', phone)}
          ${row('Service', service)}
          ${row('Message', message)}
        </table>
        <p style="margin:20px 0 0;color:#43586A;font:400 12px Arial,sans-serif">
          Sent from precisionroofingalabama.com</p>
      </div>`;

    const send = (payload) => fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const r1 = await send({
      from: FROM,
      to: [TO],
      reply_to: email,
      subject: `New Quote Request — ${name}`,
      html: leadHtml
    });
    if (!r1.ok) {
      const detail = await r1.text();
      res.status(502).json({ error: 'Lead email failed', detail });
      return;
    }

    // 2) Auto-reply to the customer
    const replyHtml = `
      <div style="max-width:560px;margin:0 auto">
        <div style="background:#0F364F;padding:24px;border-radius:8px 8px 0 0">
          <h2 style="margin:0;color:#fff;font:800 22px Arial,sans-serif">Thank You, ${esc(name)}!</h2>
        </div>
        <div style="border:1px solid #e6e0d3;border-top:0;border-radius:0 0 8px 8px;padding:24px;color:#16242E;font:400 15px/1.6 Arial,sans-serif">
          <p style="margin:0 0 14px">We've received your request and a member of the Precision Roofing Alabama team will be in touch shortly.</p>
          <p style="margin:0 0 14px">For anything urgent, call us directly at
            <a href="tel:+13343036398" style="color:#0F364F;font-weight:700">(334) 303-6398</a>.</p>
          <p style="margin:18px 0 0;color:#43586A;font-size:13px">Built with Precision. Protected for Years.<br>
            Precision Roofing Alabama LLC · Licensed &amp; Insured · HB&nbsp;#41012</p>
        </div>
      </div>`;

    // Auto-reply is best-effort; don't fail the request if it bounces.
    try {
      await send({
        from: FROM,
        to: [email],
        subject: 'We received your request — Precision Roofing Alabama',
        html: replyHtml
      });
    } catch (e) { /* ignore */ }

    res.status(200).json({ success: true });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
}
