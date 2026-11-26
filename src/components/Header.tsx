import React from "react";
import { Wind, ShieldAlert, Sparkles, AlertTriangle } from "lucide-react";
import { APP_NAME } from "@/lib/constants";

interface HeaderProps {
  currentAqi: number;
  cityName: string;
}

export const Header: React.FC<HeaderProps> = ({ currentAqi, cityName }) => {
  const isSevere = currentAqi >= 300;
  const isHigh = currentAqi >= 200 && currentAqi < 300;

  return (
    <header className="w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur sticky top-0 z-50">
      {(isSevere || isHigh) && (
        <div
          role="alert"
          className={`w-full py-2 px-4 text-xs md:text-sm font-medium text-center flex items-center justify-center gap-2 ${
            isSevere
              ? "bg-purple-700 text-white animate-pulse"
              : "bg-red-600 text-white"
          }`}
        >
          <AlertTriangle className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>
            <strong>Winter Smog Advisory for {cityName}:</strong> AQI is {currentAqi}. Severe ground level temperature inversion active. Limit outdoor exposure.
          </span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-md shadow-teal-500/20">
            <Wind className="w-6 h-6" aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg md:text-xl text-slate-900 dark:text-white tracking-tight">
                {APP_NAME}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300">
                <Sparkles className="w-3 h-3" /> GenAI Powered
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
              Urban Winter Smog and Air Quality Resilience Assistant
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
            <ShieldAlert className="w-4 h-4 text-teal-600" aria-hidden="true" />
            <span>WHO Guideline Calibrated</span>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-slate-500 block">Current Focus</span>
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{cityName}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
