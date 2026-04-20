import type {
  ISubNode,
  SubNodeStatus,
  IWorkflowNode,
} from "../types/flowTypes";

import { flowHandleCreate } from "../utils/flowHandleCreate/flowHandleCreate";
import { staffs } from "./staffData";

const NODE_WIDTH = 240;
const NODE_HEIGHT = 255;

const createImplementationTasks = (
  prefix: string,
  assigneeIds: readonly [string, string, string],
  statuses: readonly [SubNodeStatus, SubNodeStatus, SubNodeStatus],
): ISubNode[] => [
  {
    id: `${prefix}_modules`,
    parentId: prefix,
    style: { width: 220, minWidth: "min-content" },
    position: { x: 12, y: 30 },
    type: "subNode",
    extent: "parent",
    data: {
      label: "Реализация модулей",
      icon: "boxBroken",
      executorId: assigneeIds[0],
      status: statuses[0],
      bgTone: "success",
      handles: flowHandleCreate({}),
    },
  },
  {
    id: `${prefix}_tests`,
    parentId: prefix,
    style: { width: 220, minWidth: "min-content" },
    position: { x: 12, y: 110 },
    type: "subNode",
    extent: "parent",
    data: {
      label: "Покрытия\nтестами",
      icon: "codeSquareOutline",
      executorId: assigneeIds[1],
      status: statuses[1],
      bgTone: "warning",
      handles: flowHandleCreate({}),
    },
  },
  {
    id: `${prefix}_integration`,
    parentId: prefix,
    style: { width: 220, minWidth: "min-content" },
    position: { x: 12, y: 190 },
    type: "subNode",
    extent: "parent",
    data: {
      label: "Интеграционная связка",
      icon: "filtersBroken",
      executorId: assigneeIds[2],
      status: statuses[2],
      bgTone: "info",
      handles: flowHandleCreate({}),
    },
  },
];

