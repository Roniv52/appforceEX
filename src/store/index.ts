import { configureStore } from '@reduxjs/toolkit';
import reducers, * as Actions from './reducers';

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

//state
export type Store = ReturnType<typeof store.getState>;
export default store;

//Actions
export const rootActions = Actions;
