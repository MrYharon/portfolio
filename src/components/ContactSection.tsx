import React from 'react';
import { FileText, ArrowUpRight } from 'lucide-react';
import type { PortfolioData } from '../types/portfolio';
import { LinkedinIcon, GithubIcon } from './Icons';

interface ContactSectionProps {
  personal: PortfolioData['personal'];
}

export const ContactSection: React.FC<ContactSectionProps> = ({ personal }) => {
  return (
    <section id="contact" className="py-12 pb-24 scroll-mt-16">
      <h2 className="text-xl font-semibold text-black tracking-tight mb-2">
        Get in touch
      </h2>
      <p className="text-sm text-gray-600 mb-6 max-w-xl leading-relaxed">
        I am open to new opportunities, technical discussions, and full-time roles. Connect with me on LinkedIn or reach out via email.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* LinkedIn */}
        <a
          href={personal.linkedin}
          target="_blank"
          rel="noreferrer"
          className="p-4 rounded-2xl bg-white hover:bg-gray-50 border border-gray-200 transition-colors flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-black">
              <LinkedinIcon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Professional</p>
              <p className="text-sm font-medium text-black">LinkedIn</p>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
        </a>

        {/* GitHub */}
        <a
          href={personal.github}
          target="_blank"
          rel="noreferrer"
          className="p-4 rounded-2xl bg-white hover:bg-gray-50 border border-gray-200 transition-colors flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-black">
              <GithubIcon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Code</p>
              <p className="text-sm font-medium text-black">GitHub</p>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
        </a>

        {/* Resume */}
        <a
          href={personal.resumeUrl}
          className="p-4 rounded-2xl bg-white hover:bg-gray-50 border border-gray-200 transition-colors flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-black">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Document</p>
              <p className="text-sm font-medium text-black">Resume PDF</p>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
        </a>
      </div>

      <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
        <span>{personal.email}</span>
        <span>© {new Date().getFullYear()} {personal.name}</span>
      </div>
    </section>
  );
};
