---
title: Orbit — Disposable Linux VMs for Agents
displayTitle: Orbit
summary: "Disposable Linux VMs for coding agents. Keys and secrets live in a vault on this Mac and die with the session."
draft: false
date:  2026-06-19
github: https://github.com/machugram/orbit
live: https://github.com/machugram/orbit/releases
liveLabel: releases
stack: [Go, MCP, Linux]
featured: true
order: 2
---

**Orbit** is an MCP server on this Mac. An agent asks for a Linux VM, gets SSH keys, does the work, and the machine goes away. The host is never the sandbox.

Cursor and Claude can already run a shell on the laptop. That is the problem. I wanted them in an isolated OrbStack VM, with keys that never hit disk.

## Why I built it

I was handing agents the same machine I use. A bad `rm`, a hung package install, a leaked token — that is my homelab, not a scratch pad.

Docker on the host is still the host. A cloud VM is a bill and a wait. OrbStack already runs Linux here. I wanted create, exec, destroy as tools an agent can call, and a vault that dies with the session.

The private key stays in memory. The vault on disk is Argon2id and AES-256-GCM. When the session ends, the VM is gone and the decrypted signer is gone with it.

macOS and OrbStack only. Not affiliated with other projects named Orbit.

<iframe
  src="./orbit-presentation.html"
  title="Orbit technical presentation"
  loading="lazy"
  style="width:100%;height:640px;border:1px solid var(--lightgray);border-radius:8px;background:var(--light)"
></iframe>

<p style="margin-top:0.5rem;font-size:0.875rem"><a href="./orbit-presentation.html" target="_blank" rel="noopener" data-router-ignore>Open full screen</a></p>

## Tech Stack

- **Go** — one cgo-free binary. `x/crypto/ssh` keeps the signer in memory
- **OrbStack** — isolated Linux VMs through `orbctl`
- **Local vault** — Ed25519 keys, Argon2id, AES-256-GCM, SQLite
- **MCP** — create, exec, destroy from Cursor or Claude, over stdio

## What it does

- Spin up an isolated Linux VM, run a command over SSH, tear it down
- Per-session keys and secrets in a vault on this Mac
- Docker and Compose on OrbStack when the work is a container, not a VM
- Nested QEMU guests when the work needs its own kernel

In Cursor I can say the thing I mean:

```text
Give me a fresh Ubuntu VM. Run the tests. Tear it down.
```
