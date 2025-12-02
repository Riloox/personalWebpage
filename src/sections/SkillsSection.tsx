import { skills } from '../data/profile';

const SkillsSection = () => (
  <section className="dos-section" id="skills">
    <p className="dos-line">fprunell@portfolio:~/skills$ ls -1 groups</p>
    {skills.map((group) => (
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
