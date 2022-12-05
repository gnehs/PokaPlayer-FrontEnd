import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: '/',
    name: 'app',
    component: () => import('../App.vue'),
    children: [
      {
        path: '/',
        name: 'default-layout',
        component: () => import('../layouts/default.vue'),
        children: [
          {
            path: '/',
            name: 'Library',
            component: () => import('../pages/Library.vue')
          }
        ]
      }]
  }]
})

export default router
