import { useGithubProjects } from '../hooks/useGithubProjects';
import { ui, type LanguageKey } from '../data/profile';
import Reveal from './Reveal';

interface GithubStripProps {
  username: string;
  language: LanguageKey;
  excludeNames?: string[];
  limit?: number;
}

const formatDate = (iso: string, language: LanguageKey) => {
  try {
    return new Date(iso).toLocaleDateString(language === 'en' ? 'en-US' : 'es-UY', {
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return '';
  }
};

const GithubStrip = ({ username, language, excludeNames, limit }: GithubStripProps) => {
  const t = ui[language];
  const { repos, loading, error } = useGithubProjects(username, { excludeNames, limit });

  if (loading || error || repos.length === 0) return null;

  return (
    <>
      <Reveal>
        <div className="fl-gh-head">
        <h3 className="fl-gh-title">{t.moreGithub}</h3>
        <span className="fl-gh-sub">{t.moreGithubSub}</span>
        <a
          className="fl-link fl-gh-all"
          href={`https://github.com/${username}?tab=repositories`}
          target="_blank"
          rel="noreferrer"
        >
            {t.viewAllGithub} <span className="arrow">↗</span>
          </a>
        </div>
      </Reveal>
      <div className="fl-gh-grid">
        {repos.map((repo, i) => (
          <Reveal key={repo.id} delay={i * 0.07} style={{ height: '100%' }}>
            <a
              className="fl-gh-card"
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              style={{ height: '100%' }}
            >
            <span className="fl-gh-name">
              {repo.name}
              <span className="arrow" aria-hidden="true">
                ↗
              </span>
            </span>
            {repo.description ? <span className="fl-gh-desc">{repo.description}</span> : null}
              <span className="fl-gh-meta">
                {repo.language ? <span className="lang">{repo.language}</span> : null}
                {repo.stargazers_count > 0 ? <span>★ {repo.stargazers_count}</span> : null}
                <span>
                  {t.updatedRepo} {formatDate(repo.updated_at, language)}
                </span>
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </>
  );
};

export default GithubStrip;
