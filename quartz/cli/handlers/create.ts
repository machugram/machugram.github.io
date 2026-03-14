import path from "path"
import chalk from "chalk"
import fs from "fs"
import { intro, outro, select, text } from "@clack/prompts"
import { execSync } from "child_process"
import { exitIfCancel, escapePath, rmrf } from "../helpers.ts"
import { version, cwd } from "../constants.ts"
import { CreateArgvType } from "../args.ts"

/**
 * Handles `npx quartz create`
 */
export async function handleCreate(argv: CreateArgvType): Promise<void> {
  console.log()
  intro(chalk.bgGreen.black(` Quartz v${version} `))
  const contentFolder = path.join(cwd, argv.directory)
  let setupStrategy = argv.strategy?.toLowerCase()
  let linkResolutionStrategy = argv.links?.toLowerCase()
  const sourceDirectory = argv.source

  // If all cmd arguments were provided, check if they're valid
  if (setupStrategy && linkResolutionStrategy) {
    // If setup isn't "new", source argument is required
    if (setupStrategy !== "new") {
      if (!sourceDirectory) {
        outro(
          chalk.red(
            `Setup strategies (arg '${chalk.yellow(
              `-X`,
            )}') other than '${chalk.yellow(
              "new",
            )}' require content folder argument ('${chalk.yellow(
              `-s`,
            )}') to be set`,
          ),
        )
        process.exit(1)
      } else {
        if (!fs.existsSync(sourceDirectory)) {
          outro(
            chalk.red(
              `Input directory to copy/symlink 'content' from not found ('${chalk.yellow(
                sourceDirectory,
              )}', invalid argument "${chalk.yellow(`-s`)})`,
            ),
          )
          process.exit(1)
        } else if (!fs.lstatSync(sourceDirectory).isDirectory()) {
          outro(
            chalk.red(
              `Source directory to copy/symlink 'content' from is not a directory (found file at '${chalk.yellow(
                sourceDirectory,
              )}', invalid argument ${chalk.yellow(`-s`)}")`,
            ),
          )
          process.exit(1)
        }
      }
    }
  }

  // Use CLI process if cmd args weren't provided
  if (!setupStrategy) {
    setupStrategy = exitIfCancel(
      await select({
        message: `Choose how to initialize the content in \`${contentFolder}\``,
        options: [
          { value: "new", label: "Empty Quartz" },
          { value: "copy", label: "Copy an existing folder", hint: "overwrites `content`" },
          {
            value: "symlink",
            label: "Symlink an existing folder",
            hint: "don't select this unless you know what you are doing!",
          },
        ],
      }),
    )
  }

  async function rmContentFolder() {
    const contentStat = await fs.promises.lstat(contentFolder)
    if (contentStat.isSymbolicLink()) {
      await fs.promises.unlink(contentFolder)
    } else {
      await rmrf(contentFolder)
    }
  }

  const gitkeepPath = path.join(contentFolder, ".gitkeep")
  if (fs.existsSync(gitkeepPath)) {
    await fs.promises.unlink(gitkeepPath)
  }
  if (setupStrategy === "copy" || setupStrategy === "symlink") {
    let originalFolder = sourceDirectory

    // If input directory was not passed, use CLI
    if (!sourceDirectory) {
      originalFolder = escapePath(
        exitIfCancel(
          await text({
            message: "Enter the full path to existing content folder",
            placeholder:
              "On most terminal emulators, you can drag and drop a folder into the window and it will paste the full path",
            validate(fp) {
              const fullPath = escapePath(fp)
              if (!fs.existsSync(fullPath)) {
                return "The given path doesn't exist"
              } else if (!fs.lstatSync(fullPath).isDirectory()) {
                return "The given path is not a folder"
              }
            },
          }),
        ),
      )
    }

    await rmContentFolder()
    if (setupStrategy === "copy") {
      await fs.promises.cp(originalFolder!, contentFolder, {
        recursive: true,
        preserveTimestamps: true,
      })
    } else if (setupStrategy === "symlink") {
      await fs.promises.symlink(originalFolder!, contentFolder, "dir")
    }
  } else if (setupStrategy === "new") {
    await fs.promises.writeFile(
      path.join(contentFolder, "index.md"),
      `---
title: Welcome to Quartz
---

This is a blank Quartz installation.
See the [documentation](https://quartz.jzhao.xyz) for how to get started.
`,
    )
  }

  // Use CLI process if cmd args weren't provided
  if (!linkResolutionStrategy) {
    linkResolutionStrategy = exitIfCancel(
      await select({
        message: `Choose how Quartz should resolve links in your content. You can change this later in \`quartz.config.ts\`.`,
        options: [
          {
            value: "absolute",
            label: "Treat links as absolute path",
            hint: "for content made for Quartz 3 and Hugo",
          },
          {
            value: "shortest",
            label: "Treat links as shortest path",
            hint: "for most Obsidian vaults",
          },
          {
            value: "relative",
            label: "Treat links as relative paths",
            hint: "for just normal Markdown files",
          },
        ],
      }),
    )
  }

  // now, do config changes
  const configFilePath = path.join(cwd, "quartz.config.ts")
  let configContent = await fs.promises.readFile(configFilePath, { encoding: "utf-8" })
  configContent = configContent.replace(
    /markdownLinkResolution: '(.+)'/,
    `markdownLinkResolution: '${linkResolutionStrategy}'`,
  )
  await fs.promises.writeFile(configFilePath, configContent)

  // setup remote
  execSync(
    `git remote show upstream || git remote add upstream https://github.com/jackyzha0/quartz.git`,
  )

  outro(`You're all set! Not sure what to do next? Try:
  • Customizing Quartz a bit more by editing \`quartz.config.ts\`
  • Running \`npx quartz build --serve\` to preview your Quartz locally
  • Hosting your Quartz online (see: https://quartz.jzhao.xyz/hosting)
`)
}
