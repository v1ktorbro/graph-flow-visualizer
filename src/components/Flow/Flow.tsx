/* eslint-disable @typescript-eslint/no-unused-vars */
import scss from "./flow.module.scss";

import {
  memo,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  addEdge,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";

import type {
  Connection,
  Edge,
  NodeMouseHandler,
  OnSelectionChangeParams,
} from "@xyflow/react";
import type { IWorkflowNode } from "../../assets/types/flowTypes";

import ContextMenu, {
  type ContextMenuPosition,
} from "./contextMenu/ContextMenu";
import EditNodeFlow from "./editNode/EditNodeFlow";
import CompactNodeFlow from "./nodes/compact/CompactNodeFlow";
import ExploitationButtonNodeFlow from "./nodes/exploitationButton/ExploitationButtonNodeFlow";
import NodeFlow from "./nodes/node/NodeFlow";
import SubNodeFlow from "./nodes/subNode/SubNodeFlow";

import { elkAutoLayout } from "../../assets/utils/elkAutoLayout/elkAutoLayout";
import { transformWorkflowDataFromApiToReactFlow } from "../../assets/utils/transformWorkflowDataFromApiToReactFlow/transformWorkflowDataFromApiToReactFlow";

import { WORKFLOW_API_DATA } from "../../assets/data/fromStand/workflowApiData";

const nodeTypes = {
  node: NodeFlow,
  subNode: SubNodeFlow,
  nodeCompact: CompactNodeFlow,
  exploitationButton: ExploitationButtonNodeFlow,
};

const Flow = () => {
  const ref = useRef<HTMLDivElement>(null);

  const [nodes, setNodes, onNodesChange] = useNodesState<IWorkflowNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const [selectedNode, setSelectedNode] = useState<IWorkflowNode | null>(null);
  const [isOpenEditMode, setIsOpenEditMode] = useState(false);
  const [contextMenu, setContextMenu] = useState<ContextMenuPosition | null>(
    null,
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      if (connection.source === connection.target) return; //запретить соединять точки между собой в пределах одной ноды
      setEdges((eds) => addEdge(connection, eds));
    },
    [setEdges],
  );

  const handleSelectNode = useCallback(
    ({ nodes }: OnSelectionChangeParams<IWorkflowNode, Edge>) => {
      setSelectedNode(null);
      const node = nodes?.[0];
      if (node?.type === "node") return; // контейнеры скипаем
      setSelectedNode({ ...node, selected: true });
    },
    [],
  );

  const onPaneClick = useCallback(() => {
    setContextMenu(null);
    setIsOpenEditMode(false);
  }, [setContextMenu]);

  const handleEditNode = useCallback(
    (id: string) => {
      const node = nodes.find((node) => node.id === id);

      if (!node || node.type === "node") return;

      setSelectedNode({ ...node, selected: true });
      setNodes((nodes) =>
        nodes.map((node) => ({
          ...node,
          selected: node.id === id,
        })),
      );
      setIsOpenEditMode(true);
      setContextMenu(null);
    },
    [nodes, setNodes],
  );

  const handleCloseEditNode = useCallback(() => {
    setSelectedNode(null);
    setIsOpenEditMode(false);
  }, []);

  const onNodeContextMenu = useCallback<NodeMouseHandler<IWorkflowNode>>(
    (event, node) => {
      if (node?.type === "node") return; // контейнеры скипаем

      // Prevent native context menu from showing
      event.preventDefault();

      // setSelectedNode(node);

      // Calculate position of the context menu. We want to make sure it
      // doesn't get positioned off-screen.
      const pane = ref.current!.getBoundingClientRect();
      setContextMenu({
        id: node.id,
        top: event.clientY < pane.height - 200 && event.clientY,
        left: event.clientX < pane.width - 200 && event.clientX,
        right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
        bottom:
          event.clientY >= pane.height - 200 && pane.height - event.clientY,
      });
    },
    [],
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

  const handleNodeLabelChange = useCallback(
    (label: string) => {
      if (!selectedNode) return;

      // setNodes((nodes) =>
      //   nodes.map((node) =>
      //     node.id === selectedNode.id
      //       ? {
      //           ...node,
      //           data: {
      //             ...node.data,
      //             label,
      //           },
      //         }
      //       : node,
      //   ),
      // );

      // setSelectedNode((node) =>
      //   node
      //     ? {
      //         ...node,
      //         data: {
      //           ...node.data,
      //           label,
      //         },
      //       }
      //     : null,
      // );
    },
    [selectedNode],
  );
  return (
    <div className={scss.root}>
      <ReactFlow<IWorkflowNode, Edge>
        ref={ref}
        nodes={nodes}
        defaultMarkerColor={null}
        className={scss.flow}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        onSelectionChange={handleSelectNode}
        onPaneClick={onPaneClick}
        onNodeContextMenu={onNodeContextMenu}
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

        <Suspense>
          {contextMenu && (
            <ContextMenu
              onClick={onPaneClick}
              onEdit={handleEditNode}
              {...contextMenu}
            />
          )}
        </Suspense>

        <Suspense>
          {selectedNode && isOpenEditMode && (
            <EditNodeFlow
              node={selectedNode}
              onLabelChange={handleNodeLabelChange}
              onClose={handleCloseEditNode}
            />
          )}
        </Suspense>
      </ReactFlow>
    </div>
  );
};

export default memo(Flow);
