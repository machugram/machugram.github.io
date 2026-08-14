---
title: Orbit - Agentic VM Orchestration.
draft: false
date:  2026-06-19
---

**Orbit** is an MCP server written in Go that gives AI agents their own disposable, isolated Linux environments to work in. Each session spins up a fresh VM complete with per-session SSH keys, encrypted secret vaults, and full lifecycle automation — so agents can build, run, and tear down real infrastructure without ever touching the host. Orbit makes it easier for developers to hand agents genuine compute while keeping every workload sandboxed, reproducible, and secure.

## Technical presentation

<iframe
  src="./orbit-presentation.html"
  title="Orbit technical presentation"
  loading="lazy"
  style="width:100%;height:640px;border:1px solid var(--lightgray);border-radius:8px;background:var(--light)"
></iframe>

<p style="margin-top:0.5rem;font-size:0.875rem"><a href="./orbit-presentation.html" target="_blank" rel="noopener" data-router-ignore>Open full screen</a></p>

## Tech Stack

- **Go** — high-performance, compiled backend for VM lifecycle management
- **Linux VMs** — isolated compute environments with full OS capabilities
- **MCP Protocol** — standard interface for AI agents to invoke infrastructure operations

## Architecture Overview

Orbit operates as a three-layer system:

1. **MCP Server** — receives tool calls from AI agents via the Model Context Protocol
2. **VM Orchestrator** — manages lifecycle (create, configure, destroy) and resource allocation
3. **Secret Vault** — encrypts and isolates per-session credentials and SSH keys

Each agent session gets a fresh, ephemeral VM with its own network namespace, filesystem, and credential store. When the session ends, the VM and all state are destroyed automatically.
