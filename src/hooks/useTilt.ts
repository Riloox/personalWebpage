import { useCallback, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import type { PointerEvent as ReactPointerEvent } from 'react';

/**
 * Cursor-reactive card: tracks the pointer to drive a subtle 3D tilt and a
 * radial "spotlight" glow (exposed as the `--mx` / `--my` CSS custom
 * properties the stylesheet reads). All work happens through `transform` and
 * CSS variables on the compositor — no layout thrash. Disabled under
 * `prefers-reduced-motion`.
 */
export const useTilt = <T extends HTMLElement = HTMLElement>(max = 6) => {
  const ref = useRef<T>(null);
  const reduced = useReducedMotion();

  const onPointerMove = useCallback(
    (e: ReactPointerEvent<T>) => {
      if (reduced) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rotX = (0.5 - py) * max * 2;
      const rotY = (px - 0.5) * max * 2;
      el.style.setProperty('--mx', `${px * 100}%`);
      el.style.setProperty('--my', `${py * 100}%`);
      el.style.setProperty('--rx', `${rotX.toFixed(2)}deg`);
      el.style.setProperty('--ry', `${rotY.toFixed(2)}deg`);
    },
    [max, reduced],
  );

  const onPointerLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.removeProperty('--rx');
    el.style.removeProperty('--ry');
    // Also clear the spotlight position so it falls back to centre, not the
    // stale last-hovered point, on the next pointer-enter.
    el.style.removeProperty('--mx');
    el.style.removeProperty('--my');
  }, []);

  if (reduced) {
    return { ref, onPointerMove: undefined, onPointerLeave: undefined };
  }
  return { ref, onPointerMove, onPointerLeave };
};

export default useTilt;
