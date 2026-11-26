import React from "react";
import { PersonalizedRoutinePlan } from "@/types/persona";
import { Sparkles, ShieldCheck, AlertTriangle, CheckCircle2, Clock } from "lucide-react";

interface AiRoutinePlanCardProps {
  plan: PersonalizedRoutinePlan;
  isLoading: boolean;
}

export const AiRoutinePlanCard: React.FC<AiRoutinePlanCardProps> = ({ plan, isLoading }) => {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 mb-1.5">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            Tailored GenAI Resilience Routine
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Daily Action Plan for {plan.personaTitle}
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            {plan.summaryAdvice}
          </p>
        </div>

        {isLoading && (
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-600 bg-teal-50 dark:bg-teal-950/60 px-3 py-1.5 rounded-lg border border-teal-200 dark:border-teal-800">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping" />
            Synthesizing Live Plan...
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-600" aria-hidden="true" />
            Safest Outdoor Hours Window
          </div>
          <div className="mt-2 text-2xl font-black text-emerald-900 dark:text-emerald-100">
            {plan.safestOutdoorWindow.start} to {plan.safestOutdoorWindow.end}
          </div>
          <p className="mt-1 text-xs text-emerald-700 dark:text-emerald-300/90 leading-relaxed">
            {plan.safestOutdoorWindow.reason}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800">
          <div className="flex items-center gap-2 text-red-800 dark:text-red-300 font-bold text-sm">
            <AlertTriangle className="w-4 h-4 text-red-600" aria-hidden="true" />
            Severe Inversion Danger Window (Avoid)
          </div>
          <div className="mt-2 text-2xl font-black text-red-900 dark:text-red-100">
            {plan.avoidOutdoorWindow.start} to {plan.avoidOutdoorWindow.end}
          </div>
          <p className="mt-1 text-xs text-red-700 dark:text-red-300/90 font-medium">
            Status: {plan.avoidOutdoorWindow.dangerLevel}. Peak thermal trapping; high particulate load.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4 text-teal-600" aria-hidden="true" />
          Hour by Hour Routine Alignment
        </h3>
        <div className="space-y-2.5">
          {plan.activitySchedule.map((slot, idx) => {
            const badgeClass =
              slot.recommendation === "Safe"
                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                : slot.recommendation === "Caution"
                ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                : "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300";

            return (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div className="flex items-start sm:items-center gap-3">
                  <span className="text-xs font-mono font-semibold text-slate-500 min-w-[130px]">
                    {slot.timeSlot}
                  </span>
                  <div>
                    <span className="font-semibold text-sm text-slate-900 dark:text-white">
                      {slot.activity}
                    </span>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      {slot.notes}
                    </p>
                  </div>
                </div>

                <span className={`self-start sm:self-center text-xs font-bold px-2.5 py-1 rounded-full ${badgeClass}`}>
                  {slot.recommendation}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-teal-600" aria-hidden="true" />
          Essential Respiratory Protection Actions
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
          {plan.indoorProtectionChecklist.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 bg-slate-100/60 dark:bg-slate-800/40 p-2.5 rounded-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
