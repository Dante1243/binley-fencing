// Binley Fencing: theme, phone menu, back to top, scroll fade-ins, photo viewer, panel estimator, enquiry form
(function () {
  var root = document.documentElement, body = document.body;
  var reduceQuery = window.matchMedia ? matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  var KEY = 'binley-theme';
  function $(sel) { return document.querySelector(sel); }
  function all(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }
  function svg(d) { return '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="' + d + '"/></svg>'; }

  /* ---------- Theme (first value is set inline in <head> before paint) ---------- */
  var themeBtn = $('.theme-toggle'), themeMeta = $('meta[name="theme-color"]');
  function stored() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function applyTheme(t) {
    root.setAttribute('data-theme', t);
    if (themeBtn) themeBtn.setAttribute('aria-label', t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    if (themeMeta) themeMeta.content = t === 'dark' ? '#14181b' : '#ffffff';
  }
  applyTheme(root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
  if (themeBtn) themeBtn.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    if (!reduceQuery.matches) {
      root.classList.add('theme-fade');
      setTimeout(function () { root.classList.remove('theme-fade'); }, 340);
    }
    applyTheme(next);
    try { localStorage.setItem(KEY, next); } catch (e) {}
  });
  if (window.matchMedia) {
    var dark = matchMedia('(prefers-color-scheme: dark)');
    if (dark.addEventListener) dark.addEventListener('change', function (e) { if (!stored()) applyTheme(e.matches ? 'dark' : 'light'); });
  }

  /* ---------- Phone menu ---------- */
  var toggle = $('.menu-toggle'), nav = $('#site-nav');
  function menuIsOpen() { return body.classList.contains('menu-open'); }
  function setMenu(open) {
    body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  if (toggle && nav) {
    toggle.addEventListener('click', function () { setMenu(!menuIsOpen()); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuIsOpen()) { setMenu(false); toggle.focus(); }
    });
    document.addEventListener('click', function (e) { if (menuIsOpen() && !e.target.closest('.site-header')) setMenu(false); });
    window.addEventListener('resize', function () { if (window.innerWidth > 960 && menuIsOpen()) setMenu(false); });
    window.addEventListener('pageshow', function (e) { if (e.persisted && menuIsOpen()) setMenu(false); });
  }

  /* ---------- Header line and back to top ---------- */
  var header = $('.site-header'), up = document.createElement('button'), ticking = false;
  up.className = 'to-top';
  up.type = 'button';
  up.setAttribute('aria-label', 'Back to top');
  up.innerHTML = svg('M12 19V5M5 12l7-7 7 7');
  up.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduceQuery.matches ? 'auto' : 'smooth' });
    $('.brand').focus({ preventScroll: true });
  });
  body.appendChild(up);
  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
    up.classList.toggle('is-visible', window.scrollY > 600);
    ticking = false;
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  /* ---------- Fade in on scroll. Nothing that is on screen at load gets hidden. ---------- */
  if (!reduceQuery.matches && !location.hash && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      var n = 0;
      entries.forEach(function (en) {
        if (!en.isIntersecting && en.boundingClientRect.top > 0) return;
        var el = en.target;
        io.unobserve(el);
        el.style.setProperty('--delay', Math.min(n++, 5) * 70 + 'ms');
        el.classList.add('is-in');
        setTimeout(function () { el.classList.remove('reveal', 'is-in'); el.style.removeProperty('--delay'); }, 1200);
      });
    }, { rootMargin: '0px 0px -5% 0px', threshold: 0.04 });
    all('.section h2, .section .lead, .est-grid, .est-draw, .fence > a, .split > *, .reviews > *, .product > *, .extras > *, .boss > *, .crew > *, .duo > *, .strip .wrap > *').forEach(function (el) {
      if (el.parentElement.closest('.reveal')) return;
      var top = el.getBoundingClientRect().top;
      if (top < window.innerHeight) return;
      el.classList.add('reveal');
      io.observe(el);
    });
  }

  /* ---------- Photo viewer ---------- */
  var links = all('a[data-caption]');
  if (links.length && window.HTMLDialogElement) {
    var box = document.createElement('dialog'), at = 0, startX = null;
    box.className = 'lightbox';
    box.setAttribute('aria-label', 'Photo viewer');
    box.innerHTML = '<img alt=""><p aria-live="polite"></p>' +
      '<button class="lb-prev" type="button" aria-label="Previous photo">' + svg('M15 5l-7 7 7 7') + '</button>' +
      '<button class="lb-next" type="button" aria-label="Next photo">' + svg('M9 5l7 7-7 7') + '</button>' +
      '<button class="lb-close" type="button" aria-label="Close photo viewer">' + svg('M6 6l12 12M18 6L6 18') + '</button>';
    body.appendChild(box);
    var show = function (i) {
      at = (i + links.length) % links.length;
      var img = new Image();
      img.alt = links[at].querySelector('img').alt;
      img.src = links[at].href;
      box.replaceChild(img, box.querySelector('img'));
      box.querySelector('p').textContent = links[at].getAttribute('data-caption') + ' (' + (at + 1) + ' of ' + links.length + ')';
    };
    links.forEach(function (a, i) {
      a.addEventListener('click', function (e) {
        if (e.ctrlKey || e.metaKey || e.shiftKey) return;
        e.preventDefault();
        show(i);
        box.showModal();
      });
    });
    box.addEventListener('close', function () { links[at].focus({ preventScroll: true }); });
    box.addEventListener('click', function (e) {
      if (e.target.closest('.lb-prev')) show(at - 1);
      else if (e.target.closest('.lb-next')) show(at + 1);
      else if (e.target.closest('.lb-close') || e.target === box) box.close();
    });
    box.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') show(at - 1);
      if (e.key === 'ArrowRight') show(at + 1);
    });
    box.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
    box.addEventListener('touchend', function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      startX = null;
      if (Math.abs(dx) > 45) show(at + (dx < 0 ? 1 : -1));
    });
  }

  /* ---------- Panel estimator. Lengths and heights are the specs on binley.com.au. ---------- */
  var PRODUCTS = {
    fence: { len: 2.4, high: 1.8, one: 'panel', many: 'panels', need: 'Temporary fencing' },
    pool: { len: 2, high: 1.25, one: 'panel', many: 'panels', need: 'Temporary pool fencing' },
    crowd: { len: 2.2, high: 1.1, one: 'barrier', many: 'barriers', need: 'Crowd control barriers' }
  };
  function count(m, len) { return Math.ceil(m / len - 1e-9); }
  function num(n) { return n.toLocaleString('en-AU', { maximumFractionDigits: 2 }); }
  var metres = $('#metres');
  if (metres) {
    var slider = $('#slider'), out = $('#panels'), sum = $('#sum'), quote = $('#to-quote'), run = $('#run');

    var draw = function (p, n) {
      var W = run.clientWidth || 600, H = run.clientHeight || 130, small = W < 560;
      var minW = small ? 24 : 32, maxRows = small ? 2 : 3, perRow, rows, shown = n, w = 0;
      for (rows = 1; rows <= maxRows; rows++) {
        perRow = Math.max(1, Math.ceil(n / rows));
        w = Math.min((W - 8) / perRow, (H - 26) / p.high * p.len);
        if (w >= minW) break;
      }
      if (rows > maxRows) {
        rows = maxRows;
        perRow = Math.floor((W - 8) / minW);
        w = (W - 8) / perRow;
        shown = Math.min(n, perRow * rows);
      }
      var h = w / p.len * p.high, foot = Math.max(3, Math.min(10, w * 0.1)), slot = h + foot + 12;
      var tube = '', mesh = '', feet = '', extra = n - shown;
      if (extra) shown -= small ? 3 : 2;
      var f = function (v) { return v.toFixed(1); };
      var stand = function (x, y, kind) {
        var half = kind === 'fence' ? Math.max(4, w * 0.13) : Math.max(3, w * 0.08), top = kind === 'fence' ? foot : 3;
        return 'M' + f(x - half * 0.75) + ' ' + f(y) + 'H' + f(x + half * 0.75) + 'L' + f(x + half) + ' ' + f(y + top) + 'H' + f(x - half) + 'Z';
      };
      var kind = p === PRODUCTS.fence ? 'fence' : 'other';
      for (var i = 0; i < shown; i++) {
        var r = Math.floor(i / perRow), c = i % perRow;
        var x = 4 + c * w, y = H - 1 - foot - h - (rows - 1 - r) * slot, b = y + h;
        tube += 'M' + f(x + 1) + ' ' + f(b) + 'V' + f(y) + 'H' + f(x + w - 1) + 'V' + f(b) + 'Z';
        var bars = Math.max(2, Math.round(w / (kind === 'fence' ? 7 : 9)));
        for (var k = 1; k < bars; k++) mesh += 'M' + f(x + w * k / bars) + ' ' + f(y) + 'V' + f(b);
        if (kind === 'fence' && h > 30) for (k = 1; k < 5; k++) mesh += 'M' + f(x) + ' ' + f(y + h * k / 5) + 'H' + f(x + w);
        feet += stand(x, b, kind);
        if (c === perRow - 1 || i === shown - 1) feet += stand(x + w, b, kind);
      }
      var ground = '';
      for (r = 0; r < Math.ceil(Math.max(shown, 1) / perRow); r++) {
        y = H - 1 - (rows - 1 - r) * slot;
        ground += '<path class="d-ground" d="M0 ' + f(y) + 'H' + f(W) + '"/>';
      }
      var more = extra ? '<text x="' + f(W - 4) + '" y="' + f(H - 8 - foot) + '" text-anchor="end">+' + (n - shown).toLocaleString('en-AU') + (small ? '' : ' more') + '</text>' : '';
      run.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
      run.innerHTML = ground + '<path class="d-mesh" d="' + mesh + '"/><path class="d-tube" d="' + tube + '"/><path class="' + (kind === 'fence' ? 'd-foot' : 'd-base') + '" d="' + feet + '"/>' + more;
    };

    var update = function () {
      var pick = $('input[name="product"]:checked').value, p = PRODUCTS[pick];
      var m = parseFloat(metres.value);
      if (m > 20000) metres.value = m = 20000;
      if (!(m > 0)) {
        out.textContent = '0 ' + p.many;
        sum.textContent = 'Type a length to see how many you need.';
        quote.href = 'contact.html?p=' + pick;
        draw(p, 0);
        return;
      }
      var n = count(m, p.len), covers = Math.round(n * p.len * 100) / 100;
      out.textContent = n.toLocaleString('en-AU') + ' ' + (n === 1 ? p.one : p.many);
      sum.textContent = num(n) + ' × ' + p.len + ' m = ' + num(covers) + ' m';
      quote.href = 'contact.html?p=' + pick + '&m=' + m;
      draw(p, n);
    };
    var fill = function () { slider.style.setProperty('--fill', (slider.value - slider.min) / (slider.max - slider.min) * 100 + '%'); };
    metres.addEventListener('input', function () { slider.value = parseFloat(metres.value) || 0; fill(); update(); });
    slider.addEventListener('input', function () { metres.value = slider.value; fill(); update(); });
    all('input[name="product"]').forEach(function (r) { r.addEventListener('change', update); });
    var lastW = 0;
    window.addEventListener('resize', function () { if (run.clientWidth !== lastW) { lastW = run.clientWidth; update(); } });
    slider.value = parseFloat(metres.value) || 0;
    fill();
    update();
  }

  /* ---------- Enquiry form (mockup: opens the visitor's own email app, filled in) ---------- */
  var form = $('form.enquiry');
  if (form) {
    var q = new URLSearchParams(location.search), product = PRODUCTS[q.get('p')], len = parseFloat(q.get('m'));
    if (product) {
      all('input[name="need"]').forEach(function (c) { if (c.value === product.need) c.checked = true; });
      if (len > 0) {
        len = Math.min(len, 20000);
        var n = count(len, product.len);
        form.elements.length_needed.value = num(len) + ' m (about ' + n.toLocaleString('en-AU') + ' ' + (n === 1 ? product.one : product.many) + ')';
      }
    }
    var required = all('.enquiry [required]'), status = form.querySelector('.status');
    var check = function (f) {
      var bad = !f.value.trim() || (f.type === 'tel' && f.value.replace(/\D/g, '').length < 8);
      f.setAttribute('aria-invalid', String(bad));
      return !bad;
    };
    form.noValidate = true;
    required.forEach(function (f) {
      f.addEventListener('blur', function () { if (f.value) check(f); });
      f.addEventListener('input', function () { if (f.getAttribute('aria-invalid') === 'true') check(f); });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var bad = required.filter(function (f) { return !check(f); });
      if (bad.length) { status.textContent = ''; bad[0].focus(); return; }
      var lines = [], needs = all('input[name="need"]:checked').map(function (c) { return c.value; });
      all('.enquiry [data-label]').forEach(function (f) { if (f.value.trim()) lines.push(f.getAttribute('data-label') + ': ' + f.value.trim()); });
      if (needs.length) lines.splice(Math.min(3, lines.length), 0, 'Looking for: ' + needs.join(', '));
      status.textContent = 'Your email app should open with this filled in. If it doesn’t, call 0425 168 555 or email info@binley.com.au.';
      window.location.href = 'mailto:' + form.getAttribute('data-to') + '?subject=' + encodeURIComponent('Fencing quote: ' + form.elements.name.value.trim()) + '&body=' + encodeURIComponent(lines.join('\r\n'));
    });
  }

  /* Smooth jumps within a page, but a link from another page lands straight on its section */
  window.addEventListener('load', function () { setTimeout(function () { root.classList.add('smooth'); }, 200); });

  all('.year').forEach(function (y) { y.textContent = new Date().getFullYear(); });
})();
