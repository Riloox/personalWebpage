import { skills, type LanguageKey } from '../data/profile';

interface SkillsSectionProps {
  language: LanguageKey;
}

const COPY: Record<LanguageKey, { label: string; title: string }> = {
  en: { label: 'Skills', title: 'What I reach for' },
  es: { label: 'Habilidades', title: 'Con lo que trabajo' },
};

const SkillsSection = ({ language }: SkillsSectionProps) => {
  const groups = skills[language].groups;
  const t = COPY[language];
  return (
    <section className="ed-section">
      <p className="ed-eyebrow">{t.label}</p>
      <h2 className="ed-section-title">{t.title}</h2>
      <dl className="ed-skills">
        {groups.map((g) => (
          <div key={g.group} className="ed-skill-row">
            <dt>{g.group}</dt>
            <dd>{g.items.join(', ')}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default SkillsSection;
