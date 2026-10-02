import React from 'react';
import type { SkillCategory } from '../types/portfolio';

interface SkillsSectionProps {
  categories: SkillCategory[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ categories }) => {
  return (
    <section id="skills" className="py-12 border-b border-gray-100 scroll-mt-16">
      <h2 className="text-xl font-semibold text-gray-900 tracking-tight mb-4">
        Skills & Technologies
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.title}
            className="p-5 rounded-2xl bg-white border border-gray-200"
          >
            <h3 className="text-sm font-medium text-gray-900 mb-3 pb-2 border-b border-gray-100">
              {cat.title}
            </h3>

            <div className="flex flex-wrap gap-1.5">
              {cat.skills.map((skill) => (
                <span
                  key={skill.name}
                  className="text-xs px-2.5 py-1 rounded-full bg-gray-50 border border-gray-200 text-gray-700"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
