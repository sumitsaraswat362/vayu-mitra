import { CityPreset, AqiCategory, CpcbCategory } from "@/types/air-quality";
import { PersonaProfile } from "@/types/persona";

export const APP_NAME = "Vayu-Mitra";
export const APP_TAGLINE =
  "Urban Winter Smog and Air Quality Resilience Assistant";

export const CITY_PRESETS: CityPreset[] = [
  {
    name: "New Delhi",
    state: "Delhi NCR",
    lat: 28.6139,
    lon: 77.209,
    isHighSmogZone: true,
  },
  {
    name: "Noida",
    state: "Uttar Pradesh",
    lat: 28.5355,
    lon: 77.391,
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
    name: "Kolkata",
    state: "West Bengal",
    lat: 22.5726,
    lon: 88.3639,
    isHighSmogZone: true,
  },
  {
    name: "Mumbai",
    state: "Maharashtra",
    lat: 19.076,
    lon: 72.8777,
    isHighSmogZone: false,
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
  so2Daily: 40,
  coDaily: 4,
};

export const CPCB_NAAQS_GUIDELINES = {
  pm25Daily: 60,
  pm10Daily: 100,
  no2Daily: 80,
  o3Daily: 100,
  so2Daily: 80,
  coDaily: 4,
};

/**
 * Computes the Indian CPCB piecewise linear sub-index for a specific pollutant.
 * @param conc Pollutant concentration in ug/m3
 * @param breakpoints Concentration and sub-index breakpoint boundaries
 * @returns Linear interpolated sub-index value
 */
export function calculateCpcbSubIndex(
  conc: number,
  breakpoints: Array<{
    cLow: number;
    cHigh: number;
    iLow: number;
    iHigh: number;
  }>
): number {
  for (const b of breakpoints) {
    if (conc >= b.cLow && conc <= b.cHigh) {
      return Math.round(
        ((b.iHigh - b.iLow) / (b.cHigh - b.cLow)) * (conc - b.cLow) + b.iLow
      );
    }
  }
  const last = breakpoints[breakpoints.length - 1];
  if (conc > last.cHigh) {
    return Math.min(
      500,
      Math.round(
        ((500 - last.iHigh) / (500 - last.cHigh)) * (conc - last.cHigh) +
          last.iHigh
      )
    );
  }
  return 0;
}

/**
 * Calculates official Indian National Air Quality Index (CPCB MoEFCC) from PM2.5 and PM10 concentrations.
 * @param pm25 Fine particulate matter concentration in ug/m3
 * @param pm10 Coarse particulate matter concentration in ug/m3
 * @returns Overall CPCB AQI value and qualitative category
 */
export function calculateCpcbAqi(
  pm25: number,
  pm10: number
): { aqi: number; category: CpcbCategory } {
  const pm25Breakpoints = [
    { cLow: 0, cHigh: 30, iLow: 0, iHigh: 50 },
    { cLow: 31, cHigh: 60, iLow: 51, iHigh: 100 },
    { cLow: 61, cHigh: 90, iLow: 101, iHigh: 200 },
    { cLow: 91, cHigh: 120, iLow: 201, iHigh: 300 },
    { cLow: 121, cHigh: 250, iLow: 301, iHigh: 400 },
    { cLow: 251, cHigh: 500, iLow: 401, iHigh: 500 },
  ];

  const pm10Breakpoints = [
    { cLow: 0, cHigh: 50, iLow: 0, iHigh: 50 },
    { cLow: 51, cHigh: 100, iLow: 51, iHigh: 100 },
    { cLow: 101, cHigh: 250, iLow: 101, iHigh: 200 },
    { cLow: 251, cHigh: 350, iLow: 201, iHigh: 300 },
    { cLow: 351, cHigh: 430, iLow: 301, iHigh: 400 },
    { cLow: 431, cHigh: 550, iLow: 401, iHigh: 500 },
  ];

  const iPm25 = calculateCpcbSubIndex(pm25, pm25Breakpoints);
  const iPm10 = calculateCpcbSubIndex(pm10, pm10Breakpoints);
  const aqi = Math.max(iPm25, iPm10);

  let category: CpcbCategory = "Good";
  if (aqi <= 50) category = "Good";
  else if (aqi <= 100) category = "Satisfactory";
  else if (aqi <= 200) category = "Moderate";
  else if (aqi <= 300) category = "Poor";
  else if (aqi <= 400) category = "Very Poor";
  else category = "Severe";

  return { aqi, category };
}

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
    badgeColor: "bg-emerald-700 text-white",
    textColor: "text-emerald-800 dark:text-emerald-300",
    borderColor: "border-emerald-300 dark:border-emerald-800",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/40",
    summary:
      "Air quality is satisfactory and air pollution poses little or no risk.",
  },
  Moderate: {
    min: 51,
    max: 100,
    badgeColor: "bg-amber-400 text-amber-950 font-bold border border-amber-500",
    textColor: "text-amber-900 dark:text-amber-200",
    borderColor: "border-amber-300 dark:border-amber-800",
    bgColor: "bg-amber-50 dark:bg-amber-950/40",
    summary:
      "Acceptable quality, but sensitive individuals may experience minor breathing irritation.",
  },
  Poor: {
    min: 101,
    max: 200,
    badgeColor: "bg-orange-700 text-white",
    textColor: "text-orange-800 dark:text-orange-300",
    borderColor: "border-orange-300 dark:border-orange-800",
    bgColor: "bg-orange-50 dark:bg-orange-950/40",
    summary:
      "Unhealthy for sensitive groups. Prolonged exposure causes breathing discomfort.",
  },
  "Very Poor": {
    min: 201,
    max: 300,
    badgeColor: "bg-rose-700 text-white",
    textColor: "text-rose-800 dark:text-rose-300",
    borderColor: "border-rose-300 dark:border-rose-800",
    bgColor: "bg-rose-50 dark:bg-rose-950/40",
    summary:
      "Severe respiratory discomfort on prolonged exposure. Significant winter smog danger.",
  },
  Severe: {
    min: 301,
    max: 500,
    badgeColor: "bg-purple-900 text-white",
    textColor: "text-purple-900 dark:text-purple-200",
    borderColor: "border-purple-300 dark:border-purple-800",
    bgColor: "bg-purple-50 dark:bg-purple-950/40",
    summary:
      "Emergency category. Healthy people experience lung inflammation; vulnerable groups in critical danger.",
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
