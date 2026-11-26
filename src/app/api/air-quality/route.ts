import { NextRequest, NextResponse } from "next/server";
import { fetchLiveAirQuality } from "@/lib/air-quality-api";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const latStr = searchParams.get("lat");
    const lonStr = searchParams.get("lon");

    const lat = latStr ? parseFloat(latStr) : 28.6139; // Default New Delhi
    const lon = lonStr ? parseFloat(lonStr) : 77.2090;

    if (isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
      return NextResponse.json(
        { error: "Invalid coordinate bounds. Latitude must be -90 to 90, longitude -180 to 180." },
        { status: 400 }
      );
    }

    const data = await fetchLiveAirQuality(lat, lon);
    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=900, stale-while-revalidate=1800",
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
