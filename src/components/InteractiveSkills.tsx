import React, { useState } from 'react';
import type { TechSkill } from '../types/portfolio';
import { TechIconMap } from './TechIcons';
import { Layers } from 'lucide-react';

interface InteractiveSkillsProps {
  skills: TechSkill[];
}

export const InteractiveSkills: React.FC<InteractiveSkillsProps> = ({ skills }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeSkill, setActiveSkill] = useState<TechSkill>(skills[0]);

  const categories = ['All', 'Frontend', 'Backend', 'Languages', 'Tools'];

  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter((s) => s.category === selectedCategory);

  return (
    <section id="skills" className="py-12 border-b border-gray-100 scroll-mt-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-black tracking-tight">
            Stack & Technologies
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Interactive overview of tools and frameworks I write code with
          </p>
        </div>

        {/* Filter categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                selectedCategory === cat
                  ? 'bg-black text-white font-medium'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Icon Grid */}
        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
          {filteredSkills.map((skill) => {
            const IconComponent = TechIconMap[skill.slug] || Layers;
            const isSelected = activeSkill.slug === skill.slug;

            return (
              <button
                key={skill.slug}
                onClick={() => setActiveSkill(skill)}
                onMouseEnter={() => setActiveSkill(skill)}
                className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-150 group relative ${
                  isSelected
                    ? 'border-black bg-neutral-900 text-white shadow-xs'
                    : 'border-gray-200 bg-white hover:border-gray-400 text-gray-800'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <span className={`p-2 rounded-xl transition-colors ${
                    isSelected ? 'bg-neutral-800 text-white' : 'bg-gray-100 text-black group-hover:bg-gray-200'
                  }`}>
                    <IconComponent className="w-5 h-5" />
                  </span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                    isSelected ? 'text-gray-400 bg-neutral-800' : 'text-gray-400 bg-gray-50'
                  }`}>
                    {skill.category}
                  </span>
                </div>

                <div>
                  <p className="text-xs font-semibold tracking-tight truncate">
                    {skill.name}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Live Detail Inspector */}
        <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center">
                {React.createElement(TechIconMap[activeSkill.slug] || Layers, { className: 'w-5 h-5' })}
              </div>
              <div>
                <h3 className="text-base font-semibold text-black">{activeSkill.name}</h3>
                <span className="text-xs text-gray-500 font-mono">{activeSkill.category}</span>
              </div>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed">
              {activeSkill.description}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200 text-xs text-gray-500">
            Click or hover any technology icon to view hands-on usage details.
          </div>
        </div>
      </div>
    </section>
  );
};
