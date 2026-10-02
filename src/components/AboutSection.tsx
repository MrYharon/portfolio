import React from 'react';
import type { PortfolioData } from '../types/portfolio';

interface AboutSectionProps {
  personal: PortfolioData['personal'];
}

export const AboutSection: React.FC<AboutSectionProps> = ({ personal }) => {
  return (
    <section id="about" className="py-12 border-b border-gray-100 scroll-mt-16">
      <h2 className="text-xl font-semibold text-black tracking-tight mb-4">
        About
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-3.5 text-sm text-gray-600 leading-relaxed">
          <p>
            I am a software engineer focused on building robust full-stack applications and integrating modern Generative AI capabilities. My work centers on building systems that bridge modern AI models with intuitive, reliable user experiences.
          </p>
          <p>
            From low-latency retrieval pipelines and agentic coordination workflows to responsive frontend interfaces, I prioritize clarity, high performance, and thoughtful engineering.
          </p>
          <p>
            Currently open to high-impact software engineering opportunities and technical collaborations.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 space-y-3 text-xs">
          <div>
            <span className="text-gray-400 block font-medium">Location</span>
            <span className="text-gray-800 font-medium">{personal.location}</span>
          </div>
          <div>
            <span className="text-gray-400 block font-medium">Focus</span>
            <span className="text-gray-800 font-medium">Full-Stack & Generative AI</span>
          </div>
          <div>
            <span className="text-gray-400 block font-medium">Availability</span>
            <span className="text-gray-800 font-medium">Open to opportunities</span>
          </div>
        </div>
      </div>
    </section>
  );
};
