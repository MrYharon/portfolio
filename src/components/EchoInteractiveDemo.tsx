import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Check, Zap, ShieldCheck, RotateCcw, CornerDownLeft } from 'lucide-react';

// Exact rules & heuristic patterns ported directly from Hugh's Echo Manifest V3 repository (MrYharon/Echo)
const FILLER_PREFIX_RE =
  /^(hey|hi|hello|please\s+)?(can\s+you\s+please\s+help\s+me|could\s+you\s+please\s+help\s+me|can\s+you\s+help\s+me|could\s+you\s+help\s+me|help\s+me\s+to|help\s+me|assist\s+me\s+with|assist\s+me|can\s+you\s+please|could\s+you\s+please|please\s+can\s+you|would\s+you\s+be\s+able\s+to|i\s+want\s+you\s+to|i\s+need\s+you\s+to|i\s+would\s+like\s+you\s+to|i'd\s+like\s+you\s+to|hey\s+can\s+you|hi\s+can\s+you|hello\s+can\s+you|can\s+you|could\s+you)\s+(please\s+)?/i;

const DOMAINS = {
  code: /\b(code|script|python|javascript|typescript|react|vue|angular|node|html|css|sql|database|api|endpoint|function|class|method|regex|bug|error|refactor|algorithm|query|backend|frontend|fullstack)\b/i,
  writing: /\b(write|draft|email|letter|article|blog|essay|memo|proposal|newsletter|speech|pitch|resume|cover\s+letter|copy|headline|tagline)\b/i,
  explanation: /\b(explain|teach|how\s+does|how\s+to|what\s+is|understand|difference\s+between|overview|break\s+down|demystify)\b/i,
  analysis: /\b(analyze|review|audit|compare|contrast|evaluate|pros\s+and\s+cons|critique|benchmark|assess)\b/i,
};

function detectDomain(text: string): 'code' | 'writing' | 'explanation' | 'analysis' | 'general' {
  for (const [domain, regex] of Object.entries(DOMAINS)) {
    if (regex.test(text)) return domain as any;
  }
  return 'general';
}

function getConstraintRecommendation(text: string): string {
  const domain = detectDomain(text);
  switch (domain) {
    case 'code':
      return 'Provide clean, well-commented code with error handling and a brief explanation of key logic.';
    case 'writing':
      return 'Use a clear, professional tone with logical paragraph flow and no conversational filler.';
    case 'explanation':
      return 'Explain clearly with a real-world analogy, then summarize key takeaways in bullet points.';
    case 'analysis':
      return 'Structure the evaluation with clear criteria, trade-offs, and an actionable recommendation.';
    default:
      return 'Structure the response with clear steps, direct answers, and bullet points.';
  }
}

// Echo's real 5-Rule Engine ported from src/analyzer.js
const ACTION_VERBS = new Set([
  'write', 'create', 'draft', 'summarize', 'explain', 'analyze',
  'compare', 'contrast', 'list', 'translate', 'fix', 'debug',
  'generate', 'produce', 'design', 'plan', 'review', 'rewrite',
  'improve', 'outline', 'extract', 'classify', 'convert', 'define',
  'describe', 'evaluate', 'interpret', 'recommend', 'refactor',
  'structure', 'brainstorm', 'simplify', 'check', 'proofread', 'edit',
  'build', 'develop', 'provide', 'implement',
]);

const ACTION_PREFIXES = /\b(please|can you|could you|could i|can i|hey|hi|hello|i want you to|i need you to)\b/i;
const FORMAT_RE = /\b(list|table|json|csv|bullets?|headings?|code|markdown|diagram|outline|template|steps?|summary|email|script|essay|report|paragraphs?|sentence)\b/i;
const CONSTRAINT_RE = /\b(word count|words|characters|pages?|length|tone|style|formal|casual|friendly|audience|beginner|expert|deadline|limit|min|max|examples?|in the style of)\b/i;

const VAGUE_PATTERNS = [
  {
    re: /\b(help me to|help me|assist me with|assist me)\b/i,
    tip: 'Replace conversational filler with direct action verbs.',
    replacement: 'Provide ',
  },
  {
    re: /\b(something good|something nice)\b/i,
    tip: 'Specify quality metrics or concrete requirements.',
    replacement: 'production-ready specifications',
  },
  {
    re: /\b(something|anything|stuff|things?|whatever)\b/i,
    tip: 'Name the specific subject or target data.',
    replacement: 'key specifications and components',
  },
  {
    re: /\b(nice|good|great|better|fine)\b/i,
    tip: 'Describe the exact criteria (e.g. robust, responsive, formal).',
    replacement: 'high-quality and clean',
  },
  {
    re: /\b(etc(\.|\.\.\.)?|and so on|etcetera)\b/i,
    tip: 'List requirements explicitly instead of open-ended placeholders.',
    replacement: 'and relevant edge cases',
  },
];

interface Issue {
  ruleId: string;
  ruleName: string;
  severity: 'error' | 'warning' | 'suggestion';
  message: string;
  tip: string;
}

interface AutoCorrectChange {
  type: string;
  title: string;
  replacement: string;
}

interface AutoCorrectResult {
  original: string;
  corrected: string;
  changed: boolean;
  changes: AutoCorrectChange[];
}

// Echo's real autocorrect engine ported from src/autocorrect.js
function runEchoAutoCorrect(text: string): AutoCorrectResult {
  const raw = (text || '').trim();
  if (!raw) {
    return { original: raw, corrected: raw, changed: false, changes: [] };
  }

  const changes: AutoCorrectChange[] = [];
  let updated = raw;

  // 1. Strip conversational filler prefix
  const fillerMatch = updated.match(FILLER_PREFIX_RE);
  if (fillerMatch) {
    const matchedPrefix = fillerMatch[0];
    updated = updated.slice(matchedPrefix.length).trim();
    changes.push({
      type: 'prefix',
      title: 'Removed filler prefix',
      replacement: '',
    });
  }

  // Capitalize first character
  if (updated.length > 0) {
    updated = updated.charAt(0).toUpperCase() + updated.slice(1);
  }

  // 2. Upgrade weak starting verbs
  const domain = detectDomain(updated);
  const weakStarters = [
    {
      re: /^Make\s+(a\s+|an\s+|the\s+)?/i,
      replacement: (_m: string, art?: string) => (domain === 'code' ? 'Build ' : domain === 'writing' ? 'Draft ' : 'Create ') + (art || ''),
      title: "Replaced weak verb 'Make' with direct action",
    },
    {
      re: /^Do\s+(a\s+|an\s+|the\s+)?/i,
      replacement: (_m: string, art?: string) => 'Execute ' + (art || ''),
      title: "Replaced generic 'Do' with directive action",
    },
    {
      re: /^Fix\s+(my\s+|the\s+)?(bug\s+in\s+|error\s+in\s+|issue\s+in\s+)?/i,
      replacement: 'Debug and resolve the issue in ',
      title: 'Clarified debugging objective',
    },
    {
      re: /^Give\s+me\s+(a\s+|an\s+|the\s+|some\s+)?/i,
      replacement: (_m: string, art?: string) => 'Provide ' + (art || ''),
      title: "Standardized request to 'Provide'",
    },
    {
      re: /^Tell\s+me\s+(about\s+)?/i,
      replacement: 'Explain ',
      title: 'Specified explanation directive',
    },
    {
      re: /^Look\s+at\s+(this\s+|the\s+)?/i,
      replacement: 'Review and evaluate ',
      title: 'Strengthened review request',
    },
    {
      re: /^What\s+is\s+/i,
      replacement: 'Explain ',
      title: 'Converted question to direct explanation',
    },
    {
      re: /^How\s+does\s+/i,
      replacement: 'Explain the mechanics and operation of ',
      title: 'Converted question to direct explanation',
    },
    {
      re: /^How\s+to\s+/i,
      replacement: 'Demonstrate step-by-step how to ',
      title: 'Converted question to direct tutorial',
    },
  ];

  for (const ws of weakStarters) {
    if (ws.re.test(updated)) {
      const rep = typeof ws.replacement === 'function' ? ws.replacement : () => ws.replacement;
      updated = updated.replace(ws.re, rep as any);
      changes.push({
        type: 'verb',
        title: ws.title,
        replacement: updated.substring(0, 15),
      });
      break;
    }
  }

  // If first word is still not an action verb, add domain-appropriate action verb
  const firstWord = updated.split(/\s+/)[0]?.toLowerCase() || '';
  if (updated.length > 0 && !ACTION_VERBS.has(firstWord)) {
    if (/^(with|for|about)\s+/i.test(updated)) {
      updated = updated.replace(/^(with|for|about)\s+/i, '');
    }
    let actionPrefix = 'Provide ';
    if (domain === 'code') actionPrefix = 'Build ';
    else if (domain === 'writing') actionPrefix = 'Draft ';
    else if (domain === 'analysis') actionPrefix = 'Analyze ';
    else if (domain === 'explanation') actionPrefix = 'Explain ';

    updated = actionPrefix + updated.charAt(0).toLowerCase() + updated.slice(1);
    changes.push({
      type: 'verb',
      title: `Added direct action verb '${actionPrefix.trim()}'`,
      replacement: actionPrefix,
    });
  }

  // 3. Replace vague phrasing
  const vagueReplacements = [
    { re: /\bhelp me\b/gi, rep: 'assist by providing', title: "Clarified 'help me'" },
    { re: /\bsomething good\b/gi, rep: 'high-quality, production-ready specifications', title: "Replaced vague 'something good'" },
    { re: /\bsomething nice\b/gi, rep: 'a clean, polished implementation', title: "Replaced vague 'something nice'" },
    { re: /\bmake it good\b/gi, rep: 'Ensure high quality and clean structure', title: "Replaced vague 'make it good'" },
    { re: /\bstuff about\b/gi, rep: 'essential details regarding', title: "Replaced vague 'stuff about'" },
    { re: /\bthings about\b/gi, rep: 'core concepts and specifications for', title: "Replaced vague 'things about'" },
    { re: /\betc(\.|\.\.\.)?\b/gi, rep: 'and associated edge cases', title: "Clarified open-ended 'etc'" },
    { re: /\band so on\b/gi, rep: 'along with supporting requirements', title: "Clarified 'and so on'" },
  ];

  for (const vr of vagueReplacements) {
    if (vr.re.test(updated)) {
      updated = updated.replace(vr.re, vr.rep);
      changes.push({
        type: 'clarity',
        title: vr.title,
        replacement: vr.rep,
      });
    }
  }

  // 4. Ensure trailing punctuation on base sentence
  if (updated && !/[.!?]$/.test(updated)) {
    updated += '.';
  }

  // 5. Append domain-tailored output constraints if missing (without duplicating)
  const hasConstraint = CONSTRAINT_RE.test(updated);
  const hasExplicitFormat = /\b(in\s+json|as\s+json|in\s+markdown|bullets?|numbered\s+list|table\s+format|step-by-step|well-commented|error\s+handling|code\s+comments)\b/i.test(updated);

  if ((!hasConstraint || !hasExplicitFormat) && updated.length >= 10) {
    const constraint = getConstraintRecommendation(updated);
    // Avoid duplicate appending if text already has similar wording
    if (!updated.toLowerCase().includes(constraint.toLowerCase().slice(0, 20))) {
      updated += ' ' + constraint;
      changes.push({
        type: 'constraint',
        title: 'Added output constraints and format guidelines',
        replacement: constraint,
      });
    }
  }

  const changed = raw !== updated;
  return {
    original: raw,
    corrected: updated,
    changed,
    changes,
  };
}

export const EchoInteractiveDemo: React.FC = () => {
  const [promptText, setPromptText] = useState('what is a cat');
  const [history, setHistory] = useState<string[]>([]);
  const [appliedChanges, setAppliedChanges] = useState<AutoCorrectChange[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (msg: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(msg);
    toastTimeoutRef.current = setTimeout(() => setToastMessage(null), 2500);
  };

  // Real-time analysis using Echo's authentic rule weights
  const analysis = useMemo(() => {
    const text = promptText.trim();
    if (!text) {
      return {
        score: 0,
        grade: 'D',
        domain: 'general',
        issues: [],
      };
    }

    const domain = detectDomain(text);
    const issues: Issue[] = [];

    // Rule 1: Concrete task (tooShort) - Weight 40
    if (text.length < 12) {
      issues.push({
        ruleId: 'tooShort',
        ruleName: 'Concrete task',
        severity: 'error',
        message: 'Prompt is too short. Specify the exact task, context, and desired result.',
        tip: 'Define what you need, the format, and the context.',
      });
    }

    // Rule 2: Vague language (weakVerbs) - Weight 20
    for (const p of VAGUE_PATTERNS) {
      const m = p.re.exec(text);
      if (m) {
        issues.push({
          ruleId: 'weakVerbs',
          ruleName: 'Vague language',
          severity: 'warning',
          message: `Vague phrasing detected: "${m[0]}".`,
          tip: p.tip,
        });
        break;
      }
    }

    // Rule 3: Action verb - Weight 15
    if (text.length >= 12) {
      const stripped = text.replace(ACTION_PREFIXES, '').trim();
      const firstWord = stripped.split(/\s+/)[0];
      if (firstWord && !ACTION_VERBS.has(firstWord.toLowerCase())) {
        issues.push({
          ruleId: 'actionVerb',
          ruleName: 'Action verb',
          severity: 'suggestion',
          message: `Start directly with an action verb instead of "${firstWord}".`,
          tip: 'Verbs like build, draft, explain, analyze, or debug ensure focused AI output.',
        });
      }
    }

    // Rule 4: Constraints & format - Weight 20
    if (text.length >= 25) {
      if (!FORMAT_RE.test(text) && !CONSTRAINT_RE.test(text)) {
        issues.push({
          ruleId: 'missingSpecifics',
          ruleName: 'Constraints & format',
          severity: 'warning',
          message: 'No output format or constraints specified.',
          tip: 'Specify format (bullet points, code, JSON) and tone/length limits.',
        });
      }
    }

    // Rule 5: One ask at a time - Weight 10
    const questions = (text.match(/\?/g) || []).length;
    if (questions >= 2) {
      issues.push({
        ruleId: 'multipleAsks',
        ruleName: 'One ask at a time',
        severity: 'suggestion',
        message: `${questions} separate questions bundled together.`,
        tip: 'Split into distinct prompts or number them explicitly.',
      });
    }

    // Calculate score (100 minus weights)
    const weights: Record<string, number> = {
      tooShort: 40,
      weakVerbs: 20,
      actionVerb: 15,
      missingSpecifics: 20,
      multipleAsks: 10,
    };

    let score = 100;
    for (const issue of issues) {
      score -= weights[issue.ruleId] || 15;
    }
    score = Math.max(10, Math.min(100, Math.round(score)));

    // Grade according to Echo's official grade ranges
    let grade = 'D';
    if (score >= 85) grade = 'A';
    else if (score >= 70) grade = 'B';
    else if (score >= 50) grade = 'C';

    return {
      score,
      grade,
      domain,
      issues,
    };
  }, [promptText]);

  // Real Echo Auto-Correct Handler
  const handleAutoCorrect = () => {
    const result = runEchoAutoCorrect(promptText);

    if (!result.changed || result.corrected === promptText) {
      showToast('Prompt is already optimized by Echo!');
      return;
    }

    setHistory((prev) => [...prev, promptText]);
    setPromptText(result.corrected);
    setAppliedChanges(result.changes);
    showToast(`✨ Echo auto-corrected ${result.changes.length} issue${result.changes.length > 1 ? 's' : ''}!`);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setPromptText(prev);
    setAppliedChanges([]);
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
  }, [promptText]);

  const domainLabels: Record<string, string> = {
    code: 'Software Engineering',
    writing: 'Writing & Editorial',
    explanation: 'Conceptual Explanation',
    analysis: 'Evaluation & Analysis',
    general: 'General Query',
  };

  return (
    <div className="space-y-4">
      {/* Real Echo Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-neutral-100 text-xs">
        <div className="flex items-center gap-1.5 text-neutral-600">
          <ShieldCheck className="w-4 h-4 text-neutral-800" />
          <span className="font-semibold text-black">Real Echo Engine</span>
          <span className="text-neutral-300">•</span>
          <span className="font-mono text-neutral-500">100% Client-Side MV3 Heuristics</span>
        </div>

        {/* Real-time Domain Tag */}
        <div className="flex items-center gap-1.5 font-mono text-[11px] bg-neutral-100 text-neutral-700 px-2.5 py-0.5 rounded-full border border-neutral-200/70">
          <span className="text-neutral-400">Domain:</span>
          <span className="font-semibold text-black">{domainLabels[analysis.domain] || 'General'}</span>
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

        {/* Echo Floating Score Pill (Directly mimics Echo's real floating UI) */}
        <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-neutral-200/70">
          <div className="flex items-center gap-2">
            {/* Live Score Pill */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-900 text-white font-mono text-xs shadow-2xs">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  analysis.score >= 85
                    ? 'bg-sky-400 animate-pulse'
                    : analysis.score >= 70
                    ? 'bg-blue-400'
                    : analysis.score >= 50
                    ? 'bg-amber-400'
                    : 'bg-red-400'
                }`}
              />
              <span className="font-semibold">{analysis.score}</span>
              <span className="text-neutral-400 text-[10px]">/ 100</span>
              <span className="text-neutral-300 ml-0.5 text-[11px]">Grade {analysis.grade}</span>
            </div>

            <span className="text-[11px] font-mono text-neutral-500 hidden sm:inline">
              Echo Live Evaluation
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
                analysis.score >= 85
                  ? 'bg-neutral-100 text-neutral-500 border border-neutral-200/80 cursor-default'
                  : 'bg-white text-black border border-neutral-300 hover:border-black hover:bg-neutral-50'
              }`}
              title="Auto-correct with Echo heuristic engine (Alt + E)"
            >
              <Zap
                className={`w-3.5 h-3.5 transition-transform ${
                  analysis.score >= 85 ? 'text-neutral-400' : 'text-amber-500 group-hover:scale-110'
                }`}
              />
              <span>{analysis.score >= 85 ? 'Optimized' : 'Auto-Correct'}</span>
              <kbd className="hidden sm:inline font-mono text-[10px] px-1 py-0.2 rounded bg-neutral-100 border border-neutral-200 text-neutral-600">
                Alt+E
              </kbd>
            </button>
          </div>
        </div>

        {/* Textarea — Zero presets, write literally anything! */}
        <div className="relative">
          <textarea
            value={promptText}
            onChange={(e) => {
              setPromptText(e.target.value);
              setAppliedChanges([]);
            }}
            rows={3}
            placeholder="Type any prompt here to test Echo (e.g. 'what is a cat', 'can you please help me write a python scraper', 'tell me about quantum computing')..."
            className="w-full bg-transparent text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none resize-none leading-relaxed"
          />

          <div className="flex items-center justify-between pt-1 border-t border-neutral-100 text-[11px] text-neutral-400 font-mono">
            <span>Evaluating via Echo rule engine</span>
            <div className="flex items-center gap-1 text-neutral-500">
              <span>{promptText.length} chars</span>
              <CornerDownLeft className="w-3 h-3 text-neutral-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Applied Changes Breakdown (Appears when Auto-Correct is triggered) */}
      {appliedChanges.length > 0 && (
        <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs animate-tab-fade">
          <div className="flex items-center gap-1.5 font-medium text-black mb-2">
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-mono text-[11px]">Applied Echo Heuristic Transformations:</span>
          </div>
          <div className="space-y-1.5">
            {appliedChanges.map((change, idx) => (
              <div key={idx} className="flex items-start gap-2 text-[11px] text-neutral-700 font-mono">
                <span className="text-neutral-400 shrink-0 select-none">→</span>
                <span>{change.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Rules Feedback List */}
      {analysis.issues.length > 0 ? (
        <div className="space-y-1.5">
          <p className="text-[11px] font-mono text-neutral-400">Echo Rule Diagnostic:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {analysis.issues.map((issue, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl border border-neutral-200 bg-white shadow-2xs space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-semibold text-black">
                    {issue.ruleName}
                  </span>
                  <span
                    className={`text-[10px] font-mono uppercase px-1.5 py-0.2 rounded ${
                      issue.severity === 'error'
                        ? 'bg-red-50 text-red-600 border border-red-200'
                        : issue.severity === 'warning'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-neutral-100 text-neutral-600 border border-neutral-200'
                    }`}
                  >
                    {issue.severity}
                  </span>
                </div>
                <p className="text-[11px] text-neutral-600 leading-tight">{issue.message}</p>
                <p className="text-[10px] text-neutral-400 leading-tight font-mono">💡 {issue.tip}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/80 text-xs flex items-center gap-2 text-emerald-800">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="text-[11px] font-mono">
            All 5 Echo heuristic rules passed. High-performing prompt ready for any AI model!
          </span>
        </div>
      )}
    </div>
  );
};
