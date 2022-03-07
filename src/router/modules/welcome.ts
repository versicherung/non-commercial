import { RouteRecordRaw } from 'vue-router';

const welcomeRoute: RouteRecordRaw[] = [
  {
    path: 'welcome',
    name: 'welcome',
    component: () => import('@/pages/welcome/index.vue'),
    meta: {
      icon: 'dashboard',
      requiresAuth: false,
      name: '欢迎',
    },
  },
];

export default welcomeRoute;
