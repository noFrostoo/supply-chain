import { createStore } from 'vuex'
import { userModule } from './user';
import {alertController, toastController} from "@ionic/vue";
import { api } from '@/api';
import { utils } from '@/utlis'

export default createStore({
  state: {
    template: null,
    newTemplate: false,
    lobby: null,
    newLobby: false,
    players: [],
    userClasses: null,
    lobbyOwner: null,
  },
  getters: {
    template: (state) => state.template,
    lobby: (state) => state.lobby,
    isNewTemplate: (state) => state.newTemplate,
    isNewLobby: (state) => state.newLobby,
    players: (state) => state.players,
    userClasses: (state) => state.userClasses
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
    addDefaultClass(state) {
      state.lobby.settings.user_classes.push(1)
    },
    setUserClasses(state, payload) {
      state.userClasses = payload
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
    async connectPlayer(context, id, password=null) {
      //TODO, handle error
      await api.connect(context.getters["token"], context.getters["id"], id, password)
      context.commit("setGameId", id)
      //TODO: handle ws
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
    async updateTemplate(context) {
      console.log("update template", context.state.template)
      context.state.template = await (await api.modifyTemplate(context.getters["token"], context.state.template.id, context.state.template)).data
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
      let events = []
      for (let event of payload) {
        let actions = []
        for (let action of event.actions) {
          let fAction = utils.removeEmptyRecursive(action)
          actions.push(fAction)
        }
        let filtered = utils.removeEmpty(event)
        filtered.actions = actions
        console.log(filtered)
        events.push(filtered)
      }
      context.state.template.events.events = events
      console.log("update template events")
    },
    async updateLobbyEvents(context, payload) {
      let events = []
      for (let event of payload) {
        let filtered = utils.removeEmpty(event)
        console.log(filtered)
        events.push(filtered)
      }
      context.state.lobby.events.events = events
      console.log("update lobby events")
    },
    async fetchLobby(context, id) {
      console.log("Fetching lobby")
      let lobbyResponse = await (await api.fetchLobby(context.getters["token"], id)).data
      console.log("lobby response", lobbyResponse)
      context.state.lobby = lobbyResponse.lobby
      context.state.players = lobbyResponse.players
      context.state.lobbyOwner = lobbyResponse.owner
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
