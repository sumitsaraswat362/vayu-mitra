import { describe, it, expect } from "vitest";
import { generateAiRoutinePlan } from "../lib/gemini-client";
import { getFallbackAirQuality } from "../lib/air-quality-api";

describe("Gemini Client Fallback and Contract", () => {
  it("gracefully falls back to heuristic engine when API key is unset", async () => {
    const { current, hourly } = getFallbackAirQuality();
    const plan = await generateAiRoutinePlan("morning_athlete", current, hourly);
    expect(plan.personaId).toBe("morning_athlete");
    expect(plan.activitySchedule.length).toBeGreaterThan(0);
    expect(plan.indoorProtectionChecklist.length).toBeGreaterThan(0);
  });
});
