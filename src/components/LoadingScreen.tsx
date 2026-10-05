import React, { useEffect, useState } from 'react';
import { HdLogo } from './HdLogo';

interface LoadingScreenProps {
  onFinish?: () => void;
  minDurationMs?: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onFinish,
  minDurationMs = 900,
}) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Smooth progress bar simulation
    const startTime = performance.now();

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / minDurationMs) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        // Start graceful fade out
        setIsFadingOut(true);
        setTimeout(() => {
          setIsDone(true);
          onFinish?.();
        }, 380);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [minDurationMs, onFinish]);

  if (isDone) return null;

  return (
    <div
      role="status"
      aria-label="Loading portfolio"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white transition-all duration-380 ease-out select-none ${
        isFadingOut ? 'opacity-0 scale-[1.02] pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      <div className="flex flex-col items-center justify-center space-y-6">
        {/* Animated HD Monogram Logo */}
        <div className="relative group">
          {/* Subtle ambient halo */}
          <div className="absolute -inset-4 bg-neutral-100/60 rounded-3xl blur-md -z-10 animate-gentle-pulse" />

          {/* Logo badge with spring entrance */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black text-white rounded-2xl flex items-center justify-center p-3.5 shadow-xl transition-transform duration-500 hover:scale-105">
            <HdLogo className="w-full h-full text-white" />
          </div>
        </div>

        {/* Minimalist Name & Tagline */}
        <div className="text-center space-y-1">
          <p className="font-semibold text-sm sm:text-base tracking-tight text-neutral-900">
            Hugh Daeniel Dela Peña
          </p>
          <p className="font-mono text-[10px] text-neutral-400 tracking-widest uppercase">
            Software Engineer & Builder
          </p>
        </div>

        {/* Minimal Progress Bar */}
        <div className="w-36 h-[2px] bg-neutral-100 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-black transition-all duration-75 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
