import scss from "./itemStageNodeFlow.module.scss";

import { memo } from "react";

import type { FC } from "react";
import type {
  IStaffTask,
  ITaskNode,
  TaskBgTone,
} from "../../../../../assets/types/flowTypes";

import IconRenderer from "../../../../ui/iconRenderer/IconRenderer";
import ImageBadgeItemStageNodeFlow from "./imageBadge/ImageBadgeItemStageNodeFlow";

import cl from "../../../../../assets/utils/classNames/classNames";

interface TaskCardProps {
  assignee: IStaffTask;
  compact?: boolean;
  isLast: boolean;
  task: ITaskNode;
  onStatusToggle: (taskId: string) => void;
}

const toneClassNames: Record<TaskBgTone, string> = {
  neutral: scss.taskCardToneNeutral,
  success: scss.taskCardToneSuccess,
  warning: scss.taskCardToneWarning,
  info: scss.taskCardToneInfo,
};

const ItemStageNodeFlow: FC<TaskCardProps> = ({
  assignee,
  // compact = false,
  isLast,
  task,
}) => (
  <div className={scss.root}>
    <div className={cl(scss.taskCard, toneClassNames[task.bgTone])}>
      <div className={scss.info}>
        <IconRenderer name={task.icon} className={scss.icon} />

        <span className={scss.title}>{task.title}</span>
      </div>

      <div className={scss.meta}>
        <ImageBadgeItemStageNodeFlow {...assignee} />

        <div className={scss.icons}>
          <IconRenderer name="infoCircleBroken" className={scss.icon} />
          <IconRenderer name="chatRoundCallBoldDuotone" className={scss.icon} />
        </div>
      </div>
    </div>

    {!isLast ? <div className={scss.taskConnector} aria-hidden="true" /> : null}
  </div>
);

export default memo(ItemStageNodeFlow);
