<!-- sdlc:auto:start adr -->
# ADR-0002: Use FastAPI 0.115 for Backend

Status: Accepted  
Date: 2026-11-06

## Context and Problem Statement

Which Backend technology does the project use? Decided in architecture v1.

## Considered Options

- FastAPI 0.115
- Django
- Express

## Decision Outcome

Chosen option: FastAPI 0.115, because Pydantic models in FastAPI 0.115 express the name, email, 8-character password and 1-255 title rules declaratively and server-side (NFR-006). A single get_current_user dependency enforces session auth and ownership on every task route (NFR-003).

## Consequences

Session and throttle logic is hand-written, roughly 100 lines, rather than taken from a full-stack framework's built-in auth.
<!-- sdlc:auto:end adr -->