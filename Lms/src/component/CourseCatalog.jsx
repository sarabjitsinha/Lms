import React, { useState, useMemo } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import {
  Search,
  Filter,
  BookOpen,
  Clock,
  Star,
  CheckCircle2,
  PlayCircle,
  Sparkles,
  Award,
  Layers,
  BarChart
} from "lucide-react";

export default function CourseCatalog() {
  const { courses } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const activeCategory = searchParams.get("category") || "All";
  const activeSearch = searchParams.get("search") || "";
  const [selectedLevel, setSelectedLevel] = useState("All");

  const categories = ["All", "Web Development", "Full Stack", "Design & CSS", "AI & ML", "Cloud"];

  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      const matchCategory =
        activeCategory === "All" ||
        c.category.toLowerCase().includes(activeCategory.toLowerCase());
      const matchLevel =
        selectedLevel === "All" ||
        c.level.toLowerCase() === selectedLevel.toLowerCase();
      const matchSearch =
        !activeSearch ||
        c.title.toLowerCase().includes(activeSearch.toLowerCase()) ||
        c.description?.toLowerCase().includes(activeSearch.toLowerCase());
      return matchCategory && matchLevel && matchSearch;
    });
  }, [courses, activeCategory, selectedLevel, activeSearch]);

  const handleCategorySelect = (cat) => {
    const nextParams = new URLSearchParams(searchParams);
    if (cat === "All") {
      nextParams.delete("category");
    } else {
      nextParams.set("category", cat);
    }
    setSearchParams(nextParams);
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    const nextParams = new URLSearchParams(searchParams);
    if (val) {
      nextParams.set("search", val);
    } else {
      nextParams.delete("search");
    }
    setSearchParams(nextParams);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-2xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Interactive Curriculum 2026</span>
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-heading tracking-tight">
            Explore All Courses & Career Tracks
          </h1>
          <p className="text-sm sm:text-base text-blue-100 max-w-xl leading-relaxed">
            Gain verified skills with industry-designed curriculums, interactive video labs, graded quizzes, and accredited certificates.
          </p>
        </div>
      </div>

      {/* Filters & Search Control Bar */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200/80 dark:border-slate-700/80 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                activeCategory === cat
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Level Select & Search Input */}
        <div className="flex items-center space-x-3">
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 focus:outline-none"
          >
            <option value="All">All Difficulty Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          <div className="relative flex-1 sm:w-60">
            <input
              type="text"
              placeholder="Search catalog..."
              value={activeSearch}
              onChange={handleSearchChange}
              className="w-full pl-8 pr-3 py-2 text-xs bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg border border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-none transition"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
        </div>

      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 overflow-hidden shadow-subtle hover:shadow-card transition flex flex-col justify-between"
          >
            <div>
              {/* Thumbnail Container */}
              <div className="relative aspect-video overflow-hidden bg-slate-100">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white px-2.5 py-1 rounded-md text-[11px] font-semibold">
                  {course.category}
                </div>
                <div className="absolute top-3 right-3 bg-amber-400 text-slate-900 px-2 py-0.5 rounded text-[11px] font-bold flex items-center space-x-1 shadow-sm">
                  <Star className="w-3 h-3 fill-current" />
                  <span>{course.rating}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3">
                <div className="flex items-center space-x-2 text-[11px] text-slate-400 font-medium">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{course.duration}</span>
                  </span>
                  <span>•</span>
                  <span>{course.level}</span>
                  <span>•</span>
                  <span>{course.lessonsCount || 8} Lessons</span>
                </div>

                <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition font-heading line-clamp-1">
                  {course.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {course.description}
                </p>

                {/* Instructor Info */}
                <div className="flex items-center space-x-2.5 pt-2 border-t border-slate-100 dark:border-slate-700/60">
                  <img
                    src={course.instructor?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                    alt={course.instructor?.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                    {course.instructor?.name || "Instructor"}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-5 pt-0">
              {course.progress > 0 ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-medium text-slate-500">
                    <span>Progress</span>
                    <span className="font-bold text-blue-600">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <button
                    onClick={() => navigate(`/courses/${course.id}`)}
                    className="w-full mt-2 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-sm transition flex items-center justify-center space-x-1.5"
                  >
                    <PlayCircle className="w-4 h-4" />
                    <span>Continue Learning</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => navigate(`/courses/${course.id}`)}
                  className="w-full py-2 bg-slate-900 dark:bg-slate-700 hover:bg-blue-600 text-white rounded-xl text-xs font-semibold shadow-sm transition flex items-center justify-center space-x-1.5"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Start Course</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-700 dark:text-slate-200 font-heading">
            No courses match your filter
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Try adjusting your search query or selecting a different category.
          </p>
        </div>
      )}

    </div>
  );
}
