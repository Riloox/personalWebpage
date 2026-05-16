import GlassCard from '../components/GlassCard';
import { skills, type LanguageKey } from '../data/profile';

interface SkillsSectionProps {
  language: LanguageKey;
}

const TITLE: Record<LanguageKey, { label: string; title: string }> = {
  en: { label: 'Skills', title: 'What I reach for' },
  es: { label: 'Habilidades', title: 'Con lo que trabajo' },
};

const SkillsSection = ({ language }: SkillsSectionProps) => {
  const groups = skills[language].groups;
  const t = TITLE[language];
  return (
    <GlassCard span="xl" delay={0.05} className="skills-card">
      <p className="label">{t.label}</p>
      <p className="display skills-title">{t.title}</p>
      <div className="skills-grid">
        {groups.map((g) => (
          <div key={g.group} className="skills-group">
            <div className="italic-key skills-group-label">{g.group.toLowerCase()}</div>
            <div>
              {g.items.map((item) => (
                <span key={item} className="chip">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

export default SkillsSection;
