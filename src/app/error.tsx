"use client";

import React, { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log exception safely to diagnostics
    console.error("Vayu-Mitra runtime error caught by boundary:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-lg text-center">
        <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-300 mx-auto flex items-center justify-center mb-4">
          <AlertTriangle className="w-6 h-6" aria-hidden="true" />
        </div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          Atmospheric Telemetry Interrupted
        </h1>
        <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
          An unexpected error occurred while processing air quality metrics. The
          system state has been preserved.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs shadow-sm transition min-h-[44px]"
        >
          <RefreshCw className="w-4 h-4" aria-hidden="true" />
          <span>Recover and Reload Dashboard</span>
        </button>
      </div>
    </div>
  );
}
