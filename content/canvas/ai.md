---
title: AI
summary: "Canvas for AI — links, notes, and raw thoughts as they land."
date: 2026-11-07
draft: false
aliases:
  - tech/ai
tags:
  - canvas
  - ai
---

Scratchpad for everything AI. Drop links and unfinished thoughts here; tidy later if they earn it.

## Links

- [Thinking Machines — Defeating Nondeterminism in LLM Inference](https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference/)

## Thoughts

- **Prompts are not safety boundaries.** When building [[projects/treage | Treage]], the core rule was that the model never decides whether a shell command is safe — a deterministic parser (`treage/policy.py`) classifies every suggestion across a `read_only < unknown < potentially_mutating < destructive` lattice and fails closed. Full session notes in [[canvas/treage | Treage — Tonight's Canvas]].
