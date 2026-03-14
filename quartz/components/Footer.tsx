import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

interface Options {
  links: Record<string, string>
}

export default ((opts?: Options) => {
  function Footer({ displayClass }: QuartzComponentProps) {
    const links = opts?.links ?? []
    return (
      <footer class={`${displayClass ?? ""}`}>
        <div class="footer-inner">
          <ul class="footer-links">
            {Object.entries(links).map(([text, link]) => (
              <li>
                <a href={link}>{text}</a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    )
  }

  Footer.css = `
footer {
  margin-top: 4rem;
  margin-bottom: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--lightgray);
}

.footer-inner {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.footer-links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.footer-links li a {
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 500;
  color: var(--gray) !important;
  text-decoration: none !important;
  background-color: transparent !important;
  transition: color 0.2s ease;
}

.footer-links li a:hover {
  color: var(--dark) !important;
}
`
  return Footer
}) satisfies QuartzComponentConstructor
