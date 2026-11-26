export type AqiCategory =
  | "Good"
  | "Moderate"
  | "Poor"
  | "Very Poor"
  | "Severe";

export interface AirQualityMetrics {
  aqi: number;
  category: AqiCategory;
  pm25: number;
  pm10: number;
  no2: number;
  o3: number;
  so2?: number;
  co?: number;
  timestamp: string;
  source: string;
}

export interface HourlyForecastItem {
  hour: string;
  timeLabel: string;
  aqi: number;
  category: AqiCategory;
  pm25: number;
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
