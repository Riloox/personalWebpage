import { cvFiles, heroContent, type LanguageKey } from '../data/profile';

interface HeroSectionProps {
  language: LanguageKey;
}

const COPY: Record<
  LanguageKey,
  {
    eyebrow: string;
    tag: string;
    currently: string;
    latest: string;
    stack: string;
    cv: string;
    email: string;
    status: string;
  }
> = {
  en: {
    eyebrow: 'Backend engineer · Montevideo · UTC-3',
    tag: 'Built fast, never sloppy.',
    currently: 'Currently',
    latest: 'Latest',
    stack: 'Stack',
    cv: 'Download CV',
    email: 'Email me',
    status: 'Open to work',
  },
  es: {
    eyebrow: 'Ingeniero backend · Montevideo · UTC-3',
    tag: 'Hecho rápido, nunca descuidado.',
    currently: 'Ahora',
    latest: 'Último',
    stack: 'Stack',
    cv: 'Descargar CV',
    email: 'Escribime',
    status: 'Disponible',
  },
};

const HeroSection = ({ language }: HeroSectionProps) => {
  const c = heroContent[language];
  const t = COPY[language];
  return (
    <section className="ed-hero">
      <p className="ed-eyebrow">{t.eyebrow}</p>

      <h1 className="ed-display">
        {c.name}.
        <br />
        <span className="ed-display-italic">{t.tag}</span>
      </h1>

      <dl className="ed-meta">
        <div className="ed-meta-row">
          <dt>{t.currently}</dt>
          <dd>{c.currentRole}</dd>
        </div>
        <div className="ed-meta-row">
          <dt>{t.latest}</dt>
          <dd>{c.win}</dd>
        </div>
        <div className="ed-meta-row">
          <dt>{t.stack}</dt>
          <dd>{c.stack}</dd>
        </div>
      </dl>

      <hr className="ed-rule" />

      <p className="ed-summary">{c.summary}</p>

      <div className="ed-ctas">
        <a
          className="ed-btn ed-btn-primary"
          href={cvFiles[language]}
          target="_blank"
          rel="noreferrer"
        >
          {t.cv}
        </a>
        <a className="ed-btn ed-btn-ghost" href="#contact">
          {t.email}
        </a>
        <span className="ed-status">
          <span className="ed-status-dot" />
          {t.status}
        </span>
      </div>
    </section>
  );
};

export default HeroSection;
