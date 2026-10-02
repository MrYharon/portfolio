import React from 'react';
import { Sparkles, CheckCircle2, Cpu, ArrowUpRight, MessageSquareCode } from 'lucide-react';
import type { Project } from '../types/portfolio';
import { GithubIcon } from './Icons';

interface ProjectCardProps {
  project: Project;
  onAskAboutProject: (title: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onAskAboutProject }) => {
  return (
    <article
      id={project.id}
      className="scroll-mt-24 p-6 sm:p-8 rounded-2xl bg-[#13151b] border border-[#242732] hover:border-indigo-500/50 transition-all duration-300 shadow-xl group relative overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-500/10 transition-colors" />

      {/* Top Header & Badges */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-indigo-400" />
            {project.category}
          </span>
          <span
            className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
              project.status === 'Production'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : project.status === 'In Development'
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                : 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
            }`}
          >
            {project.status}
          </span>
        </div>

        {/* Project Links & Ask AI */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onAskAboutProject(project.title)}
            className="flex items-center gap-1.5 text-xs font-mono text-indigo-300 hover:text-white px-2.5 py-1.5 rounded-lg bg-indigo-950/40 hover:bg-indigo-900/60 border border-indigo-700/40 transition-colors"
            title="Ask AI in the prompt box about this project"
          >
            <MessageSquareCode className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ask AI</span>
          </button>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 text-slate-400 hover:text-white hover:bg-[#1f222b] rounded-lg transition-colors border border-transparent hover:border-[#2f3340]"
              title="View Repository"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          )}

          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-xs text-slate-300 hover:text-white px-2.5 py-1.5 rounded-lg bg-[#1a1d26] hover:bg-[#222633] border border-[#2b2f3d] transition-colors"
            >
              <span>Demo</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
            </a>
          )}
        </div>
      </div>

      {/* Project Title & Tagline */}
      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-indigo-200 transition-colors">
        {project.title}
      </h3>
      <p className="mt-1.5 text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
        {project.tagline}
      </p>

      {/* Overview */}
      <p className="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed">
        {project.overview}
      </p>

      {/* Metrics Banner */}
      {project.metrics && (
        <div className="mt-4 p-3 rounded-xl bg-[#171a22] border border-[#282c38] flex items-center gap-2.5 text-xs text-emerald-400 font-mono">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          <span><strong className="text-slate-200">Outcome & Impact:</strong> {project.metrics}</span>
        </div>
      )}

      {/* Two-column layout for What I Did & Generative AI Breakdown */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* What I Did */}
        <div className="p-4 rounded-xl bg-[#0e1015] border border-[#1f222b]">
          <h4 className="text-xs font-semibold text-slate-200 uppercase font-mono tracking-wider flex items-center gap-2 mb-3">
            <Cpu className="w-3.5 h-3.5 text-indigo-400" />
            What I Did & Engineering Decisions
          </h4>
          <ul className="space-y-2">
            {project.whatIDid.map((item, idx) => (
              <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Generative AI Focus */}
        <div className="p-4 rounded-xl bg-[#0e1015] border border-[#1f222b]">
          <h4 className="text-xs font-semibold text-indigo-300 uppercase font-mono tracking-wider flex items-center gap-2 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Generative AI & LLM Components
          </h4>
          <ul className="space-y-2">
            {project.generativeAiAspects.map((item, idx) => (
              <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tech Stack Chips */}
      <div className="mt-5 pt-4 border-t border-[#1e212b] flex flex-wrap items-center gap-1.5">
        <span className="text-[11px] font-mono text-slate-400 mr-1">Stack:</span>
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-[#181b22] text-slate-300 border border-[#272b36]"
          >
            {tech}
          </span>
        ))}
      </div>
    </article>
  );
};
