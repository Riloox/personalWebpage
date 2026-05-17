import { useEffect, useState } from 'react';

export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
}

interface UseGithubProjectsResult {
  repos: GithubRepo[];
  loading: boolean;
  error: string | null;
}

interface CacheEntry {
  ts: number;
  repos: GithubRepo[];
}

const CACHE_TTL_MS = 60 * 60 * 1000;

const cacheKey = (username: string) => `gh-repos:${username}`;

const readCache = (username: string): GithubRepo[] | null => {
  if (typeof sessionStorage === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(cacheKey(username));
    if (!raw) return null;
    const parsed: CacheEntry = JSON.parse(raw);
    if (Date.now() - parsed.ts > CACHE_TTL_MS) return null;
    return parsed.repos;
  } catch {
    return null;
  }
};

const writeCache = (username: string, repos: GithubRepo[]) => {
  if (typeof sessionStorage === 'undefined') return;
  try {
    sessionStorage.setItem(cacheKey(username), JSON.stringify({ ts: Date.now(), repos }));
  } catch {
    // swallow quota errors
  }
};

export const useGithubProjects = (
  username: string,
  options: { limit?: number; excludeNames?: string[] } = {},
): UseGithubProjectsResult => {
  const { limit = 6, excludeNames = [] } = options;
  const [repos, setRepos] = useState<GithubRepo[]>(() => readCache(username) ?? []);
  const [loading, setLoading] = useState(repos.length === 0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cached = readCache(username);
    if (cached) {
      setRepos(cached);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`)
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub API ${res.status}`);
        return res.json();
      })
      .then((data: GithubRepo[]) => {
        if (cancelled) return;
        const filtered = data
          .filter((r: GithubRepo & { fork?: boolean; archived?: boolean; private?: boolean }) => {
            const meta = r as GithubRepo & { fork?: boolean; archived?: boolean; private?: boolean };
            return !meta.fork && !meta.archived && !meta.private;
          })
          .filter((r) => !excludeNames.includes(r.name))
          .sort((a, b) => b.stargazers_count - a.stargazers_count || b.updated_at.localeCompare(a.updated_at));
        writeCache(username, filtered);
        setRepos(filtered);
        setError(null);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : 'Unknown error');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [username, excludeNames.join('|')]);

  return { repos: repos.slice(0, limit), loading, error };
};
