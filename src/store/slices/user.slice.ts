import * as userServices from "../../services/user.services";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Payload } from "../../types/payload.type";

export interface UserState {}

const initialState: UserState = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const register = createAsyncThunk(
  "user/register",
  async (payload: Payload<any>): Promise<any> => {
    try {
      const response = await userServices.register(payload);
      return response;
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }
);

// export const remainingPackageSelector = (store: RootState): any =>
//   store.userReducer.remainingPackage;

// export const {} = userSlice.actions;

export default userSlice.reducer;
