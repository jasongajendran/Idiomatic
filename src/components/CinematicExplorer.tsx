import React, { useState, useMemo } from 'react';
import { AnimatePresence } from 'motion/react';
import { 
  Terminal, 
  Building2, 
  Cpu, 
  Target, 
  LayoutGrid, 
  List, 
  Sparkles, 
  Layers,
  ArrowUpDown,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Dice5,
  Search,
  X,
  Filter,
  ShieldCheck
} from 'lucide-react';
import { Idiom, WorkflowCategory } from '../types';
import { IdiomMorphCard } from './IdiomMorphCard';

interface CinematicExplorerProps {
  idioms: Idiom[];
  bookmarkedIds: Set<string>;
  onToggleBookmark: (id: string) => void;
  onInspect: (idiom: Idiom) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const CinematicExplorer: React.FC<CinematicExplorerProps> = ({
  idioms,
  bookmarkedIds,
  onToggleBookmark,
  onInspect,
  searchQuery,
  setSearchQuery
}) => {
  const [selectedCategory, setSelectedCategory] = useState<WorkflowCategory | 'All'>('All');
  const [selectedFormality, setSelectedFormality] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'alphabetical' | 'category' | 'popularity'>('alphabetical');
  const [showPopularPhrases, setShowPopularPhrases] = useState(false);

  // Filter & Sort Logic
  const filteredIdioms = useMemo(() => {
    return idioms.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesFormality = selectedFormality === 'All' || item.formality === selectedFormality;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.term.toLowerCase().includes(q) ||
        item.realMeaning.toLowerCase().includes(q) ||
        (item.corporateTranslation && item.corporateTranslation.toLowerCase().includes(q)) ||
        (item.safeAlternative && item.safeAlternative.toLowerCase().includes(q)) ||
        (item.literalDefinition && item.literalDefinition.toLowerCase().includes(q)) ||
        (item.tags && item.tags.some((tag) => tag.toLowerCase().includes(q)));

      return matchesCategory && matchesFormality && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'alphabetical') return a.term.localeCompare(b.term);
      if (sortBy === 'popularity') return (b.popularityScore || 50) - (a.popularityScore || 50);
      return a.category.localeCompare(b.category);
    });
  }, [idioms, selectedCategory, selectedFormality, searchQuery, sortBy]);

  const categories: Array<{ label: WorkflowCategory | 'All'; icon: React.ReactNode }> = [
    { label: 'All', icon: <Layers className="w-4 h-4" /> },
    { label: 'Coding', icon: <Terminal className="w-4 h-4" /> },
    { label: 'Management', icon: <Building2 className="w-4 h-4" /> },
    { label: 'Operations', icon: <Cpu className="w-4 h-4" /> },
    { label: 'Strategy', icon: <Target className="w-4 h-4" /> }
  ];

  const popularPhraseChips = [
    'Shifting the Goalposts',
    'Analysis Paralysis',
    'Lipstick on a Pig',
    'Reinventing the Wheel',
    'Shiny Object Syndrome',
    'Death by a Thousand Cuts',
    'Smoke and Mirrors',
    'Done and Dusted',
    'All Hands on Deck',
    'Boil the Ocean',
    'Deep Dive',
    'Low-Hanging Fruit',
    'In the Loop',
    'Touch Base',
    'Move the Needle',
    'Wear Many Hats',
    'Think Outside the Box',
    'At the End of the Day',
    'On the Same Page',
    'Elephant in the Room',
    'Up to Speed',
    'Out of the Box',
    'No-Brainer',
    'Rule of Thumb',
    'Call It a Day',
    'Win-Win Situation',
    'Drop the Ball',
    'Fall Through the Cracks',
    'Once in a Blue Moon',
    'Nitty-Gritty',
    'On Cloud Nine',
    'Bite the Bullet',
    'Hit the Nail on the Head',
    'Tip of the Iceberg',
    'Smooth Sailing',
    'Silver Lining'
  ];

  const handleRandomIdiom = () => {
    if (idioms.length === 0) return;
    const randomIdx = Math.floor(Math.random() * idioms.length);
    onInspect(idioms[randomIdx]);
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Hero Header Section */}
      <div className="relative rounded-3xl bg-slate-900/90 border border-white/10 p-6 sm:p-10 backdrop-blur-2xl overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>SOFTWARE & WORKPLACE PHRASES DICTIONARY</span>
            </div>

            <button
              onClick={handleRandomIdiom}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 transition-all shadow-sm group cursor-pointer"
              title="Inspect a random idiom"
            >
              <Dice5 className="w-4 h-4 text-purple-400 group-hover:rotate-180 transition-transform duration-500" />
              <span>Random Discovery</span>
            </button>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Everyday Tech Idioms & <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              Workplace Phrases
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            Clear meanings, workplace subtext, audio pronunciations, and real-world meeting examples for phrases used by developers, tech leads, PMs, and engineering teams.
          </p>

          {/* Quick Counter */}
          <div className="pt-1 flex flex-wrap items-center gap-4 text-xs text-slate-300 font-semibold">
            <span className="text-indigo-400 font-bold text-base">{idioms.length} Phrases & Terms</span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-slate-300">Phonetic Audio Pronunciations</span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-slate-300">Plain English Translations</span>
          </div>

          {/* Search Input inside Header on Mobile / Direct Access */}
          <div className="pt-2">
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search phrase, meaning, tag, or plain alternative..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-3 bg-slate-950/90 border border-white/15 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all font-sans shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white transition-colors"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Popular Phrases Quick Search Chips (Collapsible) */}
          <div className="pt-2">
            <button
              onClick={() => setShowPopularPhrases(!showPopularPhrases)}
              className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors py-1 px-2.5 -ml-2.5 rounded-lg hover:bg-white/5 group"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>POPULAR PHRASES ({popularPhraseChips.length})</span>
              {showPopularPhrases ? (
                <ChevronUp className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-transform" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-transform" />
              )}
              <span className="text-[11px] font-normal text-slate-400 ml-1">
                {showPopularPhrases ? 'Hide chips' : 'Show quick filters'}
              </span>
            </button>
            
            {showPopularPhrases && (
              <div className="flex flex-wrap gap-2 mt-2.5 animate-fadeIn">
                {popularPhraseChips.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => setSearchQuery(searchQuery === chip ? '' : chip)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                      searchQuery === chip
                        ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-500/30 border border-indigo-400'
                        : 'bg-slate-950/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-white/10'
                    }`}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="space-y-4">
        
        {/* Category Tabs & Formality Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setSelectedCategory(cat.label)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  selectedCategory === cat.label
                    ? 'bg-indigo-600 text-white shadow-md border border-indigo-400/40'
                    : 'bg-slate-900 text-slate-400 border border-white/10 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
                {cat.label !== 'All' && (
                  <span className="px-2 py-0.5 text-[11px] bg-slate-950/60 rounded-md text-slate-300">
                    {idioms.filter(i => i.category === cat.label).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-900 px-3 py-1.5 rounded-xl border border-white/10 font-semibold shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <select
                value={selectedFormality}
                onChange={(e) => setSelectedFormality(e.target.value)}
                className="bg-transparent text-slate-200 focus:outline-none cursor-pointer text-xs"
              >
                <option value="All" className="bg-slate-900">All Formality Levels</option>
                <option value="Safe for Clients" className="bg-slate-900">Safe for Clients</option>
                <option value="Internal Team Only" className="bg-slate-900">Internal Team Only</option>
                <option value="Casual Chat Only" className="bg-slate-900">Casual Chat Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Sorting & Layout View Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-900/80 border border-white/10">
          <div className="text-xs text-slate-400">
            Showing <span className="text-white font-bold">{filteredIdioms.length}</span> of {idioms.length} phrases
          </div>

          <div className="flex items-center gap-3">
            {/* Sort Select */}
            <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-950 px-3 py-1.5 rounded-xl border border-white/10 font-semibold">
              <ArrowUpDown className="w-3.5 h-3.5 text-indigo-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-slate-200 focus:outline-none cursor-pointer text-xs"
              >
                <option value="alphabetical" className="bg-slate-900">Alphabetical (A-Z)</option>
                <option value="popularity" className="bg-slate-900">Most Popular</option>
                <option value="category" className="bg-slate-900">By Category</option>
              </select>
            </div>

            {/* View Mode Toggle Buttons */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors ${
                  viewMode === 'grid' ? 'bg-indigo-600 text-white shadow-sm' : ''
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors ${
                  viewMode === 'list' ? 'bg-indigo-600 text-white shadow-sm' : ''
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Explorer Content Render */}
      {filteredIdioms.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-3xl bg-slate-900/40 border border-white/10">
          <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-white">No Phrases Match Your Search</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
            Try adjusting your search keywords or resetting filters.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedFormality('All');
              setSearchQuery('');
            }}
            className="mt-4 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-500 transition-colors shadow-lg min-h-[44px]"
          >
            Reset All Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredIdioms.map((idiom) => (
              <IdiomMorphCard
                key={idiom.id}
                idiom={idiom}
                isBookmarked={bookmarkedIds.has(idiom.id)}
                onToggleBookmark={onToggleBookmark}
                onInspect={onInspect}
              />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        /* Concise List View */
        <div className="rounded-2xl bg-slate-900/90 border border-white/10 overflow-hidden divide-y divide-white/5 shadow-xl">
          {filteredIdioms.map((idiom) => (
            <div
              key={idiom.id}
              onClick={() => onInspect(idiom)}
              className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-slate-800/50 cursor-pointer transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span className="font-bold text-base text-white group-hover:text-indigo-300 transition-colors">
                    {idiom.term}
                  </span>
                  {idiom.phonetic && (
                    <span className="text-xs text-slate-400 font-mono">{idiom.phonetic}</span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">{idiom.realMeaning}</p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 border border-white/10">
                  {idiom.category}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onInspect(idiom);
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600 hover:text-white text-xs font-bold transition-colors min-h-[36px]"
                >
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
