# Product Requirements

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
## Summary

### REQ-SCOPE · draft · source: requirements:scope

Overall scope for v1 of 'TODO with authentication'. This is a lightweight delivery of a three-page To-Do web app with login: Sign up, Sign in and My tasks. The capability list and the exclusions below define the boundary.

- Project: TODO with authentication: a simple To-Do web app with login.
- Delivery scope: lightweight. Requirements version: 1.
- Pages: Sign up, Sign in, My tasks.
- Capabilities in scope:
  - Sign-up with name, email and password.
  - Sign-in with email and password.
  - A single 'Email or password is incorrect' message for any failed sign-in.
  - Hashed password storage.
  - Sign out.
  - Signed-out visitors are redirected to Sign in.
  - My tasks page.
  - Add a task with a one-line title.
  - Edit a task's title inline.
  - Mark a task complete and undo it.
  - Delete a task after a confirmation prompt.
  - Newest-first task list, with completed tasks struck through.
  - Per-user task privacy, enforced on the server.
  - Input checks: email format, 8-character password, 255-character title.
  - Accounts and tasks stored in the database.
  - Responsive layout for phone and tablet browsers.
  - Basic setup and usage documentation.
- Accepted constraints and limits:
  - Anyone with the URL can sign up. There is no invite code or approval.
  - Sessions last 30 days unless the user signs out.
  - A duplicate sign-up shows 'An account with this email already exists'.
  - There is no password reset. A user who forgets their password is locked out.
  - No profile or settings page.
  - No search, filter, sort, bulk actions or pagination.
  - The product never sends email.
  - The app is free, with no payments or billing.
  - Mobile is served by a responsive browser layout, not native apps or offline use.
- Out of scope (do not design or build):
  - Password reset / forgot password.
  - Social login (Google, Apple, etc.).
  - User roles and permissions (admin, etc.).
  - Due dates, reminders, notes, priorities, tags/categories, subtasks and file attachments on tasks.
  - Native iOS/Android apps and offline use.
  - Sharing, assigning or collaborating on tasks between users.
  - Email or push notifications and reminders.

**Related:** EPIC-001, EPIC-002, EPIC-003, EPIC-004, EPIC-005

### REQ-STACK · approved · source: requirements:technology-stack

The product owner approved the technology stack: FastAPI 0.115, AWS, PostgreSQL 16 and React 19. Designs must use exactly these, with no substitutions. EPIC-005 still carries an older Next.js + TypeScript assumption, and both versions are recorded below.

- Approved by: product owner. Instruction: design against exactly these; do not substitute.
- Backend: FastAPI 0.115.
  - The backend is a handful of operations: register, sign in, sign out and five task actions. Each action is checked server-side against the signed-in user's ID.
  - Validation rules are handled declaratively: valid email, 8-character password, non-empty title capped at 255.
  - Password hashing, HTTP-only session cookies and sign-in rate limiting come from the standard Python toolkit.
- Cloud: AWS.
  - A managed host with nothing exotic: no file uploads, no email, no integrations.
  - Runs the app and a managed PostgreSQL instance at small monthly cost for tens of users.
  - Provides automated database backups. This is the only safety net, given that forgotten passwords cannot be reset.
- Database: PostgreSQL 16.
  - Two tables: users and tasks.
  - A task belongs to exactly one user. The database enforces this ownership link.
  - Tens of users with hundreds of tasks each is well within capacity.
  - Leaves room for due dates or sharing later without a rebuild.
- Frontend: React 19.
  - Three screens. My tasks is mostly one interactive list where ticking, inline editing and deleting must feel instant.
  - Provides the responsive layout for phone browsers.
  - The stack note says the earlier working assumption was Next.js. Next.js is not available on this platform, and React is its core.
- CONFLICT, recorded as given:
  - Version A (EPIC-005 description): 'server-rendered responsive web application (assumption: Next.js + TypeScript on PostgreSQL, deployed to a managed cloud host)'.
  - Version B (approved stack): React 19 frontend + FastAPI 0.115 backend + PostgreSQL 16 on AWS. The stack note says Next.js is not available on this platform.
  - The input does not record whether EPIC-005's wording was updated. Confirm which applies (the approved stack appears to supersede it).

**Related:** EPIC-005, NFR-001, NFR-002, NFR-005, NFR-006, NFR-013

### EPIC-001 · draft · source: requirements:EPIC-001

Account creation and sign-up. Registration is open and self-service, using name, email and password. There is no invite gate, no email verification and no roles.

- Open self-service registration with name, email and password.
- Assumption: sign-up is open to anyone with the URL.
  - There is no invite code, email-domain allowlist or admin approval.
  - The 'private group' is controlled only by who is given the link. The input asks to flag this if the group should be gated.
- Assumption: the product never sends email, so there is no email verification step.
- Assumption: every account is an ordinary user. Roles and admin accounts are out of scope.
- Stories: US-001 (critical), US-002 (high).

**Related:** US-001, US-002, NFR-016

### US-001 · draft · source: requirements:US-001

[critical] Register a new account. A visitor who has the app URL creates an account with name, email and password. They are then signed in automatically and taken to My tasks.

- Story: a new visitor with the app URL creates an account with name, email and password to keep a private to-do list.
- AC-001: An unauthenticated visitor submits a non-empty name, a valid-format and unregistered email, and a password of at least 8 characters.
  - The account is created.
  - The user is signed in automatically and taken to My tasks.
- AC-002: The Sign up page offers exactly three fields (name, email, password), a submit control and a link to Sign in.
  - No invite code, no email verification step, no approval message.
- AC-003: The stored record contains name, email and password hash only.
  - The plaintext password is never persisted or logged.

**Related:** EPIC-001, NFR-001, NFR-016, AC-001, AC-002, AC-003

### US-002 · draft · source: requirements:US-002

[high] Sign-up validation feedback. Invalid sign-up details are refused with a clear, field-specific message. The server repeats every check.

