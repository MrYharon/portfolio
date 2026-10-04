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
  quickCommand?: string;
  imageUrl?: string;
  imageCaption?: string;
  status: 'Active' | 'Shipped' | 'In Progress';
}

export interface TechSkill {
  name: string;
  category: 'Languages' | 'Frontend' | 'Backend' | 'Tools';
  description: string;
  slug: string;
  projectId?: string;
  projectTitle?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  coverImage?: string;
  coverCaption?: string;
  content: string[];
  tags: string[];
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
  posts: BlogPost[];
}
