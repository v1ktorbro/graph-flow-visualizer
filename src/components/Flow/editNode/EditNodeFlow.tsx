import scss from "./editNodeFlow.module.scss";

import { memo, FC } from "react";

import type { Node } from "@xyflow/react";

interface INodePropertiesPanel {
  node: Node;
  onLabelChange: (label: string) => void;
  onClose: () => void;
}

const EditNodeFlow: FC<INodePropertiesPanel> = ({
  node,
  onLabelChange,
  onClose,
}) => {
  return (
    <aside className={scss.root}>
      <div className={scss.header}>
        <div>
          <h2 className={scss.title}>Редактирование узла</h2>
          <p className={scss.subTitle}>ID: {node.id}</p>
        </div>

        <button className={scss.close} onClick={onClose}>
          ×
        </button>
      </div>

      <label className={scss.field}>
        <span>Идентификатор</span>

        <input value={node.id} disabled />
      </label>

      <label className={scss.field}>
        <span>Название</span>

        <input
          disabled
          value={String(node.data?.label ?? "")}
          onChange={(event) => onLabelChange(event.target.value)}
        />
      </label>

      <label className={scss.field}>
        <span>Описание</span>

        <textarea
          value={String(node.data?.description ?? "")}
          disabled
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          onChange={(event) => {
            // сюда аналогично можно добавить onDescriptionChange
          }}
        />
      </label>
    </aside>
  );
};

export default memo(EditNodeFlow);
