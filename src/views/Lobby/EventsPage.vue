<template>
  <MenuWidget/>
  <ion-page id="main-content" >
    <ion-header>
      <ion-toolbar>
        <ion-buttons  slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
        <ion-title>Events</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <EventTab :updateEvents="updateEvents" />

    </ion-content>
  </ion-page>

  
</template>
  
<script>
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonTitle, IonContent } from '@ionic/vue';
import MenuWidget from '@/components/MenuWidget.vue';
import EventTab from '@/components/EventsTab.vue'

let events = []

let defaultEvent = {
  id: 0,
  name: null,
  conditionName: null,
  condition: {},
  actions: [],
  recipients: null,
  run_once: true
}

export default defineComponent({
  name: 'EventPage',
  components: { EventTab, IonHeader, MenuWidget, IonTitle, IonContent, IonPage },
  methods: {
    updateEvents(events){
      console.log("events: ", events)
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