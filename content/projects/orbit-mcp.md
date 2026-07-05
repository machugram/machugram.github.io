---
title: Orbit - Agentic VM Orchestration.
draft: false
date:  2026-06-19
---

**Orbit** is an MCP server written in Go that gives AI agents their own disposable, isolated Linux environments to work in. Each session spins up a fresh VM complete with per-session SSH keys, encrypted secret vaults, and full lifecycle automation — so agents can build, run, and tear down real infrastructure without ever touching the host. Orbit makes it easier for developers to hand agents genuine compute while keeping every workload sandboxed, reproducible, and secure.

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
