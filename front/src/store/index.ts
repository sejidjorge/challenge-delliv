import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./reducers/authReducer";
import OrderSlice from "./reducers/ordersReducer";

export const store = configureStore({
  reducer: {
    authUser: AuthSlice,
    order: OrderSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
