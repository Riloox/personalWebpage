import GlassCard from './GlassCard';
import { useGithubProjects } from '../hooks/useGithubProjects';
import type { LanguageKey } from '../data/profile';

interface GithubStripProps {
  username: string;
  language: LanguageKey;
  excludeNames?: string[];
  limit?: number;
}

const LABELS: Record<LanguageKey, { header: string; loading: string; empty: string }> = {
  en: { header: 'More from GitHub', loading: 'fetching repos…', empty: 'no public repos' },
  es: { header: 'Más en GitHub', loading: 'cargando repos…', empty: 'sin repos públicos' },
};

const GithubStrip = ({ username, language, excludeNames = [], limit = 6 }: GithubStripProps) => {
  const { repos, loading, error } = useGithubProjects(username, { limit, excludeNames });
  const t = LABELS[language];

  if (error && repos.length === 0) return null;

  return (
    <GlassCard span="xl" className="section-block" hoverLift={false}>
      <h2 className="section-title">{t.header}</h2>
      {loading && repos.length === 0 ? (
        <p className="body body-muted">{t.loading}</p>
      ) : repos.length === 0 ? (
        <p className="github-empty">{t.empty}</p>
      ) : (
        <ul className="github-strip-cards">
          {repos.map((repo) => (
            <li key={repo.id}>
              <a
                className="github-strip-card"
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
              >
                <span className="gh-name">{repo.name}</span>
                {repo.description && <span className="gh-desc">{repo.description}</span>}
                <span className="gh-meta">
                  {repo.language && <span>{repo.language}</span>}
                  <span aria-label={`${repo.stargazers_count} stars`}>
                    ★ {repo.stargazers_count}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </GlassCard>
  );
};

export default GithubStrip;
