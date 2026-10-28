import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore
import script from "./scripts/graph.inline"
import style from "./styles/graph.scss"

export interface D3Config {
  drag: boolean
  zoom: boolean
  depth: number
  scale: number
  repelForce: number
  centerForce: number
  linkDistance: number
  fontSize: number
  opacityScale: number
  removeTags: string[]
  showTags: boolean
}

interface GraphOptions {
  localGraph: Partial<D3Config> | undefined
  globalGraph: Partial<D3Config> | undefined
}

const defaultOptions: GraphOptions = {
  localGraph: {
    drag: true,
    zoom: true,
    depth: -1,
    scale: 1.05,
    repelForce: 0.7,
    centerForce: 0.35,
    linkDistance: 55,
    fontSize: 0.5,
    // Label opacity is (opacityScale - 1) / 3.75 — keep > 1 so titles are readable without zooming.
    opacityScale: 2.2,
    showTags: true,
    removeTags: [],
  },
  globalGraph: {
    drag: true,
    zoom: true,
    depth: -1,
    scale: 1,
    repelForce: 0.65,
    centerForce: 0.35,
    linkDistance: 50,
    fontSize: 0.5,
    opacityScale: 2.2,
    showTags: true,
    removeTags: [],
  },
}

export default ((opts?: GraphOptions) => {
  function Graph({ displayClass, fileData }: QuartzComponentProps) {
    // Dedicated /graph page only — keep article pages clean.
    if ((fileData.slug ?? "") !== "graph") {
      return null
    }

    const localGraph = { ...defaultOptions.localGraph, ...opts?.localGraph }
    const globalGraph = { ...defaultOptions.globalGraph, ...opts?.globalGraph }
    return (
      <div class={`graph graph--page ${displayClass ?? ""}`}>
        <div class="graph-outer">
          <div id="graph-container" data-cfg={JSON.stringify(localGraph)}></div>
          <svg
            version="1.1"
            id="global-graph-icon"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 55 55"
            fill="currentColor"
            xmlSpace="preserve"
            aria-label="Open fullscreen graph"
          >
            <path d="M49,0c-3.309,0-6,2.691-6,6c0,1.035,0.263,2.009,0.726,2.86l-9.829,9.829C32.542,17.634,30.846,17,29,17 s-3.542,0.634-4.898,1.688l-7.669-7.669C16.785,10.424,17,9.74,17,9c0-2.206-1.794-4-4-4S9,6.794,9,9s1.794,4,4,4 c0.74,0,1.424-0.215,2.019-0.567l7.669,7.669C21.634,21.458,21,23.154,21,25s0.634,3.542,1.688,4.897L10.024,42.562 C8.958,41.595,7.549,41,6,41c-3.309,0-6,2.691-6,6s2.691,6,6,6s6-2.691,6-6c0-1.035-0.263-2.009-0.726-2.86l12.829-12.829 c1.106,0.86,2.44,1.436,3.898,1.619v10.16c-2.833,0.478-5,2.942-5,5.91c0,3.309,2.691,6,6,6s6-2.691,6-6c0-2.967-2.167-5.431-5-5.91 v-10.16c1.458-0.183,2.792-0.759,3.898-1.619l7.669,7.669C41.215,39.576,41,40.26,41,41c0,2.206,1.794,4,4,4s4-1.794,4-4 s-1.794-4-4-4c-0.74,0-1.424,0.215-2.019,0.567l-7.669-7.669C36.366,28.542,37,26.846,37,25s-0.634-3.542-1.688-4.897l9.665-9.665 C46.042,11.405,47.451,12,49,12c3.309,0,6-2.691,6-6S52.309,0,49,0z" />
          </svg>
        </div>
        <div id="global-graph-outer">
          <div id="global-graph-container" data-cfg={JSON.stringify(globalGraph)}></div>
        </div>
      </div>
    )
  }

  Graph.css = style
  Graph.afterDOMLoaded = script

  return Graph
}) satisfies QuartzComponentConstructor
