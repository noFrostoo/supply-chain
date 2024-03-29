import { createStore } from 'vuex'
import { userModule } from './user';
import {alertController, toastController} from "@ionic/vue";
import { api } from '@/api';
import { utils } from '@/utlis'
import { createWebSockets } from '@/ws';
import router from '@/router';

export default createStore({
  state: {
    template: null,
    newTemplate: false,

    lobby: null,
    newLobby: false,
    players: [],
    userClasses: null,
    lobbyOwner: null,

    ws: null,

    gameRunning: false,
    player_states: null,
    player_state: null,
    flow: null,
    recipient: null,
    round: null,
    settings: null,
    owner: null,
    amIOwner: false,
    history: [],
    roundSummary: {
    },
    newRound: false,
    roundFinish: false,
    confirmRound: false,
    gameEnd: false,
    events: [],
    endingStats: null
  },
  getters: {
    template: (state) => state.template,
    lobby: (state) => state.lobby,
    isNewTemplate: (state) => state.newTemplate,
    isNewLobby: (state) => state.newLobby,
    players: (state) => state.players,
    userClasses: (state) => state.userClasses,
    playerStates: (state) => state.player_states,
    playerState: (state) => state.player_state,
    amIOwner: (state) => state.amIOwner,
    history: (state) => state.history,
    roundFinish: (state) => state.roundFinish,
    newRound: (state) => state.newRound,
    confirmRound: (state) => state.confirmRound,
    gameEnd: (state) => state.gameEnd,
    events: (state) => state.events,
    endingStats: (state) => state.endingStats,
    roundSummary: (state) => state.roundSummary,
    round: (state) => state.round,
    owner: (state) => state.owner
  },
  mutations: {
    setWs(state, ws) {
      state.ws = ws
    },
    setOwner(state, payload) {
      state.owner = payload
    },
    setPlayer(state, payload) {
      state.players = payload
    },
    setTemplate(state, payload) {
      state.template = payload
    },
    setLobby(state, payload) {
      state.lobby =  payload
    },
    setSettings(state, payload) {
      state.lobby.settings = payload
    },
    resetNewTemplate(state) {
      state.newTemplate = false
    },
    resetNewLobby(state) {
      console.log("reseting new lobby")
      state.newLobby = false
    },
    popCurrentEvent(state) {
      state.events.shift()
    },
    newRoundStarted(state) {
      state.newRound = false
    },
    confirmEndingRound(state) {
      console.log("confirming round ")
      state.confirmRound = false
      state.roundFinish = true
    },
    gameEnd(state, payload) {
      state.gameEnd = true
      state.endingStats = payload
      state.ws.close()
    },
    resetGameEnd(state) {
      state.gameEnd = false
    },
    addEvent(state, payload) {
      state.events.push(payload)
    },
    addDefaultClass(state) {
      state.lobby.settings.user_classes.push(1)
    },
    setUserClasses(state, payload) {
      state.userClasses = payload
    },
    leaveTemplate(state) {
      console.log("leaving template")
      state.template = null
      state.newTemplate = false
    },
    leaveLobby(state) {
      console.log("leaving lobby")
      state.lobby = null
      state.players = null
      state.lobbyOwner = null
      state.userClasses = null
      state.newLobby = false
      state.owner = null
      state.history = null
    },
    createLobby(state, lobbyResponse) {
      console.log("create lobby")
      state.lobby = lobbyResponse.lobby
      state.players = lobbyResponse.players
      state.owner = lobbyResponse.owner
      state.newLobby = false
      return lobbyResponse.lobby
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
          start_money: {1:100000},
          start_magazine: {1: 10},
          resource_price: {1:1},
          transport_cost: {1:2},
          magazine_cost: {1:1},
          fix_order_cost: {1:1},
          back_order_cost: {1:1},
          additional_cost: {1:0},
          incoming_start_queue: {1:[4,4]},
          requested_start_queue: {1:[3,3]},
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
        generate_connect_code: false,
        settings: {
          max_rounds: 2,
          resource_basic_price: 15,
          show_stats_for_users: true,
          unlimited_money: false,
          user_classes: [1],
          start_money: {1:100000},
          start_magazine: {1: 10},
          resource_price: {1:1},
          transport_cost: {1:2},
          magazine_cost: {1:1},
          fix_order_cost: {1:1},
          back_order_cost: {1:1},
          additional_cost: {1:0},
          incoming_start_queue: {1:[4,4]},
          requested_start_queue: {1:[3,3]},
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
        duration: 3500,
        position: 'top',
        buttons: [
          {
            text: 'Dismiss',
            role: 'cancel',
            handler: () => { this.handlerMessage = 'Dismiss clicked'; }
          }
        ]
      });

      await toast.present();
    },
    async connectPlayer(context, id, password=null) {
      //TODO, handle error
      await api.connect(context.getters["token"], context.getters["id"], id, password)
      context.commit("setGameId", id)
      context.commit("setWs", createWebSockets(context.getters["token"])) 
      console.log("connect player", id)
    },
    async quickConnect(context, code) {
      console.log("quick connect", code)
    },
    async updateLobby(context, payload) {
      context.state.lobby = payload
      if (!context.state.newLobby) {
        let lobbyResponse = await (await api.modifyLobby(context.getters["token"], context.state.lobby.id, context.state.lobby)).data
        context.state.lobby = lobbyResponse.lobby
        context.state.players = lobbyResponse.players
        context.state.owner = lobbyResponse.owner
      }
      console.log("update lobby ")
    },
    async updateClass(context, payload) {
      context.state.userClasses[payload.id] = payload.value
      
      context.state.ws.send(JSON.stringify({
        UpdateClasses: context.state.userClasses
      }))
    },
    async deleteLobby(context) {
      console.log("deleting lobby")
      await api.deleteLobby(context.getters["token"], context.state.lobby.id)
      context.state.lobby = null
      context.state.players = null
      context.state.owner = null
      context.state.newLobby = false
      context.state.userClasses = null
      context.state.owner = null
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
      context.state.newTemplate = false
      return template
    },
    async deleteTemplate(context) {
      await api.deleteTemplate(context.getters["token"], context.state.template.id)
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
      console.log(events)
      context.state.lobby.events.events = [...events]
      console.log("update lobby events")
      console.log(context.state.lobby.events.events)
    },
    async fetchLobby(context, id) {
      console.log("Fetching lobby")
      let lobbyResponse = await (await api.fetchLobby(context.getters["token"], id)).data
      console.log("lobby response", lobbyResponse)
      context.state.lobby = lobbyResponse.lobby
      context.state.players = lobbyResponse.players
      context.state.owner = lobbyResponse.owner
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

    async startGamePlayer(context, payload) {
      console.log("starting a game player", payload)
      context.state.gameRunning = true
      processRoundStart(context, payload);

      router.push("/game/")
    },
    async sendEndRound(context, payload) {
      let c = context.state.userClasses[context.getters["id"]]
      let obj = JSON.stringify({
        RoundEnd: {
          placed_order: {
            recipient: context.state.flow.flow[context.getters["id"]] ? context.state.flow.flow[context.getters["id"]]: "null" ,
            sender: context.getters["id"] ? context.getters["id"]: "null",
            value: payload, 
            cost: context.state.settings.resource_price[c] * payload + context.state.settings.transport_cost[c] + context.state.settings.fix_order_cost[c]
          }
        }
      })
      console.log("sending", obj)
      context.state.ws.send(obj)

      context.state.confirmRound = true
      context.dispatch("toast", "Ending round")
    },
    async startRound(context, payload) {
      console.log("start game payload", payload)
      processRoundStart(context, payload);
    },



  },
  modules: {
    user: userModule

  }
})
function processRoundStart(context, payload) {
  context.state.round = payload.round;

  if (context.state.owner.id == context.getters["id"]) {
    context.state.amIOwner = true;
  }

  if (context.state.round != 0 && !context.state.amIOwner) {
    context.state.roundSummary.moneyDiff = context.state.player_state.money - payload.player_states[context.getters["id"]].money
    context.state.roundSummary.magazineDiff = context.state.player_state.magazine_state - payload.player_states[context.getters["id"]].magazine_state
    context.state.roundSummary.backOrderDiff = context.state.player_state.back_order_sum - payload.player_states[context.getters["id"]].back_order_sum
    context.state.roundSummary.sendOrder = payload.send_orders[context.getters["id"]]
    context.state.roundSummary.placedOrder = payload.round_orders[context.getters["id"]]
    context.state.roundSummary.gotOrder = context.state.player_state.incoming_orders[0]
  }

  context.state.player_states = payload.player_states;
  context.state.flow = payload.flow;
  
  context.state.settings = payload.settings;
  context.state.player_state = context.state.player_states[context.getters["id"]];

  for (const [key, value] of Object.entries(context.state.flow)) {
    if (value == context.getters["id"]) {
      context.state.recipient = key;
    }
  }

  let players = []
  for (let p of context.state.players) {
    if (context.state.owner.id != p.id) {
      players.push(p);
    }
  }
  context.state.players = players;

  context.state.history.push({ round: payload.round, ...payload.player_states });
  context.state.roundFinish = false;
  context.state.confirmRound = false;
  context.state.newRound = true;
}

