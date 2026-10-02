import type { PortfolioData } from '../types/portfolio';

export const portfolioData: PortfolioData = {
  personal: {
    name: 'Hugh Daeniel Dela Peña',
    headline: 'Software Engineer & Builder documenting projects and experiments',
    role: 'Software Engineer',
    bio: 'Welcome to my digital journal and project log. Here I document tools, browser extensions, and web systems I build.',
    blogIntro:
      'I build practical developer tools, browser extensions, and modern web applications. Focusing on high-performance interfaces, minimal design, and thoughtful engineering.',
    github: 'https://github.com/MrYharon',
    linkedin: 'https://www.linkedin.com/in/hugh-daeniel-dela-pe%C3%B1a-a68631431/',
    email: 'hughdaenielfdelapena@gmail.com',
  },
  projects: [
    {
      id: 'echo-prompt-coach',
      title: 'Echo — Prompt Coach',
      tagline: 'Real-time browser extension that acts as a Grammarly for AI prompting.',
      category: 'Browser Extension & Tooling',
      overview:
        'A lightweight Chrome Manifest V3 extension that analyzes prompt quality directly in ChatGPT, Claude, and Gemini. Features 1-click heuristic auto-correction, live 0-100 quality scoring, targeted quick-fixes, and keyboard shortcuts (Alt+E) with 100% local client-side execution.',
      highlights: [
        '100% client-side local evaluation engine with zero external API latency or tracking',
        'Dynamic DOM detection and input manipulation across ChatGPT, Claude.ai, and Gemini',
        'Heuristic rule engine detecting action verbs, ambiguity, and output constraints',
        'Real-time floating score pill with instantaneous grading and auto-correct shortcuts',
      ],
      techStack: ['JavaScript', 'Chrome MV3', 'DOM APIs', 'HTML5', 'CSS3'],
      metrics: 'Zero-latency local evaluation running 100% in-browser',
      demoUrl: 'https://github.com/MrYharon/Echo#installation',
      githubUrl: 'https://github.com/MrYharon/Echo',
      status: 'Active',
    },
    {
      id: 'codescout',
      title: 'CodeScout — Trending Radar & AI Coach',
      tagline: 'Real-time GitHub trending repository tracker with an AI project coach.',
      category: 'Full-Stack & Developer Tools',
      overview:
        'A full-stack application tracking trending open-source projects across 8 categories with an SSE streaming AI chat that brainstorms portfolio projects grounded in current GitHub trend data.',
      highlights: [
        'Streaming AI chat with Server-Sent Events (SSE) providing contextual repo ideation',
        'Star-velocity ranking algorithm analyzing GitHub Search API trend momentum',
        '8-category automated repository classifier across AI/ML, DevOps, and Frontend',
        'Modern Next.js App Router frontend paired with FastAPI asynchronous backend',
      ],
      techStack: ['Next.js', 'React', 'TypeScript', 'FastAPI', 'Python', 'Tailwind CSS', 'SQLite'],
      metrics: 'Real-time velocity scoring across hundreds of GitHub repos daily',
      demoUrl: 'https://github.com/MrYharon/CodeScout',
      githubUrl: 'https://github.com/MrYharon/CodeScout',
      status: 'Active',
    },
    {
      id: 'c-drive-cleaner',
      title: 'C-Drive Cleaner',
      tagline: 'Minimal Python utility to inspect and reclaim local storage.',
      category: 'System Utility & Python',
      overview:
        'A lightweight 60-line Python utility that recursively inspects user temp and cache directories, calculating safe space reclamation and purging junk files without bloat.',
      highlights: [
        'Fast recursive directory inspection and safe temporary file cleanup',
        'Zero external dependencies, running in under 60 lines of clean Python',
        'Interactive CLI feedback showing exact reclaimed disk space',
      ],
      techStack: ['Python', 'OS API', 'Automation', 'CLI'],
      metrics: 'Reclaims gigabytes of clutter in seconds with zero dependencies',
      demoUrl: 'https://github.com/MrYharon/C-Drive-Cleaner',
      githubUrl: 'https://github.com/MrYharon/C-Drive-Cleaner',
      status: 'Shipped',
    },
  ],
  skills: [
    {
      name: 'TypeScript',
      slug: 'typescript',
      category: 'Languages',
      description: 'Strict type safety, modern syntax, and robust architecture for scalable web applications.',
    },
    {
      name: 'JavaScript',
      slug: 'javascript',
      category: 'Languages',
      description: 'Core web fundamentals, event loops, DOM manipulation, and asynchronous programming in browser extensions.',
    },
    {
      name: 'Python',
      slug: 'python',
      category: 'Languages',
      description: 'Clean backend development with FastAPI, CLI automation tools, and data processing scripts.',
    },
    {
      name: 'React',
      slug: 'react',
      category: 'Frontend',
      description: 'Component-driven architectures, modern hooks, responsive state management, and smooth interactions.',
    },
    {
      name: 'Next.js',
      slug: 'nextjs',
      category: 'Frontend',
      description: 'App Router, Server-Sent Events (SSE), API routes, and full-stack production deployments on Vercel.',
    },
    {
      name: 'Tailwind CSS',
      slug: 'tailwind',
      category: 'Frontend',
      description: 'Utility-first design systems, responsive typography, and minimalist monochromatic interfaces.',
    },
    {
      name: 'FastAPI',
      slug: 'fastapi',
      category: 'Backend',
      description: 'High-throughput asynchronous Python REST endpoints and streaming AI event pipelines.',
    },
    {
      name: 'Node.js',
      slug: 'nodejs',
      category: 'Backend',
      description: 'Modern JavaScript runtime for tooling, dev servers, and backend microservices.',
    },
    {
      name: 'Chrome MV3',
      slug: 'chrome',
      category: 'Tools',
      description: 'Manifest V3 extensions, background service workers, content script DOM injection, and local storage.',
    },
    {
      name: 'PostgreSQL',
      slug: 'postgresql',
      category: 'Backend',
      description: 'Relational data modeling, ACID transactions, and query optimization.',
    },
    {
      name: 'Docker',
      slug: 'docker',
      category: 'Tools',
      description: 'Containerizing full-stack environments for consistent local development and cloud deployments.',
    },
    {
      name: 'Git & GitHub',
      slug: 'git',
      category: 'Tools',
      description: 'Version control, atomic commits, pull requests, and automated GitHub Actions workflows.',
    },
  ],
};
