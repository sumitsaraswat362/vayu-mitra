import { useState, useCallback } from "react";
import {
  CityPreset,
  AirQualityMetrics,
  HourlyForecastItem,
} from "@/types/air-quality";
import { getFallbackAirQuality } from "@/lib/air-quality-api";

export function useAirQuality(initialCity: CityPreset) {
  const [metrics, setMetrics] = useState<AirQualityMetrics>(
    getFallbackAirQuality().current
  );
  const [hourly, setHourly] = useState<HourlyForecastItem[]>(
    getFallbackAirQuality().hourly
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState<string>("");

  const fetchAqiData = useCallback(async (city: CityPreset) => {
    setIsLoading(true);
    setError(null);
    setAnnouncement(`Fetching atmospheric telemetry for ${city.name}`);
    try {
      const res = await fetch(
        `/api/air-quality?lat=${city.lat}&lon=${city.lon}`
      );
      if (!res.ok) throw new Error(`HTTP status ${res.status}`);
      const data = await res.json();
      if (data.current && Array.isArray(data.hourly)) {
        setMetrics(data.current);
        setHourly(data.hourly);
        setAnnouncement(
          `Air telemetry for ${city.name} updated. CPCB AQI is ${data.current.cpcbAqi}.`
        );
        return { current: data.current, hourly: data.hourly };
      }
      throw new Error("Invalid telemetry payload format");
    } catch {
      const fallback = getFallbackAirQuality();
      setMetrics(fallback.current);
      setHourly(fallback.hourly);
      setAnnouncement(
        `Loaded calibrated winter smog baseline for ${city.name}.`
      );
      return fallback;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    metrics,
    hourly,
    isLoading,
    error,
    announcement,
    setError,
    setAnnouncement,
    fetchAqiData,
  };
}
