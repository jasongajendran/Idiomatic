import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Volume2, 
  Bookmark, 
  ArrowRight,
  Sparkles,
  MessageSquare,
  CheckCircle2
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
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleSpeak = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlayingAudio(true);
    await speakTerm(idiom.term);
    setIsPlayingAudio(false);
  };

  const primaryExample = idiom.examples && idiom.examples.length > 0 ? idiom.examples[0] : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      onClick={() => onInspect(idiom)}
      className="group relative flex flex-col justify-between rounded-2xl bg-slate-900/90 border border-white/10 hover:border-indigo-500/50 p-5 sm:p-6 transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/10 cursor-pointer backdrop-blur-xl"
    >
      <div>
        {/* Header Row: Category Pill & Audio + Bookmark Actions */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
            {idiom.category}
          </span>

          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={handleSpeak}
              className={`p-2 rounded-xl border transition-all ${
                isPlayingAudio 
                  ? 'bg-indigo-500 text-white border-indigo-400 animate-pulse' 
                  : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white hover:bg-slate-700/80'
              }`}
              title="Pronounce phrase"
            >
              <Volume2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onToggleBookmark(idiom.id)}
              className={`p-2 rounded-xl border transition-all ${
                isBookmarked
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 shadow-sm'
                  : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white hover:bg-slate-700/80'
              }`}
              title={isBookmarked ? 'Bookmarked' : 'Bookmark phrase'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Term & Phonetics */}
        <div className="mb-3">
          <div className="flex items-baseline gap-2 flex-wrap">
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-indigo-300 transition-colors">
              {idiom.term}
            </h3>
            {idiom.phonetic && (
              <span className="font-mono text-xs text-slate-400">
                {idiom.phonetic}
              </span>
            )}
          </div>

          {/* Real Plain English Meaning */}
          <p className="text-sm text-slate-200 mt-2 leading-relaxed font-sans font-medium">
            {idiom.realMeaning}
          </p>
        </div>

        {/* Translation / Subtext Box */}
        {idiom.corporateTranslation && (
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/10 text-xs text-slate-200 space-y-1 my-3 shadow-inner">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-purple-300 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>In Tech Meetings & Chats</span>
            </div>
            <p className="italic text-slate-200 leading-relaxed font-sans">
              "{idiom.corporateTranslation}"
            </p>
          </div>
        )}

        {/* Workplace Dialogue Example */}
        {primaryExample && (
          <div className="pt-1 pb-2">
            <div className="flex items-start gap-2 text-xs text-slate-300">
              <MessageSquare className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <span className="text-slate-400 font-semibold">{primaryExample.speaker} ({primaryExample.context}): </span>
                <span className="text-slate-200">"{primaryExample.quote}"</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Card Footer: Plain Direct Wording & Inspect Action */}
      <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3 mt-2 text-xs">
        <div className="flex items-center gap-1.5 text-slate-400 min-w-0 pr-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="truncate text-slate-300">
            <span className="text-slate-400 font-medium">Plain wording: </span>
            {idiom.safeAlternative}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onInspect(idiom);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-indigo-300 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
        >
          <span>Details</span>
          <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
        </button>
      </div>
    </motion.div>
  );
};
