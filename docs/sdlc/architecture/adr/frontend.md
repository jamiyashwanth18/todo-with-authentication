<!-- sdlc:auto:start adr -->
# ADR-0001: Use React 19 for Frontend

Status: Accepted  
Date: 2026-11-06

## Context and Problem Statement

Which Frontend technology does the project use? Decided in architecture v1.

## Considered Options

- React 19
- Vue
- Svelte

## Decision Outcome

Chosen option: React 19, because React 19 is built with Vite into static assets that FastAPI serves from the same origin. The three routes are guarded by a /api/auth/me check, and optimistic state updates make ticking, inline editing and deleting feel instant. Mobile-first CSS meets the 375px target.

## Consequences

This is client-rendered rather than server-rendered, so the first paint waits for the JS bundle, which is negligible at this size. The back-button case needs an explicit pageshow re-check.
<!-- sdlc:auto:end adr -->