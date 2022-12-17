import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import GamePage from '../views/GamePage.vue'
import LobbyPage from '../views/LobbyPage.vue'
import Templates from "../views/TemplatesPage.vue"
import Template from "../views/TemplatePage.vue"
import store from '@/store'

const enterGuard = async (to, from, next) => {
  if (store.getters["isLoggedIn"] == null)
    await store.dispatch("actionCheckLoggedIn")
  if (!store.getters["isLoggedIn"]) {
    next({ name: "Login" })
  } else next()
}

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/LoginPage.vue')
  },
  {
    path: '/home/',
    name: 'Home',
    beforeEnter: enterGuard,
    component: () => import('@/views/MainPage.vue')
  },
  {
    path: '/account/',
    name: 'Account',
    beforeEnter: enterGuard,
    component: () => import('@/views/AccountPage.vue')
  },
  {
    path: '/quick_connect/',
    name: 'QuickConnect',
    beforeEnter: enterGuard,
    component: () => import('@/views/QuickConnectPage.vue')
  },
  {
    path: '/game/',
    name: 'Game',
    component: GamePage,
    beforeEnter: enterGuard,
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
    name: 'Lobby',
    beforeEnter: enterGuard,
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
    name: 'Templates',
    beforeEnter: enterGuard,
    props: true
  },
  {
    path: '/template/:id',
    component: Template,
    props: true,
    name: 'Template',
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
