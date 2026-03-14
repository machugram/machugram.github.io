import path from "path"
import { readFileSync } from "fs"

export const ORIGIN_NAME = "origin"
export const UPSTREAM_NAME = "upstream"
export const QUARTZ_SOURCE_BRANCH = "v4"
export const cwd: string = process.cwd()
export const cacheDir: string = path.join(cwd, ".quartz-cache")
export const cacheFile = "./quartz/.quartz-cache/transpiled-build.mjs"
export const fp = "./quartz/build.ts"
export const { version }: { version: string } = JSON.parse(
  readFileSync("./package.json").toString(),
)
export const contentCacheFolder: string = path.join(cacheDir, "content-cache")
