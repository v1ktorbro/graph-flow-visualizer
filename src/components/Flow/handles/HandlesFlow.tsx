import scss from "./handlesFlow.module.scss";

import { Handle } from "@xyflow/react";
import { memo } from "react";

import type { CSSProperties, FC } from "react";
import type { IFlowHandleData } from "../../../assets/types/flowTypes";

import cl from "../../../assets/utils/classNames/classNames";

const HandlesFlow: FC<{ handles: IFlowHandleData[]; className?: string }> = ({
  handles,
  className,
}) => {
  return (
    <>
      {handles?.map((handle) => {
        const handleStyle: CSSProperties = {
          top: handle?.top,
          right: handle?.right,
          bottom: handle?.bottom,
          left: handle?.left,
        };

        return (
          <Handle
            key={handle?.id}
            id={handle?.id}
            className={cl(scss.root, className)}
            type={handle?.type}
            position={handle?.position}
            style={handleStyle}
            // isConnectable={false}
          />
        );
      })}
    </>
  );
};

export default memo(HandlesFlow);
