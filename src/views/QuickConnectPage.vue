<template>
  <ion-page>
    <MenuWidget></MenuWidget>
    <ion-page id="main-content" >
      <ion-header>
        <ion-toolbar>
          <ion-buttons  slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
          <ion-title>Quick Connect</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">Quick Connect</ion-title>
          </ion-toolbar>
        </ion-header>
        <div class="container">
          <ion-item>
            <ion-label position="floating">ConnectCode</ion-label>
            <ion-input v-model="connectCode"></ion-input>
          </ion-item>
          <ion-button>Connect</ion-button>
        </div>
      </ion-content>
    </ion-page>
  </ion-page>
</template>
  
  <script>
  import { defineComponent } from 'vue';
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
  import MenuWidget from '@/components/MenuWidget.vue';
  import { api } from "@/api";
  import { createWebSockets } from "@/ws";

  export default defineComponent({
    name: 'ControlPage',
    components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, MenuWidget },
    data() {
        return {
            connectCode: ""
        }
    },
    methods: {
      async connect() {
        if (this.$store.getter["isLoggedIn"]) {
          let data = await (await api.quickConnect(this.$store.getter["token"], this.connectCode)).data
          this.$store.commit("setGameId", data.id)
          this.$store.commit("setWs", createWebSockets(this.$store.getters["token"])) 
        }
        else {
          let data = await (await api.quickConnectNoUser(this.connectCode)).data
          let payload = {
            username: data.user.username,
            password: data.password,
          }
          await this.$store.dispatch("actionLogIn", payload);
          this.$store.commit("setGameId", data.id)
          this.$store.commit("setWs", createWebSockets(this.$store.getters["token"])) 
        }
      }
    }
  });
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%
  }
  </style>
  