import scss from "./imageBadgeItemStageNodeFlow.module.scss";

import { memo } from "react";

import type { CSSProperties, FC } from "react";

import type { ISubNodeExecutor } from "../../../../../../assets/types/flowTypes";

const ImageBadgeItemStageNodeFlow: FC<ISubNodeExecutor> = (assignee) => {
  const avatarStyle = {
    "--avatar-from": assignee.gradientFrom,
    "--avatar-to": assignee.gradientTo,
  } as CSSProperties;

  return (
    <div
      className={scss.root}
      style={avatarStyle}
      title={assignee?.name}
      aria-label={assignee?.name}
    >
      {assignee?.initials}
    </div>
  );
};

export default memo(ImageBadgeItemStageNodeFlow);
