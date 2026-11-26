import { describe, it, expect } from "vitest";
import { categorizeAqi, isSmogInversionHour, getFallbackAirQuality } from "../lib/air-quality-api";
import { calculateCpcbAqi } from "../lib/constants";

describe("Air Quality API and Helpers", () => {
  it("correctly categorizes US EPA AQI levels across all brackets", () => {
    expect(categorizeAqi(45)).toBe("Good");
    expect(categorizeAqi(80)).toBe("Moderate");
    expect(categorizeAqi(150)).toBe("Poor");
    expect(categorizeAqi(250)).toBe("Very Poor");
    expect(categorizeAqi(350)).toBe("Severe");
    expect(categorizeAqi(500)).toBe("Severe");
  });

  it("calculates Indian CPCB National AQI accurately according to MoEFCC breakpoints", () => {
    const good = calculateCpcbAqi(20, 35);
    expect(good.category).toBe("Good");
    expect(good.aqi).toBeLessThanOrEqual(50);

    const satisfactory = calculateCpcbAqi(45, 75);
    expect(satisfactory.category).toBe("Satisfactory");
    expect(satisfactory.aqi).toBeGreaterThan(50);
    expect(satisfactory.aqi).toBeLessThanOrEqual(100);

    const moderate = calculateCpcbAqi(75, 150);
    expect(moderate.category).toBe("Moderate");
    expect(moderate.aqi).toBeGreaterThan(100);
    expect(moderate.aqi).toBeLessThanOrEqual(200);

    const poor = calculateCpcbAqi(105, 280);
    expect(poor.category).toBe("Poor");
    expect(poor.aqi).toBeGreaterThan(200);
    expect(poor.aqi).toBeLessThanOrEqual(300);

    const veryPoor = calculateCpcbAqi(160, 380);
    expect(veryPoor.category).toBe("Very Poor");
    expect(veryPoor.aqi).toBeGreaterThan(300);
    expect(veryPoor.aqi).toBeLessThanOrEqual(400);

    const severe = calculateCpcbAqi(280, 480);
    expect(severe.category).toBe("Severe");
    expect(severe.aqi).toBeGreaterThan(400);
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

  it("produces a structurally complete 24-hour fallback forecast with meteorological telemetry", () => {
    const { current, hourly } = getFallbackAirQuality();
    expect(current.aqi).toBeGreaterThan(0);
    expect(current.cpcbAqi).toBeGreaterThan(0);
    expect(current.pm25).toBeGreaterThan(0);
    expect(current.weather.temperature).toBeDefined();
    expect(current.weather.humidity).toBeDefined();
    expect(current.weather.windSpeed).toBeDefined();
    expect(current.weather.dispersionIndex).toBe("Stagnant (Trap Zone)");
    expect(hourly).toHaveLength(24);
    expect(hourly[0].hour).toBe("00:00");
    expect(hourly[23].hour).toBe("23:00");
  });
});
