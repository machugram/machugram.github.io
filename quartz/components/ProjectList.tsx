import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { QuartzPluginData } from "../types/vfile"
import { GlobalConfiguration } from "../cfg"
import { resolveRelative } from "../util/path"
import { getDate } from "./Date"

function projectSort(cfg: GlobalConfiguration) {
  return (a: QuartzPluginData, b: QuartzPluginData) => {
    const aFeatured = a.frontmatter?.featured === true ? 0 : 1
    const bFeatured = b.frontmatter?.featured === true ? 0 : 1
    if (aFeatured !== bFeatured) return aFeatured - bFeatured

    const aOrder = typeof a.frontmatter?.order === "number" ? a.frontmatter.order : 999
    const bOrder = typeof b.frontmatter?.order === "number" ? b.frontmatter.order : 999
    if (aOrder !== bOrder) return aOrder - bOrder

    const aDate = getDate(cfg, a)?.getTime() ?? 0
    const bDate = getDate(cfg, b)?.getTime() ?? 0
    return bDate - aDate
  }
}

function sourceUrl(page: QuartzPluginData): string | null {
  const github = page.frontmatter?.github
  const url = page.frontmatter?.url
  if (typeof github === "string" && github.length > 0) return github
  if (typeof url === "string" && url.includes("github.com")) return url
  return null
}

export function ProjectList({ cfg, fileData, allFiles }: QuartzComponentProps) {
  const projects = [...allFiles].sort(projectSort(cfg))
  const featured = projects.filter((p) => p.frontmatter?.featured === true)
  const also = projects.filter((p) => p.frontmatter?.featured !== true)

  const renderItem = (page: QuartzPluginData) => {
    const title = page.frontmatter?.displayTitle ?? page.frontmatter?.title ?? "Untitled"
    const summary = page.frontmatter?.summary || page.frontmatter?.description || page.description
    const source = sourceUrl(page)
    const live = page.frontmatter?.live as string | undefined
    const liveLabel = ((page.frontmatter?.liveLabel as string | undefined) || "live").toLowerCase()
    const href = resolveRelative(fileData.slug!, page.slug!)

    return (
      <li class="project-row">
        <h3 class="project-row-title">
          <a href={href} class="internal">
            {title}
          </a>
        </h3>
        {summary && <p class="project-row-summary">{summary}</p>}
        {(source || live) && (
          <p class="project-row-actions">
            {source && (
              <a href={source} class="external" target="_blank" rel="noopener noreferrer">
                source
              </a>
            )}
            {source && live && <span class="project-row-sep">·</span>}
            {live && (
              <a href={live} class="external" target="_blank" rel="noopener noreferrer">
                {liveLabel}
              </a>
            )}
          </p>
        )}
      </li>
    )
  }

  return (
    <div class="project-list-wrap">
      {featured.length > 0 && (
        <section class="project-list-section">
          <h2 class="project-list-heading">featured</h2>
          <ul class="project-list">{featured.map(renderItem)}</ul>
        </section>
      )}
      {also.length > 0 && (
        <section class="project-list-section">
          <h2 class="project-list-heading">also</h2>
          <ul class="project-list">{also.map(renderItem)}</ul>
        </section>
      )}
    </div>
  )
}

ProjectList.css = `
.project-list-wrap {
  margin-top: 2.5rem;
  max-width: 42rem;
}

.project-list-section + .project-list-section {
  margin-top: 2.75rem;
}

.project-list-heading {
  font-size: 0.85rem;
  font-weight: 400;
  color: var(--gray);
  margin: 0 0 1.25rem 0;
  font-family: var(--bodyFont);
  letter-spacing: 0;
  text-transform: none;
}

.project-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.project-row {
  margin: 0;
}

.project-row-title {
  margin: 0 0 0.35rem 0;
  font-size: 1.05rem;
  font-weight: 600;
  line-height: 1.35;
  font-family: var(--headerFont);
}

.project-row-title a {
  color: var(--dark) !important;
  text-decoration: none !important;
  background: transparent !important;
}

.project-row-title a:hover {
  color: var(--gray) !important;
}

.project-row-summary {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.55;
  color: var(--gray);
  max-width: 36rem;
}

.project-row-actions {
  margin: 0.4rem 0 0 0;
  font-size: 0.85rem;
  color: var(--gray);
  line-height: 1.4;
}

.project-row-actions a {
  color: var(--darkgray) !important;
  text-decoration: underline !important;
  text-decoration-color: color-mix(in srgb, var(--gray) 45%, transparent) !important;
  text-underline-offset: 3px;
  background: transparent !important;
}

.project-row-actions a:hover {
  color: var(--dark) !important;
  text-decoration-color: var(--tertiary) !important;
}

.project-row-sep {
  margin: 0 0.35rem;
  color: var(--gray);
}
`

export default (() => {
  const Component: QuartzComponent = (props: QuartzComponentProps) => <ProjectList {...props} />
  Component.css = ProjectList.css
  return Component
}) satisfies QuartzComponentConstructor
