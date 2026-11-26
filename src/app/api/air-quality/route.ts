import { NextRequest, NextResponse } from "next/server";
import { fetchLiveAirQuality } from "@/lib/air-quality-api";
import { checkRateLimit } from "@/lib/rate-limiter";

export async function GET(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
    const rateCheck = checkRateLimit(ip, 60, 60000);

    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: "Too many requests. Please throttle your rate.",
          code: "RATE_LIMITED",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateCheck.resetSeconds),
            "X-RateLimit-Limit": String(rateCheck.limit),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": String(rateCheck.resetSeconds),
          },
        }
      );
    }

    const { searchParams } = new URL(request.url);
    const latStr = searchParams.get("lat");
    const lonStr = searchParams.get("lon");

    // Default to New Delhi (28.6139, 77.2090) if parameters are omitted
    const lat = latStr !== null ? parseFloat(latStr) : 28.6139;
    const lon = lonStr !== null ? parseFloat(lonStr) : 77.209;

    // Strict numerical and geographic boundary verification
    if (
      isNaN(lat) ||
      isNaN(lon) ||
      !isFinite(lat) ||
      !isFinite(lon) ||
      lat < -90 ||
      lat > 90 ||
      lon < -180 ||
      lon > 180
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid coordinates. Latitude must be between -90 and 90, longitude between -180 and 180.",
          code: "INVALID_COORDINATES",
        },
        { status: 400 }
      );
    }

    const data = await fetchLiveAirQuality(lat, lon);
    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=900, stale-while-revalidate=1800",
        "X-Content-Type-Options": "nosniff",
        "X-RateLimit-Limit": String(rateCheck.limit),
        "X-RateLimit-Remaining": String(rateCheck.remaining),
      },
    });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json(
      { error: "Atmospheric data telemetry unavailable.", details: message },
      { status: 500 }
    );
  }
}
