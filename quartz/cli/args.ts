/**
 * CLI argument definitions for yargs + companion TypeScript interfaces.
 * The yargs option objects are used to configure commands; the interfaces
 * type the parsed argv objects that handlers receive.
 */

// ─── Yargs option definitions ──────────────────────────────────────────────

export const CommonArgv = {
  directory: {
    string: true,
    alias: ["d"],
    default: "content",
    describe: "directory to look for content files",
  },
  verbose: {
    boolean: true,
    alias: ["v"],
    default: false,
    describe: "print out extra logging information",
  },
} as const

export const CreateArgv = {
  ...CommonArgv,
  source: {
    string: true,
    alias: ["s"],
    describe: "source directory to copy/create symlink from",
  },
  strategy: {
    string: true,
    alias: ["X"],
    choices: ["new", "copy", "symlink"] as const,
    describe: "strategy for content folder setup",
  },
  links: {
    string: true,
    alias: ["l"],
    choices: ["absolute", "shortest", "relative"] as const,
    describe: "strategy to resolve links",
  },
} as const

export const SyncArgv = {
  ...CommonArgv,
  commit: {
    boolean: true,
    default: true,
    describe: "create a git commit for your unsaved changes",
  },
  message: {
    string: true,
    alias: ["m"],
    describe: "option to override the default Quartz commit message",
  },
  push: {
    boolean: true,
    default: true,
    describe: "push updates to your Quartz fork",
  },
  pull: {
    boolean: true,
    default: true,
    describe: "pull updates from your Quartz fork",
  },
} as const

export const BuildArgv = {
  ...CommonArgv,
  output: {
    string: true,
    alias: ["o"],
    default: "public",
    describe: "output folder for files",
  },
  serve: {
    boolean: true,
    default: false,
    describe: "run a local server to live-preview your Quartz",
  },
  baseDir: {
    string: true,
    default: "",
    describe: "base path to serve your local server on",
  },
  port: {
    number: true,
    default: 8080,
    describe: "port to serve Quartz on",
  },
  wsPort: {
    number: true,
    default: 3001,
    describe: "port to use for WebSocket-based hot-reload notifications",
  },
  remoteDevHost: {
    string: true,
    default: "",
    describe: "A URL override for the websocket connection if you are not developing on localhost",
  },
  bundleInfo: {
    boolean: true,
    default: false,
    describe: "show detailed bundle information",
  },
  concurrency: {
    number: true,
    describe: "how many threads to use to parse notes",
  },
} as const

// ─── TypeScript interfaces (argv types passed to handlers) ─────────────────

export interface CommonArgvType {
  directory: string
  verbose: boolean
}

export interface CreateArgvType extends CommonArgvType {
  source?: string
  strategy?: "new" | "copy" | "symlink"
  links?: "absolute" | "shortest" | "relative"
}

export interface BuildArgvType extends CommonArgvType {
  output: string
  serve: boolean
  baseDir: string
  port: number
  wsPort: number
  remoteDevHost: string
  bundleInfo: boolean
  concurrency?: number
}

export interface SyncArgvType extends CommonArgvType {
  commit: boolean
  message?: string
  push: boolean
  pull: boolean
}
