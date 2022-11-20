import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import GamePage from '../views/GamePage.vue'
import LobbyPage from '../views/LobbyPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/views/LoginPage.vue')
  },
  {
    path: '/home/',
    component: () => import('@/views/MainPage.vue')
  },
  {
    path: '/account/',
    component: () => import('@/views/AccountPage.vue')
  },
  {
    path: '/templates/',
    component: () => import('@/views/TemplatesPage.vue')
  },
  {
    path: '/quick_connect/',
    component: () => import('@/views/QuickConnectPage.vue')
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
    path: '/create_lobby/',
    component: LobbyPage,
    children: [
      {
        path: '',
        redirect: '/create_lobby/PlayersPage'
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
