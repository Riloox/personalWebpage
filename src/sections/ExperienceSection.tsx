import Reveal from '../components/Reveal';
import SectionHead from '../components/SectionHead';
import { experience, ui, type LanguageKey } from '../data/profile';

interface ExperienceSectionProps {
  language: LanguageKey;
}

const ExperienceSection = ({ language }: ExperienceSectionProps) => {
  const t = ui[language];
  const items = experience[language];

  return (
    <section className="fl-section" id="experience" aria-label={t.sections.experience}>
      <div className="fl-shell">
        <SectionHead index="02" title={t.sections.experience} />
        <div className="fl-xp">
          {items.map((item) => (
            <Reveal key={`${item.company}-${item.role}`}>
              <article className="fl-xp-item">
                <h3 className="fl-xp-role">
                  {item.role} · <span className="fl-xp-company">{item.company}</span>
                </h3>
                <span className="fl-xp-duration">{item.duration}</span>
                <ul className="fl-xp-highlights">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
