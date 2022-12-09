import { createStore } from 'vuex'
import { userModule } from './user';
import {alertController, toastController} from "@ionic/vue";

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
        settings: {
          max_rounds: 2,
          resource_basic_price: 15,
          show_stats_for_users: true,
          unlimited_money: false,
          user_classes: [1],
          start_money: {1:100},
          resource_price: {1:10},
          transport_cost: {1:2},
          magazine_cost: {1:1},
          fix_order_cost: {1:1},
          back_order_cost: {1:1},
          additional_cost: {1:0},
          start_order_queue: {1:[4,4]},
          demand: {
            type: 'Linear',
            start: 10,
            increase: 5,
          },
          supply: {
            type: 'Linear',
            start: 10,
            increase: 5,
          }
        },
        events: []
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
          resource_price: {1:10},
          transport_cost: {1:2},
          magazine_cost: {1:1},
          fix_order_cost: {1:1},
          back_order_cost: {1:1},
          additional_cost: {1:0},
          start_order_queue: {1:[4,4]},
          demand: {
            type: 'Linear',
            start: 10,
            increase: 5,
          },
          supply: {
            type: 'Linear',
            start: 10,
            increase: 5,
          }
        },
        events: []
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
      context.state.template = payload
      console.log("update template")
      return payload
    },
    async createTemplate(context, payload) {
      context.state.template = payload
      return payload
    },
    async deleteTemplate(context) {
      context.state.template = null
      context.state.newTemplate = false
    },
    async updateTemplateEvents(context, payload) {
      context.state.template.events = payload
      console.log("update template events")
    },
    async updateLobbyEvents(context, payload) {
      context.state.lobby.events = payload
      console.log("update lobby events")
    },
    async fetchLobby(context, id) {
      console.log("Fetiching lobby")
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
          resource_price: {1:10},
          transport_cost: {1:2},
          magazine_cost: {1:1},
          fix_order_cost: {1:1},
          back_order_cost: {1:1},
          additional_cost: {1:0},
          start_order_queue: {1:[4,4]},
          demand: {
            type: 'Linear',
            start: 10,
            increase: 5,
          },
          supply: {
            type: 'Linear',
            start: 10,
            increase: 5,
          }
        },
        events: []
      }
      context.state.lobby = lobby
      context.state.newLobby = false
      return context.state.lobby
    },
    async fetchTemplate(context, id) {
      console.log("Fetiching template")
      let template = {
        id: "xd",
        name: "XD",
        settings: {
          max_rounds: 2,
          resource_basic_price: 15,
          show_stats_for_users: true,
          unlimited_money: false,
          user_classes: [1],
          start_money: {1:100},
          resource_price: {1:10},
          transport_cost: {1:2},
          magazine_cost: {1:1},
          fix_order_cost: {1:1},
          back_order_cost: {1:1},
          additional_cost: {1:0},
          start_order_queue: {1:[4,4]},
          demand: {
            type: 'Linear',
            start: 10,
            increase: 5,
          },
          supply: {
            type: 'Linear',
            start: 10,
            increase: 5,
          }
        },
        events: []
      }
      context.state.template = template
      context.state.newTemplate = false
      return context.state.template
    },
  },
  modules: {
    user: userModule

  }
})
