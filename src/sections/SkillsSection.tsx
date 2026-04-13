import { skills, type LanguageKey } from '../data/profile';
import Prompt from '../components/Prompt';

interface SkillsSectionProps {
  language: LanguageKey;
}

const SkillsSection = ({ language }: SkillsSectionProps) => (
  <section className="dos-section" id="skills">
    <Prompt path="~/skills" cmd="ls -1 groups" />
    {skills[language].map((group) => (
      <article key={group.group} className="dos-entry">
        <p>{group.group.toUpperCase()}</p>
        <ul className="dos-list inline">
          {group.items.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </article>
    ))}
  </section>
);

export default SkillsSection;
