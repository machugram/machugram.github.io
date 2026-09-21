---
title: Building Awtsyde (Part 1) — Why I Started Joined
summary: "Why I joined Awtsyde: winter, racquet sports, and the logistics that get in the way of playing."
date: 2026-08-21
tags:
  - awtsyde
  - ios
draft: false
aliases:
  - ../posts/tech/building-awtsyde
---

*Part 1 of 4 — [Part 2: The product on the phone](./building-awtsyde-part-2) *

This is a short series about building [Awtsyde](https://awtsyde.com) — a racquet-sports platform for finding opponents, booking courts, and tracking scores. I work on it as an iOS engineer on the SwiftUI app, against a TypeScript backend.

Part 1 is not architecture. It is how I ended up caring.

## Winter in Europe

Europe in winter is efficient at shrinking your world.

Days get short. Weather argues with every outdoor plan. Work expands to fill the dark. If you are not careful, life becomes: commute, screen, sleep, repeat — with a gym membership you feel guilty about and a calendar that never includes play.

I needed something that pulled me out of my head. Not another productivity system. Not another late-night scroll. Something physical, social, and slightly competitive — the kind of thing that makes tomorrow’s meeting feel smaller.

Racquet sports did that.

A court has clear rules. A match has a start and an end. You sweat, you laugh, you lose a point you should have won, and for an hour the rest of the noise quiets down. That was the point. Not “optimizing wellness.” Getting my mind off things by putting my body somewhere that demanded attention.

## The friction after the match

The match was easy. Everything around the match was not.

Finding someone at your level. Finding a free court at a sane hour. Coordinating across group chats that go quiet for three days. Showing up and discovering your opponent is either far better or far worse than advertised. Keeping score in a notes app and pretending that counts as a record.

If you already have a club and a fixed weekly partner, none of this hurts. If you are newer to a city — or newer to the sport — it becomes the main tax on playing at all.

I kept noticing the same pattern: people wanted to play more than the logistics allowed.

## What Awtsyde is trying to remove

Awtsyde’s bet is simple to say and hard to ship:

> Make “meet more, play more” the default path — for players first, and for clubs that need courts filled and communities alive.

Players should be able to find opponents at a sensible skill level, book space, and leave with a score that means something next week. Clubs should see utilization, not empty slots and hope. Coaches and organizers should sit in the same ecosystem instead of living in five WhatsApp threads.

That is the product story. Not “another sports social network.” A thinner path from *I want to play* to *I am on court*.

## Why I joined as an iOS engineer

I did not arrive as a founder pitch. I arrived as someone who had felt the gap in my own week — winter, work, the need to get outside my head — and then saw a team building software aimed at that gap across Africa and Europe.

iOS is where a lot of that intention becomes real. Home quick actions — find players, find clubs, book a court, create an event, record a score. Compete for challenges and leaderboards. Live scoring that still works when the court has no signal. SwiftUI is how we shape that surface. TypeScript services behind `/api/v1` are how bookings, clubs, and final results stay authoritative.

If the app is clumsy, the mission statement does not matter. People will go back to the group chat.

## What this series will cover

Four parts:

1. **Why I started caring** — this post
2. **The product on the phone** — player loops, club needs, what we optimize for on iOS
3. **SwiftUI + TypeScript** — how the stack maps to the product
4. **What shipping taught us** — what broke, what held, what I would do earlier next time

I will keep it specific. Less manifesto, more “here is what we were actually trying to make easier.”

## Next

Part 2 starts at the screen: what a player is trying to do in the first five minutes, and how that shapes the iOS surface.

→ [Part 2: The product on the phone](./building-awtsyde-part-2)
