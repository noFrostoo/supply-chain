<template>
  <ion-page>
    <MenuWidget/>
    <ion-page id="main-content" >
      <ion-header>
        <ion-toolbar content-id="main-content" >
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
          <ion-button v-if="isNewLobby && !saveTemplate" @click="createLobby" style="margin:5px" >Create lobby</ion-button>
          <ion-button v-if="!isNewLobby && !saveTemplate " @click="startGame" style="margin:5px" >Start game</ion-button>
          <ion-button v-if="!saveTemplate" @click="startSavingTemplate" style="margin:5px" >Save as template</ion-button>
          <ion-button v-if="saveTemplate" @click="performSavingTemplate" style="margin:5px" >Click again to save as template</ion-button>
          <ion-button v-if="!isNewLobby && !saveTemplate" @click="deleteLobby" style="margin:5px" >Delete Lobby</ion-button>
          <ion-button v-if="!isNewLobby && !saveTemplate" @click="generateConnectCode"  style="margin:5px" >Generate connect code </ion-button>
        </div>
        <ion-item  v-if="saveTemplate">
              <ion-label position="floating">Enter Name</ion-label>
              <ion-input v-model="templateName"></ion-input>
        </ion-item>
      </ion-content>
    </ion-page>
  </ion-page>
</template>

<script lang="js">
import { defineComponent } from 'vue';
import { IonPage, IonButton, IonItem, IonLabel, IonInput, IonMenuButton, IonButtons, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import MenuWidget from '@/components/MenuWidget.vue';
import { useIonRouter } from '@ionic/vue';
import { api } from '@/api';

export default defineComponent({
  name: 'ControlPage',
  props: ["id"],
  components: { MenuWidget, IonButton, IonItem, IonInput, IonLabel, IonMenuButton, IonButtons, IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
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
      await this.$store.dispatch("toast", "Starting a game...")
      console.log("id", this.id)
      api.startGame(this.$store.getters["token"], this.id, this.$store.getters["userClasses"])
    },
    async startSavingTemplate() {
      this.saveTemplate = true
    },
    async performSavingTemplate() {
      //TODO: save 
      this.saveTemplate = false
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
      router: useIonRouter(),
      saveTemplate: false,
      templateName: ""
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
