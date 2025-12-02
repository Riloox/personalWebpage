import { heroContent } from '../data/profile';

const HeroSection = () => (
  <section className="dos-section" id="hero">
    <p className="dos-line">fprunell@portfolio:~/about$ cat about.md</p>
    <p>NAME: {heroContent.name}</p>
    <p>ROLE: {heroContent.title}</p>
    <p className="dos-highlight">{heroContent.summary}</p>
    <ul className="dos-list">
      <li>LOCATION: {heroContent.location}</li>
    </ul>
    <div className="dos-actions">
      <a className="dos-link" href={heroContent.cta.href}>
        {heroContent.cta.label.toUpperCase()}
      </a>
    </div>
  </section>
);

export default HeroSection;
