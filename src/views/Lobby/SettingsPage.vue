<template>
  <ion-page>
    <MenuWidget/>
    <ion-page id="main-content" >
      <ion-header>
        <ion-toolbar>
          <ion-buttons  slot="start">
              <ion-menu-button></ion-menu-button>
            </ion-buttons>
          <ion-title>Settings</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <SettingsTab :initLobby="lobby" :update="update" :isTemplate="false" />
      </ion-content>
    </ion-page>
  </ion-page>
</template>

<script lang="js">
import { defineComponent } from 'vue';
import {  IonButtons, IonMenuButton, IonPage, IonHeader,  IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import MenuWidget from '@/components/MenuWidget.vue';
import SettingsTab from '@/components/SettingsTab.vue';

export default  defineComponent({
  name: 'SettingsPage',
  components: {IonHeader, IonButtons, IonMenuButton, MenuWidget, SettingsTab, IonToolbar, IonTitle, IonContent, IonPage, },  
  methods: {
    async update(lobby) {
      console.log("updateSettings", lobby)
      await this.$store.dispatch("updateLobby", lobby)
      this.$store.dispatch("toast", "Saved")
    },
  },
  data() {
    let lobby = this.$store.getters["lobby"]
    if (lobby) {
      console.log("got lobby", lobby)
    } else {
      console.log("lobby",lobby)
      this.$store.dispatch("alert", "Problem with getting lobby")
    }

    return {
      lobby
    }
  },
})
</script>

<style scoped>
.grid-item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%
}

</style>