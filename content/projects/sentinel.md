---
title: Sentinel — Job Orchestration
summary: "C# job orchestration in the Autosys shape: define, schedule, and watch work."
draft: false
date:  2026-03-26
github: https://github.com/machugram/sentinel
---

**Sentinel** is a C# / .NET job orchestration system inspired by Autosys: define jobs, schedule them, and monitor runs — without treating the batch calendar as cron plus tribal knowledge.

Built for shops where work must be named, ordered, and observable (dependencies, status, clear failure signal).

## Why I built it

Autosys-shaped shops already think in jobs, calendars, and successors. Greenfield schedulers often ignore that vocabulary. Sentinel keeps the mental model and puts it in a modern C# codebase that is easier to extend than a black-box scheduler you only configure.

## Tech Stack

- **C# / .NET** — job definitions, scheduling, and monitoring in one runtime
- **Autosys-shaped model** — jobs, schedules, and run state as first-class ideas

## Features

- **Job definition** — name the work and how it should run
- **Scheduling** — calendar-style triggers instead of ad-hoc scripts
- **Monitoring** — see what is running, what succeeded, and what needs attention
- **Dependency-friendly shape** — built for workflows where order and successors matter
