import { type LanguageKey } from '../data/profile';
import useGithubProjects from '../hooks/useGithubProjects';

interface ProjectsSectionProps {
  language: LanguageKey;
}

const ProjectsSection = ({ language }: ProjectsSectionProps) => {
  const { repos, loading, error } = useGithubProjects('Riloox');

  const strings =
    language === 'es'
      ? {
          line: 'fprunell@portfolio:~/projects$ gh repo list Riloox --limit 6',
          loading: 'Conectando a GitHub... espera un momento.',
          errorPrefix: 'ERROR',
          noDescription: 'Sin descripción disponible.',
          updated: (date: string) => `ACTUALIZADO ${date}`,
        }
      : {
          line: 'fprunell@portfolio:~/projects$ gh repo list Riloox --limit 6',
          loading: 'Connecting to GitHub... please wait.',
          errorPrefix: 'ERROR',
          noDescription: 'No description provided.',
          updated: (date: string) => `UPDATED ${date}`,
        };

  return (
    <section className="dos-section" id="projects">
      <p className="dos-line">{strings.line}</p>
      {loading && <p className="dos-muted">{strings.loading}</p>}
      {error && (
        <p className="dos-highlight">
          {strings.errorPrefix}: {error}
        </p>
      )}
      {repos.map((repo) => (
        <article key={repo.id} className="dos-entry">
          <p>
            <a className="dos-link" href={repo.html_url} target="_blank" rel="noreferrer">
              {repo.name.toUpperCase()}
            </a>
          </p>
          <p className="dos-muted">{repo.description || strings.noDescription}</p>
          <ul className="dos-list inline">
            {repo.language && <li>[{repo.language}]</li>}
            <li>[★ {repo.stargazers_count}]</li>
            <li>[{strings.updated(new Date(repo.updated_at).toLocaleDateString())}]</li>
          </ul>
        </article>
      ))}
    </section>
  );
};

export default ProjectsSection;
