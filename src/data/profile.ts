export type LanguageKey = 'en' | 'es';

export const cvFiles: Record<LanguageKey, string> = {
  en: `${import.meta.env.BASE_URL}cv.pdf`,
  es: `${import.meta.env.BASE_URL}cv-es.pdf`,
};

/* ------------------------------------------------------------------ */
/* UI strings                                                          */
/* ------------------------------------------------------------------ */

export const ui: Record<
  LanguageKey,
  {
    nav: { work: string; experience: string; skills: string; contact: string };
    available: string;
    scrollHint: string;
    sections: {
      work: string;
      workSub: string;
      experience: string;
      skills: string;
      education: string;
      contact: string;
    };
    featured: string;
    liveDemo: string;
    sourceCode: string;
    privateRepo: string;
    watchDemo: string;
    moreGithub: string;
    moreGithubSub: string;
    viewAllGithub: string;
    copyEmail: string;
    copied: string;
    downloadCv: string;
    emailMe: string;
    seeFaltaUno: string;
    letsTalk: string;
    footerNote: string;
    updatedRepo: string;
  }
> = {
  en: {
    nav: { work: 'Work', experience: 'Experience', skills: 'Skills', contact: 'Contact' },
    available: 'Open to remote work',
    scrollHint: 'scroll',
    sections: {
      work: 'Selected work',
      workSub: 'Shipped, tested, and live — not tutorial code.',
      experience: 'Experience',
      skills: 'Skills',
      education: 'Education & certs',
      contact: 'Contact',
    },
    featured: 'Featured project',
    liveDemo: 'Live demo',
    sourceCode: 'Source code',
    privateRepo: 'Private repo — built for UTEC',
    watchDemo: 'Watch demo',
    moreGithub: 'More on GitHub',
    moreGithubSub: 'Smaller experiments and utilities.',
    viewAllGithub: 'All repositories',
    copyEmail: 'Copy email',
    copied: 'Copied!',
    downloadCv: 'Download CV',
    emailMe: 'Email me',
    seeFaltaUno: 'See Falta Uno live',
    letsTalk: "Let's talk",
    footerNote: 'React · TypeScript · Vite',
    updatedRepo: 'updated',
  },
  es: {
    nav: { work: 'Proyectos', experience: 'Experiencia', skills: 'Skills', contact: 'Contacto' },
    available: 'Abierto a trabajo remoto',
    scrollHint: 'scroll',
    sections: {
      work: 'Proyectos destacados',
      workSub: 'Publicados, testeados y en producción — no código de tutorial.',
      experience: 'Experiencia',
      skills: 'Skills',
      education: 'Educación y certificaciones',
      contact: 'Contacto',
    },
    featured: 'Proyecto destacado',
    liveDemo: 'Demo en vivo',
    sourceCode: 'Código fuente',
    privateRepo: 'Repo privado — desarrollado para UTEC',
    watchDemo: 'Ver demo',
    moreGithub: 'Más en GitHub',
    moreGithubSub: 'Experimentos y utilidades más chicas.',
    viewAllGithub: 'Todos los repositorios',
    copyEmail: 'Copiar correo',
    copied: '¡Copiado!',
    downloadCv: 'Descargar CV',
    emailMe: 'Escribime',
    seeFaltaUno: 'Ver Falta Uno en vivo',
    letsTalk: 'Hablemos',
    footerNote: 'React · TypeScript · Vite',
    updatedRepo: 'actualizado',
  },
};

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export const heroContent: Record<
  LanguageKey,
  {
    kicker: string;
    firstName: string;
    lastName: string;
    summary: string;
    marquee: string[];
  }
