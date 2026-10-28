import { formatDate, getDate } from "./Date"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import readingTime from "reading-time"

function hideContentMeta(slug?: string) {
  if (!slug) return false
  // No date/reading time on landing, folder indexes, or CV-style pages.
  return slug === "index" || slug === "work" || slug === "graph" || slug.endsWith("/index")
}

export default (() => {
  function ContentMetadata({ cfg, fileData, displayClass }: QuartzComponentProps) {
    if (hideContentMeta(fileData.slug)) {
      return null
    }

    const text = fileData.text
    if (text) {
      const segments: string[] = []
      const { text: timeTaken, words: _words } = readingTime(text)

      if (fileData.dates) {
        segments.push(formatDate(getDate(cfg, fileData)!))
      }

      segments.push(timeTaken)
      return <p class={`content-meta ${displayClass ?? ""}`}>{segments.join(" · ")}</p>
    } else {
      return null
    }
  }

  ContentMetadata.css = `
  .content-meta {
    margin-top: 0;
    color: var(--gray);
  }
  `
  return ContentMetadata
}) satisfies QuartzComponentConstructor
