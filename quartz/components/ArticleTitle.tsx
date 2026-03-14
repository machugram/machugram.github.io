import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

function ArticleTitle({ fileData, displayClass }: QuartzComponentProps) {
  const title = fileData.frontmatter?.title
  if (title) {
    return <h1 class={`article-title ${displayClass ?? ""}`}>{title}</h1>
  } else {
    return null
  }
}

ArticleTitle.css = `
.article-title {
  margin: 2.5rem 0 0 0;
  font-family: var(--headerFont);
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.2;
  color: var(--dark);
}
`

export default (() => ArticleTitle) satisfies QuartzComponentConstructor
