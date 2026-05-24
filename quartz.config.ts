/**
 * quartz.config.ts
 *
 * Site-wide settings — the only file most users ever need to touch.
 * For the plugin pipeline, see quartz.plugins.ts.
 */
import { GlobalConfiguration } from "./quartz/cfg"

const config: GlobalConfiguration = {
  pageTitle: "rex.",
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
      body: "PT Serif",
      code: "JetBrains Mono",
    },
    colors: {
      lightMode: {
        light: "#fffcf2",
        lightgray: "#e8e4e0",
        gray: "#6f6a64",
        darkgray: "#2b2926",
        dark: "#121110",
        secondary: "#1f1c18",
        tertiary: "#7a9a8a",
        highlight: "rgba(239, 190, 171, 0.24)",
      },
      darkMode: {
        light: "#1a1815",
        lightgray: "#302c28",
        gray: "#b2aba1",
        darkgray: "#ece5da",
        dark: "#fff8ec",
        secondary: "#f3ebde",
        tertiary: "#a6c2b3",
        highlight: "rgba(239, 190, 171, 0.2)",
      },
    },
  },
}

export default config
