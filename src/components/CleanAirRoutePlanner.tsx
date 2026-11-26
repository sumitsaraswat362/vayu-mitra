import React, { useState } from "react";
import { Navigation, Bus, Car, Bike, Footprints, ShieldCheck, AlertTriangle } from "lucide-react";

interface TransitMode {
  id: string;
  name: string;
  icon: React.ReactNode;
  exposureScore: number; // 0 to 100 scale, lower is safer
  riskLabel: "Minimal" | "Low" | "Moderate" | "Severe";
  exposureReductionPercent: number;
  advice: string;
}

export const CleanAirRoutePlanner: React.FC = () => {
  const [selectedTransit, setSelectedTransit] = useState<string>("metro");

  const transitModes: TransitMode[] = [
    {
      id: "metro",
      name: "Underground Metro Rail",
      icon: <Navigation className="w-5 h-5" aria-hidden="true" />,
      exposureScore: 18,
      riskLabel: "Minimal",
      exposureReductionPercent: 82,
      advice:
        "Underground stations and air-filtered trains insulate passengers from surface vehicular tailpipe exhaust. This is the gold standard commute during severe winter smog episodes.",
    },
    {
      id: "car_ac",
      name: "Car with AC Recirculate",
      icon: <Car className="w-5 h-5" aria-hidden="true" />,
      exposureScore: 32,
      riskLabel: "Low",
      exposureReductionPercent: 68,
      advice:
        "Keep internal air recirculation ON at all times. Replace standard cabin filter with an activated carbon HEPA composite filter before peak winter season.",
    },
    {
      id: "bus",
      name: "Public Electric / AC Bus",
      icon: <Bus className="w-5 h-5" aria-hidden="true" />,
      exposureScore: 52,
      riskLabel: "Moderate",
      exposureReductionPercent: 48,
      advice:
        "Significantly safer than open three wheelers. Avoid waiting near bus exhausts at terminal stops; stand at least 15 feet upwind while boarding.",
    },
    {
      id: "twowheeler",
      name: "Motorcycle / Scooter",
      icon: <Bike className="w-5 h-5" aria-hidden="true" />,
      exposureScore: 92,
      riskLabel: "Severe",
      exposureReductionPercent: 8,
      advice:
        "High danger. Direct inhalation of diesel particulates and tire friction dust at street level. Mandatory certified N95 or N99 mask with airtight nasal clip.",
    },
    {
      id: "walking",
      name: "Roadside Walking",
      icon: <Footprints className="w-5 h-5" aria-hidden="true" />,
      exposureScore: 88,
      riskLabel: "Severe",
      exposureReductionPercent: 12,
      advice:
        "Avoid arterial highways. Walk through interior residential colonies with dense tree canopy buffers that naturally intercept sinking particulate matter.",
    },
  ];

  const currentMode =
    transitModes.find((m) => m.id === selectedTransit) ?? transitModes[0];

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <Navigation className="w-5 h-5 text-teal-600" aria-hidden="true" />
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Clean Air Commute and Transit Exposure Planner
        </h2>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
        Compare urban transit modes to minimize toxic black carbon and ultra fine PM2.5 inhalation during daily work or school transit.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-6">
        {transitModes.map((mode) => {
          const isSelected = selectedTransit === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => setSelectedTransit(mode.id)}
              className={`p-3.5 rounded-xl border flex flex-col items-center text-center transition ${
                isSelected
                  ? "bg-teal-50 dark:bg-teal-950/40 border-teal-500 ring-2 ring-teal-500/30 text-teal-900 dark:text-teal-200"
                  : "bg-slate-50/50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
              aria-pressed={isSelected}
            >
              <div
                className={`p-2 rounded-lg mb-2 ${
                  isSelected
                    ? "bg-teal-600 text-white"
                    : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                }`}
              >
                {mode.icon}
              </div>
              <span className="text-xs font-semibold leading-tight">{mode.name}</span>
            </button>
          );
        })}
      </div>

      <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-700">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
              Evaluated Transit Mode
            </span>
            <span className="text-lg font-bold text-slate-900 dark:text-white">
              {currentMode.name}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-[11px] text-slate-500 block">Exposure Burden</span>
              <span
                className={`text-sm font-bold ${
                  currentMode.riskLabel === "Minimal"
                    ? "text-emerald-600"
                    : currentMode.riskLabel === "Low"
                    ? "text-teal-600"
                    : currentMode.riskLabel === "Moderate"
                    ? "text-amber-600"
                    : "text-red-600"
                }`}
              >
                {currentMode.riskLabel} Risk
              </span>
            </div>

            <div className="px-3.5 py-1.5 rounded-lg bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 text-xs font-extrabold">
              {currentMode.exposureReductionPercent}% Particulate Shield
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
            <span>Relative Respiratory Protection Index</span>
            <span>{currentMode.exposureReductionPercent} / 100</span>
          </div>
          <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                currentMode.exposureReductionPercent >= 70
                  ? "bg-emerald-500"
                  : currentMode.exposureReductionPercent >= 40
                  ? "bg-teal-500"
                  : "bg-red-500"
              }`}
              style={{ width: `${currentMode.exposureReductionPercent}%` }}
            />
          </div>
        </div>

        <p className="mt-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900/60 p-3.5 rounded-lg border border-slate-200 dark:border-slate-800">
          <strong>Transit Health Advisory:</strong> {currentMode.advice}
        </p>
      </div>
    </div>
  );
};
