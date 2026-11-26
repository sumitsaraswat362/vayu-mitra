import { AqiCategory } from "./air-quality";

export type PersonaType =
  | "child_asthma"
  | "elderly_respiratory"
  | "outdoor_commuter"
  | "morning_athlete"
  | "general_citizen";

export interface PersonaProfile {
  id: PersonaType;
  title: string;
  subtitle: string;
  iconName: string;
  riskLevel: "High" | "Critical" | "Moderate" | "Low";
  targetThresholdPm25: number;
  vulnerabilityDescription: string;
}

export interface PersonalizedRoutinePlan {
  personaId: PersonaType;
  personaTitle: string;
  summaryAdvice: string;
  safestOutdoorWindow: {
    start: string;
    end: string;
    reason: string;
  };
  avoidOutdoorWindow: {
    start: string;
    end: string;
    dangerLevel: string;
  };
  activitySchedule: Array<{
    timeSlot: string;
    activity: string;
    recommendation: "Safe" | "Caution" | "Avoid";
    notes: string;
  }>;
  indoorProtectionChecklist: string[];
  cleanCommuteAdvice: string;
}
