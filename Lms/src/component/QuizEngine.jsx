import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import {
  GraduationCap,
  Clock,
  CheckCircle2,
  XCircle,
  Award,
  RotateCcw,
  ChevronRight,
  AlertCircle,
  Sparkles
} from "lucide-react";

export default function QuizEngine() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { quizzes, submitQuizAnswers } = useAuth();

  // Selected quiz
  const [selectedQuizId, setSelectedQuizId] = useState(id || quizzes[0]?.id || "quiz-1");
  const currentQuiz = quizzes.find((q) => q.id === selectedQuizId) || quizzes[0];

  // Test taking state
  const [inQuizMode, setInQuizMode] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const startQuiz = (quizId) => {
    setSelectedQuizId(quizId);
    setAnswers({});
    setQuizResult(null);
    setCurrentQIndex(0);
    setInQuizMode(true);
  };

  const handleSelectOption = (qId, optionIdx) => {
    setAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const handleSubmitQuiz = async () => {
    setSubmitting(true);
    const res = await submitQuizAnswers(currentQuiz.id, answers);
    setQuizResult(res);
    setSubmitting(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 font-heading">
            Interactive Quiz Engine
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Test your comprehension, evaluate performance grades, and qualify for course certificates.
          </p>
        </div>
      </div>

      {!inQuizMode ? (
        /* Quizzes List & Overview Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-6 shadow-subtle hover:shadow-card transition flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <span className="text-xs font-bold uppercase bg-blue-50 text-blue-600 px-2.5 py-1 rounded-md">
                    {quiz.courseTitle}
                  </span>
                  <div className="text-right">
                    <span className={`text-xl font-extrabold ${quiz.gradeColor || "text-emerald-600"}`}>
                      {quiz.lastScore}
                    </span>
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">
                      {quiz.gradeLabel}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 font-heading">
                    {quiz.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {quiz.subtitle || "Assess core concepts & syntax proficiency."}
                  </p>
                </div>

                <div className="flex items-center space-x-4 text-xs text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-700/60">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{quiz.timeLimitMinutes || 10} min</span>
                  </span>
                  <span>•</span>
                  <span>{quiz.questions?.length || 5} Questions</span>
                </div>
              </div>

              <div className="mt-6 pt-2">
                <button
                  onClick={() => startQuiz(quiz.id)}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition flex items-center justify-center space-x-2"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Start Quiz Assessment</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Interactive Quiz Taking Card */
        <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-6 sm:p-8 shadow-xl space-y-6">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase">
                {currentQuiz?.courseTitle}
              </span>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 font-heading">
                {currentQuiz?.title}
              </h2>
            </div>
            <button
              onClick={() => setInQuizMode(false)}
              className="text-xs text-slate-400 hover:text-slate-600 font-semibold"
            >
              Exit Quiz
            </button>
          </div>

          {!quizResult ? (
            /* Questions in Progress */
            <div className="space-y-6">
              
              {/* Question Progress bar */}
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>
                  Question {currentQIndex + 1} of {currentQuiz?.questions?.length}
                </span>
                <span>
                  Answered: {Object.keys(answers).length} / {currentQuiz?.questions?.length}
                </span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentQIndex + 1) / (currentQuiz?.questions?.length || 1)) * 100}%`
                  }}
                ></div>
              </div>

              {/* Current Question */}
              {currentQuiz?.questions?.[currentQIndex] && (
                <div className="space-y-4">
                  <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100">
                    {currentQuiz.questions[currentQIndex].question}
                  </h3>

                  <div className="space-y-2.5">
                    {currentQuiz.questions[currentQIndex].options.map((opt, idx) => {
                      const qId = currentQuiz.questions[currentQIndex].id;
                      const isSelected = answers[qId] === idx;
                      return (
                        <div
                          key={idx}
                          onClick={() => handleSelectOption(qId, idx)}
                          className={`p-3.5 rounded-xl border text-xs sm:text-sm cursor-pointer transition flex items-center space-x-3 ${
                            isSelected
                              ? "bg-blue-50 dark:bg-blue-900/30 border-blue-500 text-blue-700 dark:text-blue-300 font-semibold"
                              : "hover:bg-slate-50 dark:hover:bg-slate-700/50 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                          }`}
                        >
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-xs border font-bold ${
                              isSelected
                                ? "bg-blue-600 text-white border-blue-600"
                                : "border-slate-300 text-slate-500"
                            }`}
                          >
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span>{opt}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Bottom Nav: Prev / Next / Submit */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                <button
                  disabled={currentQIndex === 0}
                  onClick={() => setCurrentQIndex((i) => Math.max(0, i - 1))}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-40"
                >
                  Previous
                </button>

                {currentQIndex < (currentQuiz?.questions?.length || 1) - 1 ? (
                  <button
                    onClick={() => setCurrentQIndex((i) => i + 1)}
                    className="px-5 py-2 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                  >
                    Next Question
                  </button>
                ) : (
                  <button
                    disabled={submitting}
                    onClick={handleSubmitQuiz}
                    className="px-6 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm flex items-center space-x-1.5"
                  >
                    {submitting ? <span>Scoring...</span> : <span>Submit Quiz Assessment</span>}
                  </button>
                )}
              </div>

            </div>
          ) : (
            /* Quiz Results Breakdown */
            <div className="space-y-6 animate-fade-in">
              <div className="text-center p-6 bg-slate-50 dark:bg-slate-700/40 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Assessment Result
                </span>
                <h3 className={`text-4xl font-extrabold font-heading ${
                  quizResult.scoreOutOfTen >= 8 ? "text-green-600" : quizResult.scoreOutOfTen >= 5 ? "text-emerald-600" : "text-rose-600"
                }`}>
                  {quizResult.scoreOutOfTen} / 10
                </h3>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Performance: <span className="underline">{quizResult.gradeLabel}</span> ({quizResult.correctCount} / {quizResult.totalQuestions} correct)
                </p>
              </div>

              {/* Review answers list */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Question Breakdown & Explanations
                </h4>
                {quizResult.review?.map((rev, idx) => (
                  <div
                    key={rev.questionId}
                    className={`p-4 rounded-xl border text-xs space-y-2 ${
                      rev.isCorrect
                        ? "bg-emerald-50/50 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-800"
                        : "bg-rose-50/50 border-rose-200 dark:bg-rose-950/20 dark:border-rose-800"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-bold text-slate-800 dark:text-slate-100">
                        {idx + 1}. {rev.question}
                      </p>
                      {rev.isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                      )}
                    </div>

                    <p className="text-[11px] text-slate-500">
                      💡 <strong>Explanation:</strong> {rev.explanation}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                <button
                  onClick={() => startQuiz(currentQuiz.id)}
                  className="flex items-center space-x-1.5 px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Quiz</span>
                </button>
                <button
                  onClick={() => setInQuizMode(false)}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm"
                >
                  Back to Quizzes List
                </button>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}
