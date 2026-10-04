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
    avatarUrl: '/profile.png',
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
      quickCommand: 'git clone https://github.com/MrYharon/Echo.git',
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
      quickCommand: 'git clone https://github.com/MrYharon/CodeScout.git',
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
      quickCommand: 'git clone https://github.com/MrYharon/C-Drive-Cleaner.git',
      status: 'Shipped',
    },
  ],
  skills: [
    // Languages & Core
    {
      name: 'TypeScript',
      slug: 'typescript',
      category: 'Languages',
      description: 'Strict type safety, modern syntax, and robust architecture for scalable web tools.',
      projectId: 'echo-prompt-coach',
      projectTitle: 'Echo',
    },
    {
      name: 'JavaScript',
      slug: 'javascript',
      category: 'Languages',
      description: 'DOM event manipulation, runtime mutation observation, and zero-latency in-browser logic.',
      projectId: 'echo-prompt-coach',
      projectTitle: 'Echo',
    },
    {
      name: 'Python',
      slug: 'python',
      category: 'Languages',
      description: 'Asynchronous API servers, file system recursion tools, and CLI automation.',
      projectId: 'codescout',
      projectTitle: 'CodeScout',
    },

    // Frontend & Interfaces
    {
      name: 'React',
      slug: 'react',
      category: 'Frontend',
      description: 'Component hierarchies, live event-driven state, and sleek responsive interfaces.',
      projectId: 'codescout',
      projectTitle: 'CodeScout',
    },
    {
      name: 'Next.js',
      slug: 'nextjs',
      category: 'Frontend',
      description: 'Modern App Router, API routes, edge streaming, and production Vercel workflows.',
      projectId: 'codescout',
      projectTitle: 'CodeScout',
    },
    {
      name: 'Tailwind CSS',
      slug: 'tailwind',
      category: 'Frontend',
      description: 'Minimalist typography, sleek monochromatic systems, and responsive layouts.',
      projectId: 'codescout',
      projectTitle: 'CodeScout',
    },
    {
      name: 'Vite',
      slug: 'vite',
      category: 'Frontend',
      description: 'High-speed frontend development toolchain and modern asset bundling.',
    },

    // Backend & Systems
    {
      name: 'FastAPI',
      slug: 'fastapi',
      category: 'Backend',
      description: 'High-throughput async Python REST endpoints for star-velocity tracking and AI coaching.',
      projectId: 'codescout',
      projectTitle: 'CodeScout',
    },
    {
      name: 'Server-Sent Events (SSE)',
      slug: 'sse',
      category: 'Backend',
      description: 'Real-time uni-directional event pipelines streaming AI coaching insights without polling.',
      projectId: 'codescout',
      projectTitle: 'CodeScout',
    },
    {
      name: 'Node.js',
      slug: 'nodejs',
      category: 'Backend',
      description: 'Modern JavaScript runtime powering dev servers, tooling, and backend utilities.',
    },
    {
      name: 'PostgreSQL',
      slug: 'postgresql',
      category: 'Backend',
      description: 'Relational data modeling, ACID transactions, and query optimization.',
    },

    // Tools & Platform
    {
      name: 'Chrome MV3',
      slug: 'chrome',
      category: 'Tools',
      description: 'Manifest V3 extensions, service workers, content script DOM injection, and local storage.',
      projectId: 'echo-prompt-coach',
      projectTitle: 'Echo',
    },
    {
      name: 'Git & GitHub',
      slug: 'git',
      category: 'Tools',
      description: 'Version control, atomic commit hygiene, release branches, and GitHub API integration.',
      projectId: 'codescout',
      projectTitle: 'CodeScout',
    },
    {
      name: 'CLI & Automation',
      slug: 'cli',
      category: 'Tools',
      description: 'Direct OS system APIs, temporary cache pruning, and recursive disk inspection scripts.',
      projectId: 'c-drive-cleaner',
      projectTitle: 'C-Drive Cleaner',
    },
    {
      name: 'Docker',
      slug: 'docker',
      category: 'Tools',
      description: 'Containerized environments ensuring reproducible execution across development and cloud.',
    },
  ],
  posts: [
    {
      id: 'building-echo-local-manifest-v3',
      title: 'Why I Built Echo with 100% Local Heuristics Instead of an LLM API',
      date: 'Oct 2026',
      readTime: '3 min read',
      excerpt:
        'Most AI writing assistants send every keystroke to a remote server. Here is why I chose local regex rules and DOM observers for zero latency and complete privacy.',
      content: [
        'When writing prompts in ChatGPT, Claude, and Gemini every day, you notice that the biggest friction is not a lack of creativity—it is waiting for an assistant to analyze your input. Most extensions make an external API request, adding 300ms to 1s of latency before showing a suggestion.',
        'For Echo, I set a strict design rule: zero network calls during prompt evaluation. Everything runs client-side inside the Chrome Manifest V3 content script.',
        'By using dynamic DOM mutation observers and a lightweight rule engine that scores action verbs, output format constraints, and ambiguity, Echo provides instantaneous feedback as you type, and auto-corrects weak phrasing with Alt+E.',
        'The takeaway: local computation is often 10x more delightful than another round-trip to an LLM.',
      ],
      tags: ['Chrome MV3', 'JavaScript', 'Privacy', 'Performance'],
    },
    {
      id: 'tracking-github-star-velocity',
      title: 'Tracking Real Open-Source Velocity Beyond Vanity Star Counts',
      date: 'Sep 2026',
      readTime: '4 min read',
      excerpt:
        'Total GitHub stars tell you what was popular in the past; star velocity tells you what is breaking out right now. How CodeScout ranks daily trending repos with FastAPI and SSE.',
      content: [
        'A repository with 50,000 stars might be completely dormant, while a new tool with 200 stars might be gaining 50 stars an hour. To find real trending projects, total stars are the wrong metric.',
        'In CodeScout, I built an algorithm that tracks the derivative of stars over 24-hour and 7-day windows using the GitHub Search API. This surfaces high-momentum tools early.',
        'To make the brainstorming coach feel immediate, I implemented Server-Sent Events (SSE) in FastAPI. Rather than waiting for a complete AI response block, the frontend receives tokens in a live stream directly into the browser.',
      ],
      tags: ['Python', 'FastAPI', 'Next.js', 'SSE'],
    },
    {
      id: 'zen-of-minimalist-software',
      title: 'Building 60-Line Utilities That Do One Thing Well',
      date: 'Aug 2026',
      readTime: '2 min read',
      excerpt:
        'Why a clean Python CLI script with zero dependencies often beats bloated desktop cleaner applications.',
      content: [
        'Commercial disk cleaner apps are notorious for bundled bloatware, background telemetry, and subscription popups just to delete cached files.',
        'C-Drive Cleaner was born out of wanting a predictable, transparent script. Under 60 lines of standard-library Python, it recursively scans user temp, CrashDumps, and thumbnail caches, calculates exact reclaimable bytes, and asks for confirmation before purging.',
        'Building small, focused utilities with zero external dependencies reminds me why software engineering is fun: simple code that respects the user just works.',
      ],
      tags: ['Python', 'CLI', 'Clean Code'],
    },
  ],
};
