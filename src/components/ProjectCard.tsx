import Reveal from './Reveal';
import YoutubeEmbed from './YoutubeEmbed';
import useTilt from '../hooks/useTilt';
import type { Project } from '../data/profile';

interface ProjectCardProps {
  project: Project;
  index: number;
  labels: {
    sourceCode: string;
    liveDemo: string;
    privateRepo: string;
  };
}

/** A single curated-project card with cursor-spotlight tilt. */
const ProjectCard = ({ project, index, labels }: ProjectCardProps) => {
  const tilt = useTilt<HTMLElement>(4);

  return (
    <Reveal delay={index * 0.12} style={{ height: '100%' }}>
      <article
        ref={tilt.ref}
        onPointerMove={tilt.onPointerMove}
        onPointerLeave={tilt.onPointerLeave}
        className="fl-project fl-tilt"
        style={{ height: '100%' }}
      >
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
                {labels.sourceCode} <span className="arrow">↗</span>
              </a>
            ) : null}
            {project.links?.demo ? (
              <a className="fl-link" href={project.links.demo} target="_blank" rel="noreferrer">
                {labels.liveDemo} <span className="arrow">↗</span>
              </a>
            ) : null}
            {project.privateRepo ? <span className="fl-private-note">{labels.privateRepo}</span> : null}
          </div>
        </div>
      </article>
    </Reveal>
  );
};

export default ProjectCard;
