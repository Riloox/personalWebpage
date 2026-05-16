import CletaCard from '../components/CletaCard';
import ProjectCard from '../components/ProjectCard';
import { projects, type LanguageKey } from '../data/profile';

interface ProjectsSectionProps {
  language: LanguageKey;
}

const ProjectsSection = ({ language }: ProjectsSectionProps) => {
  const items = projects[language];
  const [cleta, ...rest] = items;
  return (
    <>
      <CletaCard
        name={cleta.name}
        stack={cleta.stack}
        links={cleta.links}
        delay={0.1}
      />
      {rest.slice(0, 3).map((project, i) => (
        <ProjectCard
          key={project.name}
          project={project}
          language={language}
          delay={0.15 + i * 0.05}
        />
      ))}
    </>
  );
};

export default ProjectsSection;
