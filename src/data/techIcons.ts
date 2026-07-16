// Maps a skill label -> Devicon class. Rendered in currentColor (acid green).
// Anything not listed falls back to a neutral marker so nothing renders as tofu.
const ICONS: Record<string, string> = {
  'java': 'devicon-java-plain',
  'typescript': 'devicon-typescript-plain',
  'python': 'devicon-python-plain',
  'javascript': 'devicon-javascript-plain',
  'node.js': 'devicon-nodejs-plain',
  'express': 'devicon-express-original',
  'react': 'devicon-react-original',
  'react native': 'devicon-react-original',
  'vite': 'devicon-vitejs-plain',
  'tailwind': 'devicon-tailwindcss-plain',
  'aws': 'devicon-amazonwebservices-plain-wordmark',
  'gcp': 'devicon-googlecloud-plain',
  'docker': 'devicon-docker-plain',
  'linux': 'devicon-linux-plain',
  'git': 'devicon-git-plain',
  'postgresql': 'devicon-postgresql-plain',
  'oracle sql': 'devicon-oracle-original',
  'supabase': 'devicon-supabase-plain',
  'sqlite': 'devicon-sqlite-plain',
  'junit': 'devicon-junit-plain',
  'pytest': 'devicon-pytest-plain',
};

export const iconFor = (label: string): string | null => ICONS[label.trim().toLowerCase()] ?? null;
