# Sprint Plan

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start sprints -->
## Sprint 1: Sprint 1

Stand up the AWS environment and database schema, and let visitors register (with validation) and sign in

Capacity: 20 points · Committed: 19

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-001 | Story | Register a new account | 5 | backend-agent | US-016 |
| US-002 | Story | Sign-up validation feedback | 3 | backend-agent | US-001 |
| US-003 | Story | Sign in with email and password | 3 | backend-agent | US-001 |
| US-016 | Story | Durable storage of accounts and tasks | 8 | devops-agent | — |
| ↳ US-016-T1 | Task | Provision PostgreSQL 16 on Amazon RDS with automated backups | — | devops-agent | — |
| ↳ US-016-T2 | Task | Add initial schema migrations | — | backend-agent | — |
| ↳ US-016-T3 | Task | Deploy API and SPA behind an HTTPS Application Load Balancer | — | devops-agent | — |
| ↳ US-016-T4 | Task | Add a persistence-across-redeploy smoke test | — | qa-agent | — |

## Sprint 2: Sprint 2

Secure sessions end to end (generic failure message, 30-day cookie, sign-out, redirects, throttling) and show the signed-in user's task list

Capacity: 20 points · Committed: 18

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-004 | Story | Single generic failed sign-in message | 2 | security-agent | US-003 |
| US-005 | Story | Rate-limited sign-in attempts | 3 | security-agent | US-004 |
| US-006 | Story | Stay signed in for 30 days | 3 | backend-agent | US-003 |
| US-007 | Story | Sign out | 2 | backend-agent | US-006, US-008 |
| US-008 | Story | Signed-out visitors are redirected to Sign in | 3 | frontend-agent | US-006 |
| US-011 | Story | View my task list newest first | 5 | frontend-agent | US-008, US-016 |

## Sprint 3: Sprint 3

Full task management (add, edit inline, complete/undo, delete) with verified per-user isolation and a phone-friendly layout

Capacity: 20 points · Committed: 20

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-010 | Story | Add a task | 5 | frontend-agent | US-011 |
| US-012 | Story | Edit a task title inline | 3 | frontend-agent | US-010 |
| US-013 | Story | Mark a task complete and undo it | 3 | frontend-agent | US-011 |
| US-014 | Story | Delete a task after confirming | 3 | frontend-agent | US-011 |
| US-015 | Story | See only my own tasks | 3 | security-agent | US-010, US-012, US-013, US-014 |
| US-017 | Story | Use the app on a phone or tablet browser | 3 | frontend-agent | US-010, US-012, US-013, US-014 |

## Sprint 4: Sprint 4

Confirm the MVP stays within agreed scope and ship setup, usage and limitations documentation

Capacity: 20 points · Committed: 4

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-009 | Story | No password recovery path (accepted limitation) | 1 | qa-agent | US-019 |
| US-018 | Story | No profile, settings, billing or notifications surfaces | 1 | qa-agent | US-017 |
| US-019 | Story | Setup and usage documentation | 2 | devops-agent | US-016, US-015, US-017 |

## Unscheduled

_Nothing unscheduled._
<!-- sdlc:auto:end sprints -->
