import type { WebpackPluginInstance } from "webpack";
import type { IBuildOptions } from "./types/configTypes";

import { CleanWebpackPlugin } from "clean-webpack-plugin";
import Dotenv from "dotenv-webpack";
import ESLintPlugin from "eslint-webpack-plugin";
import HTMLWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { DefinePlugin, ProgressPlugin } from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

const buildPlugins = ({
  paths,
  isDev,
  isBundleAnalyzer,
}: IBuildOptions): WebpackPluginInstance[] => {
  const plugins: WebpackPluginInstance[] = [
    new CleanWebpackPlugin(),
    new ProgressPlugin(),
    new Dotenv({ path: paths.env }),
    new HTMLWebpackPlugin({
      template: paths.html,
      favicon: paths.favicon,
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
      chunkFilename: "css/[name].[contenthash:8].css",
    }),
    new DefinePlugin({
      __IS_DEV__: isDev,
    }),
  ];

  if (isDev) {
    plugins.push(
      new ESLintPlugin({
        extensions: ["js", "jsx", "ts", "tsx"],
        failOnWarning: false,
      })
    );
  }

  if (isBundleAnalyzer) {
    plugins.push(new BundleAnalyzerPlugin());
  }
  return plugins;
};

export default buildPlugins;
