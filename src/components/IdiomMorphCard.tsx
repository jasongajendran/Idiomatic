import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Volume2, 
  Code2, 
  Sparkles, 
  Bookmark, 
  Copy, 
  Check, 
  ShieldAlert, 
  ShieldCheck, 
  ArrowRight,
  Building2,
  Terminal,
  Cpu,
  Target
} from 'lucide-react';
import { Idiom } from '../types';
import { speakTerm } from '../utils/speechUtils';

interface IdiomMorphCardProps {
  idiom: Idiom;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onInspect: (idiom: Idiom) => void;
}

export const IdiomMorphCard: React.FC<IdiomMorphCardProps> = ({
  idiom,
  isBookmarked,
  onToggleBookmark,
  onInspect
}) => {
  const [showUnderHood, setShowUnderHood] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleSpeak = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlayingAudio(true);
    await speakTerm(idiom.term);
    setIsPlayingAudio(false);
  };

  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(idiom.codeAnalogy.snippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Coding':
        return 'from-cyan-500/20 to-blue-500/20 text-cyan-300 border-cyan-500/40';
      case 'Management':
        return 'from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/40';
      case 'Operations':
        return 'from-amber-500/20 to-orange-500/20 text-amber-300 border-amber-500/40';
      case 'Strategy':
        return 'from-emerald-500/20 to-teal-500/20 text-emerald-300 border-emerald-500/40';
      default:
        return 'from-indigo-500/20 to-purple-500/20 text-indigo-300 border-indigo-500/40';
    }
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Coding': return <Terminal className="w-3.5 h-3.5" />;
      case 'Management': return <Building2 className="w-3.5 h-3.5" />;
      case 'Operations': return <Cpu className="w-3.5 h-3.5" />;
      case 'Strategy': return <Target className="w-3.5 h-3.5" />;
      default: return <Code2 className="w-3.5 h-3.5" />;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col justify-between rounded-3xl bg-slate-900/80 border border-white/10 hover:border-indigo-500/50 p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/15 backdrop-blur-xl overflow-hidden"
    >
      {/* Background ambient glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-500/20 transition-all duration-500" />

      <div>
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold font-mono border bg-gradient-to-r ${getCategoryColor(idiom.category)} shadow-sm`}>
              {getCategoryIcon(idiom.category)}
              {idiom.category}
            </span>
            <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-semibold bg-slate-800/80 text-slate-300 border border-slate-700/60">
              {idiom.seniority}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleSpeak}
              className={`p-2 rounded-xl border transition-all ${
                isPlayingAudio 
                  ? 'bg-indigo-500 text-white border-indigo-400 animate-pulse' 
                  : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white hover:bg-slate-700/80'
              }`}
              title="Pronunciation audio"
            >
              <Volume2 className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(idiom.id);
              }}
              className={`p-2 rounded-xl border transition-all ${
                isBookmarked
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 shadow-sm'
                  : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white hover:bg-slate-700/80'
              }`}
              title={isBookmarked ? 'Bookmarked' : 'Bookmark idiom'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Term & Bold Typography */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2 flex-wrap">
            <h3 className="text-2xl font-black tracking-tight text-white group-hover:text-indigo-300 transition-colors">
              {idiom.term}
            </h3>
            <span className="font-mono text-xs text-slate-400 tracking-wider">
              {idiom.phonetic}
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
            {idiom.realMeaning}
          </p>
        </div>

        {/* Editorial vs System Logic View Toggle */}
        <AnimatePresence mode="wait">
          {!showUnderHood ? (
            <motion.div
              key="standard-view"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-3 py-2"
            >
              {/* Corporate Translation Editorial Box */}
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-white/10 text-xs text-slate-300 leading-relaxed font-sans shadow-inner">
                <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-purple-400 mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>SAY VS DEVELOPER REALITY</span>
                </div>
                <p className="italic text-slate-200 font-medium leading-normal">"{idiom.corporateTranslation}"</p>
              </div>

              {/* Formality & Popularity */}
              <div className="flex items-center justify-between gap-2 pt-1 text-xs">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold ${
                  idiom.formality === 'Safe for Clients'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : idiom.formality === 'Internal Team Only'
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                }`}>
                  {idiom.formality === 'Safe for Clients' ? <ShieldCheck className="w-3.5 h-3.5" /> : <ShieldAlert className="w-3.5 h-3.5" />}
                  {idiom.formality}
                </span>

                <span className="text-[11px] text-slate-400 font-mono font-bold">
                  Popularity: {idiom.popularityScore}%
                </span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="code-view"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-3 py-2"
            >
              {/* System Logic Snippet */}
              <div className="relative rounded-2xl bg-slate-950 border border-indigo-500/30 p-3.5 font-mono text-xs text-indigo-200 overflow-x-auto shadow-inner">
                <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-800/80 text-[10px] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="uppercase tracking-wider font-bold">SYSTEM LOGIC ANALOGY</span>
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1 text-indigo-300 hover:text-white transition-colors"
                  >
                    {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="whitespace-pre-wrap leading-relaxed font-mono text-[11px] text-cyan-300">
                  {idiom.codeAnalogy.snippet}
                </pre>
              </div>

              {/* Etymology / Origin */}
              <div className="text-[11px] text-slate-300 leading-normal bg-slate-950/60 p-3 rounded-xl border border-white/5">
                <span className="text-indigo-300 font-bold">Origin: </span>
                {idiom.etymology}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Card Footer Actions */}
      <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2 mt-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowUnderHood(!showUnderHood);
          }}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
            showUnderHood
              ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
              : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800 border border-slate-700/80'
          }`}
        >
          <Code2 className="w-3.5 h-3.5 text-indigo-400" />
          <span>{showUnderHood ? 'Editorial View' : 'System Logic'}</span>
        </button>

        <button
          onClick={() => onInspect(idiom)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
        >
          <span>Inspect</span>
          <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
        </button>
      </div>
    </motion.div>
  );
};
