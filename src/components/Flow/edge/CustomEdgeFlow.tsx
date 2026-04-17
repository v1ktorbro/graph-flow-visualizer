import {
  getSmoothStepPath,
  BaseEdge,
  type EdgeProps,
  type Edge,
} from "@xyflow/react";

type CustomEdge = Edge<{ value: number }, "custom-edge">;

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  sourcePosition,
  targetX,
  targetY,
  targetPosition,
}: EdgeProps<CustomEdge>) {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 18,
    offset: 28,
    //  borderRadius: 6,
    // offset: 8,
  });
  const markerId = `edge-arrow-open-${id}`;

  return (
    <>
      <defs>
        <marker
          id={markerId}
          viewBox="0 0 14 14"
          refX="6"
          refY="7"
          markerWidth="14"
          markerHeight="14"
          orient="auto"
          markerUnits="userSpaceOnUse"
        >
          <path
            d="M 1.343 1.343 L 7 7 L 1.343 12.657"
            fill="none"
            stroke="#2F80ED"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </marker>
      </defs>

      <BaseEdge
        id={id}
        path={edgePath}
        style={{ stroke: "#2F80ED", strokeWidth: 2 }}
        markerEnd={`url(#${markerId})`}
      />
    </>
  );
}
