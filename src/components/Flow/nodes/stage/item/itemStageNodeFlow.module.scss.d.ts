declare namespace ItemStageNodeFlowModuleScssNamespace {
  export interface IItemStageNodeFlowModuleScss {
    icon: string;
    icons: string;
    info: string;
    meta: string;
    root: string;
    taskCard: string;
    taskCardToneInfo: string;
    taskCardToneNeutral: string;
    taskCardToneSuccess: string;
    taskCardToneWarning: string;
    taskConnector: string;
    title: string;
  }
}

declare const ItemStageNodeFlowModuleScssModule: ItemStageNodeFlowModuleScssNamespace.IItemStageNodeFlowModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ItemStageNodeFlowModuleScssNamespace.IItemStageNodeFlowModuleScss;
};

export = ItemStageNodeFlowModuleScssModule;
