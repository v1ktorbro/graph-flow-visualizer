import scss from "./flow.module.scss";

import { memo, useCallback, useState } from "react";

import {
  Background,
  Controls,
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  MiniMap,
  Handle,
  Position,
} from "@xyflow/react";

import type {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
} from "@xyflow/react";
import IconRenderer from "../ui/iconRenderer/IconRenderer";
import CustomEdge from "./edge/CustomEdgeFrom";

const handleStyle = { left: 10 };
function TextUpdaterNode() {
  return (
    <div className={scss.textUpdater}>
      <div>Custom Node</div>
      <Handle type="target" position={Position.Top} />
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={handleStyle}
        className={scss.testHandle}
      >
        <IconRenderer name="chatRoundCallBoldDuotone" />
      </Handle>
      <Handle type="source" position={Position.Bottom} id="b" />
    </div>
  );
}

const nodeTypes = {
  textUpdater: TextUpdaterNode,
};

const initialNodes: Node[] = [
  {
    id: "node-1",
    type: "textUpdater",
    position: { x: 0, y: 0 },
    data: { value: "123" },
  },
  {
    id: "node-2",
    type: "output",
    targetPosition: Position.Top,
    position: { x: 0, y: 200 },
    data: { label: "node 2" },
  },
  {
    id: "node-3",
    type: "output",
    targetPosition: Position.Top,
    position: { x: 200, y: 200 },
    data: { label: "node 3" },
  },
];

const edgeTypes = {
  "custom-edge": CustomEdge,
};

const initialEdges: Edge[] = [
  {
    id: "edge-1",
    source: "node-1",
    target: "node-2",
    sourceHandle: "a",
    type: "custom-edge",
    animated: true,
  },
  {
    id: "edge-2",
    source: "node-1",
    target: "node-3",
    sourceHandle: "b",
    animated: true,
  },
];

const rfStyle = {
  backgroundColor: "#B8CEFF",
};

const defaultEdgeOptions = {
  markerEnd: "edge-arrow",
  style: {
    stroke: "#2F80ED",
    strokeWidth: 2,
  },
};

const Flow = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(
    initialEdges.map((edge) => ({
      ...edge,
      markerEnd: edge.markerEnd ?? "edge-arrow",
    })),
  );

  const onNodesChange = useCallback(
    (changes: NodeChange<Node>[]) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange<Edge>[]) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback((params: Connection) => {
    setEdges((eds) => addEdge({ ...params, markerEnd: "edge-arrow" }, eds));
  }, []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      defaultEdgeOptions={defaultEdgeOptions}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      style={rfStyle}
    >
      <svg width="0" height="0">
        <defs>
          <marker
            id="edge-arrow"
            viewBox="0 0 14 14"
            refX="8"
            refY="7"
            markerWidth="14"
            markerHeight="14"
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <path
              d="M 1.343 1.343 L 7 7 L 1.343 12.657"
              fill="none"
              stroke="#2F80ED"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </marker>
        </defs>
      </svg>

      <Background />
      <Controls />
      <MiniMap nodeStrokeWidth={3} nodeColor={"blue"} />
    </ReactFlow>
  );
};

export default memo(Flow);
