import { createStore } from 'vuex'
import { userModule } from './user';
import {alertController, toastController} from "@ionic/vue";
import { api } from '@/api';

export default createStore({
  state: {
    template: null,
    newTemplate: false,
    lobby: null,
    newLobby: false,
  },
  getters: {
    template: (state) => state.template,
    lobby: (state) => state.lobby,
    isNewTemplate: (state) => state.newTemplate,
    isNewLobby: (state) => state.newLobby,
  },
  mutations: {
    setTemplate(state, payload) {
      state.template = payload
    },
    setLobby(state, payload) {
      state.lobby =  payload
    },
    resetNewTemplate(state) {
      state.newTemplate = false
    },
    resetNewLobby(state) {
      console.log("reseting new lobby")
      state.newLobby = false
    },
    startCreatingTemplate(state) {
      console.log("creating new template")
      state.newTemplate = true
      let template = {
        name: "XD",
        max_players: 4,
        settings: {
          max_rounds: 2,
          resource_basic_price: 15,
          show_stats_for_users: true,
          unlimited_money: false,
          user_classes: [1],
          start_money: {1:100},
          start_magazine: {1: 100},
          resource_price: {1:10},
          transport_cost: {1:2},
          magazine_cost: {1:1},
          fix_order_cost: {1:1},
          back_order_cost: {1:1},
          additional_cost: {1:0},
          start_order_queue: {1:[4,4]},
          demand_style: {
            type: 'Linear',
            start: 10,
            increase: 5,
          },
          supply_style: {
            type: 'Linear',
            start: 10,
            increase: 5,
          }
        },
        events: {
          events: []
        }
      }
      state.template = template
    },
    startCreatingLobby(state) {
      console.log("startCreatingLobby")
      let lobby = {
        id: "xd",
        public: true,
        max_players: 4,
        code_use_times: 4,
        settings: {
          max_rounds: 2,
          resource_basic_price: 15,
          show_stats_for_users: true,
          unlimited_money: false,
          user_classes: [1],
          start_money: {1:100},
          start_magazine: {1: 100},
          resource_price: {1:10},
          transport_cost: {1:2},
          magazine_cost: {1:1},
          fix_order_cost: {1:1},
          back_order_cost: {1:1},
          additional_cost: {1:0},
          start_order_queue: {1:[4,4]},
          demand_style: {
            type: 'Linear',
            start: 10,
            increase: 5,
          },
          supply_style: {
            type: 'Linear',
            start: 10,
            increase: 5,
          }
        },
        events: {
          events: []
        }
      }
      state.lobby = lobby
      state.newLobby = true
      return state.lobby
    },
  },
  actions: {
    async alert(context, text, header = "Alert") {
      const alert = await alertController.create({
        header: header,
        message: text,
        buttons: ['OK'],
      });

      await alert.present();
    },
    async toast(context, text) {
      const toast = await toastController.create({
        message: text,
        duration: 1500,
        position: 'middle'
      });

      await toast.present();
    },
    async connectPlayer(context, id) {
      console.log("connect player", id)
    },
    async quickConnect(context, code) {
      console.log("quick connect", code)
    },
    async updateLobby(context, payload) {
      context.state.lobby = payload
      console.log("update lobby ")
    },
    async createLobby(context) {
      console.log("create lobby")
      //TODO: handle error
      let template = await (await api.createLobby(context.getters["token"], context.state.lobby)).data
      context.state.newLobby = false
      return context.state.lobby
    },
    async startGame(context) {
      console.log("starting a game")
    },
    async deleteLobby(context) {
      console.log("deleting lobby")
    },
    async updateTemplate(context, payload) {
      console.log("update template", payload)
      context.state.template = await (await api.modifyTemplate(context.getters["token"], payload.id, payload)).data
      return context.state.template
    },
    async createTemplate(context) {
      //TODO: handle error
      let template = await (await api.createTemplate(context.getters["token"], context.state.template)).data
      context.state.template = template
      return template
    },
    async deleteTemplate(context) {
      context.state.template = null
      context.state.newTemplate = false
    },
    async updateTemplateEvents(context, payload) {
      context.state.template.events.events = payload
      console.log("update template events")
    },
    async updateLobbyEvents(context, payload) {
      context.state.lobby.events.events = payload
      console.log("update lobby events")
    },
    async fetchLobby(context, id) {
      console.log("Fetching lobby")
      let lobby = await (await api.fetchLobby(context.getters["token"], id)).data
      context.state.lobby = lobby
      context.state.newLobby = false
      return context.state.lobby
    },
    async fetchTemplate(context, id) {
      console.log("Fetching template")
      let template = await (await api.fetchTemplate(context.getters["token"], id)).data
      context.state.template = template
      context.state.newTemplate = false
      return context.state.template
    },
  },
  modules: {
    user: userModule

  }
})
