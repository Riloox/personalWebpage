import { certifications, type LanguageKey } from '../data/profile';
import Prompt from '../components/Prompt';

interface CertificationsSectionProps {
  language: LanguageKey;
}

const CertificationsSection = ({ language }: CertificationsSectionProps) => {
  const data = certifications[language];

  return (
    <section className="dos-section" id="certifications">
      <Prompt path="~/certs" cmd="ls -1" />
      <article className="dos-entry">
        <p>{data.certLabel}</p>
        <ul className="dos-list">
          {data.certs.map((cert) => (
            <li key={cert}>- {cert}</li>
          ))}
        </ul>
      </article>
      <article className="dos-entry">
        <p>{data.langLabel}</p>
        <ul className="dos-list inline">
          {data.languages.map((lang) => (
            <li key={lang.name}>
              - {lang.name} <span className="dos-muted">[{lang.level}]</span>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
};

export default CertificationsSection;
