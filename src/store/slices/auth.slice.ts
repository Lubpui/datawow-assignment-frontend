import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import * as authServices from "../../services/auth.services";
import type { AuthRespone } from "../../types/auth.type";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import { cookieConstants } from "../../constants/localStorage.constants";

export interface AuthState {
  isAuthented: boolean;
  username?: boolean;
}

const initialState: AuthState = {
  isAuthented: Boolean(Cookies.get(cookieConstants.TOKEN_KEY)),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isAuthented = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      
      if (action.payload) {
        state.isAuthented = true;
      } else {
        state.isAuthented = false;
      }
    });
    builder.addCase(login.rejected, (state) => {
      const userToken = Cookies.get(cookieConstants.TOKEN_KEY);
  
      if (userToken) {
        state.isAuthented = true;
      } else {
        state.isAuthented = false;
      }
    });
  },
});

export const login = createAsyncThunk(
  "auth/login",
  async (username: string): Promise<AuthRespone> => {
    const response = await authServices.login(username);
    if (response.data) {

      const expiredDate = dayjs(Number(response.data.expiresIn) * 1000).toDate();

      Cookies.set(cookieConstants.TOKEN_KEY, response.data.accessToken, {
        expires: expiredDate,
        secure: true, // ใช้ HTTPS
        sameSite: "strict",
      });
    }
    return response.data;
  }
);

export const isAuthentedSelector = (store: RootState): any =>
  store.authReducer.isAuthented;

// export const {} = authSlice.actions;

export default authSlice.reducer;
