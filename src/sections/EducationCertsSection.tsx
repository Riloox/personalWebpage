import { certifications, education, type LanguageKey } from '../data/profile';

interface EducationCertsSectionProps {
  language: LanguageKey;
}

const COPY: Record<LanguageKey, { label: string; title: string }> = {
  en: { label: 'Education & credentials', title: 'Where I studied' },
  es: { label: 'Educación y credenciales', title: 'Dónde estudié' },
};

const EducationCertsSection = ({ language }: EducationCertsSectionProps) => {
  const ed = education[language];
  const c = certifications[language];
  const t = COPY[language];
  return (
    <section className="ed-section">
      <p className="ed-eyebrow">{t.label}</p>
      <h2 className="ed-section-title">{t.title}</h2>

      <div className="ed-edu">
        {ed.map((e) => (
          <div key={e.school} className="ed-edu-row">
            <div className="ed-exp-meta">{e.duration}</div>
            <div className="ed-exp-body">
              <h3 className="ed-exp-role">{e.school}</h3>
              <p className="ed-edu-degree">{e.degree}</p>
            </div>
          </div>
        ))}
      </div>

      <dl className="ed-skills ed-credentials">
        <div className="ed-skill-row">
          <dt>{c.certLabel.toLowerCase()}</dt>
          <dd>{c.certs.join(', ')}</dd>
        </div>
        <div className="ed-skill-row">
          <dt>{c.langLabel.toLowerCase()}</dt>
          <dd>
            {c.languages.map((l, i) => (
              <span key={l.name}>
                {i > 0 && ' · '}
                {l.name} {l.level}
              </span>
            ))}
          </dd>
        </div>
      </dl>
    </section>
  );
};

export default EducationCertsSection;
