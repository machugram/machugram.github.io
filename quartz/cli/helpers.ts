import os from "os"
import { isCancel, outro } from "@clack/prompts"
import chalk from "chalk"
import { contentCacheFolder } from "./constants.ts"
import { spawnSync } from "child_process"
import fs from "fs"
import { rimraf } from "rimraf"

export function escapePath(fp: string): string {
  return fp
    .replace(/\\ /g, " ") // unescape spaces
    .replace(/^".*"$/, "$1")
    .replace(/^'.*"$/, "$1")
    .trim()
}

export function exitIfCancel<T>(val: T | symbol): T {
  if (isCancel(val)) {
    outro(chalk.red("Exiting"))
    process.exit(0)
  } else {
    return val as T
  }
}

export async function stashContentFolder(contentFolder: string): Promise<void> {
  await fs.promises.rm(contentCacheFolder, { force: true, recursive: true })
  await fs.promises.cp(contentFolder, contentCacheFolder, {
    force: true,
    recursive: true,
    verbatimSymlinks: true,
    preserveTimestamps: true,
  })
  await fs.promises.rm(contentFolder, { force: true, recursive: true })
}

export function gitPull(origin: string, branch: string): void {
  const flags = ["--no-rebase", "--autostash", "-s", "recursive", "-X", "ours", "--no-edit"]
  const out = spawnSync("git", ["pull", ...flags, origin, branch], { stdio: "inherit" })
  if (out.stderr) {
    throw new Error(chalk.red(`Error while pulling updates: ${out.stderr}`))
  } else if (out.status !== 0) {
    throw new Error(chalk.red("Error while pulling updates"))
  }
}

export async function popContentFolder(contentFolder: string): Promise<void> {
  await fs.promises.rm(contentFolder, { force: true, recursive: true })
  await fs.promises.cp(contentCacheFolder, contentFolder, {
    force: true,
    recursive: true,
    verbatimSymlinks: true,
    preserveTimestamps: true,
  })
  await fs.promises.rm(contentCacheFolder, { force: true, recursive: true })
}

export async function rmrf(fp: string): Promise<void> {
  if (os.platform() === "win32") {
    await rimraf.windows(fp)
  } else {
    await rimraf(fp)
  }
}
