import type { CSSProperties } from "react";

import type { Node, HandleType } from "@xyflow/react";
import { Position } from "@xyflow/react";

import type { IIconRendererTypes } from "../../components/ui/iconRenderer/IconRenderer";

export type WorkflowApiAgentSelection = "auction" | "direct";
export type WorkflowApiNodeType =
  | "start"
  | "phase"
  | "approval_gate"
  | "execution"
  | "deploy"
  | "end";

export interface WorkflowApiBaseNode {
  id: string;
  type: WorkflowApiNodeType;
}

export interface WorkflowApiTerminalNode extends WorkflowApiBaseNode {
  type: "start" | "end";
  label?: string;
}

export interface WorkflowApiApprovalGateNode extends WorkflowApiBaseNode {
  type: "approval_gate";
  label: string;
}

export interface WorkflowApiTaskNode extends WorkflowApiBaseNode {
  type: "phase" | "execution" | "deploy";
  task_type?: string;
  description?: string;
  agent_selection?: WorkflowApiAgentSelection;
  agent_type?: string;
  phase_label?: string;
  label?: string;
}

export type WorkflowApiNode =
  | WorkflowApiTaskNode
  | WorkflowApiTerminalNode
  | WorkflowApiApprovalGateNode;

export interface WorkflowApiEdge {
  from: string;
  to: string;
  condition?: string;
}

export interface WorkflowApiWorkflow {
  id: string;
  name: string;
  description?: string;
  nodes: WorkflowApiNode[];
  edges: WorkflowApiEdge[];
  is_default?: boolean;
}

export type StageNodeVariant = "default" | "compact";

export interface IFlowHandleData {
  id: string;
  type: HandleType;
  position: Position;
  top?: CSSProperties["top"];
  right?: CSSProperties["right"];
  bottom?: CSSProperties["bottom"];
  left?: CSSProperties["left"];
}

interface IWorkflowVisualData extends Record<string, unknown> {
  label: string;
  handles: IFlowHandleData[];
  apiNodeId?: string;
  apiNodeType?: WorkflowApiNodeType;
  apiWorkflowId?: string;
}

export interface ISubNodeData extends IWorkflowVisualData {
  icon: IIconRendererTypes;
  taskType?: string;
  description?: string;
}
export type ISubNode = Node<ISubNodeData, "subNode"> & {
  readonly parentId: string;
  readonly extent: "parent";
};

export interface INodeData extends IWorkflowVisualData {
  title?: string;
  icon?: IIconRendererTypes;
}

export interface ICompactNodeData extends IWorkflowVisualData {
  icon: IIconRendererTypes;
  taskType?: string;
  description?: string;
  condition?: string;
}

// простой тип данных для финальной синей кнопки “ЭКСПЛУАТАЦИЯ”
export interface IExploitationData extends IWorkflowVisualData {}

export type NodeType = Node<INodeData, "node">;
export type NodeCompactType = Node<ICompactNodeData, "nodeCompact">;
export type ExploitationButtonFlowNode = Node<
  IExploitationData,
  "exploitationButton"
>;
export type IWorkflowNode =
  | NodeType
  | ExploitationButtonFlowNode
  | ISubNode
  | NodeCompactType;
