import {WS_URL} from '@/config'
import store from '@/store'

// pub enum ServerMessage {
//   NewUserConnected(LobbyUserUpdate),
//   UserDisconnected(LobbyUserUpdate),
//   LobbyUpdate(LobbyUpdate),
//   Error(AppError),
//   RoundStart(GameUpdate),
//   RoundEnd,
//   GameStart(GameUpdate),
//   GameEventSettingsChange(Settings),
//   GameEventPopUp(String),
//   GameEventResource(Resource, i64),
//   KickAll,
//   GameEnd(GameEnd),
//   Ack,
// }

export const createWebSockets = (token) => {
  const ws = new WebSocket("ws://localhost:3000/lobby/websocket", ["access_token", token]);

  // ws.on('open', function open() {
  //   ws.send('something');
  // });
  
  ws.onmessage = async function message(msg) {
    let event = {}
    let txt = await msg.data.text()
    let data = JSON.parse(txt)
    console.log(data) 
    event = data


    console.log("got event", event)

    if (event === undefined) {
      store.dispatch("alert", "problem with communication")
    }

    if ( event.NewUserConnected !== undefined ) {
      store.commit("setPlayer", event.NewUserConnected.users)
    }
    else if ( event.UserDisconnected !== undefined ) {
      store.commit("setPlayer", event.UserDisconnected.users)
    }
    else if ( event.LobbyUpdate !== undefined ) {
      store.commit("setPlayer", event.LobbyUpdate.users)
      store.commit("setLobby", event.LobbyUpdate.lobby)
    }
    else if ( event.Error !== undefined ) {
      store.dispatch("alert", event.Error)
    }
    else if ( event.RoundStart !== undefined ) {
      store.dispatch("startGame", event.Error)
    }
    else if ( event.RoundEnd !== undefined ) {
      store.dispatch("startGame", event.Error)
    }
    else if ( event.GameStart !== undefined ) {
      store.dispatch("startGame", event.Error)
    }
    else if ( event.GameEventSettingsChange !== undefined ) {
      store.commit("setSettings", event.GameEventSettingsChange)
    }
    else if ( event.GameEventPopUp !== undefined ) {
      console.log(event.GameEventPopUp)
    }
    else if ( event.GameEventResource !== undefined ) {
      console.log(event.GameEventResource)
    }

  };

  return ws
}

