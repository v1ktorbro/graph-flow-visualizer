/* eslint-disable @typescript-eslint/no-unused-vars */
import scss from "./flow.module.scss";

import { memo, useCallback, useEffect } from "react";

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

import CompactNodeFlow from "./nodes/compact/CompactNodeFlow";
import ExploitationButtonNodeFlow from "./nodes/exploitationButton/ExploitationButtonNodeFlow";
import NodeFlow from "./nodes/node/NodeFlow";
import SubNodeFlow from "./nodes/subNode/SubNodeFlow";

import { WORKFLOW_API_DATA } from "../../assets/data/fromStand/workflowApiData";
import { transformWorkflowDataFromApiToReactFlow } from "../../assets/utils/transformWorkflowDataFromApiToReactFlow/transformWorkflowDataFromApiToReactFlow";
import { elkAutoLayout } from "../../assets/utils/elkAutoLayout/elkAutoLayout";

const nodeTypes = {
  node: NodeFlow,
  subNode: SubNodeFlow,
  nodeCompact: CompactNodeFlow,
  exploitationButton: ExploitationButtonNodeFlow,
};

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<IWorkflowNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const onConnect = useCallback(
    (connection: Connection) => {
      if (connection.source === connection.target) return; //запретить соединять точки между собой в пределах одной ноды
      setEdges((eds) => addEdge(connection, eds));
    },
    [setEdges],
  );

  useEffect(() => {
    // Защита от устаревшего async-результата
    // Пользователь открыл граф A.
    // Начался fetch(A) + layout(A).
    // Пользователь быстро переключился на граф B.
    // B уже отрисовался.
    // Старый layout(A) внезапно завершился позже и сделал setNodes(A) поверх актуального B.
    let isActual = true;

    const getFlow = async () => {
      try {
        const workflow = WORKFLOW_API_DATA[0];

        if (!workflow) return;

        const { edges, nodes } =
          transformWorkflowDataFromApiToReactFlow(workflow);
        const elkLayoutNodes = await elkAutoLayout(nodes, edges);

        if (!isActual) return;

        setNodes(elkLayoutNodes);
        setEdges(edges);
      } catch (error) {
        if (!isActual) return;

        // eslint-disable-next-line no-console
        console.log("В функции getFlow произошла ошибка:", error);
      }
    };

    getFlow();

    return () => {
      isActual = false;
    };
  }, [setEdges, setNodes]);

  return (
    <div className={scss.root}>
      <ReactFlow
        nodes={nodes}
        defaultMarkerColor={null}
        className={scss.flow}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        onConnect={onConnect}
        // nodesConnectable={false}
        nodesDraggable
        // elementsSelectable
        // proOptions={{ hideAttribution: true }}
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
