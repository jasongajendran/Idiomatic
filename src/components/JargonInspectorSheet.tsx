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
  Copy,
  Check,
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
  const [copiedSafe, setCopiedSafe] = useState(false);
  const [speakingExampleIdx, setSpeakingExampleIdx] = useState<number | null>(null);

  if (!idiom) return null;

  const handleSpeak = async () => {
    setIsPlaying(true);
    await speakTerm(idiom.term);
    setIsPlaying(false);
  };

  const handleSpeakExample = async (sentence: string, idx: number) => {
    setSpeakingExampleIdx(idx);
    await speakSentence(sentence);
    setSpeakingExampleIdx(null);
  };

  const handleCopySafe = () => {
    navigator.clipboard.writeText(idiom.safeAlternative || idiom.term);
    setCopiedSafe(true);
    setTimeout(() => setCopiedSafe(false), 2000);
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
          className="relative z-10 w-full max-w-xl h-full bg-slate-950/95 border-l border-white/10 p-6 sm:p-8 space-y-6 overflow-y-auto shadow-2xl flex flex-col justify-between backdrop-blur-2xl"
        >
          <div className="space-y-6">
            
            {/* Top Sheet Actions */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
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
                  onClick={() => onToggleBookmark(idiom.id)}
                  className={`p-2.5 rounded-xl border transition-all ${
                    isBookmarked
                      ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 shadow-sm'
                      : 'bg-slate-900 text-slate-400 border-white/10 hover:text-white'
                  }`}
                  title={isBookmarked ? 'Bookmarked' : 'Bookmark phrase'}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
                </button>

                <button
                  onClick={onClose}
                  className="p-2.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-white/10 transition-all"
                  title="Close Inspector"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Title, Phonetic & Audio */}
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
                  <span>{idiom.phonetic || 'Listen'}</span>
                </button>
              </div>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans font-medium">
                {idiom.realMeaning}
              </p>
            </div>

            {/* Literal Visual Metaphor */}
            {idiom.literalDefinition && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950/40 border border-white/10 space-y-1.5 shadow-inner">
                <span className="text-[11px] font-bold text-cyan-400 flex items-center gap-1.5 uppercase tracking-wider">
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  Visual & Literal Origin Analogy
                </span>
                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                  {idiom.literalDefinition}
                </p>
              </div>
            )}

            {/* Practical Subtext & Meeting Translation */}
            {idiom.corporateTranslation && (
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 space-y-1.5 shadow-inner">
                <span className="text-[11px] font-bold text-purple-400 flex items-center gap-1.5 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  In Tech Meetings & Slack Chats
                </span>
                <p className="text-xs sm:text-sm text-slate-200 italic font-medium leading-relaxed font-sans">
                  "{idiom.corporateTranslation}"
                </p>
              </div>
            )}

            {/* Real World Dialogue Examples */}
            {idiom.examples && idiom.examples.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
                    Real-World Workplace Dialogue
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">Tap speaker icon to listen</span>
                </div>
                <div className="space-y-2.5">
                  {idiom.examples.map((ex, idx) => (
                    <div key={idx} className="rounded-xl bg-slate-900/90 p-4 border border-slate-700/60 shadow-md space-y-2 hover:border-indigo-500/40 transition-colors">
                      <div className="flex items-center justify-between gap-2 text-xs font-mono">
                        <div className="flex items-center gap-2">
                          <span className="text-indigo-300 font-bold">{ex.speaker}</span>
                          <span className="bg-slate-800 text-slate-200 px-2 py-0.5 rounded text-[11px] font-sans border border-slate-700">
                            {ex.context}
                          </span>
                        </div>
                        {/* Audio Icon on Example Quote */}
                        <button
                          onClick={() => handleSpeakExample(ex.quote, idx)}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-sans font-semibold transition-all cursor-pointer min-h-[32px] ${
                            speakingExampleIdx === idx
                              ? 'bg-indigo-600 text-white border-indigo-400 shadow-md animate-pulse'
                              : 'bg-slate-800 text-indigo-200 border-indigo-500/30 hover:bg-indigo-600/30 hover:text-white'
                          }`}
                          title="Listen to how this sentence is spoken"
                          aria-label={`Listen to quote: ${ex.quote}`}
                        >
                          <Volume2 className={`w-3.5 h-3.5 ${speakingExampleIdx === idx ? 'text-white' : 'text-indigo-400'}`} />
                          <span className="text-[11px]">{speakingExampleIdx === idx ? 'Playing...' : 'Audio'}</span>
                        </button>
                      </div>
                      <p className="italic text-slate-100 text-xs sm:text-sm font-sans leading-relaxed">
                        "{ex.quote}"
                      </p>
                      <p className="text-xs text-indigo-300 font-sans font-medium">
                        → Plain meaning: {ex.translatedQuote}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Direct Alternative / Plain Language */}
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Plain English Alternative</span>
                </div>
                <p className="text-slate-200 font-medium">"{idiom.safeAlternative}"</p>
              </div>
              <button
                onClick={handleCopySafe}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white border border-white/5 transition-all shrink-0"
                title="Copy safe wording"
              >
                {copiedSafe ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
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

            {/* Tags */}
            {idiom.tags && idiom.tags.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-slate-400" />
                  Related Concepts
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {idiom.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-lg text-xs bg-slate-900 text-slate-300 border border-white/5 font-mono">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Related Idioms Quick Jumps */}
            {relatedIdioms.length > 0 && onSelectRelated && (
              <div className="space-y-2.5 pt-2 border-t border-white/10">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-indigo-400" />
                  Explore Related Idioms
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {relatedIdioms.map((rel) => (
                    <button
                      key={rel.id}
                      onClick={() => onSelectRelated(rel)}
                      className="p-2.5 rounded-xl bg-slate-900 hover:bg-indigo-950/40 border border-white/10 hover:border-indigo-500/40 text-left transition-all group"
                    >
                      <span className="text-xs font-bold text-slate-200 group-hover:text-indigo-300 block truncate">
                        {rel.term}
                      </span>
                      <span className="text-[10px] text-slate-400 block truncate">
                        {rel.category}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

          <div className="pt-6 border-t border-white/10">
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm border border-indigo-400/30 transition-colors shadow-lg min-h-[44px]"
            >
              Close Inspector
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
