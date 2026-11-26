# Vayu-Mitra Architecture and System Design

## Overview

Vayu-Mitra is structured as a resilient Next.js 14 App Router application deployed on modern serverless cloud infrastructure.

## Component Architecture

1. **Client Presentation Tier (`src/components/`):**
   * Responsive accessibility landmarks (`header`, `nav`, `main`, `section`, `footer`).
   * W3C ARIA 1.2 Combobox search integration with debounced city autocompletion.
   * Real-time diurnal inversion timeline and pollutant benchmark comparisons.

2. **State and Custom Hooks Tier (`src/hooks/`):**
   * `useAirQuality`: Encapsulates telemetry ingestion, error boundaries, and live status announcements.
   * `useRoutinePlan`: Manages persona routine generation with automatic fallback mechanisms.

3. **API and Security Enforcement Tier (`src/app/api/`):**
   * In-memory sliding window rate limiter tracking client IP frequencies.
   * Coordinate bounds verification enforcing valid geographical coordinates.
   * Input sanitization neutralizing script injection vectors.

4. **Atmospheric Intelligence and Fallback Tier (`src/lib/`):**
   * Google Cloud Vertex AI (Gemini 2.0 Flash) prompt synthesis.
   * Open-Meteo satellite atmospheric and meteorological telemetry ingestion.
   * Commission for Air Quality Management (CAQM) Graded Response Action Plan (GRAP) state machine.
   * Central Pollution Control Board (CPCB) National Air Quality Index calculation.
