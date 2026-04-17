import { Position } from "@xyflow/react";

import type { CSSProperties } from "react";

import type { IFlowHandleData } from "../../types/flowTypes";

type HandleOffsets = Partial<
  Record<
    | "topSource"
    | "topTarget"
    | "rightSource"
    | "rightTarget"
    | "bottomSource"
    | "bottomTarget"
    | "leftSource"
    | "leftTarget",
    CSSProperties["top"] | CSSProperties["left"]
  >
>;

export const flowHandleCreate = (offsets: HandleOffsets): IFlowHandleData[] => {
  const handles: IFlowHandleData[] = [];

  const addHorizontalHandle = (
    id: string,
    type: "source" | "target",
    position: Position,
    offset?: CSSProperties["left"],
  ) => {
    handles.push({ id, type, position, left: offset });
  };

  const addVerticalHandle = (
    id: string,
    type: "source" | "target",
    position: Position,
    offset?: CSSProperties["top"],
  ) => {
    handles.push({ id, type, position, top: offset });
  };

  addHorizontalHandle("top-source", "source", Position.Top, offsets.topSource);
  addHorizontalHandle("top-target", "target", Position.Top, offsets.topTarget);
  addHorizontalHandle(
    "bottom-source",
    "source",
    Position.Bottom,
    offsets.bottomSource,
  );
  addHorizontalHandle(
    "bottom-target",
    "target",
    Position.Bottom,
    offsets.bottomTarget,
  );
  addVerticalHandle("left-source", "source", Position.Left, offsets.leftSource);
  addVerticalHandle("left-target", "target", Position.Left, offsets.leftTarget);
  addVerticalHandle(
    "right-source",
    "source",
    Position.Right,
    offsets.rightSource,
  );
  addVerticalHandle(
    "right-target",
    "target",
    Position.Right,
    offsets.rightTarget,
  );

  return handles;
};
