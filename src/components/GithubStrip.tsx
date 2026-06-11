import { useGithubProjects } from '../hooks/useGithubProjects';
import type { LanguageKey } from '../data/profile';

interface GithubStripProps {
  username: string;
  language: LanguageKey;
  excludeNames?: string[];
  limit?: number;
}

const COPY: Record<
  LanguageKey,
  { label: string; title: string; loading: string; empty: string }
> = {
  en: {
    label: 'Open source',
    title: 'More from GitHub',
    loading: 'fetching repos…',
    empty: 'no public repos',
  },
  es: {
    label: 'Código abierto',
    title: 'Más en GitHub',
    loading: 'cargando repos…',
    empty: 'sin repos públicos',
  },
};

const GithubStrip = ({ username, language, excludeNames = [], limit = 6 }: GithubStripProps) => {
  const { repos, loading, error } = useGithubProjects(username, { limit, excludeNames });
  const t = COPY[language];

  if (error && repos.length === 0) return null;

  return (
    <section className="ed-section">
      <p className="ed-eyebrow">{t.label}</p>
      <h2 className="ed-section-title">{t.title}</h2>

      {loading && repos.length === 0 ? (
        <p className="ed-summary">{t.loading}</p>
      ) : repos.length === 0 ? (
        <p className="ed-summary">{t.empty}</p>
      ) : (
        <ul className="ed-repos">
          {repos.map((repo) => (
            <li key={repo.id} className="ed-repo">
              <a className="ed-repo-link" href={repo.html_url} target="_blank" rel="noreferrer">
                <span className="ed-repo-name">{repo.name}</span>
                <span className="ed-repo-stars">★ {repo.stargazers_count}</span>
              </a>
              {repo.description && <p className="ed-repo-desc">{repo.description}</p>}
              {repo.language && <p className="ed-repo-lang">{repo.language}</p>}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default GithubStrip;
