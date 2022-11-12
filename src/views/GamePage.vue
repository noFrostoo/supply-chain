<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/game/MainGamePage">
          <ion-icon :icon="triangle" />
          <ion-label>Game</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="tab3" href="/game/DataPage">
          <ion-icon :icon="square" />
          <ion-label>History</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/game/HistoryPage">
          <ion-icon :icon="ellipse" />
          <ion-label>Performance</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="tab3" href="/game/DataPage">
          <ion-icon :icon="square" />
          <ion-label>Data</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="tab3" href="/game/DataPage">
          <ion-icon :icon="square" />
          <ion-label>Next Period</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { ellipse, square, triangle } from 'ionicons/icons';

export default defineComponent({
  name: 'GamePage',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet },
  setup() {
    return {
      ellipse, 
      square, 
      triangle,
    }
  }
});
</script>
