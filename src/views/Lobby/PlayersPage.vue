<template>
  <ion-page>
    <MenuWidget/>
    <ion-page id="main-content" >
      <ion-header>
        <ion-toolbar content-id="main-content" >
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
                  <ion-input @change="changeClass(player.id, $event)" type="number" placeholder="Class value here" :value="userClasses[player.id]"  ></ion-input>
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
import { useStore } from 'vuex';



export default defineComponent({
  name: 'PlayersPage',
  components: { MenuWidget, IonHeader, IonList, IonButton,IonItem, IonInput, IonLabel, IonMenuButton, IonButtons, IonToolbar, IonTitle, IonContent, IonPage },
  setup() {
    let store = useStore()

    const changeClass = (id, event) => {
      console.log("store", store)
      let value = event.target.value;
      console.log("value", value)
      store.dispatch("updateClass", {
        id: id,
        value: parseInt(value)
      })
    }

    return {
      changeClass
    }
  },
  computed: {
    players() {
      let players = this.$store.getters["players"]

      if (!players) {
          return []
      } 

      return players
    },
    userClasses() {
      let userClasses = this.$store.getters["userClasses"]
      if (userClasses) {
        return userClasses 
      }

      let lobby = this.$store.getters["lobby"]
      console.log(lobby)
      if (!lobby) {
        return {} 
      }

      let players = this.$store.getters["players"]
      if (!players) {
          return {}
      } 

      let classes = lobby.settings.user_classes
      console.log(classes)
      if (classes.length == 0) {
          this.$store.commit("addDefaultClass")
          classes = this.$store.getters["lobby"]
      }


      lobby = this.$store.getters["lobby"]
      classes = lobby.settings.user_classes
      let firstClass = classes[0]

      userClasses = {}
      for (let p of players) {
        userClasses[p.id] = firstClass
      }
      
      this.$store.commit("setUserClasses", userClasses)

      return userClasses
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