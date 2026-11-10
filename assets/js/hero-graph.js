(function () {
  var box = document.getElementById("heroGraph");
  if (!box || !window.d3 || !d3.forceSimulation) return;
  var canvas = box.querySelector("canvas"), ctx = canvas.getContext("2d");
  var tip = box.querySelector(".hero-graph-tip");

  var domains = [
    ["ml", "Explainable ML & Risk Intelligence", "RiskPulse, RedShift"],
    ["fin", "Quantitative FinTech Systems", "ArthSetu credit scoring, stress testers"],
    ["cloud", "Cloud-Native Backend Engineering", "API-first, pipeline infra across projects, recon toolkit"],
    ["sec", "Applied Cybersecurity", "recon/vulnerability-assessment toolkit"],
    ["llm", "LLM Agents, RAG & NLP", "quotation-fidelity forensic pipeline"],
    ["auto", "Autonomous Systems & Robotics", "AirMouse, AEGIS"],
    ["cv", "Computer Vision & Signal Processing", "Agastya, AirMouse (YOLOv8/v11), open-vocab segmentation review"]
  ];
  var projects = [
    ["riskpulse", "RiskPulse", ["ml", "fin"], "#proj-riskpulse"],
    ["redshift", "RedShift", ["ml"], "#proj-redshift"],
    ["arthsetu", "ArthSetu", ["fin"], "#proj-arthsetu"],
    ["agastya", "Agastya", ["cv"], "#proj-agastya"],
    ["aegis", "AEGIS", ["auto", "llm"], "#proj-aegis"],
    ["nidar", "AirMouse", ["auto", "cv"], "#proj-nidar"],
    ["stress", "Macro-Financial Stress Tester", ["fin"], "#faq"],
    ["quote", "Quotation Fidelity Pipeline", ["llm"], "#articles"],
    ["recon", "Recon Toolkit", ["sec", "cloud"], "#proj-reconai"]
  ];
  var thread = ["riskpulse", "arthsetu", "aegis"];

  var cs = getComputedStyle(document.documentElement);
  var pink = getComputedStyle(document.querySelector(".banner-three-left-title")).color || "#c8479e";
  var headFont = getComputedStyle(document.querySelector(".banner-three-title")).fontFamily;
  var bodyFont = getComputedStyle(document.body).fontFamily;

  var nodes = [], byId = {}, links = [];
  domains.forEach(function (d, i) {
    var n = { id: d[0], label: d[1], sub: d[2], type: "d", r: 11, i: i };
    nodes.push(n); byId[n.id] = n;
  });
  projects.forEach(function (p) {
    var n = { id: p[0], label: p[1], type: "p", r: 6, href: p[3] };
    nodes.push(n); byId[n.id] = n;
    p[2].forEach(function (d) { links.push({ source: n.id, target: d, dashed: false }); });
  });
  thread.forEach(function (p) { links.push({ source: p, target: "cloud", dashed: true }); });
  var nbr = {};
  nodes.forEach(function (n) { nbr[n.id] = {}; nbr[n.id][n.id] = 1; });
  links.forEach(function (l) { nbr[l.source][l.target] = 1; nbr[l.target][l.source] = 1; });

  var W = 0, H = 0, dpr = 1;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  nodes.forEach(function (n, i) { n.sidx = i; });
  var cam = { x: 0, y: 0, k: 1 }, camT = null;
  var hover = null, focus = null, drag = null;

  var sim = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(function (n) { return n.id; })
      .distance(function (l) { return l.dashed ? 220 : 82; })
      .strength(function (l) { return l.dashed ? 0.02 : 0.6; }))
    .force("charge", d3.forceManyBody().strength(function (n) { return n.type === "d" ? -420 : -260; }))
    .force("collide", d3.forceCollide(function (n) { return n.r + (n.type === "d" ? 18 : 34); }))
    .velocityDecay(0.55).alphaDecay(0.03).alphaTarget(0).stop();
  function setAnchors() {
    sim.force("ax", d3.forceX(function (n) { return n.type === "d" ? n.ax : 0; }).strength(function (n) { return n.type === "d" ? 0.4 : 0.03; }));
    sim.force("ay", d3.forceY(function (n) { return n.type === "d" ? n.ay : 0; }).strength(function (n) { return n.type === "d" ? 0.4 : 0.03; }));
  }

  function layout() {
    var rx = W * 0.35, ry = H * 0.35;
    domains.forEach(function (d, i) {
      var a = -Math.PI / 2 + i * 2 * Math.PI / domains.length, n = byId[d[0]];
      n.ax = Math.cos(a) * rx; n.ay = Math.sin(a) * ry; n.ang = a;
    });
  }
  function resize() {
    var r = box.getBoundingClientRect();
    if (!r.width) return;
    W = r.width; H = r.height; dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr; canvas.height = H * dpr;
    var first = !nodes[0].x && nodes[0].x !== 0 || nodes[0].ax === undefined;
    layout(); setAnchors();
    if (first) nodes.forEach(function (n) { if (n.type === "d") { n.x = n.ax; n.y = n.ay; } else { n.x = (Math.random() - .5) * 60; n.y = (Math.random() - .5) * 60; } });
    sim.alpha(0.8);
  }

  function toS(n) {
    var t = performance.now() * 0.0007, i = n.sidx || 0, m = reduce ? 0 : 1.6;
    return [(n.x - cam.x) * cam.k + W / 2 + Math.sin(t + i * 1.7) * m, (n.y - cam.y) * cam.k + H / 2 + Math.cos(t * 0.9 + i * 2.3) * m];
  }
  function wrap(text, maxW) {
    var words = text.split(" "), lines = [], cur = "";
    words.forEach(function (w) {
      var t = cur ? cur + " " + w : w;
      if (ctx.measureText(t).width > maxW && cur) { lines.push(cur); cur = w; } else cur = t;
    });
    if (cur) lines.push(cur);
    return lines;
  }
  function alphaFor(n) {
    var act = focus || hover;
    return !act || nbr[act.id][n.id] ? 1 : 0.15;
  }

  function draw() {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    var act = focus || hover;
    // links
    links.forEach(function (l) {
      var a = toS(l.source), b = toS(l.target);
      var on = act && (l.source === act || l.target === act);
      ctx.globalAlpha = act ? (on ? 1 : 0.1) : (l.dashed ? 0.3 : 0.55);
      ctx.strokeStyle = on ? pink : "#000";
      ctx.lineWidth = on ? 1.4 : 0.8;
      ctx.setLineDash(l.dashed ? [4, 4] : []);
      ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
    });
    ctx.setLineDash([]);
    // nodes
    nodes.forEach(function (n) {
      var p = toS(n), r = n.r * Math.min(cam.k, 1.6), isAct = act === n;
      ctx.globalAlpha = alphaFor(n);
      ctx.beginPath(); ctx.arc(p[0], p[1], r, 0, 6.2832);
      if (n.type === "d") {
        ctx.fillStyle = "#000"; ctx.fill();
        ctx.lineWidth = 2.5; ctx.strokeStyle = pink; ctx.stroke();
      } else {
        ctx.fillStyle = isAct ? pink : "#fff"; ctx.fill();
        ctx.lineWidth = 1.2; ctx.strokeStyle = isAct ? pink : "#000"; ctx.stroke();
      }
    });
    // labels
    nodes.forEach(function (n) {
      var p = toS(n), isD = n.type === "d", fs = (isD ? 13 : 12) * Math.min(Math.max(cam.k, 1), 1.4);
      ctx.globalAlpha = alphaFor(n);
      ctx.font = (isD ? "700 " : "500 ") + fs + "px " + (isD ? headFont : bodyFont);
      ctx.fillStyle = (act === n) ? pink : "#000";
      ctx.lineJoin = "round"; ctx.lineWidth = 3; ctx.strokeStyle = "#f5f5f5";
      var lines = wrap(n.label, isD ? 120 : 130), lh = fs + 1.5, r = n.r * Math.min(cam.k, 1.6);
      var cx = Math.cos(n.ang === undefined ? Math.atan2(n.y, n.x) : n.ang), side = Math.abs(cx) > 0.3;
      var al = side ? (cx > 0 ? "left" : "right") : "center";
      if (!isD) { al = "center"; side = false; }
      ctx.textAlign = al; ctx.textBaseline = "middle";
      var sgn = (n.type === "d" && Math.sin(n.ang) < 0) || (!isD && n.y < 0) ? -1 : 1;
      var x = p[0] + (side ? (cx > 0 ? 1 : -1) * (r + 6) : 0);
      var y0 = side ? p[1] - (lines.length - 1) * lh / 2 : (sgn > 0 ? p[1] + r + 9 : p[1] - r - 9 - (lines.length - 1) * lh);
      lines.forEach(function (t, i) {
        var y = y0 + i * lh;
        ctx.strokeText(t, x, y); ctx.fillText(t, x, y);
      });
    });
    ctx.globalAlpha = 1;
  }

  function frame() {
    if (!running) return;
    sim.tick();
    if (camT) {
      var t = Math.min((performance.now() - camT.t0) / camT.d, 1), e = 1 - Math.pow(1 - t, 3);
      cam.x = camT.x0 + (camT.x1 - camT.x0) * e;
      cam.y = camT.y0 + (camT.y1 - camT.y0) * e;
      cam.k = camT.k0 + (camT.k1 - camT.k0) * e;
      if (t >= 1) camT = null;
      placeTip();
    }
    draw();
    requestAnimationFrame(frame);
  }
  var running = true;
  requestAnimationFrame(frame);
  new IntersectionObserver(function (es) {
    var vis = es[0].isIntersecting;
    if (vis && !running) { running = true; requestAnimationFrame(frame); }
    else if (!vis) running = false;
  }).observe(box);
  new ResizeObserver(function () { resize(); }).observe(box);

  function flyTo(x, y, k) {
    camT = { t0: performance.now(), d: 650, x0: cam.x, y0: cam.y, k0: cam.k, x1: x, y1: y, k1: k };
  }
  function pick(mx, my) {
    var best = null, bd = 1e9;
    nodes.forEach(function (n) {
      var p = toS(n), d = Math.hypot(p[0] - mx, p[1] - my), r = n.r * Math.min(cam.k, 1.6) + 6;
      if (d < r && d < bd) { best = n; bd = d; }
    });
    return best;
  }
  function mouse(e) { var r = canvas.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; }

  function placeTip() {
    if (!focus) { tip.hidden = true; return; }
    var p = toS(focus);
    tip.style.left = Math.max(115, Math.min(W - 115, p[0])) + "px";
    tip.style.top = Math.max(60, p[1] - focus.r * cam.k - 8) + "px";
  }
  function showTip(n) {
    tip.innerHTML = "";
    var b = document.createElement("b"); b.textContent = n.label; tip.appendChild(b);
    if (n.type === "d") { var s = document.createElement("span"); s.textContent = n.sub; tip.appendChild(s); }
    else {
      var a = document.createElement("a"); a.href = n.href; a.textContent = "View project →";
      a.addEventListener("click", function (ev) { ev.preventDefault(); goTo(n.href); });
      tip.appendChild(a);
    }
    tip.hidden = false; placeTip();
  }
  function goTo(sel) {
    var el = document.querySelector(sel); if (!el) return;
    if (window.smoother && smoother.scrollTo) smoother.scrollTo(el, true, "top 120px");
    else if (window.jQuery) jQuery("html, body").stop().animate({ scrollTop: jQuery(el).offset().top - 120 }, 1200);
    else el.scrollIntoView({ behavior: "smooth" });
  }
  function focusOn(n) {
    focus = n;
    var xs = [], ys = [];
    nodes.forEach(function (m) { if (nbr[n.id][m.id]) { xs.push(m.x); ys.push(m.y); } });
    var minx = Math.min.apply(0, xs), maxx = Math.max.apply(0, xs), miny = Math.min.apply(0, ys), maxy = Math.max.apply(0, ys);
    var k = Math.min(2, (W * 0.55) / Math.max(maxx - minx, 60), (H * 0.55) / Math.max(maxy - miny, 60));
    flyTo((minx + maxx) / 2, (miny + maxy) / 2, Math.max(1.2, k));
    showTip(n);
  }
  function reset() { focus = null; tip.hidden = true; flyTo(0, 0, 1); }

  var moved = 0, last = null;
  canvas.addEventListener("pointerdown", function (e) {
    canvas.setPointerCapture(e.pointerId); last = [e.clientX, e.clientY]; moved = 0; canvas.style.cursor = "grabbing";
  });
  canvas.addEventListener("pointermove", function (e) {
    var m = mouse(e);
    if (last && e.buttons) {
      var dx = e.clientX - last[0], dy = e.clientY - last[1]; moved += Math.abs(dx) + Math.abs(dy);
      if (moved > 4) { camT = null; cam.x -= dx / cam.k; cam.y -= dy / cam.k; placeTip(); }
      last = [e.clientX, e.clientY];
    } else {
      hover = pick(m[0], m[1]); canvas.style.cursor = hover ? "pointer" : "grab";
    }
  });
  canvas.addEventListener("pointerup", function (e) {
    canvas.style.cursor = hover ? "pointer" : "grab"; last = null;
    if (moved > 4) return;
    var m = mouse(e), n = pick(m[0], m[1]);
    if (n) focusOn(n); else if (focus || cam.k !== 1) reset();
  });
  canvas.addEventListener("pointerleave", function () { hover = null; });
  // Zoom: pinch / ctrl+wheel, or wheel once already zoomed in — otherwise the page scrolls normally.
  canvas.addEventListener("wheel", function (e) {
    if (!(e.ctrlKey || e.metaKey || cam.k > 1.02)) return;
    e.preventDefault(); e.stopPropagation(); camT = null;
    cam.k = Math.min(3, Math.max(0.8, cam.k * Math.exp(-e.deltaY * 0.0025))); placeTip();
  }, { passive: false });
})();
