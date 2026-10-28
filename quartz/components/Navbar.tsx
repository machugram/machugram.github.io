import { pathToRoot, joinSegments } from "../util/path"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

function Navbar({ fileData, cfg, displayClass }: QuartzComponentProps) {
  const title = cfg?.pageTitle ?? "Untitled"
  const baseDir = pathToRoot(fileData.slug!)
  return (
    <nav class={`navbar ${displayClass ?? ""}`}>
      <div class="navbar-top">
        <a href={baseDir} class="navbar-name">
          {title}
        </a>
      </div>
      <div class="navbar-links">
        <a href={joinSegments(baseDir, "work")} class="nav-link">
          work
        </a>
        <a href={joinSegments(baseDir, "projects") + "/"} class="nav-link">
          projects
        </a>
        <a href={joinSegments(baseDir, "tech") + "/"} class="nav-link">
          tech
        </a>
        <a href={joinSegments(baseDir, "writing") + "/"} class="nav-link">
          writing
        </a>
        <a href={joinSegments(baseDir, "graph")} class="nav-link">
          graph
        </a>
      </div>
    </nav>
  )
}

Navbar.css = `
.navbar {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.navbar-name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--dark) !important;
  text-decoration: none !important;
  background-color: transparent !important;
  letter-spacing: -0.01em;
  transition: color 0.15s ease;
}

.navbar-name:hover {
  color: var(--gray) !important;
}

.navbar-links {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.nav-link {
  font-size: 0.9rem;
  letter-spacing: 0;
  color: var(--gray) !important;
  text-transform: none;
  font-weight: 400;
  text-decoration: none !important;
  background-color: transparent !important;
  transition: color 0.15s ease;
}

.nav-link:hover {
  color: var(--dark) !important;
}
`

export default (() => Navbar) satisfies QuartzComponentConstructor
