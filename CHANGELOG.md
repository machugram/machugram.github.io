# Changelog

All notable changes to the Quartz engine are documented here.

---

## [Unreleased] — Phase B: Newbie-friendly config split

> **Goal:** Separate site-identity settings from the plugin pipeline so first-time
> users only need to touch a single, short file.

### Added

- **`quartz.plugins.ts`** — new file that owns the full transformer / filter /
  emitter pipeline. Each section is commented to explain its purpose.
  Previously this lived inline in `quartz.config.ts`.

### Changed

- **`quartz.config.ts`** — now exports `GlobalConfiguration` only (~45 lines).
  All plugin definitions have been moved to `quartz.plugins.ts`.
- **`quartz/build.ts`** — imports both `quartz.config` and `quartz.plugins` and
  merges them into a `QuartzConfig` object before passing it to the build pipeline.

---

## [Unreleased] — Phase C: Parallel emitters

> **Goal:** Run independent output-stage plugins concurrently instead of one at
> a time, reducing overall emit time.

### Changed

- **`quartz/core/emit.ts`** — the sequential `for...of` loop over emitters is
  replaced with `Promise.all`. Each emitter writes to its own output paths so
  concurrent execution is safe.
- Pre-creates `<output>/static/` before the parallel batch starts. This
  prevents a Node 18 `fs.cp` edge-case where `ContentIndex` and `Static` would
  race to `mkdir public/static` simultaneously, causing an `EEXIST` error.

### Performance

Emit time: **~95 ms → ~70 ms** (~26 % faster) on the 32-file test corpus.

---

## [Unreleased] — Phase D: CLI TypeScript conversion

> **Goal:** Give the entire CLI layer the same type-safety as the rest of the
> engine. All shell-facing code is now TypeScript.

### Added

- **`quartz/cli/args.ts`** — replaces `args.js`. Exports yargs option
  definitions (`CommonArgv`, `CreateArgv`, `BuildArgv`, `SyncArgv`) and
  matching TypeScript interfaces (`CommonArgvType`, `CreateArgvType`,
  `BuildArgvType`, `SyncArgvType`) used to type `argv` in handlers.
- **`quartz/cli/constants.ts`** — replaces `constants.js`. Typed constants.
- **`quartz/cli/helpers.ts`** — replaces `helpers.js`. Full type annotations
  on all exported functions. Also **fixes a pre-existing bug**: `os` was used
  inside `rmrf()` but never imported, causing a silent `ReferenceError` on
  Windows. The import is now explicit.
- **`quartz/cli/handlers/create.ts`**, **`build.ts`**, **`sync.ts`** — typed
  handler files; each handler's `argv` parameter is now typed via the
  corresponding interface from `args.ts`.
- **`quartz/cli/handlers.ts`** — typed barrel re-export.

### Changed

- **`quartz/bootstrap-cli.mjs`** shebang changed from `#!/usr/bin/env node`
  to `#!/usr/bin/env -S node --import tsx/esm`. This wires tsx as the ESM
  module loader before any `import` statement executes, allowing the
  bootstrap script to import `.ts` files directly.
- All CLI imports updated from `.js` to `.ts` extensions (tsx 4.x dropped the
  `.js → .ts` extension fallback present in tsx 3.x).

### Removed

- `quartz/cli/{args,constants,helpers,handlers}.js`
- `quartz/cli/handlers/{create,build,sync}.js`

---

## [Unreleased] — Phase E: .env support

> **Goal:** Allow users to keep secrets (analytics IDs, API keys, custom URLs)
> out of version-controlled config files.

### Added

- **`dotenv`** added as a runtime dependency.
- **`.env.example`** — template documenting the variables Quartz and its config
  files can consume via `process.env`.
- **`quartz/bootstrap-cli.mjs`** — `import "dotenv/config"` is the first
  statement after the shebang, ensuring `.env` is loaded before any other
  module (including `quartz.config.ts`) is evaluated.
- **`.gitignore`** — `.env` uncommented so user secrets are never committed.

---

## [Unreleased] — Phase A: Folder Restructuring

> **Goal:** Reorganise the engine's internal folder layout for clarity, without
> changing any runtime behaviour.

### Added

- **`quartz/core/`** — new home for the three pipeline-stage modules
  (`parse.ts`, `filter.ts`, `emit.ts`), previously under `quartz/processors/`.
- **`quartz/types/vfile.ts`** — canonical location for `QuartzPluginData`,
  `ProcessedContent`, `defaultProcessedContent`.
  Old path `quartz/plugins/vfile.ts` is a thin re-export shim.
- **`quartz/types/ctx.ts`** — canonical location for `Argv` and `BuildCtx`.
  Old path `quartz/util/ctx.ts` is a thin re-export shim.
- **`quartz/cli/handlers/` directory** — `handlers.js` (545 lines) split into
  `create.ts`, `build.ts`, `sync.ts`.

### Changed

- **`quartz/processors/` → `quartz/core/`** directory renamed.
- **25 import sites across 21 files** migrated to canonical `types/` paths.
- **`quartz/cli/handlers/build.ts`** dynamic cache import changed from a
  depth-sensitive relative path to an absolute `file://` URL.

### Fixed

- **ENAMETOOLONG npm cache loop** — `cache=./.npm-cache` line removed from
  `~/.npmrc`.

---

## Verified

```
npx quartz build
→ Parsed 32 Markdown files
→ Emitted 49 files to `public`
→ Done processing 32 files in ~254ms
```

