---
title: Skipper 
draft: false
date:  2026-04-03
github: https://github.com/machugram/skipper
---

**Skipper** is a CLI tool that transforms SSH connection management into a fast, interactive experience. Read your `~/.ssh/config` once, then browse, search, and connect to any host without memorizing aliases — fuzzy-search narrows down the list in real time, and one keystroke drops you into a session. Skipper eliminates SSH friction: no more digging through notes or config files, no more typos in rarely-used host aliases. It makes remote access as natural as browsing a file picker.

## Tech Stack

- **Go** — lightweight, cross-platform CLI with zero runtime dependencies
- **Bubbletea** — interactive terminal UI for smooth filtering and navigation
- **SSH Config Parsing** — reads aliases, users, hostnames, ports, and identity files natively

## Features

- **Interactive host selection** — filterable list powered by real-time fuzzy search
- **SSH config integration** — parses your existing config without modification
- **One-keystroke connection** — select and SSH in the same interface
- **Add hosts on the fly** — interactive form or command-line shorthand