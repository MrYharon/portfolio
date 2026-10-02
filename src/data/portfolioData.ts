import type { PortfolioData } from '../types/portfolio';

export const portfolioData: PortfolioData = {
  personal: {
    name: 'Hugh',
    headline: 'AI Engineer & Full-Stack Developer specializing in Generative AI Solutions',
    role: 'AI Engineer / Generative AI Specialist',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bio: 'I build intelligent systems, autonomous agents, and production-grade Generative AI applications. Bridging advanced LLM reasoning with seamless user experiences to solve real-world problems.',
    location: 'Open to Remote / Global Opportunities',
    availability: 'Open to Work • Full-time & High-impact Contracts',
    linkedin: 'https://linkedin.com/in/yourprofile',
    github: 'https://github.com/MrYharon',
    email: 'contact@yourdomain.com',
    resumeUrl: '#',
  },
  projects: [
    {
      id: 'agentic-ai-workflow',
      title: 'Autonomous Multi-Agent Task Orchestrator',
      tagline: 'Self-coordinating agent swarm for complex coding, research, and analysis workflows.',
      category: 'Generative AI & Agentic Systems',
      overview:
        'Engineered an autonomous multi-agent framework inspired by modern reasoning architectures. The system coordinates specialized subagents to divide complex multi-step objectives into executable plans with self-reflection.',
      whatIDid: [
        'Designed hierarchical agent dispatch architecture with dynamic role allocation and tool calling.',
        'Implemented iterative prompt refinement and state persistence to prevent hallucinations.',
        'Integrated live sandbox code execution with automated linting and error recovery loops.',
        'Built reactive real-time UI dashboard showing agent thinking traces and tool executions.',
      ],
      generativeAiAspects: [
        'Advanced tool-calling and function routing via modern LLM APIs.',
        'Chain-of-Thought (CoT) and ReAct framework reasoning cycles.',
        'Vector memory buffer for continuous agent context retrieval.',
      ],
      techStack: ['Python', 'TypeScript', 'LangChain', 'Gemini API', 'React', 'FastAPI', 'Tailwind CSS'],
      metrics: '78% reduction in manual task coordination latency',
      demoUrl: 'https://demo.example.com/agentic',
      githubUrl: 'https://github.com/MrYharon/portfolio',
      status: 'Production',
    },
    {
      id: 'enterprise-rag-engine',
      title: 'Contextual RAG & Enterprise Knowledge Assistant',
      tagline: 'High-precision retrieval augmented generation pipeline with hybrid dense-sparse search.',
      category: 'RAG & Knowledge Retrieval',
      overview:
        'Built an enterprise-grade RAG pipeline that ingests hundreds of technical documents, codebases, and PDFs to deliver grounded, hallucination-free answers with precise citations.',
      whatIDid: [
        'Developed semantic chunking and metadata enrichment strategy for structured and unstructured documents.',
        'Implemented hybrid search combining vector embeddings (dense) with BM25 keyword matching (sparse).',
        'Built cross-encoder re-ranking layer to elevate top relevant context passages into LLM context window.',
        'Crafted a chat UI with markdown rendering, inline reference cards, and direct source link inspection.',
      ],
      generativeAiAspects: [
        'Grounded question-answering with strict system instructions and citation verification.',
        'Custom fine-tuned embedding representations for domain-specific vocabulary.',
        'Guardrails to block prompt injection and enforce factual alignment.',
      ],
      techStack: ['Python', 'Pinecone', 'OpenAI / Gemini', 'Next.js', 'Docker', 'PostgreSQL'],
      metrics: '94% citation accuracy across 50,000+ internal documents',
      demoUrl: 'https://demo.example.com/rag',
      githubUrl: 'https://github.com/MrYharon/portfolio',
      status: 'Production',
    },
    {
      id: 'multimodal-creative-studio',
      title: 'Multimodal AI Creative Studio & Canvas',
      tagline: 'Interactive web platform combining vision-language models, image generation, and live editing.',
      category: 'Multimodal & Vision AI',
      overview:
        'A comprehensive generative suite empowering creators to generate, critique, and edit visual assets using conversational multimodal prompts and real-time streaming feedback.',
      whatIDid: [
        'Constructed fluid infinite-canvas interface for arranging multimodal inputs (images, sketches, text prompts).',
        'Implemented streaming response pipeline via server-sent events (SSE) for sub-second visual responses.',
        'Created interactive prompt engineer assistant that suggests lighting, camera, and style refinements.',
      ],
      generativeAiAspects: [
        'Multimodal image-to-text semantic analysis and visual critique.',
        'Latent diffusion orchestration with negative prompt guidance.',
      ],
      techStack: ['React', 'TypeScript', 'FastAPI', 'TailwindCSS', 'WebSockets', 'AWS S3'],
      metrics: '10k+ assets generated with < 1.2s average inference feedback',
      demoUrl: 'https://demo.example.com/studio',
      githubUrl: 'https://github.com/MrYharon/portfolio',
      status: 'Completed',
    },
    {
      id: 'conversational-voice-agent',
      title: 'Low-Latency Conversational Voice Assistant',
      tagline: 'End-to-end voice AI pipeline with real-time speech-to-text, streaming LLM, and expressive TTS.',
      category: 'Real-Time Conversational AI',
      overview:
        'Engineered an ultra-low latency voice conversational agent capable of natural interruptions, tone adaptation, and conversational context retention.',
      whatIDid: [
        'Optimized audio streaming pipeline over WebRTC to achieve under 450ms end-to-end voice latency.',
        'Integrated turn-taking detection and barge-in capability for natural conversational flow.',
        'Configured dynamic prompt context for personalized user memory across sessions.',
      ],
      generativeAiAspects: [
        'Speech synthesis styling with SSML dynamic tone adjustments.',
        'Streaming token generation directly piped into audio decoders.',
      ],
      techStack: ['WebRTC', 'Python', 'Whisper', 'Gemini Flash', 'WebSockets'],
      metrics: 'Sub-450ms roundtrip audio response latency',
      demoUrl: 'https://demo.example.com/voice',
      githubUrl: 'https://github.com/MrYharon/portfolio',
      status: 'In Development',
    },
  ],
  skillCategories: [
    {
      title: 'Generative AI & LLM Systems',
      skills: [
        { name: 'Agentic Frameworks (ReAct, CoT)' },
        { name: 'RAG Architectures & Vector DBs' },
        { name: 'Prompt Engineering & System Directives' },
        { name: 'Fine-tuning & Evaluation' },
        { name: 'Gemini, Claude, GPT APIs' },
        { name: 'LangChain & LlamaIndex' },
      ],
    },
    {
      title: 'Full-Stack Development',
      skills: [
        { name: 'React & Next.js' },
        { name: 'TypeScript / JavaScript' },
        { name: 'Tailwind CSS & UI Systems' },
        { name: 'Node.js & Express' },
        { name: 'Python (FastAPI, Flask)' },
        { name: 'REST & GraphQL APIs' },
      ],
    },
    {
      title: 'Data & Infrastructure',
      skills: [
        { name: 'PostgreSQL & MongoDB' },
        { name: 'Pinecone, Qdrant, Chroma' },
        { name: 'Docker & Containerization' },
        { name: 'Git & GitHub Actions' },
        { name: 'AWS & Cloud Deployment' },
        { name: 'CI/CD Pipelines' },
      ],
    },
  ],
  experience: [
    {
      role: 'Generative AI & Software Engineer',
      company: 'Innovate AI Labs',
      period: '2024 - Present',
      description: [
        'Architected production agentic workflows and LLM-assisted code automation pipelines.',
        'Led transition to hybrid RAG systems, cutting hallucination rates by 40%.',
        'Collaborated closely with cross-functional teams to integrate generative AI features into core products.',
      ],
    },
    {
      role: 'Full-Stack Developer',
      company: 'Tech Horizons Corp',
      period: '2022 - 2024',
      description: [
        'Designed high-performance web applications with React, TypeScript, and microservice APIs.',
        'Implemented CI/CD pipelines reducing deployment friction across 5 engineering teams.',
        'Spearheaded internal adoption of AI development tooling to boost team velocity.',
      ],
    },
  ],
};
