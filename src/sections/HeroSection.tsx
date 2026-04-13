import { heroContent, type LanguageKey } from '../data/profile';
import Prompt from '../components/Prompt';

interface HeroSectionProps {
  language: LanguageKey;
}

const HeroSection = ({ language }: HeroSectionProps) => {
  const content = heroContent[language];
  const labels = {
    name: language === 'es' ? 'NOMBRE' : 'NAME',
    role: language === 'es' ? 'ROL' : 'ROLE',
    location: language === 'es' ? 'UBICACIÓN' : 'LOCATION',
  };

  return (
    <section className="dos-section" id="hero">
      <Prompt path="~/about" cmd="cat about.md" />
      <p>
        {labels.name}: {content.name}
      </p>
      <p>
        {labels.role}: {content.title}
      </p>
      <p className="dos-highlight">{content.summary}</p>
      <ul className="dos-list">
        <li>
          {labels.location}: {content.location}
        </li>
      </ul>
      <div className="dos-actions">
        <a className="dos-link" href={content.cta.href}>
          {content.cta.label.toUpperCase()}
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
