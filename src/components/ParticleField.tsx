import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

/**
 * Living "floodlight motes" backdrop drawn on a 2D canvas: slow-drifting green
 * particles with faint constellation lines that brighten near the pointer,
 * evoking dust caught in a stadium floodlight. Pure compositor-cheap canvas
 * work — paused when the tab is hidden, and not mounted at all under
 * `prefers-reduced-motion` (the static gradient backdrop stands in instead).
 */

interface Mote {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

const GREEN = { r: 42, g: 255, b: 127 };

const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let motes: Mote[] = [];
    let raf = 0;
    let running = true;

    // Pointer in CSS pixels; starts off-screen so lines only appear on move.
    const pointer = { x: -9999, y: -9999 };

    const seed = () => {
      // Density scales with viewport area, capped so low-end devices stay smooth.
      const target = Math.min(90, Math.round((width * height) / 22000));
      motes = Array.from({ length: target }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        r: Math.random() * 1.6 + 0.4,
      }));
    };

    let resizeTimer = 0;

    const resize = () => {
      const newW = window.innerWidth;
      const newH = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(newW * dpr);
      canvas.height = Math.floor(newH * dpr);
      canvas.style.width = `${newW}px`;
      canvas.style.height = `${newH}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Only re-seed on a meaningful change. Mobile address-bar collapse fires
      // a stream of tiny height deltas — re-seeding on those would teleport
      // every mote and thrash the GC. Width-only/minor changes just rescale.
      const substantial = Math.abs(newW - width) > 32 || Math.abs(newH - height) > 32;
      width = newW;
      height = newH;
      if (substantial || motes.length === 0) seed();
    };

    const debouncedResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 150);
    };

    const LINK_DIST = 120;
    const LINK_DIST_SQ = LINK_DIST * LINK_DIST;
    const POINTER_DIST = 180;
    const POINTER_DIST_SQ = POINTER_DIST * POINTER_DIST;

    // Reused each frame: a uniform spatial grid (cell = LINK_DIST) so each mote
    // only tests neighbours in its own + 8 adjacent cells instead of every
    // other mote — turns the link pass from O(n²) into ~O(n).
    const grid = new Map<number, number[]>();
    let cols = 1;
    const cellOf = (x: number, y: number) => {
      const cx = Math.max(0, Math.floor(x / LINK_DIST));
      const cy = Math.max(0, Math.floor(y / LINK_DIST));
      return cy * cols + cx;
    };

    const frame = () => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);

      // Pass 1: advance positions, wrap, and bin into the grid.
      cols = Math.max(1, Math.ceil(width / LINK_DIST));
      grid.clear();
      for (let i = 0; i < motes.length; i++) {
        const m = motes[i];
        m.x += m.vx;
        m.y += m.vy;
        if (m.x < -10) m.x = width + 10;
        else if (m.x > width + 10) m.x = -10;
        if (m.y < -10) m.y = height + 10;
        else if (m.y > height + 10) m.y = -10;
        const key = cellOf(m.x, m.y);
        const bucket = grid.get(key);
        if (bucket) bucket.push(i);
        else grid.set(key, [i]);
      }

      // Pass 2: constellation links, only against grid neighbours (j > i avoids
      // drawing each edge twice). Batched into a single path per frame.
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i < motes.length; i++) {
        const m = motes[i];
        const cx = Math.max(0, Math.floor(m.x / LINK_DIST));
        const cy = Math.max(0, Math.floor(m.y / LINK_DIST));
        for (let gy = cy - 1; gy <= cy + 1; gy++) {
          for (let gx = cx - 1; gx <= cx + 1; gx++) {
            const bucket = grid.get(gy * cols + gx);
            if (!bucket) continue;
            for (let b = 0; b < bucket.length; b++) {
              const j = bucket[b];
              if (j <= i) continue;
              const n = motes[j];
              const dx = m.x - n.x;
              const dy = m.y - n.y;
              const dSq = dx * dx + dy * dy;
              if (dSq < LINK_DIST_SQ) {
                ctx.moveTo(m.x, m.y);
                ctx.lineTo(n.x, n.y);
              }
            }
          }
        }
      }
      // One stroke for all constellation lines (uniform faint alpha).
      ctx.strokeStyle = `rgba(${GREEN.r}, ${GREEN.g}, ${GREEN.b}, 0.08)`;
      ctx.stroke();

      // Pass 3: pointer-halo links — one batched path, single stroke.
      const hasPointer = pointer.x > -9000;
      if (hasPointer) {
        ctx.beginPath();
        for (let i = 0; i < motes.length; i++) {
          const m = motes[i];
          const pdx = m.x - pointer.x;
          const pdy = m.y - pointer.y;
          if (pdx * pdx + pdy * pdy < POINTER_DIST_SQ) {
            ctx.moveTo(m.x, m.y);
            ctx.lineTo(pointer.x, pointer.y);
          }
        }
        ctx.strokeStyle = `rgba(${GREEN.r}, ${GREEN.g}, ${GREEN.b}, 0.22)`;
        ctx.stroke();
      }

      // Pass 4: the motes — two batched fills (far = dim, near pointer = bright).
      // moveTo before each arc keeps the sub-paths disconnected.
      ctx.fillStyle = `rgba(${GREEN.r}, ${GREEN.g}, ${GREEN.b}, 0.45)`;
      ctx.beginPath();
      for (let i = 0; i < motes.length; i++) {
        const m = motes[i];
        if (hasPointer) {
          const pdx = m.x - pointer.x;
          const pdy = m.y - pointer.y;
          if (pdx * pdx + pdy * pdy < POINTER_DIST_SQ) continue;
        }
        ctx.moveTo(m.x + m.r, m.y);
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
      }
      ctx.fill();

      if (hasPointer) {
        ctx.fillStyle = `rgba(${GREEN.r}, ${GREEN.g}, ${GREEN.b}, 0.9)`;
        ctx.beginPath();
        for (let i = 0; i < motes.length; i++) {
          const m = motes[i];
          const pdx = m.x - pointer.x;
          const pdy = m.y - pointer.y;
          if (pdx * pdx + pdy * pdy >= POINTER_DIST_SQ) continue;
          ctx.moveTo(m.x + m.r, m.y);
          ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        }
        ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    };

    const onPointerMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    const onPointerLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    };

    resize();
    raf = requestAnimationFrame(frame);
    window.addEventListener('resize', debouncedResize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      window.removeEventListener('resize', debouncedResize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [reduced]);

  if (reduced) return null;

  return <canvas ref={canvasRef} className="fl-particles" aria-hidden="true" />;
};

export default ParticleField;
