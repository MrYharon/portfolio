import React, { useEffect } from 'react';
import type { BlogPost } from '../types/portfolio';
import { X, ArrowLeft, Calendar, Clock } from 'lucide-react';

interface BlogReaderModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export const BlogReaderModal: React.FC<BlogReaderModalProps> = ({ post, onClose }) => {
  // Handle escape key and lock body scroll while modal is open
  useEffect(() => {
    if (!post) return;

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

  // If no post is selected, render nothing
  if (!post) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        // Close if user clicks the dark backdrop outside the article card
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl border border-neutral-200 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Modal Top Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-neutral-100 bg-white/80 backdrop-blur-xs shrink-0">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-medium text-neutral-600 hover:text-black transition-colors px-2 py-1 -ml-2 rounded-lg hover:bg-neutral-100"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to portfolio</span>
          </button>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-black rounded-lg hover:bg-neutral-100 transition-colors"
            title="Close (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Article Body */}
        <article className="p-6 sm:p-9 overflow-y-auto space-y-6">
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

          <div className="h-[1px] w-full bg-neutral-100 my-2" />

          {/* Paragraphs */}
          <div className="space-y-4 text-sm sm:text-base text-neutral-700 leading-relaxed font-sans">
            {post.content.map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Article Footer Note */}
          <div className="mt-8 pt-6 border-t border-neutral-100 text-xs font-mono text-neutral-400 flex items-center justify-between">
            <span>Written by Hugh Daeniel Dela Peña</span>
            <button
              onClick={onClose}
              className="text-black hover:underline"
            >
              Done reading ↑
            </button>
          </div>
        </article>
      </div>
    </div>
  );
};
