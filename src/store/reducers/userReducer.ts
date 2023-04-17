import { User, userEdit } from './../../models/User';
import {
  createReducer,
  createAsyncThunk,
  createAction,
} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import getusers from './../../utils/getUsers';

interface usersReducer {
  users: User[];
}

const initialState: usersReducer = {
  users: [],
};

export const getUsers = createAsyncThunk('users/getUsers', async () => {
  const users = await getusers();
  return {
    users,
  };
});

export const updateUsers = createAction(
  'users/updateUsers',
  (id: string, editable: userEdit) => {
    console.log('aa');
    return {
      payload: {
        id,
        editable,
      },
    };
  }
);
export const deleteUsers = createAction('users/deleteUsers', (id: string) => {
  return {
    payload: {
      id,
    },
  };
});

const reducer = createReducer<usersReducer>(initialState, (builder) => {
  builder
    .addCase(getUsers.fulfilled, (state, action) => {
      console.log(action.payload.users);

      return {
        users: [...action.payload.users],
      };
    })
    .addCase(deleteUsers, (state, action) => {
      const users = [
        ...state.users.filter((user) => user.login.uuid !== action.payload.id),
      ];

      return {
        ...state,
        users: users,
      };
    })
    .addCase(updateUsers, (state, action) => {
      console.log('aaaaa');
      let user = state.users.find(
        (user) => user.login.uuid === action.payload.id
      );

      if (!user) return;

      const updatedUser = {
        ...user,
        ...action.payload.editable,
      };
      const updatedUsers = [
        ...state.users.filter((user) => user.login.uuid !== action.payload.id),
        updatedUser,
      ];
      return {
        ...state,
        users: updatedUsers,
      };
    });
});

export default reducer;
