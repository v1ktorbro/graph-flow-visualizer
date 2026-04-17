declare namespace HandlesFlowModuleScssNamespace {
  export interface IHandlesFlowModuleScss {
    root: string;
  }
}

declare const HandlesFlowModuleScssModule: HandlesFlowModuleScssNamespace.IHandlesFlowModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: HandlesFlowModuleScssNamespace.IHandlesFlowModuleScss;
};

export = HandlesFlowModuleScssModule;
