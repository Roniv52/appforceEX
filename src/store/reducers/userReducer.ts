import { user } from './../../models/user';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getusers } from './../reducers/userAction';

const initialState: Partial<user> = {};

const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    updateUser: (state, action: PayloadAction<user>) => {
      state = action.payload;
    },
    getusers: (state, getusers: PayloadAction<user>) => {
      state = getusers.payload;
    },
  },
});
