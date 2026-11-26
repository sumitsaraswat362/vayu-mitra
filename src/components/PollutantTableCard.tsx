import React from "react";
import { AirQualityMetrics } from "@/types/air-quality";
import { Table, ShieldCheck, AlertCircle } from "lucide-react";

interface PollutantTableCardProps {
  metrics: AirQualityMetrics;
}

export const PollutantTableCard: React.FC<PollutantTableCardProps> = ({
  metrics,
}) => {
  const pollutantRows = [
    {
      name: "Fine Particulate Matter (PM2.5)",
      formula: "PM2.5",
      observed: `${metrics.pm25} ug/m3`,
      whoLimit: "15 ug/m3",
      cpcbLimit: "60 ug/m3",
      ratio: (metrics.pm25 / 15).toFixed(1),
      danger: metrics.pm25 > 60,
      healthImpact:
        "Penetrates deep into alveolar capillaries, causing systemic inflammation.",
    },
    {
      name: "Coarse Particulate Matter (PM10)",
      formula: "PM10",
      observed: `${metrics.pm10} ug/m3`,
      whoLimit: "45 ug/m3",
      cpcbLimit: "100 ug/m3",
      ratio: (metrics.pm10 / 45).toFixed(1),
      danger: metrics.pm10 > 100,
      healthImpact:
        "Irritates upper airways, triggers acute coughing, rhinitis, and asthma.",
    },
    {
      name: "Nitrogen Dioxide (NO2)",
      formula: "NO2",
      observed: `${metrics.no2} ug/m3`,
      whoLimit: "25 ug/m3",
      cpcbLimit: "80 ug/m3",
      ratio: (metrics.no2 / 25).toFixed(1),
      danger: metrics.no2 > 80,
      healthImpact:
        "Forms secondary nitrate aerosols and deepens bronchial responsiveness.",
    },
    {
      name: "Surface Ozone (O3)",
      formula: "O3",
      observed: `${metrics.o3} ug/m3`,
      whoLimit: "100 ug/m3",
      cpcbLimit: "100 ug/m3",
      ratio: (metrics.o3 / 100).toFixed(1),
      danger: metrics.o3 > 100,
      healthImpact:
        "Strong photochemical oxidant that corrodes delicate lung mucous lining.",
    },
  ];

  return (
    <section className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="flex items-center gap-2 mb-2">
        <Table className="w-5 h-5 text-teal-600" aria-hidden="true" />
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Pollutant Concentration vs Statutory Safety Benchmarks
        </h2>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
        Rigorous comparison of observed atmospheric concentrations against World
        Health Organization (WHO 2021) and Indian National Ambient Air Quality
        Standards (CPCB NAAQS 24-Hour Limits).
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300 border-collapse">
          <caption className="sr-only">
            Atmospheric pollutant concentration compared against WHO and CPCB
            24-hour safe limits
          </caption>
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
              <th
                scope="col"
                className="py-3 px-3.5 font-bold text-slate-900 dark:text-white"
              >
                Pollutant Parameter
              </th>
              <th
                scope="col"
                className="py-3 px-3 font-bold text-slate-900 dark:text-white"
              >
                Observed Value
              </th>
              <th
                scope="col"
                className="py-3 px-3 font-bold text-slate-900 dark:text-white"
              >
                WHO 24h Limit
              </th>
              <th
                scope="col"
                className="py-3 px-3 font-bold text-slate-900 dark:text-white"
              >
                CPCB NAAQS Limit
              </th>
              <th
                scope="col"
                className="py-3 px-3 font-bold text-slate-900 dark:text-white"
              >
                WHO Multiple
              </th>
              <th
                scope="col"
                className="py-3 px-3.5 font-bold text-slate-900 dark:text-white hidden md:table-cell"
              >
                Primary Pathophysiological Impact
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {pollutantRows.map((row) => (
              <tr
                key={row.formula}
                className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition"
              >
                <th
                  scope="row"
                  className="py-3 px-3.5 font-semibold text-slate-900 dark:text-slate-200"
                >
                  {row.name}
                </th>
                <td className="py-3 px-3 font-mono font-bold text-slate-900 dark:text-white">
                  {row.observed}
                </td>
                <td className="py-3 px-3 text-slate-500 font-mono">
                  {row.whoLimit}
                </td>
                <td className="py-3 px-3 text-slate-500 font-mono">
                  {row.cpcbLimit}
                </td>
                <td className="py-3 px-3 font-bold">
                  {row.danger ? (
                    <span className="inline-flex items-center gap-1 text-red-600 dark:text-red-400">
                      <AlertCircle
                        className="w-3.5 h-3.5 shrink-0"
                        aria-hidden="true"
                      />
                      {row.ratio}x
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                      <ShieldCheck
                        className="w-3.5 h-3.5 shrink-0"
                        aria-hidden="true"
                      />
                      {row.ratio}x
                    </span>
                  )}
                </td>
                <td className="py-3 px-3.5 text-slate-600 dark:text-slate-400 hidden md:table-cell">
                  {row.healthImpact}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
