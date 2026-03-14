import { FullSlug, resolveRelative } from "../util/path"
import { QuartzPluginData } from "../types/vfile"
import { Date, getDate } from "./Date"
import { QuartzComponentProps } from "./types"
import { GlobalConfiguration } from "../cfg"

export function byDateAndAlphabetical(
  cfg: GlobalConfiguration,
): (f1: QuartzPluginData, f2: QuartzPluginData) => number {
  return (f1, f2) => {
    if (f1.dates && f2.dates) {
      // sort descending
      return getDate(cfg, f2)!.getTime() - getDate(cfg, f1)!.getTime()
    } else if (f1.dates && !f2.dates) {
      // prioritize files with dates
      return -1
    } else if (!f1.dates && f2.dates) {
      return 1
    }

    // otherwise, sort lexographically by title
    const f1Title = f1.frontmatter?.title.toLowerCase() ?? ""
    const f2Title = f2.frontmatter?.title.toLowerCase() ?? ""
    return f1Title.localeCompare(f2Title)
  }
}

// Tags that denote a tech post
const TECH_TAGS = new Set([
  "networking",
  "protocols",
  "security",
  "tech-history",
  "linux",
  "open-source",
  "experiments",
  "tech",
])

function deriveCategory(page: QuartzPluginData): string {
  const slug = page.slug ?? ""
  const tags = (page.frontmatter?.tags ?? []) as string[]
  if (slug.includes("/tech/") || tags.some((t) => TECH_TAGS.has(t))) {
    return "tech"
  }
  return "personal"
}

type Props = {
  limit?: number
} & QuartzComponentProps

export function PageList({ cfg, fileData, allFiles, limit }: Props) {
  let list = allFiles.sort(byDateAndAlphabetical(cfg))
  if (limit) {
    list = list.slice(0, limit)
  }

  const showFilterTabs = !limit // only show filters on full listing pages

  return (
    <div class="page-list-container">
      {showFilterTabs && (
        <div class="filter-tabs">
          <button class="filter-btn active" data-filter="all">
            All
          </button>
          <button class="filter-btn" data-filter="tech">
            Tech
          </button>
          <button class="filter-btn" data-filter="personal">
            Personal
          </button>
        </div>
      )}
      <ul class="section-ul" id="posts-list">
        {list.map((page) => {
          const title = page.frontmatter?.displayTitle ?? page.frontmatter?.title
          const description = page.frontmatter?.description ?? page.description
          const category = deriveCategory(page)

          return (
            <li class="section-li" data-category={category}>
              <div class="section">
                {page.dates && (
                  <p class="meta">
                    <Date date={getDate(cfg, page)!} />
                  </p>
                )}
                <div class="desc">
                  <h3>
                    <a href={resolveRelative(fileData.slug!, page.slug!)} class="internal">
                      {title}
                    </a>
                  </h3>
                  {description && <p class="post-description">{description}</p>}
                </div>
                <ul class="tags" style="display:none">
                </ul>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

PageList.css = `
.page-list-container {
  width: 100%;
}

.section h3 {
  margin: 0;
}

.section > .tags {
  margin: 0;
}
`
