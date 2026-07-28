import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Bookmark, ArrowRight, Trash2, BookOpen } from 'lucide-react';
import { Idiom } from '../types';

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
  if (!isOpen) return null;

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
              <div className="flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-amber-400 fill-amber-400" />
                <h3 className="text-lg font-bold text-white">Saved Idioms</h3>
                <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300">
                  {bookmarkedIdioms.length}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {bookmarkedIdioms.length === 0 ? (
              <div className="text-center py-16 text-slate-500 space-y-2">
                <BookOpen className="w-10 h-10 mx-auto text-slate-600" />
                <p className="text-xs font-medium">No saved idioms yet.</p>
                <p className="text-[11px]">Click the bookmark icon on any card to add it to your saved list.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {bookmarkedIdioms.map((idiom) => (
                  <div
                    key={idiom.id}
                    className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-white group-hover:text-indigo-300">
                        {idiom.term}
                      </span>
                      <button
                        onClick={() => onRemoveBookmark(idiom.id)}
                        className="p-1 rounded text-slate-500 hover:text-rose-400"
                        title="Remove bookmark"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2">
                      {idiom.realMeaning}
                    </p>

                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-indigo-400">
                        {idiom.category}
                      </span>
                      <button
                        onClick={() => {
                          onInspect(idiom);
                          onClose();
                        }}
                        className="flex items-center gap-1 text-xs text-indigo-300 hover:text-white"
                      >
                        <span>Inspect</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-medium text-xs border border-slate-800 transition-colors"
          >
            Close
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
