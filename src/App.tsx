import { useState } from 'react';

import BackgroundMesh from './components/BackgroundMesh';
import FloatingControls from './components/FloatingControls';
import GithubStrip from './components/GithubStrip';
import NowCard from './components/NowCard';
import StackCard from './components/StackCard';
import TrustCard from './components/TrustCard';
import ContactSection from './sections/ContactSection';
import EducationCertsSection from './sections/EducationCertsSection';
import ExperienceSection from './sections/ExperienceSection';
import HeroSection from './sections/HeroSection';
import ProjectsSection from './sections/ProjectsSection';
import SkillsSection from './sections/SkillsSection';
import { useTheme } from './hooks/useTheme';
import type { LanguageKey } from './data/profile';

const GITHUB_USERNAME = 'Riloox';
const CURATED_REPO_NAMES = [
  'RilooxDB',
  'windows11debloater2024',
  'AFK-Timeskip-for-SMP-1.21',
  'personalWebpage',
];

const App = () => {
  const [language, setLanguage] = useState<LanguageKey>('en');
  const { theme, setTheme } = useTheme();

  return (
    <>
      <BackgroundMesh />
      <FloatingControls
        language={language}
        onLanguageChange={setLanguage}
        theme={theme}
        onThemeChange={setTheme}
      />
      <main className="app-shell">
        <section className="bento">
          <HeroSection language={language} />
          <TrustCard language={language} delay={0.05} />
          <StackCard language={language} delay={0.10} />
          <ProjectsSection language={language} />
          <NowCard language={language} delay={0.20} />
          <SkillsSection language={language} />
        </section>
        <div className="below-bento">
          <ExperienceSection language={language} />
          <EducationCertsSection language={language} />
          <GithubStrip
            username={GITHUB_USERNAME}
            language={language}
            excludeNames={CURATED_REPO_NAMES}
            limit={6}
          />
          <ContactSection language={language} />
        </div>
      </main>
    </>
  );
};

export default App;
