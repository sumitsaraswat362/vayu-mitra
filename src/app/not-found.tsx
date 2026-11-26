import React from "react";
import Link from "next/link";
import { Wind, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-lg text-center">
        <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 mx-auto flex items-center justify-center mb-4">
          <Wind className="w-6 h-6" aria-hidden="true" />
        </div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
          Station Coordinates Not Found
        </h1>
        <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
          The requested air monitoring page or coordinate route does not exist.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs shadow-sm transition min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Return to Primary Dashboard</span>
        </Link>
      </div>
    </div>
  );
}
