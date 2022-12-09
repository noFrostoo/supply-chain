<template>
    <ion-page>
      <ion-tabs>
        <ion-router-outlet></ion-router-outlet>
        <ion-tab-bar slot="bottom">
          <ion-tab-button v-if="!isNewLobby" tab="tab1" :href="'/lobby/' + id + '/Players'">
            <ion-icon :icon="triangle" />
            <ion-label>Players</ion-label>
          </ion-tab-button>
          
          <ion-tab-button tab="tab2" :href="'/lobby/' + id + '/Settings'">
            <ion-icon :icon="square" />
            <ion-label>Settings</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="tab3" :href="'/lobby/' + id + '/Events'">
            <ion-icon :icon="star" />
            <ion-label>Events</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="tab4" :href="'/lobby/' + id + '/Control'">
            <ion-icon :icon="ellipse" />
            <ion-label>Control</ion-label>
          </ion-tab-button>

        </ion-tab-bar>
      </ion-tabs>
    </ion-page>
  </template>
  

<script lang="js">
import { defineComponent } from 'vue';
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { ellipse, square, triangle, star } from 'ionicons/icons';

export default defineComponent({
  name: 'LobbyPage',
  props: ['id'],
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet },
  setup() {
    return {
      ellipse, 
      square, 
      triangle,
      star,
    }
  },
  async created() {
    if (this.id == "new") {
      this.$store.commit("startCreatingLobby")
    }
    else {
      this.$store.commit("resetNewLobby")
    }

    if (this.$store.getters["isNewLobby"]) {
      console.log("newLobby started")
    } 
    else {
      await this.fetchLobby();
    }
    
  },
  methods: {
    async fetchLobby() {
      console.log("fetch lobby called")
      await this.$store.dispatch("fetchLobby", this.id)
    }
  },
  computed: {
    isNewLobby() {
      return this.$store.getters["isNewLobby"]
    }
  }
});
</script>
  
  