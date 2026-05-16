export type LanguageKey = 'en' | 'es';

export const cvFiles: Record<LanguageKey, string> = {
  en: '/cv.pdf',
  es: '/cv-es.pdf',
};

export const trustEarned: Record<
  LanguageKey,
  { label: string; display: string; sub: string }
> = {
  en: {
    label: 'Trust earned',
    display: "On Bantotal's newest project",
    sub: 'Picked by my supervisors despite being < 1 year in the company.',
  },
  es: {
    label: 'Confianza ganada',
    display: 'En el proyecto más nuevo de Bantotal',
    sub: 'Elegido por mis supervisores con menos de 1 año en la empresa.',
  },
};

export const heroContent: Record<
  LanguageKey,
  {
    name: string;
    title: string;
    currentRole: string;
    win: string;
    stack: string;
    summary: string;
  }
> = {
  en: {
    name: 'Federico Prunell',
    title: 'Backend Software Developer',
    currentRole: 'Software Dev Analyst @ Bantotal',
    win: '~20 % p95 latency cut on core banking',
    stack: 'Java · Python · SQL · AWS · GCP',
    summary:
      'Backend engineer with 1+ year at Bantotal building Java services for core banking. Shipped a ~20 % p95 latency reduction via I/O and caching, resolved 50+ production incidents, and graduated UTEC (with a semester at Karelia, Finland). Comfortable across Python, SQL, AWS and GCP. Open to backend or full-stack roles, remote-friendly.',
  },
  es: {
    name: 'Federico Prunell',
    title: 'Desarrollador Backend',
    currentRole: 'Analista de Desarrollo @ Bantotal',
    win: '~20 % menos latencia p95 en core bancario',
    stack: 'Java · Python · SQL · AWS · GCP',
    summary:
      'Ingeniero backend con más de 1 año en Bantotal desarrollando servicios Java para core bancario. Logré ~20 % menos de latencia p95 con optimización de E/S y caché, resolví más de 50 incidentes en producción, y soy egresado de UTEC (con un semestre en Karelia, Finlandia). Cómodo en Python, SQL, AWS y GCP. Abierto a roles backend o full-stack, modalidad remota.',
  },
};

export const skills: Record<
  LanguageKey,
  {
    primary: string[];
    groups: Array<{ group: string; items: string[] }>;
  }
