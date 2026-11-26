import React from "react";
import {
  Home,
  Wind,
  ShieldAlert,
  Sparkles,
  CheckSquare,
  AlertCircle,
} from "lucide-react";

export const IndoorAirCard: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <Home className="w-5 h-5 text-teal-600" aria-hidden="true" />
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Indoor Air Quality and Ventilation Protocol
        </h2>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
        Indoor air often becomes 3 to 5 times more toxic than outdoor air during
        winter if unvented combustion and stale CO2 accumulate inside sealed
        homes.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 text-teal-700 dark:text-teal-400 font-bold text-xs uppercase tracking-wider mb-2">
            <Wind className="w-4 h-4" aria-hidden="true" />
            The 15 Minute Flush Rule
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Ventilate Only Between 1 PM and 3 PM
          </h3>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Open opposite windows for exactly 15 minutes at 1:30 PM to flush
            accumulated CO2 and volatile compounds without letting heavy morning
            or night smog settle indoors.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            HEPA Air Purifier Optimization
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Elevate 2 Feet Off the Floor
          </h3>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Place purifiers centrally, away from walls and curtains. Run in
            bedrooms on high speed 45 minutes before sleep, then switch to quiet
            night mode to eliminate particulate spikes.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 text-red-700 dark:text-red-400 font-bold text-xs uppercase tracking-wider mb-2">
            <AlertCircle className="w-4 h-4" aria-hidden="true" />
            Zero Indoor Combustion
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Eliminate Incense and Unvented Heaters
          </h3>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Burning a single agarbatti produces PM2.5 levels exceeding 400 ug/m3
            in closed rooms. Use electric room oil heaters rather than gas or
            open coil elements.
          </p>
        </div>
      </div>

      <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
          <CheckSquare className="w-4 h-4 text-teal-600" aria-hidden="true" />
          Practical Smog Mitigation Checklist
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 dark:text-slate-300">
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800">
            <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 font-bold text-[10px] flex items-center justify-center shrink-0">
              1
            </span>
            <span>
              <strong>Wet Mopping Only:</strong> Never dry sweep with
              traditional brooms, which resuspends fine settled soot back into
              the respiratory breathing zone.
            </span>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800">
            <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 font-bold text-[10px] flex items-center justify-center shrink-0">
              2
            </span>
            <span>
              <strong>Seal Exterior Door Gaps:</strong> Affix silicone sweep
              draft guards under main entry doors to stop nocturnal cold smog
              infiltration.
            </span>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800">
            <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 font-bold text-[10px] flex items-center justify-center shrink-0">
              3
            </span>
            <span>
              <strong>Continuous Kitchen Exhaust:</strong> Run chimney hood
              exhaust fans for 5 full minutes after frying food to capture toxic
              aerosolized cooking oils.
            </span>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800">
            <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 font-bold text-[10px] flex items-center justify-center shrink-0">
              4
            </span>
            <span>
              <strong>Air Purifying Foliage:</strong> Maintain indoor
              oxygenators (Sansevieria Snake Plant and Areca Palm) in bedrooms
              to counter nighttime stale air buildup.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
