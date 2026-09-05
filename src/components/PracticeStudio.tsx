import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Gamepad2, 
  Trophy, 
  Flame, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Sparkles, 
  ArrowRight,
  BookOpen,
  Volume2,
  Shuffle,
  Layers,
  Zap,
  Check,
  Code2,
  ChevronLeft,
  ChevronRight,
  BrainCircuit,
  Filter
} from 'lucide-react';
import { IDIOMS_DATA } from '../data/idiomsData';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { Idiom, WorkflowCategory } from '../types';
import { speakTerm, speakSentence } from '../utils/speechUtils';

type PracticeMode = 'quiz' | 'flashcards' | 'speed_match';

interface DynamicQuestion {
  id: string;
  scenarioText: string;
  speakerRole: string;
  highlightedTerm: string;
  questionText: string;
  codeAnalogySnippet?: string;
  options: Array<{
    text: string;
    isCorrect: boolean;
    explanation: string;
  }>;
}

interface PracticeStudioProps {
  isDistractionFree?: boolean;
}

export const PracticeStudio: React.FC<PracticeStudioProps> = ({
  isDistractionFree = false
}) => {
  const [activeMode, setActiveMode] = useState<PracticeMode>('quiz');

  // ==========================
  // QUIZ STATE
  // ==========================
  const [quizQuestions, setQuizQuestions] = useState<DynamicQuestion[]>([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [quizLength, setQuizLength] = useState<number>(10);

  // Generate randomized dynamic quiz from the 314-idiom repository
  const generateQuizDeck = (count: number) => {
    // Combine curated questions with dynamically generated ones
    const dynamicPool: DynamicQuestion[] = [];

    // Shuffle idioms
    const shuffledIdioms = [...IDIOMS_DATA].sort(() => 0.5 - Math.random());

    shuffledIdioms.slice(0, count * 2).forEach((targetIdiom, idx) => {
      // Pick 3 random distractor idioms from same or different categories
      const distractors = IDIOMS_DATA.filter((i) => i.id !== targetIdiom.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      const questionType = idx % 3;

      if (questionType === 0) {
        // Question about Real Meaning
        const options = [
          {
            text: targetIdiom.realMeaning,
            isCorrect: true,
            explanation: `Correct! "${targetIdiom.term}" means: ${targetIdiom.realMeaning}`
          },
          ...distractors.map((d) => ({
            text: d.realMeaning,
            isCorrect: false,
            explanation: `Incorrect. That is the definition of "${d.term}".`
          }))
        ].sort(() => 0.5 - Math.random());

        dynamicPool.push({
          id: `dyn-${targetIdiom.id}-${idx}`,
          scenarioText: targetIdiom.examples?.[0]?.quote || `A colleague says: "We should apply ${targetIdiom.term} here."`,
          speakerRole: targetIdiom.examples?.[0]?.speaker || 'Senior Engineer',
          highlightedTerm: targetIdiom.term,
          questionText: `What is the core meaning of the phrase "${targetIdiom.term}"?`,
          codeAnalogySnippet: targetIdiom.codeAnalogy?.snippet,
          options
        });
      } else if (questionType === 1) {
        // Question: Identify the term from workplace dialogue
        const options = [
          {
            text: targetIdiom.term,
            isCorrect: true,
            explanation: `Correct! "${targetIdiom.term}" fits this workplace context perfectly.`
          },
          ...distractors.map((d) => ({
            text: d.term,
            isCorrect: false,
            explanation: `Incorrect. "${d.term}" refers to: ${d.realMeaning}`
          }))
        ].sort(() => 0.5 - Math.random());

        dynamicPool.push({
          id: `dyn-${targetIdiom.id}-${idx}`,
          scenarioText: targetIdiom.corporateTranslation || targetIdiom.realMeaning,
          speakerRole: 'Tech Lead / Manager',
          highlightedTerm: targetIdiom.term,
          questionText: `Which tech phrase best expresses: "${targetIdiom.safeAlternative || targetIdiom.realMeaning}"?`,
          codeAnalogySnippet: targetIdiom.codeAnalogy?.snippet,
          options
        });
      } else {
        // Question: Plain english / Safe client communication
        const options = [
          {
            text: targetIdiom.safeAlternative || targetIdiom.realMeaning,
            isCorrect: true,
            explanation: `Correct! When speaking with non-technical stakeholders or clients, this is the most professional direct phrasing.`
          },
          ...distractors.map((d) => ({
            text: d.safeAlternative || d.realMeaning,
            isCorrect: false,
            explanation: `Incorrect. That corresponds to "${d.term}".`
          }))
        ].sort(() => 0.5 - Math.random());

        dynamicPool.push({
          id: `dyn-${targetIdiom.id}-${idx}`,
          scenarioText: `You are in an executive client demo and want to avoid jargon when explaining ${targetIdiom.term}.`,
          speakerRole: 'Client Presentation',
          highlightedTerm: targetIdiom.term,
          questionText: `What is the best plain English alternative for "${targetIdiom.term}"?`,
          codeAnalogySnippet: targetIdiom.codeAnalogy?.snippet,
          options
        });
      }
    });

    // Shuffle and pick requested count
    const deck = [...QUIZ_QUESTIONS, ...dynamicPool]
      .sort(() => 0.5 - Math.random())
      .slice(0, count);

    setQuizQuestions(deck);
    setQuizIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setIsQuizCompleted(false);
  };

  useEffect(() => {
    generateQuizDeck(quizLength);
  }, [quizLength]);

  const currentQuestion = quizQuestions[quizIndex];

  const handleSelectQuizOption = (idx: number) => {
    if (selectedOption !== null || !currentQuestion) return;
    setSelectedOption(idx);
    setShowExplanation(true);

    const isCorrect = currentQuestion.options[idx].isCorrect;
    if (isCorrect) {
      setScore((prev) => prev + 100 + streak * 25);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNextQuiz = () => {
    setSelectedOption(null);
    setShowExplanation(false);

    if (quizIndex + 1 < quizQuestions.length) {
      setQuizIndex((prev) => prev + 1);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setScore(0);
    setStreak(0);
    generateQuizDeck(quizLength);
  };

  // ==========================
  // FLASHCARD STATE
  // ==========================
  const [flashcardCategory, setFlashcardCategory] = useState<WorkflowCategory | 'All'>('All');
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState<Set<string>>(new Set());
  const [reviewLaterIds, setReviewLaterIds] = useState<Set<string>>(new Set());

  const flashcardDeck = useMemo(() => {
    return IDIOMS_DATA.filter((item) => {
      if (flashcardCategory === 'All') return true;
      return item.category === flashcardCategory;
    });
  }, [flashcardCategory]);

  const currentFlashcard = flashcardDeck[flashcardIndex] || flashcardDeck[0];

  const handleNextFlashcard = () => {
    setIsCardFlipped(false);
    if (flashcardIndex + 1 < flashcardDeck.length) {
      setFlashcardIndex((prev) => prev + 1);
    } else {
      setFlashcardIndex(0);
    }
  };

  const handlePrevFlashcard = () => {
    setIsCardFlipped(false);
    if (flashcardIndex > 0) {
      setFlashcardIndex((prev) => prev - 1);
    } else {
      setFlashcardIndex(flashcardDeck.length - 1);
    }
  };

  const handleMarkMastered = () => {
    if (!currentFlashcard) return;
    setMasteredIds((prev) => new Set(prev).add(currentFlashcard.id));
    setReviewLaterIds((prev) => {
      const next = new Set(prev);
      next.delete(currentFlashcard.id);
      return next;
    });
    handleNextFlashcard();
  };

  const handleMarkReview = () => {
    if (!currentFlashcard) return;
    setReviewLaterIds((prev) => new Set(prev).add(currentFlashcard.id));
    handleNextFlashcard();
  };

  // ==========================
  // SPEED MATCH MINI-GAME STATE
  // ==========================
  interface MatchItem {
    id: string;
    text: string;
    idiomId: string;
    type: 'term' | 'meaning';
  }

  const [matchTerms, setMatchTerms] = useState<MatchItem[]>([]);
  const [matchMeanings, setMatchMeanings] = useState<MatchItem[]>([]);
  const [selectedTermItem, setSelectedTermItem] = useState<MatchItem | null>(null);
  const [selectedMeaningItem, setSelectedMeaningItem] = useState<MatchItem | null>(null);
  const [matchedIds, setMatchedIds] = useState<Set<string>>(new Set());
  const [matchScore, setMatchScore] = useState(0);
  const [matchRound, setMatchRound] = useState(1);
  const [wrongMatch, setWrongMatch] = useState<{ termId: string; meaningId: string } | null>(null);

  const startNewMatchRound = () => {
    const randomFour = [...IDIOMS_DATA].sort(() => 0.5 - Math.random()).slice(0, 4);

    const terms: MatchItem[] = randomFour.map((i) => ({
      id: `term-${i.id}`,
      text: i.term,
      idiomId: i.id,
      type: 'term' as const
    })).sort(() => 0.5 - Math.random());

    const meanings: MatchItem[] = randomFour.map((i) => ({
      id: `meaning-${i.id}`,
      text: i.realMeaning,
      idiomId: i.id,
      type: 'meaning' as const
    })).sort(() => 0.5 - Math.random());

    setMatchTerms(terms);
    setMatchMeanings(meanings);
    setMatchedIds(new Set());
    setSelectedTermItem(null);
    setSelectedMeaningItem(null);
    setWrongMatch(null);
  };

  useEffect(() => {
    if (activeMode === 'speed_match') {
      startNewMatchRound();
    }
  }, [activeMode, matchRound]);

  const handleSelectMatchTerm = (item: MatchItem) => {
    if (matchedIds.has(item.idiomId)) return;
    setSelectedTermItem(item);

    if (selectedMeaningItem) {
      checkMatch(item, selectedMeaningItem);
    }
  };

  const handleSelectMatchMeaning = (item: MatchItem) => {
    if (matchedIds.has(item.idiomId)) return;
    setSelectedMeaningItem(item);

    if (selectedTermItem) {
      checkMatch(selectedTermItem, item);
    }
  };

  const checkMatch = (termItem: MatchItem, meaningItem: MatchItem) => {
    if (termItem.idiomId === meaningItem.idiomId) {
      // Correct Match!
      setMatchedIds((prev) => new Set(prev).add(termItem.idiomId));
      setMatchScore((prev) => prev + 150);
      setSelectedTermItem(null);
      setSelectedMeaningItem(null);

      // Check if all 4 matched
      if (matchedIds.size + 1 === 4) {
        setTimeout(() => {
          setMatchRound((r) => r + 1);
        }, 800);
      }
    } else {
      // Wrong Match
      setWrongMatch({ termId: termItem.id, meaningId: meaningItem.id });
      setTimeout(() => {
        setWrongMatch(null);
        setSelectedTermItem(null);
        setSelectedMeaningItem(null);
      }, 600);
    }
  };

  const getRank = (finalScore: number) => {
    if (finalScore >= 1200) return { name: 'Principal Tech Whisperer', badge: '👑' };
    if (finalScore >= 700) return { name: 'Staff Architect Vernacular Lead', badge: '⚡' };
    if (finalScore >= 350) return { name: 'Senior Developer Pragmatist', badge: '🔥' };
    return { name: 'Junior Jargon Practitioner', badge: '🚀' };
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header Banner - Hidden in Focus Mode */}
      {!isDistractionFree ? (
        <div className="relative rounded-3xl bg-gradient-to-br from-rose-950/80 via-slate-900 to-indigo-950/80 border border-pink-500/30 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 shadow-inner">
                <Gamepad2 className="w-4 h-4 text-rose-400" />
                <span>INTERACTIVE PRACTICE STUDIO ({IDIOMS_DATA.length} IDIOMS)</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                Interactive Scenario <br />
                <span className="bg-gradient-to-r from-pink-400 via-rose-300 to-amber-300 bg-clip-text text-transparent">
                  Challenge & Flashcard Studio
                </span>
              </h2>
              <p className="text-sm text-slate-200 max-w-xl font-sans leading-relaxed">
                Decipher corporate jargon, code review debates, and sprint trade-offs under real scenario pressure with dynamic quizzes, interactive 3D flashcards, and speed matching.
              </p>
            </div>

            {/* Mode Selector Tabs */}
            <div className="flex flex-wrap md:flex-col gap-2 bg-slate-950/80 p-2 rounded-2xl border border-white/10 shrink-0 backdrop-blur-md">
              <button
                onClick={() => setActiveMode('quiz')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeMode === 'quiz'
                    ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-lg shadow-pink-500/25'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                <BrainCircuit className="w-4 h-4" />
                <span>Scenario Quiz ({quizLength} Qs)</span>
              </button>

              <button
                onClick={() => setActiveMode('flashcards')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeMode === 'flashcards'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Flashcard Trainer (314)</span>
              </button>

              <button
                onClick={() => setActiveMode('speed_match')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeMode === 'speed_match'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/25'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Zap className="w-4 h-4" />
                <span>Speed Matcher</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Focus Mode Compact Tabs */
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveMode('quiz')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeMode === 'quiz'
                ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <BrainCircuit className="w-4 h-4" />
            <span>Scenario Quiz</span>
          </button>
          <button
            onClick={() => setActiveMode('flashcards')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeMode === 'flashcards'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Flashcards</span>
          </button>
          <button
            onClick={() => setActiveMode('speed_match')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeMode === 'speed_match'
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Speed Match</span>
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 1: SCENARIO QUIZ */}
      {/* ========================================================================= */}
      {activeMode === 'quiz' && (
        <div className="space-y-6">
          
          {/* Quiz Controls & Scoreboard */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-white/10">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-400 font-bold">Quiz Length:</span>
              {[5, 10, 20].map((len) => (
                <button
                  key={len}
                  onClick={() => setQuizLength(len)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    quizLength === len
                      ? 'bg-pink-600 text-white'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-white/10'
                  }`}
                >
                  {len} Questions
                </button>
              ))}
              <button
                onClick={handleRestartQuiz}
                className="p-1.5 rounded-lg bg-slate-950 text-slate-400 hover:text-white border border-white/10 transition-colors"
                title="Shuffle new quiz questions"
              >
                <Shuffle className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold">
                <Flame className="w-4 h-4 text-amber-400 animate-bounce" />
                <span>Streak: {streak}x</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-pink-500/20 text-pink-300 border border-pink-500/30 text-xs font-mono font-bold">
                <Trophy className="w-4 h-4 text-pink-400" />
                <span>Score: {score}</span>
              </div>
            </div>
          </div>

          {!isQuizCompleted && currentQuestion ? (
            <div className="max-w-3xl mx-auto rounded-3xl bg-slate-950/90 border border-pink-500/20 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden backdrop-blur-xl">
              
              {/* Question Header & Progress Bar */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-400">
                  <span>CHALLENGE {quizIndex + 1} OF {quizQuestions.length}</span>
                  <span className="text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-lg border border-rose-500/20">
                    {currentQuestion.speakerRole}
                  </span>
                </div>

                <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden p-0.5 border border-white/10">
                  <div
                    className="h-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 rounded-full transition-all duration-300 shadow-md"
                    style={{ width: `${((quizIndex + 1) / quizQuestions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Scenario Context Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950/80 border border-white/10 space-y-2 shadow-inner">
                <span className="text-xs font-mono text-pink-400 font-black block uppercase tracking-wider">
                  WORKPLACE SCENARIO CONTEXT
                </span>
                <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-sans">
                  "{currentQuestion.scenarioText}"
                </p>
              </div>

              {/* Question Text */}
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {currentQuestion.questionText}
              </h3>

              {/* Options Grid */}
              <div className="space-y-3">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  let btnStyle = 'bg-slate-900/80 border-white/10 text-slate-200 hover:border-pink-500/50 hover:bg-slate-800/80';

                  if (selectedOption !== null) {
                    if (option.isCorrect) {
                      btnStyle = 'bg-emerald-500/20 border-emerald-500/60 text-emerald-200 font-bold shadow-lg shadow-emerald-500/10';
                    } else if (isSelected) {
                      btnStyle = 'bg-rose-500/20 border-rose-500/60 text-rose-200 font-bold shadow-lg shadow-rose-500/10';
                    } else {
                      btnStyle = 'bg-slate-900/40 border-slate-800/40 text-slate-500 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectQuizOption(idx)}
                      disabled={selectedOption !== null}
                      className={`w-full p-4 sm:p-5 rounded-2xl border text-left text-sm sm:text-base transition-all duration-200 flex items-center justify-between gap-3 ${btnStyle}`}
                    >
                      <span className="font-medium leading-relaxed">{option.text}</span>
                      {selectedOption !== null && (
                        <span>
                          {option.isCorrect ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                          ) : isSelected ? (
                            <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                          ) : null}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Box */}
              {showExplanation && selectedOption !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-pink-500/30 space-y-3 shadow-xl"
                >
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-mono font-bold text-rose-400">
                    <Sparkles className="w-4 h-4 text-rose-400" />
                    <span>EXPLANATION & SYSTEM LOGIC</span>
                  </div>
                  <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-sans">
                    {currentQuestion.options[selectedOption].explanation}
                  </p>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={handleNextQuiz}
                      className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 text-white font-bold text-sm flex items-center gap-2 hover:opacity-95 transition-all shadow-xl shadow-pink-500/25 min-h-[44px] cursor-pointer"
                    >
                      <span>Next Challenge</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          ) : (
            /* Final Completion Scorecard */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-xl mx-auto rounded-3xl bg-slate-950/90 border border-pink-500/30 p-8 sm:p-10 text-center space-y-6 shadow-2xl backdrop-blur-xl"
            >
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-pink-500 via-rose-600 to-amber-500 mx-auto flex items-center justify-center text-4xl shadow-xl shadow-pink-500/30 animate-pulse">
                {getRank(score).badge}
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono text-pink-400 font-bold uppercase tracking-wider block">
                  QUIZ ROUND COMPLETE
                </span>
                <h3 className="text-3xl font-black text-white">
                  {getRank(score).name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  You earned <span className="text-amber-300 font-black font-mono">{score} points</span> across {quizQuestions.length} challenges.
                </p>
              </div>

              <button
                onClick={handleRestartQuiz}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 mx-auto hover:opacity-95 transition-all shadow-xl shadow-pink-500/25 min-h-[44px]"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Play Another Round</span>
              </button>
            </motion.div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: INTERACTIVE 3D FLASHCARDS */}
      {/* ========================================================================= */}
      {activeMode === 'flashcards' && (
        <div className="space-y-6 max-w-2xl mx-auto">
          
          {/* Flashcard Header & Filter Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/80 border border-white/10">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {(['All', 'Coding', 'Management', 'Operations', 'Strategy'] as Array<WorkflowCategory | 'All'>).map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setFlashcardCategory(cat);
                    setFlashcardIndex(0);
                    setIsCardFlipped(false);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    flashcardCategory === cat
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-emerald-400 font-bold">✓ Mastered: {masteredIds.size}</span>
              <span className="text-slate-600">•</span>
              <span className="text-amber-400 font-bold">⚡ Review: {reviewLaterIds.size}</span>
            </div>
          </div>

          {/* Flashcard Component */}
          {currentFlashcard && (
            <div className="space-y-4">
              <div
                onClick={() => setIsCardFlipped(!isCardFlipped)}
                className="cursor-pointer min-h-[340px] rounded-3xl bg-slate-900/90 border border-purple-500/30 p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative backdrop-blur-xl transition-all duration-300 hover:border-purple-400"
              >
                {/* Front Side: Term, Phonetics, Category */}
                {!isCardFlipped ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-xl text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        {currentFlashcard.category}
                      </span>
                      <span className="text-xs font-mono text-slate-500">
                        Card {flashcardIndex + 1} of {flashcardDeck.length}
                      </span>
                    </div>

                    <div className="text-center py-8 space-y-3">
                      <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                        {currentFlashcard.term}
                      </h3>
                      <p className="text-sm text-slate-300 max-w-sm mx-auto">
                        Tap or click anywhere on this card to flip and reveal the definition & code analogy.
                      </p>
                    </div>

                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speakTerm(currentFlashcard.term);
                        }}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-950 text-purple-300 hover:text-white border border-purple-500/30 text-xs font-bold transition-all"
                      >
                        <Volume2 className="w-4 h-4" />
                        <span>Pronounce</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Back Side: Definition, Corporate Translation, Code Analogy */
                  <div className="space-y-4 animate-fadeIn">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <h4 className="text-lg font-black text-white">{currentFlashcard.term}</h4>
                      <span className="text-xs font-mono text-purple-400">Definition Revealed</span>
                    </div>

                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Real Meaning</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              speakSentence(currentFlashcard.realMeaning);
                            }}
                            className="p-1.5 rounded-lg bg-slate-950 text-purple-300 hover:text-white border border-purple-500/30 text-xs flex items-center gap-1 cursor-pointer"
                            title="Listen to definition"
                            aria-label="Listen to definition"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
                          {currentFlashcard.realMeaning}
                        </p>
                      </div>

                      {currentFlashcard.corporateTranslation && (
                        <div className="p-3.5 sm:p-4 rounded-xl bg-slate-950/70 border border-white/10 text-sm sm:text-base text-slate-200 italic leading-relaxed">
                          "{currentFlashcard.corporateTranslation}"
                        </div>
                      )}
                    </div>

                    <div className="text-center pt-2">
                      <span className="text-[11px] text-slate-500">Tap to flip back</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Flashcard Action Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  onClick={handlePrevFlashcard}
                  className="py-3 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs border border-white/10 flex items-center justify-center gap-1.5 transition-colors min-h-[44px]"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <button
                  onClick={handleMarkReview}
                  className="py-3 px-4 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-xs border border-amber-500/30 flex items-center justify-center gap-1.5 transition-colors min-h-[44px]"
                >
                  <span>⚡ Review Later</span>
                </button>

                <button
                  onClick={handleMarkMastered}
                  className="py-3 px-4 rounded-2xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-bold text-xs border border-emerald-500/30 flex items-center justify-center gap-1.5 transition-colors min-h-[44px]"
                >
                  <Check className="w-4 h-4" />
                  <span>✓ Mastered</span>
                </button>

                <button
                  onClick={handleNextFlashcard}
                  className="py-3 px-4 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-lg shadow-purple-500/25 min-h-[44px]"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 3: SPEED MATCHER MINI-GAME */}
      {/* ========================================================================= */}
      {activeMode === 'speed_match' && (
        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/80 border border-white/10">
            <div className="space-y-0.5">
              <span className="text-xs font-mono text-amber-400 font-bold block">ROUND {matchRound}</span>
              <p className="text-xs text-slate-300">Match the 4 tech idioms on the left with their definitions on the right.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold">
                Match Score: {matchScore} pts
              </div>
              <button
                onClick={startNewMatchRound}
                className="p-2 rounded-xl bg-slate-950 text-slate-400 hover:text-white border border-white/10"
                title="Shuffle new terms"
              >
                <Shuffle className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Left Column: Tech Terms */}
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block px-1">
                Tech Idioms
              </span>
              {matchTerms.map((item) => {
                const isMatched = matchedIds.has(item.idiomId);
                const isSelected = selectedTermItem?.id === item.id;
                const isError = wrongMatch?.termId === item.id;

                let cardStyle = 'bg-slate-900/90 border-white/10 text-slate-200 hover:border-amber-500/40';
                if (isMatched) {
                  cardStyle = 'bg-emerald-500/20 border-emerald-500/50 text-emerald-200 opacity-60';
                } else if (isError) {
                  cardStyle = 'bg-rose-500/20 border-rose-500 text-rose-200 animate-shake';
                } else if (isSelected) {
                  cardStyle = 'bg-amber-500/20 border-amber-500 text-amber-200 shadow-lg shadow-amber-500/20 font-bold';
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectMatchTerm(item)}
                    disabled={isMatched}
                    className={`w-full p-4 rounded-2xl border text-left text-sm transition-all duration-200 flex items-center justify-between min-h-[56px] ${cardStyle}`}
                  >
                    <span className="font-bold">{item.text}</span>
                    {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Right Column: Definitions */}
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block px-1">
                Plain English Meanings
              </span>
              {matchMeanings.map((item) => {
                const isMatched = matchedIds.has(item.idiomId);
                const isSelected = selectedMeaningItem?.id === item.id;
                const isError = wrongMatch?.meaningId === item.id;

                let cardStyle = 'bg-slate-900/90 border-white/10 text-slate-200 hover:border-amber-500/40';
                if (isMatched) {
                  cardStyle = 'bg-emerald-500/20 border-emerald-500/50 text-emerald-200 opacity-60';
                } else if (isError) {
                  cardStyle = 'bg-rose-500/20 border-rose-500 text-rose-200 animate-shake';
                } else if (isSelected) {
                  cardStyle = 'bg-amber-500/20 border-amber-500 text-amber-200 shadow-lg shadow-amber-500/20 font-bold';
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectMatchMeaning(item)}
                    disabled={isMatched}
                    className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all duration-200 flex items-center justify-between min-h-[56px] ${cardStyle}`}
                  >
                    <span className="leading-relaxed">{item.text}</span>
                    {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
