import { useState, useCallback } from "react";
import { PersonaType, PersonalizedRoutinePlan } from "@/types/persona";
import { AirQualityMetrics, HourlyForecastItem } from "@/types/air-quality";
import { generateDeterministicPlan } from "@/lib/persona-engine";
import { getFallbackAirQuality } from "@/lib/air-quality-api";

export function useRoutinePlan(initialPersona: PersonaType = "child_asthma") {
  const [plan, setPlan] = useState<PersonalizedRoutinePlan>(
    generateDeterministicPlan(
      initialPersona,
      getFallbackAirQuality().current,
      getFallbackAirQuality().hourly
    )
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchRoutinePlan = useCallback(
    async (
      persona: PersonaType,
      curMetrics: AirQualityMetrics,
      curHourly: HourlyForecastItem[]
    ) => {
      setIsLoading(true);
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
        if (!res.ok) throw new Error("Plan generation endpoint returned error");
        const data = await res.json();
        setPlan(data);
      } catch {
        const deterministic = generateDeterministicPlan(persona, curMetrics, curHourly);
        setPlan(deterministic);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    plan,
    isLoading,
    fetchRoutinePlan,
  };
}
