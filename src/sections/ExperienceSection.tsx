import GlassCard from '../components/GlassCard';
import { experience, type LanguageKey } from '../data/profile';

interface ExperienceSectionProps {
  language: LanguageKey;
}

const TITLE: Record<LanguageKey, string> = {
  en: 'Experience',
  es: 'Experiencia',
};

const ExperienceSection = ({ language }: ExperienceSectionProps) => {
  const items = experience[language];
  return (
    <GlassCard span="xl" className="section-block experience-block" hoverLift={false}>
      <h2 className="section-title">{TITLE[language]}</h2>
      <ul className="experience-list">
        {items.map((item) => (
          <li key={item.company + item.role} className="experience-item">
            <p className="exp-role">
              {item.company} · <span className="display-italic">{item.role}</span>
            </p>
            <p className="exp-meta">{item.duration}</p>
            <ul className="exp-highlights">
              {item.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </GlassCard>
  );
};

export default ExperienceSection;
