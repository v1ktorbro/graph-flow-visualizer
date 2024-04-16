import { useAppSelector } from "../../../../hooks";
import type { StateSchema } from "../../../../storeTypes";

import { defaultReducerName } from "../../slice/defaultSlice";

export const getDefaultState = (state: StateSchema) =>
  state?.[defaultReducerName];

export const useGetDefaultState = () => useAppSelector(getDefaultState);
