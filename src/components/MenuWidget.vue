<template>
    <ion-menu content-id="main-content">
      <ion-header>
        <ion-toolbar>
          <ion-title>Menu</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-button style="margin:2px" expand="block" router-link="/home" >Home </ion-button>
        <ion-button style="margin:2px" expand="block" router-link="/account" >Account</ion-button>
        <ion-button style="margin:2px" expand="block" router-link="/quick_connect">Quick Connect</ion-button>
        <ion-button v-if="role == 'Admin'" style="margin:2px" expand="block" router-link="/lobby/new/Settings" >Create Lobby</ion-button>
        <ion-button v-if="role == 'Admin'" style="margin:2px" expand="block" router-link="/yourlobbies">Your's lobbies</ion-button>
        <ion-button v-if="role == 'Admin'" style="margin:2px" expand="block" router-link="/yourtemplates/">Templates</ion-button>
        <ion-button style="margin:2px" expand="block" router-link="/logout/" @click="logOut" >Log out</ion-button>
      </ion-content>
    </ion-menu>
</template>
<script lang="js">
  import {IonButton, IonHeader, IonTitle,  IonMenu,IonToolbar ,IonContent } from '@ionic/vue';

  export default {
    name:"MenuWidget",
    components: {
      IonContent, 
      IonToolbar,
      IonTitle,
      IonHeader,
      IonButton,
      IonMenu,
    },
    methods: {
      async logOut() {
        await this.$store.dispatch("actionLogOut")
      }
    },  
    computed: {
      role() {
          return this.$store.getters["userType"]
      }
    }
  }
</script>
