import { experience, type LanguageKey } from '../data/profile';

interface ExperienceSectionProps {
  language: LanguageKey;
}

const COPY: Record<LanguageKey, { label: string; title: string }> = {
  en: { label: 'Experience', title: 'Where I’ve worked' },
  es: { label: 'Experiencia', title: 'Dónde trabajé' },
};

const ExperienceSection = ({ language }: ExperienceSectionProps) => {
  const items = experience[language];
  const t = COPY[language];
  return (
    <section className="ed-section">
      <p className="ed-eyebrow">{t.label}</p>
      <h2 className="ed-section-title">{t.title}</h2>
      <ol className="ed-experience">
        {items.map((item) => (
          <li key={item.company + item.role} className="ed-exp">
            <div className="ed-exp-meta">{item.duration}</div>
            <div className="ed-exp-body">
              <h3 className="ed-exp-role">
                {item.role}{' '}
                <span className="ed-exp-company">· {item.company}</span>
              </h3>
              <ul className="ed-exp-points">
                {item.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default ExperienceSection;
