import GlassCard from '../components/GlassCard';
import { certifications, education, type LanguageKey } from '../data/profile';

interface EducationCertsSectionProps {
  language: LanguageKey;
}

const TITLE: Record<LanguageKey, string> = {
  en: 'Education & credentials',
  es: 'Educación y credenciales',
};

const EducationCertsSection = ({ language }: EducationCertsSectionProps) => {
  const ed = education[language];
  const c = certifications[language];
  return (
    <GlassCard span="xl" className="section-block" hoverLift={false}>
      <h2 className="section-title">{TITLE[language]}</h2>
      <div className="eduCerts-grid">
        <div>
          {ed.map((e) => (
            <div key={e.school}>
              <h3 className="school-name">{e.school}</h3>
              <p className="school-degree">{e.degree}</p>
              <p className="school-meta">{e.duration}</p>
            </div>
          ))}
        </div>
        <div>
          <p className="label">{c.certLabel}</p>
          <ul className="cert-list">
            {c.certs.map((cert) => (
              <li key={cert}>{cert}</li>
            ))}
          </ul>
          <p className="lang-inline">
            <span className="lang-key">{c.langLabel.toLowerCase()}</span>
            {c.languages.map((l, i) => (
              <span key={l.name}>
                {i > 0 && ' · '}
                {l.name} {l.level}
              </span>
            ))}
          </p>
        </div>
      </div>
    </GlassCard>
  );
};

export default EducationCertsSection;
