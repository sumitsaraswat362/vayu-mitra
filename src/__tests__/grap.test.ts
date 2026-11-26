import { describe, it, expect } from "vitest";

export function determineGrapStage(aqi: number): {
  code: string;
  isEmergency: boolean;
  schoolOutdoorBan: boolean;
} {
  if (aqi >= 450) {
    return { code: "Stage IV", isEmergency: true, schoolOutdoorBan: true };
  }
  if (aqi >= 401) {
    return { code: "Stage III", isEmergency: false, schoolOutdoorBan: true };
  }
  if (aqi >= 301) {
    return { code: "Stage II", isEmergency: false, schoolOutdoorBan: true };
  }
  return { code: "Stage I", isEmergency: false, schoolOutdoorBan: false };
}

describe("Graded Response Action Plan (GRAP) Protocol Verification", () => {
  it("triggers Stage IV Emergency when AQI exceeds 450", () => {
    const stage = determineGrapStage(465);
    expect(stage.code).toBe("Stage IV");
    expect(stage.isEmergency).toBe(true);
    expect(stage.schoolOutdoorBan).toBe(true);
  });

  it("triggers Stage III Severe when AQI is between 401 and 450", () => {
    const stage = determineGrapStage(425);
    expect(stage.code).toBe("Stage III");
    expect(stage.isEmergency).toBe(false);
    expect(stage.schoolOutdoorBan).toBe(true);
  });

  it("triggers Stage II Very Poor when AQI is between 301 and 400", () => {
    const stage = determineGrapStage(340);
    expect(stage.code).toBe("Stage II");
    expect(stage.isEmergency).toBe(false);
    expect(stage.schoolOutdoorBan).toBe(true);
  });

  it("triggers Stage I Poor when AQI is below 300", () => {
    const stage = determineGrapStage(240);
    expect(stage.code).toBe("Stage I");
    expect(stage.isEmergency).toBe(false);
    expect(stage.schoolOutdoorBan).toBe(false);
  });
});
