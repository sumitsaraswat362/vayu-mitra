import React from "react";
import { AlertOctagon, ShieldAlert, FileText, Ban } from "lucide-react";

interface GrapProtocolCardProps {
  aqi: number;
}

export const GrapProtocolCard: React.FC<GrapProtocolCardProps> = ({ aqi }) => {
  let stage = "Stage I: Poor (AQI 201 to 300)";
  let stageCode = "Stage I";
  let stageColor =
    "text-amber-700 bg-amber-50 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900";
  let activeDirective =
    "Enforce mechanized road sweeping, heavy dust suppression water spraying, and ban on open garbage burning.";

  if (aqi >= 450) {
    stage = "Stage IV: Severe Plus / Emergency (AQI > 450)";
    stageCode = "Stage IV";
    stageColor =
      "text-purple-700 bg-purple-50 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-900";
    activeDirective =
      "Enact immediate halt to non-essential commercial truck entry into Delhi NCR, stop medium/heavy diesel goods vehicles (BS-IV and below), mandate 50 percent work-from-home in government offices, and transition all schools to online instruction.";
  } else if (aqi >= 401) {
    stage = "Stage III: Severe (AQI 401 to 450)";
    stageCode = "Stage III";
    stageColor =
      "text-red-700 bg-red-50 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-900";
    activeDirective =
      "Strict ban on all non-essential construction and demolition activities. Prohibit plying of BS-III petrol and BS-IV diesel four-wheelers across NCR districts.";
  } else if (aqi >= 301) {
    stage = "Stage II: Very Poor (AQI 301 to 400)";
    stageCode = "Stage II";
    stageColor =
      "text-orange-700 bg-orange-50 border-orange-200 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-900";
    activeDirective =
      "Ban diesel generator sets except for emergency hospital services. Elevate parking fees to discourage private vehicular commuting; intensify electric bus frequencies.";
  }

  return (
    <section className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-teal-600" aria-hidden="true" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Official Graded Response Action Plan (GRAP)
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Statutory emergency directives mandated by the Commission for Air
            Quality Management (CAQM).
          </p>
        </div>

        <span
          className={`text-xs font-bold px-3 py-1.5 rounded-lg border ${stageColor}`}
        >
          Active: {stageCode}
        </span>
      </div>

      <div className={`p-4 rounded-xl border mb-4 ${stageColor}`}>
        <div className="flex items-center gap-2 font-bold text-sm mb-1.5">
          <AlertOctagon className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>Current Regulatory Phase: {stage}</span>
        </div>
        <p className="text-xs leading-relaxed opacity-95">{activeDirective}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
          <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mb-1">
            <Ban className="w-3.5 h-3.5 text-red-500" aria-hidden="true" />
            Vehicular Restrictions
          </div>
          <p className="text-slate-600 dark:text-slate-400">
            Verify emission compliance. Older diesel models face statutory
            confiscation or INR 20,000 penalties under GRAP notifications.
          </p>
        </div>

        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
          <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mb-1">
            <FileText
              className="w-3.5 h-3.5 text-amber-500"
              aria-hidden="true"
            />
            Educational Advisory
          </div>
          <p className="text-slate-600 dark:text-slate-400">
            Schools must suspend outdoor morning assemblies, sports periods, and
            marathon drills during active Stage II through Stage IV.
          </p>
        </div>

        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
          <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mb-1">
            <AlertOctagon
              className="w-3.5 h-3.5 text-teal-500"
              aria-hidden="true"
            />
            Citizen Citizenry Duty
          </div>
          <p className="text-slate-600 dark:text-slate-400">
            Report open biomass or leaf burning to municipal helplines via the
            Sameer App to halt localized surface smoke plumes.
          </p>
        </div>
      </div>
    </section>
  );
};
