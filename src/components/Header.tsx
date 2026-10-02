import React from 'react';
import { Menu, Sparkles, FileText } from 'lucide-react';
import { LinkedinIcon } from './Icons';

interface HeaderProps {
  activeSection: string;
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeSection, onToggleSidebar }) => {
  const getSectionTitle = (id: string) => {
    switch (id) {
      case 'hero':
        return 'Overview';
      case 'about':
        return 'About Me';
      case 'skills':
        return 'Tech Stack & Skills';
      case 'experience':
        return 'Experience';
      case 'contact':
        return 'Contact';
      default:
        return 'Project Showcase';
    }
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8 py-3 bg-[#0d0f12]/90 backdrop-blur-md border-b border-[#26282e]">
      {/* Left: Mobile Toggle & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 -ml-2 text-slate-400 hover:text-slate-100 hover:bg-[#1a1c22] rounded-lg lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="text-slate-400 hidden sm:inline">hugh.dev</span>
          <span className="text-slate-400 hidden sm:inline">/</span>
          <span className="text-indigo-400 font-semibold flex items-center gap-1.5 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
            <Sparkles className="w-3 h-3 text-indigo-400" />
            {getSectionTitle(activeSection)}
          </span>
        </div>
      </div>

      {/* Right: Quick actions & social links */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-400 font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Available for Roles</span>
        </div>

        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-[#16181e] hover:bg-[#1f222a] border border-[#2b2e38] rounded-lg transition-all"
        >
          <LinkedinIcon className="w-3.5 h-3.5 text-[#0a66c2]" />
          <span className="hidden sm:inline">LinkedIn</span>
        </a>

        <a
          href="#contact"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm shadow-indigo-600/30 transition-all"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Resume</span>
        </a>
      </div>
    </header>
  );
};
