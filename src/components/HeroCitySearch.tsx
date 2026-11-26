import React from "react";
import { MapPin, Navigation, Flame } from "lucide-react";
import { CityPreset } from "@/types/air-quality";
import { CITY_PRESETS } from "@/lib/constants";

interface HeroCitySearchProps {
  selectedCity: CityPreset;
  onSelectCity: (city: CityPreset) => void;
  onUseGeolocation: () => void;
  isLoading: boolean;
}

export const HeroCitySearch: React.FC<HeroCitySearchProps> = ({
  selectedCity,
  onSelectCity,
  onUseGeolocation,
  isLoading,
}) => {
  return (
    <section className="bg-gradient-to-b from-teal-50/60 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 py-8 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 mb-3">
            <Flame className="w-3.5 h-3.5 text-amber-600" aria-hidden="true" />
            Active Winter Smog and Crop Stubble Burning Mitigation
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Personalized Daily Routines for Peak Smog Resilience
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Real time atmospheric particulate tracking, morning inversion avoidance schedules, and tailored protection for sensitive respiratory groups.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
          <button
            onClick={onUseGeolocation}
            disabled={isLoading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-medium text-sm shadow-sm transition disabled:opacity-50"
            aria-label="Use Current Location Geolocation"
          >
            <Navigation className="w-4 h-4" aria-hidden="true" />
            <span>Detect My Current Location</span>
          </button>
        </div>

        <div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider text-center mb-2">
            Select Indian Smog Corridor or Metropolis:
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {CITY_PRESETS.map((city) => {
              const isSelected = selectedCity.name === city.name;
              return (
                <button
                  key={city.name}
                  onClick={() => onSelectCity(city)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition ${
                    isSelected
                      ? "bg-teal-700 text-white shadow-sm ring-2 ring-teal-500"
                      : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
                  }`}
                  aria-pressed={isSelected}
                >
                  <MapPin className="w-3.5 h-3.5 text-teal-500" aria-hidden="true" />
                  <span>{city.name}</span>
                  {city.isHighSmogZone && (
                    <span
                      title="High Winter Smog Trap Zone"
                      className="w-2 h-2 rounded-full bg-red-500 inline-block"
                      aria-label="High Smog Warning"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
