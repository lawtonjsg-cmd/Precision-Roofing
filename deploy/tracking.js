/* ============================================================
   Precision Roofing Alabama LLC - Conversion Tracking
   ------------------------------------------------------------
   Fires a conversion on:
     1. Quote-form submissions  -> window.prTrackLead()
     2. Click-to-call taps on ANY phone link (auto)

   >>> REPLACE the placeholder IDs below with your real ones <<<
   Google Ads  -> Tools & Settings > Conversions
   GA4         -> Admin > Data Streams (Measurement ID)
   Meta Pixel  -> Events Manager
   Until you fill these in, tracking safely no-ops (and logs to
   the console so you can confirm the events are firing).
   ============================================================ */
(function () {
  var CONFIG = {
    GA4_ID:         'G-XXXXXXXXXX',         // GA4 Measurement ID (optional)
    GOOGLE_ADS_ID:  'AW-18112449753',       // Google Ads Conversion ID
    ADS_LEAD_LABEL: 'ctJ0CJn0lMkcENmZ2LxD', // Google Ads label: form lead
    ADS_CALL_LABEL: '5C6_CJz0lMkcENmZ2LxD', // Google Ads label: phone call
    META_PIXEL_ID:  ''                       // Meta (Facebook) Pixel ID (optional)
  };

  function configured(id) { return !!id && id.indexOf('XXXX') === -1; }

  // ---- Google tag (gtag.js) ----
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  var googleId = configured(CONFIG.GOOGLE_ADS_ID) ? CONFIG.GOOGLE_ADS_ID
               : (configured(CONFIG.GA4_ID) ? CONFIG.GA4_ID : null);
  if (googleId) {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + googleId;
    document.head.appendChild(s);
    gtag('js', new Date());
    if (configured(CONFIG.GA4_ID)) gtag('config', CONFIG.GA4_ID);
    if (configured(CONFIG.GOOGLE_ADS_ID)) gtag('config', CONFIG.GOOGLE_ADS_ID);
  }

  // ---- Meta Pixel (optional) ----
  if (configured(CONFIG.META_PIXEL_ID)) {
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ?
      n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
      n.queue = []; t = b.createElement(e); t.async = !0; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', CONFIG.META_PIXEL_ID);
    fbq('track', 'PageView');
  }

  // ---- Conversion fire helpers ----
  window.prTrackLead = function (extra) {
    try {
      // Enhanced Conversions: pass what the user typed; Google hashes it
      var emailEl = document.getElementById('email');
      var phoneEl = document.getElementById('phone');
      gtag('set', 'user_data', {
        email: (emailEl && emailEl.value) || '',
        phone_number: (phoneEl && phoneEl.value) || ''
      });
      if (configured(CONFIG.GOOGLE_ADS_ID) && configured(CONFIG.ADS_LEAD_LABEL))
        gtag('event', 'conversion', { send_to: CONFIG.GOOGLE_ADS_ID + '/' + CONFIG.ADS_LEAD_LABEL, value: 1.0, currency: 'USD' });
      if (configured(CONFIG.GA4_ID)) gtag('event', 'generate_lead', extra || {});
      if (window.fbq) fbq('track', 'Lead');
    } catch (e) {}
    if (!configured(CONFIG.GOOGLE_ADS_ID))
      console.log('[tracking] Lead conversion fired (add your IDs in tracking.js to report it live).');
  };

  window.prTrackCall = function () {
    try {
      if (configured(CONFIG.GOOGLE_ADS_ID) && configured(CONFIG.ADS_CALL_LABEL))
        gtag('event', 'conversion', { send_to: CONFIG.GOOGLE_ADS_ID + '/' + CONFIG.ADS_CALL_LABEL, value: 1.0, currency: 'USD' });
      if (configured(CONFIG.GA4_ID)) gtag('event', 'click_to_call');
      if (window.fbq) fbq('track', 'Contact');
    } catch (e) {}
    if (!configured(CONFIG.GOOGLE_ADS_ID))
      console.log('[tracking] Call conversion fired (add your IDs in tracking.js to report it live).');
  };

  // ---- Auto-fire a call conversion on any phone-link tap ----
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="tel:"]');
    if (a) window.prTrackCall();
  }, true);
})();
