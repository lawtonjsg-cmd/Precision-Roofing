/* Precision Roofing Alabama LLC — interactions */
(function () {
  // year
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // header shadow on scroll
  var header = document.getElementById('header');
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 12) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // mobile menu
  var burger = document.getElementById('burger');
  var navLinks = document.getElementById('navLinks');
  burger.addEventListener('click', function () {
    var open = navLinks.classList.toggle('open');
    burger.classList.toggle('active', open);
  });
  navLinks.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      navLinks.classList.remove('open');
      burger.classList.remove('active');
    });
  });

  // scroll reveal
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el, i) {
      // small stagger for grids
      el.style.transitionDelay = (Math.min(i % 6, 5) * 60) + 'ms';
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  // form validation + email send + success
  var form = document.getElementById('quoteForm');
  var success = document.getElementById('formSuccess');

  // ---- Email delivery (Vercel function + Resend) ----
  // Submissions POST to /api/lead, which emails you the lead and sends
  // the customer an auto-reply. Configure RESEND_API_KEY / LEAD_TO_EMAIL /
  // FROM_EMAIL as Environment Variables in your Vercel project.
  var FORM_ENDPOINT = '/api/lead';

  function setErr(id, isErr) {
    var f = document.getElementById(id).closest('.field');
    if (f) f.classList.toggle('err', isErr);
  }
  function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
  function validPhone(v) { return (v.replace(/\D/g, '').length >= 10); }

  function showSuccess() {
    form.style.display = 'none';
    success.classList.add('show');
    if (window.prTrackLead) window.prTrackLead({ form: 'quote' });
  }
  function showSendError(btn) {
    if (btn) { btn.disabled = false; btn.textContent = 'Send Message'; }
    var note = document.getElementById('formErrNote');
    if (!note) {
      note = document.createElement('p');
      note.id = 'formErrNote';
      note.style.cssText = 'margin-top:14px;color:#b3261e;font-size:14.5px;font-weight:600';
      form.appendChild(note);
    }
    note.textContent = "Sorry — something went wrong sending your message. Please call us at (334) 303-6398.";
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = true;
    var name = document.getElementById('name').value.trim();
    var phone = document.getElementById('phone').value.trim();
    var email = document.getElementById('email').value.trim();
    var service = document.getElementById('service').value;
    var message = document.getElementById('message').value.trim();

    setErr('name', !name); if (!name) ok = false;
    setErr('email', !validEmail(email)); if (!validEmail(email)) ok = false;
    // phone optional — validate only if something was entered
    if (phone) { setErr('phone', !validPhone(phone)); if (!validPhone(phone)) ok = false; }
    else { setErr('phone', false); }

    if (!ok) {
      var firstErr = form.querySelector('.field.err input, .field.err select');
      if (firstErr) firstErr.focus();
      return;
    }

    // In the in-tool preview there is no backend, so show the demo success.
    // On the live site, /api/lead handles delivery.
    var isLive = location.hostname.indexOf('precisionroofingalabama') !== -1;
    function handleFail() { if (isLive) { showSendError(btn); } else { showSuccess(); } }

    var btn = form.querySelector('button[type="submit"]');
    if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }

    fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        name: name,
        email: email,
        phone: phone,
        service: service,
        message: message
      })
    })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (res) { if (res && res.success) { showSuccess(); } else { handleFail(); } })
      .catch(function () { handleFail(); });
  });

  // clear error as user types
  ['name', 'phone', 'email'].forEach(function (id) {
    var el = document.getElementById(id);
    el.addEventListener('input', function () { setErr(id, false); });
    el.addEventListener('change', function () { setErr(id, false); });
  });

  // Land precisely on a hash target when arriving from another page
  // (the tall hero + lazy media shift layout, so re-scroll after it settles).
  function goToHash() {
    if (!location.hash || location.hash === '#top') return;
    var el;
    try { el = document.querySelector(location.hash); } catch (e) { return; }
    if (!el) return;
    var y = el.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: y, behavior: 'auto' });
  }
  if (location.hash) {
    window.addEventListener('load', function () {
      goToHash();
      setTimeout(goToHash, 250);
      setTimeout(goToHash, 700);
    });
  }
})();
