import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import {
  CreditCard,
  BookOpen,
  GraduationCap,
  Award,
  MessageSquare,
  ChevronRight,
  FileText,
  Star,
  Trophy,
  GitFork,
  Gem,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  Play
} from "lucide-react";
import CertificatesModal from "./CertificatesModal";

export default function Home() {
  const {
    user,
    courses,
    quizzes,
    badges,
    certificates,
    forumPosts,
    activeCertificate,
    setActiveCertificate,
    role
  } = useAuth();

  const navigate = useNavigate();
  const [selectedForumPost, setSelectedForumPost] = useState(null);
  const [quickReply, setQuickReply] = useState("");
  const { replyToForumPost } = useAuth();

  // Helper badge icon renderer
  const renderBadgeIcon = (iconName) => {
    switch (iconName) {
      case "star":
        return <Star className="w-5 h-5 fill-current" />;
      case "trophy":
        return <Trophy className="w-5 h-5 fill-current" />;
      case "graduation":
        return <GraduationCap className="w-5 h-5" />;
      case "fork":
        return <GitFork className="w-5 h-5" />;
      case "diamond":
        return <Gem className="w-5 h-5 fill-current" />;
      default:
        return <Award className="w-5 h-5" />;
    }
  };

  const handleReplySubmit = (e, postId) => {
    e.preventDefault();
    if (quickReply.trim()) {
      replyToForumPost(postId, quickReply.trim());
      setQuickReply("");
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Top Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 font-heading">
            Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Welcome back, <span className="font-semibold text-slate-700 dark:text-slate-200">{user?.name || "Student"}</span>. Track your progress, recent quizzes, and achievements.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/courses"
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-sm transition"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Browse Courses</span>
          </Link>
          <Link
            to="/quizzes"
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold shadow-sm transition"
          >
            <GraduationCap className="w-3.5 h-3.5 text-amber-500" />
            <span>Take Quiz</span>
          </Link>
        </div>
      </div>

      {/* Subscription Alert Card matching choose-student-app.png */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-700/80 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-subtle">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white shadow-sm flex-shrink-0">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Your subscription ends on <span className="font-bold text-slate-900 dark:text-white">{user?.subscription?.expiresAt || "25 February 2027"}</span>
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Unlimited access to all verified tracks, quizzes & downloadable certificates.
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/account#subscription")}
          className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg border border-slate-300 dark:border-slate-600 transition shadow-xs self-start sm:self-auto"
        >
          UPGRADE
        </button>
      </div>

      {/* Main 2-Column Dashboard Grid matching choose-student-app.png */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (Courses & Quizzes) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Courses Card */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-700/80 p-5 shadow-subtle">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 font-heading">
                Courses
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Your recent courses
            </p>

            <div className="space-y-4">
              {courses.slice(0, 3).map((course) => (
                <div
                  key={course.id}
                  onClick={() => navigate(`/courses/${course.id}`)}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/40 border border-transparent hover:border-slate-200 dark:hover:border-slate-600 cursor-pointer transition"
                >
                  <div className="flex-1 pr-4">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                        {course.title}
                      </h4>
                      {course.progress === 100 && (
                        <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-bold">
                          DONE
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{course.category} • {course.duration}</p>
                  </div>

                  {/* Progress Bar matching green bars in mock */}
                  <div className="flex items-center space-x-3 w-full sm:w-44 mt-2 sm:mt-0">
                    <div className="flex-1 bg-slate-100 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400 w-9 text-right">
                      {course.progress}%
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex justify-end">
              <Link
                to="/courses"
                className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-md border border-slate-200 dark:border-slate-600 transition"
              >
                VIEW ALL
              </Link>
            </div>
          </div>

          {/* Quizzes Card matching mock */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-700/80 p-5 shadow-subtle">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 font-heading">
                Quizzes
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Your recent performance
            </p>

            <div className="divide-y divide-slate-100 dark:divide-slate-700/60">
              {quizzes.slice(0, 3).map((quiz) => (
                <div
                  key={quiz.id}
                  onClick={() => navigate(`/quizzes/${quiz.id}`)}
                  className="py-3.5 flex items-center justify-between cursor-pointer group hover:bg-slate-50/80 dark:hover:bg-slate-700/30 px-2 rounded-lg transition"
                >
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                      {quiz.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Course:{" "}
                      <span className="text-blue-500 hover:underline font-medium">
                        {quiz.courseTitle}
                      </span>
                    </p>
                  </div>

                  {/* Score & Label Pill matching mock (e.g. 5.8 Good, 9.8 Great, 3.4 Failed) */}
                  <div className="text-right">
                    <span className={`text-xl font-bold ${quiz.gradeColor || "text-emerald-600"}`}>
                      {quiz.lastScore}
                    </span>
                    <p className="text-[11px] text-slate-400 font-medium capitalize">
                      {quiz.gradeLabel || "Completed"}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex justify-start">
              <Link
                to="/quizzes"
                className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white bg-blue-500 hover:bg-blue-600 rounded-md transition shadow-sm"
              >
                GO TO RESULTS
              </Link>
            </div>
          </div>

        </div>

        {/* Right Column (Rewards, Certificates, Forum Activity) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Rewards Card with round medal icons */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-700/80 p-5 shadow-subtle">
            <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 font-heading">
              Rewards
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Your latest achievements
            </p>

            <div className="flex items-center space-x-3 overflow-x-auto py-1">
              {badges.map((b) => (
                <div
                  key={b.id}
                  title={`${b.name}: ${b.description}`}
                  className={`w-11 h-11 rounded-full ${b.color} flex items-center justify-center shadow-md transform hover:scale-110 transition cursor-pointer flex-shrink-0`}
                >
                  {renderBadgeIcon(b.icon)}
                </div>
              ))}
            </div>
          </div>

          {/* Certificates Card matching mock with document icons */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-700/80 p-5 shadow-subtle">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 font-heading">
                Certificates <span className="text-xs font-normal text-slate-400">({certificates.length})</span>
              </h2>
              <Link to="/certificates" className="text-xs text-blue-500 hover:underline font-semibold">
                View All
              </Link>
            </div>

            <div className="flex items-center space-x-3 py-3 overflow-x-auto">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  onClick={() => setActiveCertificate(cert)}
                  title={`View Certificate: ${cert.courseTitle}`}
                  className="w-12 h-14 bg-slate-100 dark:bg-slate-700/80 hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 flex flex-col items-center justify-center cursor-pointer transition group flex-shrink-0"
                >
                  <FileText className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition" />
                  <span className="text-[8px] font-mono text-slate-500 mt-1 uppercase font-bold truncate max-w-[40px]">
                    PDF
                  </span>
                </div>
              ))}

              {certificates.length === 0 && (
                <p className="text-xs text-slate-400 italic">
                  Complete a course 100% to unlock your official certificate!
                </p>
              )}
            </div>
          </div>

          {/* Forum Activity Card matching mock */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-700/80 p-5 shadow-subtle">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 font-heading">
                Forum Activity
              </h2>
              <Link to="/forum" className="text-xs text-blue-500 hover:underline font-semibold">
                Explore All
              </Link>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Latest forum topics & comments
            </p>

            <div className="divide-y divide-slate-100 dark:divide-slate-700/60">
              {forumPosts.slice(0, 4).map((post) => (
                <div
                  key={post.id}
                  onClick={() => setSelectedForumPost(post)}
                  className="py-3 flex items-start space-x-3 cursor-pointer group hover:bg-slate-50/70 dark:hover:bg-slate-700/30 p-2 rounded-lg transition"
                >
                  <img
                    src={post.authorAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                    alt={post.author}
                    className="w-9 h-9 rounded-full object-cover flex-shrink-0 border border-slate-200"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 leading-snug truncate">
                      {post.title}
                    </h4>
                    <div className="flex items-center space-x-2 text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      <span>Topic: <span className="text-blue-500 font-medium">{post.topic}</span></span>
                      <span>•</span>
                      <span>By: {post.author}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 whitespace-nowrap flex-shrink-0">
                    {post.timeAgo}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Interactive Forum Thread Preview Modal */}
      {selectedForumPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700 max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-700 pb-3 mb-4">
              <div>
                <span className="text-xs font-bold uppercase bg-blue-50 text-blue-600 px-2 py-0.5 rounded">
                  {selectedForumPost.topic}
                </span>
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mt-1 font-heading">
                  {selectedForumPost.title}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Posted by {selectedForumPost.author} • {selectedForumPost.timeAgo}
                </p>
              </div>
              <button
                onClick={() => setSelectedForumPost(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              {selectedForumPost.content}
            </p>

            {/* Replies section */}
            <div className="space-y-3 mb-4">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Replies ({selectedForumPost.replies?.length || 0})
              </h5>
              {selectedForumPost.replies?.map((rep) => (
                <div key={rep.id} className="bg-slate-50 dark:bg-slate-700/50 p-3 rounded-xl text-xs space-y-1">
                  <div className="flex items-center justify-between font-semibold text-slate-700 dark:text-slate-200">
                    <span>{rep.author}</span>
                    <span className="text-[10px] text-slate-400">{rep.timeAgo}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300">{rep.content}</p>
                </div>
              ))}
            </div>

            {/* Quick Reply Form */}
            <form onSubmit={(e) => handleReplySubmit(e, selectedForumPost.id)} className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Write a helpful answer..."
                value={quickReply}
                onChange={(e) => setQuickReply(e.target.value)}
                className="flex-1 px-3 py-2 text-xs bg-slate-100 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold"
              >
                Reply
              </button>
            </form>
          </div>
        </div>
      )}

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