- Story: a new visitor gets clear messages when sign-up details are not acceptable, so they can correct them without guessing.
- AC-004: An empty or whitespace-only name is refused. The message identifies the name field as required.
- AC-005: An invalid email format is refused. The message identifies the email field as invalid.
- AC-006: A password shorter than 8 characters is refused. The message says the password must be at least 8 characters.
- AC-007: A duplicate email in any letter case (e.g. test@example.com) creates no second account. The page shows exactly 'An account with this email already exists'.
- AC-008: JS validation is disabled or bypassed.
  - The server rejects an invalid name, invalid email, duplicate email or short password with the same outcome.
  - No account is created.

**Related:** EPIC-001, NFR-006, AC-004, AC-005, AC-006, AC-007, AC-008

### EPIC-002 · draft · source: requirements:EPIC-002

Sign-in, sessions and sign-out. Covers email and password authentication with one generic failure message, a 30-day server-side session in an HTTP-only cookie, sign-out, and redirection of signed-out visitors.

- Email and password authentication with a single generic failure message.
- 30-day server-side session carried in an HTTP-only cookie.
- Sign-out, and redirection of signed-out visitors to Sign in.
- Assumption: sign-in attempts are rate-limited.
- Assumption and accepted consequence: there is no password reset and no settings page.
  - A user who forgets their password is permanently locked out.
  - They can only regain access by registering a different email or through direct database intervention.
- Stories: US-003 to US-009.

**Related:** US-003, US-004, US-005, US-006, US-007, US-008, US-009, NFR-002, NFR-004, NFR-005, NFR-007, NFR-017

### US-003 · draft · source: requirements:US-003

[critical] Sign in with email and password. A registered user signs in and is taken to My tasks. The password is verified against a bcrypt or argon2 hash.

- Story: a registered user signs in with email and password to reach their own task list.
- AC-009: Correct credentials establish a session and take the user to My tasks.
- AC-010: The Sign in page offers email and password fields, a submit control and a link to Sign up.
  - No 'forgot password' option and no social sign-in options.
- AC-011: The password is stored as a bcrypt or argon2 hash and verified against that hash.
  - No plaintext comparison or plaintext storage.

**Related:** EPIC-002, NFR-001, AC-009, AC-010, AC-011

### US-004 · draft · source: requirements:US-004

[critical] Single generic failed sign-in message. Every failed sign-in shows exactly 'Email or password is incorrect', so registered emails cannot be discovered.

- Story: the app owner wants every failed sign-in to show the same message, so no one can learn which emails are registered.
- AC-012: Unknown email (unknown@example.com) with any password shows exactly 'Email or password is incorrect'. The user stays signed out.
- AC-013: Existing email (test@example.com) with a wrong password shows exactly 'Email or password is incorrect'. The user stays signed out.
- AC-014: Unknown-email and wrong-password attempts produce identical visible message, status and page behaviour.

**Related:** EPIC-002, NFR-004, AC-012, AC-013, AC-014

### US-005 · draft · source: requirements:US-005

[medium] Rate-limited sign-in attempts. Repeated failed sign-ins from one source are refused for a cooldown period. Threshold, window and cooldown are to be fixed at build time.

- Story: the app owner wants repeated failed sign-ins throttled to prevent brute-force guessing.
- AC-015: Basic rate limiting applies to the sign-in endpoint. This is an assumption from discovery; the exact threshold and window are to be fixed at build time.
  - Once the configured failure count from one source is exceeded within the window, further attempts are refused for the cooldown period.
  - The refusal does not reveal whether the email exists.
- AC-016: After the cooldown, correct credentials sign the user in normally.
- Open item: the threshold, window and cooldown values are not yet specified.

**Related:** EPIC-002, NFR-004, NFR-005, AC-015, AC-016

### US-006 · draft · source: requirements:US-006

[high] Stay signed in for 30 days. The session cookie is HttpOnly, Secure and SameSite and expires after 30 days. Returning users go straight to My tasks.

- Story: a signed-in user stays signed in for 30 days instead of signing in every visit.
- AC-017: A successful sign-in sets a session cookie with the HttpOnly and Secure flags, a SameSite restriction and a 30-day expiry.
- AC-018: A user who signed in less than 30 days ago and did not sign out reopens the app in the same browser.
  - They are still signed in and go straight to My tasks.
- AC-019: A session older than 30 days is no longer accepted. The user is redirected to Sign in.

**Related:** EPIC-002, NFR-002, AC-017, AC-018, AC-019

### US-007 · draft · source: requirements:US-007

[high] Sign out. Signing out invalidates the server session, clears the cookie and returns the user to Sign in. The back button must not show a cached My tasks page.

- Story: a signed-in user signs out so others using the same browser cannot see their tasks.
- AC-020: Selecting Sign out on My tasks invalidates the server-side session, clears the cookie and takes the user to Sign in.
- AC-021: Pressing back after sign-out does not serve My tasks from a stale cache. The user is redirected to Sign in.

**Related:** EPIC-002, NFR-007, AC-020, AC-021

### US-008 · draft · source: requirements:US-008

[critical] Signed-out visitors are redirected to Sign in. Private pages and task actions require a valid session. Signed-in users opening Sign in or Sign up are sent to My tasks.

- Story: the app owner wants private pages unreachable without a valid session, so task data is never exposed anonymously.
- AC-022: With no session cookie, opening the My tasks URL directly renders no task content and redirects to Sign in.
- AC-023: With no valid session, any create, edit, complete or delete request is rejected as unauthenticated. Stored data is not changed.
- AC-024: A signed-in user who opens Sign in or Sign up is taken to My tasks.

**Related:** EPIC-002, NFR-003, AC-022, AC-023, AC-024

### US-009 · draft · source: requirements:US-009

[medium] No password recovery path (accepted limitation). There are no forgot-password, reset or verification links. The documentation must state plainly that a user who forgets their password is locked out.

