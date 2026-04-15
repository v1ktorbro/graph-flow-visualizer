declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";

declare module "*.svg" {
  import { FC, SVGProps } from "react";
  const SVG: FC<SVGProps<SVGSVGElement>>;
  export default SVG;
}

declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}

declare module "*.css";

declare const __IS_DEV__: boolean;
