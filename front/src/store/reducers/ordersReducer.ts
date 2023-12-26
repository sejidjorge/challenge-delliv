import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface OrderReducerStateTypes {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  status: string;
  user: {
    name: string;
    address: string;
    email: string;
  };
}

const singleOrder = {} as OrderReducerStateTypes;

const initialState = {
  order: singleOrder,
  listOrders: [] as OrderReducerStateTypes[],
  userOrders: [] as OrderReducerStateTypes[],
};

export const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    saveOrder: (state, action: PayloadAction<OrderReducerStateTypes>) => {
      state.order = action.payload;
    },
    saveListOrders: (
      state,
      action: PayloadAction<OrderReducerStateTypes[]>
    ) => {
      state.listOrders = action.payload;
    },
    saveUserListOrders: (
      state,
      action: PayloadAction<OrderReducerStateTypes[]>
    ) => {
      state.userOrders = action.payload;
    },
  },
});

export const { saveOrder, saveListOrders, saveUserListOrders } =
  OrderSlice.actions;

export default OrderSlice.reducer;
