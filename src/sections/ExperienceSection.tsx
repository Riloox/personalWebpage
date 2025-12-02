import { experience, type LanguageKey } from '../data/profile';

interface ExperienceSectionProps {
  language: LanguageKey;
}

const ExperienceSection = ({ language }: ExperienceSectionProps) => (
  <section className="dos-section" id="experience">
    <p className="dos-line">fprunell@portfolio:~/experience$ tail -n 20 history.log</p>
    {experience[language].map((role) => (
      <article key={role.company} className="dos-entry">
        <p>
          {role.duration} :: {role.role} @ {role.company}
        </p>
        <p className="dos-muted">{role.summary}</p>
      </article>
    ))}
  </section>
);

export default ExperienceSection;
