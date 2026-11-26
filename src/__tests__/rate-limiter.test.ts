import { describe, it, expect } from "vitest";
import { checkRateLimit, sanitizeString } from "../lib/rate-limiter";

describe("Sliding Window Rate Limiter and Input Sanitization", () => {
  it("allows requests under the threshold and throttles once exceeded", () => {
    const testIp = "192.168.1.100";
    const limit = 5;
    const windowMs = 10000;

    for (let i = 0; i < limit; i++) {
      const res = checkRateLimit(testIp, limit, windowMs);
      expect(res.allowed).toBe(true);
      expect(res.remaining).toBe(limit - 1 - i);
    }

    const blocked = checkRateLimit(testIp, limit, windowMs);
    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
    expect(blocked.resetSeconds).toBeGreaterThan(0);
  });

  it("strips raw tags and neutralized malicious script schemes", () => {
    const clean = sanitizeString("<script>alert(1)</script>Mathura");
    expect(clean).toBe("alert(1)Mathura");

    const cleanHref = sanitizeString("javascript:alert('xss')");
    expect(cleanHref).not.toContain("javascript:");

    const cleanHandler = sanitizeString("<img src=x onerror=alert(1)>");
    expect(cleanHandler).not.toContain("<");
    expect(cleanHandler).not.toContain("onerror=");
  });
});
