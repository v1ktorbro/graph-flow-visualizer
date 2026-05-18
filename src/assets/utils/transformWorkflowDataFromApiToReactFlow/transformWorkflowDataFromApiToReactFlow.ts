import { MarkerType, type Edge } from "@xyflow/react";
import type { CSSProperties } from "react";

import type { IIconRendererTypes } from "../../../components/ui/iconRenderer/IconRenderer";
import type {
  ISubNode,
  IWorkflowNode,
  NodeCompactType,
  NodeType,
  WorkflowApiNode,
  WorkflowApiNodeType,
  WorkflowApiWorkflow,
} from "../../types/flowTypes";
import { flowHandleCreate } from "../flowHandleCreate/flowHandleCreate";

const NODE_WIDTH = 240;
const NODE_HEIGHT = 120;
const SUB_NODE_WIDTH = 220;

const TOP_LEVEL_FALLBACK_GAP = 280;

/**
 * Серверный API знает только бизнесовый тип ноды:
 * start, phase, approval_gate и так далее.
 * Компоненты библиотеки React Flow получают уже готовые визуальные признаки:
 * icon.
 * 1. NODE_ICON_BY_TYPE задает базовую иконку по типу серверной ноды.
 * 2. TASK_ICON_BY_TYPE уточняет иконку по task_type.
 */
const NODE_ICON_BY_TYPE: Record<WorkflowApiNodeType, IIconRendererTypes> = {
  start: "infoCircleBroken",
  phase: "clipboardTextBroken",
  approval_gate: "filtersBroken",
  execution: "codeSquareOutline",
  deploy: "pieChartBroken",
  end: "infoCircleBroken",
};

const TASK_ICON_BY_TYPE: Record<string, IIconRendererTypes> = {
  requirements_gathering: "clipboardTextBroken",
  answer_questions: "chatRoundCallBoldDuotone",
  finalize_requirements: "clipboardTextBroken",
  planning: "diagramUpBroken",
};

/**
 * Пример:
 * "requirements_gathering" -> "Requirements Gathering".
 *
 * Используется только как fallback:
 * если сервер уже прислал description или label, они остаются главным источником.
 */
const formatIdentifier = (value: string) => {
  const normalized = value.replace(/[_-]+/g, " ").trim();

  if (!normalized) return value;

  return normalized.replace(/\b\w/g, (char) => char.toUpperCase());
};

/**
 * Безопасно достает label для группировки из серверной workflow-ноды.
 *
 * Не все типы WorkflowApiNode имеют поле phase_label.
 * TypeScript не даст просто обратиться к node.phase_label,
 * поэтому сначала проверяем наличие поля через оператор in.
 *
 * phase_label здесь важен не как текст на карточке, а как правило группировки:
 * все серверные ноды с одинаковым phase_label попадут внутрь одного parent node.
 */
const getGroupLabel = (node: WorkflowApiNode): string | undefined => {
  if (!("phase_label" in node)) return undefined;

  const groupLabel = node.phase_label?.trim();

  return groupLabel || undefined;
};

/**
 * Набор небольших функций для безопасного получения опциональных полей серверной ноды.
 *
 * Почему не стоит читать поля напрямую:
 * 1. В union-типе WorkflowApiNode часть полей есть только у task-нод.
 * 2. Эти функции держат сужение типа в одном месте.
 * 3. Остальной код адаптера может работать с простыми string | undefined.
 */
const getTaskType = (node: WorkflowApiNode): string | undefined => {
  if (!("task_type" in node)) return undefined;

  return node.task_type;
};

const getDescription = (node: WorkflowApiNode): string | undefined => {
  if (!("description" in node)) return undefined;

  return node.description;
};

/**
 * Выбирает основной текст для ноды в модели библиотеки React Flow.
 *
 * Приоритет:
 * 1. Для start/end используем короткие стабильные подписи.
 * 2. Для рабочих шагов берем description, потому что сейчас это самый
 *    понятный человекочитаемый текст из серверных данных.
 * 3. Если description нет, берем label.
 * 4. Если label тоже нет, красиво форматируем task_type или type.
 */
const getNodeLabel = (node: WorkflowApiNode) => {
  if (node.type === "start") return node.label ?? "Start";
  if (node.type === "end") return node.label ?? "End";

  const description = getDescription(node);
  const taskType = getTaskType(node);

  return (
    description ??
    node.label ??
    (taskType ? formatIdentifier(taskType) : formatIdentifier(node.type))
  );
};

