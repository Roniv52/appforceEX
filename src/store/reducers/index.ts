import userReducer, * as userActions from './userReducer';

export default {
  users: userReducer,
};

export const { updateUsers, getUsers } = userActions;
