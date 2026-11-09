---
title: Alexa Luas — Voice Departures for Dublin Trams
displayTitle: Alexa Luas
summary: An Alexa skill for live Dublin Luas times. It does not invent departures.
draft: false
date:  2026-08-31
stack: [Node.js, AWS Lambda, Alexa]
featured: false
order: 10
---

**Alexa Luas** is a custom Alexa skill for Dublin Luas. Ask for the next tram from Ranelagh, plan a Red ↔ Green journey, or say "what's my tram" after saving a home stop.

Live times come from the official Luas forecast XML. If that API is down, the skill speaks expired cache when it has one and admits it cannot fetch times when it does not. It never invents a departure.

The on-phone companion is [[tfai | tfai]]. The Leap Card → phone migration is [[luas | Luas — Digital Leap Pass]].

## Why I built it

I wanted Luas in the kitchen without unlocking a phone. Most voice transit skills guess, or they read a static timetable. The official forecast is XML and a bit awkward. That is still better than a made-up minute.

Alexa owns speech. The skill owns stop names, the cache, and the rule about not fabricating times. Stop resolution is exact, then synonyms, then partial. Cache TTL is 60 seconds. Home stop is keyed by Alexa `userId`.

en-GB first (amazon.co.uk), plus en-IE and en-US. SSML for Irish place names, because Alexa will otherwise say them wrong.

## Tech Stack

- **Node.js / ASK SDK** — intent handlers on Lambda. Same skill runs locally over HTTPS or Docker
- **Alexa** — en-GB, en-IE, en-US interaction models
- **Luas Forecasts API** — official XML departures and service status
- **DynamoDB** — short-TTL cache and the saved home stop

## What it does

- Up to three soonest trams, destination and due phrasing
- Save a home stop, then ask without naming it
- Same-line estimates and Red ↔ Green transfer via Abbey Street / O'Connell GPO
- Disruptions, hours, fares, and SSML for Irish names
