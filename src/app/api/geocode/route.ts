import { NextRequest, NextResponse } from "next/server";
import { searchIndianCities } from "@/lib/air-quality-api";
import { checkRateLimit, sanitizeString } from "@/lib/rate-limiter";

export async function GET(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
    const rateCheck = checkRateLimit(ip, 60, 60000);

    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: "Geocoding query limit reached. Please throttle requests.",
          code: "RATE_LIMITED",
        },
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

    const { searchParams } = new URL(request.url);
    const rawQuery = searchParams.get("q");

    if (!rawQuery || rawQuery.trim().length < 2) {
      return NextResponse.json(
        { error: "Query parameter 'q' must contain at least 2 characters." },
        { status: 400 }
      );
    }

    const sanitized = sanitizeString(rawQuery).slice(0, 50);
    const results = await searchIndianCities(sanitized);

    return NextResponse.json(results, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
        "X-Content-Type-Options": "nosniff",
        "X-RateLimit-Limit": String(rateCheck.limit),
        "X-RateLimit-Remaining": String(rateCheck.remaining),
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Geocoding failed";
    return NextResponse.json(
      { error: "Failed to search locations.", details: message },
      { status: 500 }
    );
  }
}
