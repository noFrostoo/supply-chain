<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Players</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 3</ion-title>
        </ion-toolbar>
      </ion-header>
        <ion-list>
          <ion-item
              v-for="event in events"
              :key="event.name"
              class="item"
          >
              <ion-label>{{event.name}}</ion-label>
              <ion-item>
              </ion-item>
              <ion-button>Edit</ion-button>
          </ion-item>
        </ion-list>
        
        <!-- modal to add or edit  -->
        
    </ion-content>
  </ion-page>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';

let events = [{
  name: "xdx"
}]

export default defineComponent({
  name: 'Tab2Page',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
  data() {
    return {
      events
    }
  }
});
</script>
  

<style>
.item {
  display: flex;
  align-items: center;
  justify-content: center;
  background:brown;
}
</style>