import scss from "./contextMenu.module.scss";

import { useReactFlow } from "@xyflow/react";
import { memo, useCallback } from "react";

import type { Edge } from "@xyflow/react";
import type { CSSProperties, HTMLAttributes, MouseEvent } from "react";
import type { IWorkflowNode } from "../../../assets/types/flowTypes";

import cl from "../../../assets/utils/classNames/classNames";

export interface ContextMenuPosition {
  id: string;
  top?: CSSProperties["top"] | false;
  left?: CSSProperties["left"] | false;
  right?: CSSProperties["right"] | false;
  bottom?: CSSProperties["bottom"] | false;
}

type ContextMenuProps = ContextMenuPosition &
  Omit<HTMLAttributes<HTMLDivElement>, "id"> & {
    onEdit: (id: string) => void;
  };

const ContextMenu = ({
  id,
  top,
  left,
  right,
  bottom,
  onEdit,
  ...props
}: ContextMenuProps) => {
  const {
    // getNode,
    setNodes,
    // addNodes,
    setEdges,
  } = useReactFlow<IWorkflowNode, Edge>();

  // const duplicateNode = useCallback(() => {
  //   const node = getNode(id)!;

  //   const position = {
  //     x: node.position.x + 50,
  //     y: node.position.y + 50,
  //   };

  //   addNodes({
  //     ...node,
  //     selected: false,
  //     dragging: false,
  //     id: `${node.id}-copy`,
  //     position,
  //   });
  // }, [id, getNode, addNodes]);

  const handleDeleteNode = useCallback(() => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id));
  }, [id, setNodes, setEdges]);

  const handleEditNode = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onEdit(id);
  }, [id, onEdit]);

  return (
    <div
      style={{ top, left, right, bottom } as CSSProperties}
      className={scss.root}
      {...props}
    >
      <p className={scss.title}>Node id: {id}</p>
      <button onClick={handleEditNode} className={scss.btn}>
        Редактировать
      </button>
      {/* <button onClick={duplicateNode} className={scss.btn}>
        Копировать
      </button> */}
      <button onClick={handleDeleteNode} className={cl(scss.btn, scss.remove)}>
        Удалить
      </button>
    </div>
  );
};

export default memo(ContextMenu);
