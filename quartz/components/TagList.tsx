import { pathToRoot, slugTag } from "../util/path"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

function TagList({ fileData, displayClass }: QuartzComponentProps) {
  const tags = fileData.frontmatter?.tags
  const baseDir = pathToRoot(fileData.slug!)
  if (tags && tags.length > 0) {
    return (
      <ul class={`tags ${displayClass ?? ""}`}>
        {tags.map((tag) => {
          const display = `#${tag}`
          const linkDest = baseDir + `/tags/${slugTag(tag)}`
          return (
            <li>
              <a href={linkDest} class="internal tag-link">
                {display}
              </a>
            </li>
          )
        })}
      </ul>
    )
  } else {
    return null
  }
}

TagList.css = `
.tags {
  list-style: none;
  display: flex;
  padding-left: 0;
  gap: 0.5rem;
  margin: 0.75rem 0 0 0;
  flex-wrap: wrap;
  justify-self: start;
}

.section-li > .section > .tags {
  justify-content: flex-start;
}
  
.tags > li {
  display: inline-block;
  white-space: nowrap;
  margin: 0;
  overflow-wrap: normal;
}

a.internal.tag-link {
  display: inline-block;
  border-radius: 6px;
  background-color: transparent;
  border: 1.5px solid var(--tertiary);
  color: var(--tertiary);
  padding: 0.25rem 0.65rem;
  margin: 0;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: var(--tertiary);
    color: var(--light);
    transform: translateY(-1px);
  }
}
`

export default (() => TagList) satisfies QuartzComponentConstructor
