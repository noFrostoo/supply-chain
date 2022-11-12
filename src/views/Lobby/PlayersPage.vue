<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Players</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 3</ion-title>
        </ion-toolbar>
      </ion-header>
        <ion-list>
          <ion-item
              v-for="player in players"
              :key="player"
              class="item"
          >
              <ion-label>{{player.username}}</ion-label>
              <ion-item>
                <ion-input @change="changeClass(player.id)" type="number" placeholder="Class value here" :value="player.class"  ></ion-input>
              </ion-item>
              <ion-button>Kick</ion-button>
          </ion-item>
        </ion-list>
      
    </ion-content>
  </ion-page>
</template>

<script lang="js">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';

let players = [
          {
            id: "XD",
            username: "user1",
            class: 1
          },
          {
            id: "XD",
            username: "user1",
            class: 1
          },
          {
            id: "XD",
            username: "user1",
            class: 1
          },
          {
            id: "XD",
            username: "user1",
            class: 1
          },
          {
            id: "XD",
            username: "user1",
            class: 1
          },
          {
            id: "XD",
            username: "user1",
            class: 1
          },

        ];

export default defineComponent({
  name: 'Tab3Page',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
  data() {
    return {
      players: players
    }
  },
  setup() {
    const changeClass = (id) => {
      console.log(id)
      console.log(players)
    }

    return {
      changeClass
    }
  }
});
</script>

<style>
.item {
  display: flex;
  align-items: center;
  justify-content: center;
  background:brown;
}
</style>