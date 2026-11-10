// Home dashboard: count-up numbers, chart reveal, and a decorative network canvas.
// Everything is readable without this script; it only adds motion.
(function () {
  'use strict';
  var root = document.querySelector('.home-dashboard');
  if (!root) { return; }
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var stage = root.querySelector('.dash-stage');
  var canvas = root.querySelector('.dash-network');
  var toggle = root.querySelector('.dash-toggle');
  var counts = Array.prototype.slice.call(root.querySelectorAll('.dash-count'));
  var ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
  var nodes = [], width = 0, height = 0, ratio = 1;
  var pulses = [], lastPulse = 0, frame = 0, visible = false, paused = false, counted = false;
  var LINK = 130, SPEED = 150, LIFE = 4200;

  function countUp() {
    if (counted) { return; }
    counted = true;
    if (reduce) { return; }
    var start = performance.now(), duration = 1400;
    function step(now) {
      var t = Math.min(1, (now - start) / duration), eased = 1 - Math.pow(1 - t, 3);
      counts.forEach(function (el) {
        var target = Number(el.getAttribute('data-count'));
        el.textContent = String(Math.round(target * eased));
      });
      if (t < 1) { requestAnimationFrame(step); }
    }
    requestAnimationFrame(step);
  }

  function resize() {
    if (!ctx) { return; }
    var box = stage.getBoundingClientRect();
    ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = box.width; height = box.height;
    canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
    var wanted = Math.max(18, Math.min(64, Math.round(width * height / 8500)));
    nodes = [];
    for (var i = 0; i < wanted; i += 1) {
      nodes.push({ x: Math.random() * width, y: Math.random() * height, vx: (Math.random() - 0.5) * 0.16, vy: (Math.random() - 0.5) * 0.16, r: 1.6 + Math.random() * 1.8 });
    }
    draw(performance.now());
  }

  function pulseFrom(x, y, now) {
    var best = null, bestDistance = Infinity;
    nodes.forEach(function (node) {
      var d = (node.x - x) * (node.x - x) + (node.y - y) * (node.y - y);
      if (d < bestDistance) { bestDistance = d; best = node; }
    });
    if (best) { pulses.push({ node: best, t: now }); lastPulse = now; }
    if (pulses.length > 4) { pulses.shift(); }
  }

  function activation(node, now) {
    var level = 0;
    pulses.forEach(function (pulse) {
      var age = now - pulse.t;
      var dx = node.x - pulse.node.x, dy = node.y - pulse.node.y;
      var gap = Math.sqrt(dx * dx + dy * dy) - age / 1000 * SPEED;
      level = Math.max(level, Math.exp(-(gap * gap) / 1800) * Math.max(0, 1 - age / LIFE));
    });
    return level;
  }

  function draw(now) {
    if (!ctx) { return; }
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.clearRect(0, 0, width, height);
    pulses = pulses.filter(function (pulse) { return now - pulse.t < LIFE; });
    var levels = nodes.map(function (node) { return activation(node, now); });
    var i, j, a, b, dx, dy, d, glow;
    for (i = 0; i < nodes.length; i += 1) {
      for (j = i + 1; j < nodes.length; j += 1) {
        a = nodes[i]; b = nodes[j]; dx = a.x - b.x; dy = a.y - b.y; d = Math.sqrt(dx * dx + dy * dy);
        if (d < LINK) {
          glow = Math.min(levels[i], levels[j]);
          ctx.strokeStyle = glow > 0.05 ? 'rgba(240,201,138,' + (0.12 + glow * 0.6) * (1 - d / LINK) + ')' : 'rgba(255,249,233,' + 0.13 * (1 - d / LINK) + ')';
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
    }
    for (i = 0; i < nodes.length; i += 1) {
      a = nodes[i]; glow = levels[i];
      ctx.fillStyle = glow > 0.05 ? 'rgba(240,201,138,' + (0.3 + glow * 0.7) + ')' : 'rgba(255,249,233,0.28)';
      ctx.beginPath(); ctx.arc(a.x, a.y, a.r + glow * 2.2, 0, Math.PI * 2); ctx.fill();
    }
    pulses.forEach(function (pulse) {
      var age = now - pulse.t;
      if (age < 900) {
        ctx.strokeStyle = 'rgba(240,163,127,' + (1 - age / 900) + ')';
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(pulse.node.x, pulse.node.y, 4 + age / 900 * 16, 0, Math.PI * 2); ctx.stroke();
      }
    });
  }

  function tick(now) {
    frame = 0;
    if (!visible || paused || document.hidden) { return; }
    nodes.forEach(function (node) {
      node.x += node.vx; node.y += node.vy;
      if (node.x < 0 || node.x > width) { node.vx = -node.vx; }
      if (node.y < 0 || node.y > height) { node.vy = -node.vy; }
    });
    if (now - lastPulse > 3200 && nodes.length) { pulseFrom(Math.random() * width, Math.random() * height, now); }
    draw(now);
    frame = requestAnimationFrame(tick);
  }

  function run() { if (!frame && ctx && !reduce) { frame = requestAnimationFrame(tick); } }

  if (ctx) {
    resize();
    if (window.ResizeObserver) { new ResizeObserver(resize).observe(stage); } else { window.addEventListener('resize', resize); }
  }

  if (!reduce) {
    if (toggle) {
      toggle.hidden = false;
      toggle.addEventListener('click', function () {
        paused = !paused;
        toggle.setAttribute('aria-pressed', String(paused));
        toggle.textContent = paused ? toggle.getAttribute('data-play') : toggle.getAttribute('data-pause');
        if (!paused) { run(); }
      });
    }
    var lastPointer = 0;
    stage.addEventListener('pointermove', function (event) {
      var now = performance.now();
      if (paused || now - lastPointer < 700) { return; }
      lastPointer = now;
      var box = stage.getBoundingClientRect();
      pulseFrom(event.clientX - box.left, event.clientY - box.top, now);
    });
    stage.addEventListener('focusin', function (event) {
      if (paused || !event.target.getBoundingClientRect) { return; }
      var box = stage.getBoundingClientRect(), item = event.target.getBoundingClientRect();
      pulseFrom(item.left - box.left + item.width / 2, item.top - box.top + item.height / 2, performance.now());
    });
    document.addEventListener('visibilitychange', run);
  }

  if ('IntersectionObserver' in window && !reduce) {
    root.classList.add('is-animated');
    new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.target === stage) { visible = entry.isIntersecting; if (visible) { countUp(); run(); } }
        if (entry.target === root && entry.isIntersecting) { root.classList.add('is-live'); }
      });
    }, { threshold: 0.15 }).observe(stage);
    new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) { if (entry.isIntersecting) { root.classList.add('is-live'); observer.disconnect(); } });
    }, { rootMargin: '0px 0px -10% 0px' }).observe(root.querySelector('.dash-panels'));
  } else {
    visible = true; run();
  }
}());
