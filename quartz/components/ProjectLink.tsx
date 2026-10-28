import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

export default (() => {
  const ProjectLink: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
    const github = fileData.frontmatter?.github
    const url = fileData.frontmatter?.url
    const live = fileData.frontmatter?.live as string | undefined
    const liveLabel = ((fileData.frontmatter?.liveLabel as string | undefined) || "live").toLowerCase()

    const sourceUrl = github || (typeof url === "string" && url.includes("github.com") ? url : null)

    if (!sourceUrl && !live) {
      return null
    }

    return (
      <p class={`project-link ${displayClass ?? ""}`}>
        {sourceUrl && (
          <a href={sourceUrl} target="_blank" rel="noopener noreferrer" class="external">
            source
          </a>
        )}
        {sourceUrl && live && <span class="project-link-sep">·</span>}
        {live && (
          <a href={live} target="_blank" rel="noopener noreferrer" class="external">
            {liveLabel}
          </a>
        )}
      </p>
    )
  }

  ProjectLink.css = `
  .project-link {
    margin: 0.35rem 0 1.5rem;
    font-size: 0.9rem;
    color: var(--gray);
    line-height: 1.4;
  }

  .project-link a {
    color: var(--darkgray) !important;
    text-decoration: underline !important;
    text-decoration-color: color-mix(in srgb, var(--gray) 45%, transparent) !important;
    text-underline-offset: 3px;
    background: transparent !important;
    font-weight: 400;
  }

  .project-link a:hover {
    color: var(--dark) !important;
    text-decoration-color: var(--tertiary) !important;
  }

  .project-link-sep {
    margin: 0 0.4rem;
    color: var(--gray);
  }
  `

  return ProjectLink
}) satisfies QuartzComponentConstructor
