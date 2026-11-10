// Home illustration: Geneformer in silico perturbation, drawn as a scene.
// A cell is written as a ranked list of gene tokens. One token is deleted, the list closes up,
// and the change spreads through a gene network. Decorative only; it does not show data.
// Art credits: images/home-anemone/CREDITS.md
(function () {
  'use strict';
  var figure = document.querySelector('.reading-isp');
  if (!figure) { return; }
  var canvas = figure.querySelector('canvas');
  var ctx = canvas.getContext ? canvas.getContext('2d') : null;
  if (!ctx) { return; }
  var toggle = figure.querySelector('.anemone-toggle');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var w = 0, h = 0, ratio = 1, frame = 0, visible = true, paused = false, clock = 0, last = 0, loaded = false;
  var backdrop = new Image();
  var TOKENS = 8, CYCLE = 7.5;
  var COLORS = ['#f0c98a', '#8fe0d0', '#f7b199', '#c9d27a', '#b9a2e0', '#f0c98a', '#8fe0d0', '#f7b199'];
  var nodes = [], cycle = -1, target = 0, source = 0;

  function seeded(n) { var x = Math.sin(n * 127.1) * 43758.5453; return x - Math.floor(x); }
  // A fixed gene network in the lower two thirds of the panel.
  for (var i = 0; i < 26; i += 1) {
    nodes.push({ x: 0.08 + seeded(i + 3) * 0.84, y: 0.36 + seeded(i + 51) * 0.56, r: 2.2 + seeded(i + 90) * 2, phase: seeded(i + 130) * 6.28 });
  }

  function resize() {
    var box = canvas.getBoundingClientRect();
    ratio = Math.min(window.devicePixelRatio || 1, 2);
    w = box.width; h = box.height;
    canvas.width = Math.round(w * ratio); canvas.height = Math.round(h * ratio);
    draw();
  }

  function nodeAt(i, t) {
    var n = nodes[i], s = w / 360;
    return { x: n.x * w + Math.sin(t * 0.5 + n.phase) * 4 * s, y: n.y * h + Math.cos(t * 0.4 + n.phase) * 4 * s };
  }

  function token(x, y, tw, th, color, alpha, struck) {
    ctx.save(); ctx.globalAlpha = alpha;
    ctx.shadowColor = 'rgba(10,8,30,0.6)'; ctx.shadowBlur = 5;
    ctx.fillStyle = color; ctx.beginPath();
    if (ctx.roundRect) { ctx.roundRect(x - tw / 2, y - th / 2, tw, th, th * 0.28); } else { ctx.rect(x - tw / 2, y - th / 2, tw, th); }
    ctx.fill(); ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(20,16,48,0.55)';
    ctx.fillRect(x - tw * 0.3, y - th * 0.12, tw * 0.6, th * 0.24);
    if (struck) {
      ctx.strokeStyle = '#ff7a5c'; ctx.lineWidth = Math.max(2, th * 0.16); ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(x - tw * 0.36, y - th * 0.36); ctx.lineTo(x + tw * 0.36, y + th * 0.36);
      ctx.moveTo(x + tw * 0.36, y - th * 0.36); ctx.lineTo(x - tw * 0.36, y + th * 0.36); ctx.stroke();
    }
    ctx.restore();
  }

  function draw() {
    if (!loaded || !w) { return; }
    var t = clock, s = w / 360, u = (t % CYCLE) / CYCLE, k, i, j;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    // Backdrop drifts slowly so the painted cells feel alive.
    var pad = w * 0.03;
    ctx.drawImage(backdrop, -pad + Math.sin(t * 0.25) * pad * 0.6, -pad + Math.cos(t * 0.2) * pad * 0.6, w + pad * 2, h + pad * 2);
    ctx.fillStyle = 'rgba(16,12,44,0.28)'; ctx.fillRect(0, 0, w, h);

    // Phases of one cycle: show the ranked tokens, strike one, close the gap, spread, reset.
    var strike = Math.min(1, Math.max(0, (u - 0.14) / 0.1));
    var close = Math.min(1, Math.max(0, (u - 0.3) / 0.14));
    var wave = Math.max(0, (u - 0.4) / 0.45);
    var fade = u > 0.92 ? (1 - u) / 0.08 : Math.min(1, u / 0.06);
    var ease = close * close * (3 - 2 * close);

    // Gene network.
    var origin = nodeAt(source, t), level = [];
    for (i = 0; i < nodes.length; i += 1) {
      var p = nodeAt(i, t), dx = p.x - origin.x, dy = p.y - origin.y;
      var gap = Math.sqrt(dx * dx + dy * dy) - wave * w * 1.25;
      level.push(wave > 0 && wave < 1 ? Math.exp(-(gap * gap) / (2400 * s * s)) * (1 - wave * 0.6) : 0);
    }
    ctx.lineWidth = 1 * s;
    for (i = 0; i < nodes.length; i += 1) {
      for (j = i + 1; j < nodes.length; j += 1) {
        var a = nodeAt(i, t), b = nodeAt(j, t), d = Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y)), reach = 105 * s;
        if (d < reach) {
          var glow = Math.min(level[i], level[j]);
          ctx.strokeStyle = glow > 0.05 ? 'rgba(255,214,150,' + (0.2 + glow * 0.7) * (1 - d / reach) + ')' : 'rgba(235,228,255,' + 0.3 * (1 - d / reach) + ')';
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
    }
    for (i = 0; i < nodes.length; i += 1) {
      var q = nodeAt(i, t), lit = level[i];
      ctx.fillStyle = lit > 0.05 ? 'rgba(255,214,150,' + (0.5 + lit * 0.5) + ')' : 'rgba(235,228,255,0.7)';
      ctx.beginPath(); ctx.arc(q.x, q.y, (nodes[i].r + lit * 3) * s, 0, 6.2832); ctx.fill();
    }
    if (strike > 0) {
      ctx.strokeStyle = 'rgba(255,122,92,' + (0.9 * fade) + ')'; ctx.lineWidth = 2 * s;
      ctx.beginPath(); ctx.arc(origin.x, origin.y, (7 + Math.sin(t * 5) * 1.2) * s, 0, 6.2832); ctx.stroke();
    }

    // Ranked gene tokens across the top.
    var tw = w * 0.092, th = tw * 0.62, step = w * 0.108, x0 = w / 2 - step * (TOKENS - 1) / 2, ty = h * 0.13;
    for (k = 0; k < TOKENS; k += 1) {
      var x = x0 + k * step, alpha = fade;
      if (k === target) {
        token(x, ty - ease * h * 0.05, tw, th, COLORS[k], fade * (1 - ease), strike > 0.2);
      } else {
        if (k > target) { x -= step * ease; }
        token(x, ty, tw, th, COLORS[k], alpha, false);
      }
    }
    // A line links the deleted token to its gene in the network.
    if (strike > 0 && close < 1) {
      ctx.strokeStyle = 'rgba(255,122,92,' + 0.7 * strike * (1 - close) + ')'; ctx.setLineDash([3 * s, 5 * s]); ctx.lineWidth = 1.2 * s;
      ctx.beginPath(); ctx.moveTo(x0 + target * step, ty + th / 2); ctx.lineTo(origin.x, origin.y); ctx.stroke(); ctx.setLineDash([]);
    }
  }

  function advance(dt) {
    clock += dt;
    var now = Math.floor(clock / CYCLE);
    if (now !== cycle) { cycle = now; target = 1 + Math.floor(Math.random() * (TOKENS - 2)); source = Math.floor(Math.random() * nodes.length); }
  }

  function tick(now) {
    frame = 0;
    if (!visible || paused || document.hidden) { last = 0; return; }
    advance(last ? Math.min(0.05, (now - last) / 1000) : 0.016);
    last = now;
    draw();
    frame = requestAnimationFrame(tick);
  }
  function run() { if (!frame && !reduce && loaded) { frame = requestAnimationFrame(tick); } }

  backdrop.onload = function () {
    loaded = true;
    figure.hidden = false;
    cycle = 0; target = 3; source = 5; clock = reduce ? CYCLE * 0.5 : 0;
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
  };
  backdrop.src = canvas.getAttribute('data-backdrop');
}());
