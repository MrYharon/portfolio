import React from 'react';
import { ArrowUpRight, MessageSquare, Check } from 'lucide-react';
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
      className="scroll-mt-20 p-6 sm:p-7 rounded-2xl bg-white border border-neutral-200 transition-all hover:border-neutral-400"
    >
      {/* Header & Badges */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-800">
            {project.category}
          </span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 font-medium">
            {project.status}
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onAskAboutProject(project.title)}
            className="flex items-center gap-1.5 text-xs text-neutral-600 hover:text-black px-2.5 py-1.5 rounded-full hover:bg-neutral-100 transition-colors"
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
              className="p-1.5 text-neutral-600 hover:text-black hover:bg-neutral-100 rounded-full transition-colors"
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
              className="flex items-center gap-1 text-xs text-neutral-800 hover:text-black px-2.5 py-1.5 rounded-full hover:bg-neutral-100 transition-colors"
            >
              <span>View</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
            </a>
          )}
        </div>
      </div>

      {/* Project Title & Tagline */}
      <h3 className="text-xl font-semibold text-black">
        {project.title}
      </h3>
      <p className="mt-1 text-sm text-neutral-600 leading-relaxed">
        {project.tagline}
      </p>

      {/* Overview */}
      <p className="mt-3 text-sm text-neutral-500 leading-relaxed">
        {project.overview}
      </p>

      {/* Metrics or Note */}
      {project.metrics && (
        <div className="mt-4 p-3 rounded-xl bg-neutral-50 border border-neutral-100 text-xs text-neutral-700">
          <span className="font-semibold text-black">Key Metric:</span> {project.metrics}
        </div>
      )}

      {/* Highlights */}
      <div className="mt-5 p-4 rounded-xl bg-neutral-50 border border-neutral-100">
        <h4 className="text-xs font-semibold text-neutral-800 uppercase tracking-wider mb-2.5">
          Engineering Highlights & Implementation
        </h4>
        <ul className="space-y-1.5">
          {project.highlights.map((item, idx) => (
            <li key={idx} className="text-xs text-neutral-600 flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-black shrink-0 mt-0.5" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tech Stack Chips */}
      <div className="mt-5 pt-4 border-t border-neutral-100 flex flex-wrap items-center gap-1.5">
        <span className="text-xs text-neutral-400 mr-1 font-mono">Tech:</span>
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="text-xs px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-700"
          >
            {tech}
          </span>
        ))}
      </div>
    </article>
  );
};
