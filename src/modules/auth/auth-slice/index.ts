import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthResponse } from '../models';

const initialState: IAuthResponse = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IAuthResponse>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    setToken: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) => {
      state.token = action.payload;
    },
  },
});

export const { setUser, logout, setToken } = authSlice.actions;

export default authSlice.reducer;
