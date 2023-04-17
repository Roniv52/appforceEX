import { User, userEdit } from './../../models/User';
import {
  createReducer,
  createAsyncThunk,
  createAction,
} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import getusers from './../../utils/getUsers';
import { v4 as uuidv4 } from 'uuid';

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

export const addUsers = createAction('users/addUsers', (user: User) => {
  return {
    payload: {
      user,
    },
  };
});

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
    .addCase(addUsers, (state, action) => {
      console.log(action.payload.user);
      let id = uuidv4();
      if (!state.users.find((user) => user.email === action.payload.email)) {
        alert('user email should be unique!');
        return { ...state };
      }
      return {
        ...state,
        users: [
          ...state.users,
          {
            ...action.payload.user,
            login: { ...action.payload.user.login, uuid: id },
          },
        ],
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
