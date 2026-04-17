declare namespace StageNodeFlowModuleScssNamespace {
  export interface IStageNodeFlowModuleScss {
    root: string;
    stageNodeCompact: string;
    title: string;
    ul: string;
  }
}

declare const StageNodeFlowModuleScssModule: StageNodeFlowModuleScssNamespace.IStageNodeFlowModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StageNodeFlowModuleScssNamespace.IStageNodeFlowModuleScss;
};

export = StageNodeFlowModuleScssModule;
