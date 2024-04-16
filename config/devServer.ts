import type { IBuildOptions } from "./types/configTypes";

import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

const buildDevServer = (options: IBuildOptions): DevServerConfiguration => ({
  port: options.port,
  open: true,
  hot: false,
  compress: true,
  historyApiFallback: true,
});

export default buildDevServer;