> = {
  en: {
    primary: ['Java', 'Python', 'SQL', 'AWS', 'GCP', 'Docker', 'Linux', 'Git'],
    groups: [
      { group: 'Languages', items: ['Java', 'Python', 'SQL', 'TypeScript'] },
      { group: 'Backend', items: ['REST APIs', 'Node.js', 'Event-driven', 'Concurrency'] },
      { group: 'Frontend', items: ['React', 'React Native', 'HTML/CSS'] },
      { group: 'Cloud & DevOps', items: ['AWS', 'GCP', 'Docker', 'CI/CD', 'Linux'] },
      { group: 'Foundations', items: ['Data Structures', 'Algorithms', 'OOP', 'Complexity'] },
      { group: 'Quality', items: ['JUnit', 'PyTest', 'Observability', 'Code Reviews'] },
    ],
  },
  es: {
    primary: ['Java', 'Python', 'SQL', 'AWS', 'GCP', 'Docker', 'Linux', 'Git'],
    groups: [
      { group: 'Lenguajes', items: ['Java', 'Python', 'SQL', 'TypeScript'] },
      { group: 'Backend', items: ['APIs REST', 'Node.js', 'Event-driven', 'Concurrencia'] },
      { group: 'Frontend', items: ['React', 'React Native', 'HTML/CSS'] },
      { group: 'Cloud y DevOps', items: ['AWS', 'GCP', 'Docker', 'CI/CD', 'Linux'] },
      { group: 'Fundamentos', items: ['Estructuras de Datos', 'Algoritmos', 'POO', 'Complejidad'] },
      { group: 'Calidad', items: ['JUnit', 'PyTest', 'Observabilidad', 'Revisiones de Código'] },
    ],
  },
};

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
      duration: 'Apr 2025 - Present · Montevideo, Uruguay',
      highlights: [
        'Optimized Java backend services for core banking modules, cutting p95 latency ~20 % through I/O optimization and caching.',
        'Resolved 50+ production incidents via triage, improving system reliability and logging practices.',
        'Participated in peer code reviews and maintained documentation for system modules.',
      ],
    },
    {
      company: 'Karelia University of Applied Sciences',
      role: 'Exchange Program · Information Technology',
      duration: 'Aug 2023 - Dec 2023 · Joensuu, Finland',
      highlights: [
        'Semester of IT coursework focused on software engineering, networks and project work in English.',
        'Collaborated with international student teams on agile project assignments.',
      ],
    },
  ],
  es: [
    {
      company: 'Bantotal',
      role: 'Analista de Desarrollo de Software',
      duration: 'Abr 2025 - Presente · Montevideo, Uruguay',
      highlights: [
        'Optimización de servicios backend en Java para módulos de core bancario, reduciendo ~20 % la latencia p95 mediante optimización de E/S y caché.',
        'Resolución de más de 50 incidentes en producción mediante triage, mejorando la confiabilidad del sistema y las prácticas de logging.',
        'Participación en revisiones de código entre pares y mantenimiento de documentación de módulos del sistema.',
      ],
    },
    {
      company: 'Karelia University of Applied Sciences',
      role: 'Programa de Intercambio · Tecnologías de la Información',
      duration: 'Ago 2023 - Dic 2023 · Joensuu, Finlandia',
      highlights: [
        'Semestre de cursos de TI enfocados en ingeniería de software, redes y trabajo en proyectos, cursado en inglés.',
        'Colaboración con equipos internacionales en proyectos ágiles.',
      ],
    },
  ],
};

export interface ProjectLink {
  repo?: string;
  demo?: string;
  video?: string;
}

export const projects: Record<
  LanguageKey,
  Array<{
    name: string;
    stack: string;
    highlights: string[];
    links?: ProjectLink;
  }>
