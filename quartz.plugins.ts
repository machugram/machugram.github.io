/**
 * quartz.plugins.ts
 *
 * Plugin pipeline for Quartz.
 * Separated from quartz.config.ts so you can focus on:
 *   - Site identity  → quartz.config.ts
 *   - Content pipeline → this file
 *
 * Three stages:
 *   transformers  — parse & enrich each Markdown file
 *   filters       — decide which files get published
 *   emitters      — produce HTML pages and assets
 */
import * as Plugin from "./quartz/plugins"
import { PluginTypes } from "./quartz/plugins/types"

const plugins: PluginTypes = {
  transformers: [
    Plugin.FrontMatter(),
    Plugin.TableOfContents(),
    Plugin.CreatedModifiedDate({
      // Add "git" here to derive the modified date from git history.
      // If you do, set defaultDateType to "modified" in quartz.config.ts.
      priority: ["frontmatter", "filesystem"],
    }),
    Plugin.Latex({ renderEngine: "katex" }),
    Plugin.SyntaxHighlighting(),
    Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
    Plugin.GitHubFlavoredMarkdown(),
    Plugin.CrawlLinks({ markdownLinkResolution: "shortest", lazyLoad: true }),
    Plugin.Description(),
  ],

  filters: [
    // Remove any file whose frontmatter has `draft: true`
    Plugin.RemoveDrafts(),
  ],

  emitters: [
    Plugin.AliasRedirects(),
    Plugin.ComponentResources({ fontOrigin: "googleFonts" }),
    Plugin.ContentPage(),
    Plugin.FolderPage(),
    Plugin.TagPage(),
    Plugin.ContentIndex({
      enableSiteMap: true,
      enableRSS: true,
    }),
    Plugin.Assets(),
    Plugin.Static(),
    Plugin.NotFoundPage(),
  ],
}

export default plugins
