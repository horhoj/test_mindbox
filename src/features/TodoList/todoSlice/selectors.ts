import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../store/types';
import { FilterType, Todo } from '../types';

export const getTodoList = (state: RootState): Todo[] => state.todo.todoList;

export const getFilterType = (state: RootState): FilterType =>
  state.todo.filterType;

export const getFilteredTodoList = createSelector(
  getTodoList,
  getFilterType,
  (todoList, filterType): Todo[] => {
    if (filterType === 'completed') {
      return todoList.filter((todo) => todo.isComplete === true);
    }
    if (filterType === 'active') {
      return todoList.filter((todo) => todo.isComplete === false);
    }
    return todoList;
  },
);
