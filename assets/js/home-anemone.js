// Home intro illustration: a hypothesis drawn as a scene. Transposons pass from an anemonefish
// to a symbiotic alga to the host anemone, and back.
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
  var TE_COLORS = ['#f0c98a', '#8fc5bc', '#f0a37f'];
  // One transfer cycle: fish -> alga -> anemone, then anemone -> alga -> fish.
  var LEGS = [['fish', 'alga'], ['alga', 'anemone'], ['anemone', 'alga'], ['alga', 'fish']];
  var LEG_TIME = 1.9, REST = 1.1;
  var transfer = { leg: 0, t: 0.8, alga: 0, color: 0 }, flash = null;
  var algae = [{ x: 0.22, y: 0.34 }, { x: 0.5, y: 0.31 }, { x: 0.78, y: 0.35 }];
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

  function fishAt(t) {
    return { x: w * (0.5 + Math.cos(t * 0.32) * 0.27), y: h * (0.15 + Math.sin(t * 0.64) * 0.04), dir: Math.sin(t * 0.32) > 0 ? -1 : 1 };
  }
  function algaAt(i, t) {
    return { x: algae[i].x * w + Math.sin(t * 0.5 + i * 2) * 5 * w / 360, y: algae[i].y * h + Math.cos(t * 0.6 + i) * 6 * w / 360 };
  }
  function place(name, t) {
    if (name === 'fish') { return fishAt(t); }
    if (name === 'alga') { return algaAt(transfer.alga, t); }
    return { x: w / 2, y: h * 0.6 };
  }

  function block(x, y, s, color, tilt) {
    var bw = 26 * s, bh = 11 * s;
    ctx.save(); ctx.translate(x, y); ctx.rotate(tilt);
    ctx.fillStyle = color; ctx.beginPath();
    if (ctx.roundRect) { ctx.roundRect(-bw / 2, -bh / 2, bw, bh, 3 * s); } else { ctx.rect(-bw / 2, -bh / 2, bw, bh); }
    ctx.fill();
    ctx.fillStyle = 'rgba(15,42,44,0.6)';
    ctx.beginPath(); ctx.moveTo(-bw / 2 + 3 * s, -bh / 4); ctx.lineTo(-bw / 2 + 8 * s, 0); ctx.lineTo(-bw / 2 + 3 * s, bh / 4); ctx.fill();
    ctx.beginPath(); ctx.moveTo(bw / 2 - 3 * s, -bh / 4); ctx.lineTo(bw / 2 - 8 * s, 0); ctx.lineTo(bw / 2 - 3 * s, bh / 4); ctx.fill();
    ctx.restore();
  }

  function drawFish(t, s) {
    var f = fishAt(t), wag = Math.sin(t * 6) * 0.25;
    ctx.save(); ctx.translate(f.x, f.y); ctx.scale(f.dir * s, s);
    ctx.fillStyle = '#e07b2e';
    ctx.beginPath(); ctx.moveTo(-26, 0); ctx.lineTo(-44, -13 + wag * 14); ctx.lineTo(-40, wag * 10); ctx.lineTo(-44, 13 + wag * 14); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-6, -14); ctx.quadraticCurveTo(2, -27, 14, -13); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-2, 13); ctx.quadraticCurveTo(4, 25, 12, 12); ctx.fill();
    ctx.beginPath(); ctx.ellipse(0, 0, 30, 16, 0, 0, 6.2832); ctx.fill();
    ctx.save(); ctx.clip();
    [[-20, 5], [-1, 8], [17, 6]].forEach(function (band) {
      ctx.fillStyle = '#1b2326'; ctx.fillRect(band[0] - band[1] / 2 - 1.5, -18, band[1] + 3, 36);
      ctx.fillStyle = '#fff9e9'; ctx.fillRect(band[0] - band[1] / 2, -18, band[1], 36);
    });
    ctx.restore();
    ctx.fillStyle = '#1b2326'; ctx.beginPath(); ctx.arc(23, -3, 2.4, 0, 6.2832); ctx.fill();
    ctx.restore();
  }

  function drawAlgae(t, s) {
    algae.forEach(function (cell, i) {
      var a = algaAt(i, t);
      ctx.fillStyle = 'rgba(185,194,106,0.25)'; ctx.beginPath(); ctx.arc(a.x, a.y, 13 * s, 0, 6.2832); ctx.fill();
      ctx.fillStyle = '#b9c26a'; ctx.beginPath(); ctx.arc(a.x, a.y, 8.5 * s, 0, 6.2832); ctx.fill();
      ctx.fillStyle = '#7d8a3c'; ctx.beginPath(); ctx.arc(a.x + 2 * s, a.y + 1.5 * s, 4 * s, 0, 6.2832); ctx.fill();
    });
  }

  function drawTransfer(t, s) {
    if (flash && t - flash.t < 0.9) {
      var age = t - flash.t, spot = place(flash.at, t);
      ctx.strokeStyle = 'rgba(240,201,138,' + (1 - age / 0.9) + ')'; ctx.lineWidth = 1.5 * s;
      ctx.beginPath(); ctx.arc(spot.x, spot.y, (12 + age * 34) * s, 0, 6.2832); ctx.stroke();
    }
    var u = (t - transfer.t) / LEG_TIME;
    if (u < 0 || u > 1) { return; }
    var leg = LEGS[transfer.leg], from = place(leg[0], t), to = place(leg[1], t);
    var e = u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2, side = transfer.leg < 2 ? 1 : -1;
    var dx = to.x - from.x, dy = to.y - from.y, bow = Math.sin(e * Math.PI) * 26 * s * side, len = Math.sqrt(dx * dx + dy * dy) || 1;
    var x = from.x + dx * e - dy / len * bow, y = from.y + dy * e + dx / len * bow;
    ctx.strokeStyle = 'rgba(240,201,138,0.4)'; ctx.setLineDash([3 * s, 5 * s]); ctx.lineWidth = 1 * s;
    ctx.beginPath(); ctx.moveTo(from.x, from.y); ctx.quadraticCurveTo(from.x + dx / 2 - dy / len * 52 * s * side, from.y + dy / 2 + dx / len * 52 * s * side, to.x, to.y); ctx.stroke(); ctx.setLineDash([]);
    block(x, y, s, TE_COLORS[transfer.color], Math.atan2(dy, dx) * 0.25);
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
    ctx.fillStyle = tn.back ? '#a8654a' : '#9aa550';
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
    drawAlgae(t, s);
    tentacles.forEach(function (tn) { if (tn.back) { drawTentacle(tn, t, s, cx, discY); } });
    var body = ctx.createLinearGradient(0, discY, 0, h);
    body.addColorStop(0, '#b5613f'); body.addColorStop(1, '#6e3322');
    ctx.fillStyle = body; ctx.beginPath();
    ctx.moveTo(cx - 62 * s, discY); ctx.quadraticCurveTo(cx - 40 * s, h * 0.9, cx - 54 * s, h + 2);
    ctx.lineTo(cx + 54 * s, h + 2); ctx.quadraticCurveTo(cx + 40 * s, h * 0.9, cx + 62 * s, discY); ctx.fill();
    ctx.fillStyle = '#c9744e'; ctx.beginPath(); ctx.ellipse(cx, discY, 64 * s, 15 * s, 0, 0, 6.2832); ctx.fill();
    tentacles.forEach(function (tn) { if (!tn.back) { drawTentacle(tn, t, s, cx, discY); } });
    drawFish(t, s);
    drawTransfer(t, s);
  }

  function advance(dt) {
    clock += dt;
    if (clock - transfer.t < LEG_TIME) { return; }
    flash = { at: LEGS[transfer.leg][1], t: clock };
    transfer.leg = (transfer.leg + 1) % LEGS.length;
    transfer.t = clock + REST;
    if (transfer.leg === 0) { transfer.color = (transfer.color + 1) % TE_COLORS.length; }
    if (transfer.leg % 2 === 0) { transfer.alga = Math.floor(Math.random() * algae.length); }
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
