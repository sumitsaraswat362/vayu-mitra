import { describe, it, expect } from "vitest";
import { categorizeAqi, isSmogInversionHour, getFallbackAirQuality } from "../lib/air-quality-api";

describe("Air Quality API and Helpers", () => {
  it("correctly categorizes AQI levels across all brackets", () => {
    expect(categorizeAqi(45)).toBe("Good");
    expect(categorizeAqi(80)).toBe("Moderate");
    expect(categorizeAqi(150)).toBe("Poor");
    expect(categorizeAqi(250)).toBe("Very Poor");
    expect(categorizeAqi(350)).toBe("Severe");
    expect(categorizeAqi(500)).toBe("Severe");
  });

  it("identifies winter smog inversion hours accurately", () => {
    // Inversion hours: 9 PM (21) to 9 AM (9)
    expect(isSmogInversionHour(21)).toBe(true);
    expect(isSmogInversionHour(23)).toBe(true);
    expect(isSmogInversionHour(0)).toBe(true);
    expect(isSmogInversionHour(6)).toBe(true);
    expect(isSmogInversionHour(9)).toBe(true);

    // Midday solar dispersion: 10 AM to 8 PM
    expect(isSmogInversionHour(10)).toBe(false);
    expect(isSmogInversionHour(14)).toBe(false);
    expect(isSmogInversionHour(18)).toBe(false);
    expect(isSmogInversionHour(20)).toBe(false);
  });

  it("produces a structurally complete 24-hour fallback forecast", () => {
    const { current, hourly } = getFallbackAirQuality();
    expect(current.aqi).toBeGreaterThan(0);
    expect(current.pm25).toBeGreaterThan(0);
    expect(current.category).toBe("Very Poor");
    expect(hourly).toHaveLength(24);
    expect(hourly[0].hour).toBe("00:00");
    expect(hourly[23].hour).toBe("23:00");
  });
});
