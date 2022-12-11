<template>
  <ion-page>
    <MenuWidget/>
    <ion-page id="main-content" >
      <ion-header>
        <ion-toolbar>
          <ion-buttons  slot="start">
              <ion-menu-button></ion-menu-button>
            </ion-buttons>
          <ion-title>Settings</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <SettingsTab :initLobby="template" :update="update" :isTemplate="true" />
      </ion-content>
    </ion-page>
  </ion-page>
</template>

<script lang="js">
import { defineComponent } from 'vue';
import {  IonButtons, IonPage, IonHeader, IonMenuButton, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import MenuWidget from '@/components/MenuWidget.vue';
import SettingsTab from '@/components/SettingsTab.vue';
import { utils } from '@/utlis';

export default  defineComponent({
  name: 'SettingsPage',
  components: {IonHeader, MenuWidget, SettingsTab, IonMenuButton, IonButtons, IonToolbar, IonTitle, IonContent, IonPage, },  
  data() {
    let template = this.$store.getters["template"]
    if (template) {
      console.log("got template", template)
    } else {
      console.log("template",template)
      this.$store.dispatch("alert", "Problem with getting template")
    }

    return {
      template
    }
  },
  methods: {
    update(template) {
      this.$store.dispatch("updateTemplate", template)
      this.$store.dispatch("toast", "Saved")
    },
  },
  // setup() {
    
  // }
})
</script>

<style scoped>
.grid-item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%
}

</style>