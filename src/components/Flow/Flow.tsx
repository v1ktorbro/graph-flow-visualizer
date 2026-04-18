import scss from "./flow.module.scss";

import { memo, useCallback } from "react";

import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  addEdge,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";

import type { Connection, Edge } from "@xyflow/react";
import type { IWorkflowNode } from "../../assets/types/flowTypes";

import CustomEdgeFlow from "./edge/CustomEdgeFlow";
import ExploitationButtonNodeFlow from "./nodes/exploitationButton/ExploitationButtonNodeFlow";
import StageNodeFlow from "./nodes/stage/StageNodeFlow";

import { createWorkflowNodes } from "../../assets/data/nodesData";

import { edgesData } from "../../assets/data/edgesData";

const nodeTypes = {
  stage: StageNodeFlow,
  exploitationButton: ExploitationButtonNodeFlow,
};

const edgeTypes = {
  custom: CustomEdgeFlow,
};

const defaultEdgeOptions = {
  type: "custom",
};

const Flow = () => {
  const [nodes, , onNodesChange] = useNodesState(createWorkflowNodes());
  const [edges, setEdges, onEdgesChange] = useEdgesState(edgesData);

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge(connection, eds));
    },
    [setEdges],
  );

  return (
    <div className={scss.flowRoot}>
      <ReactFlow<IWorkflowNode, Edge>
        className={scss.flowCanvas}
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        onEdgesChange={onEdgesChange}
        fitView
        fitViewOptions={{ padding: 0.12 }}
        // minZoom={0.45}
        // maxZoom={1.4}
        onConnect={onConnect}
        nodesConnectable={false}
        nodesDraggable
        elementsSelectable
        proOptions={{ hideAttribution: true }}
        deleteKeyCode={["Delete"]}
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
