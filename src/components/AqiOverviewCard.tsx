import React from "react";
import { AirQualityMetrics } from "@/types/air-quality";
import { AQI_LEVELS, WHO_GUIDELINES } from "@/lib/constants";
import { Activity, AlertCircle, Droplets, Gauge } from "lucide-react";

interface AqiOverviewCardProps {
  metrics: AirQualityMetrics;
  cityName: string;
}

export const AqiOverviewCard: React.FC<AqiOverviewCardProps> = ({ metrics, cityName }) => {
  const meta = AQI_LEVELS[metrics.category] ?? AQI_LEVELS["Moderate"];

  const pm25Ratio = (metrics.pm25 / WHO_GUIDELINES.pm25Daily).toFixed(1);
  const pm10Ratio = (metrics.pm10 / WHO_GUIDELINES.pm10Daily).toFixed(1);

  return (
    <div className={`p-6 rounded-2xl border ${meta.borderColor} ${meta.bgColor} transition-all`}>
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <Gauge className="w-5 h-5 text-slate-700 dark:text-slate-300" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Live Air Quality Status for {cityName}
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-3">
            <span className="text-5xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
              {metrics.aqi}
            </span>
            <div>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white ${meta.badgeColor}`}>
                {metrics.category}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
                AQI Index (US EPA Standards)
              </span>
            </div>
          </div>
          <p className="mt-3 text-sm font-medium text-slate-700 dark:text-slate-300 max-w-xl">
            {meta.summary}
          </p>
        </div>

        <div className="w-full lg:w-auto grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">PM2.5</span>
              <Activity className="w-3.5 h-3.5 text-red-500" aria-hidden="true" />
            </div>
            <div className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
              {metrics.pm25} <span className="text-[10px] font-normal text-slate-500">ug/m3</span>
            </div>
            <div className="mt-1 text-[11px] text-red-600 dark:text-red-400 font-medium">
              {pm25Ratio}x WHO 24h limit
            </div>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">PM10</span>
              <Activity className="w-3.5 h-3.5 text-amber-500" aria-hidden="true" />
            </div>
            <div className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
              {metrics.pm10} <span className="text-[10px] font-normal text-slate-500">ug/m3</span>
            </div>
            <div className="mt-1 text-[11px] text-amber-600 dark:text-amber-400 font-medium">
              {pm10Ratio}x WHO 24h limit
            </div>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">NO2</span>
              <Droplets className="w-3.5 h-3.5 text-blue-500" aria-hidden="true" />
            </div>
            <div className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
              {metrics.no2} <span className="text-[10px] font-normal text-slate-500">ug/m3</span>
            </div>
            <div className="mt-1 text-[11px] text-slate-500 font-medium">
              Traffic emission index
            </div>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">Ozone (O3)</span>
              <AlertCircle className="w-3.5 h-3.5 text-teal-500" aria-hidden="true" />
            </div>
            <div className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
              {metrics.o3} <span className="text-[10px] font-normal text-slate-500">ug/m3</span>
            </div>
            <div className="mt-1 text-[11px] text-slate-500 font-medium">
              Photochemical oxidant
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>Source: {metrics.source}</span>
        <span>Updated: {new Date(metrics.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
      </div>
    </div>
  );
};
