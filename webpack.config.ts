import path from "path";

import type { IBuildEnv } from "./config/types/configTypes";
import type { Configuration } from "webpack";

import buildWebpackConfig from "./config/webpackConfig";

const resolvePath = (...args: string[]) => path.resolve(__dirname, ...args);

export default ({
  mode = "development",
  port = 3000,
  isBundleAnalyzer = false,
}: IBuildEnv): Configuration =>
  buildWebpackConfig({
    mode,
    port,
    isDev: mode === "development",
    isBundleAnalyzer,
    paths: {
      entry: resolvePath("src", "index.tsx"),
      build: resolvePath("build"),
      html: resolvePath("public", "index.html"),
      favicon: resolvePath("public", "favicon.ico"),
      src: resolvePath("src"),
      // env: resolvePath(`.env.${mode}`),
    },
  });
