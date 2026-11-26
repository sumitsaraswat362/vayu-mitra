export type AqiCategory =
  | "Good"
  | "Moderate"
  | "Poor"
  | "Very Poor"
  | "Severe";

export type CpcbCategory =
  | "Good"
  | "Satisfactory"
  | "Moderate"
  | "Poor"
  | "Very Poor"
  | "Severe";

export interface MeteorologicalMetrics {
  temperature: number; // Celsius
  humidity: number; // Percentage
  windSpeed: number; // km/h
  windDirection: number; // degrees
  isWindStagnant: boolean; // Wind < 5 km/h traps surface particulates
  dispersionIndex: "Optimal" | "Moderate" | "Stagnant (Trap Zone)";
}

export interface AirQualityMetrics {
  aqi: number; // US EPA standard index
  category: AqiCategory;
  cpcbAqi: number; // Indian National CPCB standard index
  cpcbCategory: CpcbCategory;
  pm25: number;
  pm10: number;
  no2: number;
  o3: number;
  so2: number;
  co: number;
  weather: MeteorologicalMetrics;
  timestamp: string;
  source: string;
}

export interface HourlyForecastItem {
  hour: string;
  timeLabel: string;
  aqi: number;
  category: AqiCategory;
  pm25: number;
  pm10: number;
  isSafeForOutdoor: boolean;
  isInversionPeak: boolean;
}

export interface CityPreset {
  name: string;
  state: string;
  lat: number;
  lon: number;
  isHighSmogZone: boolean;
}

export interface GeocodingResult {
  id: number;
  name: string;
  state: string;
  country: string;
  lat: number;
  lon: number;
}
