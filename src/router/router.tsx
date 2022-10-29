import { FC } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { routeList, routeNameList } from './routeList';
import { RedirectExecutor } from './RedirectExecutor';
import { getRoutePath } from './helpers';

export const Router: FC = () => {
  return (
    <>
      <Routes>
        <Route
          path={'/'}
          element={<Navigate to={getRoutePath('TodoList')} />}
        />
        {routeNameList.map((routeName) => {
          const route = routeList[routeName];
          return (
            <Route
              path={route.path}
              key={routeName}
              element={<route.component />}
            />
          );
        })}
      </Routes>
      <RedirectExecutor />
    </>
  );
};
