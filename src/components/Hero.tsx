import { ArrowDown, Mail, Sparkles, MapPin, Terminal } from 'lucide-react';
import type { PortfolioData } from '../types/portfolio';
import { LinkedinIcon, GithubIcon } from './Icons';

interface HeroProps {
  personal: PortfolioData['personal'];
  onExploreProjects: () => void;
}

export const Hero: React.FC<HeroProps> = ({ personal, onExploreProjects }) => {
  return (
    <section id="hero" className="pt-8 pb-12 sm:pb-16 border-b border-[#20232a]">
      {/* Main Profile Info */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Profile Picture / Avatar */}
        <div className="relative group shrink-0">
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-500 opacity-60 blur-md group-hover:opacity-100 transition duration-500" />
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden bg-[#16181f] border-2 border-[#2c303c] p-1.5 shadow-2xl">
            <div className="w-full h-full rounded-2xl overflow-hidden bg-gradient-to-b from-slate-800 to-slate-950 flex flex-col items-center justify-center relative">
              {/* Photo placeholder or image */}
              <div className="w-20 h-20 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-3xl font-bold text-indigo-300 mb-1">
                H
              </div>
              <span className="text-[11px] font-mono text-slate-400">Photo Slot</span>
              <div className="absolute bottom-2 px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-[10px] text-emerald-300 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Ready
              </div>
            </div>
          </div>
        </div>

        {/* Bio & Headlines */}
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181b22] border border-[#262a34] text-xs text-indigo-400 mb-3 font-mono">
            <Terminal className="w-3.5 h-3.5" />
            <span>AI Engineer • Generative AI Specialist</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Hi, I'm <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">{personal.name}</span>
          </h1>

          <p className="mt-3 text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
            {personal.headline}
          </p>

          <p className="mt-2 text-sm text-slate-400 max-w-2xl leading-relaxed">
            {personal.bio}
          </p>

          {/* Metadata badges */}
          <div className="mt-4 flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5 bg-[#14161c] px-3 py-1.5 rounded-lg border border-[#222630]">
              <MapPin className="w-3.5 h-3.5 text-indigo-400" />
              {personal.location}
            </span>
            <span className="flex items-center gap-1.5 bg-[#14161c] px-3 py-1.5 rounded-lg border border-[#222630] text-emerald-400">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              {personal.availability}
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-3">
            <button
              onClick={onExploreProjects}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium shadow-lg shadow-indigo-600/30 transition-all hover:translate-y-[-1px]"
            >
              <span>Explore Projects</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </button>

            <a
              href={personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#161820] hover:bg-[#1f222d] border border-[#2c303c] text-slate-200 text-sm font-medium transition-all"
            >
              <LinkedinIcon className="w-4 h-4 text-[#0a66c2]" />
              <span>LinkedIn</span>
            </a>

            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#161820] hover:bg-[#1f222d] border border-[#2c303c] text-slate-200 text-sm font-medium transition-all"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>

            <a
              href="#contact"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#161820] hover:bg-[#1f222d] border border-[#2c303c] text-slate-200 text-sm font-medium transition-all"
            >
              <Mail className="w-4 h-4 text-purple-400" />
              <span>Contact</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