/**
 * Выбирает иконку для карточки.
 */
const getNodeIcon = (node: WorkflowApiNode) => {
  const taskType = getTaskType(node);

  if (taskType && TASK_ICON_BY_TYPE[taskType]) {
    return TASK_ICON_BY_TYPE[taskType];
  }

  return NODE_ICON_BY_TYPE[node.type];
};

/**
 * Создает базовый технический id для UI-контейнера.
 *
 * Серверные ноды уже имеют свои id: req_gather, planning, execution.
 * Parent-ноды для группировки в серверных данных нет, поэтому мы создаем
 * технический контейнерный id из phase_label.
 *
 * Пример:
 * phase_label: "requirements" -> parent id: "ui_group_requirements_...".
 */
const getStringHash = (value: string) => {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }

  return hash.toString(36);
};

const createGroupNodeIdBase = (groupLabel: string) => {
  const slug = groupLabel
    .trim()
    .toLowerCase()
    .replace(/[^\w-]+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "");

  return `ui_group_${slug || "phase"}_${getStringHash(groupLabel)}`;
};

const createUniqueGroupNodeId = (
  groupLabel: string,
  usedNodeIds: Set<string>,
) => {
  const baseId = createGroupNodeIdBase(groupLabel);
  let nodeId = baseId;
  let suffix = 2;

  while (usedNodeIds.has(nodeId)) {
    nodeId = `${baseId}_${suffix}`;
    suffix += 1;
  }

  usedNodeIds.add(nodeId);

  return nodeId;
};

const createGroupNodeIdByLabel = (workflow: WorkflowApiWorkflow) => {
  const usedNodeIds = new Set(workflow.nodes.map((node) => node.id));
  const groupNodeIdByLabel = new Map<string, string>();

  workflow.nodes.forEach((node) => {
    const groupLabel = getGroupLabel(node);

    if (!groupLabel || groupNodeIdByLabel.has(groupLabel)) return;

    groupNodeIdByLabel.set(
      groupLabel,
      createUniqueGroupNodeId(groupLabel, usedNodeIds),
    );
  });

  return groupNodeIdByLabel;
};

/**
 * Возвращает временную позицию верхнеуровневой ноды.
 *
 * Эти координаты нужны библиотеке React Flow сразу при создании nodes.
 * После этого layoutWorkflowNodes пересчитает реальные позиции через ELK.
 *
 * То есть position здесь не финальная раскладка, а безопасный fallback
 * до завершения async layout.
 */
const getFallbackTopLevelPosition = (index: number) => ({
  x: index * TOP_LEVEL_FALLBACK_GAP,
  y: 0,
});

/**
 * Создает верхнеуровневую ноду для библиотеки React Flow.
 *
 * В серверных данных такой ноды нет. Она появляется только на UI-слое, чтобы:
 * 1. сгруппировать несколько серверных шагов внутри одной карточки;
 * 2. дать layoutWorkflowNodes один верхнеуровневый контейнер;
 * 3. сохранить текущую визуальную модель node + subNode.
 *
 * Все реальные серверные шаги из этой группы потом становятся subNode с parentId,
 * который указывает на id этой контейнерной ноды.
 */
const createNode = (
  workflow: WorkflowApiWorkflow,
  groupLabel: string,
  id: string,
  index: number,
): NodeType => ({
  id,
  type: "node",
  position: getFallbackTopLevelPosition(index),
  style: { width: NODE_WIDTH, height: NODE_HEIGHT },
  data: {
    label: formatIdentifier(groupLabel),
    handles: flowHandleCreate({}),
    apiWorkflowId: workflow.id,
  },
});

/**
 *
 * Вход:
 * 1. workflow - нужен, чтобы сохранить apiWorkflowId в data.
 * 2. node - исходная серверная нода.
 * 3. parentId - id UI-контейнера, созданного из phase_label.
 *
 * Что важно:
 * 1. id subNode остается равным серверному id, чтобы edges могли ссылаться
 *    на настоящие source/target из серверных данных без дополнительной подмены.
 * 2. extent: "parent" говорит библиотеке React Flow держать ноду внутри родителя.
 * 3. position здесь стартовая; layoutWorkflowNodes потом расставит
 *    все subNode внутри parent-карточки вертикальным списком.
 */
