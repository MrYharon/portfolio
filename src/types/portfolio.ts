export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: string;
  overview: string;
  whatIDid: string[];
  generativeAiAspects: string[];
  techStack: string[];
  metrics?: string;
  demoUrl?: string;
  githubUrl?: string;
  status: 'Completed' | 'In Development' | 'Production';
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level?: string; icon?: string }[];
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string[];
}

export interface PortfolioData {
  personal: {
    name: string;
    headline: string;
    role: string;
    avatarUrl: string;
    bio: string;
    location: string;
    availability: string;
    linkedin: string;
    github: string;
    email: string;
    resumeUrl: string;
  };
  projects: Project[];
  skillCategories: SkillCategory[];
  experience: Experience[];
}
