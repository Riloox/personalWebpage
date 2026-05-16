import GlassCard from './GlassCard';
import { skills, type LanguageKey } from '../data/profile';

interface StackCardProps {
  language: LanguageKey;
  delay?: number;
}

const STACK_LABEL: Record<LanguageKey, string> = {
  en: 'Core stack',
  es: 'Stack principal',
};

const StackCard = ({ language, delay = 0 }: StackCardProps) => {
  const items = skills[language].primary.slice(0, 6);
  return (
    <GlassCard span="sm" delay={delay} className="small-card">
      <p className="label">{STACK_LABEL[language]}</p>
      <div>
        {items.map((item) => (
          <span key={item} className="chip">
            {item}
          </span>
        ))}
      </div>
    </GlassCard>
  );
};

export default StackCard;