const createSubnode = (
  workflow: WorkflowApiWorkflow,
  node: WorkflowApiNode,
  parentId: string,
): ISubNode => ({
  id: node.id,
  type: "subNode",
  parentId,
  extent: "parent",
  position: { x: 0, y: 0 },
  style: { width: SUB_NODE_WIDTH },
  draggable: false,
  data: {
    label: getNodeLabel(node),
    icon: getNodeIcon(node),
    handles: flowHandleCreate({}),
    apiNodeId: node.id,
    apiNodeType: node.type,
    apiWorkflowId: workflow.id,
    taskType: getTaskType(node),
    description: getDescription(node),
  },
});

/**
 * Создает самостоятельную компактную ноду.
 *
 * Такие серверные ноды не имеют phase_label и не входят в UI-контейнер.
 * Сейчас это start, end и approval_gate.
 *
 * Они остаются верхнеуровневыми nodes для ELK, чтобы workflow видел их
 * как отдельные этапы графа: Start -> Requirements -> Gate -> Planning.
 */
const createCompactNode = (
  workflow: WorkflowApiWorkflow,
  node: WorkflowApiNode,
  index: number,
): NodeCompactType => ({
  id: node.id,
  type: "nodeCompact",
  position: getFallbackTopLevelPosition(index),
  style: { width: NODE_WIDTH },
  data: {
    label: getNodeLabel(node),
    icon: getNodeIcon(node),
    handles: flowHandleCreate({}),
    apiNodeId: node.id,
    apiNodeType: node.type,
    apiWorkflowId: workflow.id,
    taskType: getTaskType(node),
    description: getDescription(node),
  },
});

/**
 * Возвращает parentId, который будет у серверной ноды после адаптации.
 *
 * Эта функция нужна edges-адаптеру:
 * он должен понимать, находятся ли source и target внутри одного UI-контейнера.
 *
 * Если phase_label нет, parentId undefined, и нода считается top-level.
 */
const getNodeParentId = (
  node: WorkflowApiNode,
  groupNodeIdByLabel: Map<string, string>,
) => {
  const groupLabel = getGroupLabel(node);

  return groupLabel ? groupNodeIdByLabel.get(groupLabel) : undefined;
};

/**
 * Превращает workflow.nodes из серверного API в nodes для библиотеки React Flow.
 *
 * Алгоритм:
 * 1. Идем по серверным нодам в исходном порядке.
 * 2. Если у ноды есть phase_label, ищем/создаем parent-ноду.
 * 3. Саму серверную ноду добавляем как subNode внутрь этой parent-ноды.
 * 4. Если phase_label нет, создаем самостоятельную nodeCompact.
 * 5. topLevelIndex увеличивается только для верхнеуровневых нод,
 *    потому что только им нужен fallback x-offset до ELK-раскладки.
 *
 * Результат:
 * Библиотека React Flow получает смешанный список:
 * 1. Node (контейнер);
 * 2. subNode внутри контейнеров;
 * 3. compact-ноды для gate/start/end.
 */
export const transformWorkflowNodesFromApiToReactFlow = (
  workflow: WorkflowApiWorkflow,
): IWorkflowNode[] => {
  const nodes: IWorkflowNode[] = [];
  const groupNodeIdByLabel = createGroupNodeIdByLabel(workflow);
  const createdGroupNodeIds = new Set<string>();
  let topLevelIndex = 0;

  workflow.nodes.forEach((apiNode) => {
    const groupLabel = getGroupLabel(apiNode);

    if (groupLabel) {
      const parentId = groupNodeIdByLabel.get(groupLabel);

      if (!parentId) return;

      if (!createdGroupNodeIds.has(parentId)) {
        createdGroupNodeIds.add(parentId);
        nodes.push(createNode(workflow, groupLabel, parentId, topLevelIndex));
        topLevelIndex += 1;
      }

      nodes.push(createSubnode(workflow, apiNode, parentId));
      return;
    }

    nodes.push(createCompactNode(workflow, apiNode, topLevelIndex));
    topLevelIndex += 1;
  });

  return nodes;
};

