declare namespace CounterModuleScssNamespace {
  export interface ICounterModuleScss {
    root: string;
    wrap: string;
  }
}

declare const CounterModuleScssModule: CounterModuleScssNamespace.ICounterModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: CounterModuleScssNamespace.ICounterModuleScss;
};

export = CounterModuleScssModule;
