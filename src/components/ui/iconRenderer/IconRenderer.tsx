import { ComponentType, FC, Suspense, lazy, memo } from "react";

export type IIconRendererTypes =
  | "pieChartBroken"
  | "monitorSmartphoneBroken"
  | "diagramUpBroken"
  | "clipboardTextBroken"
  | "boxBroken"
  | "codeSquareOutline"
  | "filtersBroken"
  | "chatRoundCallBoldDuotone"
  | "infoCircleBroken";

const PieChartBrokenIcon = lazy(() => import("../icons/PieChartBrokenIcon"));
const MonitorSmartphoneBrokenIcon = lazy(
  () => import("../icons/MonitorSmartphoneBrokenIcon"),
);
const DiagramUpBrokenIcon = lazy(() => import("../icons/DiagramUpBrokenIcon"));
const ClipboardTextBrokenIcon = lazy(
  () => import("../icons/ClipboardTextBrokenIcon"),
);
const BoxBrokenIcon = lazy(() => import("../icons/BoxBrokenIcon"));
const CodeSquareOutlineIcon = lazy(
  () => import("../icons/CodeSquareOutlineIcon"),
);
const FiltersBrokenIcon = lazy(() => import("../icons/FiltersBrokenIcon"));
const ChatRoundCallBoldDuotoneIcon = lazy(
  () => import("../icons/ChatRoundCallBoldDuotoneIcon"),
);
const InfoCircleBrokenIcon = lazy(
  () => import("../icons/InfoCircleBrokenIcon"),
);

const ICONS_ENUM: Record<
  IIconRendererTypes,
  ComponentType<{ className?: string }>
> = {
  pieChartBroken: PieChartBrokenIcon,
  monitorSmartphoneBroken: MonitorSmartphoneBrokenIcon,
  diagramUpBroken: DiagramUpBrokenIcon,
  clipboardTextBroken: ClipboardTextBrokenIcon,
  boxBroken: BoxBrokenIcon,
  codeSquareOutline: CodeSquareOutlineIcon,
  filtersBroken: FiltersBrokenIcon,
  chatRoundCallBoldDuotone: ChatRoundCallBoldDuotoneIcon,
  infoCircleBroken: InfoCircleBrokenIcon,
} as const;

const IconRenderer: FC<{ name: IIconRendererTypes; className?: string }> = ({
  name,
  className,
}) => {
  const Icon = ICONS_ENUM[name];

  return (
    <Suspense fallback={<span className={className} aria-hidden="true" />}>
      <Icon className={className} />
    </Suspense>
  );
};

export default memo(IconRenderer);
