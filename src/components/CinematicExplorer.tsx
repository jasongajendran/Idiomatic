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
  ShieldCheck,
  Volume2,
  Bookmark,
  MessageSquare,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { Idiom, WorkflowCategory } from '../types';
import { IdiomMorphCard } from './IdiomMorphCard';
import { speakTerm, speakSentence } from '../utils/speechUtils';

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
  const [selectedLetter, setSelectedLetter] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'rows' | 'grid'>('rows');
  const [sortBy, setSortBy] = useState<'alphabetical' | 'category' | 'popularity'>('alphabetical');
  const [showPopularPhrases, setShowPopularPhrases] = useState(false);

  const [speakingTermId, setSpeakingTermId] = useState<string | null>(null);
  const [speakingExampleId, setSpeakingExampleId] = useState<string | null>(null);

  const handleSpeakTerm = async (e: React.MouseEvent, idiom: Idiom) => {
    e.stopPropagation();
    setSpeakingTermId(idiom.id);
    await speakTerm(idiom.term);
    setSpeakingTermId(null);
  };

  const handleSpeakExampleQuote = async (e: React.MouseEvent, idiomId: string, quote: string) => {
    e.stopPropagation();
    setSpeakingExampleId(idiomId);
    await speakSentence(quote);
    setSpeakingExampleId(null);
  };

  // Compute available starting letters for alphabetical navigation
  const availableLetters = useMemo(() => {
    const letters = new Set<string>();
    idioms.forEach(i => {
      const first = i.term.charAt(0).toUpperCase();
      if (first >= 'A' && first <= 'Z') letters.add(first);
    });
    return Array.from(letters).sort();
  }, [idioms]);

  // Filter & Sort Logic
  const filteredIdioms = useMemo(() => {
    return idioms.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesFormality = selectedFormality === 'All' || item.formality === selectedFormality;
      const matchesLetter = selectedLetter === 'All' || item.term.toUpperCase().startsWith(selectedLetter);
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.term.toLowerCase().includes(q) ||
        item.realMeaning.toLowerCase().includes(q) ||
        (item.corporateTranslation && item.corporateTranslation.toLowerCase().includes(q)) ||
        (item.safeAlternative && item.safeAlternative.toLowerCase().includes(q)) ||
        (item.literalDefinition && item.literalDefinition.toLowerCase().includes(q)) ||
        (item.tags && item.tags.some((tag) => tag.toLowerCase().includes(q)));

      return matchesCategory && matchesFormality && matchesLetter && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'alphabetical') return a.term.localeCompare(b.term);
      if (sortBy === 'popularity') return (b.popularityScore || 50) - (a.popularityScore || 50);
      return a.category.localeCompare(b.category);
    });
  }, [idioms, selectedCategory, selectedFormality, selectedLetter, searchQuery, sortBy]);

  const categories: Array<{ label: WorkflowCategory | 'All'; icon: React.ReactNode }> = [
    { label: 'All', icon: <Layers className="w-4 h-4" /> },
    { label: 'Coding', icon: <Terminal className="w-4 h-4" /> },
    { label: 'Management', icon: <Building2 className="w-4 h-4" /> },
    { label: 'Operations', icon: <Cpu className="w-4 h-4" /> },
    { label: 'Strategy', icon: <Target className="w-4 h-4" /> }
  ];

  const getCategoryBadgeStyle = (category: WorkflowCategory) => {
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
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 min-h-[44px] ${
                  selectedCategory === cat.label
                    ? 'bg-indigo-600 text-white shadow-md border border-indigo-400/50'
                    : 'bg-slate-900/90 text-slate-300 border border-slate-700/70 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
                {cat.label !== 'All' && (
                  <span className="px-2 py-0.5 text-[11px] bg-slate-950/70 rounded-md text-slate-300 border border-slate-700">
                    {idioms.filter(i => i.category === cat.label).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-slate-200 bg-slate-900/90 px-3.5 py-2.5 rounded-xl border border-slate-700 font-semibold shrink-0 min-h-[44px]">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <select
                value={selectedFormality}
                onChange={(e) => setSelectedFormality(e.target.value)}
                className="bg-transparent text-slate-200 focus:outline-none cursor-pointer text-xs"
              >
                <option value="All" className="bg-slate-900 text-slate-200">All Formality Levels</option>
                <option value="Safe for Clients" className="bg-slate-900 text-slate-200">Safe for Clients</option>
                <option value="Internal Team Only" className="bg-slate-900 text-slate-200">Internal Team Only</option>
                <option value="Casual Chat Only" className="bg-slate-900 text-slate-200">Casual Chat Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Alphabet A-Z Quick Jump Rail for Mobile & Fast Nav */}
        <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-700/70 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-300 px-1">
            <span className="font-bold flex items-center gap-1.5">
              <span className="text-indigo-400">A-Z</span> Quick Letter Jump:
            </span>
            {selectedLetter !== 'All' && (
              <button 
                onClick={() => setSelectedLetter('All')}
                className="text-[11px] text-indigo-300 hover:text-white font-bold underline cursor-pointer"
              >
                Reset Letter Filter (Showing "{selectedLetter}")
              </button>
            )}
          </div>
          <div className="overflow-x-auto pb-1 scrollbar-none">
            <div className="flex items-center gap-1.5 min-w-max">
              <button
                onClick={() => setSelectedLetter('All')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all min-h-[36px] ${
                  selectedLetter === 'All'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700'
                }`}
              >
                All
              </button>
              {availableLetters.map((letter) => (
                <button
                  key={letter}
                  onClick={() => setSelectedLetter(letter === selectedLetter ? 'All' : letter)}
                  className={`w-9 h-9 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center cursor-pointer ${
                    selectedLetter === letter
                      ? 'bg-indigo-600 text-white shadow-md scale-105 border border-indigo-400'
                      : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700'
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sorting & Layout View Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-700/70 shadow-sm">
          <div className="text-xs text-slate-300">
            Showing <span className="text-white font-black">{filteredIdioms.length}</span> of {idioms.length} phrases
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Sort Select */}
            <div className="flex items-center gap-1.5 text-xs text-slate-200 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-700 font-semibold min-h-[38px]">
              <ArrowUpDown className="w-3.5 h-3.5 text-indigo-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-slate-200 focus:outline-none cursor-pointer text-xs"
              >
                <option value="alphabetical" className="bg-slate-900 text-slate-200">Alphabetical (A-Z)</option>
                <option value="popularity" className="bg-slate-900 text-slate-200">Most Popular</option>
                <option value="category" className="bg-slate-900 text-slate-200">By Category</option>
              </select>
            </div>

            {/* View Mode Toggle: One Word Per Row vs Card Grid */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-700">
              <button
                onClick={() => setViewMode('rows')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all min-h-[32px] ${
                  viewMode === 'rows' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
                title="One word per row - Mobile optimized"
              >
                <List className="w-3.5 h-3.5" />
                <span>One Word Per Row</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all min-h-[32px] ${
                  viewMode === 'grid' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
                title="Grid Cards"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Grid Cards</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Explorer Content Render */}
      {filteredIdioms.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-3xl bg-slate-900/90 border border-slate-700/80 shadow-xl">
          <BookOpen className="w-12 h-12 text-slate-500 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-white">No Phrases Match Your Filter</h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md mx-auto">
            Try resetting your search query or letter filter.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedFormality('All');
              setSelectedLetter('All');
              setSearchQuery('');
            }}
            className="mt-4 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-500 transition-colors shadow-lg min-h-[44px]"
          >
            Reset All Filters
          </button>
        </div>
      ) : viewMode === 'rows' ? (
        /* Mobile-First "One Word Per Row" View */
        <div className="space-y-3.5">
          {filteredIdioms.map((idiom) => {
            const isBookmarked = bookmarkedIds.has(idiom.id);
            const isSpeakingTerm = speakingTermId === idiom.id;
            const isSpeakingExample = speakingExampleId === idiom.id;
            const primaryEx = idiom.examples && idiom.examples.length > 0 ? idiom.examples[0] : null;

            return (
              <div
                key={idiom.id}
                onClick={() => onInspect(idiom)}
                className="p-4 sm:p-5 rounded-2xl bg-slate-900/95 border border-slate-700/70 hover:border-indigo-400/80 hover:shadow-xl hover:shadow-indigo-500/10 cursor-pointer transition-all duration-200 group flex flex-col gap-3 shadow-md"
              >
                {/* Row Header: Term Name, Phonetic, Category, and 1-Tap Quick Action Buttons */}
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-2.5 flex-wrap min-w-0">
                    <h3 className="text-lg sm:text-xl font-black tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                      {idiom.term}
                    </h3>
                    {idiom.phonetic && (
                      <span className="font-mono text-xs text-indigo-200 bg-indigo-950/50 px-2 py-0.5 rounded border border-indigo-500/30">
                        {idiom.phonetic}
                      </span>
                    )}
                    <span className={`px-2.5 py-0.5 rounded-lg text-xs font-bold border ${getCategoryBadgeStyle(idiom.category)}`}>
                      {idiom.category}
                    </span>
                  </div>

                  {/* Right side controls: Audio Icon, Bookmark, and Details */}
                  <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                    {/* Audio Icon for Term */}
                    <button
                      onClick={(e) => handleSpeakTerm(e, idiom)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 min-h-[40px] cursor-pointer ${
                        isSpeakingTerm
                          ? 'bg-indigo-600 text-white border-indigo-400 animate-pulse shadow-md'
                          : 'bg-slate-800 text-indigo-300 border-slate-700 hover:text-white hover:bg-indigo-600/40'
                      }`}
                      title={`Listen to pronunciation of "${idiom.term}"`}
                      aria-label={`Listen to pronunciation of ${idiom.term}`}
                    >
                      <Volume2 className="w-4 h-4 text-indigo-400" />
                      <span className="text-[11px] sm:text-xs">Audio</span>
                    </button>

                    {/* Bookmark Toggle */}
                    <button
                      onClick={() => onToggleBookmark(idiom.id)}
                      className={`p-2 rounded-xl border transition-all min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer ${
                        isBookmarked
                          ? 'bg-amber-500/25 text-amber-300 border-amber-500/50 shadow-sm'
                          : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white hover:bg-slate-700'
                      }`}
                      title={isBookmarked ? 'Bookmarked' : 'Bookmark phrase'}
                      aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark phrase'}
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
                    </button>

                    {/* Details Sheet Trigger */}
                    <button
                      onClick={() => onInspect(idiom)}
                      className="px-3 py-1.5 rounded-xl bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600 hover:text-white border border-indigo-500/30 text-xs font-bold transition-all min-h-[40px] flex items-center gap-1 cursor-pointer"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Plain English Meaning - High Contrast & Easily Readable */}
                <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed font-sans">
                  {idiom.realMeaning}
                </p>

                {/* Workplace Dialogue Example WITH Audio Icon */}
                {primaryEx && (
                  <div className="p-3 rounded-xl bg-slate-950/75 border border-slate-700/60 flex items-start justify-between gap-2.5 text-xs">
                    <div className="flex items-start gap-2 leading-relaxed">
                      <MessageSquare className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-indigo-300 font-bold">{primaryEx.speaker} ({primaryEx.context}): </span>
                        <span className="text-slate-100 italic">"{primaryEx.quote}"</span>
                      </div>
                    </div>
                    {/* Audio Icon for the Example Sentence */}
                    <button
                      onClick={(e) => handleSpeakExampleQuote(e, idiom.id, primaryEx.quote)}
                      className={`p-1.5 rounded-lg border transition-all shrink-0 min-h-[32px] min-w-[32px] flex items-center justify-center cursor-pointer ${
                        isSpeakingExample
                          ? 'bg-indigo-600 text-white border-indigo-400 animate-pulse shadow'
                          : 'bg-slate-800 text-indigo-300 border-slate-700 hover:text-white hover:bg-indigo-600/40'
                      }`}
                      title="Listen to this example sentence"
                      aria-label={`Listen to example: ${primaryEx.quote}`}
                    >
                      <Volume2 className={`w-3.5 h-3.5 ${isSpeakingExample ? 'text-white' : 'text-indigo-400'}`} />
                    </button>
                  </div>
                )}

                {/* Plain Wording Alternative */}
                <div className="flex items-center gap-1.5 text-xs text-slate-300 pt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="text-slate-400">Plain wording: </span>
                  <span className="font-semibold text-emerald-300">{idiom.safeAlternative}</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Multi-column Grid Cards View */
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
      )}
    </div>
  );
};
