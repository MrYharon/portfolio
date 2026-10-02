import React from 'react';
import { Briefcase, Calendar } from 'lucide-react';
import type { Experience } from '../types/portfolio';

interface ExperienceSectionProps {
  experience: Experience[];
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experience }) => {
  return (
    <section id="experience" className="py-12 border-b border-[#20232a] scroll-mt-20">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
          <Briefcase className="w-4 h-4 text-indigo-400" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Experience & Track Record</h2>
          <p className="text-xs text-slate-400 font-mono">Roles / Production Impact</p>
        </div>
      </div>

      <div className="space-y-6">
        {experience.map((item, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-[#111318] border border-[#222530] hover:border-[#2f3342] transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">{item.role}</h3>
                <p className="text-sm font-medium text-indigo-400">{item.company}</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{item.period}</span>
              </div>
            </div>

            <ul className="mt-4 space-y-2">
              {item.description.map((bullet, bulletIdx) => (
                <li key={bulletIdx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                  <span className="leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
