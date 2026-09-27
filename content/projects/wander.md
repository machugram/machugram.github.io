---
title: Wander — iOS Travel Companion
summary: "An iOS travel companion for itineraries, places, and staying oriented on the ground."
draft: false
date:  2025-11-15
---

**Wander** is a native iOS travel companion: plan the trip, then keep itinerary, saved places, and map orientation usable once you are on the ground — without bouncing between notes, Maps, and a spreadsheet.

Product / mobile UX exercise. Local-first: the phone holds the trip; the network is optional for the core loop.

## Why I built it

Trip planning usually fragments: a doc for days, Maps for pins, screenshots for reservations, and nothing that answers “what am I doing next, and how do I get there from here?”

I wanted one app that owns the trip object — days, stops, and saved places — and treats location as a product feature, not a permissions checkbox. The bar was simple: open Wander in a new city and know what comes next without rebuilding context from scattered apps.

## Tech Stack

- **Swift** — native iOS app, type-safe models for trips and places
- **UIKit** — itinerary and place screens with navigation that stays predictable on the go
- **CoreLocation** — on-device location for “near me” orientation and map context
- **On-device storage** — trip data stays on the phone; no account required for the core planner

## Architecture Overview

Wander keeps the product loop on device:

1. **Trip model** — a trip is days and stops; places can be saved independently and attached to a day
2. **Itinerary surface** — day-by-day planning and reordering so the plan stays editable after you land
3. **Places and map** — saved locations with map context so orientation is one tap away from the plan
4. **Location services** — CoreLocation feeds “where am I relative to the plan” without shipping the itinerary to a backend

Preferences, saved places, and the active trip live in the app sandbox. That keeps the companion usable offline when the network is the unreliable part of travel.

## Key Features

- **Day-based itineraries** — structure a trip by day and adjust stops when plans change
- **Saved places** — pin restaurants, sights, and logistics without burying them in a notes app
- **Map orientation** — see the plan against where you are, not only as a static list
- **Local-first** — core trip data on device so the companion still works when connectivity does not
