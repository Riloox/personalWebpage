import GlassCard from './GlassCard';
import ProjectLinks from './ProjectLinks';
import type { LanguageKey, ProjectLink } from '../data/profile';

interface Project {
  name: string;
  stack: string;
  highlights: string[];
  links?: ProjectLink;
}

interface ProjectCardProps {
  project: Project;
  language: LanguageKey;
  delay?: number;
}

const PROJECT_LABEL: Record<LanguageKey, string> = {
  en: 'Project',
  es: 'Proyecto',
};

const ProjectCard = ({ project, language, delay = 0 }: ProjectCardProps) => {
  return (
    <GlassCard span="sm" delay={delay} className="project-card">
      <p className="label">{PROJECT_LABEL[language]}</p>
      <h3 className="project-name">{project.name}</h3>
      <p className="project-stack">{project.stack}</p>
      <ul className="project-highlights">
        {project.highlights.slice(0, 2).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {project.links && (
        <ProjectLinks
          language={language}
          repo={project.links.repo}
          demo={project.links.demo}
          video={project.links.video}
        />
      )}
    </GlassCard>
  );
};

export default ProjectCard;
