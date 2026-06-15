import { useEffect, useState } from 'react';
import { animate, AnimatePresence, motion, useReducedMotion, type Variants } from 'motion/react';

import type { LanguageKey } from '../data/profile';

interface LoaderProps {
  language: LanguageKey;
  /** Fired the instant the gates begin to open, so the hero reveals in motion. */
  onDone: () => void;
}

const EASE = [0.16, 1, 0.3, 1] as const;

/** Stadium-announcer words swapped while the floodlights warm up, synced to the counter. */
const phases: Record<LanguageKey, [string, string, string]> = {
  en: ['STADIUM', 'FLOODLIGHTS', 'GO'],
  es: ['ESTADIO', 'REFLECTORES', 'ARRANQUE'],
};

const hudLabel: Record<LanguageKey, string> = {
  en: 'POWERING THE STADIUM',
  es: 'ENCENDIENDO EL ESTADIO',
};

/* Variant trees — the parent drives enter/exit, children inherit the state. */
const gateTop: Variants = {
  enter: { y: 0 },
  // Held 0.3s so the whistle burst peaks first and reads as the cause.
  exit: { y: '-101%', transition: { duration: 0.65, ease: EASE, delay: 0.3 } },
};
const gateBottom: Variants = {
  enter: { y: 0 },
  exit: { y: '101%', transition: { duration: 0.65, ease: EASE, delay: 0.3 } },
};
const stageVariants: Variants = {
  enter: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.28, ease: 'easeIn' } },
};
const circleVariants: Variants = {
  enter: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.22, ease: 'easeIn' } },
};
const hudVariants: Variants = {
  enter: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.22 } },
};
/* The whistle burst — a flash of stadium light punching out from the center spot. */
const burstVariants: Variants = {
  enter: { opacity: 0, scale: 0.25 },
  exit: {
    opacity: [0, 1, 0],
    scale: [0.25, 1.6, 3],
    // Peaks at ~0.21s — just before the gates begin to part at 0.3s.
    transition: { duration: 0.6, ease: 'easeOut', times: [0, 0.35, 1] },
  },
};

/**
 * Cinematic intro — "the kickoff whistle". Stadium floodlights flicker on, the
 * pitch center circle draws itself in, and a live counter climbs 00 → 100 while
 * announcer words swap STADIUM / FLOODLIGHTS / GO. At full power the whistle
 * fires: a burst of light punches out from the center spot and the curtain
 * splits like stadium gates — handing the eye straight to the hero, which
 * begins its own entrance the instant the gates start to open.
 * Skipped entirely under reduced motion — the page paints immediately.
 */
const Loader = ({ language, onDone }: LoaderProps) => {
  const reduced = useReducedMotion();
  const [done, setDone] = useState(reduced ?? false);
  const [count, setCount] = useState(0);
  const [ready, setReady] = useState(false);

  // Drive the counter; words derive from it, and 100% triggers the whistle.
  useEffect(() => {
    if (reduced) {
      setDone(true);
      onDone();
      return;
    }
    const controls = animate(0, 100, {
      duration: 1.6,
      ease: [0.45, 0, 0.1, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => {
        setReady(true);
        // Hold on the bright "GO" flash, then fire everything on the same tick:
        // gates start opening AND the hero starts its entrance together.
        window.setTimeout(() => {
          onDone();
          setDone(true);
        }, 300);
      },
    });
    return () => controls.stop();
    // onDone is stable for the lifetime of the loader.
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const words = phases[language];
  const wordIndex = count < 40 ? 0 : count < 80 ? 1 : 2;

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          key="intro"
          className="intro"
          role="status"
          aria-live="polite"
          aria-label={hudLabel[language]}
          initial="enter"
          animate="enter"
          exit="exit"
        >
          {/* Curtain gates — these are the black background; they split on exit. */}
          <motion.div className="intro-gate intro-gate-top" variants={gateTop} aria-hidden="true" />
          <motion.div className="intro-gate intro-gate-bottom" variants={gateBottom} aria-hidden="true" />

          {/* Floodlight beams flicker on from the top corners. */}
          <span className="intro-beam intro-beam-l" aria-hidden="true" />
          <span className="intro-beam intro-beam-r" aria-hidden="true" />
          {/* Floodlit pitch glow rising from the bottom. */}
          <span className="intro-pitch" aria-hidden="true" />

          {/* The pitch center circle drawing itself in around the center spot. */}
          <motion.svg
            className="intro-circle"
            viewBox="0 0 200 200"
            fill="none"
            aria-hidden="true"
            variants={circleVariants}
          >
            <motion.circle
              cx="100"
              cy="100"
              r="92"
              stroke="var(--green)"
              strokeWidth="0.8"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ duration: 1.1, ease: EASE }}
            />
            <motion.circle
              cx="100"
              cy="100"
              r="3"
              fill="var(--green)"
              stroke="none"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.9, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3, ease: EASE }}
            />
          </motion.svg>

          {/* Center stage: the swapping announcer word, framed by the circle. */}
          <motion.div className="intro-stage" variants={stageVariants}>
            <AnimatePresence mode="wait">
              <motion.div
                key={wordIndex}
                className="intro-word-mask"
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                exit={{ y: '-110%' }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <span className={`intro-word${ready ? ' is-go' : ''}`}>{words[wordIndex]}</span>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Bottom HUD: label, live counter, floodlight-intensity meter. */}
          <motion.div className="intro-hud" variants={hudVariants}>
            <div className="intro-hud-row">
              <span className="intro-hud-label">{hudLabel[language]}</span>
              <span className="intro-hud-count">{String(count).padStart(3, '0')}%</span>
            </div>
            <span className="intro-meter" aria-hidden="true">
              <span className="intro-meter-fill" style={{ transform: `scaleX(${count / 100})` }} />
            </span>
          </motion.div>

          {/* Whistle burst on exit, from the center spot. */}
          <motion.span className="intro-burst" variants={burstVariants} aria-hidden="true" />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Loader;
