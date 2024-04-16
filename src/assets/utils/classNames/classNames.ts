const cl = (
  ...classes: Array<string | boolean | number | undefined | null>
): string => classes.map((item) => item || undefined).join(" ");

export default cl;
