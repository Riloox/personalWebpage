import GithubStrip from '../components/GithubStrip';
import ProjectCard from '../components/ProjectCard';
import Reveal from '../components/Reveal';
import SectionHead from '../components/SectionHead';
import useTilt from '../hooks/useTilt';
import { faltaUno, projects, ui, type LanguageKey } from '../data/profile';

interface WorkSectionProps {
  language: LanguageKey;
  githubUsername: string;
  githubExcludeNames: string[];
}

const WorkSection = ({ language, githubUsername, githubExcludeNames }: WorkSectionProps) => {
  const t = ui[language];
  const featured = faltaUno[language];
  const rest = projects[language];
  const featuredTilt = useTilt<HTMLElement>(3);

  return (
    <section className="fl-section" id="work" aria-label={t.sections.work}>
      <div className="fl-shell">
        <SectionHead index="01" title={t.sections.work} sub={t.sections.workSub} />

        {/* Featured: Falta Uno */}
        <Reveal>
          <article
            ref={featuredTilt.ref}
            onPointerMove={featuredTilt.onPointerMove}
            onPointerLeave={featuredTilt.onPointerLeave}
            className="fl-featured fl-tilt fl-glass"
          >
            <span className="fl-featured-tag">{t.featured}</span>
            <div className="fl-featured-grid">
              <div>
                <h3 className="fl-featured-name">
                  <a href={featured.links.demo} target="_blank" rel="noreferrer">
                    {featured.name}
                  </a>
                </h3>
                <p className="fl-featured-tagline">{featured.tagline}</p>
                <p className="fl-featured-desc">{featured.description}</p>
                <ul className="fl-featured-features">
                  {featured.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <div className="fl-featured-actions">
                  <a
                    className="fl-btn fl-btn-primary"
                    href={featured.links.demo}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t.liveDemo} <span className="arrow">↗</span>
                  </a>
                  {featured.links.repo && (
                    <a
                      className="fl-btn fl-btn-ghost"
                      href={featured.links.repo}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t.sourceCode} <span className="arrow">↗</span>
                    </a>
                  )}
                </div>
              </div>
              <div>
                <div className="fl-stats">
                  {featured.stats.map((stat) => (
                    <div className="fl-stat" key={stat.label}>
                      <span className="fl-stat-value">{stat.value}</span>
                      <span className="fl-stat-label">{stat.label}</span>
                    </div>
                  ))}
                </div>
                <div className="fl-stack-row">
                  {featured.stack.map((item) => (
                    <span className="fl-chip" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </Reveal>

        {/* Cleta + RilooxDB */}
        <div className="fl-projects">
          {rest.map((project, i) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={i}
              labels={{ sourceCode: t.sourceCode, liveDemo: t.liveDemo, privateRepo: t.privateRepo }}
            />
          ))}
        </div>

        <GithubStrip
          username={githubUsername}
          language={language}
          excludeNames={githubExcludeNames}
          limit={6}
        />
      </div>
    </section>
  );
};

export default WorkSection;
