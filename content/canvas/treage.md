---
title: Treage — Tonight's Canvas
summary: "Scratch notes from building Treage: why prompts are not safety boundaries, idempotent redaction, and policy-gated shell triage."
date: 2026-11-07
draft: false
tags:
  - canvas
  - ai
  - sre
---

Scratch notes and engineering findings from tonight's session building [[projects/treage | Treage]] (`~/Documents/Treage`).

## Core thesis

The first ten minutes of an incident are mechanical and dangerous: find the next missing read-only fact without mutating state or wiping forensic evidence. Most AI terminal tools fail security review because they capture every command (`exit 0` included) and rely on a system prompt for safety.

Treage flips both:
- **Capture boundary:** Only wake on a non-zero exit (`treage run -- <cmd>`). Drop `exit 0` buffers in memory before the diagnoser runs.
- **Safety boundary:** The model is an untrusted proposer. `treage/policy.py` is the gate.

## Seven findings from tonight

1. **A prompt is not a safety boundary — a parser is (`treage/policy.py`).**
   Asking an LLM *"never suggest destructive commands"* is a polite request that indirect prompt injection in `stderr` can override. Every suggested command is split across pipelines (`|`), chains (`&&`, `||`, `;`), wrappers (`sudo`, `env`, `bash -c`), and substitutions (`$()`, `` `...` ``), then graded on a four-level lattice:
   $$\text{read\_only} < \text{unknown} < \text{potentially\_mutating} < \text{destructive}$$
   Worst segment wins. `unknown` fails closed (`copyable = False`). `kubectl delete` is withheld even with `--dry-run`.

2. **Two-pass secret redaction must be mathematically idempotent (`treage/redact.py`).**
   Redaction runs before the model sees the event and again on the model's completion. Naive regex scrubbing corrupts its own markers or double-counts replacements on pass two. Masking existing `[REDACTED:<category>]` spans with null-byte placeholders guarantees `redact(redact(x)) == redact(x)`.

3. **Make the model quote the output, or distrust it (`treage/pipeline.py`).**
   No embeddings or judge model needed: require `evidence: [{source, quote}]` and check that `quote` (`len >= 4`) is a literal substring of the redacted stream. Strip invented quotes; if none survive, force `certainty` to `low`.

4. **The safest capture ignores success (`treage/event.py`, ADR 0001).**
   `make_event` rejects `exit_code == 0`. Live streams cap at `64 KB` in a sliding `bytearray` ring buffer and keep the last `4,000` characters on failure.

5. **Zero dependencies is a security and clean-IP feature (`pyproject.toml`, ADR 0010).**
   `dependencies = []` (Python 3.9+ stdlib only). Zero transitive CVEs to audit in enterprise security review, zero license contamination in diligence, and `python3 -m treage replay` runs on any laptop in two seconds.

6. **Certainty is three words, not a fake float (`treage/pipeline.py`, ADR 0005).**
   `confidence: 0.87` from an uncalibrated generative model is fiction. Certainty is constrained to `low`, `medium`, or `high`.

7. **Unknown JSON fields reject the whole completion (`treage/validate.py`, ADR 0004).**
   If a schema validator ignores extra keys, a compromised completion can smuggle `"execute": true` beside valid fields. `set(obj.keys()) != _TOP_KEYS` drops the entire object, while a dangerous command *inside* the valid `suggestions` array is classified per-item so a planted `kubectl delete` does not erase a valid `kubectl auth can-i` in the same response.

## Next stages on the board

- **Quantized local runtime vs. System 1 routing:** 4-bit quantized local models via Ollama (`Q4_K_M`) for zero-cloud diagnosis; evaluating fast System 1 decision models (`Jev` in ~140ms) for routing failure signals into ratified runbooks.
- **Playbooks-as-Code (`runbooks/*.yaml` + `treage playbook lint`):** Git-versioned YAML decision trees where every templated command and regex-sanitized parameter (`{{namespace}}`, `{{pod}}`) is statically verified by `treage.policy.classify()` in CI before an incident happens.
- **Terminal ergonomics under stress:** OSC 133 semantic prompt markers for post-failure capture without pre-wrapping, `zsh` ZLE `$BUFFER` staging (`Alt+.`) limited strictly to `read_only` commands, and persistent `tmux` service watchers (`tmux capture-pane`) for shared incident sessions.
