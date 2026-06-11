import type { LanguageKey } from '../data/profile';

interface ProjectLinksProps {
  language: LanguageKey;
  repo?: string;
  demo?: string;
  video?: string;
}

const LABELS: Record<LanguageKey, { repo: string; demo: string; video: string }> = {
  en: { repo: 'Repo', demo: 'Live', video: 'Video' },
  es: { repo: 'Código', demo: 'Demo', video: 'Video' },
};

const ProjectLinks = ({ language, repo, demo, video }: ProjectLinksProps) => {
  const t = LABELS[language];
  if (!repo && !demo && !video) return null;

  return (
    <div className="project-links">
      {repo && (
        <a className="project-link" href={repo} target="_blank" rel="noreferrer">
          {t.repo}
        </a>
      )}
      {demo && (
        <a className="project-link" href={demo} target="_blank" rel="noreferrer">
          {t.demo} ↗
        </a>
      )}
      {video && (
        <a className="project-link" href={video} target="_blank" rel="noreferrer">
          {t.video} ▶
        </a>
      )}
    </div>
  );
};

export default ProjectLinks;
