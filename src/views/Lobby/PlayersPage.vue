<template>
  <ion-page>
    <MenuWidget/>
    <ion-page id="main-content" >
      <ion-header>
        <ion-toolbar>
          <ion-buttons  slot="start">
              <ion-menu-button></ion-menu-button>
            </ion-buttons>
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
  </ion-page>
</template>

<script lang="js">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonList, IonToolbar, IonButton, IonItem, IonLabel, IonInput, IonMenuButton, IonButtons, IonTitle, IonContent } from '@ionic/vue';
import MenuWidget from '@/components/MenuWidget.vue';

let players = [];

export default defineComponent({
  name: 'PlayersPage',
  components: { MenuWidget, IonHeader, IonList, IonButton,IonItem, IonInput, IonLabel, IonMenuButton, IonButtons, IonToolbar, IonTitle, IonContent, IonPage },
  data() {
    players = this.$store.getters["players"]

    if (!players) {
        this.$store.dispatch("alert", "problem with getting players")
        return {players: [], user_classes: {}}
    } 

    userClasses = this.$store.getters["userClasses"]
    if (userClasses) {
      return {
        players: players,
        user_classes: userClasses
      }
    }

    let lobby = this.$store.getters["lobby"]
    
    if (!lobby) {
      this.$store.dispatch("alert", "problem with getting lobby")
      return {players: []}
    }

    let classes = lobby.settings.user_classes

    if (classes.length() == 0) {
        this.$store.commit("addDefaultClass")
        classes = this.$store.getters["lobby"]
    }

    lobby = this.$store.getters["lobby"]
    classes = lobby.settings.user_classes
    firstClass = classes[0]

    for (p of players) {
      userClasses[p.id] = firstClass
    }
    
    return {
      players: players,
      user_classes: userClasses
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
.grid-item {
  display: flex;
  align-items: center;
  justify-content: center;
  background:brown;
}
</style>