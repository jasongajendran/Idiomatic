import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Volume2, 
  Sparkles, 
  Bookmark,
  MessageSquare,
  CheckCircle2,
  BookOpen
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

  if (!idiom) return null;

  const handleSpeak = async () => {
    setIsPlaying(true);
    await speakTerm(idiom.term);
    setIsPlaying(false);
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
              <span className="px-3 py-1 rounded-xl text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {idiom.category}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onToggleBookmark(idiom.id)}
                  className={`p-2.5 rounded-xl border transition-all ${
                    isBookmarked
                      ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 shadow-sm'
                      : 'bg-slate-900 text-slate-400 border-white/10 hover:text-white'
                  }`}
                  title={isBookmarked ? 'Bookmarked' : 'Bookmark'}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
                </button>

                <button
                  onClick={onClose}
                  className="p-2.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-white/10 transition-all"
                  title="Close"
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
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans font-medium">
                {idiom.realMeaning}
              </p>
            </div>

            {/* Practical Subtext & Meeting Translation */}
            {idiom.corporateTranslation && (
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 space-y-1.5 shadow-inner">
                <span className="text-[11px] font-bold text-purple-400 flex items-center gap-1.5 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  In Tech Meetings & Chats
                </span>
                <p className="text-xs sm:text-sm text-slate-200 italic font-medium leading-relaxed font-sans">
                  "{idiom.corporateTranslation}"
                </p>
              </div>
            )}

            {/* Real World Dialogue Examples */}
            {idiom.examples && idiom.examples.length > 0 && (
              <div className="space-y-2.5">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
                  Real-World Workplace Dialogue
                </span>
                <div className="space-y-2">
                  {idiom.examples.map((ex, idx) => (
                    <div key={idx} className="rounded-xl bg-slate-900/80 p-3 border border-white/5 space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                        <span className="text-indigo-300 font-bold">{ex.speaker}</span>
                        <span className="bg-slate-800 px-2 py-0.5 rounded text-[11px] text-slate-300">{ex.context}</span>
                      </div>
                      <p className="italic text-slate-100 text-xs sm:text-sm">"{ex.quote}"</p>
                      <p className="text-xs text-indigo-200 font-sans">→ Meaning: {ex.translatedQuote}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Direct Alternative / Plain Language */}
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
              <div className="flex items-center gap-1.5 font-bold text-emerald-300 mb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Plain English Alternative</span>
              </div>
              <p className="text-slate-200 font-medium">"{idiom.safeAlternative}"</p>
            </div>

            {/* Origin & Etymology */}
            {idiom.etymology && (
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                <div className="flex items-center gap-1.5 font-bold text-indigo-300 mb-1">
                  <BookOpen className="w-4 h-4 text-indigo-400" />
                  <span>Origin & Background</span>
                </div>
                <p>{idiom.etymology}</p>
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-white/10">
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm border border-indigo-400/30 transition-colors shadow-lg min-h-[44px]"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
