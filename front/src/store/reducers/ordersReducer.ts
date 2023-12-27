import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface OrderReducerStateTypes {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  name: string;
  address: string;
}

const singleOrder = {} as OrderReducerStateTypes;

const initialState = {
  order: singleOrder,
  listOrders: [] as OrderReducerStateTypes[],
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
  },
});

export const { saveOrder, saveListOrders } =
  OrderSlice.actions;

export default OrderSlice.reducer;
