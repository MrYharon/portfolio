import React from 'react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-12 border-b border-neutral-100 scroll-mt-16">
      <h2 className="text-xl font-semibold text-black tracking-tight mb-4">
        About & Philosophy
      </h2>

      <div className="space-y-4 text-sm text-neutral-600 leading-relaxed max-w-3xl">
        <p>
          I am a software engineer and developer passionate about building lightweight, high-utility tools and extensions. I believe great software should be fast, respectful of user privacy, and built with minimal friction.
        </p>
        <p>
          Recently, a lot of my engineering time has gone into hacking on browser extensions (like <strong className="text-black font-semibold">Echo</strong>, a local-first real-time prompt quality coach) and exploring full-stack data engines (like <strong className="text-black font-semibold">CodeScout</strong> for tracking emerging open-source trends).
        </p>
        <p>
          When I'm building, I lean towards modern TypeScript, Python backends, and simple, durable architectures that solve everyday problems without unnecessary layers.
        </p>
      </div>
    </section>
  );
};
