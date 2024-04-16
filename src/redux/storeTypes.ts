import { RootState } from "./store";

// --- schemes list reducers
import type { DefaultReducerSchema } from "./reducers/default/types/defaultTypes";

// ---  list reducers
import { defaultReducerName } from "./reducers/default/slice/defaultSlice";

export interface ThunkConfig {
  rejectValue: string;
  state: RootState;
}

export interface StateSchema {
  [defaultReducerName]: DefaultReducerSchema;
}
