import React from "react";
import {
  Baby,
  HeartPulse,
  Bike,
  Activity,
  Users,
  ShieldAlert,
} from "lucide-react";
import { PersonaType, PersonaProfile } from "@/types/persona";
import { PERSONA_PROFILES } from "@/lib/constants";

interface PersonaSelectorProps {
  selectedPersona: PersonaType;
  onSelectPersona: (id: PersonaType) => void;
}

export const PersonaSelector: React.FC<PersonaSelectorProps> = ({
  selectedPersona,
  onSelectPersona,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Baby":
        return <Baby className="w-5 h-5" aria-hidden="true" />;
      case "HeartPulse":
        return <HeartPulse className="w-5 h-5" aria-hidden="true" />;
      case "Bike":
        return <Bike className="w-5 h-5" aria-hidden="true" />;
      case "Activity":
        return <Activity className="w-5 h-5" aria-hidden="true" />;
      default:
        return <Users className="w-5 h-5" aria-hidden="true" />;
    }
  };

  return (
    <section className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-teal-600" aria-hidden="true" />
            Vulnerable Persona Profile Selection
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Select your health vulnerability profile to receive personalized
            outdoor safety windows and hourly schedules.
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
          5 Tailored Personas
        </span>
      </div>

      <div
        role="radiogroup"
        aria-label="Vulnerable Persona Profiles"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3"
      >
        {PERSONA_PROFILES.map((profile: PersonaProfile) => {
          const isSelected = selectedPersona === profile.id;
          return (
            <button
              type="button"
              role="radio"
              aria-checked={isSelected}
              key={profile.id}
              onClick={() => onSelectPersona(profile.id)}
              className={`text-left p-4 rounded-xl border transition flex flex-col justify-between focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:outline-none min-h-[44px] ${
                isSelected
                  ? "bg-teal-50 dark:bg-teal-950/40 border-teal-500 ring-2 ring-teal-500/30"
                  : "bg-slate-50/50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <div
                    className={`p-2 rounded-lg ${
                      isSelected
                        ? "bg-teal-600 text-white"
                        : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {getIcon(profile.iconName)}
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      profile.riskLevel === "Critical"
                        ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                        : profile.riskLevel === "High"
                          ? "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300"
                          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300"
                    }`}
                  >
                    {profile.riskLevel}
                  </span>
                </div>
                <h3 className="mt-3 font-semibold text-sm text-slate-900 dark:text-white leading-snug">
                  {profile.title}
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {profile.subtitle}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700/60 text-[11px] text-slate-600 dark:text-slate-300">
                Safe PM2.5:{" "}
                <span className="font-semibold text-teal-700 dark:text-teal-400">
                  &lt; {profile.targetThresholdPm25} ug/m3
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
