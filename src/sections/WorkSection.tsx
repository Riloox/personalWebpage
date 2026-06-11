import GithubStrip from '../components/GithubStrip';
import Reveal from '../components/Reveal';
import SectionHead from '../components/SectionHead';
import YoutubeEmbed from '../components/YoutubeEmbed';
import { picadito, projects, ui, type LanguageKey } from '../data/profile';

interface WorkSectionProps {
  language: LanguageKey;
  githubUsername: string;
  githubExcludeNames: string[];
}

const WorkSection = ({ language, githubUsername, githubExcludeNames }: WorkSectionProps) => {
  const t = ui[language];
  const featured = picadito[language];
  const rest = projects[language];

  return (
    <section className="fl-section" id="work" aria-label={t.sections.work}>
      <div className="fl-shell">
        <SectionHead index="01" title={t.sections.work} sub={t.sections.workSub} />

        {/* Featured: Picadito */}
        <Reveal>
          <article className="fl-featured">
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
                  <a
                    className="fl-btn fl-btn-ghost"
                    href={featured.links.repo}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t.sourceCode} <span className="arrow">↗</span>
                  </a>
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
            <Reveal key={project.name} delay={i * 0.12} style={{ height: '100%' }}>
              <article className="fl-project" style={{ height: '100%' }}>
                <h3 className="fl-project-name">{project.name}</h3>
                <p className="fl-project-tagline">{project.tagline}</p>
                <p className="fl-project-desc">{project.description}</p>
                <ul className="fl-project-highlights">
                  {project.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                {project.links?.video ? (
                  <YoutubeEmbed url={project.links.video} title={`${project.name} demo`} />
                ) : null}
                <div className="fl-project-footer">
                  <div className="fl-stack-row" style={{ marginTop: 0 }}>
                    {project.stack.map((item) => (
                      <span className="fl-chip" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="fl-project-links">
                    {project.links?.repo ? (
                      <a className="fl-link" href={project.links.repo} target="_blank" rel="noreferrer">
                        {t.sourceCode} <span className="arrow">↗</span>
                      </a>
                    ) : null}
                    {project.links?.demo ? (
                      <a className="fl-link" href={project.links.demo} target="_blank" rel="noreferrer">
                        {t.liveDemo} <span className="arrow">↗</span>
                      </a>
                    ) : null}
                    {project.privateRepo ? (
                      <span className="fl-private-note">{t.privateRepo}</span>
                    ) : null}
                  </div>
                </div>
              </article>
            </Reveal>
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
