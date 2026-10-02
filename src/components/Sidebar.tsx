import React from 'react';
import {
  Menu,
  Plus,
  MessageSquare,
  User,
  Cpu,
  Briefcase,
  Mail,
  FileText,
  PanelLeftClose,
} from 'lucide-react';
import type { Project } from '../types/portfolio';
import { LinkedinIcon, GithubIcon } from './Icons';

interface SidebarProps {
  projects: Project[];
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  projects,
  activeSection,
  onNavigate,
  isOpen,
  onToggle,
}) => {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-xs z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 flex flex-col bg-[#f0f4f9] border-r border-[#e1e6ed] transition-all duration-200 ease-in-out ${
          isOpen ? 'w-68 translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-18'
        }`}
      >
        {/* Top Header: Hamburger & Logo */}
        <div className="flex items-center justify-between px-4 h-16 shrink-0">
          <button
            onClick={onToggle}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-[#dde3ea] rounded-full transition-colors"
            title={isOpen ? 'Collapse Menu' : 'Expand Menu'}
          >
            <Menu className="w-5 h-5" />
          </button>

          {isOpen && (
            <span className="font-medium text-base text-gray-800 tracking-tight mr-auto ml-2">
              Hugh
            </span>
          )}

          {isOpen && (
            <button
              onClick={onToggle}
              className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-[#dde3ea] rounded-full lg:flex hidden transition-colors"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Gemini "+ New Chat" style button */}
        <div className="px-3 pt-1 pb-3">
          <button
            onClick={() => onNavigate('hero')}
            className={`flex items-center gap-3 w-full py-2.5 px-3.5 rounded-full bg-[#dde3ea] hover:bg-[#d0d7e2] text-gray-800 text-sm font-medium transition-colors ${
              !isOpen ? 'justify-center px-0' : ''
            }`}
            title="Go to Top / New Session"
          >
            <Plus className="w-4 h-4 text-gray-700 shrink-0" />
            {isOpen && <span className="truncate">New session</span>}
          </button>
        </div>

        {/* Navigation list (Gemini Recent style) */}
        <div className="flex-1 overflow-y-auto px-2 py-2 space-y-5">
          {/* Main sections */}
          <div>
            {isOpen && (
              <div className="px-3 mb-1.5 text-xs font-medium text-gray-500">
                Navigation
              </div>
            )}
            <div className="space-y-0.5">
              <button
                onClick={() => onNavigate('about')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-full text-sm text-left transition-colors ${
                  activeSection === 'about'
                    ? 'bg-[#d3e3fd] text-gray-900 font-medium'
                    : 'text-gray-700 hover:bg-[#dde3ea]'
                } ${!isOpen ? 'justify-center px-0' : ''}`}
                title="About"
              >
                <User className="w-4 h-4 shrink-0 text-gray-600" />
                {isOpen && <span className="truncate">About me</span>}
              </button>

              <button
                onClick={() => onNavigate('skills')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-full text-sm text-left transition-colors ${
                  activeSection === 'skills'
                    ? 'bg-[#d3e3fd] text-gray-900 font-medium'
                    : 'text-gray-700 hover:bg-[#dde3ea]'
                } ${!isOpen ? 'justify-center px-0' : ''}`}
                title="Skills"
              >
                <Cpu className="w-4 h-4 shrink-0 text-gray-600" />
                {isOpen && <span className="truncate">Skills & Stack</span>}
              </button>
            </div>
          </div>

          {/* Recent Projects (Like Gemini Recent chats) */}
          <div>
            {isOpen && (
              <div className="px-3 mb-1.5 text-xs font-medium text-gray-500">
                Recent projects
              </div>
            )}
            <div className="space-y-0.5">
              {projects.map((proj) => {
                const isActive = activeSection === proj.id;
                return (
                  <button
                    key={proj.id}
                    onClick={() => onNavigate(proj.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-full text-sm text-left transition-colors ${
                      isActive
                        ? 'bg-[#d3e3fd] text-gray-900 font-medium'
                        : 'text-gray-700 hover:bg-[#dde3ea]'
                    } ${!isOpen ? 'justify-center px-0' : ''}`}
                    title={proj.title}
                  >
                    <MessageSquare className="w-4 h-4 shrink-0 text-gray-500" />
                    {isOpen && <span className="truncate">{proj.title}</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Career & Contact */}
          <div>
            {isOpen && (
              <div className="px-3 mb-1.5 text-xs font-medium text-gray-500">
                Background
              </div>
            )}
            <div className="space-y-0.5">
              <button
                onClick={() => onNavigate('experience')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-full text-sm text-left transition-colors ${
                  activeSection === 'experience'
                    ? 'bg-[#d3e3fd] text-gray-900 font-medium'
                    : 'text-gray-700 hover:bg-[#dde3ea]'
                } ${!isOpen ? 'justify-center px-0' : ''}`}
                title="Experience"
              >
                <Briefcase className="w-4 h-4 shrink-0 text-gray-600" />
                {isOpen && <span className="truncate">Experience</span>}
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-full text-sm text-left transition-colors ${
                  activeSection === 'contact'
                    ? 'bg-[#d3e3fd] text-gray-900 font-medium'
                    : 'text-gray-700 hover:bg-[#dde3ea]'
                } ${!isOpen ? 'justify-center px-0' : ''}`}
                title="Contact"
              >
                <Mail className="w-4 h-4 shrink-0 text-gray-600" />
                {isOpen && <span className="truncate">Contact</span>}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Profile Bar */}
        <div className="p-3 border-t border-[#e1e6ed] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium shrink-0">
              H
            </div>

            {isOpen && (
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">Hugh</p>
                <p className="text-xs text-gray-500 truncate">Software Engineer</p>
              </div>
            )}
          </div>

          {isOpen && (
            <div className="mt-2.5 pt-2 border-t border-[#e1e6ed] flex items-center justify-around text-gray-600">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-1.5 hover:text-blue-600 hover:bg-[#dde3ea] rounded-full transition-colors"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/MrYharon"
                target="_blank"
                rel="noreferrer"
                className="p-1.5 hover:text-gray-900 hover:bg-[#dde3ea] rounded-full transition-colors"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="p-1.5 hover:text-gray-900 hover:bg-[#dde3ea] rounded-full transition-colors"
                title="Resume"
              >
                <FileText className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
