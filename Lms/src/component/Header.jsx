import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import {
  Bell,
  MessageSquare,
  Search,
  ChevronDown,
  Menu,
  X,
  User,
  LogOut,
  Award,
  Sparkles,
  BookOpen,
  GraduationCap
} from "lucide-react";

export default function Header({ toggleSidebar }) {
  const {
    user,
    role,
    switchRole,
    logoutUser,
    notifications,
    unreadCount,
    markNotificationsAsRead,
    messages
  } = useAuth();
  
  const navigate = useNavigate();

  // Dropdown states
  const [forumDropdown, setForumDropdown] = useState(false);
  const [coursesDropdown, setCoursesDropdown] = useState(false);
  const [studentDropdown, setStudentDropdown] = useState(false);
  const [instructorDropdown, setInstructorDropdown] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [messagesOpen, setMessagesOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const closeAllDropdowns = () => {
    setForumDropdown(false);
    setCoursesDropdown(false);
    setStudentDropdown(false);
    setInstructorDropdown(false);
    setNotificationsOpen(false);
    setMessagesOpen(false);
    setProfileOpen(false);
  };

  return (
    <header className="sticky top-0 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
      <div className="flex items-center justify-between px-4 lg:px-8 py-2.5">
        
        {/* Left Section: Mobile Toggle & Navigation Dropdowns */}
        <div className="flex items-center space-x-2 sm:space-x-6">
          {/* Mobile hamburger */}
          <button
            onClick={toggleSidebar}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Desktop Top Navbar Links matching choose-student-app.png */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            
            {/* Forum Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  closeAllDropdowns();
                  setForumDropdown(!forumDropdown);
                }}
                className="flex items-center space-x-1 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                <span>Forum</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
              {forumDropdown && (
                <div
                  className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-2 z-30 animate-fade-in text-xs font-normal"
                  onMouseLeave={() => setForumDropdown(false)}
                >
                  <Link
                    to="/forum"
                    onClick={closeAllDropdowns}
                    className="block px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-200"
                  >
                    💬 All Discussions
                  </Link>
                  <Link
                    to="/forum?topic=Angular.JS"
                    onClick={closeAllDropdowns}
                    className="block px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-200"
                  >
                    ⚡ Angular.JS Help
                  </Link>
                  <Link
                    to="/forum?topic=HTML"
                    onClick={closeAllDropdowns}
                    className="block px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-200"
                  >
                    🌐 HTML & CSS Q&A
                  </Link>
                </div>
              )}
            </div>

            {/* Courses Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  closeAllDropdowns();
                  setCoursesDropdown(!coursesDropdown);
                }}
                className="flex items-center space-x-1 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                <span>Courses</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
              {coursesDropdown && (
                <div
                  className="absolute top-full left-0 mt-2 w-52 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-2 z-30 animate-fade-in text-xs font-normal"
                  onMouseLeave={() => setCoursesDropdown(false)}
                >
                  <Link
                    to="/courses"
                    onClick={closeAllDropdowns}
                    className="block px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-200"
                  >
                    📚 All Courses Catalog
                  </Link>
                  <Link
                    to="/courses?category=Web%20Development"
                    onClick={closeAllDropdowns}
                    className="block px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-200"
                  >
                    💻 Web Development
                  </Link>
                  <Link
                    to="/courses?category=Design"
                    onClick={closeAllDropdowns}
                    className="block px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-200"
                  >
                    🎨 UI/UX & CSS Design
                  </Link>
                  <Link
                    to="/courses?category=Full%20Stack"
                    onClick={closeAllDropdowns}
                    className="block px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-200"
                  >
                    🚀 Full-Stack React & Node
                  </Link>
                </div>
              )}
            </div>

            {/* Student Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  closeAllDropdowns();
                  setStudentDropdown(!studentDropdown);
                }}
                className={`flex items-center space-x-1 font-semibold transition ${
                  role === "student" ? "text-blue-600 dark:text-blue-400" : "hover:text-blue-600"
                }`}
              >
                <span>Student</span>
                <ChevronDown className="w-3.5 h-3.5 text-blue-400" />
              </button>
              {studentDropdown && (
                <div
                  className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-2 z-30 animate-fade-in text-xs font-normal"
                  onMouseLeave={() => setStudentDropdown(false)}
                >
                  <Link
                    to="/userhome"
                    onClick={closeAllDropdowns}
                    className="block px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-200"
                  >
                    📊 Overview Dashboard
                  </Link>
                  <Link
                    to="/quizzes"
                    onClick={closeAllDropdowns}
                    className="block px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-200"
                  >
                    📝 My Quizzes & Scores
                  </Link>
                  <Link
                    to="/certificates"
                    onClick={closeAllDropdowns}
                    className="block px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-200"
                  >
                    🏆 Certificates
                  </Link>
                </div>
              )}
            </div>

            {/* Instructor Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  closeAllDropdowns();
                  setInstructorDropdown(!instructorDropdown);
                }}
                className={`flex items-center space-x-1 transition ${
                  role === "instructor" ? "text-purple-600 font-semibold" : "hover:text-purple-600"
                }`}
              >
                <span>Instructor</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
              {instructorDropdown && (
                <div
                  className="absolute top-full left-0 mt-2 w-52 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-2 z-30 animate-fade-in text-xs font-normal"
                  onMouseLeave={() => setInstructorDropdown(false)}
                >
                  <button
                    onClick={() => {
                      switchRole("instructor");
                      navigate("/instructor");
                      closeAllDropdowns();
                    }}
                    className="w-full text-left block px-4 py-2 hover:bg-purple-50 dark:hover:bg-slate-700 text-purple-700 dark:text-purple-300 font-medium"
                  >
                    ✨ Open Instructor Studio
                  </button>
                  <Link
                    to="/instructor"
                    onClick={closeAllDropdowns}
                    className="block px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200"
                  >
                    ➕ Create New Course
                  </Link>
                  <Link
                    to="/instructor"
                    onClick={closeAllDropdowns}
                    className="block px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200"
                  >
                    📈 Students & Analytics
                  </Link>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Right Section: Search, Chat, Notifications & Profile Avatar */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden sm:block relative">
            <input
              type="text"
              placeholder="Search courses, lessons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-44 md:w-60 pl-8 pr-3 py-1.5 text-xs bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-full border border-transparent focus:border-blue-400 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition shadow-inner"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </form>

          {/* Chat / Messages Button with popover */}
          <div className="relative">
            <button
              onClick={() => {
                closeAllDropdowns();
                setMessagesOpen(!messagesOpen);
              }}
              className="p-2 text-slate-500 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full relative transition"
              title="Messages"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-pink-500 rounded-full"></span>
            </button>

            {messagesOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 p-4 z-30 animate-fade-in"
                onMouseLeave={() => setMessagesOpen(false)}
              >
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100 dark:border-slate-700">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Direct Messages
                  </h4>
                  <Link to="/messages" onClick={closeAllDropdowns} className="text-xs text-blue-600 font-semibold hover:underline">
                    View All
                  </Link>
                </div>
                <div className="space-y-3">
                  {messages.map((m) => (
                    <div key={m.id} className="flex items-start space-x-3 p-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl transition">
                      <img src={m.avatar} alt={m.sender} className="w-8 h-8 rounded-full object-cover" />
                      <div className="flex-1 min-w-0 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-800 dark:text-slate-100">{m.sender}</span>
                          <span className="text-[10px] text-slate-400">{m.time}</span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 truncate mt-0.5">{m.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Notifications Bell with badge & drawer */}
          <div className="relative">
            <button
              onClick={() => {
                closeAllDropdowns();
                setNotificationsOpen(!notificationsOpen);
                if (unreadCount > 0) markNotificationsAsRead();
              }}
              className="p-2 text-slate-500 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full relative transition"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-blue-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {unreadCount}
                </span>
              )}
            </button>

            {notificationsOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 p-4 z-30 animate-fade-in"
                onMouseLeave={() => setNotificationsOpen(false)}
              >
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100 dark:border-slate-700">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Notifications
                  </h4>
                  <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-semibold">
                    {notifications.length} Total
                  </span>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-2.5 rounded-xl text-xs transition ${
                        n.read
                          ? "bg-slate-50/50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-300"
                          : "bg-blue-50 dark:bg-blue-900/20 text-slate-800 dark:text-slate-100 font-medium"
                      }`}
                    >
                      <p className="leading-snug">{n.text}</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar with name & dropdown matching choose-student-app.png ("Bill -") */}
          <div className="relative">
            <button
              onClick={() => {
                closeAllDropdowns();
                setProfileOpen(!profileOpen);
              }}
              className="flex items-center space-x-2 pl-2 py-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <img
                src={
                  user?.avatar ||
                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
                }
                alt={user?.name || "Bill"}
                className="w-7 h-7 rounded-full object-cover border border-slate-300"
              />
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 hidden sm:inline-block">
                {user?.name ? user.name.split(" ")[0] : "Bill"}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {profileOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 py-2 z-30 animate-fade-in text-xs"
                onMouseLeave={() => setProfileOpen(false)}
              >
                <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700">
                  <p className="font-bold text-slate-800 dark:text-slate-100">{user?.name || "Bill Evans"}</p>
                  <p className="text-[11px] text-slate-400">{user?.email || "bill@example.com"}</p>
                  <div className="mt-1.5 flex items-center space-x-1.5">
                    <span className="text-[10px] font-semibold uppercase bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-md">
                      {role}
                    </span>
                  </div>
                </div>

                <Link
                  to="/account"
                  onClick={closeAllDropdowns}
                  className="flex items-center space-x-2 px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-200"
                >
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>My Profile & Settings</span>
                </Link>

                <Link
                  to="/certificates"
                  onClick={closeAllDropdowns}
                  className="flex items-center space-x-2 px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-200"
                >
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  <span>Earned Certificates</span>
                </Link>

                <button
                  onClick={() => {
                    switchRole(role === "student" ? "instructor" : "student");
                    closeAllDropdowns();
                  }}
                  className="w-full flex items-center space-x-2 px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-purple-600 dark:text-purple-400 text-left font-medium"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Switch to {role === "student" ? "Instructor Mode" : "Student Mode"}</span>
                </button>

                <div className="border-t border-slate-100 dark:border-slate-700 my-1"></div>

                <button
                  onClick={() => {
                    logoutUser();
                    navigate("/login");
                  }}
                  className="w-full flex items-center space-x-2 px-4 py-2 hover:bg-rose-50 text-rose-600 text-left font-medium"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
}