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
      'Software Development Analyst at Bantotal and B.Sc. in IT graduate. Experience building and maintaining backend services using Java and Python. Knowledgeable in data structures, algorithms, and cloud infrastructure. Focused on developing reliable, production-ready software and improving system performance.',
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
      'Analista de Desarrollo de Software en Bantotal y Licenciado en Tecnologías de la Información. Experiencia construyendo y manteniendo servicios backend con Java y Python. Conocimientos en estructuras de datos, algoritmos e infraestructura en la nube. Enfocado en software confiable y listo para producción, y en mejorar el rendimiento de los sistemas.',
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
      group: 'Languages',
      items: ['Java', 'Python', 'SQL', 'TypeScript', 'JavaScript'],
    },
    {
      group: 'Backend',
      items: ['REST APIs', 'Node.js', 'Event-driven architecture', 'Concurrency', 'Spigot API'],
    },
    {
      group: 'Frontend / Mobile',
      items: ['React Native', 'React.js', 'HTML/CSS'],
    },
    {
      group: 'CS Foundations',
      items: ['Data Structures', 'Algorithms', 'Complexity Analysis', 'OOP'],
    },
    {
      group: 'Testing & Quality',
      items: ['JUnit', 'PyTest', 'Logging', 'Observability', 'Code Reviews'],
    },
    {
      group: 'Tools & Cloud',
      items: ['Git', 'Docker', 'Linux', 'AWS', 'Google Cloud', 'CI/CD', 'Postman', 'VS Code'],
    },
  ],
  es: [
    {
      group: 'Lenguajes',
      items: ['Java', 'Python', 'SQL', 'TypeScript', 'JavaScript'],
    },
    {
      group: 'Backend',
      items: ['APIs REST', 'Node.js', 'Arquitectura orientada a eventos', 'Concurrencia', 'Spigot API'],
    },
    {
      group: 'Frontend / Mobile',
      items: ['React Native', 'React.js', 'HTML/CSS'],
    },
    {
      group: 'Fundamentos de CS',
      items: ['Estructuras de Datos', 'Algoritmos', 'Análisis de Complejidad', 'POO'],
    },
    {
      group: 'Pruebas y Calidad',
      items: ['JUnit', 'PyTest', 'Logging', 'Observabilidad', 'Revisiones de Código'],
    },
    {
      group: 'Herramientas y Cloud',
      items: ['Git', 'Docker', 'Linux', 'AWS', 'Google Cloud', 'CI/CD', 'Postman', 'VS Code'],
    },
  ],
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
        'Optimized Java backend services for core banking modules, achieving a ~20% improvement in p95 latency through I/O optimization and caching.',
        'Resolved 50+ production issues via incident triage, improving system reliability and logging practices.',
        'Participated in peer code reviews and maintained documentation for system modules.',
      ],
    },
  ],
  es: [
    {
      company: 'Bantotal',
      role: 'Analista de Desarrollo de Software',
      duration: 'Abr 2025 - Presente · Montevideo, Uruguay',
      highlights: [
        'Optimización de servicios backend en Java para módulos de core bancario, logrando una mejora de ~20 % en latencia p95 mediante optimización de E/S y caché.',
        'Resolución de más de 50 incidentes en producción mediante triage, mejorando la confiabilidad del sistema y las prácticas de logging.',
        'Participación en revisiones de código entre pares y mantenimiento de documentación de módulos del sistema.',
      ],
    },
  ],
};

export const projects: Record<
  LanguageKey,
  Array<{
    name: string;
    stack: string;
    highlights: string[];
  }>
> = {
  en: [
    {
      name: 'Cleta — Shared Bike Management Platform',
      stack: 'TypeScript · React Native · Node.js',
      highlights: [
        'Final degree project: designed and built a full-stack shared mobility system with a mobile interface.',
        'Developed cross-platform features with React Native, integrating Google Maps and Firebase Auth.',
        'Implemented backend services on Google Cloud Run with PostgreSQL and automated CI/CD pipelines.',
      ],
    },
    {
      name: 'RilooxDB',
      stack: 'Python · Data Engineering',
      highlights: [
        'Developed a custom in-memory key-value store with file-based persistence and data encryption.',
        'Implemented custom storage logic for data serialization and secure retrieval without external DB dependencies.',
      ],
    },
    {
      name: 'Windows 11 Debloater',
      stack: 'PowerShell · Automation',
      highlights: [
        'Created a system utility to automate removal of bloatware and telemetry from Windows 11 environments.',
        'Focused on system-level optimization and improving OS performance through scripted configuration changes.',
      ],
    },
    {
      name: 'AFK Timeskip',
      stack: 'Java · Spigot API',
      highlights: [
        'Built an event-driven system to optimize server tick progression and maintain stability under high load.',
      ],
    },
  ],
  es: [
    {
      name: 'Cleta — Plataforma de Bicicletas Compartidas',
      stack: 'TypeScript · React Native · Node.js',
      highlights: [
        'Proyecto final de grado: diseño e implementación de un sistema full-stack de movilidad compartida con interfaz móvil.',
        'Desarrollo de funcionalidades multiplataforma con React Native, integrando Google Maps y Firebase Auth.',
        'Servicios backend en Google Cloud Run con PostgreSQL y pipelines de CI/CD automatizados.',
      ],
    },
    {
      name: 'RilooxDB',
      stack: 'Python · Ingeniería de Datos',
      highlights: [
        'Desarrollo de un almacén clave-valor en memoria con persistencia basada en archivos y cifrado de datos.',
        'Implementación de lógica de almacenamiento propia para serialización y recuperación segura sin dependencias externas de base de datos.',
      ],
    },
    {
      name: 'Windows 11 Debloater',
      stack: 'PowerShell · Automatización',
      highlights: [
        'Utilidad que automatiza la eliminación de bloatware y telemetría en entornos Windows 11.',
        'Enfocado en optimización a nivel de sistema y mejora del rendimiento del SO mediante scripts de configuración.',
      ],
    },
    {
      name: 'AFK Timeskip',
      stack: 'Java · Spigot API',
      highlights: [
        'Sistema orientado a eventos que optimiza la progresión de ticks del servidor y mantiene la estabilidad bajo alta carga.',
      ],
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
    {
      school: 'Karelia University of Applied Sciences',
      degree: 'Exchange Program (Information Technology)',
      duration: 'Aug 2023 - Dec 2023 · Finland',
    },
  ],
  es: [
    {
      school: 'Universidad Tecnológica del Uruguay (UTEC)',
      degree: 'Licenciatura en Tecnologías de la Información',
      duration: 'Graduado · Montevideo, Uruguay',
    },
    {
      school: 'Karelia University of Applied Sciences',
      degree: 'Programa de Intercambio (Tecnologías de la Información)',
      duration: 'Ago 2023 - Dic 2023 · Finlandia',
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
