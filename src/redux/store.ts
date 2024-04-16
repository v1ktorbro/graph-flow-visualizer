import {
  Action,
  ThunkAction,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import {
  defaultReducer,
  defaultReducerName,
} from "./reducers/default/slice/defaultSlice";

// ---common reduces

// import { saveState } from "./localStorage";

// config broadcast
// const config = {
//   channel: "store_broadcast_channel",
// };
// const middlewares = [createStateSyncMiddleware(config)];
//--------------
const rootReducer = combineReducers({
  // common reducers
  [defaultReducerName]: defaultReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({}).concat();
  },
});

// store.subscribe(
//   throttle(() => {
//     saveState({
//       sign_in: {
//         user: store.getState().[loginSlice.name].user,
//         adminOrSeism: store.getState().[loginSlice.name].adminOrSeism,
//       },
//     });
//   }, 1000)
// );

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
