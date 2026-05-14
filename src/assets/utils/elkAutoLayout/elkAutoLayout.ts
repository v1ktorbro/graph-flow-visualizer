import ELK from "elkjs/lib/elk.bundled.js";

import { Position } from "@xyflow/react";

import type { Edge } from "@xyflow/react";
import type { IWorkflowNode } from "../../types/flowTypes";

type ElkDirection = "RIGHT" | "DOWN" | "LEFT" | "UP";

type ElkGraphNode = {
  id: string;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  layoutOptions?: Record<string, string>;
  children?: ElkGraphNode[];
  edges?: ElkGraphEdge[];
};

type ElkGraphEdge = {
  id: string;
  sources: string[];
  targets: string[];
};

const elk = new ELK();

const DEFAULT_NODE_WIDTH = 240;
const DEFAULT_NODE_HEIGHT = 255;
const DEFAULT_COMPACT_HEIGHT = 90;

const CHILD_X = 12;
const CHILD_START_Y = 40;
const CHILD_ROW_GAP = 100;
const CHILD_HEIGHT = 55;
const CHILD_BOTTOM_PADDING = 20;

const elkLayoutOptions: Record<string, string> = {
  "elk.algorithm": "layered",

  // направление workflow
  "elk.direction": "RIGHT",

  // расстояние между слоями
  "elk.layered.spacing.nodeNodeBetweenLayers": "120",

  // расстояние между соседними нодами
  "elk.spacing.nodeNode": "80",

  // роутинг ребер
  "elk.edgeRouting": "ORTHOGONAL",

  // меньше пересечений
  "elk.layered.crossingMinimization.strategy": "LAYER_SWEEP",

  // аккуратнее placement
  "elk.layered.nodePlacement.strategy": "NETWORK_SIMPLEX",
};

