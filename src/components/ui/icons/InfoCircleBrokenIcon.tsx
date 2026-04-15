import { FC, SVGAttributes, memo } from "react";

const InfoCircleBrokenIcon: FC<SVGAttributes<SVGElement>> = (props) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 11 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M5.5 8V5" stroke="currentColor" strokeLinecap="round" />
    <path
      d="M5.5 3C5.77614 3 6 3.22386 6 3.5C6 3.77614 5.77614 4 5.5 4C5.22386 4 5 3.77614 5 3.5C5 3.22386 5.22386 3 5.5 3Z"
      fill="currentColor"
    />
    <path
      d="M3 1.16901C3.75972 0.729369 4.62224 0.498559 5.5 0.500007C8.2615 0.500007 10.5 2.73851 10.5 5.50001C10.5 8.26151 8.2615 10.5 5.5 10.5C2.7385 10.5 0.5 8.26151 0.5 5.50001C0.5 4.58951 0.7435 3.73501 1.169 3.00001"
      stroke="currentColor"
      strokeLinecap="round"
    />
  </svg>
);

export default memo(InfoCircleBrokenIcon);
