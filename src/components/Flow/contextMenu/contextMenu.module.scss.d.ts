declare namespace ContextMenuModuleScssNamespace {
  export interface IContextMenuModuleScss {
    btn: string;
    remove: string;
    root: string;
    title: string;
  }
}

declare const ContextMenuModuleScssModule: ContextMenuModuleScssNamespace.IContextMenuModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ContextMenuModuleScssNamespace.IContextMenuModuleScss;
};

export = ContextMenuModuleScssModule;
