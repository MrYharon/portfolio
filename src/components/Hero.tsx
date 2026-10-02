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
        {/* Minimal Avatar */}
        <div className="shrink-0">
          <img
            src={personal.avatarUrl || '/profile.png'}
            alt={personal.name}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border border-neutral-200 shadow-xs"
          />
        </div>

        {/* Bio & Headlines */}
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <span className="text-xs font-mono text-neutral-400">personal blog & log</span>
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

          {/* Minimal Action Buttons */}
          <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-2">
            <button
              onClick={onExploreProjects}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black hover:bg-neutral-800 text-white text-xs font-medium transition-colors"
            >
              <span>Explore projects</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>

            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-black text-xs font-medium transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            <a
              href={personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-black text-xs font-medium transition-colors"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>

            <a
              href="#contact"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-black text-xs font-medium transition-colors"
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
