<!-- sdlc:auto:start adr -->
# ADR-0004: Use AWS for Cloud

Status: Accepted  
Date: 2026-11-06

## Context and Problem Statement

Which Cloud technology does the project use? Decided in architecture v1.

## Considered Options

- AWS
- Azure
- GCP

## Decision Outcome

Chosen option: AWS, because On AWS, one ECS Fargate task behind an ALB plus a small RDS instance with automated backups and encryption at rest keeps cost low. Secrets Manager holds the session secret.

## Consequences

There is more initial setup (VPC, ALB, ECS) than a PaaS. It can be templated once in the README and infrastructure scripts.
<!-- sdlc:auto:end adr -->