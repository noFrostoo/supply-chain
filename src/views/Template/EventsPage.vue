<template>
  <ion-page>
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
      <EventTab :updateEvents="updateEvents" :initialEvents="events" />

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

export default defineComponent({
  name: 'EventPage',
  components: { EventTab, IonHeader, IonToolbar, IonButtons, IonMenuButton, MenuWidget, IonTitle, IonContent, IonPage },
  methods: {
    async updateEvents(events){
      console.log("events: ", events)
      this.events = events;
      await this.$store.dispatch("updateTemplateEvents", events)
    }
  },
  data() {
    let template = this.$store.getters["template"]
    if (template) {
      events = template.events
    } else {
      this.$store.dispatch("alert", "Problem with getting events")
    }

    return {
      events,
      template
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