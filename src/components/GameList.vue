<template>
    <ion-content fullscreen role="feed">
        <ion-card class="item-test" style="height:15%; justify-content: space-around;">
            <ion-label>Lobby Name</ion-label>
            <ion-label>Players State</ion-label>
            <ion-label>Started</ion-label>
        </ion-card>
        <ion-list id="game-list">
        <ion-item
            v-for="item in items"
            :key="item"
            role="article"
        >
            <ion-label>{{item.name}}</ion-label>
            <ion-label>{{item.max_players}}</ion-label>
            <ion-label>{{item.started}}</ion-label>
            <ion-button @click="connect(item.id)">Connect</ion-button>
        </ion-item>
        </ion-list>

        <ion-infinite-scroll threshold="200px" id="infinitescroll" @ionInfinite="loadData($event)" >
        <ion-infinite-scroll-content loading-spinner="bubbles" loading-text="Loading more data...">
        </ion-infinite-scroll-content>
        </ion-infinite-scroll>
    </ion-content>
</template>

<script lang="js">
  import {IonButton, IonContent, IonCard, IonInfiniteScroll, IonInfiniteScrollContent, IonLabel, IonList, IonItem } from '@ionic/vue';
  import {ref } from "vue";
  import { useIonRouter } from '@ionic/vue';
  import { api } from '@/api'
  import { useStore } from 'vuex'

  let games = [

        ];

  export default {
    components: {
      IonButton,
      IonContent, 
      IonInfiniteScroll, 
      IonInfiniteScrollContent,
      IonItem,
      IonLabel,
      IonList,
      IonCard
    },
    name: "GameList",
    methods: {
      async connect(id) {
        await this.$store.dispatch("connectPlayer", id)
        this.$store.dispatch("toast", "Connected")
        this.router.push(`/lobby/${id}/Players`)
      }
    },
    setup() {
      console.log("XDDD")
      const store = useStore()
      let pageSize = 25

      const isDisabled = ref(false);
      const toggleInfiniteScroll = () => {
        isDisabled.value = !isDisabled.value;
      }
      const items = ref([]);

      const pushData = async () => {
        console.log("dafdfa")
        const offset = items.value.length;
        const limit = pageSize;
        let lobbies = await (await api.fetchLobbies(store.getters["token"], "Public", limit, offset)).data
         
        for (let lobby of lobbies) {
          items.value.push(lobby);
        }
      }
      
      const loadData = (ev) => {
        console.log("XD")
        setTimeout(() => {
          pushData();
          console.log('Loaded data');
          ev.target.complete();
    
          // App logic to determine if all data is loaded
          // and disable the infinite scroll
          if (items.value.length === 1000) {
            ev.target.disabled = true;
          }
        }, 500);
      }
    
    pushData();
    
    return {
      isDisabled,
      toggleInfiniteScroll,
      loadData,
      items,
      router: useIonRouter()
    }
  },
    data () {
      return {
      }
    },
  }
</script>

<style scoped>
.grid-item {
  display: flex;
  align-items: center;
  justify-content: center;
  background:brown;
}

.item-test{
    background:brown;
}

</style>