import Reveal from '../components/Reveal';
import SectionHead from '../components/SectionHead';
import { certifications, education, ui, type LanguageKey } from '../data/profile';

interface EducationCertsSectionProps {
  language: LanguageKey;
}

const EducationCertsSection = ({ language }: EducationCertsSectionProps) => {
  const t = ui[language];
  const schools = education[language];
  const certs = certifications[language];

  return (
    <section className="fl-section" id="education" aria-label={t.sections.education}>
      <div className="fl-shell">
        <SectionHead index="04" title={t.sections.education} />
        <div className="fl-edu-grid">
          {schools.map((school, i) => (
            <Reveal key={school.school} delay={i * 0.1} style={{ height: '100%' }}>
              <article className="fl-edu-card" style={{ height: '100%' }}>
                <h3 className="fl-edu-school">{school.school}</h3>
                <p className="fl-edu-degree">{school.degree}</p>
                <span className="fl-edu-duration">{school.duration}</span>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="fl-certs">
          <Reveal delay={0.1}>
            <h3>{certs.certLabel}</h3>
            <ul>
              {certs.certs.map((cert) => (
                <li key={cert}>{cert}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.18}>
            <h3>{certs.langLabel}</h3>
            <ul>
              {certs.languages.map((lang) => (
                <li key={lang.name}>
                  {lang.name} <span className="fl-lang-level">{lang.level}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default EducationCertsSection;
