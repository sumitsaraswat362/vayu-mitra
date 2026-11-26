import { NextRequest, NextResponse } from "next/server";
import { searchIndianCities } from "@/lib/air-quality-api";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query || query.trim().length < 2) {
      return NextResponse.json(
        { error: "Query parameter 'q' must contain at least 2 characters." },
        { status: 400 }
      );
    }

    const sanitized = query.trim().slice(0, 50);
    const results = await searchIndianCities(sanitized);

    return NextResponse.json(results, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
        "X-Content-Type-Options": "nosniff",
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
