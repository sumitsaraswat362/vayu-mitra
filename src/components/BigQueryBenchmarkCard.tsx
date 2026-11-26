import React from "react";
import { Database, TrendingUp, Cloud, History, ShieldAlert } from "lucide-react";
import { getBigQueryAtmosphericBenchmark, getGoogleCloudEnvironment } from "@/lib/google-cloud";

interface BigQueryBenchmarkCardProps {
  cityName: string;
}

export const BigQueryBenchmarkCard: React.FC<BigQueryBenchmarkCardProps> = ({ cityName }) => {
  const benchmark = getBigQueryAtmosphericBenchmark(cityName);
  const cloudEnv = getGoogleCloudEnvironment();

  return (
    <section className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-teal-600" aria-hidden="true" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Google Cloud BigQuery 10-Year Atmospheric Baseline
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Calibrated against BigQuery Public Atmospheric Datasets ({cloudEnv.bigQueryDataset}).
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-[11px] font-bold text-teal-700 dark:text-teal-300">
          <Cloud className="w-3.5 h-3.5" aria-hidden="true" />
          <span>GCP Vertex AI &amp; Cloud Run</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-4">
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] text-slate-500 uppercase font-semibold block">
            10-Year PM2.5 Baseline
          </span>
          <span className="text-xl font-bold text-slate-900 dark:text-white mt-1 block">
            {benchmark.decadeAveragePm25} <span className="text-xs font-normal text-slate-500">ug/m3</span>
          </span>
          <span className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 block">
            Indo-Gangetic decadal mean
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] text-slate-500 uppercase font-semibold block">
            Decadal Inversion Rate
          </span>
          <span className="text-xl font-bold text-amber-600 dark:text-amber-400 mt-1 block">
            {benchmark.inversionFrequencyPercent}%
          </span>
          <span className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 block">
            Winter nights with trapped smog
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] text-slate-500 uppercase font-semibold block">
            Severe Exceedance Days
          </span>
          <span className="text-xl font-bold text-red-600 dark:text-red-400 mt-1 block">
            {benchmark.historicalExceedanceDays} Days
          </span>
          <span className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 block">
            Exceeding WHO standards/year
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] text-slate-500 uppercase font-semibold block">
            Regional Smog Trend
          </span>
          <span
            className={`text-xl font-bold mt-1 block ${
              benchmark.tenYearTrend === "Deteriorating"
                ? "text-red-600 dark:text-red-400"
                : benchmark.tenYearTrend === "Stable"
                ? "text-amber-600 dark:text-amber-400"
                : "text-emerald-600 dark:text-emerald-400"
            }`}
          >
            {benchmark.tenYearTrend}
          </span>
          <span className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 block">
            Satellite aerosol optical depth
          </span>
        </div>
      </div>

      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex items-start gap-3">
        <History className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" aria-hidden="true" />
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <strong>BigQuery Longitudinal Insight:</strong> Winter inversion severity in {cityName} has clustered heavily between November 10 and January 31 over the past decade. Nocturnal ground cooling creates stable boundary layers under 100 meters, trapping stubble soot and vehicular particulate matter until solar radiation initiates vertical mixing post-midday.
        </p>
      </div>
    </section>
  );
};
