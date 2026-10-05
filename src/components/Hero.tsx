import React from 'react';
import { ArrowDown, Mail } from 'lucide-react';
import type { PortfolioData } from '../types/portfolio';
import { LinkedinIcon, GithubIcon } from './Icons';

interface HeroProps {
  personal: PortfolioData['personal'];
  onExploreProjects: () => void;
}

export const Hero: React.FC<HeroProps> = ({ personal, onExploreProjects }) => {
  return (
    <section id="hero" className="pt-12 pb-14 border-b border-neutral-100">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-7">
        {/* Minimal Avatar with subtle micro-scale hover */}
        <div className="shrink-0 group">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-neutral-100 border border-neutral-200/90 shadow-xs flex items-center justify-center transition-all duration-300 group-hover:border-neutral-400 group-hover:shadow-sm">
            <img
              src={personal.avatarUrl || '/profile.png'}
              alt={personal.name}
              className="w-full h-full object-cover scale-105 transition-transform duration-300 ease-out group-hover:scale-110"
            />
          </div>
        </div>

        {/* Bio & Headlines */}
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-500 bg-neutral-100/80 px-2 py-0.5 rounded-full border border-neutral-200/50">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-gentle-pulse" />
              <span>personal blog & log</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-black">
            {personal.name}
          </h1>

          <p className="mt-2 text-base sm:text-lg text-neutral-700 font-normal leading-relaxed max-w-2xl">
            {personal.headline}
          </p>

          <p className="mt-3 text-sm text-neutral-500 max-w-2xl leading-relaxed">
            {personal.blogIntro}
          </p>

          {/* Minimal Action Buttons with tactile press response */}
          <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-2">
            <button
              onClick={onExploreProjects}
              className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-black hover:bg-neutral-800 text-white text-xs font-medium press-scale shadow-xs"
            >
              <span>Explore projects</span>
              <ArrowDown className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-y-0.5" />
            </button>

            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-black text-xs font-medium press-scale border border-neutral-200/40"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            <a
              href={personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-black text-xs font-medium press-scale border border-neutral-200/40"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>

            <a
              href="#contact"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-black text-xs font-medium press-scale border border-neutral-200/40"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
