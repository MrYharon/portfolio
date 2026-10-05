import React from 'react';
import { Mail, ArrowUpRight } from 'lucide-react';
import type { PortfolioData } from '../types/portfolio';
import { LinkedinIcon, GithubIcon } from './Icons';

interface ContactSectionProps {
  personal: PortfolioData['personal'];
}

export const ContactSection: React.FC<ContactSectionProps> = ({ personal }) => {
  return (
    <section id="contact" className="py-12 pb-24 scroll-mt-16">
      <h2 className="text-xl font-semibold text-black tracking-tight mb-2">
        Connect & Reach Out
      </h2>
      <p className="text-sm text-neutral-600 mb-6 max-w-xl leading-relaxed">
        Got a question, idea for a project, or just want to chat about web dev and browser extensions? Drop me a line anytime.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* GitHub */}
        <a
          href={personal.github}
          target="_blank"
          rel="noreferrer"
          className="p-4 rounded-2xl bg-white hover:bg-neutral-50/80 border border-neutral-200 hover:border-neutral-300 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs flex items-center justify-between group press-scale"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-neutral-100 group-hover:bg-neutral-200/80 flex items-center justify-center text-black transition-colors">
              <GithubIcon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-neutral-400 font-mono">Repositories</p>
              <p className="text-sm font-medium text-black">GitHub</p>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-black transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>

        {/* LinkedIn */}
        <a
          href={personal.linkedin}
          target="_blank"
          rel="noreferrer"
          className="p-4 rounded-2xl bg-white hover:bg-neutral-50/80 border border-neutral-200 hover:border-neutral-300 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs flex items-center justify-between group press-scale"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-neutral-100 group-hover:bg-neutral-200/80 flex items-center justify-center text-black transition-colors">
              <LinkedinIcon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-neutral-400 font-mono">Network</p>
              <p className="text-sm font-medium text-black">LinkedIn</p>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-black transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>

        {/* Email */}
        <a
          href={`mailto:${personal.email}`}
          className="p-4 rounded-2xl bg-white hover:bg-neutral-50/80 border border-neutral-200 hover:border-neutral-300 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs flex items-center justify-between group press-scale"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-neutral-100 group-hover:bg-neutral-200/80 flex items-center justify-center text-black transition-colors">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-neutral-400 font-mono">Direct</p>
              <p className="text-sm font-medium text-black">Email</p>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-black transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>

      <div className="mt-8 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-400">
        <span>{personal.email}</span>
        <span>© {new Date().getFullYear()} {personal.name}</span>
      </div>
    </section>
  );
};