- Story: users of a small trusted group understand there is no password recovery, so they keep their password safe.
- AC-025: The app as delivered has no password reset, email sending or settings page (assumption).
  - No 'forgot password', 'reset password' or email-verification link appears on Sign in or Sign up.
- AC-026: There is no in-product recovery for a forgotten password.
  - The setup documentation states the user is locked out.
  - They can only be helped by registering a different email or by a direct database change.

**Related:** EPIC-002, NFR-017, US-019, AC-025, AC-026

### EPIC-003 · draft · source: requirements:EPIC-003

My tasks: creating and managing tasks. A single private page holds a flat list of tasks, each with a one-line title and a done/not-done state.

- A task is only a one-line title plus a done/not-done state.
- Assumptions carried from discovery:
  - One list view, newest first.
  - Completed tasks are struck through, not hidden.
  - Editing is inline. Deleting asks for confirmation.
- Assumption: v1 has no search, filter, sort controls, bulk actions, drag-to-reorder or pagination.
- Out of scope: due dates, notes, priorities, tags, subtasks, attachments, sharing, reminders.
- Stories: US-010 to US-014.

**Related:** US-010, US-011, US-012, US-013, US-014, NFR-011, NFR-018

### US-010 · draft · source: requirements:US-010

[critical] Add a task. The user types a 1 to 255 character title. The task is saved as not completed, appears at the top of the list and the input clears.

- Story: a signed-in user adds a task with a one-line title to capture something to do.
- AC-027: A title of 1 to 255 characters is saved as not completed.
  - The task appears at the top of the list.
  - The input is cleared for the next entry.
- AC-028: An empty or whitespace-only title creates no task. A message says the title is required.
- AC-029: A title over 255 characters creates no task. A message states the 255-character limit.
  - The server also rejects it if the client-side limit is bypassed.
- AC-030: The add form offers a title field only.
  - No due date, note, priority, tag or attachment inputs.

**Related:** EPIC-003, NFR-006, AC-027, AC-028, AC-029, AC-030

### US-011 · draft · source: requirements:US-011

[critical] View my task list newest first. All of the user's tasks show in one view, newest first. Completed tasks stay in place, struck through. An empty state appears when there are no tasks, and there is no pagination.

- Story: a signed-in user sees all their tasks in one list, newest at the top.
- AC-031: Tasks are listed in descending order of creation time.
- AC-032: Completed tasks keep their newest-first position.
  - They are struck through and visually de-emphasised, not hidden or moved.
- AC-033: With no tasks, an empty-state message invites the user to add their first task.
- AC-034: Several hundred tasks (the expected per-user ceiling) render in a single view with no pagination.
  - The page loads within a normally acceptable time for tens of users.
- AC-035: Only these controls are offered: add, edit, complete/uncomplete, delete and sign out.
  - No search, filter, sort, bulk actions, drag-to-reorder or pagination (assumption).

**Related:** EPIC-003, NFR-011, NFR-012, AC-031, AC-032, AC-033, AC-034, AC-035

### US-012 · draft · source: requirements:US-012

[high] Edit a task title inline. The title becomes editable in place, with no navigation and no modal. Valid saves persist, invalid saves are rejected, and cancel restores the original.

- Story: a signed-in user corrects a task title in place without leaving the page.
- AC-036: Activating edit makes the title an editable field in place.
  - No navigation to another page and no modal form.
- AC-037: Saving a 1 to 255 character title shows and persists the new title.
  - The completed state and list position are unchanged.
- AC-038: An empty, whitespace-only or over-255-character title is rejected with a validation message. The previous title is kept.
- AC-039: Cancelling restores the original title and saves nothing.

**Related:** EPIC-003, NFR-006, NFR-011, AC-036, AC-037, AC-038, AC-039

### US-013 · draft · source: requirements:US-013

[critical] Mark a task complete and undo it. The checkbox toggles the completed state, which persists. Completed tasks are struck through in place.

- Story: a signed-in user ticks a task off and unticks it again to track progress and fix mistakes.
- AC-040: Ticking saves the task as completed.
  - It is shown immediately struck through and de-emphasised, still in place.
- AC-041: Unticking saves the task as not completed and removes the strike-through.
- AC-042: After a reload or a later sign-in, each task shows the state the user last set.

**Related:** EPIC-003, NFR-011, AC-040, AC-041, AC-042

### US-014 · draft · source: requirements:US-014

[high] Delete a task after confirming. Delete opens a confirmation prompt naming the task. Confirming removes it permanently; cancelling keeps it. There is no undo or trash.

- Story: a signed-in user deletes a task, with a confirmation step to avoid accidents.
- AC-043: Selecting Delete shows a simple confirmation prompt.
  - The prompt names or clearly indicates the task.
  - It offers confirm and cancel options.
- AC-044: Confirming removes the task from the database and the list.
- AC-045: Cancelling leaves the task unchanged in the list.
- AC-046: A deleted task does not reappear on reload. There is no undo or trash in v1 (assumption).

**Related:** EPIC-003, NFR-018, AC-043, AC-044, AC-045, AC-046

### EPIC-004 · draft · source: requirements:EPIC-004

Per-user data privacy and storage. Each user's tasks are strictly isolated on the server, and accounts and tasks are stored durably in a managed PostgreSQL database.

- Assumption: every task operation is authorised server-side against the signed-in user's ID.
  - Another user's task cannot be read or modified, even by guessing its URL or ID.
- Assumption: data is stored in PostgreSQL on a managed cloud host.
- Data held is limited to names, emails, password hashes and self-written task titles.
- No special regulatory regime applies beyond ordinary good practice for personal data.
- No imports, exports or third-party integrations.
- Stories: US-015, US-016.

**Related:** US-015, US-016, NFR-003, NFR-008, NFR-009, NFR-010, NFR-013

### US-015 · draft · source: requirements:US-015

[critical] See only my own tasks. Users see and can act on only their own tasks. Requests for another user's task are refused without revealing that the task exists.

