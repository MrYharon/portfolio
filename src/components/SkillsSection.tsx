import React from 'react';
import { Cpu, Sparkles, Layers, Database } from 'lucide-react';
import type { SkillCategory } from '../types/portfolio';

interface SkillsSectionProps {
  categories: SkillCategory[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ categories }) => {
  const getCategoryIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Sparkles className="w-4 h-4 text-indigo-400" />;
      case 1:
        return <Layers className="w-4 h-4 text-cyan-400" />;
      default:
        return <Database className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <section id="skills" className="py-12 border-b border-[#20232a] scroll-mt-20">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
          <Cpu className="w-4 h-4 text-indigo-400" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Technical Stack & Skills</h2>
          <p className="text-xs text-slate-400 font-mono">Specializations / Capabilities</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat, idx) => (
          <div
            key={cat.title}
            className="p-6 rounded-2xl bg-[#111318] border border-[#222530] hover:border-[#323645] transition-all"
          >
            <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-[#1f222d]">
              {getCategoryIcon(idx)}
              <h3 className="text-sm font-semibold text-slate-200 tracking-wide">{cat.title}</h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill) => (
                <span
                  key={skill.name}
                  className="text-xs font-mono px-3 py-1.5 rounded-lg bg-[#171922] text-slate-300 border border-[#262936] hover:border-indigo-500/40 hover:text-white transition-colors"
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
