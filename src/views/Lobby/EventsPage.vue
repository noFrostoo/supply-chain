<template>
  <ion-page>
  <MenuWidget/>
  <ion-page id="main-content" >
    <ion-header>
      <ion-toolbar content-id="main-content" >
        <ion-buttons  slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
        <ion-title>Events</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <EventTab :updateEvents="updateEvents" :initialEvents="events" :lobby="lobby" />

    </ion-content>
  </ion-page>
  </ion-page>
  
</template>
  
<script>
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonContent } from '@ionic/vue';
import MenuWidget from '@/components/MenuWidget.vue';
import EventTab from '@/components/EventsTab.vue'

let events = []
let lobby = null

export default defineComponent({
  name: 'EventPage',
  components: { EventTab, IonHeader, MenuWidget, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonPage },
  methods: {
    async updateEvents(events){
      console.log("events: ", events)
      this.events = events;
      await this.$store.dispatch("updateLobbyEvents", events)
    }
  },
  data() {
    lobby = this.$store.getters["lobby"]
    if (lobby != null) {
      console.log(lobby.events.events)
      events = lobby.events.events
    } else {
      this.$store.dispatch("alert", "Problem with getting events")
    }

    return {
      events,
      lobby
    }
  }

});
</script>
  

<style>
.grid-item {
  display: flex;
  align-items: center;
  justify-content: center;
  background:brown;
}
</style>