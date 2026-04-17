import scss from "./stageNodeFlow.module.scss";

import { memo, useMemo } from "react";

import type { NodeProps } from "@xyflow/react";
import type { StageFlowNode } from "../../../../assets/types/flowTypes";

import HandlesFlow from "../../handles/HandlesFlow";
import ItemStageNodeFlow from "./item/ItemStageNodeFlow";

import cl from "../../../../assets/utils/classNames/classNames";

const StageNodeFlow = ({ id, data }: NodeProps<StageFlowNode>) => {
  const isCompact = useMemo(() => data?.variant === "compact", [data?.variant]);

  return (
    <article className={cl(scss.root, isCompact && scss.stageNodeCompact)}>
      <HandlesFlow handles={data.handles} />

      {data.title ? <h3 className={scss.title}>{data.title}</h3> : null}

      <ul className={scss.ul}>
        {data.tasks.map((task, index) => (
          <ItemStageNodeFlow
            key={task.id}
            task={task}
            assignee={data.executors[task?.executorId]}
            compact={isCompact}
            isLast={index === data?.tasks?.length - 1}
            onStatusToggle={(taskId) => data.onTaskStatusToggle(id, taskId)}
          />
        ))}
      </ul>
    </article>
  );
};

export default memo(StageNodeFlow);
