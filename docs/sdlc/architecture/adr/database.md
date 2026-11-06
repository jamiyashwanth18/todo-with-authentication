<!-- sdlc:auto:start adr -->
# ADR-0003: Use PostgreSQL 16 for Database

Status: Accepted  
Date: 2026-11-06

## Context and Problem Statement

Which Database technology does the project use? Decided in architecture v1.

## Considered Options

- PostgreSQL 16
- MySQL
- SQLite

## Decision Outcome

Chosen option: PostgreSQL 16, because PostgreSQL 16 enforces the tasks-to-users foreign key and the case-insensitive unique email. It also absorbs server-side sessions and sign-in throttling, so no Redis or other cache is added.

## Consequences

Throttle and session lookups hit the database on each request. This is trivial at tens of users but would warrant a cache at much larger scale.
<!-- sdlc:auto:end adr -->