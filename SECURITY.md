# Security Policy for Vayu-Mitra

## Supported Versions

| Version | Supported |
| :--- | :--- |
| 2.0.x | Yes |
| < 2.0 | No |

## Reporting a Vulnerability

Security issues, data anomalies, or API edge cases should be reported directly via GitHub repository issues marked with the security label.

## Defensive Implementation

* **In-Memory Rate Limiting:** Enforces strict sliding window request limits per client IP (60 requests per minute) with standard HTTP 429 response headers.
* **Input Sanitization:** Strips raw HTML elements, inline script payloads, and untrusted protocols from incoming parameters before processing.
* **HTTP Security Headers:** Strict Content-Security-Policy (CSP), Strict-Transport-Security (HSTS), X-Frame-Options (DENY), and X-Content-Type-Options (nosniff) active across all routes.
* **Zero Persistent Database Exposure:** Eliminates remote SQL injection and cross-site scripting attack vectors by storing user preferences in isolated client state.
