<template>
  <MenuWidget/>
  <ion-page id="main-content" >
    <ion-header>
      <ion-toolbar>
        <ion-buttons  slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
        <ion-title>Control</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Control</ion-title>
        </ion-toolbar>
      </ion-header>
      <div class="container">
        <ion-button style="margin:5px" >Start game</ion-button>
        <ion-button style="margin:5px" >Save as template</ion-button>
        <ion-button style="margin:5px" >Delete game</ion-button>
        <ion-button style="margin:5px" >Generate connect code </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonButton,  IonMenuButton, IonButtons, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import MenuWidget from '@/components/MenuWidget.vue';

export default defineComponent({
  name: 'ControlPage',
  components: { MenuWidget, IonButton, IonMenuButton, IonButtons, IonHeader, IonToolbar, IonTitle, IonContent, IonPage }
});
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%
}
</style>
