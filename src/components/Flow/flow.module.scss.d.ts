declare namespace FlowModuleScssNamespace {
  export interface IFlowModuleScss {
    flowCanvas: string;
    flowRoot: string;
  }
}

declare const FlowModuleScssModule: FlowModuleScssNamespace.IFlowModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: FlowModuleScssNamespace.IFlowModuleScss;
};

export = FlowModuleScssModule;
