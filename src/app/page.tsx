"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Header } from "@/components/Header";
import { HeroCitySearch } from "@/components/HeroCitySearch";
import { AqiOverviewCard } from "@/components/AqiOverviewCard";
import { PersonaSelector } from "@/components/PersonaSelector";
import { HourlyRoutineTimeline } from "@/components/HourlyRoutineTimeline";
import { AiRoutinePlanCard } from "@/components/AiRoutinePlanCard";
import { IndoorAirCard } from "@/components/IndoorAirCard";
import { CleanAirRoutePlanner } from "@/components/CleanAirRoutePlanner";
import { CITY_PRESETS } from "@/lib/constants";
import { getFallbackAirQuality } from "@/lib/air-quality-api";
import { generateDeterministicPlan } from "@/lib/persona-engine";
import { CityPreset, AirQualityMetrics, HourlyForecastItem } from "@/types/air-quality";
import { PersonaType, PersonalizedRoutinePlan } from "@/types/persona";
import { RefreshCw, Sparkles, AlertCircle } from "lucide-react";

export default function HomePage() {
  const [selectedCity, setSelectedCity] = useState<CityPreset>(CITY_PRESETS[0]);
  const [selectedPersona, setSelectedPersona] = useState<PersonaType>("child_asthma");
  const [metrics, setMetrics] = useState<AirQualityMetrics>(getFallbackAirQuality().current);
  const [hourly, setHourly] = useState<HourlyForecastItem[]>(getFallbackAirQuality().hourly);
  const [plan, setPlan] = useState<PersonalizedRoutinePlan>(
    generateDeterministicPlan("child_asthma", getFallbackAirQuality().current, getFallbackAirQuality().hourly)
  );
  const [isLoadingAqi, setIsLoadingAqi] = useState<boolean>(false);
  const [isLoadingPlan, setIsLoadingPlan] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchAqiData = useCallback(async (city: CityPreset) => {
    setIsLoadingAqi(true);
    setErrorMessage(null);
    try {
      const res = await fetch(`/api/air-quality?lat=${city.lat}&lon=${city.lon}`);
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      if (data.current && Array.isArray(data.hourly)) {
        setMetrics(data.current);
        setHourly(data.hourly);
        return { current: data.current, hourly: data.hourly };
      }
      throw new Error("Invalid response format");
    } catch {
      const fallback = getFallbackAirQuality();
      setMetrics(fallback.current);
      setHourly(fallback.hourly);
      return fallback;
    } finally {
      setIsLoadingAqi(false);
    }
  }, []);

  const fetchRoutinePlan = useCallback(
    async (
      persona: PersonaType,
      curMetrics: AirQualityMetrics,
      curHourly: HourlyForecastItem[]
    ) => {
      setIsLoadingPlan(true);
      try {
        const res = await fetch("/api/ai/routine", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            personaId: persona,
            current: curMetrics,
            hourly: curHourly,
          }),
        });
        if (!res.ok) throw new Error("Plan generation failed");
        const data = await res.json();
        setPlan(data);
      } catch {
        const deterministic = generateDeterministicPlan(persona, curMetrics, curHourly);
        setPlan(deterministic);
      } finally {
        setIsLoadingPlan(false);
      }
    },
    []
  );

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
      setErrorMessage("Geolocation is not supported by your browser.");
      return;
    }
    setIsLoadingAqi(true);
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
        setErrorMessage("Unable to retrieve location. Please select a city from the list.");
        setIsLoadingAqi(false);
      }
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Header currentAqi={metrics.aqi} cityName={selectedCity.name} />

      <main className="flex-1">
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
              className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-300 flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{errorMessage}</span>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Live Air Quality Dashboard
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Calibrated against WHO particulate thresholds and CPCB air quality indices.
              </p>
            </div>
            <button
              onClick={() => fetchAqiData(selectedCity)}
              disabled={isLoadingAqi}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 text-slate-700 dark:text-slate-300 transition"
              aria-label="Refresh Air Quality Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingAqi ? "animate-spin" : ""}`} aria-hidden="true" />
              <span>Refresh</span>
            </button>
          </div>

          <AqiOverviewCard metrics={metrics} cityName={selectedCity.name} />

          <PersonaSelector
            selectedPersona={selectedPersona}
            onSelectPersona={handlePersonaChange}
          />

          <AiRoutinePlanCard plan={plan} isLoading={isLoadingPlan} />

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
            <span className="font-bold text-slate-700 dark:text-slate-300">Vayu-Mitra</span>
            <span>&bull;</span>
            <span>Winter Smog and Air Quality Resilience Assistant</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Built for Urban Air Resilience</span>
            <span>Open-Meteo &amp; CPCB Feeds</span>
            <span>WHO Guideline Compliant</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
