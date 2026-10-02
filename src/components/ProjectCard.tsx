import React from 'react';
import { ArrowUpRight, MessageSquare } from 'lucide-react';
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
      className="scroll-mt-20 p-6 sm:p-7 rounded-2xl bg-white border border-gray-200 transition-all hover:border-gray-300"
    >
      {/* Header & Badges */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">
            {project.category}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium">
            {project.status}
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onAskAboutProject(project.title)}
            className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-900 px-2.5 py-1.5 rounded-full hover:bg-gray-100 transition-colors"
            title="Ask about this project"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Ask</span>
          </button>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
              title="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          )}

          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-xs text-gray-700 hover:text-gray-900 px-2.5 py-1.5 rounded-full hover:bg-gray-100 transition-colors"
            >
              <span>Demo</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-gray-500" />
            </a>
          )}
        </div>
      </div>

      {/* Project Title & Tagline */}
      <h3 className="text-xl font-semibold text-gray-900">
        {project.title}
      </h3>
      <p className="mt-1 text-sm text-gray-600 leading-relaxed">
        {project.tagline}
      </p>

      {/* Overview */}
      <p className="mt-3 text-sm text-gray-500 leading-relaxed">
        {project.overview}
      </p>

      {/* Metrics */}
      {project.metrics && (
        <div className="mt-4 p-3 rounded-xl bg-gray-50 border border-gray-100 text-xs text-gray-700">
          <span className="font-medium text-gray-900">Outcome:</span> {project.metrics}
        </div>
      )}

      {/* Implementation Details */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* What I Did */}
        <div className="p-4 rounded-xl bg-[#f8fafd] border border-[#e5e9f0]">
          <h4 className="text-xs font-semibold text-gray-800 uppercase tracking-wider mb-2.5">
            Key Contributions
          </h4>
          <ul className="space-y-1.5">
            {project.whatIDid.map((item, idx) => (
              <li key={idx} className="text-xs text-gray-600 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Generative AI Elements */}
        <div className="p-4 rounded-xl bg-[#f8fafd] border border-[#e5e9f0]">
          <h4 className="text-xs font-semibold text-gray-800 uppercase tracking-wider mb-2.5">
            AI & Engineering Decisions
          </h4>
          <ul className="space-y-1.5">
            {project.generativeAiAspects.map((item, idx) => (
              <li key={idx} className="text-xs text-gray-600 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tech Stack Chips */}
      <div className="mt-5 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-1.5">
        <span className="text-xs text-gray-400 mr-1">Stack:</span>
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="text-xs px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600"
          >
            {tech}
          </span>
        ))}
      </div>
    </article>
  );
};
