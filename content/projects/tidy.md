---
title: Tidy — Canvas-First Workspace Manager for macOS
displayTitle: Tidy
summary: "Named multi-app macOS workspaces designed on a gapless canvas, versioned in ~/.config/tidy/, and applied with preflight and undo."
draft: false
date: 2026-11-07
github: https://github.com/machugram/tidy
stack: [Swift, SwiftUI, AppKit, MCP]
featured: true
order: 3
---

**Tidy** is a native macOS menu-bar workspace and window manager built in Swift and SwiftUI (macOS 14 Sonoma+).

Rectangle is for throwing one window to the left half. Tiling window managers (`yabai`, `Aerospace`) are for living inside an always-on tiling lifestyle. **Tidy** is for named multi-app workspaces you can design on a visual display canvas, version in `~/.config/tidy/` alongside your dotfiles, and apply across multiple monitors without overlap or surprises.

```text
~/.config/tidy/
├── config.json                     # Active setup profile (Regular / Work), shortcuts, preferences
├── layouts/
│   └── <layout-id>.json            # Deterministic, git-diffable gapless workspace definition
└── backups/
    └── last-known-good/            # Validated snapshot restored if a hand-edit is malformed
```

Tonight's build notes and macOS `WindowServer` findings live on the [[canvas/tidy | Tidy canvas]].

## Why I built it

Fast one-window snapping is a solved problem. What still hurt every week on a three-monitor desk (`Built-in Retina XDR` plus two identical `DELL P2419H` displays) was **workspace ownership**.

Every Monday I was rebuilding the same Coding, Review, and iOS Debugging arrangements by hand, or firing a saved layout I could not see and did not fully trust:

1. **GUI snap tools trap state.** Rectangle, Magnet, and Moom bury saved multi-app layouts inside Settings tables and `NSUserDefaults` plists. You cannot meaningfully diff them, review them, or keep them in a dotfiles repo next to your shell and editor config.
2. **Tiling WMs ask for a lifestyle.** `yabai` and `Aerospace` give you text config, and they also ask for continuous background window management, steep keybind grammars, or SIP tradeoffs when all you want is three named workspaces you control on demand.
3. **Real macOS apps break naive rectangle math.** The moment you test a multi-app layout on three monitors against OrbStack, Obsidian, Safari, Cursor, and iOS Simulator, setting `kAXPositionAttribute` and `kAXSizeAttribute` once is not enough:
   - **OrbStack** enforces a hard `600px` minimum width (`NSWindow.minSize`), silently clamping a `25%` (`480px`) left zone on a 1080p monitor and overlapping `120px` of **Obsidian** next door.
   - **Obsidian** and **Cursor** draw custom traffic lights and report `kAXSubroleAttribute = "AXUnknown"`, while keeping hidden `500×500` off-screen helper windows alive.
   - **Safari** in native Full Screen spawns a second `1920×90` layer-0 toolbar companion window at the same origin.
   - Unplugging one of two identical **Dell P2419H** monitors makes macOS dynamically strip `(1)` from the remaining monitor's `localizedName`.

I built Tidy to sit in that missing middle: **visual to design** on a scaled display canvas with draggable dividers and live physical monitor overlays, **textual to own** in `~/.config/tidy/`, and **cautious to apply** — with a zero-side-effect preflight, automatic minimum-width neighbor reflow, non-destructive screen-blocking shields, and one-click workspace undo.

## Tech Stack

- **Swift & SwiftUI (macOS 14 Sonoma+)** — compact `MenuBarExtra` popover plus a `760×640` canvas-first layout editor with 120Hz draggable interior dividers (`CanvasDivider`)
- **AppKit, Accessibility (`AXUIElement`) & CoreGraphics (`CGWindowList`)** — bundle-scoped window discovery (`92%` fewer Mach IPC calls, `200ms` per-app IPC timeout), cross-display settle passes, and hardware `CGDisplayCreateUUIDFromDisplayID` matching
- **Dotfiles config store (`~/.config/tidy/`)** — deterministic sorted-key JSON, 16-byte FNV-1a memory-mapped file stamps (`FileStamp`), and automatic `last-known-good` backups
- **Local MCP server (`tidy-mcp`)** — stdio JSON-RPC server exposing 7 topology-aware, intent-driven workspace primitives (`TidyMCPTools.swift`) for AI coding agents

## Architecture Overview

Tidy keeps window discovery event-driven (`0%` idle CPU) and separates normalized canvas geometry from physical screen coordinates until apply time:

1. **Gapless Partition Engine (`ZonePartitionEngine.swift`)** — maintains a validated `100%` unit-rectangle coverage invariant across splits, merges, divider drags, clockwise app rotations, and configurable breathing gaps (`0–14pt`).
2. **System Config Store (`TidyConfigStore.swift`)** — persists `config.json` and per-layout JSON files via atomic writes, tracks external dotfiles edits with 16-byte FNV-1a memory-mapped file stamps, and preserves `last-known-good` on invalid edits.
3. **Window Adapter & Reflow Coordinator (`WindowManaging.swift`, `LayoutApplyCoordinator.swift`)** — filters `NSWorkspace.shared.runningApplications` by assigned bundle IDs before creating `AXUIElement` handles (`200ms` messaging timeout), sorts moves left-to-right, reads back actual post-move `AX` frames, and automatically shifts abutting right/bottom neighbors when an app clamps to its `minWidth`.
4. **Screen Blocking (`ScreenBlockerController.swift`)** — places borderless dark `NSPanel` shields over secondary monitors or blackout-flagged zones during deep work or screen shares, dismissible anytime with `Esc` without hiding or quitting apps.
5. **Agentic MCP Layer (`TidyMCPTools.swift`)** — replaces brittle coordinate CRUD with spatial intent tools (`tidy_inspect_desktop_topology`, `tidy_tether_companion_window`, `tidy_stage_task_workspace`, `tidy_focus_session`, `tidy_restore_checkpoint`).

## Key Features

- **Canvas-first layout editor** — split, merge, drag interior dividers with live pixel/percentage readouts, swap zones, or capture live windows from screen into an editable gapless draft
- **Spanning multi-monitor & `Regular` / `Work` profiles** — route a workspace to your MacBook screen on the go (`Regular`) and across dual external monitors at your desk (`Work`), with unified single-step Undo
- **Smart minimum-width neighbor reflow** — detects hard app minimum widths (e.g. OrbStack `600px` in a `480px` zone) and reflows adjacent zones (`600 + 648 + 672 = 1920px`) for zero overlap
- **Dock unminimize & Full-Screen exit settle passes** — unhides apps, unminimizes Dock windows, exits native `AXFullScreen`, and schedules post-animation settle passes (`+0.20s .. +1.05s`)
- **Live physical monitor zone overlay** — flashes or pins a translucent labeled zone map directly onto the physical monitor you are editing
- **Non-destructive Screen Blocking** — one-click / `Esc`-dismissible privacy and focus shields on secondary monitors or specific zones
- **Preflight + 1-click Undo** — inspect matched, missing, or multi-window apps before moving anything, or hit **Apply Now** (`⌘↩`) and restore exact prior window frames in one click
- **Intent-driven `tidy-mcp` for coding agents** — lets Cursor or Claude dock iOS Simulator or a browser beside the active editor on the right monitor, then restore the checkpoint when verification finishes
