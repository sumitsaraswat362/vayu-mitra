"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { HeroCitySearch } from "@/components/HeroCitySearch";
import { AqiOverviewCard } from "@/components/AqiOverviewCard";
import { BigQueryBenchmarkCard } from "@/components/BigQueryBenchmarkCard";
import { GrapProtocolCard } from "@/components/GrapProtocolCard";
import { PollutantTableCard } from "@/components/PollutantTableCard";
import { PersonaSelector } from "@/components/PersonaSelector";
import { HourlyRoutineTimeline } from "@/components/HourlyRoutineTimeline";
import { AiRoutinePlanCard } from "@/components/AiRoutinePlanCard";
import { IndoorAirCard } from "@/components/IndoorAirCard";
import { CleanAirRoutePlanner } from "@/components/CleanAirRoutePlanner";
import { CITY_PRESETS } from "@/lib/constants";
import { useAirQuality } from "@/hooks/useAirQuality";
import { useRoutinePlan } from "@/hooks/useRoutinePlan";
import { CityPreset } from "@/types/air-quality";
import { PersonaType } from "@/types/persona";
import { RefreshCw, AlertCircle } from "lucide-react";

export default function HomePage() {
  const [selectedCity, setSelectedCity] = useState<CityPreset>(CITY_PRESETS[0]);
  const [selectedPersona, setSelectedPersona] =
    useState<PersonaType>("child_asthma");

  const {
    metrics,
    hourly,
    isLoading: isLoadingAqi,
    error: errorMessage,
    announcement: statusAnnouncement,
    setError,
    setAnnouncement,
    fetchAqiData,
  } = useAirQuality(selectedCity);

  const {
    plan,
    isLoading: isLoadingPlan,
    fetchRoutinePlan,
  } = useRoutinePlan(selectedPersona);

  useEffect(() => {
    let isMounted = true;
    fetchAqiData(selectedCity).then((data) => {
      if (isMounted && data) {
        fetchRoutinePlan(selectedPersona, data.current, data.hourly);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [selectedCity, fetchAqiData, fetchRoutinePlan, selectedPersona]);

  const handleCityChange = (city: CityPreset) => {
    setSelectedCity(city);
  };

  const handlePersonaChange = (personaId: PersonaType) => {
    setSelectedPersona(personaId);
    fetchRoutinePlan(personaId, metrics, hourly);
  };

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    setAnnouncement(
      "Detecting local geographical coordinates via browser geolocation."
    );
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const detectedCity: CityPreset = {
          name: "My Local Coordinates",
          state: "Detected Location",
          lat: parseFloat(pos.coords.latitude.toFixed(4)),
          lon: parseFloat(pos.coords.longitude.toFixed(4)),
          isHighSmogZone: false,
        };
        setSelectedCity(detectedCity);
      },
      () => {
        setError(
          "Unable to retrieve location. Please select a city from the list."
        );
      }
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Header
        currentAqi={metrics.cpcbAqi || metrics.aqi}
        cityName={selectedCity.name}
      />

      {/* Screen Reader Live Region */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {statusAnnouncement}
      </div>

      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 focus:outline-none"
      >
        <HeroCitySearch
          selectedCity={selectedCity}
          onSelectCity={handleCityChange}
          onUseGeolocation={handleGeolocation}
          isLoading={isLoadingAqi}
        />

        {errorMessage && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
            <div
              role="alert"
              className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-300 flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{errorMessage}</span>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Atmospheric Dynamics and Telemetry
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Calibrated against WHO Global Air Quality Guidelines and Indian
                CPCB NAAQS standards.
              </p>
            </div>
            <button
              type="button"
              onClick={() => fetchAqiData(selectedCity)}
              disabled={isLoadingAqi}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition shadow-sm min-h-[44px]"
              aria-label="Refresh Air Quality Telemetry"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${isLoadingAqi ? "animate-spin" : ""}`}
                aria-hidden="true"
              />
              <span>Refresh Telemetry</span>
            </button>
          </div>

          <AqiOverviewCard metrics={metrics} cityName={selectedCity.name} />

          <BigQueryBenchmarkCard cityName={selectedCity.name} />

          <GrapProtocolCard aqi={metrics.cpcbAqi || metrics.aqi} />

          <PollutantTableCard metrics={metrics} />

          <PersonaSelector
            selectedPersona={selectedPersona}
            onSelectPersona={handlePersonaChange}
          />

          <AiRoutinePlanCard
            plan={plan}
            isLoading={isLoadingPlan}
            cityName={selectedCity.name}
            aqi={metrics.cpcbAqi || metrics.aqi}
          />

          <HourlyRoutineTimeline hourly={hourly} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <IndoorAirCard />
            <CleanAirRoutePlanner />
          </div>
        </div>
      </main>

      <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-8 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700 dark:text-slate-300">
              Vayu-Mitra
            </span>
            <span>&bull;</span>
            <span>Urban Winter Smog and Air Quality Resilience Assistant</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Google Cloud Vertex AI &amp; BigQuery</span>
            <span>Open-Meteo Satellite Feed</span>
            <span>WHO 2021 &amp; CPCB Compliant</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
