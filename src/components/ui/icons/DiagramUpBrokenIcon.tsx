import { FC, SVGAttributes, memo } from "react";

const DiagramUpBrokenIcon: FC<SVGAttributes<SVGElement>> = (props) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_1855_2950)">
      <path
        d="M14.6663 14.6663H7.99967C4.85701 14.6663 3.28567 14.6663 2.30901 13.6897C1.33301 12.7143 1.33301 11.1423 1.33301 7.99967V5.99967M1.33301 1.33301V3.33301"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12.6667 4.66602L10.588 7.28335C10.27 7.68468 10.1107 7.88535 9.928 7.98335C9.78934 8.05746 9.63516 8.09784 9.47798 8.10119C9.32079 8.10455 9.16503 8.0708 9.02333 8.00268C8.83667 7.91268 8.66933 7.71935 8.33333 7.33268C7.99733 6.94602 7.83 6.75268 7.64333 6.66268C7.50167 6.59477 7.346 6.5612 7.18894 6.56467C7.03188 6.56815 6.87785 6.60857 6.73933 6.68268C6.55667 6.78002 6.39733 6.98068 6.07933 7.38135L4 9.99935"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1855_2950">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default memo(DiagramUpBrokenIcon);
