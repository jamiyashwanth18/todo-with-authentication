# Data Model

<!-- sdlc:auto:start entities -->
### users

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| name | varchar(255) | False | — | False |
| email | varchar(320) stored lowercased, unique index on lower(email) | False | — | False |
| password_hash | text (argon2id) | False | — | False |

### tasks

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| user_id | uuid | False | users.id | False |
| title | varchar(255) CHECK (length(btrim(title)) > 0) | False | — | False |
| completed | boolean default false | False | — | False |
| created_at | timestamptz default now() | False | — | False |

### sessions

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| user_id | uuid | False | users.id | False |
| token_hash | char(64) unique (sha256 of random token) | False | — | False |
| created_at | timestamptz | False | — | False |
| expires_at | timestamptz (created_at + 30 days) | False | — | False |
| revoked_at | timestamptz | False | — | True |

### login_attempts

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | bigserial | True | — | False |
| source_ip | inet | False | — | False |
| attempted_at | timestamptz default now() | False | — | False |
<!-- sdlc:auto:end entities -->

<!-- sdlc:auto:start relationships -->
| Source | Target | Type |
|---|---|---|
| users | tasks | one-to-many |
| users | sessions | one-to-many |
<!-- sdlc:auto:end relationships -->

<!-- sdlc:auto:start er-diagram -->
```mermaid
erDiagram
  users {
    uuid id PK
    varchar_255_ name
    varchar_320__stored_lowercased__unique_index_on_lower_email_ email
    text__argon2id_ password_hash
  }
  tasks {
    uuid id PK
    uuid user_id FK
    varchar_255__CHECK__length_btrim_title_____0_ title
    boolean_default_false completed
    timestamptz_default_now__ created_at
  }
  sessions {
    uuid id PK
    uuid user_id FK
    char_64__unique__sha256_of_random_token_ token_hash
    timestamptz created_at
    timestamptz__created_at___30_days_ expires_at
    timestamptz revoked_at
  }
  login_attempts {
    bigserial id PK
    inet source_ip
    timestamptz_default_now__ attempted_at
  }
  users ||--o{ tasks : "one-to-many"
  users ||--o{ sessions : "one-to-many"
```
<!-- sdlc:auto:end er-diagram -->
