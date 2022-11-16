import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import GamePage from '../views/GamePage.vue'
import LobbyPage from '../views/LobbyPage.vue'

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
    path: '/game/',
    component: GamePage,
    children: [
      {
        path: '',
        redirect: '/game/MainGamePage'
      },
      {
        path: 'MainGamePage',
        component: () => import('@/views/Game/MainGamePage.vue')
      },
      {
        path: 'HistoryPage',
        component: () => import('@/views/Game/HistoryPage.vue')
      },
      {
        path: 'DataPage',
        component: () => import('@/views/Game/DataPage.vue')
      }
    ]
  },
  {
    path: '/lobby/',
    component: LobbyPage,
    children: [
      {
        path: '',
        redirect: '/lobby/PlayersPage'
      },
      {
        path: 'PlayersPage',
        component: () => import('@/views/Lobby/PlayersPage.vue')
      },
      {
        path: 'SettingsPage',
        component: () => import('@/views/Lobby/SettingsPage.vue')
      },
      {
        path: 'ControlPage',
        component: () => import('@/views/Lobby/ControlPage.vue')
      },
      {
        path: 'EventsPage',
        component: () => import('@/views/Lobby/EventsPage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
