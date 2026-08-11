import { pathToRoot, slugTag } from "../util/path"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

function TagList({ fileData, displayClass }: QuartzComponentProps) {
  const tags = fileData.frontmatter?.tags
  const baseDir = pathToRoot(fileData.slug!)
  if (tags && tags.length > 0) {
    return (
      <ul class={`tags ${displayClass ?? ""}`}>
        {tags.map((tag) => {
          const linkDest = baseDir + `/tags/${slugTag(tag)}`
          return (
            <li>
              <a href={linkDest} class="internal tag-link">
                {tag}
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
  gap: 6px;
  margin: 0.5rem 0 0 0;
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
  border: none;
  border-radius: 4px;
  background-color: color-mix(in srgb, var(--tertiary) 12%, transparent);
  color: var(--tertiary);
  padding: 1px 7px;
  margin: 0;
  font-size: 0.8125rem;
  font-weight: 500;
  text-transform: none;
  letter-spacing: 0.005em;
  text-decoration: none;
  line-height: 1.45;
  transition: background-color 0.15s ease, color 0.15s ease;

  &:hover {
    background-color: color-mix(in srgb, var(--tertiary) 20%, transparent);
    color: var(--dark);
    transform: none;
  }
}
`

export default (() => TagList) satisfies QuartzComponentConstructor
