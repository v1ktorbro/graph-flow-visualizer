import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { DefaultReducerSchema } from "../types/defaultTypes";

const initialState: DefaultReducerSchema = {
  counterValue: 0,
};

export const defaultSlice = createSlice({
  name: "default_reducer_name",
  initialState,
  reducers: {
    setCounterValue: (state, { payload }: PayloadAction<number>) => {
      state.counterValue = payload;
    },
  },
});

export const { setCounterValue } = defaultSlice.actions;

export const { name: defaultReducerName, reducer: defaultReducer } =
  defaultSlice;
