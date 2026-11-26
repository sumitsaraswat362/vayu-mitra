import { AirQualityMetrics, HourlyForecastItem } from "@/types/air-quality";
import { PersonaType, PersonalizedRoutinePlan } from "@/types/persona";
import { generateDeterministicPlan } from "./persona-engine";

export async function generateAiRoutinePlan(
  personaId: PersonaType,
  current: AirQualityMetrics,
  hourly: HourlyForecastItem[]
): Promise<PersonalizedRoutinePlan> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    // Graceful deterministic heuristic engine when running without API keys
    return generateDeterministicPlan(personaId, current, hourly);
  }

  try {
    const prompt = `You are Vayu-Mitra, an expert AI assistant specializing in urban winter smog resilience and respiratory protection.
Current Air Quality Telemetry:
- CPCB Indian AQI: ${current.cpcbAqi} (${current.cpcbCategory})
- US EPA AQI: ${current.aqi} (${current.category})
- PM2.5: ${current.pm25} ug/m3
- PM10: ${current.pm10} ug/m3
- NO2: ${current.no2} ug/m3
- O3: ${current.o3} ug/m3
- Temperature: ${current.weather?.temperature ?? 20} C
- Humidity: ${current.weather?.humidity ?? 70}%
- Wind Speed: ${current.weather?.windSpeed ?? 3} km/h
- Dispersion Status: ${current.weather?.dispersionIndex ?? "Stagnant"}

Target Persona: ${personaId}

Provide a personalized winter smog routine plan strictly formatted as valid JSON with this exact TypeScript interface:
{
  "personaId": "${personaId}",
  "personaTitle": string,
  "summaryAdvice": string,
  "safestOutdoorWindow": { "start": string, "end": string, "reason": string },
  "avoidOutdoorWindow": { "start": string, "end": string, "dangerLevel": string },
  "activitySchedule": [
    { "timeSlot": string, "activity": string, "recommendation": "Safe" | "Caution" | "Avoid", "notes": string }
  ],
  "indoorProtectionChecklist": string[],
  "cleanCommuteAdvice": string
}
Important: Do not output markdown codeblocks. Output only raw valid JSON. Do not use double hyphens, em dashes, or en dashes.`;

    // Primary modern model: Google Gemini 2.0 Flash
    let response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.2,
            responseMimeType: "application/json",
          },
        }),
      }
    );

    // Fallback model: Google Gemini 1.5 Flash
    if (!response.ok) {
      response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.2,
              responseMimeType: "application/json",
            },
          }),
        }
      );
    }

    if (!response.ok) {
      return generateDeterministicPlan(personaId, current, hourly);
    }

    const json = await response.json();
    const candidateText = json?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidateText) {
      return generateDeterministicPlan(personaId, current, hourly);
    }

    const parsed = JSON.parse(candidateText) as PersonalizedRoutinePlan;
    if (!parsed.safestOutdoorWindow || !parsed.activitySchedule) {
      return generateDeterministicPlan(personaId, current, hourly);
    }

    return parsed;
  } catch {
    return generateDeterministicPlan(personaId, current, hourly);
  }
}
