<template>
  <ion-page>
    <MenuWidget></MenuWidget>
    <ion-page id="main-content" >
      <ion-header>
        <ion-toolbar>
          <ion-buttons  slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
          <ion-title>Account</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">Account</ion-title>
          </ion-toolbar>
        </ion-header>
        <div class="container">
          <ion-item>
            <ion-label position="floating">New password</ion-label>
            <ion-input v-model="password"></ion-input>
          </ion-item>
          <ion-button @click="changePassword">Change password</ion-button>
        </div>
      </ion-content>
    </ion-page>
  </ion-page>
</template>
  
  <script>
  import { defineComponent } from 'vue';
  import { IonPage, IonHeader, IonMenuButton, IonItem, IonButton, IonInput, IonButtons, IonLabel, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
  import MenuWidget from '@/components/MenuWidget.vue';
  import { api } from '@/api';
  
  export default defineComponent({
    name: 'ControlPage',
    components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, MenuWidget, IonLabel, IonMenuButton, IonItem, IonButton, IonInput, IonButtons, },
    data() {
        return {
            password: ""
        }
    },
    methods: {
      changePassword() {
        try {
          let response = api.updateUser(this.$store.getters["token"], this.$store.getters["id"], { password:  this.password})
        }
        catch (e) {
          this.$store.dispatch("alert", "Problem with changing password");
        }
        finally {
          this.$store.dispatch("toast", "Password changed");
        }
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
  