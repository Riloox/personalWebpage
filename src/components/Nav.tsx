import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'motion/react';

import { ui, type LanguageKey } from '../data/profile';

interface NavProps {
  language: LanguageKey;
  onLanguageChange: (lang: LanguageKey) => void;
}

const Nav = ({ language, onLanguageChange }: NavProps) => {
  const t = ui[language];
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile drawer if the viewport grows past the breakpoint.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 48rem)');
    const onChange = () => {
      if (mq.matches) setMenuOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const links: Array<{ href: string; label: string }> = [
    { href: '#work', label: t.nav.work },
    { href: '#experience', label: t.nav.experience },
    { href: '#skills', label: t.nav.skills },
    { href: '#contact', label: t.nav.contact },
  ];

  return (
    <>
      <motion.div className="fl-progress" style={{ scaleX: progress }} aria-hidden="true" />
      <header className={`fl-nav${scrolled || menuOpen ? ' is-scrolled' : ''}`}>
        <div className="fl-nav-inner">
          <a className="fl-logo" href="#top" aria-label="riloox.site — home">
            riloox<span>.site</span>
          </a>
          <nav className="fl-nav-links" aria-label="Main">
            {links.map((link) => (
              <a key={link.href} className="fl-nav-link" href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
          <div className="fl-lang" role="group" aria-label="Language">
            {(['en', 'es'] as const).map((lang) => (
              <button
                key={lang}
                type="button"
                className={language === lang ? 'is-active' : undefined}
                aria-pressed={language === lang}
                onClick={() => onLanguageChange(lang)}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            type="button"
            className={`fl-burger${menuOpen ? ' is-open' : ''}`}
            aria-expanded={menuOpen}
            aria-controls="fl-mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
        </div>
        <AnimatePresence>
          {menuOpen ? (
            <motion.nav
              id="fl-mobile-menu"
              className="fl-mobile-menu"
              aria-label="Main"
              initial={reduced ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={reduced ? undefined : { opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {links.map((link, i) => (
                <a
                  key={link.href}
                  className="fl-mobile-link"
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="fl-mobile-index">0{i + 1}</span>
                  {link.label}
                </a>
              ))}
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Nav;