> = {
  en: [
    {
      name: 'Cleta — Shared Bike Management Platform',
      stack: 'TypeScript · React Native · Node.js · GCP',
      highlights: [
        'Final degree project: designed and built a full-stack shared mobility system with a mobile interface.',
        'Developed cross-platform features with React Native, integrating Google Maps and Firebase Auth.',
        'Implemented backend services on Google Cloud Run with PostgreSQL and automated CI/CD pipelines.',
      ],
      links: { video: 'https://www.youtube.com/watch?v=lo06qph9CIk' },
    },
    {
      name: 'RilooxDB',
      stack: 'Python · Data Engineering',
      highlights: [
        'In-memory key-value store with file-based persistence and data encryption.',
        'Custom storage logic for serialization and secure retrieval — no external DB dependencies.',
      ],
      links: { repo: 'https://github.com/Riloox/RilooxDB' },
    },
    {
      name: 'Windows 11 Debloater',
      stack: 'PowerShell · Automation',
      highlights: [
        'System utility that automates removal of bloatware and telemetry from Windows 11.',
        'Focused on OS-level optimization through scripted configuration changes.',
      ],
      links: { repo: 'https://github.com/Riloox/windows11debloater2024' },
    },
    {
      name: 'AFK Timeskip — Spigot Plugin',
      stack: 'Java · Spigot API · Minecraft 1.21',
      highlights: [
        'Event-driven plugin that detects AFK players and speeds up tick rate to fast-forward nights.',
        'Maintains server stability under tick-rate adjustments via careful event handling.',
      ],
      links: { repo: 'https://github.com/Riloox/AFK-Timeskip-for-SMP-1.21' },
    },
  ],
  es: [
    {
      name: 'Cleta — Plataforma de Bicicletas Compartidas',
      stack: 'TypeScript · React Native · Node.js · GCP',
      highlights: [
        'Proyecto final de grado: diseño e implementación de un sistema full-stack de movilidad compartida con interfaz móvil.',
        'Desarrollo de funcionalidades multiplataforma con React Native, integrando Google Maps y Firebase Auth.',
        'Servicios backend en Google Cloud Run con PostgreSQL y pipelines de CI/CD automatizados.',
      ],
      links: { video: 'https://www.youtube.com/watch?v=lo06qph9CIk' },
    },
    {
      name: 'RilooxDB',
      stack: 'Python · Ingeniería de Datos',
      highlights: [
        'Almacén clave-valor en memoria con persistencia basada en archivos y cifrado de datos.',
        'Lógica de almacenamiento propia para serialización y recuperación segura, sin dependencias externas de base de datos.',
      ],
      links: { repo: 'https://github.com/Riloox/RilooxDB' },
    },
    {
      name: 'Windows 11 Debloater',
      stack: 'PowerShell · Automatización',
      highlights: [
        'Utilidad que automatiza la eliminación de bloatware y telemetría en Windows 11.',
        'Enfocado en optimización a nivel de SO mediante scripts de configuración.',
      ],
      links: { repo: 'https://github.com/Riloox/windows11debloater2024' },
    },
    {
      name: 'AFK Timeskip — Plugin de Spigot',
      stack: 'Java · Spigot API · Minecraft 1.21',
      highlights: [
        'Plugin orientado a eventos que detecta jugadores AFK y acelera el tick-rate para avanzar la noche.',
        'Mantiene la estabilidad del servidor bajo cambios de tick-rate con manejo cuidadoso de eventos.',
      ],
      links: { repo: 'https://github.com/Riloox/AFK-Timeskip-for-SMP-1.21' },
    },
  ],
};

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
      duration: 'Graduated · Montevideo, Uruguay',
    },
  ],
  es: [
    {
      school: 'Universidad Tecnológica del Uruguay (UTEC)',
      degree: 'Licenciatura en Tecnologías de la Información',
      duration: 'Graduado · Montevideo, Uruguay',
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
    certLabel: 'CERTIFICATIONS',
    langLabel: 'LANGUAGES',
    certs: [
      'AWS Academy Cloud Foundations',
      'Google Cloud Computing Foundations',
      'Google Cloud Cybersecurity',
      'Kaggle: Machine Learning',
    ],
    languages: [
      { name: 'English', level: 'C2' },
      { name: 'Spanish', level: 'Native' },
    ],
  },
  es: {
    certLabel: 'CERTIFICACIONES',
    langLabel: 'IDIOMAS',
    certs: [
      'AWS Academy Cloud Foundations',
      'Google Cloud Computing Foundations',
      'Google Cloud Cybersecurity',
      'Kaggle: Machine Learning',
    ],
    languages: [
      { name: 'Inglés', level: 'C2' },
      { name: 'Español', level: 'Nativo' },
    ],
  },
};

export const contact: Record<
  LanguageKey,
  {
    emailLabel: string;
    email: string;
    blurb: string;
    responseTime: string;
    social: Array<{ label: string; url: string }>;
  }
> = {
  en: {
    emailLabel: 'Email',
    email: 'fprunell10@gmail.com',
    blurb: 'Best reached by email. Open to backend / full-stack roles, remote or Montevideo-based — happy to discuss take-home tests or live coding.',
    responseTime: 'usually reply within 24h',
    social: [
      { label: 'GitHub', url: 'https://github.com/Riloox' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/federico-prunell-36b684207' },
      { label: 'HackerRank', url: 'https://www.hackerrank.com/profile/fprunell10' },
    ],
  },
  es: {
    emailLabel: 'Correo',
    email: 'fprunell10@gmail.com',
    blurb: 'La mejor vía es el correo. Abierto a roles backend / full-stack, remoto o desde Montevideo — me adapto a pruebas técnicas o entrevistas en vivo.',
    responseTime: 'normalmente respondo en 24h',
    social: [
      { label: 'GitHub', url: 'https://github.com/Riloox' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/federico-prunell-36b684207' },
      { label: 'HackerRank', url: 'https://www.hackerrank.com/profile/fprunell10' },
    ],
  },
};