- Story: a signed-in user's tasks are invisible and unreachable to every other user.
- AC-047: User A's My tasks lists only tasks owned by A. None of user B's tasks appear.
- AC-048: User B sends a read, edit, complete or delete request using the ID or URL of A's task.
  - The server refuses it based on the signed-in user's ID and makes no change.
  - Nothing about the task's content or existence is revealed.
- AC-049: The owning user ID is always taken from the server-side session, never from a client-supplied parameter.

**Related:** EPIC-004, NFR-003, AC-047, AC-048, AC-049

### US-016 · draft · source: requirements:US-016

[critical] Durable storage of accounts and tasks. Data persists across sessions, devices, restarts and redeployments. The data model is minimal and all traffic uses HTTPS.

- Story: users' accounts and tasks are stored reliably, so the list is still there on return.
- AC-050: Signing in again from any browser or device shows tasks exactly as left: titles, completed states and order.
- AC-051: The data model is minimal.
  - A task holds only: identifier, owner user ID, title (max 255), completed flag, creation timestamp.
  - An account holds only: identifier, name, email, password hash.
- AC-052: After an app restart or redeploy on the managed host, all accounts and tasks are intact.
- AC-053: All traffic is served over HTTPS.
  - No personal data goes to third parties, since there are no integrations, imports or exports.
  - Assumption: no special regulatory regime applies.

**Related:** EPIC-004, NFR-008, NFR-009, NFR-013, AC-050, AC-051, AC-052, AC-053

### EPIC-005 · draft · source: requirements:EPIC-005

Responsive delivery and documentation. A responsive web app usable on phone, tablet and desktop, with no native apps, offline mode, billing, profile or settings. It ships with basic setup and usage documentation.

- Usable on phone, tablet and desktop browsers.
- Native mobile apps and offline use are out of scope.
- The app is free: no payments, plans or billing.
- No profile or settings page.
- Basic setup and usage documentation accompanies the build.
- CONFLICT, recorded as given:
  - This epic describes the app as 'server-rendered ... (assumption: Next.js + TypeScript on PostgreSQL, deployed to a managed cloud host)'.
  - The approved technology stack is React 19 + FastAPI 0.115 + PostgreSQL 16 on AWS. Its note says Next.js is unavailable on this platform.
  - See REQ-STACK.
- Stories: US-017, US-018, US-019.

**Related:** US-017, US-018, US-019, REQ-STACK, NFR-014, NFR-015

### US-017 · draft · source: requirements:US-017

[high] Use the app on a phone or tablet browser. All three pages fit a viewport of about 375px with touch-friendly controls. There is no offline mode and no installable app.

- Story: a user away from their desk manages tasks from a phone browser without installing anything.
- AC-054: At about 375px wide, Sign up, Sign in and My tasks fit the width.
  - No horizontal scrolling. Text stays legible.
- AC-055: Add, edit, tick, untick and delete are reachable and operable by touch.
  - Tap targets are large enough to use reliably.
- AC-056: When offline, the app is simply unavailable.
  - No installable app or offline mode is offered (assumption).

**Related:** EPIC-005, NFR-014, NFR-015, AC-054, AC-055, AC-056

### US-018 · draft · source: requirements:US-018

[medium] No profile, settings, billing or notification surfaces. The signed-in experience is only My tasks plus sign-out. There is no pricing and no email or push notifications.

- Story: the app owner keeps the MVP to its three pages, with nothing free, paid or configurable added.
- AC-057: Only My tasks plus sign-out exists when signed in.
  - No profile, settings or account-deletion option.
  - Users cannot change their name, email or password, or delete their account.
- AC-058: No pricing, plan, upgrade, payment or billing element appears on any page.
- AC-059: No email or push notification is sent for any action.
  - No email-provider credential is required to run the app.

**Related:** EPIC-005, AC-057, AC-058, AC-059

### US-019 · draft · source: requirements:US-019

[medium] Setup and usage documentation. A README covers prerequisites, environment variables, migrations, local run and deploy. It also covers usage and the agreed limitations.

- Story: a person deploying or joining the app can stand it up and get started without asking the developer.
- AC-060: The README states:
  - Prerequisites.
  - Environment variables, including the database connection and session secret.
  - How to run migrations.
  - How to run locally.
  - How to deploy to the managed cloud host.
- AC-061: The usage section explains signing up, signing in, adding, editing, completing and deleting tasks, and signing out.
- AC-062: The limitations section records:
  - Open sign-up with no invite or approval.
  - Permanent lock-out on a forgotten password.
  - No profile or settings page.
  - No search, filter, sort, bulk actions or pagination.
  - No sharing or notifications.
  - 30-day sessions.

**Related:** EPIC-005, US-009, AC-060, AC-061, AC-062

### NFR-001 · draft · source: requirements:NFR-001

[security] Passwords are stored only as bcrypt or argon2 hashes and verified against that hash at sign-in. Plaintext is never saved or logged.

- Passwords are stored only as a bcrypt or argon2 hash.
- They are checked against the hash at sign-in.
- The plain password is never saved in the database or written to logs.
- Applies to: US-001, US-003.

**Related:** US-001, US-003

### NFR-002 · draft · source: requirements:NFR-002

[security] The session is held server-side and carried in an HttpOnly, Secure, SameSite cookie that expires after 30 days.

- The session is held server-side.
- The cookie is marked HttpOnly and Secure, with a SameSite restriction.
- It expires 30 days after sign-in. After that the session is refused.
- Target: 30-day expiry with the HttpOnly, Secure and SameSite flags set.
- Applies to: US-006.

**Related:** US-006

### NFR-003 · draft · source: requirements:NFR-003

[security] Ownership is checked on the server for every task action, using the session identity only.

- Read, create, edit, complete and delete all take the owner's identity from the server-side session, never from browser input.
- One user cannot reach another's task, even by guessing its address or ID.
- A refusal reveals nothing about whether the task exists.
- Applies to: US-008, US-015.

**Related:** US-008, US-015

