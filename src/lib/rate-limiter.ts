/**
 * In-memory sliding window rate limiter and security sanitization engine.
 * Protects server route handlers from denial of service and injection vectors.
 */

interface RateLimitRecord {
  timestamps: number[];
}

const clientIpStore = new Map<string, RateLimitRecord>();

const CLEANUP_INTERVAL_MS = 60000;
let lastCleanup = Date.now();

function cleanupExpiredRecords(windowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;

  const expiry = now - windowMs;
  clientIpStore.forEach((record, ip) => {
    record.timestamps = record.timestamps.filter((ts) => ts > expiry);
    if (record.timestamps.length === 0) {
      clientIpStore.delete(ip);
    }
  });
}

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetSeconds: number;
}

/**
 * Checks rate limit for a client IP using a sliding window algorithm
 * @param ip Client IP address or identifier
 * @param limit Maximum allowed requests per window (default 60)
 * @param windowMs Time window in milliseconds (default 60,000ms = 1 min)
 */
export function checkRateLimit(
  ip: string,
  limit = 60,
  windowMs = 60000
): RateLimitResult {
  cleanupExpiredRecords(windowMs);

  const now = Date.now();
  const record = clientIpStore.get(ip) || { timestamps: [] };

  // Retain only requests within the current rolling window
  const windowStart = now - windowMs;
  record.timestamps = record.timestamps.filter((ts) => ts > windowStart);

  if (record.timestamps.length >= limit) {
    const oldestTimestamp = record.timestamps[0];
    const resetSeconds = Math.max(
      1,
      Math.ceil((oldestTimestamp + windowMs - now) / 1000)
    );
    return {
      allowed: false,
      limit,
      remaining: 0,
      resetSeconds,
    };
  }

  record.timestamps.push(now);
  clientIpStore.set(ip, record);

  const remaining = Math.max(0, limit - record.timestamps.length);
  return {
    allowed: true,
    limit,
    remaining,
    resetSeconds: Math.ceil(windowMs / 1000),
  };
}

/**
 * Sanitizes input strings against XSS, script injection, and control characters
 */
export function sanitizeString(input: string): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/<[^>]*>/g, "") // Strip complete HTML tags
    .replace(/javascript:/gi, "") // Neutralize URI schemes
    .replace(/on\w+=/gi, "") // Neutralize event handlers
    .replace(/[<>]/g, "") // Strip any residual brackets
    .trim()
    .slice(0, 1000);
}
