import React, { useState, useEffect, useMemo } from 'react';
import { Sparkles, Check, Zap, ShieldCheck, ArrowRight, CornerDownLeft } from 'lucide-react';

interface HeuristicResult {
  score: number;
  grade: 'Weak' | 'Fair' | 'Strong' | 'Optimal';
  hasActionVerb: boolean;
  hasRole: boolean;
  hasConstraints: boolean;
  hasAmbiguityPenalty: boolean;
  suggestions: string[];
}

export const EchoInteractiveDemo: React.FC = () => {
  // Preset demo prompts
  const presets = [
    {
      label: 'Vague Prompt (Before)',
      text: 'make me a python script for scraping products',
    },
    {
      label: 'Moderate Prompt',
      text: 'write a fast python script to scrape product prices from an ecommerce store',
    },
    {
      label: 'High-Scoring Prompt',
      text: 'You are a senior Python engineer. Write an async Playwright scraper that extracts product titles and prices, handles rate-limits with exponential backoff, and outputs clean typed dataclasses.',
    },
  ];

  const [promptText, setPromptText] = useState(presets[0].text);
  const [platform, setPlatform] = useState<'ChatGPT' | 'Claude' | 'Gemini'>('ChatGPT');
  const [justAutoCorrected, setJustAutoCorrected] = useState(false);

  // Real-time 100% client-side heuristic scoring engine (mimics Echo's MV3 rule engine)
  const analysis: HeuristicResult = useMemo(() => {
    const text = promptText.trim();
    if (!text) {
      return {
        score: 0,
        grade: 'Weak',
        hasActionVerb: false,
        hasRole: false,
        hasConstraints: false,
        hasAmbiguityPenalty: false,
        suggestions: ['Start typing a prompt to see real-time analysis.'],
      };
    }

    const lower = text.toLowerCase();
    let score = 20; // base score
    const suggestions: string[] = [];

    // 1. Role / Persona Heuristic
    const roleRegex = /(you are|act as|role:|as an? (expert|senior|specialist|principal|engineer|developer|designer|analyst))/i;
    const hasRole = roleRegex.test(lower);
    if (hasRole) {
      score += 25;
    } else {
      suggestions.push('Define a clear persona (e.g. "You are a senior Python engineer")');
    }

    // 2. Action Verb Heuristic
    const actionVerbs = ['write', 'build', 'create', 'analyze', 'refactor', 'architect', 'implement', 'debug', 'design', 'generate', 'summarize', 'extract'];
    const hasActionVerb = actionVerbs.some((verb) => lower.includes(verb));
    if (hasActionVerb) {
      score += 20;
    } else {
      suggestions.push('Start with an explicit action verb (e.g. "Write", "Implement", "Refactor")');
    }

    // 3. Constraints & Format Heuristic
    const constraintsRegex = /(json|typescript|dataclass|bullet points?|step-by-step|table|markdown|schema|with types|in under|must not|error handling|backoff|async)/i;
    const hasConstraints = constraintsRegex.test(lower);
    if (hasConstraints) {
      score += 25;
    } else {
      suggestions.push('Add output format or technical constraints (e.g. "in JSON", "with error handling")');
    }

    // 4. Ambiguity / Vague Penalty
    const ambiguityRegex = /(some stuff|make it work|make it good|help me with|just whatever|something like that)/i;
    const hasAmbiguityPenalty = ambiguityRegex.test(lower);
    if (hasAmbiguityPenalty) {
      score -= 20;
      suggestions.push('Remove ambiguous phrasing like "some stuff" or "make it work"');
    }

    // 5. Length / Specificity bonus
    if (text.length > 70) score += 10;

    // Clamp score
    const finalScore = Math.max(15, Math.min(99, score));

    let grade: HeuristicResult['grade'] = 'Weak';
    if (finalScore >= 90) grade = 'Optimal';
    else if (finalScore >= 75) grade = 'Strong';
    else if (finalScore >= 50) grade = 'Fair';

    return {
      score: finalScore,
      grade,
      hasActionVerb,
      hasRole,
      hasConstraints,
      hasAmbiguityPenalty,
      suggestions,
    };
  }, [promptText]);

  // Echo 1-Click Heuristic Auto-Correction Engine (Alt + E)
  const handleAutoCorrect = () => {
    let enhanced = promptText.trim();

    // If missing role, inject professional role
    if (!analysis.hasRole) {
      enhanced = `You are an expert engineer. ${enhanced}`;
    }

    // If vague, add clean technical constraints
    if (!analysis.hasConstraints) {
      enhanced += ` Provide production-ready code with type annotations, edge-case handling, and concise explanation.`;
    }

    // Clean up weak phrases
    enhanced = enhanced
      .replace(/make me a/gi, 'Build a')
      .replace(/some stuff/gi, 'the required data');

    setPromptText(enhanced);
    setJustAutoCorrected(true);
    setTimeout(() => setJustAutoCorrected(false), 2000);
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
          <span className="font-medium text-black">Live Echo MV3 Simulator</span>
          <span className="text-neutral-300">•</span>
          <span className="font-mono text-neutral-500">100% Client-Side Engine</span>
        </div>

        {/* Platform Simulator Selector */}
        <div className="flex items-center gap-1 bg-neutral-100 p-0.5 rounded-lg font-mono text-[11px]">
          {(['ChatGPT', 'Claude', 'Gemini'] as const).map((plat) => (
            <button
              key={plat}
              onClick={() => setPlatform(plat)}
              className={`px-2 py-0.5 rounded-md transition-all duration-150 ${
                platform === plat
                  ? 'bg-white text-black shadow-2xs font-semibold'
                  : 'text-neutral-500 hover:text-black'
              }`}
            >
              {plat}
            </button>
          ))}
        </div>
      </div>

      {/* Preset Selector Chips */}
      <div>
        <p className="text-[11px] font-mono text-neutral-400 mb-1.5">Try sample prompt scenarios:</p>
        <div className="flex flex-wrap gap-1.5">
          {presets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => {
                setPromptText(preset.text);
                setJustAutoCorrected(false);
              }}
              className={`text-xs px-2.5 py-1 rounded-lg border transition-all duration-150 press-scale ${
                promptText === preset.text
                  ? 'bg-neutral-900 text-white border-neutral-900 shadow-2xs'
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
        {/* Echo Floating Score Pill (The Core Extension UI) */}
        <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-neutral-200/70">
          <div className="flex items-center gap-2">
            {/* Live Score Pill */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-900 text-white font-mono text-xs shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold">{analysis.score}</span>
              <span className="text-neutral-400 text-[10px]">/ 100</span>
              <span className="text-neutral-300 ml-0.5 text-[11px]">({analysis.grade})</span>
            </div>

            <span className="text-[11px] font-mono text-neutral-500 hidden sm:inline">
              Echo Prompt Quality Score
            </span>
          </div>

          {/* 1-Click Heuristic Auto-Correct Action */}
          <button
            onClick={handleAutoCorrect}
            disabled={analysis.score >= 95}
            className={`group flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all duration-150 press-scale shadow-2xs ${
              justAutoCorrected
                ? 'bg-emerald-600 text-white'
                : analysis.score >= 95
                ? 'bg-neutral-100 text-neutral-400 border border-neutral-200 cursor-not-allowed'
                : 'bg-white text-black border border-neutral-300 hover:border-black hover:bg-neutral-50'
            }`}
            title="Auto-enhance prompt heuristics (Alt + E)"
          >
            {justAutoCorrected ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Enhanced!</span>
              </>
            ) : (
              <>
                <Zap className="w-3.5 h-3.5 text-amber-500 transition-transform group-hover:scale-110" />
                <span>Auto-Correct</span>
                <kbd className="hidden sm:inline font-mono text-[10px] px-1 py-0.2 rounded bg-neutral-100 border border-neutral-200 text-neutral-600">
                  Alt+E
                </kbd>
              </>
            )}
          </button>
        </div>

        {/* Textarea mimicking ChatGPT / Claude / Gemini input box */}
        <div className="relative">
          <textarea
            value={promptText}
            onChange={(e) => {
              setPromptText(e.target.value);
              setJustAutoCorrected(false);
            }}
            rows={3}
            placeholder={`Message ${platform}... (type to see real-time Echo scoring)`}
            className="w-full bg-transparent text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none resize-none leading-relaxed"
          />

          <div className="flex items-center justify-between pt-1 border-t border-neutral-100 text-[11px] text-neutral-400 font-mono">
            <span>Simulating input inside {platform}</span>
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
            <span className="font-semibold text-[11px] font-mono">Action Verb</span>
            {analysis.hasActionVerb ? (
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-medium">
                <Check className="w-3 h-3" /> Detected
              </span>
            ) : (
              <span className="text-[10px] text-neutral-400">Missing</span>
            )}
          </div>
          <p className="text-[11px] text-neutral-500 leading-tight">
            Explicit command verb (write, build, analyze).
          </p>
        </div>

        {/* Check 2: Persona / Role */}
        <div className={`p-2.5 rounded-xl border transition-all ${
          analysis.hasRole
            ? 'bg-white border-neutral-200 text-neutral-800'
            : 'bg-neutral-50/50 border-neutral-200/60 text-neutral-400'
        }`}>
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-[11px] font-mono">Role Definition</span>
            {analysis.hasRole ? (
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-medium">
                <Check className="w-3 h-3" /> Grounded
              </span>
            ) : (
              <span className="text-[10px] text-neutral-400">Optional</span>
            )}
          </div>
          <p className="text-[11px] text-neutral-500 leading-tight">
            Clear role/persona guiding AI tone and depth.
          </p>
        </div>

        {/* Check 3: Format & Constraints */}
        <div className={`p-2.5 rounded-xl border transition-all ${
          analysis.hasConstraints
            ? 'bg-white border-neutral-200 text-neutral-800'
            : 'bg-neutral-50/50 border-neutral-200/60 text-neutral-400'
        }`}>
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-[11px] font-mono">Constraints</span>
            {analysis.hasConstraints ? (
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-medium">
                <Check className="w-3 h-3" /> Clear
              </span>
            ) : (
              <span className="text-[10px] text-neutral-400">Missing</span>
            )}
          </div>
          <p className="text-[11px] text-neutral-500 leading-tight">
            Format schemas, types, and operational bounds.
          </p>
        </div>
      </div>

      {/* Live Improvement Suggestions (if any) */}
      {analysis.suggestions.length > 0 && analysis.score < 90 && (
        <div className="p-3 rounded-xl bg-neutral-100/70 border border-neutral-200 text-xs">
          <div className="flex items-center gap-1.5 font-medium text-black mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-neutral-700" />
            <span>Echo Suggestions for 90+ Score:</span>
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
