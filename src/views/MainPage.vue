<template>
    <ion-page>
    <ion-content fullscreen scroll-y="false">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Supply Chain</ion-title>
        </ion-toolbar>
      </ion-header> 
      <ion-grid >
        <ion-col>
            <ion-row>
                <ion-col size-lg="10" style="height:10%">
                    <ion-row class="item" >
                      <ion-searchbar style="width: 50%" animated="true" placeholder="Game name"></ion-searchbar>
                    </ion-row>
                </ion-col>
                <ion-col>
                  <ion-row padding-top class="item">
                    <ion-item>
                      <ion-button>Account</ion-button>
                    </ion-item>
                  </ion-row>
                </ion-col>
            </ion-row>
            <ion-row>
              <ion-col size-lg="10">
                <GameList/>
              </ion-col>
              <ion-col>
                  <ion-row padding-top class="item">
                    <ion-item>
                      <ion-button>Quick Connect</ion-button>
                    </ion-item>
                  </ion-row>
                  <ion-row padding-top class="item">
                    <ion-item>
                      <ion-button>Create Lobby</ion-button>
                    </ion-item>
                  </ion-row>
                  <ion-row padding-top class="item">
                    <ion-item>
                      <ion-button>Your's lobbies</ion-button>
                    </ion-item>
                  </ion-row>
                  <ion-row padding-top class="item">
                    <ion-item>
                      <ion-button>Templates</ion-button>
                    </ion-item>
                  </ion-row>
                  <ion-row padding-top class="item">
                    <ion-item>
                      <ion-button>Log out</ion-button>
                    </ion-item>
                  </ion-row>
              </ion-col>
            </ion-row>
        </ion-col>
      </ion-grid>
    </ion-content>
  </ion-page>
  
</template>

<script lang="js">
  import {IonButton, IonPage, IonContent, IonItem, IonGrid, IonRow, IonCol } from '@ionic/core';
  import GameList from "../components/GameList.vue"


  export default {
    components: {
      IonButton,
      IonContent, 
      IonItem,
      GameList,
      IonGrid,
      IonRow,
      IonCol
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

.item {
  display: flex;
  align-items: center;
  justify-content: center;
  background:brown;
}

.item-test{
    background:brown;
}

</style>