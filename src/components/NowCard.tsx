import GlassCard from './GlassCard';
import type { LanguageKey } from '../data/profile';

interface NowCardProps {
  language: LanguageKey;
  delay?: number;
}

const NOW_LABEL: Record<LanguageKey, string> = {
  en: 'Now',
  es: 'Ahora',
};

const NOW_SUMMARY: Record<LanguageKey, string> = {
  en: 'Software Dev Analyst @ Bantotal — optimizing core-banking services.',
  es: 'Analista de Desarrollo @ Bantotal — optimizando servicios de core bancario.',
};

const NowCard = ({ language, delay = 0 }: NowCardProps) => {
  return (
    <GlassCard span="sm" delay={delay} className="small-card">
      <p className="label">{NOW_LABEL[language]}</p>
      <p className="body">
        <span className="pulse-dot" aria-hidden="true" />
        {NOW_SUMMARY[language]}
      </p>
    </GlassCard>
  );
};

export default NowCard;
