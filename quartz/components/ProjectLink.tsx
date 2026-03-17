import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

export default (() => {
  const ProjectLink: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
    const github = fileData.frontmatter?.github
    const url = fileData.frontmatter?.url

    // Use github field first, fallback to url if it's a github link
    const projectUrl = github || (url?.includes("github.com") ? url : null)

    if (!projectUrl) {
      return null
    }

    return (
      <div class={`project-link ${displayClass ?? ""}`}>
        <a href={projectUrl} target="_blank" rel="noopener noreferrer" class="external">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>
          View on GitHub
        </a>
      </div>
    )
  }

  ProjectLink.css = `
  .project-link {
    margin: 1rem 0;
  }

  .project-link a {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: var(--light);
    border: 1px solid var(--lightgray);
    border-radius: 0.5rem;
    text-decoration: none;
    color: var(--dark);
    font-weight: 500;
    transition: all 0.2s ease;
  }

  .project-link a:hover {
    background: var(--lightgray);
    border-color: var(--gray);
    transform: translateY(-1px);
  }

  .project-link svg {
    flex-shrink: 0;
  }
  `

  return ProjectLink
}) satisfies QuartzComponentConstructor
