import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (initialPrompt) {
      setInput(initialPrompt);
      handleSendPrompt(initialPrompt);
    }
  }, [initialPrompt]);

  const quickPrompts = [
    { label: 'What is Echo?', prompt: 'Tell me about the Echo browser extension' },
    { label: 'Explain CodeScout', prompt: 'What is CodeScout and how does it work?' },
    { label: 'Tech stack', prompt: 'What languages and frameworks does Hugh use?' },
    { label: 'Contact', prompt: 'How can I connect with Hugh?' },
  ];

  const handleSendPrompt = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: query }];
    setMessages(newMessages);
    setInput('');
    setIsOpen(true);
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';
      let action: { label: string; sectionId: string } | undefined = undefined;

      const lower = query.toLowerCase();

      if (lower.includes('echo') || lower.includes('prompt')) {
        reply = `Echo is a Manifest V3 Chrome extension that acts like Grammarly for AI prompting. It evaluates prompts in real-time inside ChatGPT, Claude, and Gemini with 100% local client-side heuristics and 1-click auto-correction.`;
        action = { label: 'Jump to Echo project', sectionId: 'echo-prompt-coach' };
      } else if (lower.includes('codescout') || lower.includes('trending') || lower.includes('github')) {
        reply = `CodeScout is a full-stack trending GitHub tracker with Next.js 16 and FastAPI. It analyzes repository star velocity and provides an SSE-streamed AI coach for brainstorming portfolio projects.`;
        action = { label: 'Jump to CodeScout', sectionId: 'codescout' };
      } else if (lower.includes('project')) {
        reply = `Hugh's featured projects include Echo (a browser extension for AI prompt coaching) and CodeScout (a trending GitHub repository tracker).`;
        action = { label: 'View projects', sectionId: 'echo-prompt-coach' };
      } else if (lower.includes('contact') || lower.includes('email') || lower.includes('linkedin')) {
        reply = `You can connect with Hugh via GitHub (${portfolioData.personal.github}), LinkedIn (${portfolioData.personal.linkedin}), or email (${portfolioData.personal.email}).`;
        action = { label: 'Go to contact', sectionId: 'contact' };
      } else if (lower.includes('skill') || lower.includes('tech') || lower.includes('stack')) {
        reply = `Hugh builds with TypeScript, JavaScript, Python, React, Next.js, FastAPI, Node.js, and Chrome MV3 browser extensions across his projects.`;
        action = { label: 'View projects', sectionId: 'projects' };
      } else {
        reply = `Hugh is a software engineer building practical developer tools, browser extensions, and web applications.`;
        action = { label: 'View about', sectionId: 'about' };
      }

      setMessages([...newMessages, { role: 'assistant', content: reply, action }]);
      setIsTyping(false);
    }, 300);
  };

  return (
    <div className="sticky bottom-4 z-40 px-4 sm:px-8 max-w-3xl mx-auto w-full">
      {/* Response Popover */}
      {isOpen && (
        <div className="mb-3 p-4 sm:p-5 rounded-2xl bg-white border border-neutral-200 shadow-xl">
          <div className="flex items-center justify-between pb-2.5 border-b border-neutral-100 mb-3">
            <span className="text-xs font-semibold text-black">
              Assistant
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-neutral-400 hover:text-black hover:bg-neutral-100 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="max-h-56 overflow-y-auto space-y-2.5 text-xs pr-1">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-black text-white'
                      : 'bg-neutral-100 text-black border border-neutral-200'
                  }`}
                >
                  <p>{m.content}</p>
                  {m.action && (
                    <button
                      onClick={() => {
                        onNavigate(m.action!.sectionId);
                        setIsOpen(false);
                      }}
                      className="mt-2 flex items-center gap-1.5 text-xs font-medium text-black hover:underline"
                    >
                      <span>{m.action.label}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="text-neutral-400 text-xs italic">
                Thinking...
              </div>
            )}
          </div>
        </div>
      )}

      {/* Suggestion Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {quickPrompts.map((item, idx) => (
          <button
            key={idx}
            onClick={() => handleSendPrompt(item.prompt)}
            className="shrink-0 text-xs px-3 py-1.5 rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-700 hover:text-black transition-colors shadow-2xs"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Minimalist Input Capsule */}
      <div className="relative flex items-center bg-white border border-neutral-200 focus-within:border-black rounded-full px-4 py-2 transition-all shadow-sm">
        <Sparkles className="w-4 h-4 text-neutral-400 shrink-0 mr-2" />

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSendPrompt();
            }
          }}
          placeholder="Ask anything about Hugh's projects..."
          className="w-full bg-transparent text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none"
        />

        <button
          onClick={() => handleSendPrompt()}
          disabled={!input.trim()}
          className="p-1.5 rounded-full text-black hover:bg-neutral-100 disabled:text-neutral-300 disabled:hover:bg-transparent transition-colors ml-1"
          title="Send"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
