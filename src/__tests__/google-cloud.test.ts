import { describe, it, expect } from "vitest";
import {
  getGoogleCloudEnvironment,
  getBigQueryAtmosphericBenchmark,
} from "../lib/google-cloud";

describe("Google Cloud Architecture and BigQuery Baseline Integration", () => {
  it("detects Google Cloud environment configurations with Vertex AI models", () => {
    const env = getGoogleCloudEnvironment();
    expect(env.vertexAiModel).toBe("gemini-2.0-flash");
    expect(env.region).toBe("asia-south1");
    expect(env.bigQueryDataset).toContain("epa_historical_air_quality");
  });

  it("returns calibrated BigQuery longitudinal baselines for smog corridors", () => {
    const delhi = getBigQueryAtmosphericBenchmark("New Delhi");
    expect(delhi.decadeAveragePm25).toBe(142);
    expect(delhi.inversionFrequencyPercent).toBe(84);
    expect(delhi.tenYearTrend).toBe("Deteriorating");

    const mathura = getBigQueryAtmosphericBenchmark("Mathura");
    expect(mathura.decadeAveragePm25).toBe(128);
    expect(mathura.inversionFrequencyPercent).toBe(76);

    const bangalore = getBigQueryAtmosphericBenchmark("Bengaluru");
    expect(bangalore.decadeAveragePm25).toBe(68);
    expect(bangalore.tenYearTrend).toBe("Improving");
  });
});
