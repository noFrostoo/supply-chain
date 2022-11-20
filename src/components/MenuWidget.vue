<template>
    <ion-menu content-id="main-content">
      <ion-header>
        <ion-toolbar>
          <ion-title>Menu</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
            <ion-button style="margin:2px" expand="block" router-link="/account" >Account</ion-button>
            <ion-button style="margin:2px" expand="block" router-link="/quick_connect">Quick Connect</ion-button>
            <ion-button style="margin:2px" expand="block" router-link="/create_lobby/" >Create Lobby</ion-button>
            <ion-button style="margin:2px" expand="block" router-link="/lobbies">Your's lobbies</ion-button>
            <ion-button style="margin:2px" expand="block" router-link="/templates">Templates</ion-button>
            <ion-button style="margin:2px" expand="block" >Log out</ion-button>

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
    data () {
      return {
       
      }
    },
  }
</script>
