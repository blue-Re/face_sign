import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Sign',
    component: () => import( '../views/Sign.vue')
  },
  {
    path: '/stat',
    name: 'Stat',
    component: () => import( '../views/Stat.vue')
  },
  {
    path: '/mine',
    name: 'Mine',
    component: () => import( '../views/Mine.vue')
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import( '../views/Test.vue')
  },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
