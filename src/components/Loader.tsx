import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

import type { LanguageKey } from '../data/profile';

interface LoaderProps {
  language: LanguageKey;
}

const EASE = [0.16, 1, 0.3, 1] as const;

const bootText: Record<LanguageKey, string> = {
  en: 'booting riloox.site',
  es: 'iniciando riloox.site',
};

/**
 * Brief intro overlay: a floodlight sweep wipes across while the FP monogram
 * strokes itself in, then the whole curtain lifts away. Shown once per mount.
 * Under reduced motion it never renders — the page paints immediately.
 */
const Loader = ({ language }: LoaderProps) => {
  const reduced = useReducedMotion();
  const [done, setDone] = useState(reduced ?? false);

  useEffect(() => {
    if (reduced) {
      setDone(true);
      return;
    }
    // 1.2s: the mark draws in 0.9s, the curtain lift takes 0.8s — this is the
    // shortest hold that lets the monogram finish before the wipe begins.
    const id = window.setTimeout(() => setDone(true), 1200);
    return () => window.clearTimeout(id);
  }, [reduced]);

  // Lock scroll while the curtain is up.
  useEffect(() => {
    if (done) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [done]);

  if (reduced) return null;

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          key="fl-loader"
          className="fl-loader"
          role="status"
          aria-live="polite"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="fl-loader-inner">
            <svg className="fl-loader-mark" viewBox="0 0 120 120" fill="none" aria-hidden="true">
              <motion.path
                d="M30 24 H86 M30 24 V96 M30 58 H72"
                stroke="var(--green)"
                strokeWidth="6"
                strokeLinecap="square"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9, ease: EASE }}
              />
            </svg>
            <motion.span
              className="fl-loader-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {bootText[language]}
              <span className="fl-loader-cursor" aria-hidden="true" />
            </motion.span>
          </div>
          <span className="fl-loader-sweep" aria-hidden="true" />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Loader;
