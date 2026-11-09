---
title: Luas — Digital Leap Pass
displayTitle: Luas
summary: "Architecture for moving Ireland's Leap Card onto a phone."
draft: false
date:  2026-03-17
stack: [Architecture, NFC, Wallet]
featured: false
order: 11
---

**Luas** is the plan for moving Ireland's Leap Card onto a phone. A Wallet-resident pass that works on iPhone and Android. This page is the instrument, not the companion app.

The plastic card is a closed MIFARE DESFire silo. Validators can debit it. Riders cannot see it. No companion app can honestly read balance or journey history. You do not migrate Leap by photographing the card. You issue a new tokenized credential into Wallet, bound to the rider's Leap account, that the existing validators already trust.

The near-term companion is [[tfai | tfai]]. Voice lookups are [[alexa-luas | Alexa Luas]]. Neither replaces the fare instrument.

```text
iPhone Wallet / Express Mode  ─┐
Android Wallet / HCE          ─┼─►  Leap validator  ─►  TFI account (purse, taps)
Companion app (tfai, …)       ─┘         ▲
                                         │
                              account API (balance, history, products)
                                         │
                              on-device insights + optional cloud LLM
```

## Why I built it

Leap already works across Luas, Dublin Bus, and DART. The gap is the form factor and the data.

Riders live in Wallet, not in a lanyard. Contactless bank cards already board in London, New York, and Tokyo. A generation that never bought a Leap Card will not start.

The card cannot talk to software. Purse and journey files sit behind Transport for Ireland challenge-response. A third-party NFC read can verify UID and that Leap is present. It cannot read balance or history. AI features built on manual balance entry will always be labelled estimates.

On-device routine detection, fare-cap prediction, recap, and a commute copilot are only trustworthy when the same credential the validator accepted is the one the account recorded. Cloning plastic onto a phone does not do that. An operator-issued digital pass does.

## Tech Stack

- **iPhone** — Apple Wallet transit with Express Mode. EEA HCE if a native issuer deal lags
- **Android** — Google Wallet plus Host Card Emulation. The open path that can ship first
- **Validators** — existing Leap readers. The phone presents a token the gates already accept. No rip-and-replace of stops
- **Leap account** — NTA / TFI issued credential, purse, product, journey history. The account is the source of truth, not the plastic

## What it does

Three planes stay separate. Mixing them is how you accidentally ship a fake ticket.

- **Credential** — operator-issued token in Wallet or HCE. Keys never leave the secure element. The companion cannot mint this
- **Account** — TFI/NTA holds purse, products, tap history. Top-up and refunds happen here, same as today
- **Intelligence** — companion apps subscribe to account events. Models only explain facts. No model invents a fare, a tap, or a departure

The tap path has no LLM and no dependency on the rider's app. Dead battery falls back to plastic. Stolen device: issuer revokes the token.

Now: [[tfai | tfai]] verifies the physical card and logs journeys. No copy that implies tap-phone-to-board. Next: an account API for balance and history, still plastic. Then: digital pass, Android first, iPhone with it, dual-running until tap success is boring. Later: the same token on bus, DART, and commuter rail.

Do not clone a Leap Card onto a phone. Do not put an LLM on the tap path. iPhone-only is a non-starter in Ireland. This ships when TFI/NTA and Apple/Google say the token is real.
