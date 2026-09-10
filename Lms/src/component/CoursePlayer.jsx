import React, { useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import {
  Play,
  CheckCircle2,
  Circle,
  BookOpen,
  FileText,
  MessageSquare,
  Award,
  ChevronLeft,
  ChevronRight,
  Share2,
  Save,
  Check,
  Sparkles,
  Lock
} from "lucide-react";
import CertificatesModal from "./CertificatesModal";

export default function CoursePlayer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    courses,
    toggleLesson,
    notes,
    saveLessonNote,
    activeCertificate,
    setActiveCertificate
  } = useAuth();

  const course = useMemo(() => {
    return courses.find((c) => c.id === id || c.slug === id) || courses[0];
  }, [courses, id]);

  // Find first non-completed or first lesson
  const allLessons = useMemo(() => {
    if (!course?.modules) return [];
    return course.modules.flatMap((m) =>
      m.lessons.map((l) => ({ ...l, moduleTitle: m.title }))
    );
  }, [course]);

  const [activeLessonId, setActiveLessonId] = useState(() => {
    const uncompleted = allLessons.find((l) => !l.completed);
    return uncompleted ? uncompleted.id : allLessons[0]?.id || "l-101";
  });

  const activeLesson = useMemo(() => {
    return allLessons.find((l) => l.id === activeLessonId) || allLessons[0];
  }, [allLessons, activeLessonId]);

  const [activeTab, setActiveTab] = useState("overview"); // "overview" | "notes" | "resources"
  const [currentNote, setCurrentNote] = useState(notes[activeLessonId] || "");
  const [savedNoteNotice, setSavedNoteNotice] = useState(false);

  const handleSaveNote = () => {
    saveLessonNote(activeLessonId, currentNote);
    setSavedNoteNotice(true);
    setTimeout(() => setSavedNoteNotice(false), 2000);
  };

  const currentIndex = allLessons.findIndex((l) => l.id === activeLessonId);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  if (!course) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold">Course not found</h2>
        <Link to="/courses" className="text-blue-500 underline mt-2 block">
          Back to Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6 animate-fade-in">
      
      {/* Top Breadcrumb Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center space-x-3">
          <Link
            to="/courses"
            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              {course.category}
            </span>
            <h1 className="text-lg sm:text-2xl font-bold text-slate-800 dark:text-slate-100 font-heading line-clamp-1">
              {course.title}
            </h1>
          </div>
        </div>

        {/* Progress & Certificate trigger */}
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <span className="text-xs text-slate-500 dark:text-slate-400">Course Progress</span>
            <div className="flex items-center space-x-2">
              <div className="w-28 sm:w-36 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              <span className="text-xs font-bold font-mono text-emerald-600">{course.progress}%</span>
            </div>
          </div>

          {course.progress === 100 && (
            <button
              onClick={() => {
                setActiveCertificate({
                  id: "cert-" + course.id,
                  courseId: course.id,
                  courseTitle: course.title,
                  recipientName: "Bill Evans",
                  recipientEmail: "bill@example.com",
                  instructorName: course.instructor?.name || "Adrian Demian",
                  issueDate: "February 2026",
                  grade: "100% Mastery"
                });
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-bold shadow-sm transition"
            >
              <Award className="w-4 h-4" />
              <span>View Certificate</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Classroom Layout (Video Player on left, Curriculum on right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Video & Content Player Area */}
        <div className="lg:col-span-8 space-y-5">
          
          {/* Video Container (16:9 aspect) */}
          <div className="bg-black rounded-2xl overflow-hidden shadow-2xl aspect-video border border-slate-800 relative group">
            {activeLesson?.videoUrl ? (
              <iframe
                src={activeLesson.videoUrl}
                title={activeLesson.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-6 text-center">
                <Play className="w-16 h-16 text-blue-500 mb-2 opacity-80" />
                <p className="text-sm font-semibold text-white">{activeLesson?.title}</p>
                <p className="text-xs text-slate-500 mt-1">Interactive Lesson Lecture</p>
              </div>
            )}
          </div>

          {/* Lesson Action Bar */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200/80 dark:border-slate-700/80 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-slate-400">
                {activeLesson?.moduleTitle}
              </span>
              <h2 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 font-heading">
                {activeLesson?.title}
              </h2>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => toggleLesson(course.id, activeLesson.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm ${
                  activeLesson?.completed
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {activeLesson?.completed ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Completed</span>
                  </>
                ) : (
                  <>
                    <Circle className="w-4 h-4" />
                    <span>Mark Completed</span>
                  </>
                )}
              </button>

              {nextLesson && (
                <button
                  onClick={() => setActiveLessonId(nextLesson.id)}
                  className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                  title="Next Lesson"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Lesson Tabs: Overview / Notes / Discussion */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-700/80 p-5 shadow-subtle space-y-4">
            
            {/* Tabs Header */}
            <div className="flex items-center space-x-4 border-b border-slate-100 dark:border-slate-700 pb-2">
              <button
                onClick={() => setActiveTab("overview")}
                className={`text-xs font-bold pb-2 border-b-2 transition ${
                  activeTab === "overview"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                Lesson Overview & Concepts
              </button>
              <button
                onClick={() => setActiveTab("notes")}
                className={`text-xs font-bold pb-2 border-b-2 transition ${
                  activeTab === "notes"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                Personal Notes
              </button>
            </div>

            {/* Tab: Overview */}
            {activeTab === "overview" && (
              <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>{activeLesson?.content}</p>

                <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    💡 Key Learning Objectives
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 dark:text-slate-300">
                    <li>Understand architectural best practices and modern syntax standards.</li>
                    <li>Write clean, scalable, accessible code adhering to industry patterns.</li>
                    <li>Test edge cases and integrate with existing component hierarchies.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Tab: Notes */}
            {activeTab === "notes" && (
              <div className="space-y-3">
                <p className="text-xs text-slate-500">
                  Notes are automatically saved for your review and exam preparation.
                </p>
                <textarea
                  rows={5}
                  value={currentNote}
                  onChange={(e) => setCurrentNote(e.target.value)}
                  placeholder="Type your notes for this lesson here..."
                  className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-blue-500 text-slate-800 dark:text-slate-200"
                ></textarea>
                <div className="flex items-center justify-between">
                  {savedNoteNotice ? (
                    <span className="text-xs text-emerald-600 font-semibold flex items-center space-x-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>Note saved!</span>
                    </span>
                  ) : (
                    <span></span>
                  )}
                  <button
                    onClick={handleSaveNote}
                    className="flex items-center space-x-1.5 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Note</span>
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Right Curriculum Syllabus Drawer */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-700/80 p-4 shadow-subtle sticky top-20">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100 dark:border-slate-700">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 font-heading">
                Course Curriculum
              </h3>
              <span className="text-xs font-medium text-slate-400">
                {allLessons.length} Lessons
              </span>
            </div>

            <div className="space-y-4 max-h-[calc(100vh-240px)] overflow-y-auto pr-1">
              {course.modules?.map((mod, modIdx) => (
                <div key={mod.id || modIdx} className="space-y-1.5">
                  <h4 className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                    {mod.title}
                  </h4>
                  <div className="space-y-1">
                    {mod.lessons.map((l) => {
                      const isCurrent = l.id === activeLessonId;
                      return (
                        <div
                          key={l.id}
                          onClick={() => {
                            setActiveLessonId(l.id);
                            setCurrentNote(notes[l.id] || "");
                          }}
                          className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer text-xs transition ${
                            isCurrent
                              ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold border border-blue-200 dark:border-blue-700"
                              : "hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-300"
                          }`}
                        >
                          <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                            {l.completed ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                            ) : isCurrent ? (
                              <Play className="w-4 h-4 text-blue-600 fill-current flex-shrink-0" />
                            ) : (
                              <Circle className="w-4 h-4 text-slate-300 flex-shrink-0" />
                            )}
                            <span className="truncate">{l.title}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 flex-shrink-0">
                            {l.duration}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Link to Quiz */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700">
              <Link
                to="/quizzes"
                className="w-full py-2 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 hover:bg-amber-100 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition border border-amber-200 dark:border-amber-800"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Test Knowledge in Quiz Engine</span>
              </Link>
            </div>

          </div>
        </div>

      </div>

      {/* Verified Certificate Modal */}
      {activeCertificate && (
        <CertificatesModal
          certificate={activeCertificate}
          onClose={() => setActiveCertificate(null)}
        />
      )}

    </div>
  );
}
