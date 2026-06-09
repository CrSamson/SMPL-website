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
    header.classList.toggle("is-scrolled", window.scrollY > 12);
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
  };

  const resize = () => {
    const rect = target.getBoundingClientRect();
    state.width = Math.max(1, Math.floor(rect.width));
    state.height = Math.max(1, Math.floor(rect.height));
    target.width = Math.floor(state.width * state.dpr);
    target.height = Math.floor(state.height * state.dpr);
    context.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);

    const spacing = state.width < 700 ? 64 : 76;
    const offsetX = (state.width % spacing) / 2;
    const offsetY = (state.height % spacing) / 2;
    const nodes = [];

    for (let y = offsetY; y <= state.height; y += spacing) {
      for (let x = offsetX; x <= state.width; x += spacing) {
        nodes.push({ x, y });
      }
    }

    state.nodes = nodes;
    state.pulses = [];
    state.lines = [];
  };

  const drawDot = (node, alpha, radius, glow) => {
    context.beginPath();
    context.fillStyle = `rgba(59, 130, 246, ${alpha})`;
    context.arc(node.x, node.y, radius, 0, Math.PI * 2);
    context.fill();

    if (glow) {
      context.beginPath();
      context.fillStyle = `rgba(59, 130, 246, ${alpha * 0.16})`;
      context.arc(node.x, node.y, radius * 6, 0, Math.PI * 2);
      context.fill();
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

    context.clearRect(0, 0, state.width, state.height);
    state.nodes.forEach((node) => drawDot(node, 0.25, 1.5, false));

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
      context.moveTo(line.from.x, line.from.y);
      context.lineTo(line.to.x, line.to.y);
      context.stroke();
    });

    state.pulses = state.pulses.filter((pulse) => now - pulse.born < pulse.duration);
    state.pulses.forEach((pulse) => {
      const age = (now - pulse.born) / pulse.duration;
      const alpha = 0.25 + Math.sin(Math.PI * age) * 0.6;
      const radius = 1.7 + Math.sin(Math.PI * age) * 0.7;
      drawDot(pulse.node, alpha, radius, true);
    });
  };

  resize();
  window.addEventListener("resize", resize);

  if (reducedMotion.matches) {
    renderStatic();
    return;
  }

  requestAnimationFrame(animate);
}

if (canvas) {
  createCircuitBackground(canvas);
}
