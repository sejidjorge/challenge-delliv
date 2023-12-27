import { Action, ThunkAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./reducers/authReducer";
import OrderSlice from "./reducers/ordersReducer";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['authUser', 'order'],
}

const persistedReducer = persistReducer(persistConfig, combineReducers({
  authUser: AuthSlice,
  order: OrderSlice,
}));

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
