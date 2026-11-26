import React, { useState } from "react";
import { AirQualityMetrics } from "@/types/air-quality";
import {
  AQI_LEVELS,
  WHO_GUIDELINES,
  CPCB_NAAQS_GUIDELINES,
} from "@/lib/constants";
import {
  Activity,
  AlertCircle,
  Droplets,
  Gauge,
  Wind,
  Thermometer,
  ShieldCheck,
} from "lucide-react";

interface AqiOverviewCardProps {
  metrics: AirQualityMetrics;
  cityName: string;
}

export const AqiOverviewCard: React.FC<AqiOverviewCardProps> = ({
  metrics,
  cityName,
}) => {
  const [standard, setStandard] = useState<"cpcb" | "usepa">("cpcb");
  const meta = AQI_LEVELS[metrics.category] ?? AQI_LEVELS["Moderate"];

  const displayAqi = standard === "cpcb" ? metrics.cpcbAqi : metrics.aqi;
  const displayCategory =
    standard === "cpcb" ? metrics.cpcbCategory : metrics.category;

  const pm25RatioWho = (metrics.pm25 / WHO_GUIDELINES.pm25Daily).toFixed(1);
  const pm10RatioWho = (metrics.pm10 / WHO_GUIDELINES.pm10Daily).toFixed(1);

  return (
    <section
      className={`p-6 rounded-2xl border ${meta.borderColor} ${meta.bgColor} transition-all`}
    >
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <Gauge
              className="w-5 h-5 text-slate-700 dark:text-slate-300"
              aria-hidden="true"
            />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Atmospheric Air Quality &amp; Dispersion for {cityName}
            </h2>
          </div>

          <div className="mt-3 flex flex-wrap items-baseline gap-4">
            <span className="text-5xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
              {displayAqi}
            </span>

            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white ${meta.badgeColor}`}
                >
                  {displayCategory}
                </span>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                  {standard === "cpcb"
                    ? "Indian CPCB Standard"
                    : "US EPA Standard"}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-xs">
                <button
                  onClick={() => setStandard("cpcb")}
                  className={`px-2.5 py-1 rounded-md font-semibold text-[11px] transition ${
                    standard === "cpcb"
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm"
                      : "bg-white/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700"
                  }`}
                  aria-pressed={standard === "cpcb"}
                >
                  CPCB NAAQS
                </button>
                <button
                  onClick={() => setStandard("usepa")}
                  className={`px-2.5 py-1 rounded-md font-semibold text-[11px] transition ${
                    standard === "usepa"
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm"
                      : "bg-white/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700"
                  }`}
                  aria-pressed={standard === "usepa"}
                >
                  US EPA Scale
                </button>
              </div>
            </div>
          </div>

          <p className="mt-3 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 max-w-xl">
            {meta.summary}
          </p>
        </div>

        {/* Live Meteorology and Inversion Indicators */}
        <div className="w-full lg:w-auto bg-white/90 dark:bg-slate-900/90 backdrop-blur p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Wind className="w-4 h-4 text-teal-600" aria-hidden="true" />
              Boundary Layer Meteorology
            </span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                metrics.weather.isWindStagnant
                  ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                  : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
              }`}
            >
              {metrics.weather.dispersionIndex}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60">
              <span className="text-[10px] text-slate-500 block">
                Temperature
              </span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                {metrics.weather.temperature} &deg;C
              </span>
            </div>

            <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60">
              <span className="text-[10px] text-slate-500 block">Humidity</span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                {metrics.weather.humidity}%
              </span>
            </div>

            <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60">
              <span className="text-[10px] text-slate-500 block">
                Wind Velocity
              </span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                {metrics.weather.windSpeed} km/h
              </span>
            </div>
          </div>

          {metrics.weather.isWindStagnant && (
            <p className="text-[11px] text-red-700 dark:text-red-400 font-medium">
              Stagnant wind (&lt; 5 km/h) prevents atmospheric ventilation. Smog
              remains locked in ground air column.
            </p>
          )}
        </div>
      </div>

      {/* Pollutant Metric Grid */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur p-3 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold">PM2.5</span>
            <Activity className="w-3.5 h-3.5 text-red-500" aria-hidden="true" />
          </div>
          <div className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
            {metrics.pm25}{" "}
            <span className="text-[10px] font-normal text-slate-500">
              ug/m3
            </span>
          </div>
          <div className="mt-0.5 text-[10px] text-red-600 dark:text-red-400 font-bold">
            {pm25RatioWho}x WHO Limit
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur p-3 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold">PM10</span>
            <Activity
              className="w-3.5 h-3.5 text-amber-500"
              aria-hidden="true"
            />
          </div>
          <div className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
            {metrics.pm10}{" "}
            <span className="text-[10px] font-normal text-slate-500">
              ug/m3
            </span>
          </div>
          <div className="mt-0.5 text-[10px] text-amber-600 dark:text-amber-400 font-bold">
            {pm10RatioWho}x WHO Limit
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur p-3 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold">NO2</span>
            <Droplets
              className="w-3.5 h-3.5 text-blue-500"
              aria-hidden="true"
            />
          </div>
          <div className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
            {metrics.no2}{" "}
            <span className="text-[10px] font-normal text-slate-500">
              ug/m3
            </span>
          </div>
          <div className="mt-0.5 text-[10px] text-slate-500 font-medium">
            Traffic Emitted
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur p-3 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold">
              Ozone (O3)
            </span>
            <AlertCircle
              className="w-3.5 h-3.5 text-teal-500"
              aria-hidden="true"
            />
          </div>
          <div className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
            {metrics.o3}{" "}
            <span className="text-[10px] font-normal text-slate-500">
              ug/m3
            </span>
          </div>
          <div className="mt-0.5 text-[10px] text-slate-500 font-medium">
            Photochemical
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur p-3 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold">SO2</span>
            <AlertCircle
              className="w-3.5 h-3.5 text-purple-500"
              aria-hidden="true"
            />
          </div>
          <div className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
            {metrics.so2}{" "}
            <span className="text-[10px] font-normal text-slate-500">
              ug/m3
            </span>
          </div>
          <div className="mt-0.5 text-[10px] text-slate-500 font-medium">
            Industrial Gas
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur p-3 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold">CO</span>
            <Droplets
              className="w-3.5 h-3.5 text-slate-500"
              aria-hidden="true"
            />
          </div>
          <div className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
            {metrics.co}{" "}
            <span className="text-[10px] font-normal text-slate-500">
              ug/m3
            </span>
          </div>
          <div className="mt-0.5 text-[10px] text-slate-500 font-medium">
            Incomplete Burn
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
        <span>Source: {metrics.source}</span>
        <span>
          Telemetry Timestamp:{" "}
          {new Date(metrics.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </section>
  );
};
