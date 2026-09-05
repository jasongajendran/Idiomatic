import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Volume2, 
  Sparkles, 
  Bookmark,
  MessageSquare,
  CheckCircle2,
  BookOpen,
  Tag,
  Shield,
  Layers,
  ArrowRight,
  Eye
} from 'lucide-react';
import { Idiom } from '../types';
import { speakTerm, speakSentence } from '../utils/speechUtils';
import { IDIOMS_DATA } from '../data/idiomsData';

interface JargonInspectorSheetProps {
  idiom: Idiom | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onSelectRelated?: (idiom: Idiom) => void;
}

export const JargonInspectorSheet: React.FC<JargonInspectorSheetProps> = ({
  idiom,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onSelectRelated
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayingMeaning, setIsPlayingMeaning] = useState(false);
  const [speakingExampleIdx, setSpeakingExampleIdx] = useState<number | null>(null);

  if (!idiom) return null;

  const handleSpeak = async () => {
    setIsPlaying(true);
    await speakTerm(idiom.term);
    setIsPlaying(false);
  };

  const handleSpeakMeaning = async () => {
    setIsPlayingMeaning(true);
    await speakSentence(idiom.realMeaning);
    setIsPlayingMeaning(false);
  };

  const handleSpeakExample = async (sentence: string, idx: number) => {
    setSpeakingExampleIdx(idx);
    await speakSentence(sentence);
    setSpeakingExampleIdx(null);
  };

  // Find 3 related idioms from the same category or sharing tags
  const relatedIdioms = IDIOMS_DATA.filter((item) => {
    if (item.id === idiom.id) return false;
    const sameCategory = item.category === idiom.category;
    const sharedTag = item.tags && idiom.tags && item.tags.some(t => idiom.tags.includes(t));
    return sameCategory || sharedTag;
  }).slice(0, 3);

  const getFormalityColor = (formality: string) => {
    switch (formality) {
      case 'Safe for Clients':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
      case 'Internal Team Only':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      case 'Casual Chat Only':
        return 'bg-pink-500/15 text-pink-300 border-pink-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <AnimatePresence>
      <div 
        id="idiom-detail-modal-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 lg:p-8 bg-slate-950/85 backdrop-blur-md overflow-y-auto"
      >
        {/* Backdrop click to close */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0"
        />

        {/* Centered Responsive Modal Container */}
        <motion.div
          id="idiom-detail-modal-card"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 260 }}
          className="relative z-10 w-full max-w-3xl max-h-[92vh] sm:max-h-[88vh] bg-slate-900/98 border border-white/15 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl my-auto"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 bg-slate-950/70 shrink-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-xl text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {idiom.category}
              </span>
              {idiom.seniority && (
                <span className="px-2.5 py-1 rounded-xl text-xs font-mono bg-slate-900 text-slate-400 border border-white/10">
                  {idiom.seniority}
                </span>
              )}
              {idiom.formality && (
                <span className={`px-2.5 py-1 rounded-xl text-xs font-medium border ${getFormalityColor(idiom.formality)}`}>
                  {idiom.formality}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                id="modal-toggle-bookmark-btn"
                onClick={() => onToggleBookmark(idiom.id)}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center ${
                  isBookmarked
                    ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 shadow-sm'
                    : 'bg-slate-900 text-slate-400 border-white/10 hover:text-white hover:bg-slate-800'
                }`}
                title={isBookmarked ? 'Bookmarked' : 'Bookmark phrase'}
                aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark phrase'}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
              </button>

              <button
                id="modal-close-icon-btn"
                onClick={onClose}
                className="p-2.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-white/10 transition-all cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
                title="Close Details"
                aria-label="Close Details Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Scrollable Content Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
            
            {/* Title, Phonetic & Audio Pronunciation */}
            <div className="space-y-3.5 pb-3 border-b border-white/10">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-baseline gap-2.5 flex-wrap">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                    {idiom.term}
                  </h2>
                  {idiom.phonetic && (
                    <span className="font-mono text-xs sm:text-sm text-indigo-300 bg-indigo-950/60 px-2.5 py-1 rounded-lg border border-indigo-500/30">
                      {idiom.phonetic}
                    </span>
                  )}
                </div>

                {/* Term Pronunciation Audio Icon Button */}
                <button
                  id="modal-pronounce-term-btn"
                  onClick={handleSpeak}
                  className={`flex items-center justify-center p-2.5 rounded-xl border transition-all cursor-pointer min-h-[40px] min-w-[40px] ${
                    isPlaying
                      ? 'bg-indigo-600 text-white border-indigo-400 animate-pulse shadow-md shadow-indigo-500/30'
                      : 'bg-slate-800 text-indigo-200 border-indigo-500/30 hover:bg-indigo-600 hover:text-white'
                  }`}
                  title="Listen to phrase pronunciation"
                  aria-label={`Pronounce ${idiom.term}`}
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              {/* Definition / Real Meaning with dedicated Audio Read button */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-700/70 flex items-start justify-between gap-3 shadow-sm">
                <div className="space-y-1 flex-1">
                  <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">Plain English Definition</span>
                  <p className="text-base sm:text-lg text-slate-100 leading-relaxed font-sans font-medium">
                    {idiom.realMeaning}
                  </p>
                </div>
                <button
                  onClick={handleSpeakMeaning}
                  className={`p-2.5 rounded-xl border transition-all shrink-0 min-h-[38px] min-w-[38px] flex items-center justify-center cursor-pointer ${
                    isPlayingMeaning
                      ? 'bg-indigo-600 text-white border-indigo-400 animate-pulse shadow-md'
                      : 'bg-slate-800 text-indigo-200 border-indigo-500/30 hover:bg-indigo-600 hover:text-white'
                  }`}
                  title="Listen to definition"
                  aria-label="Listen to definition read aloud"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Literal Visual Metaphor */}
            {idiom.literalDefinition && (
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-950 to-indigo-950/40 border border-white/15 space-y-2 shadow-inner">
                <span className="text-xs sm:text-sm font-bold text-cyan-300 flex items-center gap-1.5 uppercase tracking-wider">
                  <Eye className="w-4 h-4 text-cyan-400" />
                  Visual & Literal Origin Analogy
                </span>
                <p className="text-sm sm:text-base text-slate-100 font-sans leading-relaxed">
                  {idiom.literalDefinition}
                </p>
              </div>
            )}

            {/* Practical Subtext & Meeting Translation */}
            {idiom.corporateTranslation && (
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/90 border border-purple-500/30 space-y-2 shadow-inner">
                <span className="text-xs sm:text-sm font-bold text-purple-300 flex items-center gap-1.5 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  In Tech Meetings & Slack Chats
                </span>
                <p className="text-sm sm:text-base text-purple-100 italic font-medium leading-relaxed font-sans">
                  "{idiom.corporateTranslation}"
                </p>
              </div>
            )}

            {/* Real World Dialogue Examples */}
            {idiom.examples && idiom.examples.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-indigo-400" />
                    Real-World Workplace Dialogue
                  </span>
                  <span className="text-xs text-slate-300 font-medium">Click audio to listen</span>
                </div>
                <div className="space-y-3">
                  {idiom.examples.map((ex, idx) => (
                    <div key={idx} className="rounded-2xl bg-slate-950/90 p-4 sm:p-5 border border-slate-700/80 shadow-md space-y-3 hover:border-indigo-500/50 transition-colors">
                      <div className="flex items-center justify-between gap-2 text-xs sm:text-sm font-mono flex-wrap">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-indigo-300 font-bold text-sm sm:text-base">{ex.speaker}</span>
                          <span className="bg-slate-800 text-slate-200 px-2.5 py-1 rounded-md text-xs font-sans border border-slate-700 font-semibold">
                            {ex.context}
                          </span>
                        </div>
                        {/* Audio Button on Example Quote */}
                        <button
                          onClick={() => handleSpeakExample(ex.quote, idx)}
                          className={`p-2 rounded-xl border transition-all cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center ${
                            speakingExampleIdx === idx
                              ? 'bg-indigo-600 text-white border-indigo-400 shadow-md animate-pulse'
                              : 'bg-slate-800 text-indigo-200 border-indigo-500/30 hover:bg-indigo-600 hover:text-white'
                          }`}
                          title="Listen to how this sentence is spoken"
                          aria-label={`Listen to quote: ${ex.quote}`}
                        >
                          <Volume2 className={`w-4 h-4 ${speakingExampleIdx === idx ? 'text-white' : 'text-indigo-300'}`} />
                        </button>
                      </div>
                      <p className="italic text-white text-sm sm:text-base font-sans leading-relaxed font-normal">
                        "{ex.quote}"
                      </p>
                      <p className="text-sm sm:text-base text-indigo-300 font-sans font-medium">
                        → Plain meaning: {ex.translatedQuote}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Direct Alternative / Plain Language */}
            {idiom.safeAlternative && (
              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-sm sm:text-base leading-relaxed font-sans space-y-1.5 shadow-sm">
                <div className="flex items-center gap-2 font-bold text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                  <span>Plain English Alternative</span>
                </div>
                <p className="text-white font-semibold text-base sm:text-lg">"{idiom.safeAlternative}"</p>
              </div>
            )}

            {/* Origin & Etymology */}
            {idiom.etymology && (
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-white/10 text-sm sm:text-base text-slate-200 leading-relaxed font-sans space-y-2">
                <div className="flex items-center gap-2 font-bold text-indigo-300">
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />
                  <span>Origin & Background</span>
                </div>
                <p className="text-slate-100">{idiom.etymology}</p>
              </div>
            )}

            {/* Tags */}
            {idiom.tags && idiom.tags.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-slate-400" />
                  Related Concepts
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {idiom.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-lg text-xs bg-slate-950 text-slate-300 border border-white/10 font-mono">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Related Idioms Quick Jumps */}
            {relatedIdioms.length > 0 && onSelectRelated && (
              <div className="space-y-3 pt-2 border-t border-white/10">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-indigo-400" />
                  Explore Related Idioms
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {relatedIdioms.map((rel) => (
                    <button
                      key={rel.id}
                      onClick={() => onSelectRelated(rel)}
                      className="p-3 rounded-xl bg-slate-950 hover:bg-indigo-950/60 border border-white/10 hover:border-indigo-500/50 text-left transition-all group cursor-pointer"
                    >
                      <span className="text-xs font-bold text-slate-200 group-hover:text-indigo-300 block truncate">
                        {rel.term}
                      </span>
                      <span className="text-[10px] text-slate-400 block truncate mt-0.5">
                        {rel.category}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Modal Footer */}
          <div className="p-4 sm:p-5 border-t border-white/10 bg-slate-950/70 shrink-0">
            <button
              id="modal-close-bottom-btn"
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm border border-indigo-400/30 transition-colors shadow-lg min-h-[44px] cursor-pointer"
            >
              Close Details
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
