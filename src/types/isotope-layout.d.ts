declare module 'isotope-layout' {
  export type IsotopeOptions = {
    itemSelector?: string
    layoutMode?: string
    percentPosition?: boolean
    masonry?: {
      columnWidth?: string | number | Element
      gutter?: number
    }
  }

  export default class Isotope {
    constructor(element: Element, options?: IsotopeOptions)
    arrange(): void
    layout(): void
    destroy(): void
  }
}
