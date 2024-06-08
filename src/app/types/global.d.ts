// declare module '*.scss' {
//   type IClassNames = Record<string, string>
//   const classNames: IClassNames
//   export = classNames
// }

declare module '*.scss' {
  const content: Record<string, string>
  export default content
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';

// declare module '*.svg' {
//   import type React from 'react'
//   const SVG: React.VFC<React.SVGProps<SVGSVGElement>>
//   export default SVG
// }

declare module '*.svg' {
  import React = require('react')
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
  const src: string
  export default src
}

// declare const __IS_DEV__: boolean
// declare const showCalcSection: any
// declare const showAllExtSettings: any
// declare const isOptimization: any
// declare const NODE_OPTIONS: any
declare module "*.svg?react" {
  import * as React from "react";

  const ReactComponent: React.FunctionComponent<
    React.ComponentProps<"svg"> & { title?: string }
  >;

  export default ReactComponent;
}
