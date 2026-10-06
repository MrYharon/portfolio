import React, { useState } from 'react';
import { ArrowUpRight, MessageSquare, Check, Copy, Terminal, Code2, Zap } from 'lucide-react';
import type { Project } from '../types/portfolio';
import { GithubIcon } from './Icons';
import { EchoInteractiveDemo } from './EchoInteractiveDemo';

interface ProjectCardProps {
  project: Project;
  onAskAboutProject: (title: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onAskAboutProject }) => {
  const isEcho = project.id === 'echo-prompt-coach';
  // State for active tab: 'demo' | 'overview' | 'highlights' | 'install'
  const [activeTab, setActiveTab] = useState<'demo' | 'overview' | 'highlights' | 'install'>(
    isEcho ? 'demo' : 'overview'
  );

  // State to track if the terminal command was recently copied to clipboard
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!project.quickCommand) return;
    try {
      await navigator.clipboard.writeText(project.quickCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy command:', err);
    }
  };

  return (
    <article
      id={project.id}
      className="scroll-mt-20 p-6 sm:p-7 rounded-2xl bg-white border border-neutral-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-md group"
    >
      {/* Header & Badges */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-700 border border-neutral-200/60">
            {project.category}
          </span>
        </div>

        {/* Action Buttons with Micro-Animations */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onAskAboutProject(project.title)}
            className="flex items-center gap-1.5 text-xs text-neutral-600 hover:text-black px-2.5 py-1.5 rounded-xl hover:bg-neutral-100 press-scale"
            title="Ask AI about this project"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Ask</span>
          </button>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="group/btn flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 hover:border-neutral-400 text-xs font-medium text-neutral-800 transition-all duration-150 press-scale shadow-2xs"
              title="GitHub repository"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>Code</span>
              <ArrowUpRight className="w-3 h-3 text-neutral-400 transition-transform duration-150 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 group-hover/btn:text-black" />
            </a>
          )}

          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="group/btn flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-black hover:bg-neutral-800 text-white text-xs font-medium transition-all duration-150 press-scale shadow-2xs"
            >
              <span>Visit</span>
              <ArrowUpRight className="w-3 h-3 text-neutral-400 transition-transform duration-150 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 group-hover/btn:text-white" />
            </a>
          )}
        </div>
      </div>

      {/* Project Title & Tagline */}
      <h3 className="text-xl font-semibold text-black tracking-tight">
        {project.title}
      </h3>
      <p className="mt-1 text-sm text-neutral-600 leading-relaxed">
        {project.tagline}
      </p>

      {/* Interactive Tabs Navigation with smooth active indicators */}
      <div className="mt-5 flex items-center gap-1 p-1 bg-neutral-100/80 rounded-xl w-fit text-xs font-medium border border-neutral-200/50">
        {isEcho && (
          <button
            onClick={() => setActiveTab('demo')}
            className={`px-3 py-1.5 rounded-lg transition-all duration-150 flex items-center gap-1.5 press-scale ${
              activeTab === 'demo'
                ? 'bg-white text-black shadow-2xs font-semibold'
                : 'text-neutral-500 hover:text-black'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Try Echo Live</span>
          </button>
        )}
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-3 py-1.5 rounded-lg transition-all duration-150 press-scale ${
            activeTab === 'overview'
              ? 'bg-white text-black shadow-2xs font-semibold'
              : 'text-neutral-500 hover:text-black'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('highlights')}
          className={`px-3 py-1.5 rounded-lg transition-all duration-150 press-scale ${
            activeTab === 'highlights'
              ? 'bg-white text-black shadow-2xs font-semibold'
              : 'text-neutral-500 hover:text-black'
          }`}
        >
          Engineering ({project.highlights.length})
        </button>
        {project.quickCommand && (
          <button
            onClick={() => setActiveTab('install')}
            className={`px-3 py-1.5 rounded-lg transition-all duration-150 flex items-center gap-1.5 press-scale ${
              activeTab === 'install'
                ? 'bg-white text-black shadow-2xs font-semibold'
                : 'text-neutral-500 hover:text-black'
            }`}
          >
            <Terminal className="w-3 h-3" />
            <span>Quick Run</span>
          </button>
        )}
      </div>

      {/* Tab Panels with smooth animation */}
      <div className="mt-4 min-h-[90px]">
        {/* Tab 0: Interactive Echo Live Simulator */}
        {activeTab === 'demo' && isEcho && (
          <div key="tab-demo" className="animate-tab-fade pt-1">
            <EchoInteractiveDemo />
          </div>
        )}

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div key="tab-overview" className="animate-tab-fade space-y-3">
            {/* Optional Project Mockup / Screenshot Preview */}
            {project.imageUrl && (
              <figure className="rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100 shadow-2xs mb-3 group/img">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full max-h-64 object-cover transition-transform duration-300 group-hover/img:scale-[1.01]"
                  loading="lazy"
                />
                {project.imageCaption && (
                  <figcaption className="px-3 py-1.5 text-center text-[11px] font-mono text-neutral-400 bg-neutral-50 border-t border-neutral-100">
                    {project.imageCaption}
                  </figcaption>
                )}
              </figure>
            )}

            <p className="text-sm text-neutral-600 leading-relaxed">
              {project.overview}
            </p>
            {project.metrics && (
              <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/70 text-xs text-neutral-700 font-mono">
                <span className="font-semibold text-black">Focus:</span> {project.metrics}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Engineering Highlights */}
        {activeTab === 'highlights' && (
          <div key="tab-highlights" className="animate-tab-fade p-4 rounded-xl bg-neutral-50 border border-neutral-200/70">
            <ul className="space-y-2">
              {project.highlights.map((item, idx) => (
                <li key={idx} className="text-xs text-neutral-600 flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-black shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tab 3: Quick Run / Install Command */}
        {activeTab === 'install' && project.quickCommand && (
          <div key="tab-install" className="animate-tab-fade">
            <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-900 text-neutral-100 font-mono text-xs border border-neutral-800">
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pr-2">
                <span className="text-neutral-500 select-none">$</span>
                <span className="text-neutral-200 whitespace-nowrap">{project.quickCommand}</span>
              </div>
              <button
                onClick={handleCopy}
                className="ml-3 shrink-0 px-2.5 py-1 rounded-md bg-neutral-800 hover:bg-neutral-700 text-[11px] font-mono text-neutral-300 hover:text-white transition-all duration-150 press-scale flex items-center gap-1.5"
                title="Copy command"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400 font-medium">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <p className="mt-2 text-[11px] text-neutral-400 font-mono">
              Clone locally and inspect or test the codebase.
            </p>
          </div>
        )}
      </div>

      {/* Tech Stack Chips (Clean Monochromatic Pills) */}
      <div className="mt-5 pt-4 border-t border-neutral-100 flex flex-wrap items-center gap-1.5">
        <span className="text-xs text-neutral-400 mr-1 font-mono flex items-center gap-1">
          <Code2 className="w-3 h-3 text-neutral-400" />
          <span>tech:</span>
        </span>
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-700 border border-neutral-200/50 hover:bg-neutral-200/70 hover:border-neutral-300 transition-colors cursor-default"
          >
            #{tech.toLowerCase().replace(/\s+/g, '')}
          </span>
        ))}
      </div>
    </article>
  );
};
