import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import GamePage from '../views/GamePage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/views/WelcomePage.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/LoginPage.vue')
  },
  {
    path: '/app/',
    component: () => import('@/views/MainPage.vue')
  },
  {
    path: '/tabs/',
    component: GamePage,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1'
      },
      {
        path: 'MainGamePage',
        component: () => import('@/views/Game/MainGamePage.vue')
      },
      {
        path: 'tab2',
        component: () => import('@/views/Game/HistoryPage.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/views/Game/DataPage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
