<template>
    <ion-page>
      <ion-tabs>
        <ion-router-outlet></ion-router-outlet>
        <ion-tab-bar slot="bottom">
          <ion-tab-button tab="tab1" href="/lobby/PlayersPage">
            <ion-icon :icon="triangle" />
            <ion-label>Players</ion-label>
          </ion-tab-button>
          
          <ion-tab-button tab="tab3" href="/lobby/SettingsPage">
            <ion-icon :icon="square" />
            <ion-label>Settings</ion-label>
          </ion-tab-button>
  
          <ion-tab-button tab="tab2" href="/lobby/ControlPage">
            <ion-icon :icon="ellipse" />
            <ion-label>Control</ion-label>
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
    name: 'LobbyPage',
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
  