/**
 * Превращает workflow.edges из серверного API в edges для библиотеки React Flow.
 *
 * Серверный edge выглядит так:
 * { from: "gate_req", to: "planning", condition: "approved" }
 *
 * Edge для библиотеки React Flow должен иметь:
 * 1. id;
 * 2. source/target;
 * 3. handles, к которым будет прикреплена линия;
 * 4. визуальные опции из edgeConfig.
 *
 * Важная деталь:
 * source/target остаются серверными id. Если edge идет к subNode,
 * библиотека React Flow получит связь именно с этой subNode.
 * А layoutWorkflowNodes уже умеет
 * поднимать такие связи до top-level контейнеров для расчета ELK.
 */
export const transformWorkflowEdgesFromApiToReactFlow = (
  workflow: WorkflowApiWorkflow,
): Edge[] => {
  // nodeIds защищает от битых edges, если сервер пришлет связь на несуществующую ноду.
  const nodeIds = new Set(workflow.nodes.map((node) => node.id));

  // parentIdByNodeId помогает понять, лежит ли серверная нода внутри UI-контейнера.
  const parentIdByNodeId = new Map<string, string>();
  const groupNodeIdByLabel = createGroupNodeIdByLabel(workflow);

  workflow.nodes.forEach((node: WorkflowApiNode) => {
    const parentId = getNodeParentId(node, groupNodeIdByLabel);

    if (parentId) {
      parentIdByNodeId.set(node.id, parentId);
    }
  });

  // orderByNodeId нужен для простого определения обратных связей вроде rejected.
  const orderByNodeId = new Map(
    workflow.nodes.map((node, index) => [node.id, index]),
  );

  return workflow.edges.reduce<Edge[]>((result, apiEdge, index) => {
    // Если серверный edge ссылается на неизвестную ноду, не роняем весь граф.
    if (!nodeIds.has(apiEdge.from) || !nodeIds.has(apiEdge.to)) return result;

    const sourceParentId = parentIdByNodeId.get(apiEdge.from);
    const targetParentId = parentIdByNodeId.get(apiEdge.to);

    const sourceRootId = sourceParentId ?? apiEdge.from;
    const targetRootId = targetParentId ?? apiEdge.to;

    const sourceOrder = orderByNodeId.get(apiEdge.from) ?? 0;
    const targetOrder = orderByNodeId.get(apiEdge.to) ?? 0;

    const isInnerContainerEdge = sourceRootId === targetRootId;
    const isBackEdge = sourceOrder > targetOrder;

    /**
     * Handles создаются по следующей схеме:
     * 1. Если source и target внутри одного UI-контейнера, ведем связь сверху вниз.
     * 2. Если edge идет назад по порядку серверных нод, цепляем слева направо,
     *    чтобы rejected-сценарии не выглядели как обычный forward-flow.
     * 3. Во всех остальных случаях используем горизонтальный flow справа налево.
     */
    result.push({
      id: `${apiEdge.from}-${apiEdge.condition ?? index}-${apiEdge.to}`,
      source: apiEdge.from,
      target: apiEdge.to,
      animated: apiEdge?.condition === "rejected",
      label: apiEdge?.condition === "rejected" && "Rejected",
      type: isInnerContainerEdge ? "straight" : "smoothstep",
      style: {
        "--xy-edge-stroke":
          apiEdge?.condition === "rejected" ? "var(--color-error)" : "inherit",
      } as CSSProperties,
      markerEnd: {
        type: MarkerType.Arrow,
        width: 32,
        height: 32,
      },
      sourceHandle: isInnerContainerEdge
        ? "bottom-source"
        : isBackEdge
          ? "left-source"
          : "right-source",
      targetHandle: isInnerContainerEdge
        ? "top-target"
        : isBackEdge
          ? "right-target"
          : "left-target",
      data: {
        condition: apiEdge.condition,
      },
    });

    return result;
  }, []);
};

/**
 * Сборка графа React Flow из одного workflow.
 *
 * Используется, когда месту вызова нужны сразу nodes и edges.
 * Отдельные функции createWorkflowNodesFromApi/createWorkflowEdgesFromApi
 * оставлены публичными, потому что state библиотеки React Flow обычно хранит nodes
 * и edges раздельно.
 */
export const transformWorkflowDataFromApiToReactFlow = (
  workflow: WorkflowApiWorkflow,
) => ({
  nodes: transformWorkflowNodesFromApiToReactFlow(workflow),
  edges: transformWorkflowEdgesFromApiToReactFlow(workflow),
});
