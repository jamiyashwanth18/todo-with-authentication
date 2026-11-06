# Development

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### DEV-PLAN-V1 · approved · source: plan:v1

The development plan for 'TODO with authentication' is approved at version 1. It organises work into 4 sprints and 5 epics. Implementation progress is not reported in the input.

- Plan status: approved, version 1.
- Sprints: 4, each with capacity 20, giving 80 points in total.
- Epics: EPIC-001 Account creation and sign-up; EPIC-002 Sign-in, sessions and sign-out; EPIC-003 My tasks; EPIC-004 Per-user data privacy and storage; EPIC-005 Responsive delivery and documentation.
- Stories: US-001 to US-019, totalling 61 story points (sum of the listed points). Epics carry no points.
- Tasks: US-016-T1 to US-016-T4, with no points assigned.
- Assigned roles: backend-agent, frontend-agent, security-agent, devops-agent, qa-agent. Epics are unassigned.
- Out of scope, per the project description: password reset, social login, roles.
- Not provided in input: sprint dates, sprint-to-item assignment, ticket status, completion or test evidence.

**Related:** EPIC-001, EPIC-002, EPIC-003, EPIC-004, EPIC-005, SPRINT-1, SPRINT-2, SPRINT-3, SPRINT-4

### DEV-SPRINT-1 · approved · source: plan:Sprint 1

Sprint 1 covers infrastructure, database schema, registration with validation, and sign-in.

- Goal: Stand up the AWS environment and database schema, and let visitors register (with validation) and sign in.
- Capacity: 20.
- Related items are derived from the goal wording, not from an explicit assignment: US-016 and its tasks T1 to T3 (environment and schema), US-001 (register), US-002 (validation), US-003 (sign in).
- Dates and completion status: not provided.

**Related:** US-016, US-016-T1, US-016-T2, US-016-T3, US-001, US-002, US-003, DEV-PLAN-V1

### DEV-SPRINT-2 · approved · source: plan:Sprint 2

Sprint 2 covers secure sessions end to end and display of the signed-in user's task list.

- Goal: Secure sessions end to end (generic failure message, 30-day cookie, sign-out, redirects, throttling) and show the signed-in user's task list.
- Capacity: 20.
- Related items are derived from the goal wording:
  - US-004 (generic message)
  - US-006 (30-day cookie)
  - US-007 (sign-out)
  - US-008 (redirects)
  - US-005 (throttling)
  - US-011 (task list)
- Dates and completion status: not provided.

**Related:** US-004, US-006, US-007, US-008, US-005, US-011, DEV-PLAN-V1

### DEV-SPRINT-3 · approved · source: plan:Sprint 3

Sprint 3 covers full task management, verified per-user isolation, and a phone-friendly layout.

- Goal: Full task management (add, edit inline, complete/undo, delete) with verified per-user isolation and a phone-friendly layout.
- Capacity: 20.
- Related items are derived from the goal wording:
  - US-010 (add)
  - US-012 (edit inline)
  - US-013 (complete/undo)
  - US-014 (delete)
  - US-015 (isolation)
  - US-017 (phone layout)
- Dates and completion status: not provided.

**Related:** US-010, US-012, US-013, US-014, US-015, US-017, DEV-PLAN-V1

### DEV-SPRINT-4 · approved · source: plan:Sprint 4

Sprint 4 confirms the MVP stays within agreed scope and ships documentation.

- Goal: Confirm the MVP stays within agreed scope and ship setup, usage and limitations documentation.
- Capacity: 20.
- Related items are derived from the goal wording:
  - US-018 (no profile, settings, billing or notifications surfaces)
  - US-009 (no password recovery, an accepted limitation)
  - US-019 (setup and usage documentation)
- Dates and completion status: not provided.

**Related:** US-009, US-018, US-019, DEV-PLAN-V1

### DEV-EPIC-001 · approved · source: plan:EPIC-001

Epic for account creation and sign-up. It has no points and no assigned role.

- Title: Account creation and sign-up.
- Points: none. Role: unassigned.
- Child stories are inferred from titles: US-001 and US-002.
- Project description: users sign up with name, email and password, and passwords are stored hashed.

**Related:** EPIC-001, US-001, US-002

### DEV-US-001 · approved · source: plan:US-001

Story: register a new account. It is estimated at 5 points and assigned to backend-agent.

- Title: Register a new account.
- Points: 5. Role: backend-agent.
- Project description context: sign-up uses name, email and password, and passwords are stored hashed.
- Build status: not reported.

