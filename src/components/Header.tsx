import React from 'react';
import { Menu } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './Icons';

interface HeaderProps {
  activeSection: string;
  onToggleSidebar: () => void;
  linkedinUrl?: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onToggleSidebar,
  linkedinUrl = 'https://linkedin.com',
}) => {
  const getSectionTitle = (id: string) => {
    switch (id) {
      case 'hero':
        return 'Overview';
      case 'about':
        return 'About';
      case 'skills':
        return 'Stack';
      case 'contact':
        return 'Contact';
      default:
        return 'Projects';
    }
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-8 py-3.5 bg-white/90 backdrop-blur-md border-b border-neutral-100">
      {/* Left: Mobile Toggle & Minimal Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-1.5 -ml-1.5 text-neutral-600 hover:text-black hover:bg-neutral-100 rounded-lg lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        <span className="text-xs font-mono text-neutral-400">
          hugh / <span className="text-black font-sans font-medium">{getSectionTitle(activeSection)}</span>
        </span>
      </div>

      {/* Right: Clean minimal links */}
      <div className="flex items-center gap-2">
        <a
          href="https://github.com/MrYharon"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-600 hover:text-black hover:bg-neutral-100 rounded-full transition-colors"
        >
          <GithubIcon className="w-3.5 h-3.5" />
          <span>GitHub</span>
        </a>

        <a
          href={linkedinUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-600 hover:text-black hover:bg-neutral-100 rounded-full transition-colors"
        >
          <LinkedinIcon className="w-3.5 h-3.5" />
          <span>LinkedIn</span>
        </a>
      </div>
    </header>
  );
};
