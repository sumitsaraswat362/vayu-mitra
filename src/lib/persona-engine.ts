import { AirQualityMetrics, HourlyForecastItem } from "@/types/air-quality";
import { PersonaType, PersonalizedRoutinePlan } from "@/types/persona";
import { PERSONA_PROFILES } from "./constants";

export function generateDeterministicPlan(
  personaId: PersonaType,
  current: AirQualityMetrics,
  hourly: HourlyForecastItem[]
): PersonalizedRoutinePlan {
  const persona = PERSONA_PROFILES.find((p) => p.id === personaId) ?? PERSONA_PROFILES[0];
  const aqi = current.aqi;

  let cleanestHour = hourly[13] ?? hourly[0];
  let worstHour = hourly[7] ?? hourly[0];

  for (const item of hourly) {
    if (item.aqi < cleanestHour.aqi) cleanestHour = item;
    if (item.aqi > worstHour.aqi) worstHour = item;
  }

  const safestOutdoorWindow = {
    start: cleanestHour ? cleanestHour.timeLabel : "1:00 PM",
    end: "4:00 PM",
    reason:
      "Solar heating dissipates the thermal inversion boundary layer, dispersing surface PM2.5 particulates into upper atmospheric columns.",
  };

  const avoidOutdoorWindow = {
    start: "6:00 AM",
    end: "9:30 AM",
    dangerLevel:
      aqi > 250
        ? "Extreme Smog Inversion Zone"
        : aqi > 150
        ? "Elevated Particulate Trapping"
        : "Moderate Risk Window",
  };

  let summaryAdvice = "";
  const activitySchedule: PersonalizedRoutinePlan["activitySchedule"] = [];
  const indoorProtectionChecklist: string[] = [];
  let cleanCommuteAdvice = "";

  if (personaId === "child_asthma") {
    summaryAdvice = `Air quality is ${current.category} (AQI ${aqi}). Strictly avoid all outdoor school sports or early morning play. Keep rescue inhaler accessible and run HEPA filtration in the study room.`;
    activitySchedule.push(
      {
        timeSlot: "07:00 AM - 08:30 AM",
        activity: "School Transit",
        recommendation: aqi > 150 ? "Avoid" : "Caution",
        notes: "Keep vehicle windows sealed with recirculate mode ON; wear child sized N95 mask.",
      },
      {
        timeSlot: "10:30 AM - 11:30 AM",
        activity: "Recess / Physical Education",
        recommendation: "Avoid",
        notes: "Request indoor library or board game alternative from school administration.",
      },
      {
        timeSlot: "02:00 PM - 03:30 PM",
        activity: "Outdoor Garden Play / Walk",
        recommendation: aqi > 200 ? "Avoid" : "Safe",
        notes: "Safest atmospheric clearance period; restrict to light, non-strenuous play.",
      },
      {
        timeSlot: "06:00 PM - 09:00 PM",
        activity: "Evening Study and Rest",
        recommendation: "Safe",
        notes: "Ensure indoor room doors remain shut; avoid agarbatti, incense, or frying oil smoke.",
      }
    );
    indoorProtectionChecklist.push(
      "Operate True-HEPA purifier in the child's bedroom 45 minutes prior to bedtime.",
      "Keep bedroom windows and balcony sliders shut tight during night and morning hours.",
      "Use wet mopping instead of dry brooms to eliminate resuspension of settled PM2.5 dust.",
      "Track peak expiratory flow rate morning and evening if prescribed by pediatrician."
    );
    cleanCommuteAdvice =
      "Never walk or bicycle alongside primary arterial highways during morning smog. Choose carpool with AC cabin filtration or school buses with closed windows.";
  } else if (personaId === "elderly_respiratory") {
    summaryAdvice = `Air quality is ${current.category} (AQI ${aqi}). Inversion trapping creates severe cardiac and pulmonary load. Defer morning neighborhood walks to post-lunch hours.`;
    activitySchedule.push(
      {
        timeSlot: "06:30 AM - 08:00 AM",
        activity: "Morning Walk / Pranayama",
        recommendation: "Avoid",
        notes: "Critical cold smog danger. Practice gentle yoga or walking indoors in filtered air.",
      },
      {
        timeSlot: "11:00 AM - 01:00 PM",
        activity: "Doctor Visit / Medical Errands",
        recommendation: "Caution",
        notes: "Double layer mask or certified N95; minimize roadside waiting times.",
      },
      {
        timeSlot: "02:00 PM - 03:30 PM",
        activity: "Sunlight Exposure / Veranda Sit-out",
        recommendation: aqi > 250 ? "Caution" : "Safe",
        notes: "Midday sun helps warm air layers and offers safe vitamin D synthesis window.",
      },
      {
        timeSlot: "07:00 PM - 09:30 PM",
        activity: "Evening Relaxation",
        recommendation: "Safe",
        notes: "Keep warm saline gargle routine ready; avoid exposure to open woodfires or street smoke.",
      }
    );
    indoorProtectionChecklist.push(
      "Seal gaps under exterior doors using draft stoppers to block night smog seepage.",
      "Maintain room humidity between 40 and 50 percent using a clean mist humidifier or damp cloth.",
      "Keep emergency bronchodilator or oxygen concentrator on verified standby.",
      "Ensure cross ventilation only between 1:00 PM and 3:00 PM on low wind days."
    );
    cleanCommuteAdvice =
      "Avoid auto-rickshaws or open two-wheelers. Opt for closed rideshare with carbon cabin air filter.";
  } else if (personaId === "morning_athlete") {
    summaryAdvice = `Air quality is ${current.category} (AQI ${aqi}). Deep pulmonary intake during cardio draws hazardous PM2.5 and NO2 into alveoli. Shift workout indoors.`;
    activitySchedule.push(
      {
        timeSlot: "06:00 AM - 07:30 AM",
        activity: "Outdoor Long Distance Run",
        recommendation: "Avoid",
        notes: "High inhalation rate amplifies toxicity tenfold. Swap for indoor treadmill or gym.",
      },
      {
        timeSlot: "12:30 PM - 02:00 PM",
        activity: "Gym Workout / Strength Training",
        recommendation: "Safe",
        notes: "Ideal timing; indoor gym environment with air conditioning reduces exposure.",
      },
      {
        timeSlot: "04:30 PM - 05:30 PM",
        activity: "Outdoor Interval Training / Cycling",
        recommendation: aqi > 180 ? "Caution" : "Safe",
        notes: "Check real-time local station AQI; terminate session if throat irritation occurs.",
      },
      {
        timeSlot: "08:00 PM - 10:00 PM",
        activity: "Recovery and Stretching",
        recommendation: "Safe",
        notes: "Hydrate heavily with antioxidant-rich fluids (warm lemon ginger tea) to soothe bronchial tract.",
      }
    );
    indoorProtectionChecklist.push(
      "Ensure gym facility maintains clean commercial air purifiers running continuously.",
      "Rinse nasal cavities with isotonic sterile saline spray post workout.",
      "Avoid high heat cooking or pan frying directly before indoor cardio workouts.",
      "Monitor resting heart rate trends as indicator of systemic inflammation from particulate exposure."
    );
    cleanCommuteAdvice =
      "If cycling to work, wear an authentic N99 respirator with silicone face seal and avoid riding directly behind diesel exhaust pipes.";
  } else if (personaId === "outdoor_commuter") {
    summaryAdvice = `Air quality is ${current.category} (AQI ${aqi}). Traffic corridors concentrate volatile organic compounds and PM2.5. Optimize travel routes and mask discipline.`;
    activitySchedule.push(
      {
        timeSlot: "08:30 AM - 09:45 AM",
        activity: "Morning Office Commute",
        recommendation: "Caution",
        notes: "Avoid open two wheelers without N95; select metro rail transit whenever feasible.",
      },
      {
        timeSlot: "01:00 PM - 02:00 PM",
        activity: "Lunch Hour Errand",
        recommendation: "Safe",
        notes: "Best outdoor ambient window; walk away from heavy traffic intersections.",
      },
      {
        timeSlot: "06:30 PM - 08:00 PM",
        activity: "Evening Return Commute",
        recommendation: "Caution",
        notes: "Peak traffic combines with evening cooling inversion; keep vehicle ventilation on internal recirculation.",
      },
      {
        timeSlot: "08:30 PM - 10:00 PM",
        activity: "Dinner and Rest",
        recommendation: "Safe",
        notes: "Take warm shower to wash particulate soot from hair and skin before sleep.",
      }
    );
    indoorProtectionChecklist.push(
      "Inspect and replace car cabin air filter with HEPA grade carbon filter.",
      "Never idle engine in closed garages or underground parking structures.",
      "Keep office workstation away from building entry doors that stay open during rush hour.",
      "Wipe down vehicle steering wheel and dashboard with damp microfiber cloth weekly."
    );
    cleanCommuteAdvice =
      "Switch from surface roads to underground metro where available; transit in air-conditioned metro coaches cuts particulate exposure by 65 percent compared to open road cycling.";
  } else {
    summaryAdvice = `Air quality is ${current.category} (AQI ${aqi}). Regulate home ventilation, track peak pollution hours, and take standard preventive health measures.`;
    activitySchedule.push(
      {
        timeSlot: "07:00 AM - 09:00 AM",
        activity: "Morning Household Chores",
        recommendation: "Safe",
        notes: "Keep doors and windows closed; run exhaust only in kitchen while cooking.",
      },
      {
        timeSlot: "01:00 PM - 03:00 PM",
        activity: "Airing Out Home / Ventilation",
        recommendation: "Safe",
        notes: "Safest hour for quick 15 minute cross-ventilation to flush out indoor carbon dioxide.",
      },
      {
        timeSlot: "05:30 PM - 07:00 PM",
        activity: "Grocery Shopping / Market Visit",
        recommendation: aqi > 200 ? "Caution" : "Safe",
        notes: "Wear a well fitted N95 mask in busy outdoor bazaars.",
      },
      {
        timeSlot: "08:00 PM - 10:30 PM",
        activity: "Night Family Time",
        recommendation: "Safe",
        notes: "Close all external windows before 8 PM as night cold inversion descends.",
      }
    );
    indoorProtectionChecklist.push(
      "Air out living rooms only between 1 PM and 3 PM when outdoor inversion is weakest.",
      "Avoid burning mosquito coils, candles, or incense in closed indoor spaces.",
      "Use indoor air purifying plants like Snake Plant and Areca Palm as supplementary greens.",
      "Maintain hydration with warm herbal teas and water throughout the day."
    );
    cleanCommuteAdvice =
      "Plan combined errands in a single midday trip rather than multiple peak hour departures.";
  }

  return {
    personaId,
    personaTitle: persona.title,
    summaryAdvice,
    safestOutdoorWindow,
    avoidOutdoorWindow,
    activitySchedule,
    indoorProtectionChecklist,
    cleanCommuteAdvice,
  };
}