**Related:** US-001, EPIC-001

### DEV-US-002 · approved · source: plan:US-002

Story: sign-up validation feedback. It is estimated at 3 points and assigned to backend-agent.

- Title: Sign-up validation feedback.
- Points: 3. Role: backend-agent.
- Specific validation rules: not provided in input.
- Build status: not reported.

**Related:** US-002, EPIC-001

### DEV-EPIC-002 · approved · source: plan:EPIC-002

Epic for sign-in, sessions and sign-out. It has no points and no assigned role.

- Title: Sign-in, sessions and sign-out.
- Points: none. Role: unassigned.
- Child stories are inferred from titles: US-003 to US-009.

**Related:** EPIC-002, US-003, US-004, US-005, US-006, US-007, US-008, US-009

### DEV-US-003 · approved · source: plan:US-003

Story: sign in with email and password. It is estimated at 3 points and assigned to backend-agent.

- Title: Sign in with email and password.
- Points: 3. Role: backend-agent.
- Build status: not reported.

**Related:** US-003, EPIC-002

### DEV-US-004 · approved · source: plan:US-004

Story: show a single generic message when sign-in fails. It is estimated at 2 points and assigned to security-agent.

- Title: Single generic failed sign-in message.
- Points: 2. Role: security-agent.
- Project description wording for the message: "Email or password is incorrect".
- Build status: not reported.

**Related:** US-004, EPIC-002

### DEV-US-005 · approved · source: plan:US-005

Story: rate-limit sign-in attempts. It is estimated at 3 points and assigned to security-agent.

- Title: Rate-limited sign-in attempts.
- Points: 3. Role: security-agent.
- Thresholds and lockout window: not provided in input.
- Build status: not reported.

**Related:** US-005, EPIC-002

### DEV-US-006 · approved · source: plan:US-006

Story: keep users signed in for 30 days. It is estimated at 3 points and assigned to backend-agent.

- Title: Stay signed in for 30 days.
- Points: 3. Role: backend-agent.
- Sprint 2 goal describes this as a 30-day cookie.
- Build status: not reported.

**Related:** US-006, EPIC-002

### DEV-US-007 · approved · source: plan:US-007

Story: sign out. It is estimated at 2 points and assigned to backend-agent.

- Title: Sign out.
- Points: 2. Role: backend-agent.
- Build status: not reported.

**Related:** US-007, EPIC-002

### DEV-US-008 · approved · source: plan:US-008

Story: redirect signed-out visitors to Sign in. It is estimated at 3 points and assigned to frontend-agent.

- Title: Signed-out visitors are redirected to Sign in.
- Points: 3. Role: frontend-agent.
- Project description context: a signed-out user who opens a private page goes to the sign-in page.
- Build status: not reported.

**Related:** US-008, EPIC-002

### DEV-US-009 · approved · source: plan:US-009

Story: no password recovery path, recorded as an accepted limitation. It is estimated at 1 point and assigned to qa-agent.

- Title: No password recovery path (accepted limitation).
- Points: 1. Role: qa-agent.
- Consistent with the project description, which lists password reset as out of scope.
- Build and verification status: not reported.

**Related:** US-009, EPIC-002

### DEV-EPIC-003 · approved · source: plan:EPIC-003

Epic for creating and managing tasks on My tasks. It has no points and no assigned role.

- Title: My tasks: creating and managing tasks.
- Points: none. Role: unassigned.
- Child stories are inferred from titles: US-010 to US-014.

**Related:** EPIC-003, US-010, US-011, US-012, US-013, US-014

### DEV-US-010 · approved · source: plan:US-010

Story: add a task. It is estimated at 5 points and assigned to frontend-agent.

- Title: Add a task.
- Points: 5. Role: frontend-agent.
- Build status: not reported.

**Related:** US-010, EPIC-003

### DEV-US-011 · approved · source: plan:US-011

Story: view the task list with newest tasks first. It is estimated at 5 points and assigned to frontend-agent.

- Title: View my task list newest first.
- Points: 5. Role: frontend-agent.
- Build status: not reported.

**Related:** US-011, EPIC-003

### DEV-US-012 · approved · source: plan:US-012

Story: edit a task title inline. It is estimated at 3 points and assigned to frontend-agent.

- Title: Edit a task title inline.
- Points: 3. Role: frontend-agent.
- Build status: not reported.

**Related:** US-012, EPIC-003

### DEV-US-013 · approved · source: plan:US-013

