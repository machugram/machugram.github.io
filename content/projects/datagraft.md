---
title: Datagraft — Git Checkout for Live Postgres
displayTitle: Datagraft
summary: "git checkout for a live Postgres. Origin stays up. The branch is a second server, optionally fifty rows."
draft: false
date:  2026-09-03
github: https://github.com/machugram/datagraft
live: https://github.com/machugram/datagraft/releases
liveLabel: releases
stack: [Go, PostgreSQL]
featured: false
order: 5
---

**Datagraft** is `git checkout` for a live Postgres. Origin stays up. The branch is a second server on a free port, optionally fifty rows instead of the whole thing.

It is not a new engine, not a cluster, and not merge. A branch is a second Postgres. Reset recreates it. There is no `datagraft merge`.

```bash
datagraft checkout postgres-v1 --sample 50
```

```text
                    never written
                         │
   origin  ──────────────┤  :5432   1,000,000 rows
                         │
   postgres-v1  ─────────┘  :5435          50 rows   ← yours
         │
         ALTER TABLE, bad migrations, seed experiments
```

This is still an experiment. The pass condition is a real app booting on that fork. If that loop does not stick, merge and remotes are not worth building.

## Why I built it

Code is branched. The database usually is not.

I kept hitting that on one app: EF Core, uuid primary keys, jsonb, quoted `"Id"` columns, dual FKs to `users`. Every “what if we add this column,” every migration, every seed experiment either ran against the shared Postgres or waited until staging. QA ate the blast radius, or nobody tried anything.

`pg_dump` / restore is slow, stale, and still one copy. You cannot have `postgres-v1` and `broken-fk-experiment` at the same time without two restores. Neon isolates in the cloud. It is not a laptop CLI, and it does not make the data smaller. Doltgres solves merge by not being Postgres. The app’s extensions and ORM are not that product.

I wanted real Postgres, installable, isolated, optionally fifty rows. That schema was the first the experiment had to survive. Checkout in about five seconds. DDL on the fork never appeared on origin. App-boot SQL passed. The app process itself is still the next proof.

I did not want a Kubernetes operator, a CoW volume clone, or a fake merge. I wanted `datagraft checkout` the way I already `git checkout`. Reset is how you iterate.

## Tech Stack

- **Go** — a CLI you can `go install`. No cluster
- **PostgreSQL** — real Postgres. Schema from `pg_dump --schema-only`, data as a logical subset
- **Docker or local `pg_ctl`** — throwaway postmaster on a free port, never origin’s
- **FK-safe sampler** — parents before children. Dual FKs close the other side instead of AND-sampling to zero rows

## What it does

- `checkout postgres-v1` starts a second server. Origin keeps its port and its clients
- `--sample 50` copies about fifty rows plus the FK parents, so a small fork is actually small
- `--keep-pk` and `--include-sql` keep the admin user and `schema_migrations` so the app can boot
- `reset` throws the fork away and rebuilds it. That is the iterate loop
- Hosts that look like RDS / Neon / Supabase are refused unless you pass `--i-know`

Not Neon. Not Doltgres. Not merge. Those wait until a real app boot says the loop is worth keeping.

```bash
go install github.com/machugram/datagraft/cmd/datagraft@latest

datagraft doctor
datagraft init --url postgres://localhost:5432/app
datagraft checkout postgres-v1 --sample 50
eval "$(datagraft env)"
datagraft reset postgres-v1
```
