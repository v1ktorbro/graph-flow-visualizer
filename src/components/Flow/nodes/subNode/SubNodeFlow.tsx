import scss from "./subNodeFlow.module.scss";

import { memo, Suspense } from "react";

import type { ISubNodeData } from "../../../../assets/types/flowTypes";
import type { Node, NodeProps } from "@xyflow/react";

import IconRenderer from "../../../ui/iconRenderer/IconRenderer";
import HandlesFlow from "../../handles/HandlesFlow";

const SubNodeFlow = (subNode: NodeProps<Node<ISubNodeData, "subNode">>) => {
  const { data } = subNode;

  return (
    <div className={scss.root}>
      <HandlesFlow handles={data?.handles} />

      <div className={scss.subNode}>
        <div className={scss.info}>
          <Suspense>
            {data.icon && (
              <IconRenderer name={data.icon} className={scss.icon} />
            )}
          </Suspense>

          <span className={scss.label}>{data.label}</span>
        </div>

        <div className={scss.meta}>
          <div className={scss.icons}>
            <IconRenderer name="infoCircleBroken" className={scss.icon} />
            <IconRenderer
              name="chatRoundCallBoldDuotone"
              className={scss.icon}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(SubNodeFlow);
