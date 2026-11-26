import { NextRequest, NextResponse } from "next/server";
import { generateAiRoutinePlan } from "@/lib/gemini-client";
import { PersonaType } from "@/types/persona";
import { AirQualityMetrics, HourlyForecastItem } from "@/types/air-quality";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { personaId, current, hourly } = body as {
      personaId?: PersonaType;
      current?: AirQualityMetrics;
      hourly?: HourlyForecastItem[];
    };

    const validPersonas: PersonaType[] = [
      "child_asthma",
      "elderly_respiratory",
      "outdoor_commuter",
      "morning_athlete",
      "general_citizen",
    ];

    const targetPersona: PersonaType =
      personaId && validPersonas.includes(personaId) ? personaId : "general_citizen";

    if (!current || typeof current.aqi !== "number") {
      return NextResponse.json(
        { error: "Missing or invalid current air quality metrics." },
        { status: 400 }
      );
    }

    const safeHourly = Array.isArray(hourly) && hourly.length > 0 ? hourly : [];
    const plan = await generateAiRoutinePlan(targetPersona, current, safeHourly);

    return NextResponse.json(plan, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to generate routine plan";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
