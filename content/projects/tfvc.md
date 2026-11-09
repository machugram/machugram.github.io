---
title: TFVC — Source Control for Cursor and VS Code
displayTitle: TFVC
summary: Team Foundation Version Control in the Cursor and VS Code Source Control view.
draft: false
date:  2026-09-03
github: https://github.com/machugram/tf-extension
cover: https://raw.githubusercontent.com/machugram/tf-extension/main/docs/screenshots/scm.png
live: https://github.com/machugram/tf-extension/releases
liveLabel: releases
stack: [TypeScript, VS Code]
featured: false
order: 8
---

**TFVC** is a Cursor and VS Code extension that puts Team Foundation Version Control back in the Source Control view. Microsoft's Azure Repos extension no longer ships TFVC. This one talks to Visual Studio's `tf.exe` or the Team Explorer Everywhere CLI.

I write code in Cursor. One project would not move to Git. What was left was Visual Studio for every check-in, or a terminal full of `tf status` while the Source Control view sat empty.

This project is not affiliated with Microsoft.

![Pending changes, check-in comment, and workspace status in Cursor](https://raw.githubusercontent.com/machugram/tf-extension/main/docs/screenshots/scm.png)

```text
Cursor / VS Code SCM  ─►  extension (TypeScript)
                              │
                              ▼
                         tf.exe / TEE tf
                              │
                              ▼
                    TFS / Azure DevOps TFVC
```

## Why I built it

The repo, the process, and the check-in culture were staying on Team Foundation Version Control. Migration was not on the table.

That used to be a workable split. Microsoft's Azure Repos extension spoke TFVC, Cursor is VS Code-compatible, and `tf.exe` was already on the machine. Then the official extension dropped TFVC.

Neither Visual Studio nor a raw terminal is an editor workflow. Server workspaces make files read-only until you check them out. Pending changes, shelvesets, and work-item association are the job. If the editor cannot do them, you bounce back to Visual Studio the moment you need to ship.

I did not want to reimplement TFVC. I wanted the Source Control view to tell `tf` what I meant: locate the client, parse status, paint included / excluded / conflicted, check in from the SCM box. Same VSIX in Cursor and VS Code. The CLI stays the source of truth.

Open a folder mapped with `tf workfold`. No mapping, no provider.

## Tech Stack

- **TypeScript** — VS Code extension host, compiled to `out/extension.js`
- **VS Code SCM API** — resource groups, quick-diff, `Ctrl+Enter` / `Cmd+Enter` check-in
- **tf.exe / TEE CLC** — the real client. The extension never talks to Azure DevOps over HTTP itself
- **Secret Storage** — password for `/login` stays out of `settings.json`

## What it does

- Included, excluded, and conflicted pending changes in the Source Control view
- Checkout, add, undo, delete, rename, get latest, history, shelve / unshelve
- Side-by-side diff against the workspace version. Gutters from `tf view`
- Keep-yours and take-theirs from the conflicted group
- Typing in a read-only file checks it out (server workspaces)
- `#123` in the check-in comment associates work items on TEE CLC

![TFVC commands in the Cursor command palette](https://raw.githubusercontent.com/machugram/tf-extension/main/docs/screenshots/commands.png)

![Side-by-side diff of a file against the TFVC workspace version](https://raw.githubusercontent.com/machugram/tf-extension/main/docs/screenshots/diff.png)

A TF command-line client and a folder already mapped with `tf workfold`.

| Platform | Client | Typical location |
| --- | --- | --- |
| Windows | Visual Studio `tf.exe` | Team Explorer under Visual Studio 2022 |
| macOS / Linux | Team Explorer Everywhere CLC (`tf`) | on `PATH`, or set `tfvc.path` |
