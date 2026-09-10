import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import {
  Sparkles,
  Plus,
  BookOpen,
  Users,
  Award,
  Star,
  Layers,
  CheckCircle2,
  Trash2,
  Play,
  ArrowRight
} from "lucide-react";

export default function InstructorStudio() {
  const { user, courses, createNewCourse, switchRole, role } = useAuth();
  const navigate = useNavigate();

  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Web Development");
  const [level, setLevel] = useState("Intermediate");
  const [duration, setDuration] = useState("6 hours");
  const [thumbnail, setThumbnail] = useState("https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80");
  const [description, setDescription] = useState("");

  const [modules, setModules] = useState([
    {
      id: "mod-new-1",
      title: "Module 1: Foundations & Architecture",
      lessons: [
        {
          id: "l-new-1",
          title: "Introduction & Setup",
          duration: "15 min",
          videoUrl: "https://www.youtube-nocookie.com/embed/pQN-pnXPaVg",
          content: "Comprehensive setup guide and foundational architecture walkthrough.",
          completed: false
        }
      ]
    }
  ]);

  const addModule = () => {
    setModules((prev) => [
      ...prev,
      {
        id: "mod-new-" + (prev.length + 1),
        title: `Module ${prev.length + 1}: Advanced Concepts`,
        lessons: [
          {
            id: `l-new-${Date.now()}`,
            title: "Core Mechanics & Best Practices",
            duration: "20 min",
            videoUrl: "https://www.youtube-nocookie.com/embed/pQN-pnXPaVg",
            content: "Practical examples and deep-dive explanations.",
            completed: false
          }
        ]
      }
    ]);
  };

  const addLesson = (modIndex) => {
    const updated = [...modules];
    updated[modIndex].lessons.push({
      id: `l-new-${Date.now()}`,
      title: "New Practical Lesson",
      duration: "18 min",
      videoUrl: "https://www.youtube-nocookie.com/embed/pQN-pnXPaVg",
      content: "Interactive lesson content and coding tasks.",
      completed: false
    });
    setModules(updated);
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newCourse = await createNewCourse({
      title: title.trim(),
      category,
      level,
      duration,
      thumbnail,
      description: description || "Detailed curriculum covering modern industry practices.",
      modules,
      instructorName: user?.name || "Adrian Demian"
    });

    if (newCourse) {
      setIsCreating(false);
      navigate(`/courses/${newCourse.id}`);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 rounded-2xl p-6 sm:p-10 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Instructor Studio & Curriculum Management</span>
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-heading tracking-tight">
            Author Courses & Empower Students
          </h1>
          <p className="text-sm text-purple-100 leading-relaxed">
            Design interactive video syllabi, structure modular curriculum, manage enrollments, and track student outcomes.
          </p>
        </div>

        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center space-x-2 px-5 py-3 bg-white text-purple-700 hover:bg-purple-50 rounded-xl font-bold text-xs shadow-lg transition flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Course</span>
        </button>
      </div>

      {/* Analytics KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-subtle space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Active Courses</span>
            <BookOpen className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{courses.length}</p>
          <span className="text-[11px] text-emerald-600 font-semibold">+1 this month</span>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-subtle space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Enrolled Students</span>
            <Users className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">1,420</p>
          <span className="text-[11px] text-emerald-600 font-semibold">+18% growth</span>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-subtle space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Avg Student Rating</span>
            <Star className="w-4 h-4 text-amber-500 fill-current" />
          </div>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">4.88 / 5</p>
          <span className="text-[11px] text-slate-400">685 reviews</span>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-subtle space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Certificates Awarded</span>
            <Award className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">894</p>
          <span className="text-[11px] text-emerald-600 font-semibold">92% completion rate</span>
        </div>
      </div>

      {/* Manage Published Courses Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-6 shadow-subtle space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 font-heading">
            Managed Curriculums
          </h3>
          <span className="text-xs text-slate-400">{courses.length} Published Courses</span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-700">
          {courses.map((c) => (
            <div
              key={c.id}
              className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={c.thumbnail}
                  alt={c.title}
                  className="w-16 h-10 object-cover rounded-lg flex-shrink-0"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">{c.title}</h4>
                  <p className="text-xs text-slate-400">
                    {c.category} • {c.level} • {c.modules?.length || 2} Modules
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Link
                  to={`/courses/${c.id}`}
                  className="px-3.5 py-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold transition"
                >
                  View Classroom
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Course Creator Modal */}
      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-700 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700 mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 font-heading">
                  Create New Course
                </h3>
                <p className="text-xs text-slate-500">
                  Fill in metadata and configure modules and lesson videos.
                </p>
              </div>
              <button
                onClick={() => setIsCreating(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Course Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Master Next.js & Server Actions"
                    className="w-full p-2.5 bg-slate-100 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600"
                    required
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2.5 bg-slate-100 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Full Stack">Full Stack</option>
                    <option value="Design & CSS">Design & CSS</option>
                    <option value="AI & ML">AI & ML</option>
                    <option value="Cloud">Cloud</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Difficulty Level
                  </label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full p-2.5 bg-slate-100 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Estimated Duration
                  </label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g. 8 hours"
                    className="w-full p-2.5 bg-slate-100 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Thumbnail Image URL
                </label>
                <input
                  type="text"
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Description & Syllabus Overview
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the skills and projects students will build..."
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600"
                ></textarea>
              </div>

              {/* Module Builder */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-700 dark:text-slate-200">
                    Curriculum Modules & Lessons
                  </h4>
                  <button
                    type="button"
                    onClick={addModule}
                    className="text-xs text-purple-600 font-bold hover:underline"
                  >
                    + Add Module
                  </button>
                </div>

                {modules.map((m, mIdx) => (
                  <div key={m.id || mIdx} className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                    <input
                      type="text"
                      value={m.title}
                      onChange={(e) => {
                        const updated = [...modules];
                        updated[mIdx].title = e.target.value;
                        setModules(updated);
                      }}
                      className="w-full font-bold p-2 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-600"
                    />

                    <div className="pl-4 space-y-2">
                      {m.lessons.map((l, lIdx) => (
                        <div key={l.id || lIdx} className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={l.title}
                            onChange={(e) => {
                              const updated = [...modules];
                              updated[mIdx].lessons[lIdx].title = e.target.value;
                              setModules(updated);
                            }}
                            placeholder="Lesson Title"
                            className="flex-1 p-1.5 bg-white dark:bg-slate-800 rounded border border-slate-200 text-xs"
                          />
                          <input
                            type="text"
                            value={l.duration}
                            onChange={(e) => {
                              const updated = [...modules];
                              updated[mIdx].lessons[lIdx].duration = e.target.value;
                              setModules(updated);
                            }}
                            placeholder="15 min"
                            className="w-20 p-1.5 bg-white dark:bg-slate-800 rounded border border-slate-200 text-xs"
                          />
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() => addLesson(mIdx)}
                        className="text-[11px] text-blue-500 font-semibold"
                      >
                        + Add Lesson
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 text-slate-600 font-semibold hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold shadow-md"
                >
                  Publish Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
