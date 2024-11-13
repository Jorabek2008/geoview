import { RouteType } from '@/types';
import { Route } from 'react-router-dom';

export const AppRouter = (routes: RouteType[]) =>
  routes.map((route) => (
    <Route
      key={route.path}
      path={route.path}
      {...(route.element ? { element: <>{route.element}</> } : {})}
      children={route.children ? AppRouter(route.children) : <></>}
    />
  ));
