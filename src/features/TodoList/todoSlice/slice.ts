import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterType, Todo } from '../types';
import { defaultData } from '../defaultData';
import { SLICE_NAME } from './types';

interface InitialItem {
  todoList: Todo[];
  filterType: FilterType;
}

const initialState: InitialItem = {
  todoList: [...defaultData],
  filterType: 'all',
};

export const { actions, reducer } = createSlice({
  initialState,
  name: SLICE_NAME,
  reducers: {
    toggleIsComplete: (state, action: PayloadAction<string>) => {
      const idx = state.todoList.findIndex(
        (todo) => todo.id === action.payload,
      );
      if (idx >= 0) {
        const currentTodo = state.todoList[idx];
        if (currentTodo) {
          state.todoList[idx] = {
            ...currentTodo,
            isComplete: !currentTodo.isComplete,
          };
        }
      }
    },

    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todoList.unshift(action.payload);
    },

    patchTodo: (state, action: PayloadAction<Todo>) => {
      const idx = state.todoList.findIndex(
        (todo) => todo.id === action.payload.id,
      );
      if (idx >= 0) {
        const currentTodo = state.todoList[idx];
        if (currentTodo) {
          state.todoList[idx] = {
            ...action.payload,
          };
        }
      }
    },

    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todoList = state.todoList.filter(
        (todo) => todo.id !== action.payload,
      );
    },

    clearCompleted: (state) => {
      state.todoList = state.todoList.filter(
        (todo) => todo.isComplete === false,
      );
    },

    setFilterType: (state, action: PayloadAction<FilterType>) => {
      state.filterType = action.payload;
    },
  },
});
