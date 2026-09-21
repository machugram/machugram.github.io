---
title: Luas — Digital Leap Pass
summary: "Architecture for moving Ireland's Leap Card onto a phone."
draft: false
date:  2026-03-17
---

**Luas** is the plan and architecture for moving Ireland's physical Leap Card onto a phone — a digital transit pass that works on both iPhone and Android. The plastic card is a closed MIFARE DESFire silo: validators can debit it, riders cannot see it, and no companion app can honestly read balance or journey history. A Wallet-resident pass changes that. Every tap becomes an account event. That is the data plane a next-generation rider expects, and the only feed that lets an AI companion answer "am I ready to travel?" without guessing.

The near-term companion is [[tfai | tfai]]. Voice lookups are [[alexa-luas | Alexa Luas]]. Neither replaces the fare instrument. This page is the instrument.

## Why the plastic card cannot carry the next generation

Leap already works across Luas, Dublin Bus, and DART. The gap is not coverage. It is the form factor and the data.

- **Riders live in Wallet, not in a lanyard.** Contactless bank cards and Apple/Google Pay already board in London, New York, and Tokyo. A generation that never bought a Leap Card will not start.
- **The card cannot talk to software.** Purse and journey files sit behind Transport for Ireland challenge-response authentication. A third-party NFC read can verify UID, DESFire version, and that the Leap application is present. It cannot read balance or history. AI features built on manual balance entry will always be labelled estimates.
- **AI needs a first-party tap stream.** On-device routine detection, fare-cap prediction, recap, and a commute copilot are only trustworthy when the same credential the validator accepted is the one the account recorded. Cloning plastic onto a phone does not do that. An operator-issued digital pass does.

You do not migrate Leap by photographing the card. You migrate it by issuing a new tokenized credential into Wallet, bound to the rider's Leap account, that the existing validators already know how to trust.

## Platform stack

- **iPhone** — Apple Wallet transit card with Express Mode for tap-on/tap-off without unlocking; EEA HCE entitlement as the DMA-era path if a native Wallet issuer deal lags
- **Android** — Google Wallet transit pass plus Host Card Emulation (HCE) AID routing, the open path that can ship first
- **Validators** — existing Leap contactless readers (DESFire air interface + SAM). The phone presents a token the gates already accept. No rip-and-replace of Luas stops.
- **Leap account** — NTA / TFI issued credential, purse, product (adult, student, TFI 90), and journey history. The source of truth is the account, not the piece of plastic.
- **Companion apps** — [[tfai | tfai]] (iOS) and a future Android client consume the account API for readiness, recap, and AI. They never emulate the card.

## Architecture

Three planes stay separate on purpose. Mixing them is how you accidentally ship a fake ticket.

1. **Credential plane (tap to board)** — operator-issued token lives in Apple Wallet or Android HCE/Wallet. Express Mode / default transit AID presents it to the validator in ~300ms. Keys never leave the secure element or HCE service. The companion app cannot mint or clone this token.
2. **Account plane (truth)** — TFI/NTA backend holds purse, products, and tap history. Provisioning binds a device credential to the account. Top-up, capping, and refunds happen here, same as today.
3. **Intelligence plane (AI)** — companion apps subscribe to account events (consent-gated). Deterministic code computes facts: balance, cap progress, usual trips. Models only explain those facts. No model invents a fare, a tap, or a departure.

```
iPhone Wallet / Express Mode  ─┐
Android Wallet / HCE          ─┼─►  Leap validator  ─►  TFI account (purse, taps)
Companion app (tfai, …)       ─┘         ▲
                                         │
                              account API (balance, history, products)
                                         │
                              on-device insights + optional cloud LLM
```

**Provisioning flow.** Rider proves the Leap account (existing card number + auth, or a new digital signup). Issuer generates a device-bound token. iOS receives it through PassKit / Wallet; Android through Google Wallet or an HCE service registered for the Leap AID. The physical card can stay active during a dual-running window, then be frozen.

**Tap flow.** Phone presents the token. Validator authorises as it does today. Account records the tap. Companion refresh is eventual — a push or a short poll — not in the tap path. The tap path has no LLM, no network dependency on the rider's app, and no excuse to invent a fare.

**Failure modes.** Dead battery, Wallet unavailable, or HCE not selected: rider falls back to the physical card or a contactless bank card where the operator allows it. The architecture assumes dual-running until digital default is proven. Expired or stolen device: issuer revokes the token; plastic or a new device is re-provisioned. The companion degrades to last-known account state and never claims a tap it did not receive.

## Plan

### Now — do not pretend the phone is a ticket

[[tfai | tfai]] already talks DESFire to a physical Leap card for verification and journey logging. Keep that framed as card utility. No copy that implies tap-phone-to-board. This phase earns the habit loop (readiness, recap) on honest data, and it is the proof that an intelligence plane is useful before the credential moves.

### Next — account linking, still plastic

Partnership with TFI/NTA for an account API: balance, products, tap history, top-up handoff. No validator change. This unblocks accurate AI (balance run-out, fare-cap, recap) on both platforms while the digital pass is still in certification. Android and iOS companions can ship against the same account contract.

### Then — digital pass, Android first, iPhone with it

1. **Issuer + SAM work** — token format that existing Leap readers accept; device binding; remote revoke.
2. **Android** — HCE + Google Wallet transit. Open NFC, faster certification, covers the majority of Irish handsets.
3. **iPhone** — native Apple Wallet transit / Express Mode as the rider-expected path; EEA HCE if the Wallet issuer programme is the long pole.
4. **Dual-running** — plastic and digital on the same account until tap success and support volume are boring.
5. **Default digital** — new Leap customers start in Wallet; plastic becomes the accessibility and backup SKU.

### Later — one pass, every Leap mode, AI on real taps

The credential is Leap, not Luas-only: bus, DART, and commuter rail come with the same token. Once taps are first-party, the intelligence plane can do what the locked card forbids: true readiness, true recap, a copilot that is allowed to speak numbers. Expansion cities (see the tfai UK/Ireland plan) reuse the same three-plane split; only the issuer and AID change.

## Constraints (non-negotiable)

- Do not clone, emulate, or "write" a physical Leap Card onto a phone. That is not a product; it is a broken credential.
- Do not put an LLM on the tap path. Validators cannot wait for a model, and fares cannot be invented.
- Core travel — tap, balance, cap — stays free and uncluttered. AI explanation is additive.
- iPhone-only is a non-starter in Ireland. Android ships in the same programme or the programme is not ready.
- This is operator infrastructure. It ships when TFI/NTA and Apple/Google say the token is real, not when a companion app looks like a card.
