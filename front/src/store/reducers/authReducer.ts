import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface AuthReducerStateTypes {
  user: {
    [x: string]: string;
    id: string;
    email: string;
    name: string;
    address: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
  token: string;
}

const initialState = {
  user: null,
  token: '',
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
      state = initialState;
    },
  },
});

export const { login, logout } = AuthSlice.actions;

export default AuthSlice.reducer;
