import { motion, useReducedMotion } from 'motion/react';

import MagneticButton from '../components/MagneticButton';
import Marquee from '../components/Marquee';
import { contact, cvFiles, heroContent, faltaUno, ui, type LanguageKey } from '../data/profile';

interface HeroSectionProps {
  language: LanguageKey;
  /** Hero holds at its initial frame until the intro hands off, then enters. */
  introDone: boolean;
}

const EASE = [0.16, 1, 0.3, 1] as const;

const HeroSection = ({ language, introDone }: HeroSectionProps) => {
  const hero = heroContent[language];
  const t = ui[language];
  const reduced = useReducedMotion();

  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          // Stay parked behind the curtain until the gates start opening.
          animate: introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
          transition: { duration: 0.8, delay, ease: EASE },
        };

  // Each name line slides up from behind an overflow-hidden mask.
  const lineReveal = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { y: '110%' },
          animate: introDone ? { y: '0%' } : { y: '110%' },
          transition: { duration: 1, delay, ease: EASE },
        };

  return (
    <section className="fl-hero" id="top" aria-label="Intro">
      <div className="fl-shell">
        <motion.div className="fl-hero-badge" {...rise(0)}>
          <span className="fl-dot" aria-hidden="true" />
          {t.available}
        </motion.div>

        <motion.p className="fl-hero-kicker" {...rise(0.05)}>
          {hero.kicker}
        </motion.p>

        <h1 className="fl-hero-name">
          <span className="line">
            <motion.span className="shimmer" {...lineReveal(0.15)}>
              {hero.firstName}
            </motion.span>
          </span>
          <span className="line outline">
            <motion.span {...lineReveal(0.28)}>{hero.lastName}</motion.span>
          </span>
        </h1>

        <motion.p className="fl-hero-summary" {...rise(0.45)}>
          {hero.summary}
        </motion.p>

        <motion.div className="fl-hero-ctas" {...rise(0.65)}>
          <MagneticButton
            className="fl-btn fl-btn-primary"
            href={faltaUno[language].links.demo}
            target="_blank"
            rel="noreferrer"
          >
            {t.seeFaltaUno} <span className="arrow">↗</span>
          </MagneticButton>
          <a className="fl-btn fl-btn-ghost" href={cvFiles[language]} target="_blank" rel="noreferrer">
            {t.downloadCv}
          </a>
          <a className="fl-btn fl-btn-ghost" href={`mailto:${contact[language].email}`}>
            {t.emailMe}
          </a>
        </motion.div>

        <Marquee items={hero.marquee} />
      </div>

      <div className="fl-hero-scroll" aria-hidden="true">
        {t.scrollHint}
      </div>
    </section>
  );
};

export default HeroSection;
