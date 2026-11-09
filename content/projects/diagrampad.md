---
title: DiagramPad — Engineering Diagrams on iPad
displayTitle: DiagramPad
summary: "iPad app for sketching architecture, data flow, and CI/CD pipelines — and reading PDFs on the same canvas."
draft: false
date:  2026-10-28
github: https://github.com/machugram/diagrampad
cover: /assets/images/projects/diagrampad/home.png
stack:
  - Swift
  - ios
featured: true
order: 5
---

**DiagramPad** is an iPad app for engineering diagrams. Architecture, data flow, CI/CD. When the brief is a PDF, it opens on the same canvas.

A laptop and a whiteboard are the wrong size on the train. I wanted boxes, arrows, and Pencil notes I could export as a PNG before the RFC.

![CI/CD pipeline](../assets/images/projects/diagrampad/canvas-pipeline.png)

## Why I built it

Design reviews still start as boxes and arrows. I was bouncing between Files, a drawing tool, and a laptop that would not sit on a tray table.

Place a client, a gateway, a service, a store. Wire them. Label the edge. Ship a PNG into the doc. When the architecture brief arrives as a PDF, open it in Study, ink on top, leave a sticky. Same session. No second app.

The diagrams stay on the device. There is no backend.

![Study library with Open PDF](../assets/images/projects/diagrampad/home-study.jpg)

![Checkout RFC in the PDF reader](../assets/images/projects/diagrampad/study-reader.jpg)

## Tech Stack

- **SwiftUI** — iPad-first canvas and library
- **SwiftData** — diagrams on device
- **Apple Pencil** — freehand on the same board as the boxes
- **PDFKit** — open the RFC next to the diagram

## What it does

- Architecture parts: client, gateway, service, database, cache, queue, storage, external
- CI/CD parts: repo, runner, artifact, environment, approval
- Study mode for PDFs, highlight, ink, and notes
- PNG export you can paste into the writeup
