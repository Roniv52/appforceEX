import { createSlice } from '@reduxjs/toolkit';
import type { PayloadActions } from '@reduxjs/toolkit';

interface user {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: string;
      name: string;
    };
    city: string;
    country: string;
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
  };
  picture: {
    medium: string;
  };
}

const initialState: Partial<user> = {};

const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    updateUser: (state, action: PayloadActions<user>) => {
      state = action.payload;
    },
  },
});
