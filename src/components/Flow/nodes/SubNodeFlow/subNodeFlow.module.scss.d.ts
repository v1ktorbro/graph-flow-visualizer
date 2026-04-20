declare namespace SubNodeFlowModuleScssNamespace {
  export interface ISubNodeFlowModuleScss {
    icon: string;
    icons: string;
    info: string;
    label: string;
    meta: string;
    root: string;
    subNode: string;
    taskCardToneInfo: string;
    taskCardToneNeutral: string;
    taskCardToneSuccess: string;
    taskCardToneWarning: string;
    taskConnector: string;
  }
}

declare const SubNodeFlowModuleScssModule: SubNodeFlowModuleScssNamespace.ISubNodeFlowModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: SubNodeFlowModuleScssNamespace.ISubNodeFlowModuleScss;
};

export = SubNodeFlowModuleScssModule;
