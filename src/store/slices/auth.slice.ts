import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface AuthState {
  isAuthented: boolean;
}

const initialState: AuthState = {
  isAuthented: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const isAuthentedSelector = (store: RootState): any =>
  store.authReducer.isAuthented;

// export const {} = authSlice.actions;

export default authSlice.reducer;
