import React, { useState } from 'react';
import { Sparkles, Send, Bot, X, ArrowRight } from 'lucide-react';
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
        `Hello! I'm Hugh's Portfolio AI Agent. You can ask me about his Generative AI projects, experience, technical stack, or how to contact him. How can I assist you?`,
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Sync if initial prompt passed
  React.useEffect(() => {
    if (initialPrompt) {
      setInput(initialPrompt);
      handleSendPrompt(initialPrompt);
    }
  }, [initialPrompt]);

  const quickPrompts = [
    { label: "Summarize Hugh's background", prompt: "Can you give me a summary of Hugh's background and focus?" },
    { label: 'Explain GenAI projects', prompt: 'What Generative AI projects has Hugh built?' },
    { label: 'View Autonomous Agent project', prompt: 'Tell me about the Autonomous Multi-Agent project' },
    { label: 'How to contact Hugh', prompt: 'How can I connect with or hire Hugh?' },
  ];

  const handleSendPrompt = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    // Add user message
    const newMessages: Message[] = [...messages, { role: 'user', content: query }];
    setMessages(newMessages);
    setInput('');
    setIsOpen(true);
    setIsTyping(true);

    // Generate intelligent AI response based on query
    setTimeout(() => {
      let reply = '';
      let action: { label: string; sectionId: string } | undefined = undefined;

      const lower = query.toLowerCase();

      if (lower.includes('agent') || lower.includes('orchestrator')) {
        reply = `Hugh engineered an Autonomous Multi-Agent Task Orchestrator. It coordinates specialized subagents with tool-calling, self-reflection, and execution loops to tackle complex coding and research workflows.`;
        action = { label: 'Jump to Agentic AI Project', sectionId: 'agentic-ai-workflow' };
      } else if (lower.includes('rag') || lower.includes('knowledge')) {
        reply = `Hugh built an Enterprise Contextual RAG pipeline with hybrid dense-sparse search (vector embeddings + BM25) and cross-encoder re-ranking for hallucination-free retrieval across 50,000+ technical documents.`;
        action = { label: 'Jump to RAG Engine Project', sectionId: 'enterprise-rag-engine' };
      } else if (lower.includes('project') || lower.includes('generative')) {
        reply = `Hugh has built multiple Generative AI projects including an Autonomous Multi-Agent Orchestrator, an Enterprise RAG Engine, a Multimodal Creative Canvas, and a Low-Latency Conversational Voice Assistant.`;
        action = { label: 'Explore Featured Projects', sectionId: 'agentic-ai-workflow' };
      } else if (lower.includes('contact') || lower.includes('hire') || lower.includes('email') || lower.includes('linkedin')) {
        reply = `Hugh is currently open to full-time engineering roles and high-impact generative AI contracts. You can connect via LinkedIn (${portfolioData.personal.linkedin}) or email (${portfolioData.personal.email}).`;
        action = { label: 'Go to Contact Section', sectionId: 'contact' };
      } else if (lower.includes('skill') || lower.includes('tech') || lower.includes('stack')) {
        reply = `Hugh's primary stack includes Python, TypeScript, React, LangChain, Gemini API, PyTorch, Vector Databases (Pinecone/Qdrant), FastAPI, and modern cloud deployment pipelines.`;
        action = { label: 'View Skills Matrix', sectionId: 'skills' };
      } else {
        reply = `Hugh is an AI Engineer and Full-Stack Developer specializing in Generative AI systems, autonomous agent workflows, and production-grade LLM applications.`;
        action = { label: 'View Bio & Overview', sectionId: 'about' };
      }

      setMessages([...newMessages, { role: 'assistant', content: reply, action }]);
      setIsTyping(false);
    }, 450);
  };

  return (
    <div className="sticky bottom-4 z-40 px-4 sm:px-8 max-w-4xl mx-auto w-full">
      {/* Floating Chat Conversation Modal / Drawer */}
      {isOpen && (
        <div className="mb-3 p-4 sm:p-5 rounded-2xl bg-[#111318]/95 backdrop-blur-xl border border-[#2b2f3d] shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-[#222530] mb-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                <Bot className="w-3.5 h-3.5 text-indigo-400" />
              </div>
              <span className="text-xs font-semibold text-slate-200 font-mono">
                Hugh's AI Agent <span className="text-[10px] text-emerald-400 font-mono">● Online</span>
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-400 hover:text-white hover:bg-[#1f222b] rounded-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages list */}
          <div className="max-h-60 overflow-y-auto space-y-3 pr-1 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'assistant' && (
                  <div className="w-6 h-6 rounded-md bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-3 h-3 text-indigo-400" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-xl px-3.5 py-2.5 leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-[#181a22] text-slate-200 border border-[#262936]'
                  }`}
                >
                  <p>{m.content}</p>
                  {m.action && (
                    <button
                      onClick={() => {
                        onNavigate(m.action!.sectionId);
                        setIsOpen(false);
                      }}
                      className="mt-2.5 flex items-center gap-1.5 text-[11px] font-mono font-medium text-indigo-300 hover:text-indigo-100 bg-indigo-950/60 hover:bg-indigo-900/80 px-2.5 py-1 rounded-lg border border-indigo-700/50 transition-colors"
                    >
                      <span>{m.action.label}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono pl-8">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse delay-150" />
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse delay-300" />
                <span className="text-[11px]">Agent thinking...</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Suggested Prompt Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {quickPrompts.map((item, idx) => (
          <button
            key={idx}
            onClick={() => handleSendPrompt(item.prompt)}
            className="shrink-0 text-[11px] font-mono px-3 py-1 rounded-full bg-[#161820]/90 hover:bg-[#20232e] text-slate-300 hover:text-indigo-300 border border-[#272b38] hover:border-indigo-500/40 backdrop-blur-md transition-all shadow-sm"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Prompt Input Bar (Antigravity & Gemini styling) */}
      <div className="relative flex items-center bg-[#12141a]/95 backdrop-blur-xl border border-[#2b2f3d] focus-within:border-indigo-500/80 focus-within:ring-2 focus-within:ring-indigo-500/20 rounded-2xl p-1.5 shadow-2xl transition-all">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-slate-400 hover:text-indigo-300 hover:bg-[#1a1c24] rounded-xl transition-colors shrink-0"
          title="Toggle Assistant Chat History"
        >
          <Sparkles className="w-4 h-4 text-indigo-400" />
        </button>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSendPrompt();
            }
          }}
          placeholder="Ask anything about Hugh (e.g. 'What generative AI tools did you use?')..."
          className="w-full bg-transparent px-3 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none"
        />

        <div className="flex items-center gap-1.5 shrink-0 pr-1">
          <div className="hidden sm:flex items-center gap-1 text-[10px] font-mono text-slate-400 px-2 py-1 rounded bg-[#181a22] border border-[#252834]">
            <span>Antigravity</span>
          </div>

          <button
            onClick={() => handleSendPrompt()}
            disabled={!input.trim()}
            className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-[#1e2029] disabled:text-slate-400 text-white transition-all shadow-md shadow-indigo-600/20"
            title="Send Message"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
