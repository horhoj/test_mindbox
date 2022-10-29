import { FC } from 'react';
import { P404page } from '../pages/P404page';
import { TodoListPage } from '../pages/TodoListPage';
import { AboutPage } from '../pages/AboutPage';

interface RouteItem {
  path: string;
  component: FC;
}

export const routeNameList = ['TodoList', 'About', 'Page404'] as const;

export type Routes = typeof routeNameList[number];

export const routeList: Record<Routes, RouteItem> = {
  TodoList: {
    path: '/todo-list',
    component: TodoListPage,
  },

  About: {
    path: '/about',
    component: AboutPage,
  },

  Page404: {
    path: '*',
    component: P404page,
  },
};
