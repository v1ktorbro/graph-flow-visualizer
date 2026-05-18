declare namespace EditNodeFlowModuleScssNamespace {
  export interface IEditNodeFlowModuleScss {
    close: string;
    field: string;
    header: string;
    root: string;
    subTitle: string;
    title: string;
  }
}

declare const EditNodeFlowModuleScssModule: EditNodeFlowModuleScssNamespace.IEditNodeFlowModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: EditNodeFlowModuleScssNamespace.IEditNodeFlowModuleScss;
};

export = EditNodeFlowModuleScssModule;
