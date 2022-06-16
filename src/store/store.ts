import { configureStore } from '@reduxjs/toolkit';
import { todoSlice } from '../features/TodoList/todoSlice';
import { appSlice } from './app';

export const store = configureStore({
  devTools: true,
  reducer: {
    app: appSlice.reducer,
    todo: todoSlice.reducer,
  },
});
