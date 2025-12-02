import useGithubProjects from '../hooks/useGithubProjects';

const ProjectsSection = () => {
  const { repos, loading, error } = useGithubProjects('Riloox');

  return (
    <section className="dos-section" id="projects">
      <p className="dos-line">fprunell@portfolio:~/projects$ gh repo list Riloox --limit 6</p>
      {loading && <p className="dos-muted">Connecting to GitHub... please wait.</p>}
      {error && <p className="dos-highlight">ERROR: {error}</p>}
      {repos.map((repo) => (
        <article key={repo.id} className="dos-entry">
          <p>
            <a className="dos-link" href={repo.html_url} target="_blank" rel="noreferrer">
              {repo.name.toUpperCase()}
            </a>
          </p>
          <p className="dos-muted">{repo.description || 'No description provided.'}</p>
          <ul className="dos-list inline">
            {repo.language && <li>[{repo.language}]</li>}
            <li>[★ {repo.stargazers_count}]</li>
            <li>[UPDATED {new Date(repo.updated_at).toLocaleDateString()}]</li>
          </ul>
        </article>
      ))}
    </section>
  );
};

export default ProjectsSection;
