import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectCard } from './components/ProjectCard';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { ChatInput } from './components/ChatInput';
import { portfolioData } from './data/portfolioData';
import { FolderGit2 } from 'lucide-react';

export function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [chatInitialPrompt, setChatInitialPrompt] = useState('');

  // Smooth scroll handler
  const handleNavigate = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleAskAboutProject = (projectTitle: string) => {
    setChatInitialPrompt(`Tell me more about the technical decisions and GenAI stack in "${projectTitle}"`);
  };

  // Scroll spy to highlight active section in sidebar
  useEffect(() => {
    const sectionIds = [
      'hero',
      'about',
      'skills',
      ...portfolioData.projects.map((p) => p.id),
      'experience',
      'contact',
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0f12] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Antigravity / Gemini Table of Contents Sidebar */}
      <Sidebar
        projects={portfolioData.projects}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Canvas Area */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'lg:pl-72' : 'lg:pl-20'
        }`}
      >
        {/* Top Header */}
        <Header
          activeSection={activeSection}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Content Stream */}
        <main className="flex-1 px-4 sm:px-8 lg:px-12 max-w-5xl w-full mx-auto pb-28">
          {/* Hero Section */}
          <Hero
            personal={portfolioData.personal}
            onExploreProjects={() => handleNavigate(portfolioData.projects[0].id)}
          />

          {/* About Section */}
          <AboutSection personal={portfolioData.personal} />

          {/* Skills Section */}
          <SkillsSection categories={portfolioData.skillCategories} />

          {/* Featured Projects Section (Table of contents targets) */}
          <section id="projects" className="py-12 border-b border-[#20232a]">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  <FolderGit2 className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Featured Generative AI Projects
                  </h2>
                  <p className="text-xs text-slate-400 font-mono">
                    Direct Jump Targets / Interactive AI Showcase
                  </p>
                </div>
              </div>

              <span className="hidden sm:inline-block text-xs font-mono text-indigo-400/80 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                Click any in sidebar to jump
              </span>
            </div>

            {/* List of projects */}
            <div className="space-y-8">
              {portfolioData.projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onAskAboutProject={handleAskAboutProject}
                />
              ))}
            </div>
          </section>

          {/* Experience Section */}
          <ExperienceSection experience={portfolioData.experience} />

          {/* Contact Section */}
          <ContactSection personal={portfolioData.personal} />
        </main>

        {/* Docked AI Chat / Prompt Input Bar at Bottom */}
        <ChatInput
          portfolioData={portfolioData}
          onNavigate={handleNavigate}
          initialPrompt={chatInitialPrompt}
        />
      </div>
    </div>
  );
}

export default App;
