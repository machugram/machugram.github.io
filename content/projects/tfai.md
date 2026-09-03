---
title: tfai — Dublin Luas Companion
draft: false
date:  2026-07-27
github: https://github.com/machugram/tfai
---

**tfai** is a SwiftUI iOS companion for Dublin Luas riders. Scan a Leap Card over NFC, keep a journey log, and turn real riding into travel-readiness cues and recap-style insights — alongside a tram map, journey planner, and stop-level browsing for the Red and Green lines. It is the everyday answer to two questions: should I leave now, and what does my travel actually look like?

Voice-first Luas lookups live in [[alexa-luas | Alexa Luas]]. The Leap Card → phone migration is [[luas | Luas — Digital Leap Pass]].

## Tech Stack

- **Swift / SwiftUI** — native iOS app with tabbed Home, Card, Map, Insights, and Profile
- **Core NFC** — DESFire tag sessions against physical Leap cards (UID, version, Leap application presence)
- **MapKit / CoreLocation** — tram map, stop browsing, and on-device location
- **On-device storage** — journey history, streaks, and badges in Application Support; no backend required

## Architecture Overview

tfai stays on the phone and treats the Leap Card as the data wedge:

1. **NFC capture** — `NFCService` talks DESFire to a physical Leap card; simulator and DEBUG builds fall back to a deterministic demo scan
2. **Journey store** — scans and manual logs persist locally, dedupe on re-scan, and feed trip stats (streaks, line usage, spend, CO₂)
3. **Insights layer** — readiness summaries and `GamificationEngine` derive leave-now guidance, badges, XP, and weekly challenges from collected journeys
4. **Travel surfaces** — map, planner, and home alerts help interpret the next trip without a server

Leap purse and journey files sit behind Transport for Ireland authentication, so balance stays manual until a partnership; the locked-read response is still used as card verification.

## Key Features

- **NFC Leap verification** — confirm a real card on device without implying the phone is a ticket
- **Travel readiness** — leave-now guidance from card state, recent trips, and service alerts
- **Journey insights** — streaks, recap views, and achievements grounded in logged rides
- **Red and Green line map** — stop browsing and journey planning for the Luas network
