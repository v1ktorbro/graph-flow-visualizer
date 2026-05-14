declare namespace NodeFlowModuleScssNamespace {
  export interface INodeFlowModuleScss {
    label: string;
    root: string;
    ul: string;
  }
}

declare const NodeFlowModuleScssModule: NodeFlowModuleScssNamespace.INodeFlowModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: NodeFlowModuleScssNamespace.INodeFlowModuleScss;
};

export = NodeFlowModuleScssModule;
