---
title: Mini DBaaS — Self-Service Postgres on Demand
displayTitle: Mini DBaaS
summary: "Self-service Postgres: the API writes desired state, a worker starts a container, the password comes back once."
draft: false
date:  2026-07-05
github: https://github.com/machugram/minidbaas
live: https://github.com/machugram/minidbaas/releases
liveLabel: releases
stack: [Python, FastAPI, Docker, Postgres]
featured: true
order: 3
---

**Mini DBaaS** is a self-service control plane for Postgres. A team asks for a database. The API writes desired state and returns `202`. The password is in that response once. A worker starts a Docker container with its own volume, port, and credentials.

I was the person who ran `docker run postgres` for other people. Then someone needed a backup, a rotation, a second team, a thing that expires on Friday. I wanted that loop as an API, not a Slack message.

```bash
mdbaas instances create app-db --team acme --size small
mdbaas instances status <instance-id>
```

The metadata Postgres is the source of truth. It is never one of the tenants. Tenant containers are labelled `mdbaas.managed=true` and bound to `127.0.0.1` on a port from the configured range.

## Why I built it

Manual Postgres provisioning is a queue of one. Quotas live in someone's head. Passwords end up in a doc. Backups happen when someone remembers.

RDS is the real product for this, and it is a bill and an account. I wanted the same shape on a laptop: create, patch, dump, expire. The API does not hold the Docker handle. It writes desired state. A worker and a reconciler drive until observed matches. A crash does not leave a half-created container as the API's problem.

Tests use SQLite and a fake provisioner. They never need Docker.

## Tech Stack

- **Python / FastAPI** — control plane. Desired state in, `202` out
- **Docker** — one container per tenant instance. The provisioner is the only code that talks to it
- **Postgres** — metadata store, separate from the tenants
- **Fernet** — encrypted credentials. The create response is the one time you see the password

## What it does

- Create an isolated Postgres in seconds, with a team quota check
- Rotate credentials, patch, and dump. Scheduled backups, then delete past retention
- Reconcile drift. TTL reaper for instances that were meant to die on Friday
- API and a thin `mdbaas` CLI against the same routes

```bash
export MDBAAS_CREDENTIAL_ENCRYPTION_KEY=$(python -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())")
docker compose up --build
```
