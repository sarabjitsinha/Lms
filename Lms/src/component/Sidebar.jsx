import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import {
  LayoutDashboard,
  BookOpen,
  MessageSquare,
  User,
  HelpCircle,
  Award,
  Mail,
  LogOut,
  ChevronDown,
  ChevronRight,
  Sparkles,
  BookMarked,
  Compass,
  GraduationCap
} from "lucide-react";

export default function Sidebar({ isOpen, setIsOpen }) {
  const { user, logoutUser, role, switchRole, certificates } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Submenu toggles
  const [coursesOpen, setCoursesOpen] = useState(true);
  const [forumOpen, setForumOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-[#23272d] text-slate-300 transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col justify-between ${
          isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Top Brand Banner matching choose-student-app.png */}
          <div className="bg-[#42a5f5] text-white px-6 py-4 flex items-center justify-between shadow-md">
            <Link to="/userhome" className="flex items-center space-x-2">
              <span className="text-2xl font-extrabold tracking-tight font-heading">
                Learning
              </span>
            </Link>
            <span className="text-[10px] uppercase font-bold tracking-widest bg-white/20 px-2 py-0.5 rounded">
              LMS
            </span>
          </div>

          {/* User Profile Card */}
          <div className="flex flex-col items-center py-6 px-4 border-b border-slate-700/60 bg-[#1e2227]">
            <div className="relative group cursor-pointer" onClick={() => navigate("/account")}>
              <img
                src={
                  user?.avatar ||
                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
                }
                alt={user?.name || "Student Avatar"}
                className="w-16 h-16 rounded-full object-cover border-2 border-slate-500 shadow-md group-hover:border-blue-400 transition"
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#1e2227] rounded-full"></span>
            </div>
            <h3 className="mt-3 font-semibold text-white text-base tracking-tight">
              {user?.name || "Student Name"}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-xs text-slate-400 capitalize">
                {role === "instructor" ? "👨‍🏫 Instructor" : "🎓 Student"}
              </span>
              <button
                onClick={() => switchRole(role === "instructor" ? "student" : "instructor")}
                className="text-[10px] text-blue-400 hover:text-blue-300 underline font-medium"
                title="Quick Switch Role"
              >
                (Switch)
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 py-4 space-y-1 overflow-y-auto max-h-[calc(100vh-280px)]">
            
            {/* Dashboard Overview */}
            <Link
              to="/userhome"
              onClick={() => setIsOpen(false)}
              className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition ${
                isActive("/userhome") || isActive("/")
                  ? "bg-[#333842] text-white border-l-4 border-blue-400 font-semibold"
                  : "hover:bg-[#2c313a] text-slate-300 hover:text-white"
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-blue-400" />
              <span>Dashboard</span>
            </Link>

            {/* Courses Menu */}
            <div>
              <button
                onClick={() => setCoursesOpen(!coursesOpen)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition ${
                  location.pathname.startsWith("/courses")
                    ? "bg-[#333842] text-white"
                    : "hover:bg-[#2c313a] text-slate-300 hover:text-white"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                  <span>Courses</span>
                </div>
                {coursesOpen ? (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                ) : (
                  <span className="text-slate-400 text-sm font-bold">+</span>
                )}
              </button>

              {coursesOpen && (
                <div className="pl-9 pr-2 py-1 space-y-1 text-xs">
                  <Link
                    to="/userhome"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-2 py-1.5 px-2 rounded hover:text-white hover:bg-slate-700/50 text-slate-400"
                  >
                    <BookMarked className="w-3.5 h-3.5" />
                    <span>My Courses</span>
                  </Link>
                  <Link
                    to="/courses"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-2 py-1.5 px-2 rounded hover:text-white hover:bg-slate-700/50 text-slate-400"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>Explore Catalog</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Quizzes */}
            <Link
              to="/quizzes"
              onClick={() => setIsOpen(false)}
              className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition ${
                isActive("/quizzes")
                  ? "bg-[#333842] text-white border-l-4 border-blue-400 font-semibold"
                  : "hover:bg-[#2c313a] text-slate-300 hover:text-white"
              }`}
            >
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>Quizzes</span>
            </Link>

            {/* Forum Menu */}
            <div>
              <button
                onClick={() => setForumOpen(!forumOpen)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition ${
                  location.pathname.startsWith("/forum")
                    ? "bg-[#333842] text-white"
                    : "hover:bg-[#2c313a] text-slate-300 hover:text-white"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-4 h-4 text-sky-400" />
                  <span>Forum</span>
                </div>
                {forumOpen ? (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                ) : (
                  <span className="text-slate-400 text-sm font-bold">+</span>
                )}
              </button>

              {forumOpen && (
                <div className="pl-9 pr-2 py-1 space-y-1 text-xs">
                  <Link
                    to="/forum"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-2 py-1.5 px-2 rounded hover:text-white hover:bg-slate-700/50 text-slate-400"
                  >
                    <span>All Discussions</span>
                  </Link>
                  <Link
                    to="/forum?filter=ask"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-2 py-1.5 px-2 rounded hover:text-white hover:bg-slate-700/50 text-slate-400"
                  >
                    <span>Ask Question</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Certificates */}
            <Link
              to="/certificates"
              onClick={() => setIsOpen(false)}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition ${
                isActive("/certificates")
                  ? "bg-[#333842] text-white border-l-4 border-blue-400 font-semibold"
                  : "hover:bg-[#2c313a] text-slate-300 hover:text-white"
              }`}
            >
              <div className="flex items-center space-x-3">
                <Award className="w-4 h-4 text-yellow-400" />
                <span>Certificates</span>
              </div>
              {certificates?.length > 0 && (
                <span className="bg-yellow-500/20 text-yellow-300 text-[11px] font-bold px-2 py-0.5 rounded-full">
                  {certificates.length}
                </span>
              )}
            </Link>

            {/* Instructor Studio (When in Instructor Mode or linkable) */}
            <Link
              to="/instructor"
              onClick={() => setIsOpen(false)}
              className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition ${
                isActive("/instructor")
                  ? "bg-[#333842] text-white border-l-4 border-purple-400 font-semibold"
                  : "hover:bg-[#2c313a] text-slate-300 hover:text-white"
              }`}
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Instructor Studio</span>
            </Link>

            {/* Account Menu */}
            <div>
              <button
                onClick={() => setAccountOpen(!accountOpen)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition ${
                  location.pathname.startsWith("/account")
                    ? "bg-[#333842] text-white"
                    : "hover:bg-[#2c313a] text-slate-300 hover:text-white"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <User className="w-4 h-4 text-indigo-400" />
                  <span>Account</span>
                </div>
                {accountOpen ? (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                ) : (
                  <span className="text-slate-400 text-sm font-bold">+</span>
                )}
              </button>

              {accountOpen && (
                <div className="pl-9 pr-2 py-1 space-y-1 text-xs">
                  <Link
                    to="/account"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-2 py-1.5 px-2 rounded hover:text-white hover:bg-slate-700/50 text-slate-400"
                  >
                    <span>My Profile</span>
                  </Link>
                  <Link
                    to="/account#subscription"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-2 py-1.5 px-2 rounded hover:text-white hover:bg-slate-700/50 text-slate-400"
                  >
                    <span>Subscription Plan</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Messages */}
            <Link
              to="/messages"
              onClick={() => setIsOpen(false)}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition ${
                isActive("/messages")
                  ? "bg-[#333842] text-white border-l-4 border-blue-400 font-semibold"
                  : "hover:bg-[#2c313a] text-slate-300 hover:text-white"
              }`}
            >
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-pink-400" />
                <span>Messages</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-pink-500"></span>
            </Link>

          </nav>
        </div>

        {/* Bottom Section with Logout */}
        <div className="p-3 border-t border-slate-700/60 bg-[#1e2227]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
