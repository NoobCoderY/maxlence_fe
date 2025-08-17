import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { redirect } from 'react-router-dom';
import {User} from '../models/index';

const initialState: { users: User[] } = {
    users:[]
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAllUser: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      redirect('/');
    },
  },
});

export const { setAllUser } = userSlice.actions;

export default userSlice.reducer;
