import type { ITaskNode, TaskStatus, IWorkflowNode } from "../types/flowTypes";

import { flowHandleCreate } from "../utils/flowHandleCreate/flowHandleCreate";
import { staffs } from "./staffData";

const NODE_WIDTH = 240;

const createImplementationTasks = (
  prefix: string,
  assigneeIds: readonly [string, string, string],
  statuses: readonly [TaskStatus, TaskStatus, TaskStatus],
): ITaskNode[] => [
  {
    id: `${prefix}_modules`,
    title: "Реализация модулей",
    icon: "boxBroken",
    executorId: assigneeIds[0],
    status: statuses[0],
    bgTone: "success",
  },
  {
    id: `${prefix}_tests`,
    title: "Покрытия\nтестами",
    icon: "codeSquareOutline",
    executorId: assigneeIds[1],
    status: statuses[1],
    bgTone: "warning",
  },
  {
    id: `${prefix}_integration`,
    title: "Интеграционная связка",
    icon: "filtersBroken",
    executorId: assigneeIds[2],
    status: statuses[2],
    bgTone: "info",
  },
];

export const createWorkflowNodes = (): IWorkflowNode[] => [
  {
    id: "requirements",
    type: "stage",
    position: { x: 24, y: 38 },
    style: { width: NODE_WIDTH },
    data: {
      title: "Требования",
      tasks: [
        {
          id: "requirements_brief",
          title: "Начальное ТЗ",
          icon: "clipboardTextBroken",
          executorId: "analyst",
          status: "done",
          bgTone: "success",
        },
        {
          id: "requirements_scenarios",
          title: "Сценарии пользователя",
          icon: "clipboardTextBroken",
          executorId: "qa",
          status: "review",
          bgTone: "success",
        },
      ],
      executors: staffs,
      handles: flowHandleCreate({
        // rightSource: "49%",
      }),
    },
  },
  {
    id: "design",
    type: "stage",
    position: { x: 320, y: 38 },
    style: { width: NODE_WIDTH },
    data: {
      title: "Проектирование",
      tasks: [
        {
          id: "design_diagrams",
          title: "Проектирование диаграмм",
          icon: "diagramUpBroken",
          executorId: "architect",
          status: "active",
          bgTone: "success",
        },
        {
          id: "design_architecture",
          title: "Проектирование архитектуры",
          icon: "diagramUpBroken",
          executorId: "architect",
          status: "review",
          bgTone: "neutral",
        },
        {
          id: "design_ui",
          title: "Зарисовки графических интерфейсов",
          icon: "monitorSmartphoneBroken",
          executorId: "designer",
          status: "todo",
          bgTone: "warning",
        },
      ],
      executors: staffs,
      handles: flowHandleCreate({
        // leftTarget: "46%",
        // bottomSource: "44%",
      }),
    },
  },
  {
    id: "implementation_a",
    type: "stage",
    position: { x: 10, y: 400 },
    style: { width: NODE_WIDTH },
    data: {
      title: "Реализация",
      tasks: createImplementationTasks(
        "implementation_a",
        ["backend", "qa", "integrator"],
        ["active", "review", "done"],
      ),
      executors: staffs,
      handles: flowHandleCreate({
        // topTarget: "50%",
        rightSource: "79%",
        // bottomSource: "50%",
      }),
    },
  },
  {
    id: "implementation_b",
    type: "stage",
    position: { x: 300, y: 400 },
    style: { width: NODE_WIDTH },
    data: {
      title: "Реализация",
      tasks: createImplementationTasks(
        "implementation_b",
        ["architect", "qa", "integrator"],
        ["active", "active", "review"],
      ),
      executors: staffs,
      handles: flowHandleCreate({
        leftTarget: "79%",
        rightSource: "79%",
        // bottomSource: "50%",
      }),
    },
  },
  {
    id: "implementation_c",
    type: "stage",
    position: { x: 590, y: 400 },
    style: { width: NODE_WIDTH },
    data: {
      title: "Реализация",
      tasks: createImplementationTasks(
        "implementation_c",
        ["backend", "qa", "integrator"],
        ["todo", "active", "todo"],
      ),
      executors: staffs,
      handles: flowHandleCreate({
        leftTarget: "79%",
        rightSource: "79%",
      }),
    },
  },
  {
    id: "implementation_d",
    type: "stage",
    position: { x: 880, y: 400 },
    style: { width: NODE_WIDTH },
    data: {
      title: "Реализация",
      tasks: createImplementationTasks(
        "implementation_d",
        ["backend", "qa", "integrator"],
        ["todo", "todo", "todo"],
      ),
      executors: staffs,
      handles: flowHandleCreate({
        leftTarget: "79%",
      }),
    },
  },
  {
    id: "acceptance",
    type: "stage",
    position: { x: 10, y: 750 },
    style: { width: NODE_WIDTH },
    data: {
      variant: "compact",
      tasks: [
        {
          id: "acceptance_tests",
          title: "Приемочные испытания",
          icon: "filtersBroken",
          executorId: "qa",
          status: "active",
          bgTone: "info",
        },
      ],
      executors: staffs,
      handles: flowHandleCreate({
        // topTarget: "50%",
        // rightTarget: "50%",
        // rightSource: "78%",
        // bottomSource: "50%",
      }),
    },
  },
  {
    id: "integration_test",
    type: "stage",
    position: { x: 300, y: 750 },
    style: { width: NODE_WIDTH },
    data: {
      variant: "compact",
      tasks: [
        {
          id: "integration_test_run",
          title: "Интеграционное тестирование",
          icon: "filtersBroken",
          executorId: "integrator",
          status: "active",
          bgTone: "info",
        },
      ],
      executors: staffs,
      handles: flowHandleCreate({
        // topTarget: "50%",
        // leftSource: "50%",
      }),
    },
  },
  {
    id: "deploy",
    type: "stage",
    position: { x: 590, y: 750 },
    style: { width: NODE_WIDTH },
    data: {
      variant: "compact",
      tasks: [
        {
          id: "deploy_cloud",
          title: "Развёртывание в облачной платформе",
          icon: "pieChartBroken",
          executorId: "devops",
          status: "review",
          bgTone: "info",
        },
      ],
      executors: staffs,
      handles: flowHandleCreate({
        // topTarget: "50%",
        // leftTarget: "50%",
        // rightSource: "50%",
        // bottomTarget: "50%",
      }),
    },
  },
  {
    id: "operations",
    type: "exploitationButton",
    position: { x: 880, y: 763 },
    style: { width: 198 },
    data: {
      label: "ЭКСПЛУАТАЦИЯ",
      handles: flowHandleCreate({
        // leftTarget: "50%",
      }),
    },
  },
];
