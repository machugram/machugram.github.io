---
title: Alexa Luas — Voice Departures for Dublin Trams
summary: An Alexa skill for live Dublin Luas times. It does not invent departures.
draft: false
date:  2026-08-31
---

**Alexa Luas** is a custom Alexa skill that answers Dublin Luas questions by voice. Ask for the next tram from Ranelagh, plan a Red ↔ Green journey, or say "what's my tram" after saving a home stop. The backend is Node.js on AWS Lambda (ASK SDK), live times come from the official Luas forecast XML API, and DynamoDB holds a short-TTL cache plus user preferences. The rule the skill is built around: never invent a departure time.

The on-phone companion is [[tfai | tfai]]. The Leap Card → phone migration is [[luas | Luas — Digital Leap Pass]].

## Tech Stack

- **Node.js / ASK SDK** — intent handlers on AWS Lambda, shared with a local HTTPS and Docker runtime
- **Alexa** — en-GB first (amazon.co.uk), plus en-IE and en-US interaction models; SSML for Irish place names
- **Luas Forecasts API** — official XML departures and service status
- **DynamoDB** — short-TTL cache and saved home stop; Docker Compose for local tables

## Architecture Overview

Alexa owns speech and NLU. The skill owns domain logic:

1. **Alexa Voice Service** — routes utterances through the interaction model to Lambda
2. **Skill runtime** — `skill.js` registers one handler per intent; production is Lambda, local is Docker Lambda RIE or HTTPS
3. **Luas service** — resolves stop names (exact → synonyms → partial), fetches forecast XML, caches under a 60s TTL
4. **Preferences** — home stop keyed by Alexa `userId`

If the upstream API is down, the skill speaks expired cache when it has one and admits it cannot fetch times when it does not. It never fabricates minutes.

## Key Features

- **Real-time departures** — up to three soonest trams with destination and due phrasing
- **Home stop / "my tram"** — save a stop once, then ask without naming it
- **Journey planning** — same-line estimates and Red ↔ Green transfer via Abbey Street / O'Connell GPO
- **Service status and stop info** — disruptions, hours, fares, and SSML pronunciation for Irish names
