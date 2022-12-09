<template>
  <ion-page>
    <MenuWidget/>
    <ion-page id="main-content" >
      <ion-header>
        <ion-toolbar>
          <ion-buttons  slot="start">
              <ion-menu-button></ion-menu-button>
            </ion-buttons>
          <ion-title>Control</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">Control</ion-title>
          </ion-toolbar>
        </ion-header>
        <div class="container">
          <ion-button v-if="isNewLobby" @click="createLobby" style="margin:5px" >Create lobby</ion-button>
          <ion-button v-if="!isNewLobby" @click="startGame" style="margin:5px" >Start game</ion-button>
          <ion-button @click="saveAsTemplate" style="margin:5px" >Save as template</ion-button>
          <ion-button v-if="!isNewLobby" @click="deleteLobby" style="margin:5px" >Delete Lobby</ion-button>
          <ion-button v-if="!isNewLobby" @click="generateConnectCode"  style="margin:5px" >Generate connect code </ion-button>
        </div>
      </ion-content>
    </ion-page>
  </ion-page>
</template>

<script lang="js">
import { defineComponent } from 'vue';
import { IonPage, IonButton,  IonMenuButton, IonButtons, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import MenuWidget from '@/components/MenuWidget.vue';
import { useIonRouter } from '@ionic/vue';

export default defineComponent({
  name: 'ControlPage',
  components: { MenuWidget, IonButton, IonMenuButton, IonButtons, IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
  methods: {
    async createLobby(){
      let lobby = await this.$store.dispatch("createLobby")
      this.$store.dispatch("toast", "Lobby create")
      this.router.push(`/lobby/${lobby.id}/Settings`)
    },
    async deleteLobby() {
      await this.$store.dispatch("deleteLobby")
      this.$store.dispatch("toast", "Deleted a lobby")
      this.router.push(`/home`)
    },
    async startGame() {
      await this.$store.dispatch("startGame")
    },
    async saveAsTemplate() {
      console.log("save as template")
    },
    async generateConnectCode() {
      console.log("generate connect code")
    }
  },
  computed: {
    isNewLobby() {
      return this.$store.getters["isNewLobby"]
    }
  },
  data() {
    return {
      router: useIonRouter()
    }
  }
});
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%
}
</style>
