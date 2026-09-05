import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Bookmark, ArrowRight, Trash2, BookOpen, Volume2 } from 'lucide-react';
import { Idiom } from '../types';
import { speakTerm } from '../utils/speechUtils';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedIdioms: Idiom[];
  onRemoveBookmark: (id: string) => void;
  onInspect: (idiom: Idiom) => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  bookmarkedIdioms,
  onRemoveBookmark,
  onInspect
}) => {
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSpeak = async (e: React.MouseEvent, idiom: Idiom) => {
    e.stopPropagation();
    setSpeakingId(idiom.id);
    await speakTerm(idiom.term);
    setSpeakingId(null);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0"
        />

        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative z-10 w-full max-w-md h-full bg-slate-950 border-l border-slate-800 p-6 space-y-6 overflow-y-auto shadow-2xl flex flex-col justify-between"
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <Bookmark className="w-5 h-5 text-amber-400 fill-amber-400" />
                <h3 className="text-xl font-black text-white">Saved Phrases</h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300">
                  {bookmarkedIdioms.length}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center"
                title="Close bookmarks drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {bookmarkedIdioms.length === 0 ? (
              <div className="text-center py-16 text-slate-400 space-y-2">
                <BookOpen className="w-10 h-10 mx-auto text-slate-600" />
                <p className="text-sm font-semibold text-slate-200">No saved phrases yet.</p>
                <p className="text-xs text-slate-400">Tap the bookmark icon on any phrase card to save it here.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {bookmarkedIdioms.map((idiom) => (
                  <div
                    key={idiom.id}
                    onClick={() => {
                      onInspect(idiom);
                      onClose();
                    }}
                    className="p-4 sm:p-5 rounded-2xl bg-slate-900/95 border border-slate-800 hover:border-indigo-500/50 space-y-2.5 group cursor-pointer transition-all shadow-md"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-base text-white group-hover:text-indigo-300 transition-colors">
                        {idiom.term}
                      </span>
                      <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={(e) => handleSpeak(e, idiom)}
                          className={`p-1.5 rounded-lg border transition-all cursor-pointer min-h-[32px] min-w-[32px] flex items-center justify-center ${
                            speakingId === idiom.id
                              ? 'bg-indigo-600 text-white border-indigo-400 animate-pulse'
                              : 'bg-slate-800 text-indigo-300 border-slate-700 hover:text-white hover:bg-indigo-600'
                          }`}
                          title={`Pronounce ${idiom.term}`}
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onRemoveBookmark(idiom.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 border border-transparent hover:border-slate-700 cursor-pointer min-h-[32px] min-w-[32px] flex items-center justify-center transition-all"
                          title="Remove bookmark"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-sm text-slate-200 line-clamp-2 leading-relaxed font-sans">
                      {idiom.realMeaning}
                    </p>

                    <div className="pt-2 flex items-center justify-between border-t border-slate-800/80 text-xs">
                      <span className="font-mono text-indigo-400 font-semibold">
                        {idiom.category}
                      </span>
                      <span className="flex items-center gap-1 text-indigo-300 group-hover:text-white font-bold">
                        <span>Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs sm:text-sm border border-slate-800 transition-colors cursor-pointer min-h-[44px]"
          >
            Close
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