### NFR-004 · draft · source: requirements:NFR-004

[security] Failed sign-ins reveal nothing about which emails are registered.

- An unknown email and a wrong password produce exactly the same visible message, status and page behaviour.
- Applies to: US-004, US-005.

**Related:** US-004, US-005

### NFR-005 · draft · source: requirements:NFR-005

[security] Sign-in attempts are throttled, with a configurable threshold, window and cooldown.

- Repeated failed attempts from the same source are refused for a cooldown once a configured count within a configured window is exceeded.
- The threshold, window and cooldown are fixed at build time. Values are not yet given.
- Normal sign-in resumes after the cooldown.
- Applies to: US-005.

**Related:** US-005

### NFR-006 · draft · source: requirements:NFR-006

[security] All input checks are repeated on the server.

- The server enforces the rules on name, email format, duplicate email, 8-character minimum password and 1 to 255 character title.
- A request that bypasses browser checks is rejected with the same outcome, and nothing is stored.
- Target: password at least 8 characters; title 1 to 255 characters.
- Applies to: US-002, US-010, US-012.

**Related:** US-002, US-010, US-012

### NFR-007 · draft · source: requirements:NFR-007

[security] Private pages are not left in the browser cache after sign-out.

- Pressing back after sign-out must not show a cached My tasks page. The visitor is sent to Sign in.
- Applies to: US-007.

**Related:** US-007

### NFR-008 · draft · source: requirements:NFR-008

[privacy] All traffic is encrypted, and no personal data is shared outside the app.

- All traffic is served over HTTPS.
- With no integrations, imports or exports, no personal data goes to third parties.
- Applies to: US-016.

**Related:** US-016

### NFR-009 · draft · source: requirements:NFR-009

[privacy] Only the minimum personal data is held.

- Per account: name, email, password hash.
- Per task: identifier, owner, title, completed flag, creation time.
- Nothing else about a person is collected.
- Applies to: US-016.

**Related:** US-016

### NFR-010 · draft · source: requirements:NFR-010

[compliance] Ordinary good practice for personal data applies. No special regulatory regime is identified.

- Data held is limited to names, emails, password hashes and self-written task titles.
- No special regulatory regime applies. The product is held to ordinary good practice for personal data.
- No industry or domain skill was named in the input, so no regulation-specific trace is recorded.
- Applies to: whole system.

### NFR-011 · draft · source: requirements:NFR-011

[performance] The whole task list loads quickly, and interactions feel instant.

- A user with several hundred tasks sees the whole list in one view with no pagination, within a normally acceptable load time.
- Ticking, inline editing and deleting feel immediate.
- No numeric latency target is given.
- Applies to: US-011, US-012, US-013.

**Related:** US-011, US-012, US-013

### NFR-012 · draft · source: requirements:NFR-012

[scalability] Sized for a small private group.

- Target: tens of users, several hundred tasks per user. This is the expected ceiling.
- Applies to: whole system.

### NFR-013 · draft · source: requirements:NFR-013

[availability] Accounts and tasks survive restarts and redeploys, with automated database backups as the safety net.

- Data is held in the managed database.
- Titles, completed states and order are unchanged after a restart or redeploy.
- Automated database backups are the safety net.
- Applies to: US-016.

**Related:** US-016, REQ-STACK

### NFR-014 · draft · source: requirements:NFR-014

[usability] The app is usable on a phone screen by touch.

- At about 375px, each page fits the width with no horizontal scrolling and legible text.
- Every control is touch-operable, with tap targets large enough to use reliably.
- Target: fits a viewport of about 375px wide with no horizontal scrolling.
- Applies to: US-017.

**Related:** US-017

### NFR-015 · draft · source: requirements:NFR-015

[availability] Accepted risk: no offline use.

- Native apps and offline working are excluded.
- Without a connection the app is unavailable. No installable or offline mode is offered.
- Applies to: US-017.

**Related:** US-017

### NFR-016 · draft · source: requirements:NFR-016

[security] Accepted risk: sign-up is open to anyone with the link.

- No invite code, email-domain allowlist or approval step.
- The private group is controlled only by who is given the URL.
- Applies to: US-001.

**Related:** US-001, EPIC-001

### NFR-017 · draft · source: requirements:NFR-017

[usability] Accepted risk: a forgotten password means permanent lock-out.

- Password reset, email sending and a settings page are all out of scope.
- A user who forgets their password is permanently locked out.
- Access can only be regained by registering a different email or by a direct database change.
- Applies to: US-009.

**Related:** US-009

### NFR-018 · draft · source: requirements:NFR-018

[usability] Accepted risk: deleted tasks cannot be recovered.

- Apart from the confirmation prompt, there is no undo and no trash.
- A confirmed deletion is permanent.
- Applies to: US-014.

**Related:** US-014
<!-- sdlc:auto:end narrative -->

<!-- sdlc:auto:start summary -->
**Requirements version:** v1  
**Delivery scope:** lightweight  
**Approved:** 2026-11-06

**Capabilities in scope:** Sign-up with name, email and password, Sign-in with email and password, Single "Email or password is incorrect" message for any failed sign-in, Hashed password storage, Sign out, Redirect of signed-out visitors to Sign in, My tasks page, Add a task with a one-line title, Edit a task's title inline, Mark a task complete and undo it, Delete a task after a confirmation prompt, Newest-first task list with completed tasks struck through, Per-user task privacy enforced on the server, Sign-up and task input checks (email, 8-character password, 255-character title), Task and account storage in the database, Responsive layout for phone and tablet browsers, Basic setup and usage documentation, Anyone with the URL can sign up, with no invite code or approval, Sessions last 30 days unless the user signs out, Duplicate sign-up shows "An account with this email already exists", No password reset: a user who forgets their password is locked out, No profile or settings page, No search, filter, sort, bulk actions or pagination, No email is ever sent by the product, Free app with no payments or billing, Mobile served by responsive browser layout, not native apps or offline use

**Approved technology stack:**

