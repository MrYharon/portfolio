import React from 'react';
import type { BlogPost } from '../types/portfolio';
import { ArrowUpRight, BookOpen } from 'lucide-react';

interface BlogSectionProps {
  posts: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ posts, onSelectPost }) => {
  return (
    <section id="writing" className="py-12 border-b border-neutral-100 scroll-mt-16">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-black tracking-tight flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-neutral-800" />
            <span>Writing & Journal</span>
          </h2>
          <p className="text-sm text-neutral-500 mt-1">
            Technical notes, design retrospectives, and engineering experiments.
          </p>
        </div>
      </div>

      {/* List of Blog Posts */}
      <div className="divide-y divide-neutral-100">
        {posts.map((post) => (
          <article
            key={post.id}
            onClick={() => onSelectPost(post)}
            className="group py-5 cursor-pointer flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 transition-colors hover:bg-neutral-50/70 rounded-2xl px-4 -mx-4"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[11px] font-mono text-neutral-400">
                  {post.date}
                </span>
                <span className="text-neutral-300">•</span>
                <span className="text-[11px] font-mono text-neutral-400">
                  {post.readTime}
                </span>
              </div>

              <h3 className="text-base font-medium text-neutral-900 group-hover:text-black flex items-center gap-1.5 transition-colors">
                <span>{post.title}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-black transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
              </h3>

              <p className="text-sm text-neutral-500 mt-1.5 line-clamp-2 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-600 border border-neutral-200/50"
                  >
                    #{tag.toLowerCase().replace(/\s+/g, '')}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
