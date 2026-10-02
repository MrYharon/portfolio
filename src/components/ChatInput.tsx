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
        `Hello! You can ask me anything about Hugh's projects, technical background, skills, or how to get in touch.`,
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
    { label: 'Summarize experience', prompt: "Give me an overview of Hugh's experience" },
    { label: 'Featured projects', prompt: 'What key projects has Hugh built?' },
    { label: 'Autonomous Agent', prompt: 'Tell me about the Autonomous Multi-Agent project' },
    { label: 'How to contact', prompt: 'How can I connect with or hire Hugh?' },
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

      if (lower.includes('agent') || lower.includes('orchestrator')) {
        reply = `Hugh engineered an Autonomous Multi-Agent Task Orchestrator coordinating specialized subagents with tool calling and self-reflection loops.`;
        action = { label: 'Jump to project', sectionId: 'agentic-ai-workflow' };
      } else if (lower.includes('rag') || lower.includes('knowledge')) {
        reply = `Hugh built an Enterprise Contextual RAG pipeline with hybrid dense-sparse search and cross-encoder re-ranking across 50,000+ technical documents.`;
        action = { label: 'Jump to project', sectionId: 'enterprise-rag-engine' };
      } else if (lower.includes('project')) {
        reply = `Hugh has built multiple applications including an Autonomous Multi-Agent Orchestrator, an Enterprise RAG Engine, a Multimodal Creative Studio, and a Conversational Voice Assistant.`;
        action = { label: 'View projects', sectionId: 'agentic-ai-workflow' };
      } else if (lower.includes('contact') || lower.includes('hire') || lower.includes('email') || lower.includes('linkedin')) {
        reply = `Hugh is currently open to full-time engineering roles and high-impact contracts. You can connect via LinkedIn (${portfolioData.personal.linkedin}) or email (${portfolioData.personal.email}).`;
        action = { label: 'Go to contact', sectionId: 'contact' };
      } else if (lower.includes('skill') || lower.includes('tech') || lower.includes('stack')) {
        reply = `Hugh's primary stack includes Python, TypeScript, React, Next.js, FastAPI, Vector Databases, and cloud deployment pipelines.`;
        action = { label: 'View skills', sectionId: 'skills' };
      } else {
        reply = `Hugh is a software engineer specializing in Generative AI systems, full-stack development, and modern cloud architectures.`;
        action = { label: 'View about', sectionId: 'about' };
      }

      setMessages([...newMessages, { role: 'assistant', content: reply, action }]);
      setIsTyping(false);
    }, 350);
  };

  return (
    <div className="sticky bottom-4 z-40 px-4 sm:px-8 max-w-3xl mx-auto w-full">
      {/* Response Drawer */}
      {isOpen && (
        <div className="mb-3 p-4 sm:p-5 rounded-2xl bg-white border border-gray-200 shadow-xl">
          <div className="flex items-center justify-between pb-2.5 border-b border-gray-100 mb-3">
            <span className="text-xs font-medium text-gray-700">
              Assistant
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
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
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-50 text-gray-800 border border-gray-100'
                  }`}
                >
                  <p>{m.content}</p>
                  {m.action && (
                    <button
                      onClick={() => {
                        onNavigate(m.action!.sectionId);
                        setIsOpen(false);
                      }}
                      className="mt-2 flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700"
                    >
                      <span>{m.action.label}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="text-gray-400 text-xs italic">
                Thinking...
              </div>
            )}
          </div>
        </div>
      )}

      {/* Gemini Suggestion Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {quickPrompts.map((item, idx) => (
          <button
            key={idx}
            onClick={() => handleSendPrompt(item.prompt)}
            className="shrink-0 text-xs px-3.5 py-1.5 rounded-full bg-[#f0f4f9] hover:bg-[#dde3ea] text-gray-700 transition-colors"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Gemini Style Input Capsule */}
      <div className="relative flex items-center bg-[#f0f4f9] focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/20 border border-transparent focus-within:border-gray-300 rounded-full px-4 py-2 transition-all shadow-sm">
        <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mr-2" />

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSendPrompt();
            }
          }}
          placeholder="Ask anything about Hugh..."
          className="w-full bg-transparent text-sm text-gray-800 placeholder-gray-500 focus:outline-none"
        />

        <button
          onClick={() => handleSendPrompt()}
          disabled={!input.trim()}
          className="p-1.5 rounded-full text-blue-600 hover:bg-blue-50 disabled:text-gray-400 disabled:hover:bg-transparent transition-colors ml-1"
          title="Send"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
