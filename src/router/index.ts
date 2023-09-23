import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import LoginPage from '@/pages/LoginPage.vue';
import ManagePage from '@/pages/ManagePage.vue';
import ReservePage from '@/pages/ReservePage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:catchAll(.*)',
    redirect: '/managePage',
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
    meta: {
      title: 'LoginPage',
    },
  },
  {
    path: '/managePage',
    name: 'ManagePage',
    component: ManagePage,
    meta: {
      title: 'ManagePage',
    },
  },
  {
    path: '/reservePage',
    component: ReservePage,
    name: 'reservePage',
    meta: {
      title: 'ReservePage',
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
