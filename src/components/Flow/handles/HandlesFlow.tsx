import scss from "./handlesFlow.module.scss";

import { Handle } from "@xyflow/react";
import { memo } from "react";

import type { CSSProperties, FC } from "react";
import type { IFlowHandleData } from "../../../assets/types/flowTypes";

const HandlesFlow: FC<{ handles: IFlowHandleData[] }> = ({ handles }) => (
  <>
    {handles?.map((handle) => {
      const handleStyle: CSSProperties = {
        top: handle.top,
        right: handle.right,
        bottom: handle.bottom,
        left: handle.left,
      };

      return (
        <Handle
          key={handle.id}
          id={handle.id}
          className={scss.root}
          type={handle.type}
          position={handle.position}
          style={handleStyle}
          isConnectable={false}
        />
      );
    })}
  </>
);

export default memo(HandlesFlow);
