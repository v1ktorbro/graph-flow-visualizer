import type { ResolveOptions } from "webpack";

const buildResolvers = (): ResolveOptions => ({
  extensions: [
    ".js",
    ".jsx",
    ".ts",
    ".tsx",
    ".css",
    ".scss",
    ".jpg",
    ".jpeg",
    ".png",
  ],
  modules: ["node_modules"],
  mainFiles: ["index"],
});

export default buildResolvers;
