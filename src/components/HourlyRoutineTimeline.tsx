import React from "react";
import { HourlyForecastItem } from "@/types/air-quality";
import { AQI_LEVELS } from "@/lib/constants";
import { Clock, Sun, Moon, Info } from "lucide-react";

interface HourlyRoutineTimelineProps {
  hourly: HourlyForecastItem[];
}

export const HourlyRoutineTimeline: React.FC<HourlyRoutineTimelineProps> = ({
  hourly,
}) => {
  return (
    <section className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-teal-600" aria-hidden="true" />
            24 Hour Atmospheric Smog and Inversion Timeline
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Hour-by-hour forecast showing diurnal boundary layer trapping versus
            afternoon dispersion windows.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-red-500 inline-block" />
            <span className="text-slate-600 dark:text-slate-400">
              Inversion Trap (Avoid)
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-500 inline-block" />
            <span className="text-slate-600 dark:text-slate-400">
              Solar Dispersion (Safe)
            </span>
          </div>
        </div>
      </div>

      {/* Accessible data table for screen readers */}
      <table className="sr-only">
        <caption>24-Hour Atmospheric Smog and Inversion Forecast</caption>
        <thead>
          <tr>
            <th scope="col">Hour</th>
            <th scope="col">AQI</th>
            <th scope="col">PM2.5 (ug/m3)</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {hourly.slice(0, 24).map((item) => (
            <tr key={`sr-${item.hour}`}>
              <th scope="row">{item.timeLabel}</th>
              <td>{item.aqi}</td>
              <td>{item.pm25}</td>
              <td>
                {item.isSafeForOutdoor
                  ? "Safe outdoor window"
                  : "Inversion peak trap"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Visual Timeline Grid */}
      <div className="overflow-x-auto pb-2 scrollbar-thin" aria-hidden="true">
        <div className="min-w-[760px] grid grid-cols-24 gap-1.5 pt-2">
          {hourly.slice(0, 24).map((item) => {
            const level = AQI_LEVELS[item.category] ?? AQI_LEVELS["Moderate"];
            const isNight = item.isInversionPeak;

            return (
              <div
                key={item.hour}
                className={`flex flex-col items-center justify-between p-2 rounded-lg border text-center transition ${
                  isNight
                    ? "bg-slate-100/90 dark:bg-slate-800/80 border-red-300 dark:border-red-900"
                    : "bg-white dark:bg-slate-800/40 border-emerald-300 dark:border-emerald-900"
                }`}
              >
                <div className="flex items-center justify-center text-slate-500 mb-1">
                  {isNight ? (
                    <Moon
                      className="w-3 h-3 text-indigo-400"
                      aria-hidden="true"
                    />
                  ) : (
                    <Sun
                      className="w-3 h-3 text-amber-500"
                      aria-hidden="true"
                    />
                  )}
                </div>

                <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">
                  {item.timeLabel}
                </span>

                <div
                  className={`my-1.5 w-full py-1 rounded text-white text-[11px] font-black ${level.badgeColor}`}
                  title={`AQI ${item.aqi} - ${item.category}`}
                >
                  {item.aqi}
                </div>

                <span className="text-[9px] text-slate-500 dark:text-slate-400">
                  {item.pm25} <span className="scale-75 inline-block">ug</span>
                </span>

                <div className="mt-1">
                  {item.isSafeForOutdoor ? (
                    <span className="text-[9px] font-semibold text-emerald-600 dark:text-emerald-400">
                      Safe
                    </span>
                  ) : (
                    <span className="text-[9px] font-semibold text-red-600 dark:text-red-400">
                      Peak
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex items-start gap-3">
        <Info
          className="w-4 h-4 text-teal-600 mt-0.5 shrink-0"
          aria-hidden="true"
        />
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <strong>Atmospheric Science Note:</strong> Winter ground cooling
          creates radiation temperature inversions between 9 PM and 9 AM. Cold
          air sinks and caps pollutants near ground level, creating lethal smog
          pockets. The safest outdoor clearance occurs between 1 PM and 4 PM
          when solar warming breaks the inversion cap.
        </p>
      </div>
    </section>
  );
};
