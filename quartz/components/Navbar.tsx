import { pathToRoot, joinSegments } from "../util/path"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore: inline scripts are bundled separately by Quartz
import script from "./scripts/navbar.inline"

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
        <a href={joinSegments(baseDir, "posts")} class="nav-link">
          WRITINGS
        </a>
        <a href={joinSegments(baseDir, "projects")} class="nav-link">
          PROJECTS
        </a>
      </div>
    </nav>
  )
}

Navbar.afterDOMLoaded = script

Navbar.css = `
.navbar {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.navbar-name {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--dark) !important;
  text-decoration: none !important;
  background-color: transparent !important;
  letter-spacing: 0.01em;
  transition: color 0.2s ease;
}

.navbar-name:hover {
  color: var(--gray) !important;
}

.navbar-links {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.nav-link {
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  color: var(--gray) !important;
  text-transform: uppercase;
  font-weight: 500;
  text-decoration: none !important;
  background-color: transparent !important;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: var(--dark) !important;
}
`

export default (() => Navbar) satisfies QuartzComponentConstructor
