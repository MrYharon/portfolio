import React, { useEffect, useState, useRef } from 'react';
import type { BlogPost } from '../types/portfolio';
import { X, ArrowLeft, Calendar, Clock, Share2, Check } from 'lucide-react';

interface BlogReaderModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export const BlogReaderModal: React.FC<BlogReaderModalProps> = ({ post, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const articleContainerRef = useRef<HTMLDivElement>(null);

  // Handle escape key and lock body scroll while modal is open
  useEffect(() => {
    if (!post) return;

    // Reset progress and copied state when opening new post
    setScrollProgress(0);
    setCopied(false);

    // Lock scrolling on the main page
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Keyboard navigation: Close on Escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup when modal unmounts or post changes to null
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [post, onClose]);

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

  // If no post is selected, render nothing
  if (!post) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/45 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        // Close if user clicks the dark backdrop outside the article card
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="animate-dialog-spring w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl border border-neutral-200/90 shadow-2xl flex flex-col overflow-hidden relative">
        {/* Top Header Bar with Live Reading Progress */}
        <div className="relative border-b border-neutral-100 bg-white/95 backdrop-blur-md shrink-0">
          <div className="flex items-center justify-between px-5 sm:px-7 py-3.5">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 text-xs font-medium text-neutral-600 hover:text-black transition-colors px-2.5 py-1.5 -ml-2 rounded-lg hover:bg-neutral-100 press-scale"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to portfolio</span>
            </button>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-neutral-600 hover:text-black rounded-lg hover:bg-neutral-100 transition-colors press-scale"
                title="Share article link"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-500 font-mono text-[11px]">Copied</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-neutral-400" />
                    <span className="hidden sm:inline text-neutral-600">Share</span>
                  </>
                )}
              </button>

              <button
                onClick={onClose}
                className="p-1.5 text-neutral-400 hover:text-black rounded-lg hover:bg-neutral-100 transition-colors press-scale"
                title="Close (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Reading Progress Line */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-neutral-100">
            <div
              className="h-full bg-black transition-all duration-150 ease-out"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </div>

        {/* Scrollable Article Body with Staggered Entrance */}
        <div
          ref={articleContainerRef}
          onScroll={handleScroll}
          className="overflow-y-auto p-6 sm:p-9 space-y-6"
        >
          <article className="animate-article-reveal space-y-6">
            {/* Metadata badges */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{post.date}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{post.readTime}</span>
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-black leading-snug">
              {post.title}
            </h1>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-700 border border-neutral-200/60"
                >
                  #{tag.toLowerCase().replace(/\s+/g, '')}
                </span>
              ))}
            </div>

            {/* Cover Image if present */}
            {post.coverImage && (
              <figure className="rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-100 shadow-xs group/cover">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full max-h-80 object-cover transition-transform duration-500 ease-out group-hover/cover:scale-[1.01]"
                  loading="lazy"
                />
                {post.coverCaption && (
                  <figcaption className="px-4 py-2.5 text-center text-xs font-mono text-neutral-500 bg-neutral-50 border-t border-neutral-100">
                    {post.coverCaption}
                  </figcaption>
                )}
              </figure>
            )}

            <div className="h-[1px] w-full bg-neutral-100 my-2" />

            {/* Paragraphs and Inline Photos */}
            <div className="space-y-4 text-sm sm:text-base text-neutral-700 leading-relaxed font-sans">
              {post.content.map((block, idx) => {
                // Support inline image syntax: "image: /blog/photo.png | Caption text"
                if (block.startsWith('image:')) {
                  const parts = block.replace('image:', '').split('|');
                  const imgUrl = parts[0].trim();
                  const caption = parts[1] ? parts[1].trim() : '';

                  return (
                    <figure key={idx} className="my-6 rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100 shadow-xs">
                      <img
                        src={imgUrl}
                        alt={caption || post.title}
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
            <div className="mt-8 pt-6 border-t border-neutral-100 text-xs font-mono text-neutral-400 flex items-center justify-between">
              <span>Written by Hugh Daeniel Dela Peña</span>
              <button
                onClick={onClose}
                className="text-black hover:underline press-scale font-medium"
              >
                Done reading ↑
              </button>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

