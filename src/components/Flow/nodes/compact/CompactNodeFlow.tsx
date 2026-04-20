import scss from "./compactNodeFlow.module.scss";

import { memo, Suspense } from "react";

import type {
  NodeCompactType,
  SubNodeBgTone,
} from "../../../../assets/types/flowTypes";

import IconRenderer from "../../../ui/iconRenderer/IconRenderer";
import HandlesFlow from "../../handles/HandlesFlow";

import { NodeProps } from "@xyflow/react";
import cl from "../../../../assets/utils/classNames/classNames";

const toneClassNames: Record<SubNodeBgTone, string> = {
  neutral: scss.taskCardToneNeutral,
  success: scss.taskCardToneSuccess,
  warning: scss.taskCardToneWarning,
  info: scss.taskCardToneInfo,
};

const CompactNodeFlow = (nodeCompact: NodeProps<NodeCompactType>) => {
  const { data } = nodeCompact;

  return (
    <div className={scss.root}>
      <HandlesFlow handles={data?.handles} />

      <div
        className={cl(
          scss.subNode,
          data?.bgTone && toneClassNames[data?.bgTone],
        )}
      >
        <div className={scss.info}>
          <Suspense>
            {data.icon && (
              <IconRenderer name={data.icon} className={scss.icon} />
            )}
          </Suspense>

          <span className={scss.label}>{data.label}</span>
        </div>

        <div className={scss.meta}>
          {/* <ImageBadgeItemStageNodeFlow {...assignee} /> */}

          <div className={scss.icons}>
            <IconRenderer name="infoCircleBroken" className={scss.icon} />
            <IconRenderer
              name="chatRoundCallBoldDuotone"
              className={scss.icon}
            />
          </div>
        </div>
      </div>

      {/* {!isLast ? <div className={scss.taskConnector} aria-hidden="true" /> : null} */}
    </div>
  );
};

export default memo(CompactNodeFlow);
