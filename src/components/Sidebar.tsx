import React from 'react';
import {
  Menu,
  Plus,
  Bookmark,
  User,
  Cpu,
  Mail,
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
  linkedinUrl?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  projects,
  activeSection,
  onNavigate,
  isOpen,
  onToggle,
  linkedinUrl = 'https://linkedin.com',
}) => {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-xs z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 flex flex-col bg-white border-r border-neutral-100 transition-all duration-200 ease-in-out ${
          isOpen ? 'w-68 translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-18'
        }`}
      >
        {/* Top Header: Hamburger & Logo */}
        <div className="flex items-center justify-between px-4 h-16 shrink-0 border-b border-neutral-100">
          <button
            onClick={onToggle}
            className="p-2 text-neutral-600 hover:text-black hover:bg-neutral-100 rounded-full transition-colors"
            title={isOpen ? 'Collapse Menu' : 'Expand Menu'}
          >
            <Menu className="w-5 h-5" />
          </button>

          {isOpen && (
            <div className="mr-auto ml-2 flex items-center gap-2">
              <span className="font-semibold text-base text-black tracking-tight">
                Hugh
              </span>
              <span className="text-[10px] font-mono text-neutral-400 bg-neutral-100 px-1.5 py-0.5 rounded">
                blog
              </span>
            </div>
          )}

          {isOpen && (
            <button
              onClick={onToggle}
              className="p-1.5 text-neutral-400 hover:text-black hover:bg-neutral-100 rounded-full lg:flex hidden transition-colors"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Top Quick Action */}
        <div className="px-3 pt-3 pb-2">
          <button
            onClick={() => onNavigate('hero')}
            className={`flex items-center gap-3 w-full py-2 px-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/60 text-black text-xs font-medium transition-colors ${
              !isOpen ? 'justify-center px-0' : ''
            }`}
            title="Overview / Top"
          >
            <Plus className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
            {isOpen && <span className="truncate">Top of page</span>}
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-2 py-2 space-y-5">
          {/* Main sections */}
          <div>
            {isOpen && (
              <div className="px-3 mb-1.5 text-[11px] font-medium text-neutral-400 uppercase tracking-wider">
                Index
              </div>
            )}
            <div className="space-y-0.5">
              <button
                onClick={() => onNavigate('about')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-left transition-colors ${
                  activeSection === 'about'
                    ? 'bg-neutral-100 text-black font-semibold'
                    : 'text-neutral-600 hover:bg-neutral-50 hover:text-black'
                } ${!isOpen ? 'justify-center px-0' : ''}`}
                title="About"
              >
                <User className="w-4 h-4 shrink-0 text-neutral-500" />
                {isOpen && <span className="truncate">About</span>}
              </button>

              <button
                onClick={() => onNavigate('skills')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-left transition-colors ${
                  activeSection === 'skills'
                    ? 'bg-neutral-100 text-black font-semibold'
                    : 'text-neutral-600 hover:bg-neutral-50 hover:text-black'
                } ${!isOpen ? 'justify-center px-0' : ''}`}
                title="Stack"
              >
                <Cpu className="w-4 h-4 shrink-0 text-neutral-500" />
                {isOpen && <span className="truncate">Stack & Tools</span>}
              </button>
            </div>
          </div>

          {/* Real Featured Projects */}
          <div>
            {isOpen && (
              <div className="px-3 mb-1.5 text-[11px] font-medium text-neutral-400 uppercase tracking-wider">
                Projects
              </div>
            )}
            <div className="space-y-0.5">
              {projects.map((proj) => {
                const isActive = activeSection === proj.id;
                return (
                  <button
                    key={proj.id}
                    onClick={() => onNavigate(proj.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-left transition-colors ${
                      isActive
                        ? 'bg-neutral-100 text-black font-semibold'
                        : 'text-neutral-600 hover:bg-neutral-50 hover:text-black'
                    } ${!isOpen ? 'justify-center px-0' : ''}`}
                    title={proj.title}
                  >
                    <Bookmark className="w-3.5 h-3.5 shrink-0 text-neutral-400" />
                    {isOpen && <span className="truncate">{proj.title}</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Contact */}
          <div>
            {isOpen && (
              <div className="px-3 mb-1.5 text-[11px] font-medium text-neutral-400 uppercase tracking-wider">
                Connect
              </div>
            )}
            <div className="space-y-0.5">
              <button
                onClick={() => onNavigate('contact')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-left transition-colors ${
                  activeSection === 'contact'
                    ? 'bg-neutral-100 text-black font-semibold'
                    : 'text-neutral-600 hover:bg-neutral-50 hover:text-black'
                } ${!isOpen ? 'justify-center px-0' : ''}`}
                title="Contact"
              >
                <Mail className="w-4 h-4 shrink-0 text-neutral-500" />
                {isOpen && <span className="truncate">Contact</span>}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Profile Bar */}
        <div className="p-3 border-t border-neutral-100 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-neutral-100 border border-neutral-200 shrink-0 flex items-center justify-center">
              <img
                src="/profile.png"
                alt="Hugh"
                className="w-full h-full object-cover scale-105"
              />
            </div>

            {isOpen && (
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-black truncate">Hugh</p>
                <p className="text-[11px] text-neutral-400 truncate">Builder & Engineer</p>
              </div>
            )}
          </div>

          {isOpen && (
            <div className="mt-2.5 pt-2 border-t border-neutral-100 flex items-center justify-around text-neutral-600">
              <a
                href="https://github.com/MrYharon"
                target="_blank"
                rel="noreferrer"
                className="p-1 hover:text-black hover:bg-neutral-100 rounded-lg transition-colors"
                title="GitHub"
              >
                <GithubIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="p-1 hover:text-black hover:bg-neutral-100 rounded-lg transition-colors"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