| Layer | Choice | Rationale |
|---|---|---|
| backend | FastAPI | The whole backend is a handful of operations: register, sign in, sign out, and five task actions, each of which must be checked against the signed-in user's ID server-side. FastAPI does exactly that with very little code, handles your validation rules (valid email, 8-character password, non-empty title capped at 255) declaratively, and supports password hashing, HTTP-only session cookies and sign-in rate limiting out of the standard Python toolkit. |
| cloud | AWS | You asked for a managed host and nothing exotic: no file uploads, no email, no integrations. AWS runs the app and a managed PostgreSQL instance reliably at a small monthly cost for an audience of tens of people, and gives you automated database backups — which is your only safety net given that forgotten passwords cannot be reset. |
| database | PostgreSQL | You have two tables — users and tasks — and the one rule that really matters is that a task belongs to exactly one user and can never be read by another. PostgreSQL enforces that ownership link at the database level, so a bug in the app can't quietly orphan or cross-link data. At tens of users and hundreds of tasks each, this is far inside its comfort zone, and it leaves room for due dates or sharing later without a rebuild. |
| frontend | React | Your three screens — sign up, sign in, my tasks — are mostly one interactive list where ticking a box, editing a title inline and deleting need to feel instant. React handles that comfortably and gives you a responsive layout that works in a phone browser, which is how you said mobile users will be served. Note: the earlier working assumption said Next.js; that isn't available on this platform, and React is its core anyway, so you lose nothing that matters for an app this small. |
<!-- sdlc:auto:end summary -->

<!-- sdlc:auto:start epics -->
## EPIC-001: Account creation and sign-up

Open self-service registration with name, email and password. Assumption carried from discovery: sign-up is open to anyone who has the URL — there is no invite code, email-domain allowlist or admin approval step. The "private group" is controlled only by who is given the link; say so if the group should be gated. Assumption: no email is ever sent by the product, so there is no email verification step. Assumption: every account is an ordinary user — roles and admin accounts are out of scope.

### US-001: Register a new account

**Priority:** critical

> As a new visitor who has been given the app URL, I want to create an account with my name, email and password, so that I can keep a private to-do list.

| ID | Given | When | Then |
|---|---|---|---|
| AC-001 | I am an unauthenticated visitor on the Sign up page | I submit a non-empty name, a valid-format email that is not already registered, and a password of at least 8 characters | an account is created, I am signed in automatically and taken to the My tasks page |
| AC-002 | I am on the Sign up page | the page loads | it offers exactly three fields (name, email, password), a submit control and a link to the Sign in page — no invite code, no email verification step and no approval message |
| AC-003 | I have just registered | the account record is written | the stored record contains my name, email and a password hash only, and the plaintext password is never persisted or logged |

### US-002: Sign-up validation feedback

**Priority:** high

> As a new visitor, I want clear messages when my sign-up details are not acceptable, so that I can correct them without guessing.

| ID | Given | When | Then |
|---|---|---|---|
| AC-004 | I am on the Sign up page | I submit with an empty or whitespace-only name | the account is not created and a validation message identifies the name field as required |
| AC-005 | I am on the Sign up page | I submit an email that is not a valid email format | the account is not created and a validation message identifies the email field as invalid |
| AC-006 | I am on the Sign up page | I submit a password shorter than 8 characters | the account is not created and a validation message states that the password must be at least 8 characters |
| AC-007 | an account already exists for test@example.com | I submit the Sign up form with test@example.com (in any letter case) | no second account is created and the page shows exactly "An account with this email already exists" |
| AC-008 | a client with JavaScript validation disabled or bypassed | a sign-up request with invalid name, email, duplicate email or short password reaches the server | the server rejects it with the same validation outcome and no account is created |

## EPIC-002: Sign-in, sessions and sign-out

Email and password authentication with a single generic failure message, a 30-day server-side session in an HTTP-only cookie, sign-out, and redirection of signed-out visitors to the Sign in page. Assumption: sign-in attempts are rate-limited. Assumption and accepted consequence: password reset is out of scope and there is no settings page, so a user who forgets their password is permanently locked out and can only regain access by registering a different email address or by direct database intervention.

### US-003: Sign in with email and password

**Priority:** critical

> As a registered user, I want to sign in with my email and password, so that I can reach my own task list.

| ID | Given | When | Then |
|---|---|---|---|
| AC-009 | I have a registered account | I submit my correct email and password on the Sign in page | a session is established and I am taken to the My tasks page |
| AC-010 | I am on the Sign in page | the page loads | it offers email and password fields, a submit control and a link to Sign up, and shows no "forgot password" or social sign-in options |
| AC-011 | a stored account whose password is held as a bcrypt or argon2 hash | I sign in | the submitted password is verified against the hash and no plaintext comparison or plaintext storage is involved |

### US-004: Single generic failed sign-in message

**Priority:** critical

> As a security-conscious owner of the app, I want every failed sign-in to show the same message, so that no one can learn which email addresses are registered.

| ID | Given | When | Then |
|---|---|---|---|
| AC-012 | no account exists for unknown@example.com | I submit unknown@example.com with any password | the page shows exactly "Email or password is incorrect" and I remain signed out |
| AC-013 | an account exists for test@example.com | I submit test@example.com with the wrong password | the page shows exactly "Email or password is incorrect" and I remain signed out |
| AC-014 | two failed sign-in attempts, one with an unknown email and one with a wrong password | the responses are compared | the visible message, status and page behaviour are identical in both cases |

### US-005: Rate-limited sign-in attempts

**Priority:** medium

> As a owner of the app, I want repeated failed sign-in attempts to be throttled, so that passwords cannot be guessed by brute force.

| ID | Given | When | Then |
|---|---|---|---|
| AC-015 | basic rate limiting is applied to the sign-in endpoint (assumption carried from discovery; exact threshold and window to be fixed at build time) | the configured number of failed attempts from the same source is exceeded within the configured window | further sign-in attempts are refused for the configured cooldown period without revealing whether the email exists |
| AC-016 | a user who has been rate-limited | the cooldown period has elapsed and correct credentials are supplied | sign-in succeeds normally |

