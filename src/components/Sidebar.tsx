import React from 'react';
import {
  Sparkles,
  PlusCircle,
  FolderGit2,
  User,
  Cpu,
  Briefcase,
  Mail,
  FileText,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronRight,
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
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 flex flex-col bg-[#111317] border-r border-[#26282e] transition-all duration-300 ease-in-out ${
          isOpen ? 'w-72 translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-20'
        }`}
      >
        {/* Workspace Brand / Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#26282e]/80">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-500 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            {isOpen && (
              <div className="min-w-0">
                <h1 className="font-semibold text-sm text-slate-100 truncate tracking-wide flex items-center gap-1.5">
                  Hugh <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 font-mono">PORTFOLIO</span>
                </h1>
                <p className="text-xs text-slate-400 truncate">Software Engineer</p>
              </div>
            )}
          </div>

          <button
            onClick={onToggle}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-[#1e2026] rounded-lg transition-colors"
            title={isOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
          >
            {isOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
          </button>
        </div>

        {/* Action Button: Reset / New Session */}
        <div className="p-3">
          <button
            onClick={() => onNavigate('hero')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-[#2b2d35] bg-[#181a20] hover:bg-[#20232b] text-slate-200 text-xs font-medium transition-all shadow-sm group ${
              !isOpen ? 'justify-center px-0' : ''
            }`}
          >
            <PlusCircle className="w-4 h-4 text-indigo-400 group-hover:rotate-90 transition-transform duration-300 shrink-0" />
            {isOpen && <span>New Session / Top</span>}
          </button>
        </div>

        {/* Navigation / Table of Contents */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-6">
          {/* Main Navigation */}
          <div>
            {isOpen && (
              <div className="px-2 mb-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase font-mono">
                Overview & Bio
              </div>
            )}
            <div className="space-y-1">
              <button
                onClick={() => onNavigate('about')}
                className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-xs transition-colors ${
                  activeSection === 'about'
                    ? 'bg-indigo-600/20 text-indigo-300 font-medium border border-indigo-500/30'
                    : 'text-slate-300 hover:bg-[#1a1c22] hover:text-white'
                } ${!isOpen ? 'justify-center' : ''}`}
                title="About Hugh"
              >
                <User className="w-4 h-4 shrink-0 text-slate-400" />
                {isOpen && <span className="truncate">About & Introduction</span>}
              </button>

              <button
                onClick={() => onNavigate('skills')}
                className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-xs transition-colors ${
                  activeSection === 'skills'
                    ? 'bg-indigo-600/20 text-indigo-300 font-medium border border-indigo-500/30'
                    : 'text-slate-300 hover:bg-[#1a1c22] hover:text-white'
                } ${!isOpen ? 'justify-center' : ''}`}
                title="Tech Stack & Skills"
              >
                <Cpu className="w-4 h-4 shrink-0 text-slate-400" />
                {isOpen && <span className="truncate">Skills & Core Stack</span>}
              </button>
            </div>
          </div>

          {/* Generative AI Projects as Table of Contents */}
          <div>
            {isOpen && (
              <div className="flex items-center justify-between px-2 mb-2">
                <span className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase font-mono">
                  Featured Projects
                </span>
                <span className="text-[10px] text-indigo-400/80 bg-indigo-500/10 px-1.5 py-0.5 rounded-full font-mono">
                  {projects.length}
                </span>
              </div>
            )}

            <div className="space-y-1">
              {projects.map((proj) => {
                const isActive = activeSection === proj.id;
                return (
                  <button
                    key={proj.id}
                    onClick={() => onNavigate(proj.id)}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs text-left transition-all group ${
                      isActive
                        ? 'bg-[#1e2330] text-indigo-300 border border-indigo-500/40 shadow-sm'
                        : 'text-slate-300 hover:bg-[#171a21] hover:text-slate-100'
                    } ${!isOpen ? 'justify-center' : ''}`}
                    title={proj.title}
                  >
                    <FolderGit2
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-indigo-400'
                      }`}
                    />
                    {isOpen && (
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium">{proj.title}</p>
                        <p className="text-[10px] text-slate-400 truncate">{proj.category}</p>
                      </div>
                    )}
                    {isOpen && isActive && <ChevronRight className="w-3.5 h-3.5 text-indigo-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Experience & Contact */}
          <div>
            {isOpen && (
              <div className="px-2 mb-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase font-mono">
                Career & Connect
              </div>
            )}
            <div className="space-y-1">
              <button
                onClick={() => onNavigate('experience')}
                className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-xs transition-colors ${
                  activeSection === 'experience'
                    ? 'bg-indigo-600/20 text-indigo-300 font-medium border border-indigo-500/30'
                    : 'text-slate-300 hover:bg-[#1a1c22] hover:text-white'
                } ${!isOpen ? 'justify-center' : ''}`}
                title="Experience"
              >
                <Briefcase className="w-4 h-4 shrink-0 text-slate-400" />
                {isOpen && <span className="truncate">Experience & Milestones</span>}
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-xs transition-colors ${
                  activeSection === 'contact'
                    ? 'bg-indigo-600/20 text-indigo-300 font-medium border border-indigo-500/30'
                    : 'text-slate-300 hover:bg-[#1a1c22] hover:text-white'
                } ${!isOpen ? 'justify-center' : ''}`}
                title="Contact"
              >
                <Mail className="w-4 h-4 shrink-0 text-slate-400" />
                {isOpen && <span className="truncate">Get in Touch</span>}
              </button>
            </div>
          </div>
        </div>

        {/* User Profile & Model Status Bar */}
        <div className="p-3 border-t border-[#26282e] bg-[#0e1014]">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-emerald-400 p-0.5 shrink-0">
                <div className="w-full h-full rounded-full bg-[#111317] flex items-center justify-center font-bold text-xs text-white">
                  H
                </div>
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#0e1014]" />
            </div>

            {isOpen && (
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-slate-100 truncate">Hugh</p>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Active
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 truncate">Software Engineer</p>
              </div>
            )}
          </div>

          {isOpen && (
            <div className="mt-3 pt-2 border-t border-[#26282e]/60 flex items-center justify-around text-slate-400">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-1.5 hover:text-indigo-400 hover:bg-[#1c1f26] rounded transition-colors"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/MrYharon"
                target="_blank"
                rel="noreferrer"
                className="p-1.5 hover:text-indigo-400 hover:bg-[#1c1f26] rounded transition-colors"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="p-1.5 hover:text-indigo-400 hover:bg-[#1c1f26] rounded transition-colors"
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
