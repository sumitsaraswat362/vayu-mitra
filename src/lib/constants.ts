import { CityPreset, AqiCategory } from "@/types/air-quality";
import { PersonaProfile } from "@/types/persona";

export const APP_NAME = "Vayu-Mitra";
export const APP_TAGLINE = "Urban Winter Smog and Air Quality Resilience Assistant";

export const CITY_PRESETS: CityPreset[] = [
  {
    name: "New Delhi",
    state: "Delhi NCR",
    lat: 28.6139,
    lon: 77.2090,
    isHighSmogZone: true,
  },
  {
    name: "Noida",
    state: "Uttar Pradesh",
    lat: 28.5355,
    lon: 77.3910,
    isHighSmogZone: true,
  },
  {
    name: "Mathura",
    state: "Uttar Pradesh",
    lat: 27.4924,
    lon: 77.6737,
    isHighSmogZone: true,
  },
  {
    name: "Lucknow",
    state: "Uttar Pradesh",
    lat: 26.8467,
    lon: 80.9462,
    isHighSmogZone: true,
  },
  {
    name: "Mumbai",
    state: "Maharashtra",
    lat: 19.0760,
    lon: 72.8777,
    isHighSmogZone: false,
  },
  {
    name: "Kolkata",
    state: "West Bengal",
    lat: 22.5726,
    lon: 88.3639,
    isHighSmogZone: true,
  },
  {
    name: "Bengaluru",
    state: "Karnataka",
    lat: 12.9716,
    lon: 77.5946,
    isHighSmogZone: false,
  },
];

export const WHO_GUIDELINES = {
  pm25Annual: 5,
  pm25Daily: 15,
  pm10Daily: 45,
  no2Daily: 25,
  o3Daily: 100,
};

export const AQI_LEVELS: Record<
  AqiCategory,
  {
    min: number;
    max: number;
    badgeColor: string;
    textColor: string;
    borderColor: string;
    bgColor: string;
    summary: string;
  }
> = {
  Good: {
    min: 0,
    max: 50,
    badgeColor: "bg-emerald-500",
    textColor: "text-emerald-700 dark:text-emerald-300",
    borderColor: "border-emerald-300 dark:border-emerald-800",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/40",
    summary: "Air quality is satisfactory and air pollution poses little or no risk.",
  },
  Moderate: {
    min: 51,
    max: 100,
    badgeColor: "bg-yellow-500",
    textColor: "text-yellow-700 dark:text-yellow-300",
    borderColor: "border-yellow-300 dark:border-yellow-800",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/40",
    summary: "Acceptable quality, but sensitive individuals may experience minor breathing irritation.",
  },
  Poor: {
    min: 101,
    max: 200,
    badgeColor: "bg-orange-500",
    textColor: "text-orange-700 dark:text-orange-300",
    borderColor: "border-orange-300 dark:border-orange-800",
    bgColor: "bg-orange-50 dark:bg-orange-950/40",
    summary: "Unhealthy for sensitive groups. Prolonged exposure causes breathing discomfort.",
  },
  "Very Poor": {
    min: 201,
    max: 300,
    badgeColor: "bg-red-500",
    textColor: "text-red-700 dark:text-red-300",
    borderColor: "border-red-300 dark:border-red-800",
    bgColor: "bg-red-50 dark:bg-red-950/40",
    summary: "Severe respiratory discomfort on prolonged exposure. Significant winter smog danger.",
  },
  Severe: {
    min: 301,
    max: 500,
    badgeColor: "bg-purple-600",
    textColor: "text-purple-700 dark:text-purple-300",
    borderColor: "border-purple-300 dark:border-purple-800",
    bgColor: "bg-purple-50 dark:bg-purple-950/40",
    summary: "Emergency category. Healthy people experience lung inflammation; vulnerable groups in critical danger.",
  },
};

export const PERSONA_PROFILES: PersonaProfile[] = [
  {
    id: "child_asthma",
    title: "Child with Asthma",
    subtitle: "Ages 4 to 14, high airway sensitivity",
    iconName: "Baby",
    riskLevel: "Critical",
    targetThresholdPm25: 35,
    vulnerabilityDescription:
      "Children breathe 50 percent more air per pound of body weight than adults, amplifying PM2.5 deposition deep into developing bronchial passages.",
  },
  {
    id: "elderly_respiratory",
    title: "Elderly Citizen",
    subtitle: "Ages 60+, COPD or cardiac risks",
    iconName: "HeartPulse",
    riskLevel: "Critical",
    targetThresholdPm25: 45,
    vulnerabilityDescription:
      "Reduced lung elasticity and elevated cardiovascular strain during cold winter inversions increase risk of acute flare-ups.",
  },
  {
    id: "outdoor_commuter",
    title: "Daily Commuter",
    subtitle: "Bike, scooter, or bus stop transit",
    iconName: "Bike",
    riskLevel: "High",
    targetThresholdPm25: 60,
    vulnerabilityDescription:
      "Direct roadside proximity exposes commuters to fresh tailpipe ultra-fine particles and resuspended road dust at peak rush hours.",
  },
  {
    id: "morning_athlete",
    title: "Morning Runner / Athlete",
    subtitle: "Intense outdoor cardio conditioning",
    iconName: "Activity",
    riskLevel: "High",
    targetThresholdPm25: 50,
    vulnerabilityDescription:
      "Deep mouth breathing during exercise bypasses natural nasal filtration, drawing 10 times more particulate matter directly into alveoli during morning inversion peaks.",
  },
  {
    id: "general_citizen",
    title: "General Urban Resident",
    subtitle: "Standard indoor and outdoor lifestyle",
    iconName: "Users",
    riskLevel: "Moderate",
    targetThresholdPm25: 75,
    vulnerabilityDescription:
      "Needs balanced protection guidelines, indoor air management schedules, and low-smog chore coordination.",
  },
];
