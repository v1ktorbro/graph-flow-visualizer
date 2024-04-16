import type { Configuration } from "webpack";
import type { IBuildOptions } from "./types/configTypes";

import buildDevServer from "./devServer";
import buildOptimization from "./optimization";
import buildPlugins from "./plugins";
import buildLoaders from "./loaders";
import buildResolvers from "./resolvers";

const buildWebpackConfig = (options: IBuildOptions): Configuration => ({
  mode: options.mode,
  entry: options.paths.entry,
  output: {
    path: options.paths.build,
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].chunk.js",
    publicPath: options.isDev ? "/" : "auto",
    clean: options.isDev,
  },
  resolve: buildResolvers(),
  module: { rules: buildLoaders(options) },
  plugins: buildPlugins(options),
  devtool: options.isDev ? "cheap-module-source-map" : "source-map",
  devServer: options.isDev ? buildDevServer(options) : undefined,
  optimization: options.isDev ? {} : buildOptimization(),
});

export default buildWebpackConfig;
