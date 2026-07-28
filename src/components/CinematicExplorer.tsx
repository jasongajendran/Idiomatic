import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, 
  Building2, 
  Cpu, 
  Target, 
  Filter, 
  LayoutGrid, 
  List, 
  Code2, 
  Sparkles, 
  Layers,
  ArrowUpDown,
  BookOpen,
  Quote
} from 'lucide-react';
import { Idiom, WorkflowCategory, SeniorityLevel } from '../types';
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
  const [selectedSeniority, setSelectedSeniority] = useState<SeniorityLevel | 'All'>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'code-matrix' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'popularity' | 'alphabetical' | 'seniority'>('popularity');

  // Filter & Sort Logic
  const filteredIdioms = useMemo(() => {
    return idioms.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSeniority = selectedSeniority === 'All' || item.seniority === selectedSeniority;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.term.toLowerCase().includes(q) ||
        item.realMeaning.toLowerCase().includes(q) ||
        item.corporateTranslation.toLowerCase().includes(q) ||
        item.codeAnalogy.snippet.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.toLowerCase().includes(q));

      return matchesCategory && matchesSeniority && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'popularity') return b.popularityScore - a.popularityScore;
      if (sortBy === 'alphabetical') return a.term.localeCompare(b.term);
      return a.seniority.localeCompare(b.seniority);
    });
  }, [idioms, selectedCategory, selectedSeniority, searchQuery, sortBy]);

  const categories: Array<{ label: WorkflowCategory | 'All'; icon: React.ReactNode; color: string }> = [
    { label: 'All', icon: <Layers className="w-4 h-4" />, color: 'from-slate-700 to-slate-900' },
    { label: 'Coding', icon: <Terminal className="w-4 h-4" />, color: 'from-cyan-600 to-blue-700' },
    { label: 'Management', icon: <Building2 className="w-4 h-4" />, color: 'from-purple-600 to-pink-700' },
    { label: 'Operations', icon: <Cpu className="w-4 h-4" />, color: 'from-amber-600 to-orange-700' },
    { label: 'Strategy', icon: <Target className="w-4 h-4" />, color: 'from-emerald-600 to-teal-700' }
  ];

  const seniorities: Array<SeniorityLevel | 'All'> = [
    'All',
    'Junior Dev',
    'Tech Lead',
    'Senior Architect',
    'C-Suite',
    'DevOps Ninja'
  ];

  return (
    <div className="space-y-10 pb-12">
      
      {/* Editorial Bold Hero Header Section */}
      <div className="relative rounded-3xl bg-slate-900/90 border border-white/10 p-8 sm:p-12 backdrop-blur-2xl overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-indigo-500/15 via-purple-500/15 to-pink-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>ISSUE NO. 24 — EDITORIAL TECH VERNACULAR</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-white leading-none">
            Tech Vernacular & <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              System Execution Logic
            </span>
          </h1>

          <div className="relative pl-6 border-l-2 border-indigo-500/50 my-4">
            <Quote className="w-5 h-5 text-indigo-400/60 absolute -top-1 -left-2.5 bg-slate-900" />
            <p className="text-base sm:text-lg text-slate-300 font-serif italic leading-relaxed">
              "Bridge executive corporate-speak and engineering mechanics. Unpack workplace jargon, code review acronyms, and organizational idioms through clean, intuitive system logic analogies."
            </p>
          </div>

          {/* Quick Editorial Stats Banner */}
          <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-300 font-mono font-bold">
            <div className="flex items-center gap-2 bg-slate-950/60 px-3.5 py-1.5 rounded-xl border border-white/5">
              <span className="text-indigo-400 font-black text-xl">{idioms.length}</span>
              <span>Deduplicated Terms</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-950/60 px-3.5 py-1.5 rounded-xl border border-white/5">
              <span className="text-purple-400 font-black text-xl">100%</span>
              <span>System Logic Maps</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-950/60 px-3.5 py-1.5 rounded-xl border border-white/5">
              <span className="text-emerald-400 font-black text-xl">Speech</span>
              <span>Phonetic Audio</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="space-y-5">
        
        {/* Category Tabs - Editorial Style */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setSelectedCategory(cat.label)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold tracking-wide transition-all duration-300 shrink-0 ${
                selectedCategory === cat.label
                  ? `bg-gradient-to-r ${cat.color} text-white shadow-xl border border-white/20`
                  : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
              {cat.label !== 'All' && (
                <span className="px-2 py-0.5 text-[10px] bg-slate-950/60 rounded-lg text-slate-300 font-mono">
                  {idioms.filter(i => i.category === cat.label).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Secondary Filter Row: Seniority, Sorting, View Modes */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-3xl bg-slate-900/70 border border-white/10 backdrop-blur-xl">
          
          {/* Seniority Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono font-bold text-slate-400 mr-1 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-indigo-400" /> Seniority:
            </span>
            {seniorities.map((sen) => (
              <button
                key={sen}
                onClick={() => setSelectedSeniority(sen)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedSeniority === sen
                    ? 'bg-indigo-600 text-white font-black shadow-md shadow-indigo-500/25 border border-white/20'
                    : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {sen}
              </button>
            ))}
          </div>

          {/* Right Controls: Sort & Layout Toggle */}
          <div className="flex items-center gap-3">
            
            {/* Sort Select */}
            <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-950/90 px-3.5 py-2 rounded-xl border border-white/10 font-mono font-semibold">
              <ArrowUpDown className="w-3.5 h-3.5 text-indigo-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-slate-200 focus:outline-none cursor-pointer"
              >
                <option value="popularity" className="bg-slate-900">Sort by Popularity</option>
                <option value="alphabetical" className="bg-slate-900">Alphabetical (A-Z)</option>
                <option value="seniority" className="bg-slate-900">Seniority Level</option>
              </select>
            </div>

            {/* View Mode Toggle Buttons */}
            <div className="flex items-center bg-slate-950/90 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg text-slate-400 hover:text-white transition-colors ${
                  viewMode === 'grid' ? 'bg-indigo-600 text-white shadow-sm' : ''
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('code-matrix')}
                className={`p-2 rounded-lg text-slate-400 hover:text-white transition-colors ${
                  viewMode === 'code-matrix' ? 'bg-indigo-600 text-white shadow-sm' : ''
                }`}
                title="System Logic Matrix"
              >
                <Code2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg text-slate-400 hover:text-white transition-colors ${
                  viewMode === 'list' ? 'bg-indigo-600 text-white shadow-sm' : ''
                }`}
                title="Editorial List View"
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
          <h3 className="text-xl font-black text-white">No Terms Match Your Filter Criteria</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
            Try adjusting your search query or resetting seniority filters.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedSeniority('All');
              setSearchQuery('');
            }}
            className="mt-4 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/25"
          >
            Reset All Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      ) : viewMode === 'code-matrix' ? (
        /* System Logic Matrix View */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredIdioms.map((idiom) => (
            <div
              key={idiom.id}
              onClick={() => onInspect(idiom)}
              className="group cursor-pointer rounded-3xl bg-slate-950 border border-white/10 hover:border-indigo-500/50 p-6 transition-all space-y-4 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-base font-black text-indigo-300 group-hover:text-indigo-200">
                  {idiom.term}
                </span>
                <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-slate-900 text-slate-300 border border-slate-800">
                  {idiom.category}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{idiom.realMeaning}</p>
              <div className="rounded-2xl bg-slate-900/90 p-4 font-mono text-xs text-cyan-300 border border-indigo-500/20 overflow-x-auto shadow-inner">
                <pre>{idiom.codeAnalogy.snippet}</pre>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Concise Editorial List View */
        <div className="rounded-3xl bg-slate-900/80 border border-white/10 overflow-hidden divide-y divide-white/5 shadow-2xl">
          {filteredIdioms.map((idiom) => (
            <div
              key={idiom.id}
              onClick={() => onInspect(idiom)}
              className="group p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-800/40 cursor-pointer transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span className="font-black text-base text-white group-hover:text-indigo-300 transition-colors">
                    {idiom.term}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{idiom.phonetic}</span>
                </div>
                <p className="text-xs text-slate-300 max-w-2xl">{idiom.realMeaning}</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="px-3 py-1 rounded-xl text-[11px] font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700">
                  {idiom.category}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onInspect(idiom);
                  }}
                  className="px-4 py-2 rounded-xl bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600 hover:text-white text-xs font-bold transition-colors shadow-sm"
                >
                  Inspect
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
