# Traceability Matrix

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start legend -->
Built from recorded links, not written by a model: requirement key → plan item (`source_stable_key`) → development ticket (`stable_key`) → the ticket's test steps → the last live deployment that started after the work finished. **AC tests** counts the story's acceptance criteria that have a test case, and those whose test cases all passed in the latest finished E2E run.
<!-- sdlc:auto:end legend -->

<!-- sdlc:auto:start matrix -->
| Requirement | Epic | Title | Plan items | Sprint | Design | Code | Commits | Ticket | Tests | AC tests | Deployed |
|---|---|---|---|---|---|---|---|---|---|---|---|
| US-001 | EPIC-001 | Register a new account | US-001 | 1 | POST /api/auth/register, api, sessions, users, web_spa | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-002 | EPIC-001 | Sign-up validation feedback | US-002 | 1 | POST /api/auth/register, api, users, web_spa | — | — | not started | not run | 0/5 tested · 0/5 passing | — |
| US-003 | EPIC-002 | Sign in with email and password | US-003 | 1 | POST /api/auth/login, api, sessions, users, web_spa | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-004 | EPIC-002 | Single generic failed sign-in message | US-004 | 2 | POST /api/auth/login, api, users, web_spa | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-005 | EPIC-002 | Rate-limited sign-in attempts | US-005 | 2 | POST /api/auth/login, api, login_attempts | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-006 | EPIC-002 | Stay signed in for 30 days | US-006 | 2 | GET /api/auth/me, POST /api/auth/login, api, sessions | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-007 | EPIC-002 | Sign out | US-007 | 2 | POST /api/auth/logout, api, sessions, web_spa | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-008 | EPIC-002 | Signed-out visitors are redirected to Sign in | US-008 | 2 | GET /api/auth/me, api, sessions, web_spa | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-009 | EPIC-002 | No password recovery path (accepted limitation) | US-009 | 4 | web_spa | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-010 | EPIC-003 | Add a task | US-010 | 3 | POST /api/tasks, api, tasks, web_spa | — | — | not started | not run | 0/4 tested · 0/4 passing | — |
| US-011 | EPIC-003 | View my task list newest first | US-011 | 2 | GET /api/tasks, api, tasks, web_spa | — | — | not started | not run | 0/5 tested · 0/5 passing | — |
| US-012 | EPIC-003 | Edit a task title inline | US-012 | 3 | PATCH /api/tasks/{id}, api, tasks, web_spa | — | — | not started | not run | 0/4 tested · 0/4 passing | — |
| US-013 | EPIC-003 | Mark a task complete and undo it | US-013 | 3 | PATCH /api/tasks/{id}, api, tasks, web_spa | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-014 | EPIC-003 | Delete a task after confirming | US-014 | 3 | DELETE /api/tasks/{id}, api, tasks, web_spa | — | — | not started | not run | 0/4 tested · 0/4 passing | — |
| US-015 | EPIC-004 | See only my own tasks | US-015 | 3 | DELETE /api/tasks/{id}, GET /api/tasks, PATCH /api/tasks/{id}, POST /api/tasks, api, sessions, tasks | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-016 | EPIC-004 | Durable storage of accounts and tasks | US-016, US-016-T1, US-016-T2, US-016-T3, US-016-T4 | 1 | GET /api/health, api, db, edge, login_attempts, sessions, tasks, users, web_spa | — | — | not started | not run | 0/4 tested · 0/4 passing | — |
| US-017 | EPIC-005 | Use the app on a phone or tablet browser | US-017 | 3 | web_spa | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-018 | EPIC-005 | No profile, settings, billing or notifications surfaces | US-018 | 4 | web_spa | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-019 | EPIC-005 | Setup and usage documentation | US-019 | 4 | — | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
<!-- sdlc:auto:end matrix -->
