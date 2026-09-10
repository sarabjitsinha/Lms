import React from "react";
import { Award, CheckCircle2, Download, Printer, X, ShieldCheck } from "lucide-react";

export default function CertificatesModal({ certificate, onClose }) {
  if (!certificate) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span className="font-semibold text-slate-800 dark:text-slate-100 text-sm">
              Verified Certificate of Achievement
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 hover:bg-slate-100 rounded-lg border border-slate-200 dark:border-slate-600 transition shadow-sm"
              title="Print Certificate"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition shadow-sm"
              title="Download PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Body (Printable Area) */}
        <div id="printable-certificate" className="p-8 sm:p-12 text-center bg-gradient-to-b from-amber-50/40 via-white to-sky-50/30 relative">
          {/* Subtle Decorative Border */}
          <div className="border-4 border-double border-amber-300/80 rounded-xl p-8 sm:p-10 relative bg-white/80 shadow-sm">
            
            {/* Corner Embellishments */}
            <div className="absolute top-2 left-2 text-amber-400 font-serif text-lg">✦</div>
            <div className="absolute top-2 right-2 text-amber-400 font-serif text-lg">✦</div>
            <div className="absolute bottom-2 left-2 text-amber-400 font-serif text-lg">✦</div>
            <div className="absolute bottom-2 right-2 text-amber-400 font-serif text-lg">✦</div>

            {/* Header / Logo */}
            <div className="inline-flex items-center justify-center space-x-2 bg-blue-500 text-white px-5 py-1.5 rounded-full mb-6 font-bold tracking-wide shadow-md">
              <span className="text-lg tracking-tight font-heading">Learning</span>
              <span className="text-xs font-normal opacity-90">Academy</span>
            </div>

            <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-2">
              Certificate of Completion
            </p>
            
            <p className="text-sm text-slate-600 mb-1">This is to certify that</p>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif tracking-tight my-2">
              {certificate.recipientName || "Bill Evans"}
            </h2>

            <p className="text-sm text-slate-600 max-w-md mx-auto my-3 leading-relaxed">
              has successfully completed all required coursework, practical projects, and assessments for
            </p>

            <h3 className="text-xl sm:text-2xl font-bold text-blue-600 my-2 font-heading">
              {certificate.courseTitle}
            </h3>

            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold my-3 border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Score: {certificate.grade || "100% Mastery"}</span>
            </div>

            {/* Footer Signatures & Verification */}
            <div className="grid grid-cols-2 gap-8 pt-8 mt-6 border-t border-slate-200">
              <div className="text-center">
                <div className="font-serif italic text-lg text-slate-800 border-b border-slate-300 pb-1 w-44 mx-auto">
                  {certificate.instructorName || "Adrian Demian"}
                </div>
                <p className="text-xs font-medium text-slate-500 mt-1">Lead Instructor & Architect</p>
                <p className="text-[11px] text-slate-400">Date: {certificate.issueDate || "February 2026"}</p>
              </div>

              <div className="text-center flex flex-col items-center justify-center">
                <div className="flex items-center space-x-1 text-emerald-600">
                  <ShieldCheck className="w-6 h-6 text-blue-600" />
                  <span className="text-xs font-bold text-slate-700">VERIFIED ID</span>
                </div>
                <p className="text-xs font-mono font-bold text-slate-700 tracking-wider mt-1">
                  {certificate.certificateCode || `LMS-${Math.floor(100000 + Math.random() * 900000)}`}
                </p>
                <p className="text-[11px] text-slate-400">learning.portal/verify</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
