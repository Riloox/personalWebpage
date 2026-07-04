import { useCallback, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import type { AnchorHTMLAttributes, PointerEvent as ReactPointerEvent } from 'react';

type MagneticButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** Pull strength in px at the card edge. */
  strength?: number;
};

/**
 * Anchor that drifts toward the pointer while hovered, snapping back on leave.
 * A classic "magnetic" CTA micro-interaction. Pure `transform`, and inert
 * under `prefers-reduced-motion`.
 */
const MagneticButton = ({ strength = 6, children, ...rest }: MagneticButtonProps) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();

  const onPointerMove = useCallback(
    (e: ReactPointerEvent<HTMLAnchorElement>) => {
      if (reduced) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      // Drive a dedicated CSS custom property via the `translate` longhand so
      // the magnetic offset composes with (rather than overwrites) any
      // `transform`-based hover/focus styling and animates back via the class
      // transition.
      el.style.setProperty('--mag-x', `${(x * strength * 2).toFixed(2)}px`);
      el.style.setProperty('--mag-y', `${(y * strength * 2).toFixed(2)}px`);
    },
    [reduced, strength],
  );

  const onPointerLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.removeProperty('--mag-x');
    el.style.removeProperty('--mag-y');
  }, []);

  return (
    <a
      ref={ref}
      onPointerMove={reduced ? undefined : onPointerMove}
      onPointerLeave={reduced ? undefined : onPointerLeave}
      onPointerCancel={reduced ? undefined : onPointerLeave}
      {...rest}
    >
      {children}
    </a>
  );
};

export default MagneticButton;
