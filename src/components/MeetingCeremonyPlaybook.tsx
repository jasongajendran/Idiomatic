import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Calendar, 
  Volume2, 
  Search, 
  Sparkles, 
  Filter, 
  Quote, 
  Lightbulb, 
  ArrowRight,
  Code2,
  Bug,
  FileSpreadsheet,
  Gauge,
  Briefcase,
  Zap,
  CheckCircle2,
  MessageSquare
} from 'lucide-react';
import { 
  CEREMONIES_DATA, 
  MeetingRole, 
  AgileCeremony, 
  PhraseTone, 
  MeetingPhrase 
} from '../data/ceremoniesData';
import { speakTerm, speakSentence } from '../utils/speechUtils';

interface MeetingCeremonyPlaybookProps {
  isDistractionFree?: boolean;
}

export const MeetingCeremonyPlaybook: React.FC<MeetingCeremonyPlaybookProps> = ({
  isDistractionFree = false
}) => {
  const [selectedRole, setSelectedRole] = useState<MeetingRole | 'All'>('All');
  const [selectedCeremony, setSelectedCeremony] = useState<AgileCeremony | 'All'>('All');
  const [selectedTone, setSelectedTone] = useState<PhraseTone | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [speakingMeaningId, setSpeakingMeaningId] = useState<string | null>(null);

  const roles: Array<{ role: MeetingRole | 'All'; icon: React.ReactNode; label: string }> = [
    { role: 'All', icon: <Users className="w-4 h-4" />, label: 'All Roles' },
    { role: 'Developer', icon: <Code2 className="w-4 h-4 text-cyan-400" />, label: 'Developers' },
    { role: 'Tester / QA', icon: <Bug className="w-4 h-4 text-emerald-400" />, label: 'Testers / QA' },
    { role: 'BSA (Business Analyst)', icon: <FileSpreadsheet className="w-4 h-4 text-amber-400" />, label: 'BSA' },
    { role: 'Iteration Manager / Scrum Master', icon: <Gauge className="w-4 h-4 text-purple-400" />, label: 'Iteration Mgrs' },
    { role: 'Work Colleague', icon: <Briefcase className="w-4 h-4 text-blue-400" />, label: 'Work Colleagues' },
    { role: 'Gen-Z Tech Worker', icon: <Zap className="w-4 h-4 text-pink-400" />, label: 'Gen-Z & Slang' }
  ];

  const ceremonies: Array<AgileCeremony | 'All'> = [
    'All',
    'Daily Standup',
    'Sprint Planning',
    'Backlog Refinement',
    'Sprint Retrospective',
    'Sprint Review & Demo',
    'Bug Triage & Incident',
    'General Workplace'
  ];

  const filteredPhrases = useMemo(() => {
    return CEREMONIES_DATA.filter((item) => {
      const matchRole = selectedRole === 'All' || item.role === selectedRole;
      const matchCeremony = selectedCeremony === 'All' || item.ceremony === selectedCeremony;
      const matchTone = selectedTone === 'All' || item.tone === selectedTone;
      
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        item.phrase.toLowerCase().includes(q) ||
        item.scenarioContext.toLowerCase().includes(q) ||
        item.realMeaning.toLowerCase().includes(q) ||
        item.proTip.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q));

      return matchRole && matchCeremony && matchTone && matchSearch;
    });
  }, [selectedRole, selectedCeremony, selectedTone, searchQuery]);

  const handleSpeak = async (phrase: MeetingPhrase) => {
    setSpeakingId(phrase.id);
    await speakTerm(phrase.phrase, 0.95);
    setSpeakingId(null);
  };

  const handleSpeakMeaning = async (phrase: MeetingPhrase) => {
    setSpeakingMeaningId(phrase.id);
    await speakSentence(phrase.realMeaning);
    setSpeakingMeaningId(null);
  };

  const getToneBadgeStyle = (tone: PhraseTone) => {
    switch (tone) {
      case 'Diplomatic':
        return 'bg-blue-500/15 text-blue-300 border-blue-500/30';
      case 'Direct & Technical':
        return 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30';
      case 'Assertive Pushback':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      case 'Casual & Gen-Z':
        return 'bg-pink-500/15 text-pink-300 border-pink-500/30';
      case 'Executive / Strategic':
        return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const getRoleBadgeStyle = (role: MeetingRole) => {
    switch (role) {
      case 'Developer':
        return 'bg-cyan-950/60 text-cyan-300 border-cyan-500/30';
      case 'Tester / QA':
        return 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30';
      case 'BSA (Business Analyst)':
        return 'bg-amber-950/60 text-amber-300 border-amber-500/30';
      case 'Iteration Manager / Scrum Master':
        return 'bg-purple-950/60 text-purple-300 border-purple-500/30';
      case 'Work Colleague':
        return 'bg-blue-950/60 text-blue-300 border-blue-500/30';
      case 'Gen-Z Tech Worker':
        return 'bg-pink-950/60 text-pink-300 border-pink-500/30';
      default:
        return 'bg-slate-900 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header Banner - High-contrast & Eye-Friendly (Hidden in Distraction Free Mode) */}
      {!isDistractionFree && (
        <div className="relative rounded-3xl bg-slate-900/90 border border-white/10 p-6 sm:p-10 backdrop-blur-2xl overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-500/15 via-purple-500/15 to-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 shadow-inner">
              <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
              <span>MEETING & AGILE CEREMONIES PLAYBOOK</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Meeting Dialogue & <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-indigo-300 via-purple-200 to-cyan-300 bg-clip-text text-transparent">
                Agile Ceremony Phrases
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-sans max-w-3xl">
              Curated, ready-to-use sentences and battle-tested phrases for developers, testers, BSAs, iteration managers, work colleagues, and Gen-Z tech teammates across all agile rituals.
            </p>

            {/* Quick Metrics */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-6 text-xs text-slate-300 font-mono font-bold">
              <div className="flex items-center gap-2 bg-slate-950/80 px-3.5 py-1.5 rounded-xl border border-white/10 shadow-sm">
                <span className="text-indigo-400 font-black text-lg">{CEREMONIES_DATA.length}</span>
                <span>Ceremony Sentences</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-950/80 px-3.5 py-1.5 rounded-xl border border-white/10 shadow-sm">
                <span className="text-pink-400 font-black text-lg">6 Roles</span>
                <span>Dev, QA, BSA, IM, Colleague, Gen-Z</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-950/80 px-3.5 py-1.5 rounded-xl border border-white/10 shadow-sm">
                <span className="text-cyan-400 font-black text-lg">Audio</span>
                <span>Spoken Pronunciation</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Controls & Filters */}
      <div className="space-y-4">
        
        {/* Role Chips - Touch Friendly with Generous Sizing */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-300 px-1">
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-indigo-400" /> Filter by Workplace Role:
            </span>
            <span className="text-slate-400 font-normal">
              Showing {filteredPhrases.length} phrase{filteredPhrases.length === 1 ? '' : 's'}
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none touch-pan-x">
            {roles.map((r) => (
              <button
                key={r.role}
                onClick={() => setSelectedRole(r.role)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold tracking-wide transition-all shrink-0 min-h-[44px] cursor-pointer ${
                  selectedRole === r.role
                    ? 'bg-indigo-600 text-white font-black shadow-lg shadow-indigo-500/25 border border-indigo-400/40'
                    : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:text-white hover:bg-slate-800'
                }`}
              >
                {r.icon}
                <span>{r.label}</span>
                {r.role !== 'All' && (
                  <span className="px-2 py-0.5 text-[10px] bg-slate-950/60 rounded-md text-slate-300 font-mono">
                    {CEREMONIES_DATA.filter(p => p.role === r.role).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Ceremony Filter & Search Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 p-4 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl">
          
          {/* Ceremony Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 lg:pb-0 scrollbar-none">
            <span className="text-xs font-mono font-bold text-slate-400 shrink-0 mr-1 hidden sm:inline">
              Ceremony:
            </span>
            {ceremonies.map((ceremony) => (
              <button
                key={ceremony}
                onClick={() => setSelectedCeremony(ceremony)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 min-h-[36px] ${
                  selectedCeremony === ceremony
                    ? 'bg-purple-600 text-white font-black shadow-md border border-white/20'
                    : 'bg-slate-800/70 text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {ceremony}
              </button>
            ))}
          </div>

          {/* Search Field */}
          <div className="relative w-full lg:w-72 shrink-0">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search phrases, blockers, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 bg-slate-950 border border-white/10 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
            />
          </div>
        </div>
      </div>

      {/* Phrases Grid List */}
      {filteredPhrases.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-3xl bg-slate-900/40 border border-white/10">
          <MessageSquare className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-xl font-black text-white">No Phrases Match Your Filter Criteria</h3>
          <p className="text-sm text-slate-300 mt-1 max-w-md mx-auto">
            Try resetting your search query or selecting "All Roles".
          </p>
          <button
            onClick={() => {
              setSelectedRole('All');
              setSelectedCeremony('All');
              setSelectedTone('All');
              setSearchQuery('');
            }}
            className="mt-4 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/25"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredPhrases.map((phrase) => {
              const isSpeaking = speakingId === phrase.id;

              return (
                <motion.div
                  key={phrase.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col justify-between rounded-3xl bg-slate-900/80 border border-white/10 hover:border-indigo-500/40 p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 backdrop-blur-xl"
                >
                  <div className="space-y-4">
                    {/* Top Row: Role & Ceremony Badges */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs sm:text-sm font-bold font-mono border ${getRoleBadgeStyle(phrase.role)}`}>
                          {phrase.role}
                        </span>
                        <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-800 text-slate-200 border border-slate-700">
                          {phrase.ceremony}
                        </span>
                      </div>

                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold font-mono border ${getToneBadgeStyle(phrase.tone)}`}>
                        {phrase.tone}
                      </span>
                    </div>

                    {/* The Spoken Sentence (High Contrast & Large Typography) */}
                    <div className="relative pl-5 border-l-3 border-indigo-400 my-2">
                      <Quote className="w-4 h-4 text-indigo-400 absolute -top-1 -left-2 bg-slate-900 rounded-full" />
                      <p className="text-base sm:text-lg font-bold text-white leading-relaxed tracking-tight">
                        "{phrase.phrase}"
                      </p>
                    </div>

                    {/* Context & Meaning Box */}
                    <div className="rounded-2xl bg-slate-950/70 border border-white/5 p-4 sm:p-5 space-y-3">
                      <div>
                        <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
                          When to use in meeting:
                        </span>
                        <p className="text-sm sm:text-base text-slate-100 leading-relaxed mt-1">
                          {phrase.scenarioContext}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-white/5 flex items-start justify-between gap-2.5">
                        <div className="flex-1">
                          <span className="text-xs font-mono font-bold text-indigo-300 uppercase tracking-wider block">
                            Behind the scenes signal:
                          </span>
                          <p className="text-sm sm:text-base text-indigo-100 leading-relaxed mt-1 font-medium">
                            {phrase.realMeaning}
                          </p>
                        </div>
                        <button
                          onClick={() => handleSpeakMeaning(phrase)}
                          className={`p-2 rounded-lg border transition-all shrink-0 min-h-[34px] min-w-[34px] flex items-center justify-center cursor-pointer mt-1 ${
                            speakingMeaningId === phrase.id
                              ? 'bg-indigo-600 text-white border-indigo-400 animate-pulse shadow'
                              : 'bg-slate-800 text-indigo-200 border-slate-700 hover:text-white hover:bg-indigo-600'
                          }`}
                          title="Listen to signal meaning"
                          aria-label={`Listen to meaning of phrase: ${phrase.phrase}`}
                        >
                          <Volume2 className={`w-4 h-4 ${speakingMeaningId === phrase.id ? 'text-white' : 'text-indigo-300'}`} />
                        </button>
                      </div>
                    </div>

                    {/* Agile Pro-Tip Box */}
                    <div className="flex items-start gap-2.5 p-3.5 sm:p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-sm sm:text-base text-emerald-100 leading-relaxed">
                      <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-bold text-emerald-300 mr-1.5">Agile Tip:</strong>
                        {phrase.proTip}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Row: Audio Speech & Tags */}
                  <div className="pt-4 mt-3 border-t border-white/10 flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {phrase.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-800/80 text-slate-300 border border-slate-700/60"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleSpeak(phrase)}
                        className={`p-2.5 rounded-xl border transition-all min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer ${
                          isSpeaking 
                            ? 'bg-indigo-600 text-white border-indigo-400 animate-pulse shadow-md shadow-indigo-500/30' 
                            : 'bg-slate-800 text-indigo-200 border-indigo-500/30 hover:bg-indigo-600 hover:text-white'
                        }`}
                        title="Listen to phrase delivery"
                        aria-label={`Listen to phrase: ${phrase.phrase}`}
                      >
                        <Volume2 className="w-4 h-4 text-indigo-300" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
