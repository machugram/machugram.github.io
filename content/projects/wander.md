---
title: Wander - iOS Travel Companion
summary: "An iOS travel companion for itineraries, places, and staying oriented."
draft: false
date:  2025-11-15
---

**Wander** is a sleek iOS app designed to make travel planning and navigation effortless. With intuitive interfaces and powerful features, Wander helps you discover new places, manage your itinerary, and stay connected while exploring the world.

## Tech Stack

- **Swift** — modern, type-safe language for iOS development
- **UIKit** — framework for building user interfaces
- **CoreLocation** — location services for accurate GPS tracking

## Architecture Overview

Wander operates as a three-layer system:

1. **Travel Planner** — manages itinerary creation and organization
2. **Location Services** — provides real-time location data and mapping
3. **Communication Hub** — facilitates seamless connectivity with other travelers and local services

Each user session gets a personalized travel experience with its own set of preferences, saved locations, and communication settings. Data is securely stored onlu on the device, ensuring privacy and control over personal information.
