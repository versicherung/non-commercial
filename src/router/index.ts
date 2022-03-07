import { createRouter, createWebHashHistory } from 'vue-router';
import PageLayout from '@/components/Layout/index.vue';
import appRoutes from './modules';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: 'login',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login/index.vue'),
      meta: {
        title: '',
        requiresAuth: false,
      },
    },
    {
      name: 'root',
      path: '/',
      component: PageLayout,
      children: appRoutes,
    },
  ],
});

export default router;
