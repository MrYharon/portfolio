import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, X, ArrowRight } from 'lucide-react';
import type { PortfolioData } from '../types/portfolio';

interface ChatInputProps {
  portfolioData: PortfolioData;
  onNavigate: (sectionId: string) => void;
  initialPrompt?: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  action?: {
    label: string;
    sectionId: string;
  };
}

export const ChatInput: React.FC<ChatInputProps> = ({ portfolioData, onNavigate, initialPrompt = '' }) => {
  const [input, setInput] = useState(initialPrompt);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        `Hey there! I can answer questions about Hugh's projects (like Echo and CodeScout), tech stack, or engineering philosophy.`,
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialPrompt) {
      setInput(initialPrompt);
      handleSendPrompt(initialPrompt);
    }
  }, [initialPrompt]);

  useEffect(() => {
    if (isOpen && chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isTyping, isOpen]);

  const quickPrompts = [
    { label: 'What is Echo?', prompt: 'Tell me about the Echo browser extension' },
    { label: 'Explain CodeScout', prompt: 'What is CodeScout and how does it work?' },
    { label: 'Tech stack', prompt: 'What languages and frameworks does Hugh use?' },
    { label: 'Contact', prompt: 'How can I connect with Hugh?' },
  ];

  const handleSendPrompt = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isTyping) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: query }];
    setMessages(newMessages);
    setInput('');
    setIsOpen(true);
    setIsTyping(true);

    const getFallbackAnswer = (q: string): { reply: string; action?: { label: string; sectionId: string } } => {
      const lower = q.toLowerCase();
      if (lower.includes('echo') || lower.includes('prompt')) {
        return {
          reply: `Echo is a Manifest V3 Chrome extension that acts like Grammarly for AI prompting. It evaluates prompts in real-time inside ChatGPT, Claude, and Gemini with 100% local client-side heuristics and 1-click auto-correction.`,
          action: { label: 'Jump to Echo project', sectionId: 'echo-prompt-coach' },
        };
      }
      if (lower.includes('codescout') || lower.includes('trending') || lower.includes('github')) {
        return {
          reply: `CodeScout is a full-stack trending GitHub tracker with Next.js 16 and FastAPI. It analyzes repository star velocity and provides an SSE-streamed AI coach for brainstorming portfolio projects.`,
          action: { label: 'Jump to CodeScout', sectionId: 'codescout' },
        };
      }
      if (lower.includes('cleaner') || lower.includes('c-drive') || lower.includes('storage')) {
        return {
          reply: `C-Drive Cleaner is a lightweight 60-line Python utility that recursively cleans temp and cache folders with zero bloat or dependencies.`,
          action: { label: 'View C-Drive Cleaner', sectionId: 'c-drive-cleaner' },
        };
      }
      if (lower.includes('project')) {
        return {
          reply: `Hugh's featured projects include Echo (Chrome prompt coach), CodeScout (GitHub trending radar), and C-Drive Cleaner.`,
          action: { label: 'View projects', sectionId: 'echo-prompt-coach' },
        };
      }
      if (lower.includes('contact') || lower.includes('email') || lower.includes('linkedin')) {
        return {
          reply: `You can reach Hugh at ${portfolioData.personal.email} or connect on LinkedIn and GitHub.`,
          action: { label: 'Go to contact', sectionId: 'contact' },
        };
      }
      if (lower.includes('skill') || lower.includes('tech') || lower.includes('stack')) {
        return {
          reply: `Hugh works with TypeScript, JavaScript, Python, React, Next.js, FastAPI, Node.js, Tailwind CSS, and Chrome Extension APIs.`,
          action: { label: 'View projects', sectionId: 'projects' },
        };
      }
      return {
        reply: `Hugh Daeniel Dela Peña is a software engineer building practical developer tools, browser extensions, and web systems.`,
        action: { label: 'View about', sectionId: 'about' },
      };
    };

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
      });

      if (res.status === 429) {
        // IP rate limit exceeded
        setMessages([
          ...newMessages,
          {
            role: 'assistant',
            content: 'Rate limit reached: Please wait a minute before asking another question.',
          },
        ]);
        setIsTyping(false);
        return;
      }

      if (res.ok) {
        const data = await res.json();
        if (data.reply) {
          setMessages([
            ...newMessages,
            {
              role: 'assistant',
              content: data.reply,
              action: data.action,
            },
          ]);
          setIsTyping(false);
          return;
        }
      }

      // Fallback if backend returned fallback flag or error
      const fallback = getFallbackAnswer(query);
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: fallback.reply,
          action: fallback.action,
        },
      ]);
    } catch {
      // Offline / network failure fallback
      const fallback = getFallbackAnswer(query);
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: fallback.reply,
          action: fallback.action,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="sticky bottom-2 sm:bottom-4 z-40 px-3 sm:px-8 max-w-3xl mx-auto w-full pb-[env(safe-area-inset-bottom,0px)]">
      {/* Response Popover with spring entrance */}
      {isOpen && (
        <div className="animate-dialog-spring mb-2.5 p-3.5 sm:p-5 rounded-2xl bg-white border border-neutral-200 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-100 mb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-gentle-pulse" />
              <span className="text-xs font-semibold text-black tracking-tight">
                AI Portfolio Assistant
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-neutral-400 hover:text-black hover:bg-neutral-100 rounded-full transition-colors press-scale"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div ref={chatContainerRef} className="max-h-48 sm:max-h-56 overflow-y-auto space-y-2.5 text-xs pr-1">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`animate-tab-fade flex gap-2 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed transition-all ${
                    m.role === 'user'
                      ? 'bg-black text-white shadow-2xs'
                      : 'bg-neutral-100/90 text-black border border-neutral-200/80 shadow-2xs'
                  }`}
                >
                  <p>{m.content}</p>
                  {m.action && (
                    <button
                      onClick={() => {
                        onNavigate(m.action!.sectionId);
                        setIsOpen(false);
                      }}
                      className="group/act mt-2.5 inline-flex items-center gap-1.5 text-xs font-medium text-black px-2.5 py-1 rounded-lg bg-white border border-neutral-200 hover:bg-neutral-50 press-scale shadow-2xs"
                    >
                      <span>{m.action.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover/act:translate-x-0.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="animate-tab-fade flex items-center gap-1.5 py-1 text-neutral-400 text-xs">
                <span className="font-mono text-[11px]">Thinking</span>
                <div className="flex items-center gap-1 ml-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 dot-wave-1" />
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 dot-wave-2" />
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 dot-wave-3" />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Suggestion Pills with hover lift */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {quickPrompts.map((item, idx) => (
          <button
            key={idx}
            onClick={() => handleSendPrompt(item.prompt)}
            disabled={isTyping}
            className="shrink-0 text-xs px-3 py-1.5 rounded-full bg-white hover:bg-neutral-50 hover:border-neutral-300 border border-neutral-200 text-neutral-700 hover:text-black disabled:opacity-50 transition-all duration-150 press-scale shadow-2xs hover:-translate-y-0.5"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Minimalist Input Capsule with tactile focus elevation */}
      <div className="relative flex items-center bg-white border border-neutral-200 focus-within:border-neutral-900 focus-within:shadow-md focus-within:scale-[1.006] rounded-full px-3.5 sm:px-4 py-2 transition-all duration-200 shadow-sm">
        <Sparkles className="w-4 h-4 text-neutral-400 shrink-0 mr-2 transition-colors group-focus-within:text-neutral-800" />

        <input
          type="text"
          value={input}
          maxLength={280}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSendPrompt();
            }
          }}
          placeholder="Ask about projects, tech, or bio..."
          className="w-full bg-transparent text-base sm:text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none"
        />

        <button
          onClick={() => handleSendPrompt()}
          disabled={!input.trim() || isTyping}
          className="p-1.5 rounded-full text-black hover:bg-neutral-100 disabled:text-neutral-300 disabled:hover:bg-transparent transition-all duration-150 press-scale ml-1"
          title="Send"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
