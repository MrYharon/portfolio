import React from 'react';

interface HdLogoProps {
  className?: string;
  size?: number;
  variant?: 'monochrome' | 'badge';
}

export const HdLogo: React.FC<HdLogoProps> = ({
  className = 'w-6 h-6 text-black',
  size,
  variant = 'monochrome',
}) => {
  const pathD =
    'M 0.0 2.0 L 45.2 2.0 L 45.2 107.4 L 118.5 107.4 L 118.5 0.0 L 163.7 0.0 L 272.0 43.1 L 268.0 219.7 L 163.7 273.0 L 118.5 273.0 L 118.5 154.5 L 45.2 154.5 L 45.2 274.0 L 0.0 274.0 Z M 164.7 53.2 L 222.9 76.3 L 220.9 189.6 L 164.7 217.7 Z';

  if (variant === 'badge') {
    return (
      <div
        className={`bg-black text-white rounded-xl flex items-center justify-center shadow-xs p-1.5 shrink-0 ${className}`}
        style={size ? { width: size, height: size } : undefined}
      >
        <svg
          viewBox="0 0 272 274"
          fill="currentColor"
          className="w-full h-full"
          aria-label="Hugh Daeniel Logo"
        >
          <path d={pathD} fillRule="evenodd" />
        </svg>
      </div>
    );
  }

  return (
    <svg
      viewBox="0 0 272 274"
      fill="currentColor"
      className={`shrink-0 ${className}`}
      style={size ? { width: size, height: size } : undefined}
      aria-label="Hugh Daeniel Logo"
    >
      <path d={pathD} fillRule="evenodd" />
    </svg>
  );
};
