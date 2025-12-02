import { useEffect, useState } from 'react';

interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  fork: boolean;
}

interface GithubProjectsState {
  repos: GithubRepo[];
  loading: boolean;
  error: string | null;
}

const DEFAULT_ERROR = 'Unable to fetch GitHub repositories right now.';

const useGithubProjects = (username: string, limit = 6) => {
  const [state, setState] = useState<GithubProjectsState>({
    repos: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchProjects = async () => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
          headers: {
            Accept: 'application/vnd.github+json',
          },
        });

        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }

        const data: GithubRepo[] = await response.json();
        const filtered = data
          .filter((repo) => !repo.fork)
          .sort((a, b) => b.stargazers_count - a.stargazers_count || b.updated_at.localeCompare(a.updated_at))
          .slice(0, limit);

        if (isMounted) {
          setState({ repos: filtered, loading: false, error: null });
        }
      } catch (err) {
        if (isMounted) {
          setState({
            repos: [],
            loading: false,
            error: err instanceof Error ? err.message : DEFAULT_ERROR,
          });
        }
      }
    };

    fetchProjects();

    return () => {
      isMounted = false;
    };
  }, [username, limit]);

  return state;
};

export default useGithubProjects;
