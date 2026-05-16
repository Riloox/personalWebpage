import GlassCard from '../components/GlassCard';
import { cvFiles, heroContent, type LanguageKey } from '../data/profile';

interface HeroSectionProps {
  language: LanguageKey;
}

const META: Record<LanguageKey, { meta: string; cv: string; email: string; tag: string }> = {
  en: {
    meta: 'Backend developer · Montevideo · UTC-3',
    cv: 'Download CV',
    email: 'Email me',
    tag: 'A backend engineer who measures things.',
  },
  es: {
    meta: 'Desarrollador backend · Montevideo · UTC-3',
    cv: 'Descargar CV',
    email: 'Escribime',
    tag: 'Un ingeniero backend que mide lo que hace.',
  },
};

const HeroSection = ({ language }: HeroSectionProps) => {
  const c = heroContent[language];
  const t = META[language];
  return (
    <GlassCard span="xl" delay={0} className="hero-card" hoverLift={false}>
      <p className="label">{t.meta}</p>
      <h1 className="display hero-name">{c.name}</h1>
      <p className="display-italic hero-tag">{t.tag}</p>
      <p className="body hero-summary">{c.summary}</p>
      <div className="hero-ctas">
        <a className="btn btn-primary" href={cvFiles[language]} download>
          {t.cv}
        </a>
        <a className="btn btn-secondary" href="#contact">
          {t.email}
        </a>
      </div>
    </GlassCard>
  );
};

export default HeroSection;