const toNumber = (value: unknown): number | undefined => {
  if (typeof value === "number") return value;

  if (typeof value === "string") {
    const parsed = Number.parseFloat(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }

  return undefined;
};

const getNodeSize = (node: IWorkflowNode) => {
  const measuredNode = node as IWorkflowNode & {
    width?: number;
    height?: number;
    measured?: {
      width?: number;
      height?: number;
    };
  };

  const width =
    toNumber(node.style?.width) ??
    toNumber(measuredNode.width) ??
    toNumber(measuredNode.measured?.width) ??
    DEFAULT_NODE_WIDTH;

  const height =
    toNumber(node.style?.height) ??
    toNumber(measuredNode.height) ??
    toNumber(measuredNode.measured?.height) ??
    (node.type === "nodeCompact" || node.type === "exploitationButton"
      ? DEFAULT_COMPACT_HEIGHT
      : DEFAULT_NODE_HEIGHT);

  return { width, height };
};

/**
 * Ищет верхнеуровневую ноду для любого id, который приходит из edge.
 *
 * 1. На вход приходит nodeId из edge.source или edge.target.
 * 2. По nodesById находим полную ноду с этим id.
 * 3. Если у ноды нет parentId, значит это уже верхний контейнер.
 * 4. Если parentId есть, поднимаемся выше по цепочке родителей.
 * 5. visitedNodeIds защищает от случайного цикла в parentId.
 * 6. На выходе получаем id контейнера, который ELK умеет раскладывать.
 *
 * Пример:
 * design_ui -> parentId: design -> возвращаем "design".
 */
const getTopLevelNodeId = (
  nodeId: string,
  nodesById: Map<string, IWorkflowNode>,
): string | undefined => {
  let currentNode = nodesById.get(nodeId);
  const visitedNodeIds = new Set<string>();

  while (currentNode) {
    if (!currentNode.parentId) return currentNode.id;

    if (visitedNodeIds.has(currentNode.id)) return undefined;

    visitedNodeIds.add(currentNode.id);
    currentNode = nodesById.get(currentNode.parentId);
  }

  return undefined;
};

/**
 * Считает позицию сабноды внутри родительской карточки.
 *
 * 1. index приходит из порядка сабноды среди siblings.
 * 2. x фиксированный, чтобы все сабноды начинались с одного отступа слева.
 * 3. y растет на CHILD_ROW_GAP для каждой следующей сабноды.
 * 4. На выходе React Flow получает position относительно parent-ноды.
 */
const getChildNodePosition = (index: number) => ({
  x: CHILD_X,
  y: CHILD_START_Y + index * CHILD_ROW_GAP,
});

/**
 * Считает минимальную высоту родителя, чтобы все его сабноды поместились.
 *
 * 1. CHILD_START_Y задает верхний отступ до первой сабноды.
 * 2. childrenCount - 1 дает количество промежутков между сабнодами.
 * 3. CHILD_HEIGHT добавляет высоту последней сабноды.
 * 4. CHILD_BOTTOM_PADDING оставляет пустое пространство внутри родителя.
 */
const getMinParentHeight = (childrenCount: number) =>
  CHILD_START_Y +
  (childrenCount - 1) * CHILD_ROW_GAP +
  CHILD_HEIGHT +
  CHILD_BOTTOM_PADDING;

/**
 * Подготавливает ноды перед передачей верхнего уровня в ELK.
 *
 * 1. На вход приходит полный список nodes: и родительские ноды, и subNode.
 * 2. Сначала собираем childrenByParentId:
 *    parentId -> массив сабнод этого родителя.
 * 3. Потом проходим по каждой ноде.
 * 4. Если это сабнода, задаем ей position внутри родителя вручную.
 * 5. Если это родитель, проверяем количество его детей.
 * 6. Если дети есть, увеличиваем height родителя до минимально нужной.
 * 7. На выходе получаем nodes, где сабноды уже лежат внутри карточек,
 *    а родительские карточки достаточно высокие.
 *
 * Важно:
 * ELK дальше раскладывает только верхнеуровневые контейнеры.
 * Внутреннее расположение сабнод пока остается простой вертикальной стратегией.
 */
const prepareChildNodes = (nodes: IWorkflowNode[]): IWorkflowNode[] => {
  const childrenByParentId = new Map<string, IWorkflowNode[]>();

  nodes.forEach((node) => {
    if (!node.parentId) return;

    const children = childrenByParentId.get(node.parentId) ?? [];

    children.push(node);
    childrenByParentId.set(node.parentId, children);
  });

  return nodes.map((node) => {
    if (node.parentId) {
      const siblings = childrenByParentId.get(node.parentId) ?? [];
      const index = siblings.findIndex((sibling) => sibling.id === node.id);

      return {
        ...node,
        position: getChildNodePosition(index),
      };
    }

    const childrenCount = childrenByParentId.get(node.id)?.length ?? 0;

    if (!childrenCount) return node;

    const currentSize = getNodeSize(node);
    const minHeight = getMinParentHeight(childrenCount);

    return {
      ...node,
      style: {
        ...node.style,
        height: Math.max(currentSize.height, minHeight),
      },
    };
  });
};

/**
 * Достает готовые координаты из результата ELK.
 *
 * 1. ELK возвращает граф, где children - это рассчитанные top-level ноды.
 * 2. Для каждой такой ноды берем x/y.
 * 3. Складываем координаты в Map, чтобы потом быстро найти позицию по id.
 * 4. На выходе получаем id -> { x, y }.
 */
const getNodePositions = (layoutedGraph: ElkGraphNode) => {
  const positions = new Map<string, { x: number; y: number }>();

  layoutedGraph.children?.forEach((node) => {
    positions.set(node.id, {
      x: node.x ?? 0,
      y: node.y ?? 0,
    });
  });

  return positions;
};

/**
 * Выбирает стороны handles под направление layout.
 *
 * 1. Если workflow идет горизонтально, вход слева, выход справа.
 * 2. Если workflow идет вертикально, вход сверху, выход снизу.
 * 3. Эти значения попадут только в верхнеуровневые ноды на выходе.
 */
const getHandlePositions = (direction: ElkDirection) => {
  const isHorizontal = direction === "RIGHT" || direction === "LEFT";

  return {
    targetPosition: isHorizontal ? Position.Left : Position.Top,
    sourcePosition: isHorizontal ? Position.Right : Position.Bottom,
  };
};

/**
 * Главная функция автоматической раскладки workflow.
 *
 * Вход:
 * 1. nodes - полный список React Flow нод.
 * 2. edges - реальные связи между нодами и сабнодами.
 * 3. direction - направление раскладки для ELK.
 *
 * Что происходит внутри:
 * 1. Сабноды раскладываются внутри родителей вручную.
 * 2. Из подготовленных нод строятся индексы для быстрых поисков.
 * 3. Реальные edges преобразуются в edges для ELK:
 *    связи сабнод поднимаются до верхнеуровневых родителей.
 * 4. Собирается elkGraph только из top-level нод и связей между ними.
 * 5. ELK считает координаты верхнеуровневых нод.
 * 6. Координаты ELK возвращаются обратно в React Flow nodes.
 *
 * Выход:
 * 1. Возвращается новый массив IWorkflowNode[].
 * 2. Верхнеуровневые ноды получают position и target/source handle positions.
 * 3. Сабноды остаются внутри родителей с position из prepareChildNodes.
 */
export const elkAutoLayout = async (
  nodes: IWorkflowNode[],
  edges: Edge[],
  direction: ElkDirection = "RIGHT",
): Promise<IWorkflowNode[]> => {
  // 1. Сначала готовим внутреннюю структуру карточек:
  // сабноды получают локальные координаты, родители - нужную высоту.
  const preparedNodes = prepareChildNodes(nodes);

  // 2. Строим быстрые индексы по подготовленным нодам:
  // nodesById нужен для перехода от edge.source/target к самой ноде,
  // topLevelNodes - это единственные ноды, которые попадут в ELK,
  // topLevelNodeIds нужен для быстрой проверки существования контейнера.
  const nodesById = new Map(preparedNodes.map((node) => [node.id, node]));
  const topLevelNodes = preparedNodes.filter((node) => !node.parentId);
  const topLevelNodeIds = new Set(topLevelNodes.map((node) => node.id));

  // 3. usedEdges не дает добавить в ELK повторную связь между теми же
  // верхнеуровневыми контейнерами, если несколько сабнод связаны снаружи.
  const usedEdges = new Set<string>();

  // 4. Преобразуем реальные React Flow edges в ELK edges.
  // ELK должен видеть только связи между top-level контейнерами.
  const elkEdges = edges.reduce<ElkGraphEdge[]>((result, edge) => {
    // 4.1. Edge может идти от/к сабноде, поэтому поднимаем оба конца
    // связи до верхнеуровневого родителя.
    const sourceRootId = getTopLevelNodeId(edge.source, nodesById);
    const targetRootId = getTopLevelNodeId(edge.target, nodesById);

    // 4.2. Если id битый или parentId ведет в никуда/цикл, edge пропускаем.
    if (!sourceRootId || !targetRootId) return result;

    // 4.3. Если оба конца связи внутри одного контейнера, общий layout
    // верхнего уровня от этой связи не меняется.
    if (sourceRootId === targetRootId) return result;

    const sourceExists = topLevelNodeIds.has(sourceRootId);
    const targetExists = topLevelNodeIds.has(targetRootId);

    // 4.4. Если хотя бы один контейнер не попал в topLevelNodes,
    // ELK не сможет построить такую связь.
    if (!sourceExists || !targetExists) return result;

    const edgeKey = `${sourceRootId}->${targetRootId}`;

    // 4.5. Для ELK достаточно одной связи A -> B, даже если в данных
    // несколько edges между сабнодами этих же контейнеров.
    if (usedEdges.has(edgeKey)) return result;

    usedEdges.add(edgeKey);

    result.push({
      id: edge.id,
      sources: [sourceRootId],
      targets: [targetRootId],
    });

    return result;
  }, []);

  // 5. Собираем граф в формате ELK:
  // children - только верхнеуровневые ноды с размерами,
  // edges - только связи между верхнеуровневыми нодами,
  // layoutOptions - правила автоматической раскладки.
  const elkGraph: ElkGraphNode = {
    id: "root",
    layoutOptions: {
      ...elkLayoutOptions,
      "elk.direction": direction,
    },
    children: topLevelNodes.map((node) => {
      const { width, height } = getNodeSize(node);

      return {
        id: node.id,
        width,
        height,
      };
    }),
    edges: elkEdges,
  };

  // 6. ELK считает координаты top-level нод и возвращает layoutedGraph.
  const layoutedGraph = (await elk.layout(elkGraph)) as ElkGraphNode;

  // 7. Превращаем результат ELK в удобные Map/настройки для финального map.
  const positions = getNodePositions(layoutedGraph);
  const handlePositions = getHandlePositions(direction);

  // 8. Собираем финальный массив для React Flow.
  // Сабноды уже подготовлены на шаге 1, поэтому возвращаем их как есть.
  // Верхнеуровневым нодам добавляем position из ELK и стороны handles.
  return preparedNodes.map((node) => {
    if (node.parentId) return node;

    const position = positions.get(node.id);

    if (!position) return node;

    return {
      ...node,
      ...handlePositions,
      position,
    };
  });
};
