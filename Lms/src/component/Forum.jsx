import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import {
  MessageSquare,
  ThumbsUp,
  MessageCircle,
  Plus,
  Search,
  CheckCircle2,
  Send,
  User,
  Sparkles
} from "lucide-react";

export default function Forum() {
  const { forumPosts, createForumPost, replyToForumPost, upvotePost, user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTopic = searchParams.get("topic") || "All";
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreatingPost, setIsCreatingPost] = useState(searchParams.get("filter") === "ask");

  // New post form state
  const [newTitle, setNewTitle] = useState("");
  const [newTopic, setNewTopic] = useState("Web Development");
  const [newContent, setNewContent] = useState("");

  // Selected thread view
  const [activeThreadId, setActiveThreadId] = useState(forumPosts[0]?.id);
  const activeThread = forumPosts.find((p) => p.id === activeThreadId) || forumPosts[0];

  // Reply input
  const [replyText, setReplyText] = useState("");

  const topics = ["All", "Angular.JS", "HTML", "Full Stack", "General Discussion"];

  const filteredPosts = forumPosts.filter((post) => {
    const matchTopic =
      activeTopic === "All" ||
      post.topic.toLowerCase().includes(activeTopic.toLowerCase());
    const matchSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchTopic && matchSearch;
  });

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const created = await createForumPost(newTitle.trim(), newTopic, newContent.trim());
    if (created) {
      setActiveThreadId(created.id);
    }
    setNewTitle("");
    setNewContent("");
    setIsCreatingPost(false);
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!replyText.trim() || !activeThread) return;
    await replyToForumPost(activeThread.id, replyText.trim());
    setReplyText("");
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-fade-in">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 font-heading">
            Community Discussions & Q&A
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Connect with instructors, collaborate with fellow students, and exchange solutions.
          </p>
        </div>

        <button
          onClick={() => setIsCreatingPost(true)}
          className="flex items-center space-x-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Ask a Question</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200/80 dark:border-slate-700/80 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
          {topics.map((top) => (
            <button
              key={top}
              onClick={() => {
                const next = new URLSearchParams(searchParams);
                if (top === "All") next.delete("topic");
                else next.set("topic", top);
                setSearchParams(next);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                activeTopic === top
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
              }`}
            >
              {top}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search discussions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-xs bg-slate-100 dark:bg-slate-700 rounded-lg border border-transparent focus:border-blue-500 focus:outline-none"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
        </div>
      </div>

      {/* Main Forum 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Thread list (Left) */}
        <div className="lg:col-span-5 space-y-3 max-h-[700px] overflow-y-auto pr-1">
          {filteredPosts.map((post) => {
            const isSelected = post.id === activeThreadId;
            return (
              <div
                key={post.id}
                onClick={() => setActiveThreadId(post.id)}
                className={`p-4 rounded-xl border cursor-pointer transition ${
                  isSelected
                    ? "bg-blue-50/80 dark:bg-blue-900/20 border-blue-400 shadow-sm"
                    : "bg-white dark:bg-slate-800 border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] uppercase font-bold text-blue-600 bg-blue-100 dark:bg-blue-900/40 px-2 py-0.5 rounded">
                    {post.topic}
                  </span>
                  <span className="text-[10px] text-slate-400">{post.timeAgo}</span>
                </div>

                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-2 line-clamp-2 leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                  {post.content}
                </p>

                <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100 dark:border-slate-700/60 text-xs text-slate-400">
                  <span className="font-medium text-slate-600 dark:text-slate-300">
                    By {post.author}
                  </span>
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center space-x-1">
                      <ThumbsUp className="w-3.5 h-3.5 text-slate-400" />
                      <span>{post.upvotes || 0}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MessageCircle className="w-3.5 h-3.5 text-slate-400" />
                      <span>{post.replies?.length || 0}</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Thread Detail & Replies (Right) */}
        <div className="lg:col-span-7">
          {activeThread ? (
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-6 shadow-subtle space-y-6">
              
              {/* Thread Header */}
              <div className="border-b border-slate-100 dark:border-slate-700 pb-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase bg-blue-50 text-blue-600 px-2.5 py-1 rounded-md">
                    {activeThread.topic}
                  </span>
                  <button
                    onClick={() => upvotePost(activeThread.id)}
                    className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-blue-50 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold transition"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 text-blue-500" />
                    <span>Upvote ({activeThread.upvotes || 0})</span>
                  </button>
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100 font-heading mt-3">
                  {activeThread.title}
                </h2>

                <div className="flex items-center space-x-3 mt-3 text-xs text-slate-400">
                  <img
                    src={activeThread.authorAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                    alt={activeThread.author}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <div>
                    <span className="font-semibold text-slate-700 dark:text-slate-200">
                      {activeThread.author}
                    </span>
                    <span className="mx-1">•</span>
                    <span>{activeThread.timeAgo}</span>
                  </div>
                </div>

                <p className="text-sm text-slate-700 dark:text-slate-300 mt-4 leading-relaxed bg-slate-50 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                  {activeThread.content}
                </p>
              </div>

              {/* Replies Feed */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Discussion Replies ({activeThread.replies?.length || 0})
                </h4>

                <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                  {activeThread.replies?.map((rep) => (
                    <div
                      key={rep.id}
                      className="bg-slate-50 dark:bg-slate-700/40 p-4 rounded-xl text-xs space-y-2 border border-slate-100 dark:border-slate-700"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <img
                            src={rep.authorAvatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"}
                            alt={rep.author}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span className="font-bold text-slate-800 dark:text-slate-100">
                            {rep.author}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400">{rep.timeAgo}</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed pl-8">
                        {rep.content}
                      </p>
                    </div>
                  ))}

                  {(!activeThread.replies || activeThread.replies.length === 0) && (
                    <p className="text-xs text-slate-400 italic py-4 text-center">
                      No replies yet. Be the first to share an answer!
                    </p>
                  )}
                </div>
              </div>

              {/* Reply Box */}
              <form onSubmit={handleReplySubmit} className="flex items-center space-x-2 pt-2">
                <input
                  type="text"
                  placeholder="Contribute your solution or thoughts..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="flex-1 px-4 py-2.5 text-xs bg-slate-100 dark:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-600 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition flex items-center space-x-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post Reply</span>
                </button>
              </form>

            </div>
          ) : (
            <div className="p-12 text-center bg-white dark:bg-slate-800 rounded-2xl border border-slate-200">
              <MessageSquare className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-xs text-slate-500">Select a topic thread to view discussion</p>
            </div>
          )}
        </div>

      </div>

      {/* Create New Post Modal */}
      {isCreatingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700 mb-4">
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 font-heading">
                Start a New Discussion Thread
              </h3>
              <button
                onClick={() => setIsCreatingPost(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Topic / Category
                </label>
                <select
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600"
                >
                  <option value="Web Development">Web Development</option>
                  <option value="Angular.JS">Angular.JS</option>
                  <option value="HTML & CSS">HTML & CSS</option>
                  <option value="Full Stack">Full Stack</option>
                  <option value="General Discussion">General Discussion</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Question Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. How do I optimize CSS Grid auto-placement?"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Detailed Explanation / Code snippet
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe your question or use case in detail..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600"
                  required
                ></textarea>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setIsCreatingPost(false)}
                  className="px-4 py-2 text-slate-600 font-semibold hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-sm"
                >
                  Publish Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
