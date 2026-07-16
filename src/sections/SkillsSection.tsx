import Reveal from '../components/Reveal';
import SectionHead from '../components/SectionHead';
import { skills, ui, type LanguageKey } from '../data/profile';

interface SkillsSectionProps {
  language: LanguageKey;
}

const SkillsSection = ({ language }: SkillsSectionProps) => {
  const t = ui[language];
  const data = skills[language];

  return (
    <section className="fl-section" id="skills" aria-label={t.sections.skills}>
      <div className="fl-shell">
        <SectionHead
          index="03"
          title={t.sections.skills}
          sub={
            language === 'es'
              ? 'Herramientas que usé en trabajo, estudio y proyectos.'
              : 'Tools I have used across work, study, and projects.'
          }
        />
        <div className="fl-skill-groups">
          {data.groups.map((group, i) => (
            <Reveal key={group.group} delay={i * 0.06}>
              <div className="fl-skill-group">
                <h3>{group.group}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
