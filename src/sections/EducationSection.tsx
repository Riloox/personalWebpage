import { education, type LanguageKey } from '../data/profile';
import Prompt from '../components/Prompt';

interface EducationSectionProps {
  language: LanguageKey;
}

const EducationSection = ({ language }: EducationSectionProps) => (
  <section className="dos-section" id="education">
    <Prompt path="~/education" cmd="cat education.log" />
    {education[language].map((entry) => (
      <article key={entry.school} className="dos-entry">
        <p className="dos-muted">[{entry.duration}]</p>
        <p>
          <span className="dos-highlight">{entry.degree}</span> @ {entry.school}
        </p>
      </article>
    ))}
  </section>
);

export default EducationSection;
