import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Sparkles, Check, Zap, ShieldCheck, ArrowRight, CornerDownLeft, RotateCcw } from 'lucide-react';

export type PromptIntent = 'coding' | 'explanation' | 'writing' | 'analysis' | 'general';

interface HeuristicResult {
  score: number;
  grade: 'Weak' | 'Fair' | 'Strong' | 'Optimal';
  intent: PromptIntent;
  intentLabel: string;
  hasActionVerb: boolean;
  hasRoleOrContext: boolean;
  hasConstraints: boolean;
  hasAmbiguityPenalty: boolean;
  suggestions: string[];
}

export const EchoInteractiveDemo: React.FC = () => {
  // Preset demo prompts across diverse domains
  const presets = [
    {
      label: 'General: "What is a cat?"',
      text: 'what is a cat',
    },
    {
      label: 'Coding: Python Scraper',
      text: 'make me a python script for scraping products',
    },
    {
      label: 'Writing: Professional Email',
      text: 'write an email asking for a meeting with my manager',
    },
    {
      label: 'Analysis: React vs Vue',
      text: 'tell me the difference between react and vue',
    },
  ];

  const [promptText, setPromptText] = useState(presets[0].text);
  const [history, setHistory] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (msg: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(msg);
    toastTimeoutRef.current = setTimeout(() => setToastMessage(null), 2500);
  };

  // 1. Intent Detection Heuristic (100% Client-Side Context Classification)
  const detectIntent = (text: string): { intent: PromptIntent; label: string } => {
    const lower = text.toLowerCase();

    // Coding intent
    if (/(python|javascript|typescript|react|vue|node|html|css|sql|script|function|api|code|bug|debug|refactor|endpoint|algorithm|regex|database|backend|frontend)/i.test(lower)) {
      return { intent: 'coding', label: 'Software Engineering' };
    }

    // Explanation / Concept intent (e.g. "what is a cat", "explain quantum physics")
    if (/^(what is|what are|who is|who was|explain|why is|why does|how does|define|concept of|tell me about\s+[a-zA-Z]+$)/i.test(lower) ||
        /(teach me|give me an overview of|definition of|history of)/i.test(lower)) {
      return { intent: 'explanation', label: 'Conceptual & Educational' };
    }

    // Writing / Editorial intent
    if (/(email|letter|draft|essay|speech|memo|announcement|blog post|cover letter|write a story|rewrite this)/i.test(lower)) {
      return { intent: 'writing', label: 'Writing & Editorial' };
    }

    // Analysis / Comparison intent
    if (/(compare|versus|\bvs\b|pros and cons|difference between|evaluate|trade-?offs|which is better)/i.test(lower)) {
      return { intent: 'analysis', label: 'Analysis & Evaluation' };
    }

    return { intent: 'general', label: 'General Knowledge' };
  };

  // 2. Real-Time Heuristic Rule Engine (Adaptive scoring based on intent)
  const analysis: HeuristicResult = useMemo(() => {
    const text = promptText.trim();
    if (!text) {
      return {
        score: 0,
        grade: 'Weak',
        intent: 'general',
        intentLabel: 'General',
        hasActionVerb: false,
        hasRoleOrContext: false,
        hasConstraints: false,
        hasAmbiguityPenalty: false,
        suggestions: ['Start typing a prompt to see real-time analysis.'],
      };
    }

    const { intent, label: intentLabel } = detectIntent(text);
    const lower = text.toLowerCase();
    let score = 25; // base score
    const suggestions: string[] = [];

    // Check 1: Action Verb / Command clarity
    const actionVerbs = ['explain', 'summarize', 'break down', 'analyze', 'compare', 'write', 'build', 'create', 'refactor', 'draft', 'evaluate', 'outline', 'describe'];
    const hasActionVerb = actionVerbs.some((v) => lower.includes(v));
    if (hasActionVerb) {
      score += 20;
    } else {
      suggestions.push('Add an explicit directive (e.g., "Explain", "Analyze", "Outline")');
    }

    // Check 2: Role or Target Audience / Persona
    const roleRegex = /(you are|act as|as an? (expert|senior|educator|biologist|writer|consultant|specialist)|for a beginner|for an advanced|for a 5-year-old|for executives)/i;
    const hasRoleOrContext = roleRegex.test(lower);
    if (hasRoleOrContext) {
      score += 20;
    } else {
      if (intent === 'explanation') {
        suggestions.push('Specify target depth or audience (e.g. "in clear terms", "for a beginner")');
      } else if (intent === 'coding') {
        suggestions.push('Define technical role or expertise (e.g. "senior Python engineer")');
      } else if (intent === 'writing') {
        suggestions.push('Specify voice or persona (e.g. "professional and polite", "concise tone")');
      } else {
        suggestions.push('Add persona or context to guide the answer depth');
      }
    }

    // Check 3: Format & Output Constraints (Intent-specific)
    let hasConstraints = false;
    if (intent === 'coding') {
      hasConstraints = /(typescript|typed|dataclass|json|error handling|async|backoff|test cases?|comments?|clean architecture)/i.test(lower);
      if (!hasConstraints) suggestions.push('Include technical constraints (e.g., "with error handling", "typed schema")');
    } else if (intent === 'writing') {
      hasConstraints = /(under \d+ words|bullet points?|polite tone|formal|subject line|call to action|brief)/i.test(lower);
      if (!hasConstraints) suggestions.push('Set length or tone constraints (e.g., "under 150 words", "with subject line")');
    } else if (intent === 'analysis') {
      hasConstraints = /(table|criteria|pros and cons|trade-?offs|scorecard|matrix|bullet points?)/i.test(lower);
      if (!hasConstraints) suggestions.push('Request structured format (e.g., "comparison table", "pros/cons list")');
    } else {
      // Explanation & general
      hasConstraints = /(bullet points?|in \d+ key points|key characteristics|history|examples?|step-by-step|summary)/i.test(lower);
      if (!hasConstraints) suggestions.push('Request specific structure (e.g., "cover key traits", "use bullet points")');
    }

    if (hasConstraints) {
      score += 25;
    }

    // Check 4: Ambiguity / Vague Penalty
    const ambiguityRegex = /(some stuff|make it work|make it good|help me with this|whatever|something like that)/i;
    const hasAmbiguityPenalty = ambiguityRegex.test(lower);
    if (hasAmbiguityPenalty) {
      score -= 20;
      suggestions.push('Remove vague phrases like "some stuff" or "make it good"');
    }

    // Length / Specificity bonus
    if (text.length > 60 && hasActionVerb) score += 10;

    const finalScore = Math.max(15, Math.min(98, score));

    let grade: HeuristicResult['grade'] = 'Weak';
    if (finalScore >= 88) grade = 'Optimal';
    else if (finalScore >= 72) grade = 'Strong';
    else if (finalScore >= 48) grade = 'Fair';

    return {
      score: finalScore,
      grade,
      intent,
      intentLabel,
      hasActionVerb,
      hasRoleOrContext,
      hasConstraints,
      hasAmbiguityPenalty,
      suggestions,
    };
  }, [promptText]);

  // 3. Intelligent Intent-Aware Auto-Correction Engine (Idempotent & Anti-Spam)
  const handleAutoCorrect = () => {
    const text = promptText.trim();
    if (!text) return;

    // Anti-Spam / Idempotence check: If already optimized, do not duplicate or stack
    if (analysis.score >= 88) {
      showToast('Prompt is already high-quality! (Score: ' + analysis.score + '/100)');
      return;
    }

    // Save previous state for Undo
    setHistory((prev) => [...prev, promptText]);

    const lower = text.toLowerCase();
    const { intent } = analysis;
    let enhanced = text;

    if (intent === 'explanation') {
      // E.g. "what is a cat" or "explain quantum computing"
      const topicMatch = text.replace(/^(what is|what are|explain|who is|tell me about)\s+/i, '').replace(/[?.!]+$/, '').trim();
      const topic = topicMatch || 'the topic';
      enhanced = `Explain ${topic} in clear, comprehensive detail. Cover biological classification, key behavioral traits, and history of domestication, formatted with structured bullet points for quick understanding.`;
    } else if (intent === 'coding') {
      // Coding intent
      let role = 'You are a senior software engineer. ';
      if (lower.includes('python')) role = 'You are a senior Python engineer. ';
      else if (lower.includes('react')) role = 'You are a principal frontend engineer. ';

      // Strip vague prefixes
      let cleanTask = text.replace(/^(make me a|write me a|can you make|give me a)\s+/i, 'Build a ');
      enhanced = `${role}${cleanTask}. Provide production-ready code with type annotations, edge-case handling, and clean modular structure.`;
    } else if (intent === 'writing') {
      // Writing intent
      let cleanTopic = text.replace(/^(write a|draft a|make an?)\s+/i, '').trim();
      enhanced = `Draft a professional and polite ${cleanTopic}. Include a clear subject line, concise agenda points, and an explicit call-to-action in under 150 words.`;
    } else if (intent === 'analysis') {
      // Comparison intent
      let cleanTopic = text.replace(/^(tell me the difference between|compare|what is the difference between)\s+/i, '').trim();
      enhanced = `Provide an objective, structured comparison of ${cleanTopic}. Analyze key differences, architectural trade-offs, and practical use-cases using a comparison table.`;
    } else {
      // General fallback
      enhanced = `Provide a detailed and well-structured answer to: "${text}". Include historical background, core principles, and practical examples formatted with bullet points.`;
    }

    setPromptText(enhanced);
    showToast('✨ Auto-corrected with intent-aware heuristics!');
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setPromptText(prev);
    showToast('Reverted to previous prompt.');
  };

  // Keyboard shortcut listener (Alt + E)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === 'e' || e.key === 'E')) {
        e.preventDefault();
        handleAutoCorrect();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [promptText, analysis]);

  return (
    <div className="space-y-4">
      {/* Intro Context Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-neutral-100 text-xs">
        <div className="flex items-center gap-1.5 text-neutral-600">
          <ShieldCheck className="w-4 h-4 text-neutral-800" />
          <span className="font-medium text-black">Echo Heuristic Evaluation Sandbox</span>
          <span className="text-neutral-300">•</span>
          <span className="font-mono text-neutral-500">100% Client-Side Engine</span>
        </div>

        {/* Real-Time Intent Detection Badge */}
        <div className="flex items-center gap-1.5 font-mono text-[11px] bg-neutral-100 text-neutral-700 px-2.5 py-0.5 rounded-full border border-neutral-200/70">
          <span className="text-neutral-400">Intent:</span>
          <span className="font-semibold text-black">{analysis.intentLabel}</span>
        </div>
      </div>

      {/* Preset Selector Chips */}
      <div>
        <p className="text-[11px] font-mono text-neutral-400 mb-1.5">Try sample prompt scenarios across different topics:</p>
        <div className="flex flex-wrap gap-1.5">
          {presets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => {
                setPromptText(preset.text);
                setHistory([]);
              }}
              className={`text-xs px-2.5 py-1 rounded-lg border transition-all duration-150 press-scale ${
                promptText === preset.text
                  ? 'bg-neutral-900 text-white border-neutral-900 shadow-2xs font-medium'
                  : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Simulated AI Interface with Echo Floating Score Pill */}
      <div className="relative rounded-xl border border-neutral-200 bg-neutral-50/60 p-3 sm:p-4 transition-all focus-within:border-neutral-900 focus-within:bg-white shadow-2xs">
        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 px-3 py-1 rounded-full bg-neutral-900 text-white text-[11px] font-mono shadow-md animate-tab-fade">
            {toastMessage}
          </div>
        )}

        {/* Echo Floating Score Pill (The Core Extension UI) */}
        <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-neutral-200/70">
          <div className="flex items-center gap-2">
            {/* Live Score Pill */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-900 text-white font-mono text-xs shadow-2xs">
              <span className={`w-1.5 h-1.5 rounded-full ${
                analysis.score >= 85 ? 'bg-emerald-400 animate-pulse' : analysis.score >= 60 ? 'bg-amber-400' : 'bg-red-400'
              }`} />
              <span className="font-semibold">{analysis.score}</span>
              <span className="text-neutral-400 text-[10px]">/ 100</span>
              <span className="text-neutral-300 ml-0.5 text-[11px]">({analysis.grade})</span>
            </div>

            <span className="text-[11px] font-mono text-neutral-500 hidden sm:inline">
              Live Prompt Quality
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {history.length > 0 && (
              <button
                onClick={handleUndo}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-white text-neutral-600 border border-neutral-200 hover:text-black hover:border-neutral-300 transition-all press-scale shadow-2xs"
                title="Undo last enhancement"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="hidden sm:inline">Revert</span>
              </button>
            )}

            {/* 1-Click Heuristic Auto-Correct Action */}
            <button
              onClick={handleAutoCorrect}
              className={`group flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all duration-150 press-scale shadow-2xs ${
                analysis.score >= 88
                  ? 'bg-neutral-100 text-neutral-500 border border-neutral-200/80 cursor-default'
                  : 'bg-white text-black border border-neutral-300 hover:border-black hover:bg-neutral-50'
              }`}
              title="Enhance prompt with intent heuristics (Alt + E)"
            >
              <Zap className={`w-3.5 h-3.5 transition-transform ${
                analysis.score >= 88 ? 'text-neutral-400' : 'text-amber-500 group-hover:scale-110'
              }`} />
              <span>{analysis.score >= 88 ? 'Optimized' : 'Auto-Correct'}</span>
              <kbd className="hidden sm:inline font-mono text-[10px] px-1 py-0.2 rounded bg-neutral-100 border border-neutral-200 text-neutral-600">
                Alt+E
              </kbd>
            </button>
          </div>
        </div>

        {/* Textarea mimicking real prompt input */}
        <div className="relative">
          <textarea
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            rows={3}
            placeholder="Type or paste any prompt to test real-time heuristics (coding, general, writing)..."
            className="w-full bg-transparent text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none resize-none leading-relaxed"
          />

          <div className="flex items-center justify-between pt-1 border-t border-neutral-100 text-[11px] text-neutral-400 font-mono">
            <span>Adaptive heuristics: {analysis.intentLabel}</span>
            <div className="flex items-center gap-1 text-neutral-500">
              <span>{promptText.length} chars</span>
              <CornerDownLeft className="w-3 h-3 text-neutral-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Heuristic Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
        {/* Check 1: Action Verb */}
        <div className={`p-2.5 rounded-xl border transition-all ${
          analysis.hasActionVerb
            ? 'bg-white border-neutral-200 text-neutral-800'
            : 'bg-neutral-50/50 border-neutral-200/60 text-neutral-400'
        }`}>
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-[11px] font-mono">Directive Verb</span>
            {analysis.hasActionVerb ? (
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-medium">
                <Check className="w-3 h-3" /> Clear
              </span>
            ) : (
              <span className="text-[10px] text-neutral-400">Missing</span>
            )}
          </div>
          <p className="text-[11px] text-neutral-500 leading-tight">
            Clear instruction verb (explain, outline, analyze, build).
          </p>
        </div>

        {/* Check 2: Persona / Context */}
        <div className={`p-2.5 rounded-xl border transition-all ${
          analysis.hasRoleOrContext
            ? 'bg-white border-neutral-200 text-neutral-800'
            : 'bg-neutral-50/50 border-neutral-200/60 text-neutral-400'
        }`}>
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-[11px] font-mono">Audience / Role</span>
            {analysis.hasRoleOrContext ? (
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-medium">
                <Check className="w-3 h-3" /> Defined
              </span>
            ) : (
              <span className="text-[10px] text-neutral-400">Vague</span>
            )}
          </div>
          <p className="text-[11px] text-neutral-500 leading-tight">
            Target depth, persona, or tone for the model.
          </p>
        </div>

        {/* Check 3: Constraints */}
        <div className={`p-2.5 rounded-xl border transition-all ${
          analysis.hasConstraints
            ? 'bg-white border-neutral-200 text-neutral-800'
            : 'bg-neutral-50/50 border-neutral-200/60 text-neutral-400'
        }`}>
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-[11px] font-mono">Constraints</span>
            {analysis.hasConstraints ? (
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-medium">
                <Check className="w-3 h-3" /> Grounded
              </span>
            ) : (
              <span className="text-[10px] text-neutral-400">Missing</span>
            )}
          </div>
          <p className="text-[11px] text-neutral-500 leading-tight">
            Formatting bound (bullet points, word limit, schemas).
          </p>
        </div>
      </div>

      {/* Live Improvement Suggestions (if any) */}
      {analysis.suggestions.length > 0 && analysis.score < 88 && (
        <div className="p-3 rounded-xl bg-neutral-100/70 border border-neutral-200 text-xs">
          <div className="flex items-center gap-1.5 font-medium text-black mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-neutral-700" />
            <span>Echo Suggestions for 90+ Score ({analysis.intentLabel}):</span>
          </div>
          <ul className="space-y-1">
            {analysis.suggestions.map((sug, i) => (
              <li key={i} className="text-[11px] text-neutral-600 flex items-start gap-1.5">
                <ArrowRight className="w-3 h-3 text-neutral-400 shrink-0 mt-0.5" />
                <span>{sug}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
