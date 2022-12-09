<template>
    <ion-page>
      <ion-tabs>
        <ion-router-outlet></ion-router-outlet>
        <ion-tab-bar slot="bottom">
          <ion-tab-button tab="settings" :href="'/template/' + id + '/Settings'">
            <ion-icon :icon="square" />
            <ion-label>Settings</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="event" :href="'/template/' + id + '/Events'">
            <ion-icon :icon="star" />
            <ion-label>Events</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="control" :href="'/template/' + id + '/Control'">
            <ion-icon :icon="ellipse" />
            <ion-label>Contol</ion-label>
          </ion-tab-button>

        </ion-tab-bar>
      </ion-tabs>
    </ion-page>
  </template>
  
  <script lang="js">
  import { defineComponent } from 'vue';
  import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
  import { ellipse, square, triangle, star } from 'ionicons/icons';
  
  let template = {
    settings: {max_rounds: 4}
  }

  export default defineComponent({
    name: 'LobbyPage',
    props: ['id'] ,
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
        this.$store.commit("startCreatingTemplate")
      }
      else {
        this.$store.commit("resetNewTemplate")
      }

      if (this.$store.getters["isNewTemplate"]) {
        console.log("newTemplated started")
      } 
      else {
        await this.fetchTemplate();
      }
      
    },
    methods: {
      async fetchTemplate() {
        console.log("fetch template called")
        await this.$store.dispatch("fetchTemplate", this.id)
      }
    }
  });
  </script>
  