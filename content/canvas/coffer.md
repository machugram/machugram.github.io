---
title: Coffer — Canvas
summary: "Scratch notes and macOS WindowServer, Accessibility, and MCP findings from building Coffer on a 3-monitor M3 Pro setup."
date: 2026-11-07
draft: true
tags:
  - canvas
  - macos
  - ai
aliases:
  - canvas/tidy
---

Scratch notes and field findings from building and live-testing [[projects/coffer | Coffer]] (`~/Documents/door`, live at [coffer.magio.ie](https://coffer.magio.ie)) on a 3-display Apple M3 Pro setup (`Built-in Retina XDR` `3024×1964` at `X = 0`, `DELL P2419H (1)` `1920×1080` at `X = -1920`, `DELL P2419H (2)` `1920×1080` at `X = -3840`).

## The product wedge

- **Snap utilities (`Rectangle`, `Magnet`)** are great for throwing a single window to the left half, and weak at owning multi-app workspaces (layouts hide in Settings tables and `NSUserDefaults` plists).
- **Tiling WMs (`yabai`, `Aerospace`)** give you config-as-code, and demand an always-on tiling lifestyle.
- **Coffer** sits in the missing middle: **visual to design** on a scaled display canvas, **textual to own** in `~/.config/coffer/`, and **cautious to apply** (preflight, neighbor reflow, non-destructive screen blocking, and 1-click undo).

## 11 macOS WindowServer, Accessibility & MCP findings

1. **Minimum-width cascade across abutting zones (`OrbStack 600px` vs. `Obsidian`).**
   On a `1920×1080` display, assigning OrbStack to a `25%` left zone (`480px`) next to Obsidian (`40%` = `768px`) caused a `120px` overlap because OrbStack enforces `NSWindow.minSize.width = 600px` without returning an `AX` error.
   *Fix:* Sort moves left-to-right (`targetFrame.minX`), read back `readAXFrame` after each move, and shift vertically overlapping right-hand neighbors (`600 + 648 + 672 = 1920px`, zero overlap).

2. **Electron's `"AXUnknown"` subrole & off-screen `500×500` helper windows.**
   Filtering strictly for `kAXStandardWindowSubrole` skipped Obsidian and Cursor because Electron apps with custom traffic lights report `subrole = "AXUnknown"`. Worse, Obsidian (`PID 77216`) kept 14 layer-0 windows alive, including twelve `30–33px` titlebar strips and an off-screen `500×500` helper window with no `kCGWindowIsOnscreen` key.
   *Fix:* Only disallow `kAXSystemDialogSubrole` and `kAXFloatingWindowSubrole`, require `width >= 160 && height >= 140`, and cross-check against `CGWindowListCopyWindowInfo([.optionOnScreenOnly, .excludeDesktopElements])` (`layer == 0`).

3. **Safari's `1920×90` Full-Screen companion window.**
   In native macOS Full Screen, Safari exposes two layer-0 windows at the same origin: the `1920×1080` browser and a `1920×90` menu/toolbar strip. Raising the minimum controllable height to `140pt` and auto-selecting the largest non-minimized window (`width * height`) eliminated false multi-window ambiguity.

4. **Cross-display straddle clamping (`pos → size → pos → size` + `+75ms` settle pass).**
   Moving a `1920×1080` window from `DELL P2419H (1)` (`X = -1920 .. 0`) to a right-hand zone on `DELL P2419H (2)` (`X = -2592, Width = 672`) left `65%` of the window's area on the first monitor right after `kAXPositionAttribute`, causing `WindowServer` to clamp size across the display seam.
   *Fix:* Run `position → size → position → size` followed by a `+75ms` `@MainActor` verification pass that re-applies if any edge drifted by `> 2pt`.

5. **Minimized Dock windows & Full-Screen Space transition timing.**
   `.optionOnScreenOnly` omits minimized Dock windows, and setting `kAXMinimizedAttribute = false` triggers a `~0.35s` genie animation (or `~0.70s` Space exit for `AXFullScreen`) during which `WindowServer` ignores geometry writes.
   *Fix:* Exempt `isMinimized` windows from the on-screen filter, call `unhide()` + `kAXRaiseAction`, and schedule follow-up frame passes at `+0.20s`, `+0.45s`, `+0.75s`, and `+1.05s`.

6. **Identical dual monitors & dynamic OS suffix stripping on hotplug.**
   With two Dell monitors plugged in, macOS names them `DELL P2419H (1)` and `DELL P2419H (2)`. Unplugging `#2` makes macOS immediately rename `#1` to `DELL P2419H` while keeping its hardware UUID (`487FAE61-...`).
   *Fix:* Match displays by `CGDisplayCreateUUIDFromDisplayID` first and sync stored `localizedName` labels on `NSApplication.didChangeScreenParametersNotification`.

7. **Negative-origin multi-monitor coordinate flipping (`AppKit` vs. `AXUIElement`).**
   `NSScreen` / `NSPanel` uses a bottom-left origin while `AXUIElement` / `CGWindow` uses a top-left origin (`axY = primaryHeight - screen.origin.y - screen.height`). Mixing them across a `1964px` Retina display and `1080px` external monitors shifts windows vertically by `884px`.

8. **Ad-hoc code signing (`-`) vs. macOS TCC CDHash invalidation.**
   Every ad-hoc Xcode rebuild produces a new Mach-O `CDHash`, making `AXIsProcessTrusted()` return `false` while System Settings still shows the old toggle switched ON. Added a one-click **Reset & Re-Add** action (`tccutil reset Accessibility app.coffer.macos`) and a 1-second trust watcher that stops as soon as permission is granted.

9. **The 6.0-second `AXUIElement` IPC timeout trap & 92% IPC reduction.**
   `AXUIElementCopyAttributeValue` is synchronous cross-process Mach IPC with a **6.0-second default timeout**. Scanning all `25+` running apps during preflight and apply means a single background app paused in `lldb` freezes the UI for 6 seconds.
   *Fix:* Scope `enumerateEligibleWindows(bundleIdentifiers:)` to only the bundle IDs in the active layout (`50` app scans → `4`, a **92% IPC reduction**) and set `AXUIElementSetMessagingTimeout(appElement, 0.20)` (`200ms` ceiling).

10. **Memory-mapped 64-bit FNV-1a file stamps (`16 bytes/file`).**
    Replaced `[String: Data]` heap copies of `~/.config/coffer/` JSON files with `FileStamp(byteCount: Int, fnv1a64: UInt64)` computed over `Data(contentsOf: url, options: .mappedIfSafe)`.

11. **Why CRUD-style MCP tools fail for desktop window management.**
    An AI coding agent (Cursor, Claude Code) launching iOS Simulator does not know which of your 3 monitors holds `Cursor`, whether `Simulator` is minimized in the Dock, or how to compute `[0, 1]` coordinates without disturbing your other screens. Replaced raw CRUD tools with topology-aware primitives (`coffer_inspect_desktop_topology`, `coffer_tether_companion_window`, `coffer_stage_task_workspace`, `coffer_diagnose_layout_fit`, `coffer_focus_session`, `coffer_project_to_airplay_tv`, `coffer_restore_checkpoint`).
