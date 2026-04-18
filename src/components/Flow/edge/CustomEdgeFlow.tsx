import { getSmoothStepPath, BaseEdge, type EdgeProps } from "@xyflow/react";
import { memo, useMemo } from "react";

const CustomEdgeFlow = ({
  id,
  sourceX,
  sourceY,
  sourcePosition,
  targetX,
  targetY,
  targetPosition,
  selected,
}: EdgeProps) => {
  const markerId = useMemo(() => `edge-arrow-open-${id}`, [id]);

  const strokeColor = useMemo(
    () => (selected ? "var(--color-warning)" : "var(--color-info-light)"),
    [selected],
  );

  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 18,
    offset: 28,
  });

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
            stroke={strokeColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </marker>
      </defs>

      <BaseEdge
        id={id}
        path={edgePath}
        style={{ stroke: strokeColor, strokeWidth: 2 }}
        markerEnd={`url(#${markerId})`}
      />
    </>
  );
};

export default memo(CustomEdgeFlow);
