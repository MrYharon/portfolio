import React from 'react';
import { ArrowDown, Mail, MapPin } from 'lucide-react';
import type { PortfolioData } from '../types/portfolio';
import { LinkedinIcon, GithubIcon } from './Icons';

interface HeroProps {
  personal: PortfolioData['personal'];
  onExploreProjects: () => void;
}

export const Hero: React.FC<HeroProps> = ({ personal, onExploreProjects }) => {
  return (
    <section id="hero" className="pt-10 pb-16 border-b border-gray-100">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Profile Picture */}
        <div className="shrink-0">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center text-3xl font-normal text-gray-500 shadow-xs">
            H
          </div>
        </div>

        {/* Bio & Headlines */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-gray-900">
            Hello, I'm <span className="font-medium text-blue-600">{personal.name}</span>
          </h1>

          <p className="mt-2 text-base sm:text-lg text-gray-600 font-normal leading-relaxed max-w-2xl">
            {personal.headline}
          </p>

          <p className="mt-3 text-sm text-gray-500 max-w-2xl leading-relaxed">
            {personal.bio}
          </p>

          {/* Clean Location & Status */}
          <div className="mt-4 flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
              <MapPin className="w-3.5 h-3.5 text-gray-400" />
              {personal.location}
            </span>
            <span className="flex items-center gap-1.5 bg-green-50 px-3 py-1 rounded-full border border-green-200 text-green-700">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              {personal.availability}
            </span>
          </div>

          {/* Minimal Action Buttons */}
          <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-2.5">
            <button
              onClick={onExploreProjects}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
            >
              <span>View projects</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>

            <a
              href={personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-colors"
            >
              <LinkedinIcon className="w-3.5 h-3.5 text-[#0a66c2]" />
              <span>LinkedIn</span>
            </a>

            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5 text-gray-700" />
              <span>GitHub</span>
            </a>

            <a
              href="#contact"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-gray-600" />
              <span>Contact</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
