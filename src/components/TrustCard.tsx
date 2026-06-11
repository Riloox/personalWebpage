import GlassCard from './GlassCard';
import { trustEarned, type LanguageKey } from '../data/profile';

interface TrustCardProps {
  language: LanguageKey;
  delay?: number;
}

const TrustCard = ({ language, delay = 0 }: TrustCardProps) => {
  const t = trustEarned[language];
  return (
    <GlassCard span="sm" delay={delay} className="small-card">
      <p className="label">{t.label}</p>
      <p className="display small-display">{t.display}</p>
      <p className="small-sub">{t.sub}</p>
    </GlassCard>
  );
};

export default TrustCard;