export const createWorkflowNodes = (): IWorkflowNode[] => [
  // ---------- requirements start --------
  {
    id: "requirements",
    type: "node",
    style: { width: NODE_WIDTH, height: 200 },
    position: { x: 24, y: 38 },
    data: {
      label: "Требования",
      executors: staffs,
      handles: flowHandleCreate({}),
    },
  },
  {
    id: "requirements_brief",
    type: "subNode",
    extent: "parent",
    parentId: "requirements",
    style: { width: 220, minWidth: "min-content" },
    position: { x: 12, y: 40 },
    data: {
      label: "Начальное ТЗ",
      icon: "clipboardTextBroken",
      executorId: "analyst",
      status: "done",
      bgTone: "success",
      handles: flowHandleCreate({}),
    },
  },
  {
    id: "requirements_scenarios",
    type: "subNode",
    extent: "parent",
    parentId: "requirements",
    style: { width: 220, minWidth: "min-content" },
    position: { x: 12, y: 110 },
    data: {
      label: "Сценарии пользователя",
      icon: "clipboardTextBroken",
      executorId: "qa",
      status: "review",
      bgTone: "success",
      handles: flowHandleCreate({}),
    },
  },
  // ---------- requirements утв --------

  // ---------- design start --------
  {
    id: "design",
    type: "node",
    position: { x: 320, y: 38 },
    style: { width: NODE_WIDTH, height: NODE_HEIGHT },
    data: {
      label: "Проектирование",

      executors: staffs,
      handles: flowHandleCreate({}),
    },
  },
  {
    id: "design_diagrams",
    type: "subNode",
    extent: "parent",
    parentId: "design",
    style: { width: 220, minWidth: "min-content" },
    position: { x: 12, y: 40 },
    data: {
      label: "Проектирование диаграмм",
      icon: "diagramUpBroken",
      executorId: "architect",
      status: "active",
      bgTone: "success",
      handles: flowHandleCreate({}),
    },
  },
  {
    id: "design_architecture",
    type: "subNode",
    extent: "parent",
    parentId: "design",
    style: { width: 220 },
    position: { x: 12, y: 110 },
    data: {
      label: "Проектирование архитектуры",
      icon: "diagramUpBroken",
      executorId: "architect",
      status: "review",
      bgTone: "neutral",
      handles: flowHandleCreate({}),
    },
  },
  {
    id: "design_ui",
    type: "subNode",
    extent: "parent",
    parentId: "design",
    style: { width: 220 },
    position: { x: 12, y: 190 },
    data: {
      label: "Зарисовки графических интерфейсов",
      icon: "monitorSmartphoneBroken",
      executorId: "designer",
      status: "todo",
      bgTone: "warning",
      handles: flowHandleCreate({}),
    },
  },
  // ---------- design end --------

  // ---------- implementation_a start --------
  {
    id: "implementation_a",
    type: "node",
    position: { x: 10, y: 400 },
    style: { width: NODE_WIDTH, height: NODE_HEIGHT },
    data: {
      label: "Реализация A",
      executors: staffs,
      handles: flowHandleCreate({
        rightSource: "79%",
      }),
    },
  },

  ...createImplementationTasks(
    "implementation_a",
    ["backend", "qa", "integrator"],
    ["active", "review", "done"],
  ),
  // ---------- implementation_a end --------

  // ---------- implementation_b start --------
  {
    id: "implementation_b",
    type: "node",
    position: { x: 300, y: 400 },
    style: { width: NODE_WIDTH, height: NODE_HEIGHT },
    data: {
      label: "Реализация B",
      executors: staffs,
      handles: flowHandleCreate({
        leftTarget: "79%",
        rightSource: "79%",
      }),
    },
  },

  ...createImplementationTasks(
    "implementation_b",
    ["architect", "qa", "integrator"],
    ["active", "active", "review"],
  ),
  // ---------- implementation_b end --------

  // ---------- implementation_c start --------
  {
    id: "implementation_c",
    type: "node",
    position: { x: 590, y: 400 },
    style: { width: NODE_WIDTH, height: NODE_HEIGHT },
    data: {
      label: "Реализация C",
      executors: staffs,
      handles: flowHandleCreate({
        leftTarget: "79%",
        rightSource: "79%",
      }),
    },
  },

  ...createImplementationTasks(
    "implementation_c",
    ["backend", "qa", "integrator"],
    ["todo", "active", "todo"],
  ),
  // ---------- implementation_c end --------

  // ---------- implementation_d start --------
  {
    id: "implementation_d",
    type: "node",
    position: { x: 880, y: 400 },
    style: { width: NODE_WIDTH, height: NODE_HEIGHT },
    data: {
      label: "Реализация D",
      executors: staffs,
      handles: flowHandleCreate({
        leftTarget: "79%",
      }),
    },
  },

  ...createImplementationTasks(
    "implementation_d",
    ["backend", "qa", "integrator"],
    ["todo", "todo", "todo"],
  ),
  // ---------- implementation_d end --------

  // ---------- acceptance start --------
  {
    id: "acceptance",
    type: "nodeCompact",
    position: { x: 10, y: 750 },
    style: { width: NODE_WIDTH },
    data: {
      id: "acceptance_tests",
      label: "Приемочные испытания",
      icon: "filtersBroken",
      executorId: "qa",
      status: "active",
      bgTone: "info",
      executors: staffs,
      handles: flowHandleCreate({}),
    },
  },
  // ---------- acceptance end --------

  // ---------- integration_test start --------
  {
    id: "integration_test",
    type: "nodeCompact",
    position: { x: 300, y: 750 },
    style: { width: NODE_WIDTH },
    data: {
      id: "integration_test_run",
      label: "Интеграционное тестирование",
      icon: "filtersBroken",
      executorId: "integrator",
      status: "active",
      bgTone: "info",

      executors: staffs,
      handles: flowHandleCreate({}),
    },
  },
  // ---------- integration_test end --------

  // ---------- deploy start --------
  {
    id: "deploy",
    type: "nodeCompact",
    position: { x: 590, y: 750 },
    style: { width: NODE_WIDTH },
    data: {
      id: "deploy_cloud",
      label: "Развёртывание в облачной платформе",
      icon: "pieChartBroken",
      executorId: "devops",
      status: "review",
      bgTone: "info",

      executors: staffs,
      handles: flowHandleCreate({}),
    },
  },
  // ---------- deploy end --------

  // ---------- operations btn end --------
  {
    id: "operations",
    type: "exploitationButton",
    position: { x: 880, y: 763 },
    style: { width: 198 },
    data: {
      label: "ЭКСПЛУАТАЦИЯ",
      handles: flowHandleCreate({}),
    },
  },
  // ---------- operations btn end --------
];
