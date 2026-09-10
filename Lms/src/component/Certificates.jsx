import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import {
  Award,
  ShieldCheck,
  Download,
  Printer,
  FileText,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles
} from "lucide-react";
import CertificatesModal from "./CertificatesModal";

export default function Certificates() {
  const { certificates, courses, activeCertificate, setActiveCertificate, user } = useAuth();

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 rounded-2xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold">
            <Award className="w-3.5 h-3.5 text-yellow-200" />
            <span>Accredited Academic Credentials</span>
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-heading tracking-tight">
            My Certificates & Honors
          </h1>
          <p className="text-sm sm:text-base text-amber-100 max-w-xl leading-relaxed">
            Every certificate issued is cryptographically verifiable, shareable on LinkedIn, and ready for professional portfolio showcase.
          </p>
        </div>
      </div>

      {/* Earned Certificates Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 font-heading">
          Earned Credentials ({certificates.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-6 shadow-subtle hover:shadow-card transition flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center text-amber-600 border border-amber-200">
                    <Award className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-bold bg-slate-100 dark:bg-slate-700 px-2.5 py-1 rounded-md text-slate-600 dark:text-slate-300">
                    {cert.certificateCode}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase">
                    Verified Course Completion
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 font-heading mt-0.5">
                    {cert.courseTitle}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Issued to <strong>{cert.recipientName}</strong> on {cert.issueDate}
                  </p>
                </div>

                <div className="flex items-center space-x-3 text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-700">
                  <span className="flex items-center space-x-1 text-emerald-600 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Grade: {cert.grade || "100% Mastery"}</span>
                  </span>
                  <span>•</span>
                  <span>Instructor: {cert.instructorName}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <button
                  onClick={() => setActiveCertificate(cert)}
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition flex items-center justify-center space-x-1.5"
                >
                  <FileText className="w-4 h-4" />
                  <span>View Official Certificate</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* In-Progress Courses / Upcoming Certificates */}
      <div className="space-y-4 pt-4">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 font-heading">
          In-Progress Tracks
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses
            .filter((c) => c.progress < 100)
            .map((c) => (
              <div
                key={c.id}
                className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/80 dark:border-slate-700/80 p-4 flex items-center justify-between gap-4"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {c.title}
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      {c.progress}% completed • Finish all lessons to unlock
                    </p>
                  </div>
                </div>

                <Link
                  to={`/courses/${c.id}`}
                  className="text-xs font-bold text-blue-600 hover:underline flex items-center space-x-1"
                >
                  <span>Resume</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
        </div>
      </div>

      {/* Modal viewer */}
      {activeCertificate && (
        <CertificatesModal
          certificate={activeCertificate}
          onClose={() => setActiveCertificate(null)}
        />
      )}

    </div>
  );
}
