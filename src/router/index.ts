import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import DashboardLayout from '@/components/layout/DashboardLayout.vue';

import AuthenticationPage from '@/pages/AuthenticationPage.vue';
import ProductManagePage from '@/pages/ProductManagePage.vue';
import ReserveManagePage from '@/pages/ReserveManagePage.vue';
import TeamManagePage from '@/pages/TeamManagePage.vue';

import { useUserStore } from '@/stores';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:catchAll(.*)',
    redirect: '/reserve-manage',
  },
  {
    path: '/auth',
    name: 'authentication',
    component: AuthenticationPage,
    meta: {
      title: '驗證',
    },
  },
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/reserve-manage',
    children: [
      {
        path: '/reserve-manage',
        component: ReserveManagePage,
        name: 'reserveManage',
        meta: {
          title: '預約管理',
        },
      },

      {
        path: '/product-manage',
        name: 'productManage',
        component: ProductManagePage,
        meta: {
          title: '會議室管理',
        },
      },

      {
        path: '/team-manage',
        component: TeamManagePage,
        name: 'teamManage',
        meta: {
          title: '團隊管理',
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 全局路由守衛 攔截所有路由
router.beforeEach((to, _, next) => {
  // 取得token
  const { getToken } = useUserStore();
  const token = getToken();

  // 有token
  if (token) {
    // 放行
    return next();
  }
  // 否則沒有token
  // 如果去的登陸
  if (to.path === '/auth') {
    // 放行
    return next();
  }
  // 如果去的是其他頁,跳轉到登陸
  return next({ path: '/auth' });
});

export default router;
