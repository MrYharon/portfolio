export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: string;
  overview: string;
  highlights: string[];
  techStack: string[];
  metrics?: string;
  demoUrl?: string;
  githubUrl?: string;
  status: 'Active' | 'Shipped' | 'In Progress';
}

export interface TechSkill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Languages' | 'Tools';
  description: string;
  slug: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    headline: string;
    role: string;
    bio: string;
    blogIntro: string;
    github: string;
    linkedin: string;
    email: string;
    avatarUrl?: string;
  };
  projects: Project[];
  skills: TechSkill[];
}
