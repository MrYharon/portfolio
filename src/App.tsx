import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { BlogSection } from './components/BlogSection';
import { BlogReaderModal } from './components/BlogReaderModal';
import { ProjectCard } from './components/ProjectCard';
import { ContactSection } from './components/ContactSection';
import { ChatInput } from './components/ChatInput';
import { LoadingScreen } from './components/LoadingScreen';
import { portfolioData } from './data/portfolioData';
import type { BlogPost } from './types/portfolio';

export function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return true;
  });
  const [chatInitialPrompt, setChatInitialPrompt] = useState('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

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
      'writing',
      ...portfolioData.projects.map((p) => p.id),
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
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col font-sans selection:bg-neutral-200 selection:text-black">
      {/* Seamless Minimalist Sidebar */}
      <Sidebar
        projects={portfolioData.projects}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        linkedinUrl={portfolioData.personal.linkedin}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-200 ease-in-out relative ${
          sidebarOpen ? 'lg:pl-68' : 'lg:pl-18'
        }`}
      >
        {/* Top Minimal Header */}
        <Header
          activeSection={activeSection}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          linkedinUrl={portfolioData.personal.linkedin}
        />

        {/* Content Stream with generous bottom padding */}
        <main className="flex-1 px-4 sm:px-8 lg:px-12 max-w-4xl w-full mx-auto pb-56">
          {/* Hero Section */}
          <Hero
            personal={portfolioData.personal}
            onExploreProjects={() => handleNavigate(portfolioData.projects[0].id)}
          />

          {/* About & Philosophy */}
          <AboutSection />

          {/* Writing & Journal Section */}
          <BlogSection
            posts={portfolioData.posts}
            onSelectPost={(post) => setSelectedPost(post)}
          />

          {/* Featured Projects Section */}
          <section id="projects" className="py-12 border-b border-neutral-100">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-black tracking-tight">
                Featured Projects & Tools
              </h2>
              <p className="text-sm text-neutral-500 mt-1">
                Real tools, extensions, and open-source applications I've built
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

          {/* Contact Section */}
          <ContactSection personal={portfolioData.personal} />
        </main>

        {/* Soft bottom fade-out gradient so scrolling content smoothly fades behind prompt bar */}
        <div className="pointer-events-none fixed bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent z-30" />

        {/* Bottom Prompt Bar */}
        <ChatInput
          portfolioData={portfolioData}
          onNavigate={handleNavigate}
          initialPrompt={chatInitialPrompt}
        />
      </div>

      {/* Reader Modal for Full Articles */}
      <BlogReaderModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
      />

      {/* Bespoke HD Intro Splash / Loading Screen */}
      <LoadingScreen minDurationMs={850} />
    </div>
  );
}

export default App;
