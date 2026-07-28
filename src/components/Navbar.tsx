import React from 'react';
import { 
  Terminal, 
  Sparkles, 
  MessageSquareCode, 
  Gamepad2, 
  Bookmark, 
  Search,
  BookOpen,
  Layers
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'explorer' | 'simulator' | 'practice';
  setActiveTab: (tab: 'explorer' | 'simulator' | 'practice') => void;
  bookmarksCount: number;
  onOpenBookmarks: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  bookmarksCount,
  onOpenBookmarks,
  searchQuery,
  setSearchQuery
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/70 backdrop-blur-2xl shadow-xl shadow-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo - Frosted Glass & Bold Typography */}
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => setActiveTab('explorer')}
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 p-[1.5px] shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-slate-950/90 rounded-[14px] flex items-center justify-center backdrop-blur-md">
              <Terminal className="w-5 h-5 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xl font-black tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                [IDIOMATIC]
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider font-mono uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full shadow-inner">
                v2.5
              </span>
            </div>
            <p className="text-[11px] font-sans text-slate-400 hidden sm:block">Tech Vernacular & System Logic Analogies</p>
          </div>
        </div>

        {/* Center Navigation Tabs - Glassmorphic Pill Style */}
        <nav className="hidden md:flex items-center gap-1.5 bg-slate-900/60 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md shadow-inner">
          <button
            onClick={() => setActiveTab('explorer')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-300 ${
              activeTab === 'explorer'
                ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg shadow-indigo-500/30 border border-white/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Cinematic Explorer</span>
          </button>

          <button
            onClick={() => setActiveTab('simulator')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-300 ${
              activeTab === 'simulator'
                ? 'bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 text-white shadow-lg shadow-cyan-500/30 border border-white/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <MessageSquareCode className="w-3.5 h-3.5" />
            <span>Scenario Simulator</span>
          </button>

          <button
            onClick={() => setActiveTab('practice')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-300 ${
              activeTab === 'practice'
                ? 'bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 text-white shadow-lg shadow-pink-500/30 border border-white/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Practice Studio</span>
          </button>
        </nav>

        {/* Search Bar & Bookmarks Drawer Button */}
        <div className="flex items-center gap-3">
          <div className="relative hidden lg:block w-48 xl:w-64">
            <Search className="absolute left-3.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search idioms or logic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-900/80 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/30 backdrop-blur-md transition-all"
            />
          </div>

          <button
            onClick={onOpenBookmarks}
            className="relative flex items-center justify-center p-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-slate-300 hover:text-white hover:border-white/20 transition-all backdrop-blur-md shadow-md"
            title="Saved Bookmarks"
          >
            <Bookmark className="w-4 h-4 text-amber-400" />
            {bookmarksCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-[20px] px-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-black rounded-full shadow-md animate-pulse">
                {bookmarksCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Tab Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-white/10 bg-slate-950/90 backdrop-blur-xl px-2 py-2.5">
        <button
          onClick={() => setActiveTab('explorer')}
          className={`flex flex-col items-center gap-1 text-[11px] font-bold transition-colors ${
            activeTab === 'explorer' ? 'text-indigo-400' : 'text-slate-400'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Explorer</span>
        </button>
        <button
          onClick={() => setActiveTab('simulator')}
          className={`flex flex-col items-center gap-1 text-[11px] font-bold transition-colors ${
            activeTab === 'simulator' ? 'text-cyan-400' : 'text-slate-400'
          }`}
        >
          <MessageSquareCode className="w-4 h-4" />
          <span>Simulator</span>
        </button>
        <button
          onClick={() => setActiveTab('practice')}
          className={`flex flex-col items-center gap-1 text-[11px] font-bold transition-colors ${
            activeTab === 'practice' ? 'text-pink-400' : 'text-slate-400'
          }`}
        >
          <Gamepad2 className="w-4 h-4" />
          <span>Practice</span>
        </button>
      </div>
    </header>
  );
};
