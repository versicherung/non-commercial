import { lazy, useMemo, useCallback, FC } from 'react';
import { RouteObject } from 'react-router-dom';
import { IconFire } from '@arco-design/web-react/icon';
import auth, { AuthParams, UserPermission } from './utils/authentication';

export type RouteType = AuthParams &
  RouteObject & {
    path: string;
    name: string;
    breadcrumb?: boolean;
    children?: RouteType[];
    icon?: FC<any>;
  };

export const routes: RouteType[] = [
  {
    name: '欢迎',
    path: 'welcome',
    icon: IconFire,
    children: [
      {
        path: 'example',
        name: 'Welcome',
        element: lazy(() => import('@/pages/welcome')),
      },
    ],
  },
];

const useRoute = (userPermission: UserPermission): [RouteType[], string] => {
  const filterRoute = useCallback(
    (routes: RouteType[], arr: RouteType[] = []): RouteType[] => {
      if (!routes.length) {
        return [];
      }
      for (const route of routes) {
        const { requiredPermissions, oneOfPerm } = route;
        let visible = true;
        if (requiredPermissions) {
          visible = auth({ requiredPermissions, oneOfPerm }, userPermission);
        }

        if (!visible) {
          continue;
        }
        if (route.children && route.children.length) {
          const newRoute = { ...route, children: [] };
          filterRoute(route.children, newRoute.children);
          if (newRoute.children.length) {
            arr.push(newRoute);
          }
        } else {
          arr.push({ ...route });
        }
      }

      return arr;
    },
    [userPermission]
  );

  const permissionRoute = useMemo(() => filterRoute(routes), [filterRoute]);

  const defaultRoute = useMemo(() => {
    const first = permissionRoute[0];
    if (first) {
      const firstRoute = first?.children?.[0]?.path || first.path;
      return firstRoute;
    }
    return '';
  }, [permissionRoute]);

  return [permissionRoute, defaultRoute];
};

export default useRoute;
