import { experience, type LanguageKey } from '../data/profile';
import Prompt from '../components/Prompt';

interface ExperienceSectionProps {
  language: LanguageKey;
}

const ExperienceSection = ({ language }: ExperienceSectionProps) => (
  <section className="dos-section" id="experience">
    <Prompt path="~/experience" cmd="tail -n 20 history.log" />
    {experience[language].map((role) => (
      <article key={role.company} className="dos-entry">
        <p className="dos-muted">[{role.duration}]</p>
        <p>
          <span className="dos-highlight">{role.role}</span> @ {role.company}
        </p>
        <ul className="dos-list">
          {role.highlights.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </article>
    ))}
  </section>
);

export default ExperienceSection;
