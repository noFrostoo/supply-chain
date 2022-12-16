<template>
  <ion-page>
    <MenuVue/>
    <ion-page id="main-content">
      <ion-content fullscreen scroll-y="false">
      <!-- <ion-header collapse="condense"> -->
        <ion-header>
          <ion-toolbar content-id="main-content">
            <ion-buttons  slot="start">
              <ion-menu-button></ion-menu-button>
            </ion-buttons>
            <ion-title>
              <ion-searchbar style="width: 50%" animated="true" placeholder="Game name"></ion-searchbar>
            </ion-title>
          </ion-toolbar>
        </ion-header> 
        <ion-grid >
          <ion-col>
              <ion-row>
                  <ion-col style="height:10%">
                      <ion-row class="item" >
                        
                      </ion-row>
                  </ion-col>
              </ion-row>
              <ion-row>
                <ion-col>
                  <GameList/>
                </ion-col>
              </ion-row>
          </ion-col>
        </ion-grid>
      </ion-content>
    </ion-page>
  </ion-page>
</template>

<script lang="js">
  import {IonButton, IonPage, IonButtons, IonHeader, IonSearchbar, IonTitle, IonMenu, IonMenuButton,IonToolbar ,IonContent, IonItem, IonGrid, IonRow, IonCol } from '@ionic/vue';
  import GameList from "../components/GameList.vue"
  import MenuVue from '@/components/MenuWidget.vue';

  export default {
    components: {
      MenuVue,
      IonContent, 
      GameList,
      IonGrid,
      IonRow,
      IonCol,
      IonToolbar,
      IonMenuButton,
      IonTitle,
      IonSearchbar,
      IonHeader,
      IonButtons,
      IonPage,
    },
    data () {
      return {
       
      }
    },
  }
</script>

<style>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%
}

</style>