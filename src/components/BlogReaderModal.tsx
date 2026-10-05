import React, { useEffect, useState, useRef } from 'react';
import type { BlogPost } from '../types/portfolio';
import { X, ArrowLeft, Calendar, Clock, Share2, Check } from 'lucide-react';

interface BlogReaderModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export const BlogReaderModal: React.FC<BlogReaderModalProps> = ({ post, onClose }) => {
  const [activePost, setActivePost] = useState<BlogPost | null>(post);
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const articleContainerRef = useRef<HTMLDivElement>(null);
  const isClosingRef = useRef(false);

  // Sync prop changes with local state for smooth enter/exit animations
  useEffect(() => {
    if (post) {
      setActivePost(post);
      isClosingRef.current = false;
      setScrollProgress(0);
      setCopied(false);

      // Trigger enter animation on the next animation frame
      const timer = requestAnimationFrame(() => {
        setIsOpen(true);
      });

      // Prevent background scrolling while reader is open
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        cancelAnimationFrame(timer);
        document.body.style.overflow = originalOverflow;
      };
    } else {
      setIsOpen(false);
    }
  }, [post]);

  // Graceful exit transition handler
  const handleInitiateClose = () => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;
    setIsOpen(false);

    // Wait for the slide-out CSS animation (340ms) to complete before unmounting
    setTimeout(() => {
      onClose();
      setActivePost(null);
      isClosingRef.current = false;
    }, 340);
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
      className={`fixed inset-0 z-50 flex justify-end backdrop-fade ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Soft Dimming Backdrop */}
      <div
        className="fixed inset-0 bg-neutral-950/25 backdrop-blur-[2px]"
        onClick={handleInitiateClose}
      />

      {/* Slide-over Drawer Panel */}
      <div
        className={`relative z-10 w-full sm:max-w-2xl h-full bg-white shadow-2xl border-l border-neutral-200/90 flex flex-col drawer-slide ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Sticky Header Bar with Reading Progress */}
        <div className="relative border-b border-neutral-100 bg-white/95 backdrop-blur-md shrink-0">
          <div className="flex items-center justify-between px-5 sm:px-7 py-3.5">
            <button
              onClick={handleInitiateClose}
              className="flex items-center gap-2 text-xs font-medium text-neutral-600 hover:text-black transition-colors px-2.5 py-1.5 -ml-2 rounded-lg hover:bg-neutral-100 press-scale"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to portfolio</span>
              <kbd className="hidden sm:inline-block font-mono text-[10px] text-neutral-400 bg-neutral-100 border border-neutral-200/70 px-1.5 py-0.5 rounded">
                Esc
              </kbd>
            </button>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-neutral-600 hover:text-black rounded-lg hover:bg-neutral-100 transition-colors press-scale"
                title="Share article link"
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
                className="p-1.5 text-neutral-400 hover:text-black rounded-lg hover:bg-neutral-100 transition-colors press-scale"
                title="Close drawer (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Reading Progress Line */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-neutral-100">
            <div
              className="h-full bg-black transition-all duration-100 ease-out"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div
          ref={articleContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto px-6 py-8 sm:px-10 sm:py-10 space-y-7"
        >
          <article className="space-y-6 max-w-prose mx-auto">
            {/* Metadata badges */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-400">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{activePost.date}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{activePost.readTime}</span>
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 leading-snug">
              {activePost.title}
            </h1>

            {/* Tag Pills */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {activePost.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-700 border border-neutral-200/60"
                >
                  #{tag.toLowerCase().replace(/\s+/g, '')}
                </span>
              ))}
            </div>

            {/* Optional Cover Image */}
            {activePost.coverImage && (
              <figure className="rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-100 shadow-xs">
                <img
                  src={activePost.coverImage}
                  alt={activePost.title}
                  className="w-full max-h-80 object-cover"
                  loading="lazy"
                />
                {activePost.coverCaption && (
                  <figcaption className="px-4 py-2.5 text-center text-xs font-mono text-neutral-500 bg-neutral-50 border-t border-neutral-100">
                    {activePost.coverCaption}
                  </figcaption>
                )}
              </figure>
            )}

            <div className="h-[1px] w-full bg-neutral-100 my-4" />

            {/* Paragraphs and Inline Photos */}
            <div className="space-y-5 text-sm sm:text-base text-neutral-700 leading-relaxed font-sans">
              {activePost.content.map((block, idx) => {
                // Support inline image syntax: "image: /blog/photo.png | Caption text"
                if (block.startsWith('image:')) {
                  const parts = block.replace('image:', '').split('|');
                  const imgUrl = parts[0].trim();
                  const caption = parts[1] ? parts[1].trim() : '';

                  return (
                    <figure key={idx} className="my-6 rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100 shadow-xs">
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

            {/* Article Footer Note */}
            <div className="mt-12 pt-6 border-t border-neutral-100 text-xs font-mono text-neutral-400 flex items-center justify-between">
              <span>Hugh Daeniel Dela Peña</span>
              <button
                onClick={handleInitiateClose}
                className="text-neutral-900 hover:underline press-scale font-medium"
              >
                Back to portfolio ↑
              </button>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};
