import React from 'react';
import type { Experience } from '../types/portfolio';

interface ExperienceSectionProps {
  experience: Experience[];
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experience }) => {
  return (
    <section id="experience" className="py-12 border-b border-gray-100 scroll-mt-16">
      <h2 className="text-xl font-semibold text-gray-900 tracking-tight mb-4">
        Experience
      </h2>

      <div className="space-y-6">
        {experience.map((item, idx) => (
          <div
            key={idx}
            className="p-5 sm:p-6 rounded-2xl bg-white border border-gray-200"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
              <div>
                <h3 className="text-base font-semibold text-gray-900">{item.role}</h3>
                <p className="text-sm font-medium text-blue-600">{item.company}</p>
              </div>
              <span className="text-xs text-gray-500">{item.period}</span>
            </div>

            <ul className="mt-3 space-y-1.5">
              {item.description.map((bullet, bulletIdx) => (
                <li key={bulletIdx} className="text-xs sm:text-sm text-gray-600 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0" />
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
