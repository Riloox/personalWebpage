export type LanguageKey = 'en' | 'es';

export const heroContent: Record<
  LanguageKey,
  {
    name: string;
    title: string;
    summary: string;
    location: string;
    cta: { label: string; href: string };
  }
> = {
  en: {
    name: 'Federico Prunell',
    title: 'Software Development Analyst',
    summary:
      'Bachelor in Information Technologies and backend-focused engineer building Java/Python services, gameplay tooling, and automation utilities. Focused on backend reliability and automation, ready to contribute as a junior software developer.',
    location: 'Montevideo, Uruguay',
    cta: {
      label: 'Open contact',
      href: '#contact',
    },
  },
  es: {
    name: 'Federico Prunell',
    title: 'Analista de Desarrollo de Software',
    summary:
      'Licenciado en Tecnologías de la Información y desarrollador backend que crea servicios en Java/Python, herramientas de juego y utilidades de automatización. Enfocado en confiabilidad y automatización, listo para aportar como desarrollador de software junior.',
    location: 'Montevideo, Uruguay',
    cta: {
      label: 'Abrir contacto',
      href: '#contact',
    },
  },
};

export const skills: Record<
  LanguageKey,
  Array<{
    group: string;
    items: string[];
  }>
> = {
  en: [
    {
      group: 'Core Languages',
      items: ['Java', 'Python', 'SQL'],
    },
    {
      group: 'Backend & Platforms',
      items: ['GeneXus', 'Spigot API', 'REST APIs', 'Event-driven design', 'Concurrency basics'],
    },
    {
      group: 'Systems & CS',
      items: ['Data structures', 'Algorithms', 'OOP', 'Complexity analysis'],
    },
    {
      group: 'Testing & Quality',
      items: ['JUnit', 'PyTest (basics)', 'Logging/metrics', 'Code reviews'],
    },
    {
      group: 'Tooling',
      items: ['Git/GitHub', 'Linux/Windows', 'IntelliJ IDEA', 'VS Code'],
    },
    {
      group: 'Cloud Foundations',
      items: ['AWS Academy CF', 'Google Cloud CF', 'Google Cloud Cybersecurity'],
    },
  ],
  es: [
    {
      group: 'Lenguajes Principales',
      items: ['Java', 'Python', 'SQL'],
    },
    {
      group: 'Backend y Plataformas',
      items: ['GeneXus', 'Spigot API', 'REST', 'Diseño orientado a eventos', 'Conceptos de concurrencia'],
    },
    {
      group: 'Sistemas y CS',
      items: ['Estructuras de datos', 'Algoritmos', 'POO', 'Análisis de complejidad'],
    },
    {
      group: 'Pruebas y Calidad',
      items: ['JUnit', 'PyTest (básico)', 'Registro/Métricas', 'Revisiones de código'],
    },
    {
      group: 'Herramientas',
      items: ['Git/GitHub', 'Linux/Windows', 'IntelliJ IDEA', 'VS Code'],
    },
    {
      group: 'Fundamentos Cloud',
      items: ['AWS Academy CF', 'Google Cloud CF', 'Google Cloud Cybersecurity'],
    },
  ],
};

export const experience: Record<
  LanguageKey,
  Array<{
    company: string;
    role: string;
    duration: string;
    summary: string;
  }>
> = {
  en: [
    {
      company: 'Bantotal',
      role: 'Software Development Analyst',
      duration: 'Apr 2025 - Present - Montevideo, Uruguay',
      summary:
        'Optimize Java (GeneXus) banking services, trimming core module P95 latency by ~20% via I/O and caching improvements. Drive reliability by resolving 50+ incidents with focus on observability, logging, and alerting hygiene.',
    },
  ],
  es: [
    {
      company: 'Bantotal',
      role: 'Analista de Desarrollo de Software',
      duration: 'Abr 2025 - Presente - Montevideo, Uruguay',
      summary:
        'Optimizo servicios bancarios en Java (GeneXus), reduciendo la latencia P95 de módulos clave ~20 % mediante mejoras de E/S y caché. Impulso la confiabilidad resolviendo más de 50 incidentes con foco en observabilidad, registros y alertas.',
    },
  ],
};

export const projects: Record<
  LanguageKey,
  Array<{
    name: string;
    description: string;
    highlights: string[];
  }>
> = {
  en: [
    {
      name: 'Spigot Gameplay Toolkit',
      description:
        'Gameplay-adjacent utilities for Minecraft 1.21 that streamline event scripting, tournament flows, and player moderation.',
      highlights: ['Java', 'Spigot API', 'Event-driven design'],
    },
    {
      name: 'Automation Utility Pack',
      description:
        'Python scripts that automate study workflows, telemetry parsing, and repeatable reporting for coursework and side projects.',
      highlights: ['Python', 'Automation', 'PyTest'],
    },
    {
      name: 'Cloud Foundations Labs',
      description:
        'Hands-on labs spanning AWS Academy and Google Cloud foundations covering IAM, networking, and cybersecurity basics.',
      highlights: ['AWS', 'Google Cloud', 'Security basics'],
    },
  ],
  es: [
    {
      name: 'Spigot Gameplay Toolkit',
      description:
        'Utilidades para Minecraft 1.21 que agilizan scripting de eventos, flujos de torneos y moderación de jugadores.',
      highlights: ['Java', 'Spigot API', 'Diseño orientado a eventos'],
    },
    {
      name: 'Automation Utility Pack',
      description:
        'Scripts en Python que automatizan estudios, análisis de telemetría y reportes repetibles para cursos y proyectos.',
      highlights: ['Python', 'Automatización', 'PyTest'],
    },
    {
      name: 'Cloud Foundations Labs',
      description:
        'Laboratorios prácticos de AWS Academy y Google Cloud que cubren IAM, redes y conceptos básicos de ciberseguridad.',
      highlights: ['AWS', 'Google Cloud', 'Fundamentos de seguridad'],
    },
  ],
};

export const contact: Record<
  LanguageKey,
  {
    emailLabel: string;
    email: string;
    blurb: string;
    social: Array<{ label: string; url: string }>;
  }
> = {
  en: {
    emailLabel: 'Email',
    email: 'fprunell10@gmail.com',
    blurb: "Let's talk about how I can help ship your next release.",
    social: [
      { label: 'GitHub', url: 'https://github.com/Riloox' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/federico-prunell-36b684207' },
      { label: 'HackerRank', url: 'https://www.hackerrank.com/profile/fprunell10' },
    ],
  },
  es: {
    emailLabel: 'Correo',
    email: 'fprunell10@gmail.com',
    blurb: 'Conversemos sobre cómo puedo ayudar con tu próximo lanzamiento.',
    social: [
      { label: 'GitHub', url: 'https://github.com/Riloox' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/federico-prunell-36b684207' },
      { label: 'HackerRank', url: 'https://www.hackerrank.com/profile/fprunell10' },
    ],
  },
};
