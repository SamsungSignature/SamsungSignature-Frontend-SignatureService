import {configureStore} from '@reduxjs/toolkit';
import card from './slices/card';
import example from './slices/example';
import linking from './slices/linking';
import user from './slices/user';

const reducer = {
  example,
  user,
  card,
  linking,
};

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