Story: mark a task complete and undo it. It is estimated at 3 points and assigned to frontend-agent.

- Title: Mark a task complete and undo it.
- Points: 3. Role: frontend-agent.
- Build status: not reported.

**Related:** US-013, EPIC-003

### DEV-US-014 · approved · source: plan:US-014

Story: delete a task after confirming. It is estimated at 3 points and assigned to frontend-agent.

- Title: Delete a task after confirming.
- Points: 3. Role: frontend-agent.
- Build status: not reported.

**Related:** US-014, EPIC-003

### DEV-EPIC-004 · approved · source: plan:EPIC-004

Epic for per-user data privacy and storage. It has no points and no assigned role.

- Title: Per-user data privacy and storage.
- Points: none. Role: unassigned.
- Child stories are inferred from titles: US-015 and US-016, plus tasks US-016-T1 to T4.

**Related:** EPIC-004, US-015, US-016

### DEV-US-015 · approved · source: plan:US-015

Story: each user sees only their own tasks. It is estimated at 3 points and assigned to security-agent.

- Title: See only my own tasks.
- Points: 3. Role: security-agent.
- Sprint 3 goal calls for verified per-user isolation.
- Build and verification status: not reported.

**Related:** US-015, EPIC-004

### DEV-US-016 · approved · source: plan:US-016

Story: durable storage of accounts and tasks. It is the largest story at 8 points, assigned to devops-agent, and is broken into 4 tasks.

- Title: Durable storage of accounts and tasks.
- Points: 8. Role: devops-agent.
- Tasks: T1 (RDS PostgreSQL 16), T2 (schema migrations), T3 (HTTPS ALB deployment), T4 (persistence smoke test).
- Build status: not reported.

**Related:** US-016, EPIC-004, US-016-T1, US-016-T2, US-016-T3, US-016-T4

### DEV-US-016-T1 · approved · source: plan:US-016-T1

Task: provision PostgreSQL 16 on Amazon RDS with automated backups.

- Points: none. Role: devops-agent.
- Target: PostgreSQL 16 on Amazon RDS, with automated backups.
- Backup retention and instance details: not provided.
- Status: not reported.

**Related:** US-016

### DEV-US-016-T2 · approved · source: plan:US-016-T2

Task: add initial schema migrations.

- Points: none. Role: backend-agent.
- Schema contents: not provided.
- Status: not reported.

**Related:** US-016

### DEV-US-016-T3 · approved · source: plan:US-016-T3

Task: deploy the API and SPA behind an HTTPS Application Load Balancer.

- Points: none. Role: devops-agent.
- Architecture noted: API plus single-page app (SPA), behind an HTTPS Application Load Balancer on AWS.
- Status: not reported.

**Related:** US-016

### DEV-US-016-T4 · approved · source: plan:US-016-T4

Task: add a smoke test confirming data persists across redeploys.

- Points: none. Role: qa-agent.
- Test results: not provided.
- Status: not reported.

**Related:** US-016

### DEV-EPIC-005 · approved · source: plan:EPIC-005

Epic for responsive delivery and documentation. It has no points and no assigned role.

- Title: Responsive delivery and documentation.
- Points: none. Role: unassigned.
- Child stories are inferred from titles: US-017, US-018, US-019.

**Related:** EPIC-005, US-017, US-018, US-019

### DEV-US-017 · approved · source: plan:US-017

Story: use the app on a phone or tablet browser. It is estimated at 3 points and assigned to frontend-agent.

- Title: Use the app on a phone or tablet browser.
- Points: 3. Role: frontend-agent.
- Build status: not reported.

**Related:** US-017, EPIC-005

### DEV-US-018 · approved · source: plan:US-018

Story: confirm there are no profile, settings, billing or notification surfaces. It is estimated at 1 point and assigned to qa-agent.

- Title: No profile, settings, billing or notifications surfaces.
- Points: 1. Role: qa-agent.
- Scope guard, consistent with the project description: pages limited to Sign up, Sign in and My tasks; roles out of scope.
- Verification status: not reported.

**Related:** US-018, EPIC-005

### DEV-US-019 · approved · source: plan:US-019

Story: setup and usage documentation. It is estimated at 2 points and assigned to devops-agent.

- Title: Setup and usage documentation.
- Points: 2. Role: devops-agent.
- Sprint 4 goal also mentions documenting limitations.
- Status: not reported.

**Related:** US-019, EPIC-005
<!-- sdlc:auto:end narrative -->
