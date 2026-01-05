import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "🪴 Space",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    baseUrl: "machugram.github.io",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
    theme: {
      typography: {
        header: "Inter",
        body: "Inter",
        code: "JetBrains Mono",
      },
      colors: {
        lightMode: {
          light: "#fafafa",
          lightgray: "#e5e5e5",
          gray: "#737373",
          darkgray: "#404040",
          dark: "#1a1a1a",
          secondary: "#1a1a1a",
          tertiary: "#10b981",
          highlight: "rgba(16, 185, 129, 0.1)",
        },
        darkMode: {
          light: "#0a0a0a",
          lightgray: "#262626",
          gray: "#737373",
          darkgray: "#d4d4d4",
          dark: "#fafafa",
          secondary: "#d4d4d4",
          tertiary: "#10b981",
          highlight: "rgba(16, 185, 129, 0.15)",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.TableOfContents(),
      Plugin.CreatedModifiedDate({
        // you can add 'git' here for last modified from Git
        // if you do rely on git for dates, ensure defaultDateType is 'modified'
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.Latex({ renderEngine: "katex" }),
      Plugin.SyntaxHighlighting(),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest", lazyLoad: true }),
      Plugin.Description(),
    ],
    filters: [Plugin.RemoveDrafts()],
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
  },
}

export default config
