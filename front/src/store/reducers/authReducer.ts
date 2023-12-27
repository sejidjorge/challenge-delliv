import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface AuthReducerStateTypes {
  user: {
    id: string;
    email: string;
    name: string;
    address: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
  token: string;
  listUsers: {
    users: AuthReducerStateTypes["user"][];
  };
}

const initialState = {
  user: null,
  token: "",
  listUsers: { users: [] },
} as unknown as AuthReducerStateTypes;

export const AuthSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthReducerStateTypes>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = "";
    },
    saveAllUsers: (
      state,
      action: PayloadAction<AuthReducerStateTypes["listUsers"]>
    ) => {
      state.listUsers = action.payload;
    },
  },
});

export const { login, logout, saveAllUsers } = AuthSlice.actions;

export default AuthSlice.reducer;
