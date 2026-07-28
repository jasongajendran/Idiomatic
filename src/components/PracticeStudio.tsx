import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Gamepad2, 
  Trophy, 
  Flame, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Sparkles, 
  ArrowRight
} from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/quizData';

export const PracticeStudio: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    setShowExplanation(true);

    const isCorrect = currentQuestion.options[idx].isCorrect;
    if (isCorrect) {
      setScore((prev) => prev + 100 + streak * 20);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowExplanation(false);

    if (currentIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setStreak(0);
    setShowExplanation(false);
    setIsCompleted(false);
  };

  const getRank = (finalScore: number) => {
    if (finalScore >= 350) return { name: 'Principal Tech Whisperer', badge: '👑' };
    if (finalScore >= 200) return { name: 'Senior Architect Vernacular Lead', badge: '⚡' };
    return { name: 'Junior Jargon Practitioner', badge: '🚀' };
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header Banner - Artistic Flair with Vibrant Colors & Organic Flourishes */}
      <div className="relative rounded-3xl bg-gradient-to-br from-rose-950/80 via-slate-900 to-indigo-950/80 border border-pink-500/30 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl overflow-hidden">
        {/* Artistic ambient color blobs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 shadow-inner">
              <Gamepad2 className="w-4 h-4 text-rose-400" />
              <span>ARTISTIC FLAIR — PRACTICE STUDIO</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Interactive Scenario <br />
              <span className="bg-gradient-to-r from-pink-400 via-rose-300 to-amber-300 bg-clip-text text-transparent">
                Challenge & Flashcard Studio
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl font-sans">
              Decipher corporate jargon, code review debates, and sprint trade-offs under real scenario pressure with expressive feedback.
            </p>
          </div>

          {/* Live Scorecard Metrics */}
          <div className="flex items-center gap-4 bg-slate-950/80 p-3.5 rounded-2xl border border-white/10 backdrop-blur-md shrink-0 shadow-xl">
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-300">
              <Flame className="w-5 h-5 fill-amber-400 text-amber-400 animate-bounce" />
              <div className="text-left font-mono">
                <span className="text-[10px] block text-amber-200/80 font-bold">STREAK</span>
                <span className="text-base font-black">{streak}x</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300">
              <Trophy className="w-5 h-5 text-rose-400" />
              <div className="text-left font-mono">
                <span className="text-[10px] block text-rose-200/80 font-bold">SCORE</span>
                <span className="text-base font-black">{score} pts</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Quiz Area */}
      {!isCompleted ? (
        <div className="max-w-3xl mx-auto rounded-3xl bg-slate-950/90 border border-pink-500/20 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          
          {/* Question Header & Progress Bar */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-400">
              <span>CHALLENGE {currentIndex + 1} OF {QUIZ_QUESTIONS.length}</span>
              <span className="text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-lg border border-rose-500/20">
                {currentQuestion.speakerRole} Scenario
              </span>
            </div>

            <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden p-0.5 border border-white/10">
              <div
                className="h-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 rounded-full transition-all duration-300 shadow-md"
                style={{ width: `${((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Scenario Context Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950/80 border border-white/10 space-y-2 shadow-inner">
            <span className="text-[11px] font-mono text-pink-400 font-black block uppercase tracking-wider">
              WORKPLACE SCENARIO
            </span>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
              "{currentQuestion.scenarioText}"
            </p>
          </div>

          {/* Question Text */}
          <h3 className="text-lg sm:text-xl font-extrabold text-white">
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
                  onClick={() => handleSelectOption(idx)}
                  disabled={selectedOption !== null}
                  className={`w-full p-4 sm:p-5 rounded-2xl border text-left text-xs sm:text-sm transition-all duration-200 flex items-center justify-between gap-3 ${btnStyle}`}
                >
                  <span className="font-medium">{option.text}</span>
                  {selectedOption !== null && (
                    <span>
                      {option.isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : isSelected ? (
                        <XCircle className="w-5 h-5 text-rose-400" />
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
              className="p-5 rounded-2xl bg-slate-900/90 border border-pink-500/30 space-y-3 shadow-xl"
            >
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-400">
                <Sparkles className="w-4 h-4 text-rose-400" />
                <span>EXPLANATION & SYSTEM LOGIC</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                {currentQuestion.options[selectedOption].explanation}
              </p>

              <div className="p-3.5 rounded-xl bg-slate-950 font-mono text-xs text-cyan-300 border border-cyan-500/20 overflow-x-auto shadow-inner">
                <pre>{currentQuestion.codeAnalogySnippet}</pre>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNext}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 text-white font-bold text-xs flex items-center gap-2 hover:opacity-95 transition-all shadow-xl shadow-pink-500/25"
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
              CHALLENGE COMPLETE
            </span>
            <h3 className="text-3xl font-black text-white">
              {getRank(score).name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              You scored <span className="text-amber-300 font-black font-mono">{score} points</span> across all scenario challenges.
            </p>
          </div>

          <button
            onClick={handleRestart}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 mx-auto hover:opacity-95 transition-all shadow-xl shadow-pink-500/25"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Play Again</span>
          </button>
        </motion.div>
      )}
    </div>
  );
};
