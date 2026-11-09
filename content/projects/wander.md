---
title: Wander — iOS Travel Companion
displayTitle: Wander
summary: "An iOS travel companion for itineraries, places, and staying oriented on the ground."
draft: false
date:  2025-11-15
stack: [Swift, UIKit, CoreLocation]
featured: true
order: 4
---

**Wander** is a native iOS travel companion. Plan the trip, then keep the days, the stops, and the map usable once you land.

Trip planning usually fragments. A doc for days. Maps for pins. Screenshots for reservations. Nothing answers "what am I doing next, and how do I get there from here?" I wanted one trip object on the phone.

This is a product / mobile UX exercise. Local-first. The phone holds the trip. The network is optional for the core loop.

## Why I built it

I kept rebuilding context in a new city from three apps and a camera roll.

The bar was simple: open Wander and know what comes next. Days you can reorder after you land. Places you can save without burying them in notes. A map that shows the plan against where you are, not only as a list.

Location is a product feature, not a permissions checkbox. Preferences, saved places, and the active trip live in the app sandbox, so the companion still works when the network is the unreliable part of travel.

## Tech Stack

- **Swift** — trip and place models on device
- **UIKit** — itinerary and place screens that stay predictable on the go
- **CoreLocation** — "near me" without shipping the itinerary to a backend
- **On-device storage** — no account for the core planner

## What it does

- Day-based itineraries you can edit after you land
- Saved places next to the plan, not in a separate notes app
- Map orientation from where you are
- Offline for the trip data that already lives on the phone
