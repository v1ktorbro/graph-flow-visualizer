import scss from "./flow.module.scss";

import { memo, useCallback, useState } from "react";

import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  applyNodeChanges,
} from "@xyflow/react";

import type { Edge, NodeChange } from "@xyflow/react";
import type { IWorkflowNode } from "../../assets/types/flowTypes";

import CustomEdge from "./edge/CustomEdgeFlow";
import ExploitationButtonNodeFlow from "./nodes/exploitationButton/ExploitationButtonNodeFlow";
import StageNodeFlow from "./nodes/stage/StageNodeFlow";

import { createWorkflowNodes } from "../../assets/data/nodesData";

import { edgesData } from "../../assets/data/edgesData";

const nodeTypes = {
  stage: StageNodeFlow,
  exploitationButton: ExploitationButtonNodeFlow,
};

const edgeTypes = {
  custom: CustomEdge,
};

const defaultEdgeOptions = {
  type: "custom",
};

const Flow = () => {
  const [nodes, setNodes] = useState<IWorkflowNode[]>(() =>
    createWorkflowNodes(handleTaskStatusToggle),
  );

  function handleTaskStatusToggle(nodeId: string, taskId: string) {
    setNodes((currentNodes) =>
      currentNodes.map((node) => {
        if (node.type !== "stage" || node.id !== nodeId) {
          return node;
        }

        return {
          ...node,
          data: {
            ...node.data,
            tasks: node.data.tasks.map((task) =>
              task.id === taskId
                ? {
                    ...task,
                    // status: getNextTaskStatus(task.status),
                  }
                : task,
            ),
          },
        };
      }),
    );
  }

  const onNodesChange = useCallback(
    (changes: NodeChange<IWorkflowNode>[]) =>
      setNodes((currentNodes) => applyNodeChanges(changes, currentNodes)),
    [],
  );

  return (
    <div className={scss.flowRoot}>
      <ReactFlow<IWorkflowNode, Edge>
        className={scss.flowCanvas}
        nodes={nodes}
        edges={edgesData}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        onNodesChange={onNodesChange}
        fitView
        fitViewOptions={{ padding: 0.12 }}
        // minZoom={0.45}
        // maxZoom={1.4}
        nodesConnectable={false}
        nodesDraggable
        elementsSelectable
        proOptions={{ hideAttribution: true }}
      >
        <Background
          color="rgba(47, 128, 237, 0.12)"
          gap={28}
          size={1.4}
          variant={BackgroundVariant.Dots}
        />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
};

export default memo(Flow);
