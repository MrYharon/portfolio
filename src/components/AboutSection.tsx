import React from 'react';
import { User, Sparkles, BrainCircuit, Rocket } from 'lucide-react';
import type { PortfolioData } from '../types/portfolio';

interface AboutSectionProps {
  personal: PortfolioData['personal'];
}

export const AboutSection: React.FC<AboutSectionProps> = ({ personal }) => {
  return (
    <section id="about" className="py-12 border-b border-[#20232a] scroll-mt-20">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
          <User className="w-4 h-4 text-indigo-400" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">About & Background</h2>
          <p className="text-xs text-slate-400 font-mono">Overview / Engineering Philosophy</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main narrative */}
        <div className="md:col-span-2 space-y-4 text-sm text-slate-300 leading-relaxed bg-[#111318] p-6 rounded-2xl border border-[#222530]">
          <p>
            I am a software engineer driven by the transformative potential of <strong className="text-indigo-300">Generative AI and autonomous agent systems</strong>. With modern LLMs shifting from simple text completion into multi-step reasoning engines, my focus is designing architectures that turn models into reliable, production-grade applications.
          </p>
          <p>
            Whether implementing hybrid dense-sparse RAG pipelines with sub-second latency, constructing self-healing tool-calling swarms, or engineering intuitive full-stack interfaces, I obsess over end-user experience, hallucination mitigation, and robust system design.
          </p>
          <p className="text-slate-400">
            Currently refining my professional presence across LinkedIn and GitHub as I connect with visionary teams building the next era of AI products.
          </p>

          <div className="pt-4 border-t border-[#1e212b] grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div>
              <span className="text-[11px] font-mono text-slate-400 block">Location</span>
              <span className="text-xs font-medium text-slate-200">{personal.location}</span>
            </div>
            <div>
              <span className="text-[11px] font-mono text-slate-400 block">Focus</span>
              <span className="text-xs font-medium text-indigo-300">Generative AI & LLMs</span>
            </div>
            <div>
              <span className="text-[11px] font-mono text-slate-400 block">Status</span>
              <span className="text-xs font-medium text-emerald-400">Open to Opportunities</span>
            </div>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-[#111318] border border-[#222530] hover:border-indigo-500/30 transition-colors">
            <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-200 mb-1.5">
              <BrainCircuit className="w-4 h-4 text-indigo-400" />
              <span>Agentic Architectures</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Implementing multi-agent task loops, tool-calling pipelines, and autonomous planning mechanisms.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#111318] border border-[#222530] hover:border-indigo-500/30 transition-colors">
            <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-200 mb-1.5">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Grounded Knowledge</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Building contextual RAG workflows with semantic reranking and strict citation verification.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#111318] border border-[#222530] hover:border-indigo-500/30 transition-colors">
            <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-200 mb-1.5">
              <Rocket className="w-4 h-4 text-emerald-400" />
              <span>Full-Stack Polish</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Bridging high-performance backend inference with reactive modern web user experiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
