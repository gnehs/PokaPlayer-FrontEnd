import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: '/',
    name: 'app',
    component: () => import('../App.vue'),
    children: [{
      path: '/',
      name: 'default-layout',
      component: () => import('../layouts/default.vue'),
      children: [
        {
          path: '/',
          name: 'Library',
          component: () => import('../pages/Library.vue')
        },
        {
          path: '/settings',
          name: 'Settings',
          component: () => import('../pages/settings/Index.vue')
        },
        // 404
        {
          path: '/:pathMatch(.*)*',
          name: '404',
          component: () => import('../pages/404.vue')
        }
      ]
    }, {
      path: '/',
      name: 'empty-layout',
      component: () => import('../layouts/empty.vue'),
      children: [
        {
          path: '/login',
          name: 'Login',
          component: () => import('../pages/Login.vue')
        },
      ]
    }]
  }]
})

export default router
