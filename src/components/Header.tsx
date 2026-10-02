import React from 'react';
import { Menu, FileText } from 'lucide-react';
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
        return 'About';
      case 'skills':
        return 'Skills';
      case 'experience':
        return 'Experience';
      case 'contact':
        return 'Contact';
      default:
        return 'Projects';
    }
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-8 py-3.5 bg-white/90 backdrop-blur-xs border-b border-gray-100">
      {/* Left: Mobile Toggle & Minimal Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-1.5 -ml-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        <span className="text-sm font-medium text-gray-700">
          {getSectionTitle(activeSection)}
        </span>
      </div>

      {/* Right: Clean minimal links */}
      <div className="flex items-center gap-2">
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
        >
          <LinkedinIcon className="w-3.5 h-3.5 text-[#0a66c2]" />
          <span>LinkedIn</span>
        </a>

        <a
          href="#contact"
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-colors"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Resume</span>
        </a>
      </div>
    </header>
  );
};