### US-006: Stay signed in for 30 days

**Priority:** high

> As a signed-in user, I want my session to persist for 30 days, so that I do not have to sign in every time I open the app.

| ID | Given | When | Then |
|---|---|---|---|
| AC-017 | I have signed in successfully | the response is returned | a session cookie is set with the HttpOnly and Secure flags, a SameSite restriction, and an expiry of 30 days |
| AC-018 | I signed in less than 30 days ago and did not sign out | I reopen the app in the same browser | I am still signed in and go straight to My tasks |
| AC-019 | my session is older than 30 days | I open a private page | the session is no longer accepted and I am redirected to the Sign in page |

### US-007: Sign out

**Priority:** high

> As a signed-in user, I want to sign out, so that my tasks are not visible to anyone else using the same browser.

| ID | Given | When | Then |
|---|---|---|---|
| AC-020 | I am signed in on My tasks | I select Sign out | the server-side session is invalidated, the session cookie is cleared and I am taken to the Sign in page |
| AC-021 | I have just signed out | I press the browser back button to return to My tasks | the page is not served from a stale cache and I am redirected to the Sign in page |

### US-008: Signed-out visitors are redirected to Sign in

**Priority:** critical

> As a owner of the app, I want private pages to be unreachable without a valid session, so that task data is never exposed to anonymous visitors.

| ID | Given | When | Then |
|---|---|---|---|
| AC-022 | I have no session cookie | I open the My tasks URL directly | no task content is rendered and I am redirected to the Sign in page |
| AC-023 | I have no valid session | a request is made to any task create, edit, complete or delete action | the server rejects it as unauthenticated and makes no change to stored data |
| AC-024 | I am already signed in | I open the Sign in or Sign up page | I am taken to My tasks instead |

### US-009: No password recovery path (accepted limitation)

**Priority:** medium

> As a user of a small trusted group, I want to understand that there is no way to recover a forgotten password, so that I keep my password safe and am not surprised by being locked out.

| ID | Given | When | Then |
|---|---|---|---|
| AC-025 | the app as delivered (assumption: password reset, email sending and a settings page are all out of scope) | I inspect the Sign in and Sign up pages | no "forgot password", "reset password" or email-verification link is present anywhere |
| AC-026 | a user who has forgotten their password | they attempt to regain access through the product | no in-product recovery exists; the setup documentation states plainly that such a user is locked out and can only be helped by registering a different email or by a direct database change |

## EPIC-003: My tasks: creating and managing tasks

The single private page where a signed-in user manages a flat list of tasks. A task is nothing more than a one-line title plus a done/not-done state. Assumption carried from discovery: the list is a single view, newest first, with completed tasks struck through rather than hidden; editing is inline; deleting asks for confirmation. Assumption: no search, filter, sort controls, bulk actions, drag-to-reorder or pagination in v1. Out of scope: due dates, notes, priorities, tags, subtasks, attachments, sharing and reminders.

### US-010: Add a task

**Priority:** critical

> As a signed-in user, I want to add a task by typing a one-line title, so that I can capture something I need to do.

| ID | Given | When | Then |
|---|---|---|---|
| AC-027 | I am signed in on My tasks | I enter a title of 1 to 255 characters and submit it | the task is saved as not-completed, appears at the top of my list, and the input is cleared ready for the next entry |
| AC-028 | I am on My tasks | I submit an empty or whitespace-only title | no task is created and a validation message tells me the title is required |
| AC-029 | I am on My tasks | I submit a title longer than 255 characters | no task is created and a validation message states the 255-character limit; the server rejects the request even if the client-side limit is bypassed |
| AC-030 | the add-task form | I inspect it | it offers a title field only — no due date, note, priority, tag or attachment inputs |

### US-011: View my task list newest first

**Priority:** critical

> As a signed-in user, I want one list of all my tasks with the newest at the top, so that I can see everything I have captured at a glance.

| ID | Given | When | Then |
|---|---|---|---|
| AC-031 | I have several tasks created at different times | I open My tasks | all of my tasks are listed in descending order of creation time, with the most recently created first |
| AC-032 | I have tasks marked complete | I view the list | completed tasks remain in the list in the same newest-first position, shown struck through and visually de-emphasised rather than hidden or moved |
| AC-033 | I have no tasks yet | I open My tasks | an empty-state message invites me to add my first task |
| AC-034 | I have several hundred tasks (the expected per-user ceiling) | I open My tasks | the whole list is rendered in a single view with no pagination, and the page loads within a normally acceptable time for tens of users at this scale |
| AC-035 | the My tasks page (assumption: no search, filter, sort, bulk actions, drag-to-reorder or pagination in v1) | I inspect the controls available | only add, edit, complete/uncomplete, delete and sign out are offered |

### US-012: Edit a task title inline

**Priority:** high

> As a signed-in user, I want to correct a task's title in place on the list, so that I can fix mistakes without leaving the page.

| ID | Given | When | Then |
|---|---|---|---|
| AC-036 | I am viewing my task list | I activate edit on a task | the title becomes an editable field in place on the same page, with no navigation to another page or modal form |
| AC-037 | I am editing a task title | I save a new title of 1 to 255 characters | the task shows the new title, its completed state and list position are unchanged, and the change is persisted |
| AC-038 | I am editing a task title | I save an empty, whitespace-only or over-255-character title | the change is rejected with a validation message and the previous title is retained |
| AC-039 | I am editing a task title | I cancel the edit | the original title is restored and nothing is saved |

### US-013: Mark a task complete and undo it

**Priority:** critical

> As a signed-in user, I want to tick a task off and untick it again, so that I can track what I have finished and correct mistakes.

