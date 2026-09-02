import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { CinematicExplorer } from './components/CinematicExplorer';
import { MeetingCeremonyPlaybook } from './components/MeetingCeremonyPlaybook';
import { ContextualSimulator } from './components/ContextualSimulator';
import { PracticeStudio } from './components/PracticeStudio';
import { JargonInspectorSheet } from './components/JargonInspectorSheet';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { IDIOMS_DATA } from './data/idiomsData';
import { Idiom } from './types';
import { Terminal, Sparkles, Layers, ShieldCheck, ArrowUp } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'explorer' | 'ceremonies' | 'simulator' | 'practice'>('explorer');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set(['bikeshedding', 'technical-debt']));
  const [inspectedIdiom, setInspectedIdiom] = useState<Idiom | null>(null);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('idiomatic_theme');
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return 'dark';
  });

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      if (typeof window !== 'undefined') {
        localStorage.setItem('idiomatic_theme', next);
      }
      return next;
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const bookmarkedIdioms = useMemo(() => {
    return IDIOMS_DATA.filter((i) => bookmarkedIds.has(i.id));
  }, [bookmarkedIds]);

  const handleSelectTermFromSimulator = (termId: string) => {
    const idiom = IDIOMS_DATA.find(
      (i) => i.id === termId || i.term.toLowerCase() === termId.toLowerCase().replace(/-/g, ' ')
    );
    if (idiom) {
      setInspectedIdiom(idiom);
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#0b101e] text-slate-100' : 'bg-slate-900 text-slate-100'} font-sans antialiased selection:bg-indigo-500 selection:text-white flex flex-col justify-between relative overflow-x-hidden transition-colors duration-300`}>
      
      {/* Background Ambient Aesthetics with pleasing contrast highlights */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[130px]" />
        <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-purple-600/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-teal-600/15 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10">
        {/* Frosted Glass Top Navbar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          bookmarksCount={bookmarkedIds.size}
          onOpenBookmarks={() => setIsBookmarksOpen(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        {/* Main View Container with Smooth Tab Transitions */}
        <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-8 pb-16">
          <AnimatePresence mode="wait">
            {activeTab === 'explorer' && (
              <motion.div
                key="explorer-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <CinematicExplorer
                  idioms={IDIOMS_DATA}
                  bookmarkedIds={bookmarkedIds}
                  onToggleBookmark={toggleBookmark}
                  onInspect={setInspectedIdiom}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              </motion.div>
            )}

            {activeTab === 'ceremonies' && (
              <motion.div
                key="ceremonies-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <MeetingCeremonyPlaybook />
              </motion.div>
            )}

            {activeTab === 'simulator' && (
              <motion.div
                key="simulator-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <ContextualSimulator
                  onSelectTerm={handleSelectTermFromSimulator}
                  allIdioms={IDIOMS_DATA}
                />
              </motion.div>
            )}

            {activeTab === 'practice' && (
              <motion.div
                key="practice-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <PracticeStudio />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Global Slide-Over Drawers (Frosted Glass & Dark Aesthetics) */}
      <JargonInspectorSheet
        idiom={inspectedIdiom}
        onClose={() => setInspectedIdiom(null)}
        isBookmarked={inspectedIdiom ? bookmarkedIds.has(inspectedIdiom.id) : false}
        onToggleBookmark={toggleBookmark}
      />

      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarkedIdioms={bookmarkedIdioms}
        onRemoveBookmark={toggleBookmark}
        onInspect={setInspectedIdiom}
      />

      {/* Floating Scroll To Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={scrollToTop}
            className="fixed bottom-20 right-4 sm:bottom-8 sm:right-8 z-40 p-3 rounded-2xl bg-indigo-600/90 text-white border border-indigo-400/40 shadow-xl shadow-indigo-500/30 backdrop-blur-md hover:bg-indigo-500 hover:scale-110 active:scale-95 transition-all flex items-center gap-1.5 font-bold text-xs"
            title="Scroll to top"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
            <span className="hidden sm:inline font-mono">Top</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Sleek Footer */}
      <footer className="relative z-10 w-full border-t border-white/10 bg-slate-950/80 backdrop-blur-xl py-6 px-4 text-center text-xs text-slate-400 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-indigo-400" />
            <span className="font-bold text-white tracking-tight">[IDIOMATIC]</span>
            <span className="text-slate-400">— Tech Vernacular & Agile Dialogue Playbook</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Interactive Workplace Scenario Engine</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

