import { createAsyncThunk } from '@reduxjs/toolkit';
import { user } from './../../models/user';
import getUsers from './../../utils/getUsers';

export const getusers = createAsyncThunk('user/getuser', async () => ({
  users: await getUsers(),
}));
