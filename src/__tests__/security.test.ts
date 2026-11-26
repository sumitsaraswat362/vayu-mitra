import { describe, it, expect } from "vitest";

describe("Geographical and Numerical Security Bounds", () => {
  function validateCoordinates(lat: number, lon: number): boolean {
    if (isNaN(lat) || isNaN(lon) || !isFinite(lat) || !isFinite(lon)) return false;
    if (lat < -90 || lat > 90 || lon < -180 || lon > 180) return false;
    return true;
  }

  it("approves valid coordinates for Indian smog corridors", () => {
    expect(validateCoordinates(28.6139, 77.2090)).toBe(true); // New Delhi
    expect(validateCoordinates(27.4924, 77.6737)).toBe(true); // Mathura
    expect(validateCoordinates(19.0760, 72.8777)).toBe(true); // Mumbai
  });

  it("rejects non-finite, NaN, or out-of-range coordinates", () => {
    expect(validateCoordinates(NaN, 77.2090)).toBe(false);
    expect(validateCoordinates(28.6139, Infinity)).toBe(false);
    expect(validateCoordinates(95.0, 77.2090)).toBe(false);
    expect(validateCoordinates(-95.0, 77.2090)).toBe(false);
    expect(validateCoordinates(28.6139, 185.0)).toBe(false);
    expect(validateCoordinates(28.6139, -185.0)).toBe(false);
  });
});
