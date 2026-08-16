/* Precision Roofing Alabama LLC - sub-page interactions */
(function () {
  // year
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // mobile menu (subnav)
  var burger = document.getElementById('subBurger');
  var menu = document.getElementById('subMenu');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      burger.classList.toggle('active', open);
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('open');
        burger.classList.remove('active');
      });
    });
  }

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
      el.style.transitionDelay = (Math.min(i % 6, 5) * 60) + 'ms';
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  // ---- lead form (contact page) ----
  var form = document.getElementById('quoteForm');
  var success = document.getElementById('formSuccess');
  if (form && success) {
    var FORM_ENDPOINT = 'https://api.web3forms.com/submit';
    var WEB3FORMS_KEY = '3c0f07c1-f2ef-4efe-8573-3fe251e4c961';

    var setErr = function (id, isErr) {
      var el = document.getElementById(id);
      var f = el && el.closest('.field');
      if (f) f.classList.toggle('err', isErr);
    };
    var validEmail = function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); };
    var validPhone = function (v) { return (v.replace(/\D/g, '').length >= 10); };

    var showSuccess = function () {
      form.style.display = 'none';
      success.classList.add('show');
      if (window.prTrackLead) window.prTrackLead({ form: 'contact' });
    };
    var showSendError = function (btn) {
      if (btn) { btn.disabled = false; btn.textContent = 'Send Message'; }
      var note = document.getElementById('formErrNote');
      if (!note) {
        note = document.createElement('p');
        note.id = 'formErrNote';
        note.style.cssText = 'margin-top:14px;color:#b3261e;font-size:14.5px;font-weight:600';
        form.appendChild(note);
      }
      note.textContent = "Sorry, something went wrong sending your message. Please call us at (334) 318-7255.";
    };

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
      if (phone) { setErr('phone', !validPhone(phone)); if (!validPhone(phone)) ok = false; }
      else { setErr('phone', false); }

      if (!ok) {
        var firstErr = form.querySelector('.field.err input, .field.err select');
        if (firstErr) firstErr.focus();
        return;
      }

      var isLive = location.hostname.indexOf('precisionroofingalabama') !== -1;
      var btn = form.querySelector('button[type="submit"]');
      var handleFail = function () { if (isLive) { showSendError(btn); } else { showSuccess(); } };
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }

      fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: 'New Quote Request: ' + name,
          from_name: 'Precision Roofing Alabama Website',
          replyto: email,
          name: name, email: email, phone: phone, service: service, message: message
        })
      })
        .then(function (r) { return r.json(); })
        .then(function (res) { if (res && res.success) { showSuccess(); } else { handleFail(); } })
        .catch(function () { handleFail(); });
    });

    ['name', 'phone', 'email'].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('input', function () { setErr(id, false); });
      el.addEventListener('change', function () { setErr(id, false); });
    });
  }
})();
