import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import GamePage from '../views/GamePage.vue'
import LobbyPage from '../views/LobbyPage.vue'
import Templates from "../views/TemplatesPage.vue"
import Template from "../views/TemplatePage.vue"

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
    component: () => import('@/views/TemplatePage.vue')
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
    path: '/lobby/:id',
    component: LobbyPage,
    props: true,
    children: [
      {
        path: '',
        redirect: '/lobby/:id/Settings'
      },
      {
        path: 'Players',
        component: () => import('@/views/Lobby/PlayersPage.vue')
      },
      {
        path: 'Settings',
        component: () => import('@/views/Lobby/SettingsPage.vue')
      },
      {
        path: 'Control',
        component: () => import('@/views/Lobby/ControlPage.vue')
      },
      {
        path: 'Events',
        component: () => import('@/views/Lobby/EventsPage.vue')
      }
    ]
  },
  {
    path: '/yourtemplates/',
    component: Templates,
    props: true
  },
  {
    path: '/template/:id',
    component: Template,
    props: true,
    children: [
      {
        path: '',
        redirect: '/template/:id/Settings'
      },
      {
        path: 'Settings',
        component: () => import('@/views/Template/SettingsPage.vue')
      },
      {
        path: 'Events',
        component: () => import('@/views/Template/EventsPage.vue')
      },
      {
        path: 'Control',
        component: () => import('@/views/Template/ControlPage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
