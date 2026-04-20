import type { CSSProperties } from "react";

import type { Node, HandleType } from "@xyflow/react";
import { Position } from "@xyflow/react";

import type { IIconRendererTypes } from "../../components/ui/iconRenderer/IconRenderer";

export const TASK_STATUS_ORDER = ["todo", "active", "review", "done"] as const;

export type SubNodeStatus = (typeof TASK_STATUS_ORDER)[number];
export type SubNodeBgTone = "neutral" | "success" | "warning" | "info";
export type StageNodeVariant = "default" | "compact";

export interface ISubNodeExecutor {
  id: string;
  name: string;
  initials: string;
  gradientFrom: string;
  gradientTo: string;
}

interface ISubNodeData extends Record<string, unknown> {
  label: string;
  icon: IIconRendererTypes;
  executorId: string;
  status: SubNodeStatus;
  handles: IFlowHandleData[];
  bgTone: SubNodeBgTone; //TODO: сделать в зависимости от status
}
export type ISubNode = Node<ISubNodeData, "subNode"> & {
  readonly extent: "parent";
};

export interface IFlowHandleData {
  id: string;
  type: HandleType;
  position: Position;
  top?: CSSProperties["top"];
  right?: CSSProperties["right"];
  bottom?: CSSProperties["bottom"];
  left?: CSSProperties["left"];
}

interface INodeData extends Record<string, unknown> {
  label?: string;
  title?: string;
  executors: Record<string, ISubNodeExecutor>;
  handles: IFlowHandleData[];
  bgTone?: SubNodeBgTone;
  icon?: IIconRendererTypes;
}

// простой тип данных для финальной синей кнопки “ЭКСПЛУАТАЦИЯ”
export interface IExploitationData extends Record<string, unknown> {
  label: string;
  handles: IFlowHandleData[];
}

export type NodeType = Node<INodeData, "node">;
export type NodeCompactType = Node<INodeData, "nodeCompact">;
export type ExploitationButtonFlowNode = Node<
  IExploitationData,
  "exploitationButton"
>;
export type IWorkflowNode =
  | NodeType
  | ExploitationButtonFlowNode
  | ISubNode
  | NodeCompactType;
