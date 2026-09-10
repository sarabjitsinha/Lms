import React from "react";
import { Link, useRouteError } from "react-router-dom";
import { AlertTriangle, Home } from "lucide-react";

export default function Error() {
  const err = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4 text-center">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-8 shadow-xl space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 font-heading">
          Page Not Found
        </h2>
        <p className="text-xs text-slate-500">
          The requested page or course resource is unavailable.
        </p>
        <div className="pt-4">
          <Link
            to="/userhome"
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition"
          >
            <Home className="w-4 h-4" />
            <span>Return to Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}