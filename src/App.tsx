import { useEffect, useState } from 'react';

import Backdrop from './components/Backdrop';
import Loader from './components/Loader';
import Nav from './components/Nav';
import ContactSection from './sections/ContactSection';
import EducationCertsSection from './sections/EducationCertsSection';
import ExperienceSection from './sections/ExperienceSection';
import HeroSection from './sections/HeroSection';
import SkillsSection from './sections/SkillsSection';
import WorkSection from './sections/WorkSection';
import type { LanguageKey } from './data/profile';

const GITHUB_USERNAME = 'Riloox';
// Repos already shown as curated projects — hide from the GitHub strip.
const CURATED_REPO_NAMES = ['picadito', 'RilooxDB', 'personalWebpage'];

const LANG_KEY = 'riloox-lang';

const readStoredLanguage = (): LanguageKey => {
  try {
    const stored = localStorage.getItem(LANG_KEY);
    if (stored === 'en' || stored === 'es') return stored;
  } catch {
    // storage unavailable
  }
  return navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en';
};

const App = () => {
  const [language, setLanguage] = useState<LanguageKey>(readStoredLanguage);

  useEffect(() => {
    try {
      localStorage.setItem(LANG_KEY, language);
    } catch {
      // storage unavailable
    }
    document.documentElement.lang = language;
  }, [language]);

  return (
    <>
      <Loader language={language} />
      <a className="fl-skip" href="#main-content">
        {language === 'es' ? 'Saltar al contenido' : 'Skip to content'}
      </a>
      <Backdrop />
      <Nav language={language} onLanguageChange={setLanguage} />
      <main id="main-content">
        <HeroSection language={language} />
        <WorkSection
          language={language}
          githubUsername={GITHUB_USERNAME}
          githubExcludeNames={CURATED_REPO_NAMES}
        />
        <ExperienceSection language={language} />
        <SkillsSection language={language} />
        <EducationCertsSection language={language} />
      </main>
      <ContactSection language={language} />
    </>
  );
};

export default App;
