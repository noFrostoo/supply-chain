import { createStore } from 'vuex'
import { userModule } from './user';
import {alertController, toastController} from "@ionic/vue";

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {

  },
  actions: {
    async alert(state, text, header = "Alert") {
      const alert = await alertController.create({
        header: header,
        message: text,
        buttons: ['OK'],
      });

      await alert.present();
    },
    async toast(state, text) {
      const toast = await toastController.create({
        message: text,
        duration: 1500,
        position: 'middle'
      });

      await toast.present();
    }
  },
  modules: {
    user: userModule

  }
})
