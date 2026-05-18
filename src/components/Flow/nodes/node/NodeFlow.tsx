import scss from "./nodeFlow.module.scss";

import { memo } from "react";

import type { NodeProps } from "@xyflow/react";
import type { NodeType } from "../../../../assets/types/flowTypes";

// import HandlesFlow from "../../handles/HandlesFlow";

const NodeFlow = ({ data }: NodeProps<NodeType>) => {
  return (
    <div className={scss.root}>
      {/* <HandlesFlow handles={data.handles}  /> */}

      {data?.label ? <h3 className={scss.label}>{data?.label}</h3> : null}
    </div>
  );
};

export default memo(NodeFlow);
