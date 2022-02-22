import { useEffect, useMemo, useState } from 'react';
import auth, { AuthParams, UserPermission } from './utils/authentication';

export type Route = AuthParams & {
  name: string;
  key: string;
  breadcrumb?: boolean;
  children?: Route[];
};

export const routes: Route[] = [
  {
    name: 'Welcome',
    key: 'welcome',
  },
];

export const getRoute = (path: string, routes: Route[]): Route | undefined => {
  return routes.find((item) => {
    const itemPath = `/${item.key}`;
    if (path === itemPath) {
      return item.name;
    } else if (item.children) {
      return getRoute(path, item.children);
    }
  });
};

const useRoute = (userPermission?: UserPermission): [Route[], string] => {
  const filterRoute = (routes: Route[], arr: Route[] = []): Route[] => {
    if (!routes.length) {
      return [];
    }

    for (const route of routes) {
      const { requiredPermissions, oneOfPerm } = route;
      let visible = true;
      if (requiredPermissions && userPermission) {
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
  };

  const [permissionRoute, setPermissionRoute] = useState(routes);

  useEffect(() => {
    const newRoutes = filterRoute(routes);
    setPermissionRoute(newRoutes);
  }, [userPermission]);

  const defaultRoute = useMemo(() => {
    const first = permissionRoute[0];
    if (first) {
      const firstRoute = first?.children?.[0]?.key || first.key;
      return firstRoute;
    }
    return '';
  }, [permissionRoute]);

  return [permissionRoute, defaultRoute];
};

export default useRoute;
