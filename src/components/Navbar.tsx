import React from 'react';
import { 
  Terminal, 
  Sparkles, 
  MessageSquareCode, 
  Gamepad2, 
  Bookmark, 
  Search,
  BookOpen,
  MessageSquare,
  Users
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'explorer' | 'ceremonies' | 'simulator' | 'practice';
  setActiveTab: (tab: 'explorer' | 'ceremonies' | 'simulator' | 'practice') => void;
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
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-2xl shadow-xl shadow-black/40">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Brand Logo */}
        <div 
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group shrink-0" 
          onClick={() => setActiveTab('explorer')}
        >
          <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 p-[1.5px] shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center backdrop-blur-md">
              <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-mono text-lg sm:text-xl font-black tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                [IDIOMATIC]
              </span>
              <span className="px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-bold tracking-wider font-mono uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full shadow-inner">
                v2.6
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] font-sans text-slate-400 hidden md:block">Tech Vernacular & System Logic Analogies</p>
          </div>
        </div>

        {/* Center Navigation Tabs - Desktop */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/70 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md shadow-inner">
          <button
            onClick={() => setActiveTab('explorer')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-300 ${
              activeTab === 'explorer'
                ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg shadow-indigo-500/30 border border-white/20'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Cinematic Explorer</span>
          </button>

          <button
            onClick={() => setActiveTab('ceremonies')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-300 ${
              activeTab === 'ceremonies'
                ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 text-white shadow-lg shadow-purple-500/30 border border-white/20'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Agile & Meeting Playbook</span>
          </button>

          <button
            onClick={() => setActiveTab('simulator')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-300 ${
              activeTab === 'simulator'
                ? 'bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 text-white shadow-lg shadow-cyan-500/30 border border-white/20'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <MessageSquareCode className="w-3.5 h-3.5" />
            <span>Scenario Simulator</span>
          </button>

          <button
            onClick={() => setActiveTab('practice')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-300 ${
              activeTab === 'practice'
                ? 'bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 text-white shadow-lg shadow-pink-500/30 border border-white/20'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Practice Studio</span>
          </button>
        </nav>

        {/* Search Bar & Bookmarks Drawer Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative hidden xl:block w-52">
            <Search className="absolute left-3.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search idioms or phrases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-white/10 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/30 backdrop-blur-md transition-all"
            />
          </div>

          <button
            onClick={onOpenBookmarks}
            className="relative flex items-center justify-center p-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-200 hover:text-white hover:border-white/20 transition-all backdrop-blur-md shadow-md min-h-[40px] min-w-[40px]"
            title="Saved Bookmarks"
          >
            <Bookmark className="w-4 h-4 text-amber-400" />
            {bookmarksCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[9px] font-black rounded-full shadow-md animate-pulse">
                {bookmarksCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Navigation Bar - High Visibility, Large Touch Targets */}
      <div className="lg:hidden grid grid-cols-4 border-t border-white/10 bg-slate-950/95 backdrop-blur-2xl px-1 py-2">
        <button
          onClick={() => setActiveTab('explorer')}
          className={`flex flex-col items-center justify-center py-1.5 rounded-xl text-[11px] font-bold transition-all min-h-[44px] ${
            activeTab === 'explorer' 
              ? 'text-indigo-300 bg-indigo-500/15 font-black border border-indigo-500/30' 
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4 mb-0.5" />
          <span>Explorer</span>
        </button>

        <button
          onClick={() => setActiveTab('ceremonies')}
          className={`flex flex-col items-center justify-center py-1.5 rounded-xl text-[11px] font-bold transition-all min-h-[44px] ${
            activeTab === 'ceremonies' 
              ? 'text-purple-300 bg-purple-500/15 font-black border border-purple-500/30' 
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <MessageSquare className="w-4 h-4 mb-0.5" />
          <span>Meetings</span>
        </button>

        <button
          onClick={() => setActiveTab('simulator')}
          className={`flex flex-col items-center justify-center py-1.5 rounded-xl text-[11px] font-bold transition-all min-h-[44px] ${
            activeTab === 'simulator' 
              ? 'text-cyan-300 bg-cyan-500/15 font-black border border-cyan-500/30' 
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <MessageSquareCode className="w-4 h-4 mb-0.5" />
          <span>Simulator</span>
        </button>

        <button
          onClick={() => setActiveTab('practice')}
          className={`flex flex-col items-center justify-center py-1.5 rounded-xl text-[11px] font-bold transition-all min-h-[44px] ${
            activeTab === 'practice' 
              ? 'text-pink-300 bg-pink-500/15 font-black border border-pink-500/30' 
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <Gamepad2 className="w-4 h-4 mb-0.5" />
          <span>Practice</span>
        </button>
      </div>
    </header>
  );
};

