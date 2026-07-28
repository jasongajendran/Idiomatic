import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Volume2, 
  Sparkles, 
  Copy, 
  Check, 
  Bookmark, 
  Terminal
} from 'lucide-react';
import { Idiom } from '../types';
import { speakTerm } from '../utils/speechUtils';

interface JargonInspectorSheetProps {
  idiom: Idiom | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export const JargonInspectorSheet: React.FC<JargonInspectorSheetProps> = ({
  idiom,
  onClose,
  isBookmarked,
  onToggleBookmark
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!idiom) return null;

  const handleSpeak = async () => {
    setIsPlaying(true);
    await speakTerm(idiom.term);
    setIsPlaying(false);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(idiom.codeAnalogy.snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-md">
        
        {/* Backdrop click to close */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0"
        />

        {/* Slide-over Sheet Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative z-10 w-full max-w-lg h-full bg-slate-950/95 border-l border-white/10 p-6 sm:p-8 space-y-6 overflow-y-auto shadow-2xl flex flex-col justify-between backdrop-blur-2xl"
        >
          <div className="space-y-6">
            
            {/* Top Sheet Actions */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {idiom.category}
                </span>
                <span className="px-3 py-1 rounded-xl text-xs font-mono text-slate-300 bg-slate-900 border border-white/10">
                  {idiom.seniority}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onToggleBookmark(idiom.id)}
                  className={`p-2.5 rounded-xl border transition-all ${
                    isBookmarked
                      ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 shadow-sm'
                      : 'bg-slate-900 text-slate-400 border-white/10 hover:text-white'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
                </button>

                <button
                  onClick={onClose}
                  className="p-2.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-white/10 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Title & Speech */}
            <div className="space-y-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h2 className="text-2xl sm:text-3xl font-black text-white">{idiom.term}</h2>
                <button
                  onClick={handleSpeak}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all ${
                    isPlaying
                      ? 'bg-indigo-600 text-white border-indigo-400 animate-pulse'
                      : 'bg-slate-900 text-slate-300 border-white/10 hover:bg-slate-800'
                  }`}
                >
                  <Volume2 className="w-4 h-4 text-indigo-400" />
                  <span>{idiom.phonetic}</span>
                </button>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                {idiom.realMeaning}
              </p>
            </div>

            {/* Corporate Translation Box */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 space-y-1.5 shadow-inner">
              <span className="text-[11px] font-mono font-bold text-purple-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                WHAT MANAGEMENT SAYS vs WHAT DEVS HEAR
              </span>
              <p className="text-xs sm:text-sm text-slate-200 italic font-medium leading-relaxed">
                "{idiom.corporateTranslation}"
              </p>
            </div>

            {/* System Logic Analogy */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-indigo-300 font-bold">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-indigo-400" />
                  SYSTEM LOGIC ANALOGY
                </span>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 font-mono text-xs text-cyan-300 border border-indigo-500/30 overflow-x-auto shadow-inner">
                <pre>{idiom.codeAnalogy.snippet}</pre>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                {idiom.codeAnalogy.explanation}
              </p>
            </div>

            {/* Etymology & Formality */}
            <div className="space-y-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 text-xs text-slate-300">
                <span className="font-bold text-indigo-300 block mb-1">Origin & Etymology:</span>
                {idiom.etymology}
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 text-xs text-slate-300">
                <span className="font-bold text-indigo-300 block mb-1">Safe Alternative Phrase:</span>
                "{idiom.safeAlternative}"
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10">
            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs border border-white/10 transition-colors shadow-lg"
            >
              Close Inspector
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
