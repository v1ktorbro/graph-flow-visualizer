import buildCssLoader from "./loaders/cssLoader";

import type { RuleSetRule } from "webpack";
import type { IBuildOptions } from "./types/configTypes";

const buildLoaders = ({ isDev }: IBuildOptions): RuleSetRule[] => {
  const svgLoader = {
    test: /\.svg$/,
    use: ["@svgr/webpack"],
  };

  const typescriptLoader = {
    test: /\.(ts|js)x?$/,
    exclude: /node_modules/,
    use: [{ loader: "babel-loader" }],
  };

  const imagesLoader = {
    test: /\.(ico|jpg|jpeg|png|gif)(\?.*)?$/,
    type: "asset/resource",
  };

  const fontsLoader = {
    test: /\.(eot|otf|webp|ttf|woff|woff2)(\?.*)?$/,
    type: "asset/resource",
    generator: {
      filename: "fonts/[hash][ext][query]",
    },
  };

  return [
    typescriptLoader,
    buildCssLoader(isDev),
    svgLoader,
    imagesLoader,
    fontsLoader,
  ];
};

export default buildLoaders;
