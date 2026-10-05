import React, { useEffect, useState, useRef } from 'react';
import type { BlogPost } from '../types/portfolio';
import { X, ArrowLeft, Calendar, Clock, Share2, Check, FileText, ChevronRight } from 'lucide-react';

interface BlogReaderModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export const BlogReaderModal: React.FC<BlogReaderModalProps> = ({ post, onClose }) => {
  const [activePost, setActivePost] = useState<BlogPost | null>(post);
  const [isClosing, setIsClosing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const articleContainerRef = useRef<HTMLDivElement>(null);
  const isClosingRef = useRef(false);

  // Sync prop changes with activePost state
  useEffect(() => {
    if (post) {
      setActivePost(post);
      setIsClosing(false);
      isClosingRef.current = false;
      setScrollProgress(0);
      setCopied(false);

      // Lock main document scroll while Side Peak is open
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [post]);

  // Graceful exit transition (220ms matches notion-peak-exit)
  const handleInitiateClose = () => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;
    setIsClosing(true);

    setTimeout(() => {
      onClose();
      setActivePost(null);
      setIsClosing(false);
      isClosingRef.current = false;
    }, 220);
  };

  // Keyboard navigation: Close on Escape key
  useEffect(() => {
    if (!activePost) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleInitiateClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePost]);

  const handleScroll = () => {
    const el = articleContainerRef.current;
    if (!el) return;
    const totalScroll = el.scrollHeight - el.clientHeight;
    if (totalScroll > 0) {
      const current = (el.scrollTop / totalScroll) * 100;
      setScrollProgress(Math.min(100, Math.max(0, current)));
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  if (!activePost) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={activePost.title}
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Notion Lightweight Dimming Backdrop (Pure alpha, zero blur lag) */}
      <div
        className={`fixed inset-0 bg-black/25 ${
          isClosing ? 'notion-backdrop-exit' : 'notion-backdrop-enter'
        }`}
        onClick={handleInitiateClose}
      />

      {/* Notion Side Peak Panel (Hardware GPU Accelerated) */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full sm:w-[680px] lg:w-[740px] xl:w-[780px] bg-white border-l border-neutral-200 shadow-[-12px_0_36px_rgba(0,0,0,0.08)] flex flex-col ${
          isClosing ? 'notion-peak-exit' : 'notion-peak-enter'
        }`}
      >
        {/* Notion Minimalist Sticky Top Navigation Bar */}
        <div className="relative border-b border-neutral-100 bg-white/95 backdrop-blur-xs shrink-0 z-10">
          <div className="flex items-center justify-between px-4 sm:px-6 py-2.5">
            {/* Left: Notion-style Breadcrumb / Back button */}
            <div className="flex items-center gap-1.5 text-xs text-neutral-500">
              <button
                onClick={handleInitiateClose}
                className="flex items-center gap-1.5 px-2 py-1 -ml-1.5 text-neutral-600 hover:text-black hover:bg-neutral-100 rounded-md transition-colors font-medium press-scale"
                title="Close side peak (Esc)"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Writing</span>
              </button>
              <ChevronRight className="w-3 h-3 text-neutral-300" />
              <span className="font-mono text-[11px] text-neutral-400 hidden sm:inline truncate max-w-[200px]">
                {activePost.title}
              </span>
              <kbd className="hidden md:inline-block font-mono text-[10px] text-neutral-400 bg-neutral-100 border border-neutral-200 px-1 py-0.5 rounded ml-1">
                Esc
              </kbd>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-neutral-600 hover:text-black rounded-md hover:bg-neutral-100 transition-colors press-scale"
                title="Copy link to article"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-neutral-900" />
                    <span className="text-neutral-900 font-mono text-[11px]">Copied</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-neutral-400" />
                    <span className="hidden sm:inline text-neutral-600">Share</span>
                  </>
                )}
              </button>

              <button
                onClick={handleInitiateClose}
                className="p-1.5 text-neutral-400 hover:text-black rounded-md hover:bg-neutral-100 transition-colors press-scale"
                title="Close (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Reading Progress Line */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-neutral-100">
            <div
              className="h-full bg-black transition-all duration-75 ease-out"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </div>

        {/* Notion Document Body */}
        <div
          ref={articleContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto px-6 sm:px-12 lg:px-16 py-8 space-y-6"
        >
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Notion Page Icon */}
            <div className="w-10 h-10 rounded-lg bg-neutral-100 border border-neutral-200/80 flex items-center justify-center text-neutral-700 shadow-2xs">
              <FileText className="w-5 h-5" />
            </div>

            {/* Page Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-950 leading-tight">
              {activePost.title}
            </h1>

            {/* Notion Database-Style Properties Grid */}
            <div className="space-y-2 py-3 border-y border-neutral-100 text-xs font-sans">
              <div className="flex items-center gap-4">
                <span className="w-24 text-neutral-400 flex items-center gap-1.5 shrink-0">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Date</span>
                </span>
                <span className="text-neutral-800 font-mono text-[11px]">
                  {activePost.date}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="w-24 text-neutral-400 flex items-center gap-1.5 shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Read time</span>
                </span>
                <span className="text-neutral-800 font-mono text-[11px]">
                  {activePost.readTime}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="w-24 text-neutral-400 flex items-center gap-1.5 shrink-0">
                  <span className="w-3.5 h-3.5 text-center font-mono text-neutral-400">#</span>
                  <span>Tags</span>
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {activePost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-700 border border-neutral-200/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Optional Cover Image */}
            {activePost.coverImage && (
              <figure className="rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100 my-4 shadow-2xs">
                <img
                  src={activePost.coverImage}
                  alt={activePost.title}
                  className="w-full max-h-80 object-cover"
                  loading="lazy"
                />
                {activePost.coverCaption && (
                  <figcaption className="px-4 py-2 text-center text-xs font-mono text-neutral-500 bg-neutral-50 border-t border-neutral-100">
                    {activePost.coverCaption}
                  </figcaption>
                )}
              </figure>
            )}

            {/* Notion Article Paragraphs */}
            <div className="space-y-4 text-[15px] sm:text-base text-neutral-800 leading-relaxed font-sans pt-2">
              {activePost.content.map((block, idx) => {
                // Inline image syntax
                if (block.startsWith('image:')) {
                  const parts = block.replace('image:', '').split('|');
                  const imgUrl = parts[0].trim();
                  const caption = parts[1] ? parts[1].trim() : '';

                  return (
                    <figure key={idx} className="my-6 rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100 shadow-2xs">
                      <img
                        src={imgUrl}
                        alt={caption || activePost.title}
                        className="w-full object-cover max-h-96"
                        loading="lazy"
                      />
                      {caption && (
                        <figcaption className="px-4 py-2 text-center text-xs font-mono text-neutral-500 bg-neutral-50 border-t border-neutral-100">
                          {caption}
                        </figcaption>
                      )}
                    </figure>
                  );
                }

                return (
                  <p key={idx} className="leading-relaxed">
                    {block}
                  </p>
                );
              })}
            </div>

            {/* Notion Page Footer */}
            <div className="mt-14 pt-6 border-t border-neutral-100 text-xs font-mono text-neutral-400 flex items-center justify-between">
              <span>Hugh Daeniel Dela Peña</span>
              <button
                onClick={handleInitiateClose}
                className="text-neutral-900 hover:underline press-scale font-medium"
              >
                Close side peak ↑
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
