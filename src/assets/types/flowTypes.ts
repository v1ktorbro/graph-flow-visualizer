import type { CSSProperties } from "react";

import type { Node } from "@xyflow/react";
import { Position } from "@xyflow/react";

import type { IIconRendererTypes } from "../../components/ui/iconRenderer/IconRenderer";

export const TASK_STATUS_ORDER = ["todo", "active", "review", "done"] as const;

export type TaskStatus = (typeof TASK_STATUS_ORDER)[number];
export type TaskBgTone = "neutral" | "success" | "warning" | "info";
export type StageNodeVariant = "default" | "compact";

// исполнитель задачи
// FlowAssignee
export interface IStaffTask {
  id: string;
  name: string;
  initials: string;
  gradientFrom: string;
  gradientTo: string;
}

// задача внутри ноды
// FlowTask
export interface ITaskNode {
  id: string;
  title: string;
  icon: IIconRendererTypes;
  executorId: string;
  status: TaskStatus;
  bgTone: TaskBgTone; //TODO: сделать в зависимости от status
}

// FlowHandleData
export interface IFlowHandleData {
  id: string;
  type: "source" | "target";
  position: Position;
  top?: CSSProperties["top"];
  right?: CSSProperties["right"];
  bottom?: CSSProperties["bottom"];
  left?: CSSProperties["left"];
}

// StageNodeData
export interface INodeData extends Record<string, unknown> {
  title?: string;
  tasks: ITaskNode[];
  executors: Record<string, IStaffTask>;
  handles: IFlowHandleData[];
  variant?: StageNodeVariant;
}

// простой тип данных для финальной синей кнопки “ЭКСПЛУАТАЦИЯ”
export interface IExploitationData extends Record<string, unknown> {
  label: string;
  handles: IFlowHandleData[];
}

export type StageFlowNode = Node<INodeData, "stage">;
export type ExploitationButtonFlowNode = Node<
  IExploitationData,
  "exploitationButton"
>;
export type IWorkflowNode = StageFlowNode | ExploitationButtonFlowNode;
