---
title: Sentinel — Job Orchestration
displayTitle: Sentinel
summary: "Autosys-shaped jobs on a .NET 8 desktop: calendars, successors, and a JIL import."
draft: false
date:  2026-03-26
github: https://github.com/machugram/sentinel
live: https://github.com/machugram/sentinel/releases
liveLabel: releases
stack: [C#, .NET]
featured: false
order: 12
---

**Sentinel** is a C# / .NET job orchestrator in the Autosys shape. Name the work, put it on a calendar, watch the run. v0.1 is the desktop shell. The screens are real. The services behind them are still in-memory stubs.

Autosys shops already think in jobs, calendars, and successors. Greenfield schedulers often ignore that vocabulary. I wanted the mental model in a codebase I could extend, not a black box I only configure.

```text
src/
├── Sentinel.Shared/           DTOs
├── Sentinel.Core/             domain and services
├── Sentinel.Infrastructure/   API client, auth
└── Sentinel.Desktop/          Avalonia UI
```

## Why I built it

The batch calendar is not cron plus tribal knowledge. Dependencies, status, and a clear failure signal are the job. I have sat in shops where that language is Autosys, and the replacement always seemed to be "just use cron" or a SaaS that does not import JIL.

Sentinel keeps the shape: workflows, runs, alerts, calendars, audit. The JIL migration is a four-step wizard, because the existing jobs are the point. A trading calendar is a first-class screen, not a crontab comment.

The desktop is Avalonia on .NET 8 so the same shell can publish for macOS, Windows, and Linux. PostgreSQL is in Compose for a later backend. It is not wired through yet. That is the honest status.

## Tech Stack

- **C# / .NET 8** — domain, services, desktop in one runtime
- **Avalonia UI** — dashboard, workflows, runs, alerts, JIL, calendars
- **Autosys-shaped model** — jobs, calendars, successors, run state

## What it does

- Dashboard of recent runs and active alerts
- Workflow list with search and CRUD
- Run history with cancel and retry
- JIL import wizard for AutoSys jobs
- Trading calendars and an audit log you can export as JSON

```bash
dotnet run --project src/Sentinel.Desktop
```
