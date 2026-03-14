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
      header: "Lora",
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
}

export default config
