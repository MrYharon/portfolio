import React from 'react';
import { Mail, FileText, Globe, ArrowUpRight } from 'lucide-react';
import type { PortfolioData } from '../types/portfolio';
import { LinkedinIcon, GithubIcon } from './Icons';

interface ContactSectionProps {
  personal: PortfolioData['personal'];
}

export const ContactSection: React.FC<ContactSectionProps> = ({ personal }) => {
  return (
    <section id="contact" className="py-12 pb-24 scroll-mt-20">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
          <Mail className="w-4 h-4 text-indigo-400" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Let's Connect</h2>
          <p className="text-xs text-slate-400 font-mono">Inquiries / Opportunities</p>
        </div>
      </div>

      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#13151c] to-[#0e1014] border border-[#262936] shadow-xl">
        <div className="max-w-2xl">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
            Ready to collaborate on Generative AI or Full-Stack projects?
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed mb-6">
            I am actively exploring full-time engineering positions and high-impact generative AI advisory or contracting.
            Feel free to connect on LinkedIn or reach out via email.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* LinkedIn Card */}
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-xl bg-[#171a23] hover:bg-[#1e222e] border border-[#282d3c] hover:border-indigo-500/50 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#0a66c2]/20 flex items-center justify-center text-[#0a66c2]">
                <LinkedinIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-mono text-slate-400">Professional</p>
                <p className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">
                  LinkedIn Profile
                </p>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
          </a>

          {/* GitHub Card */}
          <a
            href={personal.github}
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-xl bg-[#171a23] hover:bg-[#1e222e] border border-[#282d3c] hover:border-indigo-500/50 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-200">
                <GithubIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-mono text-slate-400">Codebase</p>
                <p className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">
                  GitHub / MrYharon
                </p>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
          </a>

          {/* Resume PDF Card */}
          <a
            href={personal.resumeUrl}
            className="p-4 rounded-xl bg-[#171a23] hover:bg-[#1e222e] border border-[#282d3c] hover:border-indigo-500/50 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-mono text-slate-400">Document</p>
                <p className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">
                  Resume (PDF)
                </p>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
          </a>
        </div>

        {/* Custom Domain Note */}
        <div className="mt-6 pt-5 border-t border-[#20232d] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-indigo-400" />
            <span>Custom Domain Ready</span>
          </div>
          <span className="text-slate-400">© {new Date().getFullYear()} Hugh</span>
        </div>
      </div>
    </section>
  );
};
