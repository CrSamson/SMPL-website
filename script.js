const body = document.body;
const header = document.querySelector("[data-header]");
const toggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const year = document.querySelector("[data-year]");
const canvas = document.querySelector("[data-circuit-bg]");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (header) {
  const syncHeader = () => {
    header.classList.toggle("scrolled", window.scrollY > 12);
  };
  syncHeader();
  window.addEventListener("scroll", syncHeader, { passive: true });
}

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = body.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && body.classList.contains("nav-open")) {
    body.classList.remove("nav-open");
    toggle?.setAttribute("aria-expanded", "false");
    toggle?.setAttribute("aria-label", "Open menu");
  }
});

function createCircuitBackground(target) {
  const context = target.getContext("2d");
  if (!context) return;
  const hero = target.closest(".hero");
  if (!hero) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const state = {
    dpr: Math.min(window.devicePixelRatio || 1, 2),
    width: 0,
    height: 0,
    nodes: [],
    pulses: [],
    lines: [],
    lastFrame: 0,
    lastPulse: 0,
    lastLine: 0,
    frameInterval: 1000 / 30,
    mouse: {
      x: 0,
      y: 0,
      strength: 0,
      targetStrength: 0,
      lastMove: 0,
    },
  };

  const resize = () => {
    state.width = Math.max(1, Math.floor(hero.offsetWidth));
    state.height = Math.max(1, Math.floor(hero.offsetHeight));
    target.width = Math.floor(state.width * state.dpr);
    target.height = Math.floor(state.height * state.dpr);
    context.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);

    const spacing = 60;
    const nodes = [];
    let index = 0;

    for (let y = 0; y <= state.height; y += spacing) {
      for (let x = 0; x <= state.width; x += spacing) {
        const seed = Math.sin(index * 12.9898) * 43758.5453;
        const fraction = seed - Math.floor(seed);
        nodes.push({
          x,
          y,
          angle: fraction * Math.PI * 2,
          phase: fraction * Math.PI * 4,
          spin: index % 2 === 0 ? 1 : -1,
          weight: 14 + fraction * 18,
        });
        index += 1;
      }
    }

    state.nodes = nodes;
    state.pulses = [];
    state.lines = [];
  };

  const positionForNode = (node, now) => {
    const idleDrift = Math.sin(now * 0.0007 + node.phase) * 0.45;
    const point = {
      x: node.x + Math.cos(node.angle) * idleDrift,
      y: node.y + Math.sin(node.angle) * idleDrift,
    };

    if (state.mouse.strength <= 0.01) return point;

    const dx = node.x - state.mouse.x;
    const dy = node.y - state.mouse.y;
    const distance = Math.hypot(dx, dy) || 1;
    const influenceRadius = state.width < 700 ? 150 : 230;
    const proximity = Math.max(0, 1 - distance / influenceRadius);
    if (proximity <= 0) return point;

    const eased = proximity * proximity * state.mouse.strength;
    const radialX = dx / distance;
    const radialY = dy / distance;
    const seededX = Math.cos(node.angle);
    const seededY = Math.sin(node.angle);
    const tangentX = -radialY * node.spin;
    const tangentY = radialX * node.spin;

    point.x += (seededX * 0.55 + radialX * 0.35 + tangentX * 0.22) * node.weight * eased;
    point.y += (seededY * 0.55 + radialY * 0.35 + tangentY * 0.22) * node.weight * eased;
    return point;
  };

  const drawDot = (point, alpha, radius, glow) => {
    const dotRadius = Math.min(radius, 2);
    context.beginPath();
    context.fillStyle = `rgba(59, 130, 246, ${alpha})`;
    context.arc(point.x, point.y, dotRadius, 0, Math.PI * 2);
    context.fill();

    if (glow) {
      context.beginPath();
      context.shadowColor = "rgba(59, 130, 246, 0.85)";
      context.shadowBlur = 6;
      context.fillStyle = `rgba(59, 130, 246, ${alpha * 0.16})`;
      context.arc(point.x, point.y, dotRadius, 0, Math.PI * 2);
      context.fill();
      context.shadowBlur = 0;
    }
  };

  const spawnPulse = (now) => {
    if (!state.nodes.length) return;
    const node = state.nodes[Math.floor(Math.random() * state.nodes.length)];
    state.pulses.push({ node, born: now, duration: 1700 + Math.random() * 500 });
  };

  const spawnLine = (now) => {
    const active = state.pulses
      .filter((pulse) => now - pulse.born < pulse.duration * 0.75)
      .map((pulse) => pulse.node);

    if (!active.length) return;

    const from = active[Math.floor(Math.random() * active.length)];
    const candidates = state.nodes.filter((node) => {
      const dx = Math.abs(node.x - from.x);
      const dy = Math.abs(node.y - from.y);
      return (dx > 40 && dx < 90 && dy < 2) || (dy > 40 && dy < 90 && dx < 2);
    });

    if (!candidates.length) return;
    const to = candidates[Math.floor(Math.random() * candidates.length)];
    state.lines.push({ from, to, born: now, duration: 900 + Math.random() * 500 });
  };

  const renderStatic = () => {
    context.clearRect(0, 0, state.width, state.height);
    state.nodes.forEach((node) => drawDot(node, 0.25, 1.6, false));
  };

  const animate = (now) => {
    requestAnimationFrame(animate);

    if (now - state.lastFrame < state.frameInterval) return;
    state.lastFrame = now;

    if (now - state.mouse.lastMove > 1600) {
      state.mouse.targetStrength = 0;
    }
    state.mouse.strength += (state.mouse.targetStrength - state.mouse.strength) * 0.12;

    context.clearRect(0, 0, state.width, state.height);
    state.nodes.forEach((node) => drawDot(positionForNode(node, now), 0.2, 1.5, false));

    if (now - state.lastPulse > 180 + Math.random() * 220) {
      spawnPulse(now);
      state.lastPulse = now;
    }

    if (now - state.lastLine > 1100 + Math.random() * 900) {
      spawnLine(now);
      state.lastLine = now;
    }

    state.lines = state.lines.filter((line) => now - line.born < line.duration);
    state.lines.forEach((line) => {
      const age = (now - line.born) / line.duration;
      const alpha = Math.sin(Math.PI * age) * 0.15;
      context.beginPath();
      context.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
      context.lineWidth = 0.4;
      const from = positionForNode(line.from, now);
      const to = positionForNode(line.to, now);
      context.moveTo(from.x, from.y);
      context.lineTo(to.x, to.y);
      context.stroke();
    });

    state.pulses = state.pulses.filter((pulse) => now - pulse.born < pulse.duration);
    state.pulses.forEach((pulse) => {
      const age = (now - pulse.born) / pulse.duration;
      const alpha = 0.25 + Math.sin(Math.PI * age) * 0.6;
      drawDot(positionForNode(pulse.node, now), alpha, 1.8, true);
    });
  };

  resize();
  window.addEventListener("resize", resize);
  hero.addEventListener(
    "pointermove",
    (event) => {
      const rect = hero.getBoundingClientRect();
      state.mouse.x = event.clientX - rect.left;
      state.mouse.y = event.clientY - rect.top;
      state.mouse.targetStrength = 1;
      state.mouse.lastMove = performance.now();
    },
    { passive: true },
  );
  hero.addEventListener(
    "pointerleave",
    () => {
      state.mouse.targetStrength = 0;
    },
    { passive: true },
  );

  if (reducedMotion.matches) {
    renderStatic();
    return;
  }

  requestAnimationFrame(animate);
}

if (canvas) {
  createCircuitBackground(canvas);
}
