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
              <ion-searchbar @ionChange="handleChange($event)" style="width: 50%" animated="true" placeholder="Game name"></ion-searchbar>
            </ion-title>
          </ion-toolbar>
        </ion-header> 
        <ion-grid >
          <ion-col>
              <ion-row>
                <ion-col>
                  <GameList :query="query"/>
                </ion-col>
              </ion-row>
          </ion-col>
        </ion-grid>
      </ion-content>
    </ion-page>
  </ion-page>
</template>

<script lang="js">
  import { IonPage, IonButtons, IonHeader, IonSearchbar, IonTitle, IonMenuButton,IonToolbar ,IonContent, IonGrid, IonRow, IonCol } from '@ionic/vue';
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
    data() {
      return {
        query: ""
      }
    },
    methods: {
      handleChange(event) {
        this.query = event.target.value.toLowerCase();
        console.log(this.query)
      },
    }
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