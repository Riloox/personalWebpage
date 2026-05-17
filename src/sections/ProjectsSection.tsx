import YoutubeEmbed from '../components/YoutubeEmbed';
import { projects, type LanguageKey } from '../data/profile';

interface ProjectsSectionProps {
  language: LanguageKey;
}

const COPY: Record<
  LanguageKey,
  {
    label: string;
    title: string;
    featured: string;
    more: string;
    repo: string;
    demo: string;
    video: string;
  }
> = {
  en: {
    label: 'Selected work',
    title: 'Things I built',
    featured: 'Featured project',
    more: 'Other work',
    repo: 'repo',
    demo: 'live',
    video: 'video',
  },
  es: {
    label: 'Trabajos seleccionados',
    title: 'Cosas que construí',
    featured: 'Proyecto destacado',
    more: 'Otros trabajos',
    repo: 'código',
    demo: 'demo',
    video: 'video',
  },
};

const ProjectsSection = ({ language }: ProjectsSectionProps) => {
  const items = projects[language];
  const [cleta, ...rest] = items;
  const t = COPY[language];

  return (
    <section className="ed-section">
      <p className="ed-eyebrow">{t.label}</p>
      <h2 className="ed-section-title">{t.title}</h2>

      {/* Featured: Cleta */}
      <article className="ed-feature">
        <p className="ed-feature-eyebrow">{t.featured}</p>
        <h3 className="ed-feature-name">{cleta.name}</h3>
        <p className="ed-feature-stack">{cleta.stack}</p>

        {cleta.links?.video && (
          <div className="ed-feature-video">
            <YoutubeEmbed url={cleta.links.video} title={cleta.name} />
          </div>
        )}

        <ul className="ed-feature-points">
          {cleta.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>

        {cleta.links && (
          <p className="ed-project-links ed-feature-links">
            {cleta.links.repo && (
              <a href={cleta.links.repo} target="_blank" rel="noreferrer">
                {t.repo} ↗
              </a>
            )}
            {cleta.links.demo && (
              <a href={cleta.links.demo} target="_blank" rel="noreferrer">
                {t.demo} ↗
              </a>
            )}
            {cleta.links.video && (
              <a href={cleta.links.video} target="_blank" rel="noreferrer">
                {t.video} ↗
              </a>
            )}
          </p>
        )}
      </article>

      <p className="ed-eyebrow ed-more-eyebrow">{t.more}</p>
      <ol className="ed-projects">
        {rest.map((project, i) => (
          <li key={project.name} className="ed-project">
            <div className="ed-project-index">
              {String(i + 1).padStart(2, '0')}
            </div>
            <div className="ed-project-body">
              <h3 className="ed-project-name">{project.name}</h3>
              <p className="ed-project-stack">{project.stack}</p>
              {project.highlights[0] && (
                <p className="ed-project-blurb">{project.highlights[0]}</p>
              )}
              {project.links && (
                <p className="ed-project-links">
                  {project.links.repo && (
                    <a href={project.links.repo} target="_blank" rel="noreferrer">
                      {t.repo} ↗
                    </a>
                  )}
                  {project.links.demo && (
                    <a href={project.links.demo} target="_blank" rel="noreferrer">
                      {t.demo} ↗
                    </a>
                  )}
                  {project.links.video && (
                    <a href={project.links.video} target="_blank" rel="noreferrer">
                      {t.video} ↗
                    </a>
                  )}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default ProjectsSection;
