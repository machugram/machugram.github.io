---
title: Skipper — Interactive SSH Host Picker
displayTitle: Skipper
summary: "Fuzzy-search ~/.ssh/config and hit Enter. The same binary can add a host without opening the file."
draft: false
date:  2026-04-03
github: https://github.com/machugram/skipper
live: https://github.com/machugram/skipper/releases
liveLabel: releases
stack: [Go, Bubbletea]
featured: false
order: 6
---

**Skipper** reads `~/.ssh/config`, lets you type a few letters, and Enter is the session.

I was still opening the file to remember which alias was the bastion. `ssh` does not search. A notes app of hostnames goes stale the week you add a port. I wanted the config I already have, as a picker.

```text
skipper
# / to filter, Enter to connect

skipper add bastion admin@10.0.0.5
```

The file is the source of truth. Skipper does not invent a second host list.

## Why I built it

Rarely-used aliases are where the typos live. I wanted fuzzy search over the aliases, users, hostnames, and ports already in the config, then one keystroke into `ssh`.

When there is only one match you can skip the UI. `add` writes a host entry so you do not open the file for that either. Interactive form, or `skipper add alias user@host:port`.

## Tech Stack

- **Go** — one binary, no runtime
- **Bubbletea** — the list, the filter, the add form
- **`~/.ssh/config`** — aliases, users, hostnames, ports, identity files. Unmodified except when you `add`

## What it does

- Filter the host list as you type. Enter connects
- `-c` for a config that is not the default
- `-f` opens already in find mode
- `j` / `k` or arrows to move. `q` to quit
