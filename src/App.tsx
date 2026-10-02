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
    setChatInitialPrompt(`Tell me more about "${projectTitle}"`);
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
      const scrollPosition = window.scrollY + 180;

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
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Gemini Style Sidebar */}
      <Sidebar
        projects={portfolioData.projects}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-200 ease-in-out ${
          sidebarOpen ? 'lg:pl-68' : 'lg:pl-18'
        }`}
      >
        {/* Top Minimal Header */}
        <Header
          activeSection={activeSection}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Content Stream */}
        <main className="flex-1 px-4 sm:px-8 lg:px-12 max-w-4xl w-full mx-auto pb-28">
          {/* Hero Section */}
          <Hero
            personal={portfolioData.personal}
            onExploreProjects={() => handleNavigate(portfolioData.projects[0].id)}
          />

          {/* About Section */}
          <AboutSection personal={portfolioData.personal} />

          {/* Skills Section */}
          <SkillsSection categories={portfolioData.skillCategories} />

          {/* Featured Projects Section */}
          <section id="projects" className="py-12 border-b border-gray-100">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
                Featured Projects
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Selected engineering projects and applications
              </p>
            </div>

            {/* List of projects */}
            <div className="space-y-6">
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

        {/* Gemini Style Bottom Prompt Bar */}
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