> = {
  en: {
    kicker: 'Backend engineer — Montevideo, Uruguay · GMT-3',
    firstName: 'Federico',
    lastName: 'Prunell',
      summary:
        'Software Development Analyst at Bantotal, writing Java services for core banking. 50+ production incidents resolved. After hours I ship Falta Uno: a live React 19 + TypeScript + Express platform with a real ELO rating engine. English C2, remote-ready.',
    marquee: [
      'Java',
      'TypeScript',
      'React',
      'Node.js',
      'Express',
      'PostgreSQL',
      'Python',
      'SQL',
      'AWS',
      'GCP',
      'Docker',
      'Drizzle ORM',
    ],
  },
  es: {
    kicker: 'Ingeniero backend — Montevideo, Uruguay · GMT-3',
    firstName: 'Federico',
    lastName: 'Prunell',
      summary:
        'Analista de Desarrollo de Software en Bantotal, escribiendo servicios Java para core bancario. 50+ incidentes de producción resueltos. Fuera de hora desarrollo Falta Uno: una plataforma en producción con React 19 + TypeScript + Express y un motor de rating ELO real. Inglés C2, listo para remoto.',
    marquee: [
      'Java',
      'TypeScript',
      'React',
      'Node.js',
      'Express',
      'PostgreSQL',
      'Python',
      'SQL',
      'AWS',
      'GCP',
      'Docker',
      'Drizzle ORM',
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export interface ProjectLink {
  repo?: string;
  demo?: string;
  video?: string;
}

export interface FeaturedProject {
  name: string;
  tagline: string;
  description: string;
  stats: Array<{ value: string; label: string }>;
  features: string[];
  stack: string[];
  links: ProjectLink;
}

export const faltaUno: Record<LanguageKey, FeaturedProject> = {
  en: {
    name: 'Falta Uno',
    tagline: 'Pickup-football platform with a real rating engine',
    description:
      'A football pickup-match organizer for Uruguay & Argentina, live in production. Most sports apps are CRUD with a leaderboard — Falta Uno is an algorithmic backend: an ELO rating engine with placement matches and k-factor scaling, a team-balancing algorithm that respects friend groups, and a vote-consensus state machine that applies rating updates idempotently.',
    stats: [
      { value: '10.8k', label: 'lines of TypeScript' },
      { value: '123', label: 'conventional commits' },
      { value: '6', label: 'tested domains, unit + integration' },
      { value: '1', label: 'security audit — run, then fixed' },
    ],
    features: [
      'Full match lifecycle: create → join → play → vote result → ELO updates',
      'Team balancing by rating, friend-group aware, with manual override',
      'Vote-consensus result engine with idempotent ELO application',
      'Hardened: helmet, CORS, rate limiting, bcrypt, Supabase JWT auth',
    ],
    stack: ['React 19', 'TypeScript', 'Express', 'Drizzle ORM', 'PostgreSQL', 'Tailwind 4', 'Capacitor'],
    links: {
      demo: 'https://faltauno.onrender.com/',
    },
  },
  es: {
    name: 'Falta Uno',
    tagline: 'Plataforma de fútbol 5 con un motor de rating real',
    description:
      'Un organizador de partidos de fútbol para Uruguay y Argentina, en producción. La mayoría de las apps deportivas son CRUD con una tabla de posiciones — Falta Uno es un backend algorítmico: un motor de rating ELO con partidos de colocación y k-factor escalado, un algoritmo de balanceo de equipos que respeta grupos de amigos, y una máquina de estados de consenso por votos que aplica los cambios de rating de forma idempotente.',
    stats: [
      { value: '10.8k', label: 'líneas de TypeScript' },
      { value: '123', label: 'commits convencionales' },
      { value: '6', label: 'dominios testeados, unit + integración' },
      { value: '1', label: 'auditoría de seguridad — hecha y corregida' },
    ],
    features: [
      'Ciclo completo del partido: crear → unirse → jugar → votar resultado → ELO',
      'Balanceo de equipos por rating, consciente de grupos de amigos, con override manual',
      'Motor de resultados por consenso de votos con aplicación idempotente de ELO',
      'Endurecido: helmet, CORS, rate limiting, bcrypt, auth JWT con Supabase',
    ],
    stack: ['React 19', 'TypeScript', 'Express', 'Drizzle ORM', 'PostgreSQL', 'Tailwind 4', 'Capacitor'],
    links: {
      demo: 'https://faltauno.onrender.com/',
    },
  },
};

export interface Project {
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  stack: string[];
  links?: ProjectLink;
  privateRepo?: boolean;
}

export const projects: Record<LanguageKey, Project[]> = {
  en: [
    {
      name: 'Cleta',
      tagline: 'Campus bike-sharing platform',
      description:
        'Capstone project: a free bicycle-lending system for the UTEC Fray Bentos campus — mobile app, web admin panel, and a backend integrating Allegion smart locks over BLE. Built by a team of three over 16 weeks of Scrum.',
      highlights: [
        'Owned backend architecture, API design, PostgreSQL schema, and security',
        'Google OAuth 2.0 + revocable JWTs, RBAC with ownership checks',
        'Encryption at rest & in transit, audit logging, CI/CD on Google Cloud',
      ],
      stack: ['React Native', 'TypeScript', 'Node.js', 'PostgreSQL', 'GCP', 'Docker'],
      links: { video: 'https://www.youtube.com/watch?v=lo06qph9CIk' },
      privateRepo: true,
    },
    {
      name: 'RilooxDB',
      tagline: 'An encrypted key-value store, from scratch',
      description:
        'A small database built in Python to learn the primitives real databases hide: in-memory indexing, file persistence, JSON serialization, and AES-128 encryption via Fernet. Every write encrypts and persists the full store; a resilient CLI drives CRUD.',
      highlights: [
        'Symmetric encryption with key generation and InvalidToken handling',
        'Deliberate limitations documented — built to understand trade-offs',
      ],
      stack: ['Python', 'cryptography (Fernet)', 'File I/O'],
      links: { repo: 'https://github.com/Riloox/RilooxDB' },
    },
  ],
  es: [
    {
      name: 'Cleta',
      tagline: 'Plataforma de bicicletas compartidas',
      description:
        'Proyecto final de grado: un sistema gratuito de préstamo de bicicletas para el campus de UTEC Fray Bentos — app móvil, panel web de administración y un backend que integra candados inteligentes Allegion por BLE. Construido por un equipo de tres en 16 semanas de Scrum.',
      highlights: [
        'Responsable de la arquitectura backend, diseño de API, esquema PostgreSQL y seguridad',
        'Google OAuth 2.0 + JWTs revocables, RBAC con chequeos de propiedad',
        'Cifrado en reposo y en tránsito, audit logging, CI/CD en Google Cloud',
      ],
      stack: ['React Native', 'TypeScript', 'Node.js', 'PostgreSQL', 'GCP', 'Docker'],
      links: { video: 'https://www.youtube.com/watch?v=lo06qph9CIk' },
      privateRepo: true,
    },
    {
      name: 'RilooxDB',
      tagline: 'Un almacén clave-valor cifrado, desde cero',
      description:
        'Una pequeña base de datos construida en Python para aprender las primitivas que las bases de datos reales esconden: indexación en memoria, persistencia en archivos, serialización JSON y cifrado AES-128 vía Fernet. Cada escritura cifra y persiste el store completo; una CLI resiliente maneja el CRUD.',
      highlights: [
        'Cifrado simétrico con generación de claves y manejo de InvalidToken',
        'Limitaciones deliberadas y documentadas — construido para entender trade-offs',
      ],
      stack: ['Python', 'cryptography (Fernet)', 'File I/O'],
      links: { repo: 'https://github.com/Riloox/RilooxDB' },
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

export const experience: Record<
  LanguageKey,
  Array<{
    company: string;
    role: string;
    duration: string;
    highlights: string[];
  }>
> = {
  en: [
    {
      company: 'Bantotal',
      role: 'Software Development Analyst',
      duration: 'Apr 2025 — Present · Montevideo, Uruguay',
      highlights: [
        'Resolved 50+ production incidents via triage, improving system reliability and logging practices.',
        'Picked for the company’s newest project by supervisors at under one year in the role.',
      ],
    },
  ],
  es: [
    {
      company: 'Bantotal',
      role: 'Analista de Desarrollo de Software',
      duration: 'Abr 2025 — Presente · Montevideo, Uruguay',
      highlights: [
        'Resolución de más de 50 incidentes en producción mediante triage, mejorando la confiabilidad del sistema y las prácticas de logging.',
        'Elegido por mis supervisores para el proyecto más nuevo de la empresa con menos de un año en el rol.',
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */

export const skills: Record<
  LanguageKey,
  {
    primary: string[];
    groups: Array<{ group: string; items: string[] }>;
  }
> = {
  en: {
    primary: ['Java', 'TypeScript', 'Python', 'SQL', 'React', 'Node.js', 'AWS', 'GCP'],
    groups: [
      { group: 'Languages', items: ['Java', 'TypeScript', 'Python', 'SQL', 'JavaScript'] },
      { group: 'Backend', items: ['Node.js', 'Express', 'REST APIs', 'Drizzle ORM', 'Event-driven', 'Concurrency'] },
      { group: 'Frontend', items: ['React', 'React Native', 'Vite', 'Tailwind'] },
      { group: 'Cloud & DevOps', items: ['AWS', 'GCP', 'Docker', 'CI/CD', 'Linux', 'Git'] },
      { group: 'Data', items: ['PostgreSQL', 'Oracle SQL', 'Supabase', 'SQLite'] },
      { group: 'Quality', items: ['JUnit', 'PyTest', 'Integration tests', 'Code reviews', 'Security audits'] },
    ],
  },
  es: {
    primary: ['Java', 'TypeScript', 'Python', 'SQL', 'React', 'Node.js', 'AWS', 'GCP'],
    groups: [
      { group: 'Lenguajes', items: ['Java', 'TypeScript', 'Python', 'SQL', 'JavaScript'] },
      { group: 'Backend', items: ['Node.js', 'Express', 'APIs REST', 'Drizzle ORM', 'Event-driven', 'Concurrencia'] },
      { group: 'Frontend', items: ['React', 'React Native', 'Vite', 'Tailwind'] },
      { group: 'Cloud y DevOps', items: ['AWS', 'GCP', 'Docker', 'CI/CD', 'Linux', 'Git'] },
      { group: 'Datos', items: ['PostgreSQL', 'Oracle SQL', 'Supabase', 'SQLite'] },
      { group: 'Calidad', items: ['JUnit', 'PyTest', 'Tests de integración', 'Code reviews', 'Auditorías de seguridad'] },
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Education & certifications                                          */
/* ------------------------------------------------------------------ */

export const education: Record<
  LanguageKey,
  Array<{
    school: string;
    degree: string;
    duration: string;
  }>
> = {
  en: [
    {
      school: 'Technological University of Uruguay (UTEC)',
      degree: 'B.Sc. in Information Technology',
      duration: 'Graduated 2025 · Montevideo, Uruguay',
    },
    {
      school: 'Karelia University of Applied Sciences',
      degree: 'Exchange Program · Information Technology',
      duration: 'Aug 2023 — Dec 2023 · Joensuu, Finland',
    },
  ],
  es: [
    {
      school: 'Universidad Tecnológica del Uruguay (UTEC)',
      degree: 'Licenciatura en Tecnologías de la Información',
      duration: 'Graduado 2025 · Montevideo, Uruguay',
    },
    {
      school: 'Karelia University of Applied Sciences',
      degree: 'Programa de Intercambio · Tecnologías de la Información',
      duration: 'Ago 2023 — Dic 2023 · Joensuu, Finlandia',
    },
  ],
};

export const certifications: Record<
  LanguageKey,
  {
    certLabel: string;
    langLabel: string;
    certs: string[];
    languages: Array<{ name: string; level: string }>;
  }
> = {
  en: {
    certLabel: 'Certifications',
    langLabel: 'Languages',
    certs: [
      'AWS Academy Cloud Foundations',
      'Google Cloud Computing',
      'Google Cloud Cybersecurity',
      'Kaggle: Machine Learning',
    ],
    languages: [
      { name: 'English', level: 'C2' },
      { name: 'Spanish', level: 'Native' },
    ],
  },
  es: {
    certLabel: 'Certificaciones',
    langLabel: 'Idiomas',
    certs: [
      'AWS Academy Cloud Foundations',
      'Google Cloud Computing',
      'Google Cloud Cybersecurity',
      'Kaggle: Machine Learning',
    ],
    languages: [
      { name: 'Inglés', level: 'C2' },
      { name: 'Español', level: 'Nativo' },
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

export const contact: Record<
  LanguageKey,
  {
    email: string;
    blurb: string;
    responseTime: string;
    social: Array<{ label: string; url: string }>;
  }
> = {
  en: {
    email: 'fprunell10@gmail.com',
    blurb:
      'Open to backend / full-stack roles, remote or Montevideo-based.',
    responseTime: 'Usually replies within 24h',
    social: [
      { label: 'GitHub', url: 'https://github.com/Riloox' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/federico-prunell-36b684207' },
      { label: 'HackerRank', url: 'https://www.hackerrank.com/profile/fprunell10' },
    ],
  },
  es: {
    email: 'fprunell10@gmail.com',
    blurb:
      'Abierto a roles backend / full-stack, remoto o desde Montevideo.',
    responseTime: 'Normalmente respondo en 24h',
    social: [
      { label: 'GitHub', url: 'https://github.com/Riloox' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/federico-prunell-36b684207' },
      { label: 'HackerRank', url: 'https://www.hackerrank.com/profile/fprunell10' },
    ],
  },
};
