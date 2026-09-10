import React, { useState } from "react";
import { useAuth } from "../utils/AuthContext";
import {
  User,
  Mail,
  Shield,
  CreditCard,
  CheckCircle2,
  Sparkles,
  Save,
  Check,
  Award
} from "lucide-react";

export default function Account() {
  const { user, setUser, role, switchRole, certificates, courses } = useAuth();

  const [name, setName] = useState(user?.name || "Bill Evans");
  const [email, setEmail] = useState(user?.email || "bill@example.com");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [bio, setBio] = useState(user?.bio || "Passionate software engineer and frontend designer.");
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setUser((prev) => ({
      ...prev,
      name,
      email,
      avatar: avatar || prev.avatar,
      bio
    }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-8 animate-fade-in">
      
      {/* Page Heading */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 font-heading">
          Account & Preferences
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Manage your student profile, security credentials, and active subscription plan.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column Profile Card */}
        <div className="md:col-span-1 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-6 shadow-subtle text-center space-y-4">
          <div className="relative inline-block">
            <img
              src={avatar || user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"}
              alt={name}
              className="w-24 h-24 rounded-full object-cover border-4 border-slate-100 dark:border-slate-700 shadow-md mx-auto"
            />
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
          </div>

          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base">{name}</h3>
            <p className="text-xs text-slate-400">{email}</p>
            <span className="inline-block mt-2 text-[10px] font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2.5 py-1 rounded-full">
              {role}
            </span>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-700 text-left space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-500">
              <span>Courses Enrolled:</span>
              <span className="font-bold text-slate-800 dark:text-slate-100">{courses.length}</span>
            </div>
            <div className="flex items-center justify-between text-slate-500">
              <span>Certificates Earned:</span>
              <span className="font-bold text-amber-600">{certificates.length}</span>
            </div>
          </div>
        </div>

        {/* Right Form & Subscription */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Profile Details Form */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-6 shadow-subtle">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 font-heading mb-4">
              Personal Profile Information
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Avatar Image URL
                </label>
                <input
                  type="text"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  placeholder="https://..."
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Bio / Personal Statement
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600"
                ></textarea>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700">
                {saved && (
                  <span className="text-emerald-600 font-bold flex items-center space-x-1">
                    <Check className="w-4 h-4" />
                    <span>Profile saved successfully!</span>
                  </span>
                )}
                <button
                  type="submit"
                  className="ml-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-sm flex items-center space-x-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>

          {/* Subscription Section */}
          <div id="subscription" className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-6 shadow-subtle space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  {user?.subscription?.plan || "Pro Annual Membership"}
                </h4>
                <p className="text-xs text-slate-400">
                  Renews on {user?.subscription?.expiresAt || "25 February 2027"}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Your membership grants unlimited lifetime access to all learning paths, video player streaming, quizzes, and verified accredited certificates.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <button
                onClick={() => alert("Subscription is active and up to date!")}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-lg"
              >
                Manage Billing
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
