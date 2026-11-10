// Home intro illustration: a hypothesis drawn as a scene. Transposons pass from an anemonefish
// to a symbiotic alga to a host anemone, and back. Painted artwork, moved by this script.
// Decorative only; it does not show data. Art credits: images/home-anemone/CREDITS.md
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
  var w = 0, h = 0, ratio = 1, frame = 0, visible = true, paused = false, clock = 0, last = 0, ready = 0;
  var backdrop = new Image(), atlas = new Image();
  var TE_COLORS = ['#f0c98a', '#8fe0d0', '#f7b199'];
  // One transfer cycle: fish -> alga -> anemone, then anemone -> alga -> fish.
  var LEGS = [['fish', 'alga'], ['alga', 'anemone'], ['anemone', 'alga'], ['alga', 'fish']];
  var LEG_TIME = 1.9, REST = 1.1;
  var transfer = { leg: 0, t: 0.8, alga: 0, color: 0, fish: 1, host: 'bubble' }, flash = null;
  var HOSTS = { bubble: { x: 0.27, y: 0.6 }, carpet: { x: 0.75, y: 0.8 } };
  // Sprite rectangles in reef-animals.webp: x, y, width, height. All face right.
  var SPRITES = { tomato: [2, 2, 171, 107], skunk: [2, 113, 182, 98], shrimp: [2, 215, 172, 99], ocellaris: [2, 318, 220, 107], clarkii: [2, 429, 220, 109], damsel: [2, 542, 220, 132] };
  // Residents. The first four are anemonefish and take part in the transfer; the damsel only visits.
  // The ocellaris (first) keeps to the carpet anemone; the others keep to the bubble-tip anemone.
  var FISH = [
    { art: 'ocellaris', cx: 0.74, ax: 0.1, y: 0.68, ay: 0.012, speed: 0.3, phase: 0, size: 0.23 },
    { art: 'tomato', cx: 0.24, ax: 0.13, y: 0.3, ay: 0.02, speed: 0.26, phase: 1.3, size: 0.22 },
    { art: 'clarkii', cx: 0.55, ax: 0.14, y: 0.42, ay: 0.02, speed: 0.22, phase: 3.4, size: 0.23 },
    { art: 'skunk', cx: 0.36, ax: 0.1, y: 0.17, ay: 0.02, speed: 0.34, phase: 5, size: 0.19 },
    { art: 'damsel', cx: 0.8, ax: 0.06, y: 0.5, ay: 0.02, speed: 0.45, phase: 2, size: 0.13 }
  ];
  var algae = [{ x: 0.12, y: 0.2 }, { x: 0.6, y: 0.26 }, { x: 0.52, y: 0.58 }];
  var motes = [];

  function seeded(n) { var x = Math.sin(n * 127.1) * 43758.5453; return x - Math.floor(x); }
  for (var m = 0; m < 18; m += 1) { motes.push({ x: seeded(m + 80), y: seeded(m + 120), r: 0.6 + seeded(m + 160) * 1.1, v: 0.006 + seeded(m + 200) * 0.01 }); }

  function resize() {
    var box = canvas.getBoundingClientRect();
    ratio = Math.min(window.devicePixelRatio || 1, 2);
    w = box.width; h = box.height;
    canvas.width = Math.round(w * ratio); canvas.height = Math.round(h * ratio);
    draw();
  }

  function fishAt(i, t) {
    var f = FISH[i], a = t * f.speed + f.phase;
    return { x: w * (f.cx + Math.cos(a) * f.ax), y: h * (f.y + Math.sin(a * 2) * f.ay), dir: Math.sin(a) > 0 ? -1 : 1 };
  }
  function algaAt(i, t) {
    return { x: algae[i].x * w + Math.sin(t * 0.5 + i * 2) * 5 * w / 360, y: algae[i].y * h + Math.cos(t * 0.6 + i) * 6 * w / 360 };
  }
  function place(name, t, ref) {
    ref = ref || transfer;
    if (name === 'fish') { return fishAt(ref.fish, t); }
    if (name === 'alga') { return algaAt(ref.alga, t); }
    return { x: w * HOSTS[ref.host].x, y: h * HOSTS[ref.host].y };
  }

  // The painted backdrop is drawn in rows that shift sideways a little, most around the anemones,
  // so the tentacles and the water appear to sway.
  function drawBackdrop(t) {
    var rows = 60, sh = backdrop.naturalHeight / rows, dh = h / rows, pad = w * 0.015;
    for (var r = 0; r < rows; r += 1) {
      var v = (r + 0.5) / rows;
      var sway = 0.4 + 2.6 * Math.exp(-Math.pow((v - 0.5) / 0.13, 2)) + 1.2 * Math.exp(-Math.pow((v - 0.78) / 0.05, 2));
      var dx = Math.sin(t * 1.1 + v * 9) * sway * w / 360;
      ctx.drawImage(backdrop, 0, r * sh, backdrop.naturalWidth, sh, -pad + dx, r * dh, w + pad * 2, dh + 0.6);
    }
  }

  // Fish sprites are drawn in vertical strips; strips nearer the tail move more, which reads as swimming.
  function drawSprite(name, x, y, width, dir, t, wave) {
    var rect = SPRITES[name], scale = width / rect[2], height = rect[3] * scale, strips = 18, sw = rect[2] / strips;
    ctx.save(); ctx.translate(x, y); ctx.scale(dir, 1);
    for (var k = 0; k < strips; k += 1) {
      var tail = 1 - (k + 0.5) / strips;
      var dy = wave ? Math.sin(t * 7 - tail * 3.2) * tail * tail * height * 0.11 : 0;
      ctx.drawImage(atlas, rect[0] + k * sw, rect[1], sw, rect[3], -width / 2 + k * sw * scale, -height / 2 + dy, sw * scale + 0.6, height);
    }
    ctx.restore();
  }

  function block(x, y, s, color, tilt) {
    var bw = 26 * s, bh = 11 * s;
    ctx.save(); ctx.translate(x, y); ctx.rotate(tilt);
    ctx.shadowColor = 'rgba(8,28,32,0.55)'; ctx.shadowBlur = 5 * s;
    ctx.fillStyle = color; ctx.beginPath();
    if (ctx.roundRect) { ctx.roundRect(-bw / 2, -bh / 2, bw, bh, 3 * s); } else { ctx.rect(-bw / 2, -bh / 2, bw, bh); }
    ctx.fill(); ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(15,42,44,0.65)';
    ctx.beginPath(); ctx.moveTo(-bw / 2 + 3 * s, -bh / 4); ctx.lineTo(-bw / 2 + 8 * s, 0); ctx.lineTo(-bw / 2 + 3 * s, bh / 4); ctx.fill();
    ctx.beginPath(); ctx.moveTo(bw / 2 - 3 * s, -bh / 4); ctx.lineTo(bw / 2 - 8 * s, 0); ctx.lineTo(bw / 2 - 3 * s, bh / 4); ctx.fill();
    ctx.restore();
  }

  function drawAlgae(t, s) {
    algae.forEach(function (cell, i) {
      var a = algaAt(i, t);
      ctx.fillStyle = 'rgba(214,224,120,0.28)'; ctx.beginPath(); ctx.arc(a.x, a.y, 13 * s, 0, 6.2832); ctx.fill();
      ctx.fillStyle = '#c9d27a'; ctx.beginPath(); ctx.arc(a.x, a.y, 8 * s, 0, 6.2832); ctx.fill();
      ctx.fillStyle = '#7d8a3c'; ctx.beginPath(); ctx.arc(a.x + 2 * s, a.y + 1.5 * s, 3.8 * s, 0, 6.2832); ctx.fill();
    });
  }

  function drawTransfer(t, s) {
    if (flash && t - flash.t < 0.9) {
      var age = t - flash.t, spot = place(flash.at, t, flash);
      ctx.strokeStyle = 'rgba(255,236,190,' + (1 - age / 0.9) + ')'; ctx.lineWidth = 1.8 * s;
      ctx.beginPath(); ctx.arc(spot.x, spot.y, (12 + age * 34) * s, 0, 6.2832); ctx.stroke();
    }
    var u = (t - transfer.t) / LEG_TIME;
    if (u < 0 || u > 1) { return; }
    var leg = LEGS[transfer.leg], from = place(leg[0], t), to = place(leg[1], t);
    var e = u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2, side = transfer.leg < 2 ? 1 : -1;
    var dx = to.x - from.x, dy = to.y - from.y, bow = Math.sin(e * Math.PI) * 26 * s * side, len = Math.sqrt(dx * dx + dy * dy) || 1;
    var x = from.x + dx * e - dy / len * bow, y = from.y + dy * e + dx / len * bow;
    ctx.strokeStyle = 'rgba(255,236,190,0.6)'; ctx.setLineDash([3 * s, 5 * s]); ctx.lineWidth = 1.2 * s;
    ctx.beginPath(); ctx.moveTo(from.x, from.y); ctx.quadraticCurveTo(from.x + dx / 2 - dy / len * 52 * s * side, from.y + dy / 2 + dx / len * 52 * s * side, to.x, to.y); ctx.stroke(); ctx.setLineDash([]);
    block(x, y, s, TE_COLORS[transfer.color], Math.atan2(dy, dx) * 0.25);
  }

  function draw() {
    if (ready < 2 || !w) { return; }
    var t = clock, s = w / 360;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    drawBackdrop(t);
    motes.forEach(function (mote) {
      var my = ((mote.y - t * mote.v) % 1 + 1) % 1;
      ctx.fillStyle = 'rgba(255,249,233,0.3)';
      ctx.beginPath(); ctx.arc(mote.x * w + Math.sin(t * 0.4 + mote.y * 9) * 6 * s, my * h, mote.r * s, 0, 6.2832); ctx.fill();
    });
    drawAlgae(t, s);
    drawSprite('shrimp', w * 0.36, h * (0.665 + Math.sin(t * 0.9) * 0.004), w * 0.13, -1, t, false);
    FISH.forEach(function (kind, i) { var f = fishAt(i, t); drawSprite(kind.art, f.x, f.y, w * kind.size, f.dir, t + i, true); });
    drawTransfer(t, s);
  }

  function advance(dt) {
    clock += dt;
    if (clock - transfer.t < LEG_TIME) { return; }
    flash = { at: LEGS[transfer.leg][1], t: clock, fish: transfer.fish, alga: transfer.alga, host: transfer.host };
    transfer.leg = (transfer.leg + 1) % LEGS.length;
    transfer.t = clock + REST;
    if (transfer.leg === 0) { transfer.color = (transfer.color + 1) % TE_COLORS.length; }
    if (transfer.leg % 2 === 0) { transfer.alga = Math.floor(Math.random() * algae.length); transfer.fish = Math.floor(Math.random() * 4); }
    if (transfer.leg === 0) { transfer.host = transfer.fish === 0 ? 'carpet' : 'bubble'; }
  }

  function tick(now) {
    frame = 0;
    if (!visible || paused || document.hidden) { last = 0; return; }
    advance(last ? Math.min(0.05, (now - last) / 1000) : 0.016);
    last = now;
    draw();
    frame = requestAnimationFrame(tick);
  }
  function run() { if (!frame && !reduce && ready === 2) { frame = requestAnimationFrame(tick); } }

  function start() {
    ready += 1;
    if (ready < 2) { return; }
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
  }

  // The figure stays hidden, and the intro stays single-column, unless both images load.
  backdrop.onload = start; atlas.onload = start;
  backdrop.src = canvas.getAttribute('data-backdrop');
  atlas.src = canvas.getAttribute('data-animals');
}());
