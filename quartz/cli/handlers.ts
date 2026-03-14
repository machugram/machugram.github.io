// Re-export all CLI handlers from their dedicated modules.
// bootstrap-cli.mjs imports from this file with a .js extension;
// tsx resolves .js → .ts transparently.
export { handleCreate } from "./handlers/create.ts"
export { handleBuild } from "./handlers/build.ts"
export { handleUpdate, handleRestore, handleSync } from "./handlers/sync.ts"
