import React from 'react';

export const TechIconMap: Record<string, React.FC<{ className?: string }>> = {
  react: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="-11.5 -10.23174 23 20.46348" fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="0" cy="0" r="2.05" fill="currentColor" stroke="none" />
      <g stroke="currentColor">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  ),
  nextjs: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 180 180" fill="none" stroke="currentColor">
      <circle cx="90" cy="90" r="85" strokeWidth="10" />
      <path d="M145 155 L75 55 H55 V125 H72 V78 L133 162" fill="currentColor" stroke="none" />
      <rect x="115" y="55" width="16" height="45" fill="currentColor" stroke="none" />
    </svg>
  ),
  typescript: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="2" width="20" height="20" rx="4" />
      <path d="M7 8h6M10 8v10" strokeLinecap="round" />
      <path d="M14 16c.8.6 1.8 1 2.8.8 1.2 0 2-.6 2-1.5 0-2.2-4-1.3-4-3.5 0-1 .8-1.8 2.2-1.8 1 0 1.8.3 2.5.8" strokeLinecap="round" />
    </svg>
  ),
  javascript: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="2" width="20" height="20" rx="4" />
      <path d="M8 12v4c0 1.1-.9 2-2 2H5" strokeLinecap="round" />
      <path d="M14 16c.8.6 1.8 1 2.8.8 1.2 0 2-.6 2-1.5 0-2.2-4-1.3-4-3.5 0-1 .8-1.8 2.2-1.8 1 0 1.8.3 2.5.8" strokeLinecap="round" />
    </svg>
  ),
  python: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C8 2 7 3.5 7 5.5V8h6V9H5.5C3.5 9 2 10.5 2 13.5s1.5 4.5 4 4.5h2V16c0-2 1.5-3.5 3.5-3.5h5V10c0-2-1.5-3.5-3.5-3.5H9V5.5C9 3.5 10.5 2 12 2z" />
      <circle cx="9.5" cy="5" r=".75" fill="currentColor" />
      <path d="M12 22c4 0 5-1.5 5-3.5V16h-6v-1h7.5c2 0 3.5-1.5 3.5-4.5s-1.5-4.5-4-4.5h-2V8c0 2-1.5 3.5-3.5 3.5h-5V14c0 2 1.5 3.5 3.5 3.5H15v1c0 2-1.5 3.5-3 3.5z" />
      <circle cx="14.5" cy="19" r=".75" fill="currentColor" />
    </svg>
  ),
  fastapi: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="10" />
      <path d="M13 3L7 14h5l-1 7 7-11h-5l1-7z" fill="currentColor" stroke="none" />
    </svg>
  ),
  nodejs: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L3 7.5v9L12 22l9-5.5v-9L12 2z" />
      <path d="M12 12v10M12 12L3 7.5M12 12l9-4.5" />
    </svg>
  ),
  tailwind: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 12c1-2 2.5-3 4.5-3 3 0 3.5 2.5 5 2.5 1.2 0 2.2-.8 3-2.5-1 2-2.5 3-4.5 3-3 0-3.5-2.5-5-2.5-1.2 0-2.2.8-3 2.5z" />
      <path d="M2 17c1-2 2.5-3 4.5-3 3 0 3.5 2.5 5 2.5 1.2 0 2.2-.8 3-2.5-1 2-2.5 3-4.5 3-3 0-3.5-2.5-5-2.5-1.2 0-2.2.8-3 2.5z" />
    </svg>
  ),
  docker: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 13h16c0 4-3 7-8 7s-8-3-8-7z" />
      <path d="M7 10h2v3H7zM10 10h2v3h-2zM13 10h2v3h-2zM10 7h2v3h-2zM13 7h2v3h-2zM16 10h2v3h-2z" fill="currentColor" stroke="none" />
      <circle cx="17.5" cy="15.5" r="0.75" fill="currentColor" />
    </svg>
  ),
  postgresql: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
      <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
    </svg>
  ),
  git: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="9" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <path d="M6 8.5v7M8.5 6L15.5 8M6 18c3-3 6.5-6.5 9.5-8" />
    </svg>
  ),
  chrome: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 8.5h7.5M8.5 14L4.7 7.5M15.5 14l-3.8 6.5" />
    </svg>
  ),
};
