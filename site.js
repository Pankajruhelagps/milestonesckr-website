(function () {
  // Sticky nav shadow + mobile menu
  var nav = document.querySelector('.nav');
  var burger = document.querySelector('.burger');
  if (burger) burger.addEventListener('click', function () { nav.classList.toggle('open'); });
  document.querySelectorAll('.menu a').forEach(function (a) {
    a.addEventListener('click', function () { nav.classList.remove('open'); });
  });
  window.addEventListener('scroll', function () { nav.classList.toggle('scrolled', window.scrollY > 10); }, { passive: true });

  // Reveal on scroll
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('in'); });
  }

  // Count-up numbers
  var nums = document.querySelectorAll('[data-count]');
  function run(el) {
    var end = +el.getAttribute('data-count'), start = null, dur = 1400;
    function step(t) {
      if (!start) start = t;
      var p = Math.min((t - start) / dur, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))).toLocaleString('en-IN') + (el.getAttribute('data-suffix') || '');
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { run(e.target); co.unobserve(e.target); } });
    }, { threshold: 0.5 });
    nums.forEach(function (n) { co.observe(n); });
  }

  // Gallery lightbox
  var lb = document.querySelector('.lightbox');
  var items = Array.prototype.slice.call(document.querySelectorAll('.gallery button'));
  var cur = 0;
  function show(i) {
    cur = (i + items.length) % items.length;
    var b = items[cur];
    lb.querySelector('img').src = b.getAttribute('data-full');
    lb.querySelector('img').alt = b.getAttribute('data-title');
    lb.querySelector('p').textContent = b.getAttribute('data-title');
    lb.classList.add('on');
  }
  if (lb) {
    items.forEach(function (b, i) { b.addEventListener('click', function () { show(i); }); });
    lb.querySelector('.x').addEventListener('click', function () { lb.classList.remove('on'); });
    lb.querySelector('.lb-prev').addEventListener('click', function () { show(cur - 1); });
    lb.querySelector('.lb-next').addEventListener('click', function () { show(cur + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) lb.classList.remove('on'); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('on')) return;
      if (e.key === 'Escape') lb.classList.remove('on');
      if (e.key === 'ArrowLeft') show(cur - 1);
      if (e.key === 'ArrowRight') show(cur + 1);
    });
  }

  // Admission enquiry -> WhatsApp
  var form = document.getElementById('apply');
  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = e.target;
    var text = 'Admission enquiry - Milestone International School\n' +
      'Student: ' + f.student.value + '\nClass: ' + f.cls.value +
      '\nParent: ' + f.parent.value + '\nMobile: ' + f.phone.value +
      (f.msg.value ? '\nMessage: ' + f.msg.value : '');
    window.open('https://wa.me/919479936692?text=' + encodeURIComponent(text), '_blank');
  });

  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();
})();
