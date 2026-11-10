// Home intro illustration: a bubble-tip anemone under a DNA strand with jumping transposons.
// Decorative only. Drawn in the browser; it does not show data.
(function () {
  'use strict';
  var figure = document.querySelector('.reading-anemone');
  if (!figure) { return; }
  var canvas = figure.querySelector('canvas');
  var ctx = canvas.getContext ? canvas.getContext('2d') : null;
  if (!ctx) { return; }
  var toggle = figure.querySelector('.anemone-toggle');
  var intro = figure.closest('.reading-intro');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var w = 0, h = 0, ratio = 1, frame = 0, visible = true, paused = false, clock = 0, last = 0;
  var TE_COLORS = ['#f0c98a', '#f0a37f', '#8fc5bc'];
  var elements = [0.16, 0.5, 0.84].map(function (p, i) { return { p: p, color: TE_COLORS[i] }; });
  var jump = null, nextJump = 1.5, flash = null;
  var tentacles = [], motes = [];

  function seeded(n) { var x = Math.sin(n * 127.1) * 43758.5453; return x - Math.floor(x); }
  for (var i = 0; i < 30; i += 1) {
    var back = i < 13, count = back ? 13 : 17, k = back ? i : i - 13;
    tentacles.push({ back: back, f: k / (count - 1), len: 0.82 + seeded(i + 1) * 0.3, phase: seeded(i + 40) * 6.28 });
  }
  for (var m = 0; m < 22; m += 1) { motes.push({ x: seeded(m + 80), y: seeded(m + 120), r: 0.6 + seeded(m + 160) * 1.2, v: 0.006 + seeded(m + 200) * 0.01 }); }

  function resize() {
    var box = canvas.getBoundingClientRect();
    ratio = Math.min(window.devicePixelRatio || 1, 2);
    w = box.width; h = box.height;
    canvas.width = Math.round(w * ratio); canvas.height = Math.round(h * ratio);
    draw();
  }

  function strandY(x, t) { return h * 0.2 + Math.sin(x / w * 5 + t * 0.5) * h * 0.018; }

  function block(x, y, s, color, lift) {
    var bw = 34 * s, bh = 13 * s;
    ctx.save(); ctx.translate(x, y); ctx.rotate(lift * 0.5);
    ctx.fillStyle = color; ctx.beginPath();
    if (ctx.roundRect) { ctx.roundRect(-bw / 2, -bh / 2, bw, bh, 3 * s); } else { ctx.rect(-bw / 2, -bh / 2, bw, bh); }
    ctx.fill();
    ctx.fillStyle = 'rgba(15,42,44,0.55)';
    ctx.beginPath(); ctx.moveTo(-bw / 2 + 4 * s, -bh / 4); ctx.lineTo(-bw / 2 + 9 * s, 0); ctx.lineTo(-bw / 2 + 4 * s, bh / 4); ctx.fill();
    ctx.beginPath(); ctx.moveTo(bw / 2 - 4 * s, -bh / 4); ctx.lineTo(bw / 2 - 9 * s, 0); ctx.lineTo(bw / 2 - 4 * s, bh / 4); ctx.fill();
    ctx.restore();
  }

  function drawStrand(t, s) {
    var x, a = 7 * s, step = 13 * s;
    ctx.lineWidth = 1.6 * s; ctx.lineCap = 'round';
    for (var side = -1; side <= 1; side += 2) {
      ctx.strokeStyle = 'rgba(255,249,233,0.55)'; ctx.beginPath();
      for (x = -4; x <= w + 4; x += 4) {
        var y = strandY(x, t) + side * Math.sin(x / (22 * s) + t * 0.8) * a;
        if (x === -4) { ctx.moveTo(x, y); } else { ctx.lineTo(x, y); }
      }
      ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(255,249,233,0.22)'; ctx.lineWidth = 1 * s;
    for (x = step / 2; x < w; x += step) {
      var d = Math.sin(x / (22 * s) + t * 0.8) * a, mid = strandY(x, t);
      ctx.beginPath(); ctx.moveTo(x, mid - d); ctx.lineTo(x, mid + d); ctx.stroke();
    }
    elements.forEach(function (el) {
      if (jump && jump.el === el) { return; }
      var ex = el.p * w; block(ex, strandY(ex, t), s, el.color, 0);
    });
    if (jump) {
      var u = Math.min(1, (t - jump.t) / 1.7), e = u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;
      var jx = (jump.from + (jump.to - jump.from) * e) * w;
      var jy = strandY(jx, t) - Math.sin(e * Math.PI) * h * 0.11;
      ctx.strokeStyle = 'rgba(240,201,138,0.35)'; ctx.setLineDash([3 * s, 5 * s]); ctx.lineWidth = 1 * s;
      ctx.beginPath(); ctx.moveTo(jump.from * w, strandY(jump.from * w, t));
      ctx.quadraticCurveTo((jump.from + jump.to) / 2 * w, strandY(w / 2, t) - h * 0.22, jump.to * w, strandY(jump.to * w, t)); ctx.stroke(); ctx.setLineDash([]);
      block(jx, jy, s, jump.el.color, Math.sin(e * Math.PI) * (jump.to > jump.from ? 1 : -1));
    }
    if (flash) {
      var age = t - flash.t;
      if (age < 0.8) {
        ctx.strokeStyle = 'rgba(240,201,138,' + (1 - age / 0.8) + ')'; ctx.lineWidth = 1.5 * s;
        ctx.beginPath(); ctx.arc(flash.p * w, strandY(flash.p * w, t), (10 + age * 30) * s, 0, 6.2832); ctx.stroke();
      }
    }
  }

  function drawTentacle(tn, t, s, cx, discY) {
    var spread = tn.back ? 0.85 : 1.02, dir = -Math.PI / 2 + (tn.f - 0.5) * 2 * spread;
    var rx = (tn.back ? 46 : 60) * s, x = cx + (tn.f - 0.5) * 2 * rx, y = discY + Math.abs(tn.f - 0.5) * 16 * s + (tn.back ? -6 * s : 4 * s);
    var length = h * (tn.back ? 0.25 : 0.3) * tn.len, parts = 9, seg = length / parts, points = [[x, y]];
    for (var k = 1; k <= parts; k += 1) {
      var bend = Math.sin(t * 0.9 + tn.phase + k * 0.42) * 0.055 * k + Math.sin(t * 0.35 + tn.f * 3) * 0.02 * k;
      x += Math.cos(dir + bend) * seg; y += Math.sin(dir + bend) * seg; points.push([x, y]);
    }
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.strokeStyle = tn.back ? '#a8654a' : '#d98e6c'; ctx.lineWidth = (tn.back ? 7 : 9) * s;
    ctx.beginPath(); ctx.moveTo(points[0][0], points[0][1]);
    for (k = 1; k < points.length; k += 1) { ctx.lineTo(points[k][0], points[k][1]); }
    ctx.stroke();
    var tip = points[parts];
    ctx.fillStyle = tn.back ? '#c98c66' : '#f0c98a';
    ctx.beginPath(); ctx.arc(tip[0], tip[1], (tn.back ? 7 : 9.5) * s, 0, 6.2832); ctx.fill();
    ctx.fillStyle = tn.back ? '#a8654a' : '#fff3d6';
    ctx.beginPath(); ctx.arc(tip[0], tip[1] - 3 * s, (tn.back ? 2 : 2.6) * s, 0, 6.2832); ctx.fill();
  }

  function draw() {
    var t = clock, s = w / 360, cx = w / 2, discY = h * 0.74;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    var sea = ctx.createLinearGradient(0, 0, 0, h);
    sea.addColorStop(0, '#1f4a4b'); sea.addColorStop(1, '#0f2a2c');
    ctx.fillStyle = sea; ctx.fillRect(0, 0, w, h);
    motes.forEach(function (mote) {
      var my = ((mote.y - t * mote.v) % 1 + 1) % 1;
      ctx.fillStyle = 'rgba(255,249,233,0.22)';
      ctx.beginPath(); ctx.arc(mote.x * w + Math.sin(t * 0.4 + mote.y * 9) * 6 * s, my * h, mote.r * s, 0, 6.2832); ctx.fill();
    });
    drawStrand(t, s);
    tentacles.forEach(function (tn) { if (tn.back) { drawTentacle(tn, t, s, cx, discY); } });
    var body = ctx.createLinearGradient(0, discY, 0, h);
    body.addColorStop(0, '#b5613f'); body.addColorStop(1, '#6e3322');
    ctx.fillStyle = body; ctx.beginPath();
    ctx.moveTo(cx - 62 * s, discY); ctx.quadraticCurveTo(cx - 40 * s, h * 0.9, cx - 54 * s, h + 2);
    ctx.lineTo(cx + 54 * s, h + 2); ctx.quadraticCurveTo(cx + 40 * s, h * 0.9, cx + 62 * s, discY); ctx.fill();
    ctx.fillStyle = '#c9744e'; ctx.beginPath(); ctx.ellipse(cx, discY, 64 * s, 15 * s, 0, 0, 6.2832); ctx.fill();
    tentacles.forEach(function (tn) { if (!tn.back) { drawTentacle(tn, t, s, cx, discY); } });
  }

  function advance(dt) {
    clock += dt;
    if (jump && clock - jump.t >= 1.7) { jump.el.p = jump.to; flash = { p: jump.to, t: clock }; jump = null; nextJump = clock + 1.8; }
    if (!jump && clock >= nextJump) {
      var el = elements[Math.floor(Math.random() * elements.length)], to = 0, tries = 0, clear = false;
      while (!clear && tries < 30) {
        to = 0.08 + Math.random() * 0.84; tries += 1;
        clear = Math.abs(to - el.p) > 0.18 && elements.every(function (other) { return other === el || Math.abs(other.p - to) > 0.12; });
      }
      if (clear) { jump = { el: el, from: el.p, to: to, t: clock }; } else { nextJump = clock + 0.5; }
    }
  }

  function tick(now) {
    frame = 0;
    if (!visible || paused || document.hidden) { last = 0; return; }
    advance(last ? Math.min(0.05, (now - last) / 1000) : 0.016);
    last = now;
    draw();
    frame = requestAnimationFrame(tick);
  }
  function run() { if (!frame && !reduce) { frame = requestAnimationFrame(tick); } }

  figure.hidden = false;
  if (intro) { intro.classList.remove('reading-intro--solo'); }
  resize();
  if (window.ResizeObserver) { new ResizeObserver(resize).observe(canvas); } else { window.addEventListener('resize', resize); }
  if (reduce) { return; }
  if (toggle) {
    toggle.hidden = false;
    toggle.addEventListener('click', function () {
      paused = !paused;
      toggle.setAttribute('aria-pressed', String(paused));
      toggle.textContent = paused ? toggle.getAttribute('data-play') : toggle.getAttribute('data-pause');
      if (!paused) { run(); }
    });
  }
  document.addEventListener('visibilitychange', run);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) { visible = entries[0].isIntersecting; if (visible) { run(); } }).observe(canvas);
  }
  run();
}());
