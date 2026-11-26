import { describe, it, expect } from "vitest";
import { generateDeterministicPlan } from "../lib/persona-engine";
import { getFallbackAirQuality } from "../lib/air-quality-api";
import { PersonaType } from "../types/persona";

describe("Persona Engine and Routine Generation", () => {
  const { current, hourly } = getFallbackAirQuality();

  const personas: PersonaType[] = [
    "child_asthma",
    "elderly_respiratory",
    "outdoor_commuter",
    "morning_athlete",
    "general_citizen",
  ];

  personas.forEach((personaId) => {
    it(`generates actionable routine plan for ${personaId}`, () => {
      const plan = generateDeterministicPlan(personaId, current, hourly);
      expect(plan.personaId).toBe(personaId);
      expect(plan.summaryAdvice.length).toBeGreaterThan(20);
      expect(plan.safestOutdoorWindow.start).toBeDefined();
      expect(plan.safestOutdoorWindow.end).toBeDefined();
      expect(plan.avoidOutdoorWindow.start).toBeDefined();
      expect(plan.activitySchedule.length).toBeGreaterThanOrEqual(4);
      expect(plan.indoorProtectionChecklist.length).toBeGreaterThanOrEqual(4);
      expect(plan.cleanCommuteAdvice.length).toBeGreaterThan(20);
    });
  });

  it("prioritizes afternoon dispersion window for safest outdoor hours", () => {
    const plan = generateDeterministicPlan("child_asthma", current, hourly);
    expect(plan.safestOutdoorWindow.reason).toContain("thermal inversion");
    expect(plan.avoidOutdoorWindow.start).toBe("6:00 AM");
  });
});
