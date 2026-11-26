import { NextRequest, NextResponse } from "next/server";
import { generateAiRoutinePlan } from "@/lib/gemini-client";
import { checkRateLimit, sanitizeString } from "@/lib/rate-limiter";
import { PersonaType } from "@/types/persona";
import { AirQualityMetrics, HourlyForecastItem } from "@/types/air-quality";

const VALID_PERSONAS: PersonaType[] = [
  "child_asthma",
  "elderly_respiratory",
  "outdoor_commuter",
  "morning_athlete",
  "general_citizen",
];

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
    const rateCheck = checkRateLimit(ip, 30, 60000);

    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: "AI synthesis rate limit exceeded. Please wait a moment.", code: "RATE_LIMITED" },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateCheck.resetSeconds),
            "X-RateLimit-Limit": String(rateCheck.limit),
            "X-RateLimit-Remaining": "0",
          },
        }
      );
    }

    const contentLength = request.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > 32768) {
      return NextResponse.json(
        { error: "Payload exceeds 32KB security limit.", code: "PAYLOAD_TOO_LARGE" },
        { status: 413 }
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Malformed JSON payload in request body.", code: "MALFORMED_JSON" },
        { status: 400 }
      );
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Request body must be a valid JSON object.", code: "INVALID_BODY" },
        { status: 400 }
      );
    }

    const { personaId, current, hourly } = body as {
      personaId?: unknown;
      current?: unknown;
      hourly?: unknown;
    };

    const sanitizedPersona = typeof personaId === "string" ? sanitizeString(personaId) : "";
    const targetPersona: PersonaType = VALID_PERSONAS.includes(sanitizedPersona as PersonaType)
      ? (sanitizedPersona as PersonaType)
      : "general_citizen";

    if (
      !current ||
      typeof current !== "object" ||
      typeof (current as AirQualityMetrics).aqi !== "number" ||
      !isFinite((current as AirQualityMetrics).aqi)
    ) {
      return NextResponse.json(
        { error: "Valid current air quality metrics required with finite AQI index.", code: "INVALID_AQI" },
        { status: 400 }
      );
    }

    const safeCurrent = current as AirQualityMetrics;
    const safeHourly = Array.isArray(hourly) ? (hourly as HourlyForecastItem[]) : [];

    const plan = await generateAiRoutinePlan(targetPersona, safeCurrent, safeHourly);

    return NextResponse.json(plan, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        "X-Content-Type-Options": "nosniff",
        "X-RateLimit-Limit": String(rateCheck.limit),
        "X-RateLimit-Remaining": String(rateCheck.remaining),
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Plan synthesis failed";
    return NextResponse.json(
      { error: "Unable to synthesize personalized routine plan.", details: message },
      { status: 500 }
    );
  }
}
