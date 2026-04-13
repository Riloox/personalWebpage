import { projects, type LanguageKey } from '../data/profile';
import Prompt from '../components/Prompt';

interface ProjectsSectionProps {
  language: LanguageKey;
}

const ProjectsSection = ({ language }: ProjectsSectionProps) => (
  <section className="dos-section" id="projects">
    <Prompt path="~/projects" cmd="cat projects.md" />
    {projects[language].map((project) => (
      <article key={project.name} className="dos-entry">
        <p>
          <span className="dos-highlight">{project.name}</span>
        </p>
        <p className="dos-muted">[{project.stack}]</p>
        <ul className="dos-list">
          {project.highlights.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </article>
    ))}
  </section>
);

export default ProjectsSection;
