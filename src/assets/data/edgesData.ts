import type { Edge } from "@xyflow/react";

export const edgesData: Edge[] = [
  {
    id: "requirements-to-design",
    type: "custom",
    source: "requirements",
    target: "design",
    sourceHandle: "right-source",
    targetHandle: "left-target",
  },
  {
    id: "requirements-subNode-1-2",
    source: "requirements_brief",
    target: "requirements_scenarios",
    type: "custom",
    sourceHandle: "bottom-source",
    targetHandle: "top-target",
  },

  // ---------- design start --------
  {
    id: "design-to-implementation_a",
    type: "custom",
    source: "design",
    target: "implementation_a",
    sourceHandle: "bottom-source",
    targetHandle: "top-target",
  },
  {
    id: "implementation_a-to-acceptance",
    type: "custom",
    source: "implementation_a",
    target: "acceptance",
    sourceHandle: "bottom-source",
    targetHandle: "top-target",
  },
  {
    id: "design-subNode-1-2",
    source: "design_diagrams",
    target: "design_architecture",
    type: "custom",
    sourceHandle: "bottom-source",
    targetHandle: "top-target",
  },
  {
    id: "design-subNode-2-3",
    source: "design_architecture",
    target: "design_ui",
    type: "custom",
    sourceHandle: "bottom-source",
    targetHandle: "top-target",
  },
  // ---------- design end --------

  // ---------- implementation_a start --------
  {
    id: "implementation_a-subNode-1-2",
    type: "custom",
    source: "implementation_a_modules",
    target: "implementation_a_tests",
    sourceHandle: "bottom-source",
    targetHandle: "top-target",
  },
  {
    id: "implementation_a-subNode-2-3",
    type: "custom",
    source: "implementation_a_tests",
    target: "implementation_a_integration",
    sourceHandle: "bottom-source",
    targetHandle: "top-target",
  },
  // ---------- implementation_a end --------

  // ---------- implementation_b start --------
  {
    id: "implementation_a-to-b",
    type: "custom",
    source: "implementation_a",
    target: "implementation_b",
    sourceHandle: "right-source",
    targetHandle: "left-target",
  },
  {
    id: "implementation_b-subNode-1-2",
    type: "custom",
    source: "implementation_b_modules",
    target: "implementation_b_tests",
    sourceHandle: "bottom-source",
    targetHandle: "top-target",
  },
  {
    id: "implementation_b-subNode-2-3",
    type: "custom",
    source: "implementation_b_tests",
    target: "implementation_b_integration",
    sourceHandle: "bottom-source",
    targetHandle: "top-target",
  },
  // ---------- implementation_b end --------

  // ---------- implementation_c start --------
  {
    id: "implementation_b-to-c",
    type: "custom",
    source: "implementation_b",
    target: "implementation_c",
    sourceHandle: "right-source",
    targetHandle: "left-target",
  },

  {
    id: "implementation_c-subNode-1-2",
    type: "custom",
    source: "implementation_c_modules",
    target: "implementation_c_tests",
    sourceHandle: "bottom-source",
    targetHandle: "top-target",
  },
  {
    id: "implementation_c-subNode-2-3",
    type: "custom",
    source: "implementation_c_tests",
    target: "implementation_c_integration",
    sourceHandle: "bottom-source",
    targetHandle: "top-target",
  },
  // ---------- implementation_c end --------

  // ---------- implementation_d start --------
  {
    id: "implementation_c-to-d",
    type: "custom",
    source: "implementation_c",
    target: "implementation_d",
    sourceHandle: "right-source",
    targetHandle: "left-target",
  },
  {
    id: "implementation_d-subNode-1-2",
    type: "custom",
    source: "implementation_d_modules",
    target: "implementation_d_tests",
    sourceHandle: "bottom-source",
    targetHandle: "top-target",
  },
  {
    id: "implementation_d-subNode-2-3",
    type: "custom",
    source: "implementation_d_tests",
    target: "implementation_d_integration",
    sourceHandle: "bottom-source",
    targetHandle: "top-target",
  },
  {
    id: "implementation_d-to-integration_test",
    type: "custom",
    source: "implementation_d",
    target: "integration_test",
    sourceHandle: "bottom-source",
    targetHandle: "top-target",
  },
  // ---------- implementation_d end --------

  {
    id: "integration_test-to-acceptance",
    type: "custom",
    source: "integration_test",
    target: "acceptance",
    sourceHandle: "left-source",
    targetHandle: "right-target",
  },
  {
    id: "acceptance-to-deploy",
    type: "custom",
    source: "acceptance",
    target: "deploy",
    sourceHandle: "bottom-source", //
    targetHandle: "bottom-target",
  },
  {
    id: "deploy-to-operations",
    type: "custom",
    source: "deploy",
    target: "operations",
    sourceHandle: "right-source",
    targetHandle: "left-target",
  },
];
