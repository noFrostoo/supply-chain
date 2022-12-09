<template>
  <ion-page>
    <MenuWidget></MenuWidget>
    <ion-page id="main-content" >
      <ion-header>
        <ion-toolbar>
          <ion-buttons  slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
          <ion-title>Quick Connect</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">Quick Connect</ion-title>
          </ion-toolbar>
        </ion-header>
        <div class="container">
          <ion-item>
            <ion-label position="floating">ConnectCode</ion-label>
            <ion-input v-model="connectCode"></ion-input>
          </ion-item>
          <ion-button>Connect</ion-button>
        </div>
      </ion-content>
    </ion-page>
  </ion-page>
</template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
  import MenuWidget from '@/components/MenuWidget.vue';
  
  
  export default defineComponent({
    name: 'ControlPage',
    components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, MenuWidget },
    data() {
        return {
            connectCode: ""
        }
    }
  });
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%
  }
  </style>
  