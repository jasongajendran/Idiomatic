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
import { Idiom, WorkflowCategory } from '../types';
import { speakTerm, speakSentence } from '../utils/speechUtils';

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
  const [isPlayingMeaningAudio, setIsPlayingMeaningAudio] = useState(false);
  const [isPlayingExampleAudio, setIsPlayingExampleAudio] = useState(false);

  const handleSpeak = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlayingAudio(true);
    await speakTerm(idiom.term);
    setIsPlayingAudio(false);
  };

  const handleSpeakMeaning = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlayingMeaningAudio(true);
    await speakSentence(idiom.realMeaning);
    setIsPlayingMeaningAudio(false);
  };

  const handleSpeakExample = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!primaryExample) return;
    setIsPlayingExampleAudio(true);
    await speakSentence(primaryExample.quote);
    setIsPlayingExampleAudio(false);
  };

  const primaryExample = idiom.examples && idiom.examples.length > 0 ? idiom.examples[0] : null;

  const getCategoryBadge = (category: WorkflowCategory) => {
    switch (category) {
      case 'Coding':
        return 'bg-sky-500/20 text-sky-300 border-sky-400/40';
      case 'Management':
        return 'bg-amber-500/20 text-amber-300 border-amber-400/40';
      case 'Operations':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40';
      case 'Strategy':
        return 'bg-purple-500/20 text-purple-300 border-purple-400/40';
      default:
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-400/40';
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      onClick={() => onInspect(idiom)}
      className="group relative flex flex-col justify-between rounded-2xl bg-slate-900/95 border border-slate-700/70 hover:border-indigo-400/70 p-5 sm:p-6 transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/15 cursor-pointer backdrop-blur-xl shadow-lg"
    >
      <div>
        {/* Header Row: Category Pill & Audio + Bookmark Actions */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold border ${getCategoryBadge(idiom.category)}`}>
            {idiom.category}
          </span>

          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={handleSpeak}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl border transition-all flex items-center justify-center shrink-0 cursor-pointer ${
                isPlayingAudio 
                  ? 'bg-indigo-600 text-white border-indigo-400 animate-pulse shadow-md' 
                  : 'bg-slate-800 text-indigo-300 border-slate-700 hover:text-white hover:bg-indigo-600'
              }`}
              title="Pronounce phrase"
              aria-label={`Pronounce ${idiom.term}`}
            >
              <Volume2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onToggleBookmark(idiom.id)}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl border transition-all flex items-center justify-center shrink-0 cursor-pointer ${
                isBookmarked
                  ? 'bg-amber-500/25 text-amber-300 border-amber-500/50 shadow-sm'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white hover:bg-slate-700'
              }`}
              title={isBookmarked ? 'Bookmarked' : 'Bookmark phrase'}
              aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark phrase'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Term Title */}
        <div className="mb-3">
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-indigo-300 transition-colors">
            {idiom.term}
          </h3>

          {/* Real Plain English Meaning with Aligned Audio Read button */}
          <div className="mt-2.5 flex items-start justify-between gap-3">
            <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-sans font-medium flex-1">
              {idiom.realMeaning}
            </p>
            <button
              onClick={handleSpeakMeaning}
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl border transition-all shrink-0 flex items-center justify-center cursor-pointer mt-0.5 ${
                isPlayingMeaningAudio
                  ? 'bg-indigo-600 text-white border-indigo-400 animate-pulse shadow'
                  : 'bg-slate-800 text-indigo-200 border-slate-700 hover:text-white hover:bg-indigo-600'
              }`}
              title="Listen to definition"
              aria-label="Listen to definition read aloud"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Translation / Subtext Box */}
        {idiom.corporateTranslation && (
          <div className="p-3.5 rounded-xl bg-slate-950/85 border border-slate-700/80 text-sm sm:text-base text-slate-100 space-y-1.5 my-3 shadow-inner">
            <div className="flex items-center gap-1.5 text-xs font-bold text-purple-300 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>In Tech Meetings & Chats</span>
            </div>
            <p className="italic text-slate-100 leading-relaxed font-sans font-medium text-sm sm:text-base">
              "{idiom.corporateTranslation}"
            </p>
          </div>
        )}

        {/* Workplace Dialogue Example with Aligned Audio Icon */}
        {primaryExample && (
          <div className="pt-1 pb-2">
            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-950/80 border border-slate-700/70 flex items-start justify-between gap-3 text-sm sm:text-base">
              <div className="flex items-start gap-2.5 leading-relaxed flex-1">
                <MessageSquare className="w-4 h-4 text-indigo-400 shrink-0 mt-1" />
                <div>
                  <span className="text-indigo-300 font-bold text-sm sm:text-base">{primaryExample.speaker} ({primaryExample.context}): </span>
                  <span className="text-white italic text-sm sm:text-base">"{primaryExample.quote}"</span>
                </div>
              </div>
              <button
                onClick={handleSpeakExample}
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl border transition-all shrink-0 flex items-center justify-center cursor-pointer mt-0.5 ${
                  isPlayingExampleAudio
                    ? 'bg-indigo-600 text-white border-indigo-400 animate-pulse shadow'
                    : 'bg-slate-800 text-indigo-200 border-slate-700 hover:text-white hover:bg-indigo-600'
                }`}
                title="Listen to this example sentence"
                aria-label={`Listen to example: ${primaryExample.quote}`}
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Card Footer: Plain Direct Wording & Inspect Action */}
      <div className="pt-3 border-t border-slate-700/80 flex items-center justify-between gap-3 mt-2 text-xs sm:text-sm">
        <div className="flex items-center gap-2 text-slate-200 min-w-0 pr-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="truncate">
            <span className="text-slate-400 font-medium">Plain wording: </span>
            <span className="font-semibold text-emerald-300 text-sm sm:text-base">{idiom.safeAlternative}</span>
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onInspect(idiom);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-indigo-200 hover:text-white hover:bg-indigo-600 border border-indigo-500/40 transition-colors shrink-0"
        >
          <span>Details</span>
          <ArrowRight className="w-3.5 h-3.5 text-indigo-300" />
        </button>
      </div>
    </motion.div>
  );
};

