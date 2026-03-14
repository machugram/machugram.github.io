import path from "path"
import fs from "fs"
import { PerfTimer } from "../util/perf"
import { getStaticResourcesFromPlugins } from "../plugins"
import { EmitCallback } from "../plugins/types"
import { ProcessedContent } from "../types/vfile"
import { FilePath, joinSegments } from "../util/path"
import { QuartzLogger } from "../util/log"
import { trace } from "../util/trace"
import { BuildCtx } from "../types/ctx"

export async function emitContent(ctx: BuildCtx, content: ProcessedContent[]) {
  const { argv, cfg } = ctx
  const perf = new PerfTimer()
  const log = new QuartzLogger(ctx.argv.verbose)

  log.start(`Emitting output files`)

  // Pre-create the output root and its `static/` sub-directory.
  // Node 18's fs.cp has a known EEXIST race when the destination directory is
  // created concurrently by another emitter (e.g. ContentIndex writing
  // static/contentIndex.json). Pre-creating both dirs makes all mkdir calls
  // idempotent before the parallel emit starts.
  await fs.promises.mkdir(path.join(argv.output, "static"), { recursive: true })

  const emit: EmitCallback = async ({ slug, ext, content }) => {
    const pathToPage = joinSegments(argv.output, slug + ext) as FilePath
    const dir = path.dirname(pathToPage)
    await fs.promises.mkdir(dir, { recursive: true })
    await fs.promises.writeFile(pathToPage, content)
    return pathToPage
  }

  let emittedFiles = 0
  const staticResources = getStaticResourcesFromPlugins(ctx)

  // Run all emitters concurrently — each writes to its own set of output paths,
  // so parallel execution is safe. mkdir({ recursive: true }) is idempotent.
  const counts = await Promise.all(
    cfg.plugins.emitters.map(async (emitter) => {
      try {
        const emitted = await emitter.emit(ctx, content, staticResources, emit)
        if (ctx.argv.verbose) {
          for (const file of emitted) {
            console.log(`[emit:${emitter.name}] ${file}`)
          }
        }
        return emitted.length
      } catch (err) {
        trace(`Failed to emit from plugin \`${emitter.name}\``, err as Error)
        return 0
      }
    }),
  )
  emittedFiles = counts.reduce((acc, n) => acc + n, 0)

  log.end(`Emitted ${emittedFiles} files to \`${argv.output}\` in ${perf.timeSince()}`)
}
