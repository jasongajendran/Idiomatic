import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquareCode, 
  GitPullRequest, 
  Kanban, 
  Sparkles, 
  Send, 
  Hash, 
  CheckCircle2, 
  AlertTriangle,
  Terminal,
  Cpu,
  Layers
} from 'lucide-react';
import { Scenario, ScenarioType, Idiom } from '../types';
import { SCENARIOS_DATA } from '../data/scenariosData';

interface ContextualSimulatorProps {
  onSelectTerm: (termId: string) => void;
  allIdioms: Idiom[];
}

export const ContextualSimulator: React.FC<ContextualSimulatorProps> = ({
  onSelectTerm,
  allIdioms
}) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(SCENARIOS_DATA[0].id);
  const [userComment, setUserComment] = useState('');
  const [addedComments, setAddedComments] = useState<Array<{ id: string; author: string; role: string; content: string; timestamp: string }>>([]);
  const [feedbackMsg, setFeedbackMsg] = useState<{ text: string; type: 'success' | 'info' } | null>(null);

  const scenario = SCENARIOS_DATA.find((s) => s.id === selectedScenarioId) || SCENARIOS_DATA[0];

  const getScenarioIcon = (type: ScenarioType) => {
    switch (type) {
      case 'slack': return <Hash className="w-4 h-4 text-emerald-400" />;
      case 'pr_review': return <GitPullRequest className="w-4 h-4 text-purple-400" />;
      case 'jira': return <Kanban className="w-4 h-4 text-cyan-400" />;
      default: return <MessageSquareCode className="w-4 h-4 text-amber-400" />;
    }
  };

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userComment.trim()) return;

    const newComment = {
      id: `custom-${Date.now()}`,
      author: 'You (Developer)',
      role: 'Software Engineer',
      content: userComment,
      timestamp: 'Just now'
    };

    setAddedComments((prev) => [...prev, newComment]);

    // Check if user comment contains any idioms
    const lower = userComment.toLowerCase();
    const usedIdioms = allIdioms.filter(i => lower.includes(i.term.toLowerCase()) || lower.includes(i.id));

    if (usedIdioms.length > 0) {
      setFeedbackMsg({
        text: `Great usage! You incorporated ${usedIdioms.map(i => `"${i.term}"`).join(', ')} in realistic workplace context.`,
        type: 'success'
      });
    } else {
      setFeedbackMsg({
        text: 'Message posted! Tip: Try incorporating terms like "YAGNI", "Blast Radius", or "Circle Back" to practice workplace vernacular.',
        type: 'info'
      });
    }

    setUserComment('');
    setTimeout(() => setFeedbackMsg(null), 6000);
  };

  // Helper to render message content with highlighted interactive term pills
  const renderInteractiveContent = (content: string, highlightedTerms: string[]) => {
    if (!highlightedTerms || highlightedTerms.length === 0) {
      return <span>{content}</span>;
    }

    let parts: React.ReactNode[] = [];
    let currentText = content;

    highlightedTerms.forEach((termId) => {
      const idiom = allIdioms.find((i) => i.id === termId);
      if (!idiom) return;

      const termName = idiom.term;
      const regex = new RegExp(`(${termName}|${termId.replace(/-/g, ' ')})`, 'gi');
      const matches = currentText.match(regex);

      if (matches && matches[0]) {
        const matchText = matches[0];
        const split = currentText.split(matchText);

        if (split[0]) {
          parts.push(<span key={Math.random()}>{split[0]}</span>);
        }

        parts.push(
          <button
            key={termId + Math.random()}
            onClick={() => onSelectTerm(termId)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 my-0.5 rounded-lg font-mono text-xs font-black bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500 hover:text-slate-950 transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
            title="Click to inspect idiom definition & logic analogy"
          >
            <Sparkles className="w-3 h-3 text-cyan-300 fill-cyan-300" />
            <span>{matchText}</span>
          </button>
        );

        currentText = split.slice(1).join(matchText);
      }
    });

    if (currentText) {
      parts.push(<span key={Math.random()}>{currentText}</span>);
    }

    return <>{parts}</>;
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Sophisticated Dark Banner */}
      <div className="rounded-3xl bg-[#080d1a] border border-cyan-500/20 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl shadow-cyan-500/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
              <MessageSquareCode className="w-3.5 h-3.5 text-cyan-400" />
              <span>SOPHISTICATED DARK — CONTEXTUAL SIMULATOR</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Workplace Scenario <br />
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                Conversational Simulator
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              Experience real-world developer standups, code reviews, incident response threads, and client alignment syncs. Click highlighted terms inline to inspect definitions, corporate translations, and system mechanics.
            </p>
          </div>

          {/* Scenario Selector Buttons */}
          <div className="flex flex-wrap md:flex-col gap-2.5 shrink-0">
            {SCENARIOS_DATA.map((sc) => (
              <button
                key={sc.id}
                onClick={() => {
                  setSelectedScenarioId(sc.id);
                  setAddedComments([]);
                }}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all duration-300 border ${
                  selectedScenarioId === sc.id
                    ? 'bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 text-white shadow-lg shadow-cyan-500/25 border-white/20'
                    : 'bg-[#030712] text-slate-400 border-white/10 hover:text-white hover:bg-slate-900'
                }`}
              >
                {getScenarioIcon(sc.type)}
                <span>{sc.contextTag}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dark Luxury Chat Window */}
      <div className="rounded-3xl bg-[#030712] border border-cyan-500/20 shadow-2xl overflow-hidden">
        
        {/* Terminal Header */}
        <div className="px-5 py-4 bg-[#0a101f] border-b border-cyan-500/20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-rose-500" />
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-xs font-mono text-cyan-300 ml-2 font-bold flex items-center gap-2">
              {getScenarioIcon(scenario.type)}
              {scenario.title}
            </span>
          </div>

          <div className="text-[11px] font-mono text-slate-400 hidden sm:block font-semibold">
            {scenario.subtitle}
          </div>
        </div>

        {/* Message Stream */}
        <div className="p-5 sm:p-8 space-y-6 max-h-[520px] overflow-y-auto font-sans text-sm bg-[#030712]">
          {scenario.messages.map((msg) => (
            <div key={msg.id} className="flex items-start gap-4 group">
              <img
                src={msg.avatar}
                alt={msg.author}
                className="w-10 h-10 rounded-2xl object-cover ring-2 ring-cyan-500/30 shadow-md"
              />
              <div className="flex-1 space-y-1.5">
                <div className="flex items-baseline gap-2.5">
                  <span className="font-bold text-white text-sm">{msg.author}</span>
                  <span className="text-[11px] font-mono font-bold text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded-md border border-cyan-500/20">
                    {msg.role}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono ml-auto">{msg.timestamp}</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#090f1d] border border-white/10 text-slate-200 leading-relaxed text-xs sm:text-sm shadow-md">
                  {renderInteractiveContent(msg.content, msg.highlightedTerms)}
                </div>
              </div>
            </div>
          ))}

          {/* User Added Comments */}
          {addedComments.map((cm) => (
            <div key={cm.id} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500 via-teal-600 to-emerald-600 flex items-center justify-center text-white font-black text-xs shadow-lg shadow-cyan-500/20">
                YOU
              </div>
              <div className="flex-1 space-y-1.5">
                <div className="flex items-baseline gap-2.5">
                  <span className="font-bold text-white text-sm">{cm.author}</span>
                  <span className="text-[11px] font-mono font-bold text-teal-300 bg-teal-500/10 px-2 py-0.5 rounded-md border border-teal-500/20">
                    {cm.role}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono ml-auto">{cm.timestamp}</span>
                </div>
                <div className="p-4 rounded-2xl bg-teal-950/40 border border-teal-500/30 text-teal-100 text-xs sm:text-sm">
                  {cm.content}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feedback Alert Toast */}
        <AnimatePresence>
          {feedbackMsg && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`mx-6 mb-4 p-3.5 rounded-2xl text-xs font-bold flex items-center gap-2.5 ${
                feedbackMsg.type === 'success'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              }`}
            >
              {feedbackMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertTriangle className="w-4 h-4 text-cyan-400" />}
              <span>{feedbackMsg.text}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reply Composer Form */}
        <div className="p-5 bg-[#0a101f] border-t border-cyan-500/20">
          <form onSubmit={handleSendComment} className="flex items-center gap-3">
            <input
              type="text"
              placeholder='Write a reply... (e.g. "Agreed, let’s not boil the ocean in phase 1.")'
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
              className="flex-1 px-4 py-3 rounded-2xl bg-[#030712] border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 transition-all font-sans"
            />
            <button
              type="submit"
              disabled={!userComment.trim()}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 text-white font-bold text-xs sm:text-sm flex items-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-cyan-500/20"
            >
              <Send className="w-4 h-4" />
              <span>Post Reply</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
