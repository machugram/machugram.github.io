---
title: tfai — Dublin Luas Companion
displayTitle: tfai
summary: "A SwiftUI Luas companion: NFC Leap Card, journey log, map, and should-I-leave-now."
draft: false
date:  2026-07-27
github: https://github.com/machugram/tfai
stack: [Swift, SwiftUI, NFC]
featured: false
order: 9
---

**tfai** is a SwiftUI iOS companion for Dublin Luas. Scan a Leap Card over NFC, keep a journey log, and answer two questions: should I leave now, and what do my rides actually look like.

The plastic card can board. It cannot talk to software. I wanted the phone to be honest about that, and still useful on the Red and Green lines.

Voice-first lookups live in [[alexa-luas | Alexa Luas]]. The Leap Card → phone migration is [[luas | Luas — Digital Leap Pass]]. Neither of those is this app.

## Why I built it

Leap purse and journey files sit behind Transport for Ireland authentication. A third-party NFC read can see UID, DESFire version, and that the Leap application is present. It cannot read balance or history. Anything built on manual balance entry is an estimate, and I would rather say so.

So the scan verifies the card. Journeys persist from scans and manual logs, on device. Streaks, line usage, spend, and CO₂ come from that log, not from a made-up feed. Simulator and DEBUG builds fall back to a deterministic demo scan.

The phone is not a ticket. Copy that implied tap-to-board would be a lie. The map, the planner, and leave-now guidance are the product until an operator-issued pass exists.

## Tech Stack

- **Swift / SwiftUI** — Home, Card, Map, Insights, Profile
- **Core NFC** — DESFire sessions against a physical Leap card
- **MapKit / CoreLocation** — tram map and stop browsing
- **On-device storage** — journeys, streaks, and badges in Application Support. No backend

## What it does

- Confirm a real Leap card on device without claiming the phone can board
- Leave-now from card state, recent trips, and service alerts
- Journey log, streaks, and badges computed from rides you actually recorded
- Red and Green line map, stop browsing, and a planner
