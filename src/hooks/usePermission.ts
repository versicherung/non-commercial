import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router';

const usePermission = () => {
  return {
    accessRouter(route: RouteLocationNormalized | RouteRecordRaw) {
      return !route.meta?.requiresAuth || !route.meta.roles;
    },
  };
};

export default usePermission;