| ID | Given | When | Then |
|---|---|---|---|
| AC-040 | a not-completed task in my list | I tick its checkbox | it is saved as completed and is immediately shown struck through and de-emphasised, still in place in the list |
| AC-041 | a completed task in my list | I untick its checkbox | it is saved as not-completed and the strike-through styling is removed |
| AC-042 | I have toggled tasks | I reload My tasks or sign in again later | each task shows the completed state I last set |

### US-014: Delete a task after confirming

**Priority:** high

> As a signed-in user, I want to delete a task, with a confirmation step, so that I can remove clutter without losing something by accident.

| ID | Given | When | Then |
|---|---|---|---|
| AC-043 | a task in my list | I select Delete | a simple confirmation prompt appears naming or clearly indicating the task, with confirm and cancel options |
| AC-044 | the delete confirmation prompt is shown | I confirm | the task is removed from the database and disappears from my list |
| AC-045 | the delete confirmation prompt is shown | I cancel | the task is unchanged and remains in my list |
| AC-046 | a deleted task (assumption: no undo or trash in v1) | I reload the page | the task does not reappear and there is no recovery option in the product |

## EPIC-004: Per-user data privacy and storage

Strict server-side isolation of each user's tasks, and durable storage of accounts and tasks. Assumption carried from discovery: every task operation is authorised against the signed-in user's ID on the server, so a task belonging to another user cannot be read or modified even by guessing its URL or ID. Assumption: accounts and tasks are stored in a PostgreSQL database on a managed cloud host; the data held is limited to names, emails, password hashes and self-written task titles, with no special regulatory regime beyond ordinary good practice for personal data. No imports, exports or third-party integrations.

### US-015: See only my own tasks

**Priority:** critical

> As a signed-in user, I want my tasks to be invisible and unreachable to every other user, so that my list stays private.

| ID | Given | When | Then |
|---|---|---|---|
| AC-047 | user A and user B each have tasks | user A opens My tasks | only tasks owned by user A are listed and none of user B's tasks appear |
| AC-048 | user B knows the identifier or URL of a task owned by user A | user B issues a read, edit, complete or delete request for that task | the server refuses the request based on the signed-in user's ID, makes no change, and reveals nothing about the task's content or existence |
| AC-049 | any task operation | it is executed on the server | the owning user ID is taken from the server-side session and never from a client-supplied parameter |

### US-016: Durable storage of accounts and tasks

**Priority:** critical

> As a user, I want my account and tasks to be stored reliably, so that my list is still there when I come back.

| ID | Given | When | Then |
|---|---|---|---|
| AC-050 | I have created tasks and signed out | I sign in again from any browser or device | my tasks are shown exactly as I left them, including their titles, completed states and order |
| AC-051 | the data model | it is inspected | a task record holds only an identifier, owner user ID, title (max 255 characters), completed flag and creation timestamp, and an account record holds only an identifier, name, email and password hash |
| AC-052 | the application is restarted or redeployed on the managed cloud host | users sign in afterwards | all previously stored accounts and tasks are intact |
| AC-053 | the product holds only names, emails, password hashes and self-written task titles (assumption: no special regulatory regime applies) | data is transmitted | all traffic is served over HTTPS and no personal data is sent to any third party, since there are no integrations, imports or exports |

## EPIC-005: Responsive delivery and documentation

The app is a server-rendered responsive web application (assumption: Next.js + TypeScript on PostgreSQL, deployed to a managed cloud host) usable on phone, tablet and desktop browsers. Native mobile apps and offline use are explicitly out of scope. The app is free: there are no payments, plans or billing anywhere in the product, and no profile or settings page exists. Basic setup and usage documentation accompanies the build.

### US-017: Use the app on a phone or tablet browser

**Priority:** high

> As a user away from my desk, I want the three pages to work on a small screen, so that I can manage tasks from my phone without installing anything.

| ID | Given | When | Then |
|---|---|---|---|
| AC-054 | a phone browser at a typical viewport width of around 375px | I open Sign up, Sign in or My tasks | the layout fits the width without horizontal scrolling and all text is legible |
| AC-055 | a phone or tablet browser | I add, edit, tick, untick or delete a task | every control is reachable and operable by touch, with tap targets large enough to use reliably |
| AC-056 | the delivered product (assumption: native iOS/Android apps and offline use are out of scope) | I am offline | the app is simply unavailable, and no installable app or offline mode is offered |

### US-018: No profile, settings, billing or notifications surfaces

**Priority:** medium

> As a owner of the app, I want the product to stay to its three pages with nothing free, paid or configurable bolted on, so that the MVP stays as simple as agreed.

| ID | Given | When | Then |
|---|---|---|---|
| AC-057 | the delivered app (assumption: there is no profile/settings page, so users cannot change their name, email or password, or delete their account) | I browse the whole signed-in experience | only the My tasks page plus sign-out exists, with no profile, settings or account-deletion option |
| AC-058 | the delivered app (assumption: the app is entirely free) | I browse any page | no pricing, plan, upgrade, payment or billing element appears anywhere |
| AC-059 | the delivered app (assumption: no email is ever sent) | I complete sign-up, sign-in, sign-out or any task action | no email or push notification is sent and no email-provider credential is required to run the app |

### US-019: Setup and usage documentation

**Priority:** medium

> As a person deploying or joining the app, I want short written instructions for running and using it, so that I can stand it up and get started without asking the developer.

| ID | Given | When | Then |
|---|---|---|---|
| AC-060 | the delivered repository | I read the README | it states the prerequisites, environment variables (including the database connection and session secret), how to run database migrations, how to run the app locally and how to deploy it to the managed cloud host |
| AC-061 | the documentation | I read the usage section | it explains signing up, signing in, adding, editing, completing and deleting tasks, and signing out |
| AC-062 | the documentation | I read the limitations section | it records the agreed exclusions and open assumptions: open sign-up with no invite code or approval, permanent lock-out on a forgotten password, no profile/settings page, no search, filter, sort, bulk actions or pagination, no sharing or notifications, and 30-day sessions |
<!-- sdlc:auto:end epics -->
