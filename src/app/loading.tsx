import React from "react";
import { Wind } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="w-16 h-16 rounded-2xl bg-teal-700 text-white flex items-center justify-center shadow-lg shadow-teal-700/20 mb-4 animate-bounce">
        <Wind className="w-8 h-8" aria-hidden="true" />
      </div>
      <div className="text-center">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Ingesting Atmospheric Telemetry
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Connecting to Open-Meteo satellite feeds and CPCB NAAQS calibrations...
        </p>
      </div>
    </div>
  );
}
