---
title: Mini DBaas - Self-Service Postgres on Demand.
draft: false
date:  2026-07-05
github: https://github.com/machugram/minidbaas
---

**Mini DBaas** is a self-service platform that provisions and manages Postgres instances on demand. Teams can spin up isolated databases without waiting for infrastructure — each instance gets its own container, managed roles, encrypted credentials, and automatic backups. The control plane is a FastAPI service that enforces quotas, handles credential rotation, patches instances, and cleans up expired databases automatically. It eliminates the toil of manual Postgres provisioning while keeping each tenant's data strictly isolated.

## Tech Stack

- **Python** — FastAPI control plane with async workers for orchestration
- **Docker** — tenant Postgres instances run as isolated containers
- **Postgres** — metadata store for desired state and reconciliation
- **Cryptography** — encrypted credential storage (Fernet)

## Architecture Overview

Mini DBaas splits control and data planes cleanly:

1. **API Layer** — FastAPI routers validate requests, authenticate with API keys, and delegate to services
2. **Service Layer** — enforces policy, writes desired state to metadata DB, enqueues jobs
3. **Lifecycle Workers** — job queue, reconciler (desired-state enforcement), backup scheduler, TTL reaper
4. **Provisioner** — Docker SDK wrapper that is the only code touching containers

The metadata DB is the source of truth; the reconciler watches for drift and repairs it. Each instance gets unique ports, encrypted superuser credentials, and advisory-locked quota tracking.

## Key Features

- **On-demand provisioning** — create a Postgres instance in seconds
- **Team-based multi-tenancy** — quota enforcement per team, credential isolation
- **Managed lifecycle** — automated backups, patching, credential rotation, TTL cleanup
- **Desired-state reconciliation** — infrastructure automatically converges to declared state
- **API + CLI** — use curl or the bundled Python CLI client